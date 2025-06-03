#!/usr/bin/env python3
"""
Process mkdocstrings autodoc directives in NetBox documentation.

This script processes ::: module.path directives and replaces them with
comprehensive documentation content extracted from the actual Python source code.
"""

import ast
import os
import re
import glob
from typing import Dict, List, Optional

# Map NetBox modules to their source file locations
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRIPT_DIR)

MODULE_FILE_MAP = {
    'netbox.models.features': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/models/features.py'),
    'netbox.views.generic': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/views/generic'),  # Directory
    'netbox.views.generic.base': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/views/generic/base.py'),
    'netbox.tables': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/tables/columns.py'),  # Table column classes
    'netbox.search': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/search'),
    'netbox.jobs': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/jobs.py'),
    'netbox.data_backends': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/data_backends.py'),
    'netbox.events': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/events.py'),
    'netbox.graphql.types': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/netbox/graphql/types.py'),
    'utilities.views': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/utilities/views.py'),
    'utilities.tables': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/utilities/tables.py'),
    'utilities.templatetags.builtins.tags': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/utilities/templatetags/builtins/tags.py'),
    'utilities.templatetags.builtins': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/utilities/templatetags/builtins'),
    'extras.dashboard.widgets': os.path.join(BASE_DIR, 'external-repos/netbox/netbox/extras/dashboard/widgets.py'),
}

# Specific class to file mappings for netbox.views.generic
VIEW_CLASS_FILES = {
    'ObjectView': 'object_views.py',
    'ObjectEditView': 'object_views.py',
    'ObjectDeleteView': 'object_views.py',
    'ObjectChildrenView': 'object_views.py',
    'ObjectListView': 'bulk_views.py',
    'BulkCreateView': 'bulk_views.py',
    'BulkImportView': 'bulk_views.py',
    'BulkEditView': 'bulk_views.py',
    'BulkDeleteView': 'bulk_views.py',
    'BaseObjectView': 'base.py',
    'BaseMultiObjectView': 'base.py',
    'ObjectChangeLogView': 'feature_views.py',
    'ObjectJournalView': 'feature_views.py',
}

def escape_mdx_content(text: str) -> str:
    """Escape content that might conflict with MDX parsing."""
    if not text:
        return text
    
    # Only replace the exact problematic strings that cause MDX compilation errors
    
    # Replace specific template filter examples that cause acorn parsing errors
    text = text.replace('{{ data_dict|json }}', '`{{ data_dict|json }}`')
    text = text.replace('{{ md_source_text|markdown }}', '`{{ md_source_text|markdown }}`')
    
    # Replace the specific Django URL pattern that causes JSX parsing issues
    text = text.replace('<int:pk>', '&lt;int:pk&gt;')
    
    # Replace specific kwargs patterns that cause acorn parsing errors
    text = text.replace("{'model': Site}", "\\{'model': Site\\}")
    text = text.replace("kwargs={'model': Site}", "kwargs=\\{'model': Site\\}")
    
    # Fix the specific Site model reference that causes "Site is not defined" JavaScript error
    text = text.replace("kwargs=\\{'model': Site\\}", "kwargs=\\{'model': 'Site'\\}")
    
    # Fix template string patterns that cause "app is not defined" JavaScript errors
    text = text.replace('"{app}/{model}.html"', '"`{app}/{model}.html`"')
    text = text.replace("'{app}/{model}.html'", "'{app}/{model}.html'")
    
    # Replace any other Django template syntax that might cause issues
    # Look for {{ variable|filter }} patterns
    text = re.sub(r'\{\{\s*[^}]+\|[^}]+\s*\}\}', lambda m: f'`{m.group(0)}`', text)
    
    return text

