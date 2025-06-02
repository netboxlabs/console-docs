#!/usr/bin/env python3
"""
Process mkdocstrings autodoc directives in NetBox documentation.

This script processes ::: module.path directives and replaces them with
comprehensive documentation content including class descriptions, usage examples,
and method information.
"""

import os
import re
import glob
from typing import Dict, List, Optional

# Comprehensive class documentation mapping
CLASS_DOCS = {
    # Feature Mixins
    'BookmarksMixin': {
        'description': 'Enables support for user bookmarks. Users can bookmark instances of this model for quick access.',
        'methods': ['get_bookmarks', 'add_bookmark', 'remove_bookmark'],
        'usage_example': '''from netbox.models.features import BookmarksMixin
from django.db import models

class MyModel(BookmarksMixin, models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        ordering = ['name']'''
    },
    'ChangeLoggingMixin': {
        'description': 'Automatically records changes to model instances in the change log. All create, update, and delete operations are tracked with detailed information about what changed, when, and by whom.',
        'methods': ['get_changelog_url', 'get_absolute_url'],
        'usage_example': '''from netbox.models.features import ChangeLoggingMixin
from django.db import models

class MyModel(ChangeLoggingMixin, models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name'''
    },
    'CloningMixin': {
        'description': 'Provides the `clone()` method to prepare a copy of an instance with a new primary key for duplication. The method creates a shallow copy of the object and clears the primary key.',
        'methods': ['clone'],
        'usage_example': '''from netbox.models.features import CloningMixin
from django.db import models

class MyModel(CloningMixin, models.Model):
    name = models.CharField(max_length=100)
    
    def clone(self):
        # Custom cloning logic can be added here
        cloned = super().clone()
        cloned.name = f"{self.name} (Copy)"
        return cloned'''
    },
    'ContactsMixin': {
        'description': 'Enables association of Contact objects with model instances. This feature allows you to associate contact information with your plugin models. Introduced in NetBox v4.3.',
        'methods': ['get_contacts'],
        'usage_example': '''from netbox.models.features import ContactsMixin
from django.db import models

class MyModel(ContactsMixin, models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        ordering = ['name']'''
    },
    'CustomLinksMixin': {
        'description': 'Allows the assignment of custom links that appear in the object\'s view. Links can be conditionally displayed based on object attributes and can point to external URLs or internal NetBox views.',
        'methods': ['get_custom_links'],
        'usage_example': '''from netbox.models.features import CustomLinksMixin
from django.db import models

class MyModel(CustomLinksMixin, models.Model):
    name = models.CharField(max_length=100)
    external_id = models.CharField(max_length=50)
    
    def get_absolute_url(self):
        return reverse('plugins:myplugin:mymodel', args=[self.pk])'''
    },
    'CustomFieldsMixin': {
        'description': 'Enables the addition of user-defined custom fields to the model. Custom fields are dynamically added to forms and API serializers, allowing administrators to extend models without code changes.',
        'methods': ['get_custom_fields', 'clean'],
        'usage_example': '''from netbox.models.features import CustomFieldsMixin
from django.db import models

class MyModel(CustomFieldsMixin, models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        ordering = ['name']'''
    },
    'CustomValidationMixin': {
        'description': 'Supports the enforcement of custom validation rules beyond Django\'s built-in validation. Allows administrators to define custom validation logic for plugin models.',
        'methods': ['clean', 'full_clean'],
        'usage_example': '''from netbox.models.features import CustomValidationMixin
from django.db import models

class MyModel(CustomValidationMixin, models.Model):
    name = models.CharField(max_length=100)
    value = models.IntegerField()
    
    def clean(self):
        super().clean()
        # Custom validation logic here'''
    },
    'EventRulesMixin': {
        'description': 'Enables event rules that can send webhooks or run custom scripts automatically in response to object changes. This allows for powerful automation workflows.',
        'methods': ['get_event_rules'],
        'usage_example': '''from netbox.models.features import EventRulesMixin
from django.db import models

class MyModel(EventRulesMixin, models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name'''
    },
    'ExportTemplatesMixin': {
        'description': 'Allows users to create custom export templates for rendering object data in various formats such as JSON, XML, YAML, or custom text formats.',
        'methods': ['get_export_templates'],
        'usage_example': '''from netbox.models.features import ExportTemplatesMixin
from django.db import models

class MyModel(ExportTemplatesMixin, models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    class Meta:
        ordering = ['name']'''
    },
    'JobsMixin': {
        'description': 'Enables background jobs to be scheduled for model instances. Jobs are executed asynchronously by background workers and can perform long-running operations.',
        'methods': ['get_jobs', 'enqueue_job'],
        'usage_example': '''from netbox.models.features import JobsMixin
from django.db import models

class MyModel(JobsMixin, models.Model):
    name = models.CharField(max_length=100)
    
    def process_data(self):
        # Method that can be run as a background job
        pass'''
    },
    'JournalingMixin': {
        'description': 'Supports persistent historical commentary through journal entries. Users can add notes, comments, and maintain a record of important events or decisions related to object instances.',
        'methods': ['get_journal_entries'],
        'usage_example': '''from netbox.models.features import JournalingMixin
from django.db import models

class MyModel(JournalingMixin, models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name'''
    },
    'TagsMixin': {
        'description': 'Enables tagging of model instances with user-defined tags for organization and filtering. Tags provide a flexible way to categorize and search objects.',
        'methods': ['get_tags'],
        'usage_example': '''from netbox.models.features import TagsMixin
from django.db import models

class MyModel(TagsMixin, models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        ordering = ['name']'''
    },
    
    # View Classes
    'BaseObjectView': {
        'description': 'Base class for single-object views. Provides common functionality for displaying individual model instances including permission checks, context preparation, and template rendering.',
        'methods': ['get_object', 'get_queryset', 'get_extra_context', 'get_template_name'],
        'usage_example': '''from netbox.views.generic import BaseObjectView
from .models import MyModel

class MyModelView(BaseObjectView):
    queryset = MyModel.objects.all()
    template_name = 'myplugin/mymodel.html'
    
    def get_extra_context(self, request, instance):
        return {
            'related_objects': instance.get_related_objects()
        }'''
    },
    'ObjectView': {
        'description': 'Generic view for displaying a single object instance with full detail information. Extends BaseObjectView with additional functionality for rendering object details.',
        'methods': ['get_template_name', 'get_object', 'get_extra_context'],
        'usage_example': '''from netbox.views.generic import ObjectView
from .models import MyModel

class MyModelDetailView(ObjectView):
    queryset = MyModel.objects.all()
    template_name = 'myplugin/mymodel_detail.html' '''
    },
    'ObjectEditView': {
        'description': 'Generic view for creating and updating object instances through a web form interface. Handles both creation of new objects and editing of existing ones.',
        'methods': ['get_object', 'alter_object', 'get_form', 'form_valid'],
        'usage_example': '''from netbox.views.generic import ObjectEditView
from .models import MyModel
from .forms import MyModelForm

class MyModelEditView(ObjectEditView):
    queryset = MyModel.objects.all()
    form = MyModelForm
    template_name = 'myplugin/mymodel_edit.html'
    
    def alter_object(self, obj, request, url_args, url_kwargs):
        # Custom object modification before save
        return obj'''
    },
    'ObjectDeleteView': {
        'description': 'Generic view for confirming and processing object deletion. Provides a confirmation page and handles the actual deletion process with proper error handling.',
        'methods': ['get_object', 'delete_object', 'get_return_url'],
        'usage_example': '''from netbox.views.generic import ObjectDeleteView
from .models import MyModel

class MyModelDeleteView(ObjectDeleteView):
    queryset = MyModel.objects.all()
    template_name = 'myplugin/mymodel_delete.html'
    default_return_url = 'plugins:myplugin:mymodel_list'
    
    def get_return_url(self, request, obj):
        return reverse('plugins:myplugin:mymodel_list')'''
    },
    'ObjectChildrenView': {
        'description': 'Generic view for displaying child objects related to a parent instance. Useful for showing hierarchical relationships and nested object structures.',
        'methods': ['get_children', 'get_child_model', 'get_table', 'prep_table_data'],
        'usage_example': '''from netbox.views.generic import ObjectChildrenView
from .models import MyModel, MyChildModel

class MyModelChildrenView(ObjectChildrenView):
    queryset = MyModel.objects.all()
    child_model = MyChildModel
    table = MyChildModelTable
    template_name = 'myplugin/mymodel_children.html'
    
    def get_children(self, request, parent):
        return MyChildModel.objects.filter(parent=parent)'''
    },
    'BaseMultiObjectView': {
        'description': 'Base class for views that handle multiple objects simultaneously. Provides common functionality for bulk operations, filtering, and pagination.',
        'methods': ['get_queryset', 'get_table', 'get_extra_context', 'get_filterset'],
        'usage_example': '''from netbox.views.generic import BaseMultiObjectView
from .models import MyModel

class MyModelBulkView(BaseMultiObjectView):
    queryset = MyModel.objects.all()
    filterset = MyModelFilterSet
    table = MyModelTable'''
    },
    'ObjectListView': {
        'description': 'Generic view for displaying a paginated list of objects with filtering and search capabilities. Includes support for bulk actions and export functionality.',
        'methods': ['get_table', 'get_filterset', 'export_table', 'export_template'],
        'usage_example': '''from netbox.views.generic import ObjectListView
from .models import MyModel
from .tables import MyModelTable
from .filtersets import MyModelFilterSet

class MyModelListView(ObjectListView):
    queryset = MyModel.objects.all()
    table = MyModelTable
    filterset = MyModelFilterSet
    template_name = 'myplugin/mymodel_list.html' '''
    },
    'BulkImportView': {
        'description': 'Generic view for bulk importing objects from CSV or other data sources. Handles file upload, validation, and batch creation of objects.',
        'methods': ['save_object', 'get_form', 'process_bulk_data'],
        'usage_example': '''from netbox.views.generic import BulkImportView
from .models import MyModel
from .forms import MyModelCSVForm

class MyModelBulkImportView(BulkImportView):
    queryset = MyModel.objects.all()
    model_form = MyModelCSVForm
    table = MyModelTable
    template_name = 'myplugin/mymodel_import.html'
    
    def save_object(self, object_form, request):
        obj = object_form.save(commit=False)
        obj.created_by = request.user
        obj.save()
        return obj'''
    },
    'BulkEditView': {
        'description': 'Generic view for editing multiple objects simultaneously. Allows users to update common fields across multiple selected objects in a single operation.',
        'methods': ['get_form', 'get_queryset', 'update_objects'],
        'usage_example': '''from netbox.views.generic import BulkEditView
from .models import MyModel
from .forms import MyModelBulkEditForm

class MyModelBulkEditView(BulkEditView):
    queryset = MyModel.objects.all()
    filterset = MyModelFilterSet
    table = MyModelTable
    form = MyModelBulkEditForm
    template_name = 'myplugin/mymodel_bulk_edit.html' '''
    },
    'BulkDeleteView': {
        'description': 'Generic view for deleting multiple objects in a single operation. Provides confirmation and handles batch deletion with proper error handling and logging.',
        'methods': ['get_form', 'get_queryset', 'delete_objects'],
        'usage_example': '''from netbox.views.generic import BulkDeleteView
from .models import MyModel

class MyModelBulkDeleteView(BulkDeleteView):
    queryset = MyModel.objects.all()
    filterset = MyModelFilterSet
    table = MyModelTable
    template_name = 'myplugin/mymodel_bulk_delete.html'
    default_return_url = 'plugins:myplugin:mymodel_list' '''
    },
    'ObjectChangeLogView': {
        'description': 'Generic view for displaying the change log history of an object. Shows a chronological list of all changes made to the object including who made changes and when.',
        'methods': ['get_form', 'get_object', 'get_changelog'],
        'usage_example': '''from netbox.views.generic import ObjectChangeLogView
from .models import MyModel

class MyModelChangeLogView(ObjectChangeLogView):
    queryset = MyModel.objects.all()
    template_name = 'myplugin/mymodel_changelog.html' '''
    },
    'ObjectJournalView': {
        'description': 'Generic view for displaying and managing journal entries for an object. Allows users to view existing journal entries and add new ones.',
        'methods': ['get_form', 'get_object', 'get_journal_entries'],
        'usage_example': '''from netbox.views.generic import ObjectJournalView
from .models import MyModel

class MyModelJournalView(ObjectJournalView):
    queryset = MyModel.objects.all()
    template_name = 'myplugin/mymodel_journal.html' '''
    },
    
    # Utility Classes
    'register_model_view': {
        'description': 'Decorator function for registering views with NetBox\'s URL routing system. Allows automatic URL generation and integration with NetBox\'s navigation.',
        'methods': [],
        'usage_example': '''from utilities.views import register_model_view
from netbox.views.generic import ObjectEditView
from .models import MyModel

@register_model_view(MyModel, name='edit')
class MyModelEditView(ObjectEditView):
    queryset = MyModel.objects.all()
    template_name = 'myplugin/mymodel_edit.html' '''
    },
    'get_model_urls': {
        'description': 'Function for retrieving registered URL patterns for a model. Used in URLconf to include all registered views for a specific model.',
        'methods': [],
        'usage_example': '''from django.urls import path, include
from utilities.urls import get_model_urls

urlpatterns = [
    path('things/', include(get_model_urls('myplugin', 'thing'))),
]'''
    },
    'ViewTab': {
        'description': 'Class for defining custom tabs in NetBox object views. Allows plugins to add additional tabs to core NetBox model views or to their own model views.',
        'methods': ['render', 'get_badge_count'],
        'usage_example': '''from utilities.views import ViewTab

tab = ViewTab(
    label='Related Items',
    badge=lambda obj: obj.related_items.count(),
    permission='myplugin.view_relateditem',
    weight=100
)'''
    },
    
    # Table Column Classes
    'BooleanColumn': {
        'description': 'Table column for displaying boolean values with checkmarks, icons, or custom representations instead of raw True/False text.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import BooleanColumn

class MyModelTable(tables.Table):
    is_active = BooleanColumn()'''
    },
    'ChoiceFieldColumn': {
        'description': 'Table column for displaying choice field values with their human-readable labels rather than database values.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import ChoiceFieldColumn

class MyModelTable(tables.Table):
    status = ChoiceFieldColumn()'''
    },
    'ColorColumn': {
        'description': 'Table column for displaying color values as colored indicators, swatches, or with visual color representation.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import ColorColumn

class MyModelTable(tables.Table):
    color = ColorColumn()'''
    },
    'ColoredLabelColumn': {
        'description': 'Table column for displaying values as colored labels or badges with background colors and proper contrast.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import ColoredLabelColumn

class MyModelTable(tables.Table):
    status = ColoredLabelColumn()'''
    },
    'ContentTypeColumn': {
        'description': 'Table column for displaying Django ContentType references with proper model names and app labels.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import ContentTypeColumn

class MyModelTable(tables.Table):
    content_type = ContentTypeColumn()'''
    },
    'ContentTypesColumn': {
        'description': 'Table column for displaying multiple ContentType references as a list or comma-separated values.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import ContentTypesColumn

class MyModelTable(tables.Table):
    content_types = ContentTypesColumn()'''
    },
    'MarkdownColumn': {
        'description': 'Table column for rendering Markdown content as HTML with proper formatting and syntax highlighting.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import MarkdownColumn

class MyModelTable(tables.Table):
    description = MarkdownColumn()'''
    },
    'TagColumn': {
        'description': 'Table column for displaying model tags as colored badges with proper tag formatting and linking.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import TagColumn

class MyModelTable(tables.Table):
    tags = TagColumn()'''
    },
    'TemplateColumn': {
        'description': 'Table column that renders content using a custom template, allowing for complex custom formatting and layout.',
        'methods': ['render'],
        'usage_example': '''import django_tables2 as tables
from utilities.tables import TemplateColumn

class MyModelTable(tables.Table):
    custom_field = TemplateColumn(
        template_code='<strong>{{ value }}</strong>'
    )'''
    }
}

