#!/usr/bin/env python3
"""
Extract real API documentation from NetBox Python source code.

This script parses Python source files to extract actual docstrings, method signatures,
and parameter information to generate comprehensive API documentation.
"""

import ast
import os
import re
import sys
from typing import Dict, List, Optional, Tuple, Any

def parse_docstring(docstring: str) -> Dict[str, Any]:
    """Parse a Google/NumPy style docstring to extract description and parameters."""
    if not docstring:
        return {'description': '', 'parameters': [], 'returns': ''}
    
    lines = docstring.strip().split('\n')
    description_lines = []
    parameters = []
    returns = ''
    
    current_section = 'description'
    
    for line in lines:
        line = line.strip()
        
        # Check for section headers
        if line.lower() in ['args:', 'arguments:', 'parameters:', 'param:', 'params:']:
            current_section = 'parameters'
            continue
        elif line.lower() in ['returns:', 'return:']:
            current_section = 'returns'
            continue
        elif line.lower() in ['raises:', 'raise:']:
            current_section = 'raises'
            continue
        
        if current_section == 'description':
            description_lines.append(line)
        elif current_section == 'parameters':
            # Look for parameter definitions like "exclude: An iterable of..."
            param_match = re.match(r'^(\w+):\s*(.+)', line)
            if param_match:
                param_name, param_desc = param_match.groups()
                parameters.append({
                    'name': param_name,
                    'description': param_desc,
                    'type': 'Any',
                    'default': None
                })
            elif parameters and line and not line.startswith(' '):
                # Continuation of previous parameter description
                parameters[-1]['description'] += ' ' + line
        elif current_section == 'returns':
            returns += line + ' '
    
    description = ' '.join(description_lines).strip()
    # Clean up extra whitespace
    description = re.sub(r'\s+', ' ', description)
    
    return {
        'description': description,
        'parameters': parameters,
        'returns': returns.strip()
    }

def extract_method_from_ast(method_node: ast.FunctionDef) -> Dict[str, Any]:
    """Extract method information from AST node."""
    method_info = {
        'name': method_node.name,
        'signature': '',
        'description': '',
        'parameters': [],
        'returns': ''
    }
    
    # Get docstring
    if (method_node.body and 
        isinstance(method_node.body[0], ast.Expr) and 
        isinstance(method_node.body[0].value, ast.Constant) and 
        isinstance(method_node.body[0].value.value, str)):
        
        docstring = method_node.body[0].value.value
        parsed_doc = parse_docstring(docstring)
        method_info['description'] = parsed_doc['description']
        method_info['returns'] = parsed_doc['returns']
    
    # Extract parameters
    params = []
    param_names = []
    
    for arg in method_node.args.args:
        if arg.arg == 'self':
            continue
            
        param_info = {
            'name': arg.arg,
            'type': 'Any',
            'default': None,
            'description': ''
        }
        
        # Get type annotation
        if arg.annotation:
            try:
                param_info['type'] = ast.unparse(arg.annotation)
            except:
                param_info['type'] = 'Any'
        
        params.append(param_info)
        param_names.append(arg.arg)
    
    # Handle defaults
    defaults = method_node.args.defaults
    if defaults:
        # Defaults are applied to the last len(defaults) parameters
        num_defaults = len(defaults)
        for i, default in enumerate(defaults):
            param_index = len(params) - num_defaults + i
            if param_index >= 0 and param_index < len(params):
                try:
                    params[param_index]['default'] = ast.unparse(default)
                except:
                    params[param_index]['default'] = 'None'
    
    # Merge with docstring parameters
    if method_info['description']:
        parsed_doc = parse_docstring(method_node.body[0].value.value if method_node.body and isinstance(method_node.body[0], ast.Expr) and isinstance(method_node.body[0].value, ast.Constant) else '')
        for param in params:
            doc_param = next((p for p in parsed_doc['parameters'] if p['name'] == param['name']), None)
            if doc_param:
                param['description'] = doc_param['description']
    
    method_info['parameters'] = params
    
    # Build signature
    param_strs = []
    for param in params:
        param_str = param['name']
        if param['default'] is not None:
            param_str += f"={param['default']}"
        param_strs.append(param_str)
    
    method_info['signature'] = f"({', '.join(param_strs)})"
    
    return method_info