def parse_docstring(docstring: str) -> Dict[str, str]:
    """Parse a Google/NumPy style docstring to extract description and parameters."""
    if not docstring:
        return {'description': '', 'parameters': [], 'returns': '', 'attributes': []}
    
    lines = docstring.strip().split('\n')
    description_lines = []
    parameters = []
    attributes = []
    returns = ''
    
    current_section = 'description'
    
    for line in lines:
        line = line.strip()
        
        # Check for section headers
        if line.lower() in ['args:', 'arguments:', 'parameters:', 'param:', 'params:']:
            current_section = 'parameters'
            continue
        elif line.lower() in ['attributes:', 'attribute:']:
            current_section = 'attributes'
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
                    'description': param_desc
                })
            elif parameters and line and not line.startswith(' '):
                # Continuation of previous parameter description
                parameters[-1]['description'] += ' ' + line
        elif current_section == 'attributes':
            # Look for attribute definitions like "tab: A ViewTab instance..."
            attr_match = re.match(r'^(\w+):\s*(.+)', line)
            if attr_match:
                attr_name, attr_desc = attr_match.groups()
                attributes.append({
                    'name': attr_name,
                    'description': attr_desc
                })
            elif attributes and line and not line.startswith(' '):
                # Continuation of previous attribute description
                attributes[-1]['description'] += ' ' + line
        elif current_section == 'returns':
            returns += line + ' '
    
    description = ' '.join(description_lines).strip()
    # Clean up extra whitespace and code blocks
    description = re.sub(r'\s+', ' ', description)
    
    return {
        'description': description,
        'parameters': parameters,
        'returns': returns.strip(),
        'attributes': attributes
    }

def extract_function_from_ast(func_node: ast.FunctionDef) -> Dict[str, str]:
    """Extract function information from AST node."""
    func_info = {
        'name': func_node.name,
        'signature': '',
        'description': '',
        'parameters': [],
        'returns': ''
    }
    
    # Get docstring
    if (func_node.body and 
        isinstance(func_node.body[0], ast.Expr) and 
        isinstance(func_node.body[0].value, ast.Constant) and 
        isinstance(func_node.body[0].value.value, str)):
        
        docstring = func_node.body[0].value.value
        parsed_doc = parse_docstring(docstring)
        func_info['description'] = parsed_doc['description']
        func_info['returns'] = parsed_doc['returns']
        
        # Create parameter lookup for docstring descriptions
        doc_params_lookup = {p['name']: p['description'] for p in parsed_doc['parameters']}
    else:
        doc_params_lookup = {}
    
    # Extract parameters from function signature
    params = []
    
    for arg in func_node.args.args:
        param_info = {
            'name': arg.arg,
            'type': 'Any',
            'default': None,
            'description': doc_params_lookup.get(arg.arg, 'No description available')
        }
        
        # Get type annotation
        if arg.annotation:
            try:
                param_info['type'] = ast.unparse(arg.annotation)
            except:
                param_info['type'] = 'Any'
        
        params.append(param_info)
    
    # Handle defaults
    defaults = func_node.args.defaults
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
    
    func_info['parameters'] = params
    
    # Build signature
    param_strs = []
    for param in params:
        param_str = param['name']
        if param['default'] is not None:
            param_str += f"={param['default']}"
        param_strs.append(param_str)
    
    func_info['signature'] = f"({', '.join(param_strs)})"
    
    return func_info

def extract_method_from_ast(method_node: ast.FunctionDef) -> Dict[str, str]:
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
        
        # Create parameter lookup for docstring descriptions
        doc_params_lookup = {p['name']: p['description'] for p in parsed_doc['parameters']}
    else:
        doc_params_lookup = {}
    
    # Extract parameters from method signature
    params = []
    
    for arg in method_node.args.args:
        if arg.arg == 'self':
            continue
            
        param_info = {
            'name': arg.arg,
            'type': 'Any',
            'default': None,
            'description': doc_params_lookup.get(arg.arg, 'No description available')
        }
        
        # Get type annotation
        if arg.annotation:
            try:
                param_info['type'] = ast.unparse(arg.annotation)
            except:
                param_info['type'] = 'Any'
        
        params.append(param_info)
    
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
    
    method_info['parameters'] = params
    
    # Build signature
    param_strs = []
    for param in params:
        param_str = param['name']
        if param['default'] is not None:
            param_str += f"={param['default']}"
        param_strs.append(param_str)
    
    # Add *args if present
    if method_node.args.vararg:
        param_strs.append(f"*{method_node.args.vararg.arg}")
    
    # Add **kwargs if present
    if method_node.args.kwarg:
        param_strs.append(f"**{method_node.args.kwarg.arg}")
    
    method_info['signature'] = f"({', '.join(param_strs)})"
    
    return method_info

