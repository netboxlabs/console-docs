#!/usr/bin/env python3
"""
Debug script to test autodoc processing.
"""

import os
from process_autodoc import find_source_file, extract_class_from_file

# Test problematic view classes
test_cases = [
    ('netbox.views.generic', 'BulkImportView'),
    ('netbox.views.generic', 'ObjectChangeLogView'),
    ('netbox.views.generic', 'ObjectJournalView'),
]

for module_path, class_name in test_cases:
    print(f"\nTesting {module_path}.{class_name}")
    
    # Test file resolution
    source_file = find_source_file(module_path, class_name)
    print(f"Source file: {source_file}")
    
    if source_file and os.path.exists(source_file):
        print(f"File exists: ✓")
        
        # Test class extraction
        class_info = extract_class_from_file(source_file, class_name)
        if class_info:
            print(f"Class found: ✓")
            print(f"Description: {class_info['description'][:100]}...")
            print(f"Methods found: {len(class_info['methods'])}")
            print(f"Bases: {class_info['bases']}")
            
            print("\nAll methods:")
            for i, method in enumerate(class_info['methods']):
                print(f"  {i+1}. {method['name']}{method['signature']}")
                if method['description']:
                    print(f"     Desc: {method['description'][:50]}...")
                print(f"     Params: {len(method['parameters'])}")
        else:
            print(f"Class NOT found in {source_file}")
    else:
        print(f"File NOT found or doesn't exist") 