def extract_class_from_file(file_path: str, class_name: str) -> Dict[str, Any]:
    """Extract class information from a Python source file using AST."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            source = f.read()
        
        tree = ast.parse(source)
        
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef) and node.name == class_name:
                class_info = {
                    'class_name': class_name,
                    'module_path': '',  # Will be set by caller
                    'description': '',
                    'methods': []
                }
                
                # Get class docstring
                if (node.body and 
                    isinstance(node.body[0], ast.Expr) and 
                    isinstance(node.body[0].value, ast.Constant) and 
                    isinstance(node.body[0].value.value, str)):
                    
                    docstring = node.body[0].value.value
                    parsed_doc = parse_docstring(docstring)
                    class_info['description'] = parsed_doc['description']
                
                # Extract methods
                for item in node.body:
                    if isinstance(item, ast.FunctionDef):
                        # Skip private methods except __str__ and __init__
                        if item.name.startswith('_') and item.name not in ['__str__', '__init__']:
                            continue
                        
                        method_info = extract_method_from_ast(item)
                        class_info['methods'].append(method_info)
                
                return class_info
        
        return None
        
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
        return None

def generate_method_documentation(method: Dict[str, Any]) -> str:
    """Generate documentation for a single method."""
    doc_parts = []
    
    # Method header
    doc_parts.append(f"#### {method['name']}{method['signature']}")
    doc_parts.append("")
    
    # Description
    if method['description']:
        doc_parts.append(method['description'])
        doc_parts.append("")
    
    # Parameters table
    if method['parameters']:
        doc_parts.append("**Parameters:**")
        doc_parts.append("")
        doc_parts.append("| Name | Type | Default | Description |")
        doc_parts.append("| --- | --- | --- | --- |")
        
        for param in method['parameters']:
            name = param['name']
            param_type = param['type']
            default = param['default'] or '-'
            description = param['description'] or 'No description available'
            doc_parts.append(f"| {name} | {param_type} | {default} | {description} |")
        
        doc_parts.append("")
    
    # Returns
    if method['returns']:
        doc_parts.append(f"**Returns:** {method['returns']}")
        doc_parts.append("")
    
    return '\n'.join(doc_parts)

def generate_class_documentation(class_info: Dict[str, Any]) -> str:
    """Generate comprehensive documentation for a class."""
    if not class_info:
        return ""
    
    doc_parts = []
    
    # Class header
    doc_parts.append(f"## {class_info['class_name']}")
    doc_parts.append("")
    
    # Module information
    doc_parts.append(f"**Module:** `{class_info['module_path']}`")
    doc_parts.append("")
    
    # Description
    if class_info['description']:
        doc_parts.append(class_info['description'])
    else:
        doc_parts.append(f"Provides functionality for NetBox plugin development.")
    doc_parts.append("")
    
    # Methods
    if class_info['methods']:
        # Sort methods: public methods first, then special methods
        public_methods = [m for m in class_info['methods'] if not m['name'].startswith('_')]
        special_methods = [m for m in class_info['methods'] if m['name'].startswith('_')]
        
        all_methods = public_methods + special_methods
        
        if all_methods:
            doc_parts.append("### Methods")
            doc_parts.append("")
            
            for method in all_methods:
                method_doc = generate_method_documentation(method)
                doc_parts.append(method_doc)
    
    return '\n'.join(doc_parts)

if __name__ == '__main__':
    # Test with ChangeLoggingMixin
    netbox_path = os.path.join(os.path.dirname(__file__), '..', 'external-repos', 'netbox', 'netbox')
    features_file = os.path.join(netbox_path, 'netbox', 'models', 'features.py')
    
    print(f"Parsing file: {features_file}")
    
    # Test classes
    test_classes = [
        ('netbox.models.features', 'ChangeLoggingMixin'),
        ('netbox.models.features', 'CloningMixin'),
        ('netbox.models.features', 'CustomFieldsMixin'),
    ]
    
    for module_path, class_name in test_classes:
        print(f"\nExtracting documentation for {class_name}...")
        class_info = extract_class_from_file(features_file, class_name)
        if class_info:
            class_info['module_path'] = module_path
            doc = generate_class_documentation(class_info)
            print(f"\n{'='*50}")
            print(f"{class_name} Documentation")
            print('='*50)
            print(doc[:1000] + "..." if len(doc) > 1000 else doc)
        else:
            print(f"Could not extract info for {class_name}") 