def extract_function_from_file(file_path: str, function_name: str) -> Optional[Dict[str, str]]:
    """Extract function information from a Python source file using AST."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            source = f.read()
        
        tree = ast.parse(source)
        
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef) and node.name == function_name:
                func_info = extract_function_from_ast(node)
                return func_info
        
        return None
        
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
        return None

def extract_class_from_file(file_path: str, class_name: str) -> Optional[Dict[str, str]]:
    """Extract class information from a Python source file using AST."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            source = f.read()
        
        tree = ast.parse(source)
        
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef) and node.name == class_name:
                class_info = {
                    'class_name': class_name,
                    'description': '',
                    'methods': [],
                    'bases': [],
                    'attributes': []
                }
                
                # Get class docstring
                if (node.body and 
                    isinstance(node.body[0], ast.Expr) and 
                    isinstance(node.body[0].value, ast.Constant) and 
                    isinstance(node.body[0].value.value, str)):
                    
                    docstring = node.body[0].value.value
                    parsed_doc = parse_docstring(docstring)
                    class_info['description'] = parsed_doc['description']
                    class_info['attributes'] = parsed_doc['attributes']
                
                # Extract base classes
                for base in node.bases:
                    try:
                        if isinstance(base, ast.Name):
                            class_info['bases'].append(base.id)
                        elif isinstance(base, ast.Attribute):
                            # Handle module.ClassName format
                            base_name = ast.unparse(base)
                            # Simplify common Django base classes
                            if base_name == 'models.Model':
                                class_info['bases'].append('Model')
                            else:
                                class_info['bases'].append(base_name.split('.')[-1])
                        else:
                            # Fallback for complex base expressions
                            base_name = ast.unparse(base)
                            class_info['bases'].append(base_name.split('.')[-1])
                    except:
                        continue
                
                # Extract methods
                for item in node.body:
                    if isinstance(item, ast.FunctionDef):
                        # Skip private methods except special ones
                        if item.name.startswith('_') and item.name not in ['__str__', '__init__']:
                            continue
                        
                        # Skip certain internal/permission methods that shouldn't be documented
                        if item.name in ['get_required_permission', 'dispatch']:
                            continue
                        
                        method_info = extract_method_from_ast(item)
                        # Include all public methods, not just those with descriptions
                        class_info['methods'].append(method_info)
                
                return class_info
        
        return None
        
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
        return None

def find_source_file(module_path: str, class_name: str) -> Optional[str]:
    """Find the source file for a given module and class."""
    # Special handling for netbox.views.generic classes
    if module_path == 'netbox.views.generic' and class_name in VIEW_CLASS_FILES:
        views_dir = MODULE_FILE_MAP[module_path]
        specific_file = os.path.join(views_dir, VIEW_CLASS_FILES[class_name])
        if os.path.isfile(specific_file):
            return specific_file
    
    # Try exact module mapping first
    if module_path in MODULE_FILE_MAP:
        source_file = MODULE_FILE_MAP[module_path]
        if os.path.isfile(source_file):
            return source_file
        elif os.path.isdir(source_file):
            # Try common Python file patterns in directory
            for pattern in ['__init__.py', f'{class_name.lower()}.py', 'base.py']:
                file_path = os.path.join(source_file, pattern)
                if os.path.isfile(file_path):
                    return file_path
    
    # Fallback: try to construct path from module
    base_path = os.path.join(BASE_DIR, 'external-repos/netbox/netbox')
    module_parts = module_path.split('.')
    
    # Try different patterns
    patterns = [
        os.path.join(base_path, *module_parts) + '.py',
        os.path.join(base_path, *module_parts, '__init__.py'),
        os.path.join(base_path, *module_parts[:-1], f'{module_parts[-1]}.py'),
    ]
    
    for pattern in patterns:
        if os.path.isfile(pattern):
            return pattern
    
    return None