def extract_module_info(autodoc_line: str) -> Optional[Dict[str, str]]:
    """Extract module path and class name from autodoc directive."""
    match = re.match(r'^(\s*)::: (.+)$', autodoc_line.strip())
    if not match:
        return None
    
    indent = match.group(1)
    module_path = match.group(2)
    
    # Extract class name from module path
    parts = module_path.split('.')
    class_name = parts[-1]
    
    return {
        'indent': indent,
        'module_path': module_path,
        'class_name': class_name
    }

def generate_documentation(module_info: Dict[str, str]) -> str:
    """Generate comprehensive documentation for a class."""
    class_name = module_info['class_name']
    module_path = module_info['module_path']
    indent = module_info['indent']
    
    # Get class documentation or use fallback
    class_doc = CLASS_DOCS.get(class_name, {
        'description': f'This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.',
        'methods': [],
        'usage_example': f'''from {module_path.rsplit('.', 1)[0]} import {class_name}

# Usage example would depend on the specific class
# Refer to NetBox documentation for details'''
    })
    
    # Generate documentation sections
    doc_parts = []
    
    # Class header
    doc_parts.append(f"{indent}#### {class_name}")
    doc_parts.append("")
    
    # Module information
    doc_parts.append(f"{indent}**Module:** `{module_path}`")
    doc_parts.append("")
    
    # Description
    doc_parts.append(f"{indent}{class_doc['description']}")
    doc_parts.append("")
    
    # Methods (if available)
    if class_doc.get('methods'):
        doc_parts.append(f"{indent}**Key Methods:**")
        for method in class_doc['methods']:
            doc_parts.append(f"{indent}- `{method}()`")
        doc_parts.append("")
    
    # Usage example
    doc_parts.append(f"{indent}**Usage:**")
    doc_parts.append(f"{indent}```python")
    
    # Add each line of the usage example with proper indentation
    for line in class_doc['usage_example'].split('\n'):
        if line.strip():
            doc_parts.append(f"{indent}{line}")
        else:
            doc_parts.append("")
    
    doc_parts.append(f"{indent}```")
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
            if line.strip().startswith('::: netbox.'):
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
                        # Skip configuration lines
                        if lines[i].strip() and not lines[i].strip().startswith('- '):
                            break
                        i += 1
                    continue
            
            # Add non-autodoc lines as-is
            processed_lines.append(line)
            i += 1
        
        # Write back to file if content changed
        new_content = '\n'.join(processed_lines)
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
    # Find all markdown files in the docs directories
    doc_patterns = [
        'docs/netbox/**/*.md',
        'docs/console/**/*.md'
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