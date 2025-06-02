# Map NetBox modules to their source file locations
MODULE_FILE_MAP = {
    'netbox.models.features': '../external-repos/netbox/netbox/netbox/models/features.py',
    'netbox.views.generic': '../external-repos/netbox/netbox/netbox/views/generic',
    'netbox.views.generic.base': '../external-repos/netbox/netbox/netbox/views/generic/base.py',
    'netbox.tables': '../external-repos/netbox/netbox/utilities/tables.py',
    'netbox.search': '../external-repos/netbox/netbox/netbox/search',
    'netbox.jobs': '../external-repos/netbox/netbox/netbox/jobs.py',
    'netbox.data_backends': '../external-repos/netbox/netbox/netbox/data_backends.py',
    'netbox.events': '../external-repos/netbox/netbox/netbox/events.py',
    'netbox.graphql.types': '../external-repos/netbox/netbox/netbox/graphql/types.py',
    'utilities.views': '../external-repos/netbox/netbox/utilities/views.py',
    'utilities.tables': '../external-repos/netbox/netbox/utilities/tables.py',
} 

import os

# Fallback: try to construct path from module
base_path = '../external-repos/netbox/netbox'
module_parts = module_path.split('.')

# Try different patterns
patterns = [
    os.path.join(base_path, *module_parts) + '.py',
    os.path.join(base_path, *module_parts, '__init__.py'),
    os.path.join(base_path, *module_parts[:-1], f'{module_parts[-1]}.py'),
] 