def generate_function_documentation(func_info: Dict[str, str], indent: str = "") -> str:
    """Generate documentation for a function."""
    doc_parts = []
    
    # Function header - use ### for better nesting under main sections
    doc_parts.append(f"{indent}### {func_info['name']}")
    doc_parts.append("")
    
    # Function signature in code block
    doc_parts.append(f"{indent}```")
    doc_parts.append(f"{indent}{func_info['name']}{func_info['signature']}")
    doc_parts.append(f"{indent}```")
    doc_parts.append("")
    
    # Description
    if func_info['description']:
        doc_parts.append(f"{indent}{escape_mdx_content(func_info['description'])}")
        doc_parts.append("")
    
    # Parameters - only show table if there are meaningful parameter descriptions
    if func_info['parameters']:
        # Check if we have any meaningful parameter descriptions
        meaningful_params = []
        for param in func_info['parameters']:
            if (param['description'] and 
                param['description'] != 'No description available' and 
                param['description'].strip()):
                meaningful_params.append(param)
        
        # Only show parameters table if we have meaningful descriptions
        if meaningful_params:
            doc_parts.append(f"{indent}**Parameters:**")
            doc_parts.append("")
            doc_parts.append(f"{indent}| Name | Type | Description | Default |")
            doc_parts.append(f"{indent}| --- | --- | --- | --- |")
            
            for param in meaningful_params:
                name = param['name']
                param_type = param['type'] if param['type'] != 'Any' else ''
                description = escape_mdx_content(param['description'])
                
                # Handle default values
                if param['default'] and param['default'] not in ['-', 'None']:
                    default = param['default']
                else:
                    default = 'required'
                
                doc_parts.append(f"{indent}| {name} | {param_type} | {description} | {default} |")
            
            doc_parts.append("")
    
    # Returns
    if func_info['returns']:
        doc_parts.append(f"{indent}**Returns:** {escape_mdx_content(func_info['returns'])}")
        doc_parts.append("")
    
    return '\n'.join(doc_parts)

def extract_module_info(autodoc_line: str) -> Optional[Dict[str, str]]:
    """Extract module path and class/function name from autodoc directive."""
    match = re.match(r'^(\s*)::: (.+)$', autodoc_line.strip())
    if not match:
        return None
    
    indent = match.group(1)
    full_path = match.group(2)
    
    # Extract function/class name (last part) and module path (everything before)
    parts = full_path.split('.')
    item_name = parts[-1]
    module_path = '.'.join(parts[:-1])  # Join all parts except the last one
    
    # Determine if this is likely a function or class based on module path
    item_type = 'class'  # default
    if 'templatetags' in module_path:
        item_type = 'function'
    
    return {
        'indent': indent,
        'module_path': module_path,
        'item_name': item_name,
        'class_name': item_name,  # Keep for backward compatibility
        'full_path': full_path,
        'item_type': item_type
    }

def generate_method_documentation(method: Dict[str, str], indent: str = "") -> str:
    """Generate documentation for a single method."""
    doc_parts = []
    
    # Method header - escape double underscores for __init__ and other special methods
    method_name = method['name']
    if method_name.startswith('__') and method_name.endswith('__'):
        # Escape double underscores to prevent markdown emphasis
        escaped_name = method_name.replace('__', '\\_\\_')
        doc_parts.append(f"{indent}#### {escaped_name}{method['signature']}")
    else:
        doc_parts.append(f"{indent}#### {method_name}{method['signature']}")
    doc_parts.append("")
    
    # Description
    if method['description']:
        # Split long descriptions into paragraphs
        desc_lines = method['description'].split('. ')
        for line in desc_lines:
            if line.strip():
                escaped_line = escape_mdx_content(line.strip())
                doc_parts.append(f"{indent}{escaped_line}{'.' if not escaped_line.endswith('.') else ''}")
        doc_parts.append("")
    
    # Parameters table
    if method['parameters']:
        doc_parts.append(f"{indent}**Parameters:**")
        doc_parts.append("")
        doc_parts.append(f"{indent}| Name | Type | Description | Default |")
        doc_parts.append(f"{indent}| --- | --- | --- | --- |")
        
        for param in method['parameters']:
            name = param['name']
            param_type = param['type']
            default = param['default'] or '-'
            description = param['description'] or 'No description available'
            doc_parts.append(f"{indent}| {name} | {param_type} | {description} | {default} |")
        
        doc_parts.append("")
    
    # Returns
    if method['returns']:
        doc_parts.append(f"{indent}**Returns:** {method['returns']}")
        doc_parts.append("")
    
    return '\n'.join(doc_parts)

