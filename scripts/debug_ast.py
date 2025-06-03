#!/usr/bin/env python3
"""
Debug AST parsing to see all methods in ObjectListView.
"""

import ast
import os

# Read the ObjectListView file
file_path = "/Users/tom/git/netboxlabs-website-combined2/external-repos/netbox/netbox/netbox/views/generic/bulk_views.py"

with open(file_path, 'r', encoding='utf-8') as f:
    source = f.read()

tree = ast.parse(source)

for node in ast.walk(tree):
    if isinstance(node, ast.ClassDef) and node.name == 'ObjectListView':
        print(f"Found ObjectListView class")
        print(f"Number of body items: {len(node.body)}")
        
        method_count = 0
        for i, item in enumerate(node.body):
            if isinstance(item, ast.FunctionDef):
                method_count += 1
                print(f"  Method {method_count}: {item.name} (line ~{item.lineno})")
            elif isinstance(item, ast.Assign):
                # Class attribute
                for target in item.targets:
                    if isinstance(target, ast.Name):
                        print(f"  Attribute: {target.id}")
            else:
                print(f"  Other: {type(item).__name__}")
        
        print(f"\nTotal methods found: {method_count}")
        break 