def generate_documentation(module_info: Dict[str, str]) -> str:
    """Generate comprehensive documentation for a class or function."""
    item_name = module_info['item_name']
    module_path = module_info['module_path']
    indent = module_info['indent']
    item_type = module_info.get('item_type', 'class')
    
    # Find and parse source file
    source_file = find_source_file(module_path, item_name)
    if not source_file:
        # Fallback to generic documentation
        return generate_fallback_documentation(module_info)
    
    if item_type == 'function':
        # Extract function information
        func_info = extract_function_from_file(source_file, item_name)
        if not func_info:
            return generate_fallback_documentation(module_info)
        return generate_function_documentation(func_info, indent)
    else:
        # Extract class information (existing logic)
        class_info = extract_class_from_file(source_file, item_name)
        if not class_info:
            return generate_fallback_documentation(module_info)
        
        # Generate documentation sections
        doc_parts = []
        
        # Class header - use ### to nest under main sections like "Columns"
        doc_parts.append(f"{indent}### {item_name}")
        doc_parts.append("")
        
        # Bases (if available)
        if class_info['bases']:
            doc_parts.append(f"{indent}**Bases:** {', '.join(class_info['bases'])}")
            doc_parts.append("")
        
        # Description
        if class_info['description']:
            doc_parts.append(f"{indent}{escape_mdx_content(class_info['description'])}")
        else:
            doc_parts.append(f"{indent}Provides functionality for NetBox plugin development.")
        doc_parts.append("")
        
        # Attributes (if available)
        if class_info['attributes']:
            doc_parts.append(f"{indent}**Attributes:**")
            doc_parts.append("")
            doc_parts.append(f"{indent}| Name | Type | Description |")
            doc_parts.append(f"{indent}| --- | --- | --- |")
            
            for attr in class_info['attributes']:
                name = attr['name']
                # Try to infer type from description or use generic
                attr_type = 'Any'  # Could be enhanced to parse type from description
                description = escape_mdx_content(attr['description'])
                doc_parts.append(f"{indent}| {name} | {attr_type} | {description} |")
            
            doc_parts.append("")
        
        # Methods (directly without "Methods" header)
        if class_info['methods']:
            # For model feature mixins, include all meaningful public methods
            # For table columns, only include __init__ method if it has meaningful parameters
            
            methods_to_show = []
            
            # Check if this is a table column class (from netbox.tables module)
            is_table_column = module_path == 'netbox.tables'
            
            if is_table_column:
                # For table columns, only include __init__ method if it has meaningful parameters
                init_method = None
                for method in class_info['methods']:
                    if method['name'] == '__init__':
                        # Check if __init__ has meaningful parameters (beyond self)
                        meaningful_params = []
                        for param in method['parameters']:
                            if (param['description'] and 
                                param['description'] != 'No description available' and 
                                param['description'].strip()):
                                meaningful_params.append(param)
                        
                        # Only include __init__ if it has meaningful parameters
                        if meaningful_params:
                            init_method = method
                        break
                
                if init_method:
                    methods_to_show.append(('init', init_method))
            else:
                # For model feature mixins and other classes, include all meaningful public methods
                for method in class_info['methods']:
                    # Skip private methods except special ones
                    if method['name'].startswith('_') and method['name'] not in ['__str__', '__init__']:
                        continue
                    
                    # Skip certain internal/permission methods that shouldn't be documented
                    if method['name'] in ['get_required_permission', 'dispatch', 'clean', 'save', 'delete']:
                        continue
                    
                    # Include methods with descriptions or meaningful parameters
                    if (method['description'] and 
                        method['description'].strip() and 
                        method['description'] != 'No description available'):
                        methods_to_show.append(('method', method))
                    elif method['parameters']:
                        # Include methods with meaningful parameters even if no description
                        meaningful_params = [p for p in method['parameters'] 
                                           if p['description'] and p['description'] != 'No description available']
                        if meaningful_params:
                            methods_to_show.append(('method', method))
            
            # Generate documentation for selected methods
            for method_type, method in methods_to_show:
                if method_type == 'init':
                    # Escape the double underscores to prevent markdown emphasis
                    doc_parts.append(f"{indent}#### \\_\\_init\\_\\_{method['signature']}")
                    doc_parts.append("")
                    
                    # Parameters table for __init__
                    if method['parameters']:
                        meaningful_params = []
                        for param in method['parameters']:
                            if (param['description'] and 
                                param['description'] != 'No description available' and 
                                param['description'].strip()):
                                meaningful_params.append(param)
                        
                        if meaningful_params:
                            doc_parts.append(f"{indent}**Parameters:**")
                            doc_parts.append("")
                            doc_parts.append(f"{indent}| Name | Type | Description | Default |")
                            doc_parts.append(f"{indent}| --- | --- | --- | --- |")
                            
                            for param in meaningful_params:
                                name = param['name']
                                param_type = param['type'] if param['type'] != 'Any' else ''
                                description = escape_mdx_content(param['description'])
                                
                                # Handle default values
                                if param['default'] and param['default'] not in ['-', 'None']:
                                    default = param['default']
                                else:
                                    default = 'required'
                                
                                doc_parts.append(f"{indent}| {name} | {param_type} | {description} | {default} |")
                            
                            doc_parts.append("")
                else:
                    # Regular method documentation
                    method_doc = generate_method_documentation(method, indent)
                    doc_parts.append(method_doc)
        
        return '\n'.join(doc_parts)

def generate_fallback_documentation(module_info: Dict[str, str]) -> str:
    """Generate fallback documentation when source parsing fails."""
    class_name = module_info['class_name']
    module_path = module_info['module_path']
    indent = module_info['indent']
    
    doc_parts = []
    doc_parts.append(f"{indent}### {class_name}")
    doc_parts.append("")
    doc_parts.append(f"{indent}This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.")
    doc_parts.append("")
    
    return '\n'.join(doc_parts)

def process_file(file_path: str) -> bool:
    """Process a single markdown file to transform autodoc directives."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        lines = content.split('\n')
        processed_lines = []
        i = 0
        
        while i < len(lines):
            line = lines[i]
            
            # Check if this line is an autodoc directive
            if line.strip().startswith('::: netbox.') or line.strip().startswith('::: utilities.') or line.strip().startswith('::: extras.'):
                module_info = extract_module_info(line)
                if module_info:
                    # Generate documentation for this class
                    documentation = generate_documentation(module_info)
                    processed_lines.append(documentation)
                    
                    # Skip any following configuration lines
                    i += 1
                    while i < len(lines) and (
                        lines[i].strip().startswith('options:') or
                        lines[i].strip().startswith('members:') or
                        lines[i].strip().startswith('- ') or
                        lines[i].strip() == ''
                    ):
                        # Skip configuration lines but break on non-config content
                        if lines[i].strip() and not lines[i].strip().startswith(('options:', 'members:', '- ')):
                            break
                        i += 1
                    continue
            
            # Add non-autodoc lines as-is (no comprehensive escaping)
            processed_lines.append(line)
            i += 1
        
        # Apply targeted escaping only to specific known problematic content
        new_content = '\n'.join(processed_lines)
        new_content = escape_mdx_content(new_content)
        
        if new_content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        
        return False
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all markdown files."""
    # Find all markdown files in the docs directories (not external-repos)
    doc_patterns = [
        'docs/netbox/**/*.md',
        'docs/console/**/*.md',
    ]
    
    total_files = 0
    processed_files = 0
    
    for pattern in doc_patterns:
        files = glob.glob(pattern, recursive=True)
        for file_path in files:
            total_files += 1
            if process_file(file_path):
                processed_files += 1
                print(f"Processed: {file_path}")
    
    print(f"\nProcessing complete:")
    print(f"Total files checked: {total_files}")
    print(f"Files modified: {processed_files}")

if __name__ == '__main__':
    main() 