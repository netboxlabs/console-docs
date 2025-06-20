# AI Reference Documentation System

## Overview
This directory contains the standardized templates, style guides, and reference materials for consistent NetBox documentation across all products and platforms.

## Directory Structure

```
ai-reference/
├── README.md                          # This file
├── style-guides/
│   ├── netbox-docs-style-guide.md     # Comprehensive documentation standards
│   ├── frontmatter-specification.md   # Enhanced frontmatter system
│   └── markdown-conventions.md        # Markdown formatting guidelines
├── templates/
│   ├── netbox-feature-doc-template.md # Standard feature documentation
│   ├── product-landing-page.md        # Product overview pages
│   ├── api-documentation.md           # API reference template
│   └── troubleshooting-guide.md       # Troubleshooting template
├── content-strategy/
│   ├── navigation-guidelines.md       # Navigation structure standards
│   ├── version-management.md          # Version handling guidelines
│   └── content-organization.md        # Content categorization
└── prompts/
    ├── content-generation.md          # AI prompting guidelines
    ├── review-checklist.md            # Content review standards
    └── optimization-guide.md          # Content optimization

```

## Key Features

### Enhanced Frontmatter System
All documentation now uses comprehensive metadata:

```yaml
---
tags: [netbox-cloud, netbox-enterprise, administration]
title: "Document Title"
author: "NetBox Labs"
last_updated: "2025-01-XX"
versions:
  netbox_cloud: "v1.10"
  netbox_enterprise: "v1.10"
  netbox_community: "v4.2"
status: "current"
description: "Brief description of the document"
category: "administration"
audience: "administrators"
complexity: "intermediate"
---
```

### Standardized Templates
Pre-built templates ensure consistent documentation structure across all NetBox products.

### AI-Assisted Content Generation
Guidelines and prompts for leveraging AI in documentation creation while maintaining quality and consistency.

## Usage Guidelines

### For Documentation Writers
1. **Always use templates** from the `templates/` directory
2. **Follow style guides** in `style-guides/`
3. **Apply consistent frontmatter** using the enhanced metadata system
4. **Review content** using the provided checklists

### For Developers
1. **Reference API templates** when documenting new features
2. **Use version management guidelines** for feature documentation
3. **Follow navigation standards** for new documentation sections

### For AI Content Generation
1. **Use prompts** from the `prompts/` directory
2. **Apply content optimization** guidelines
3. **Ensure consistency** with existing documentation standards

## Integration with DocHub

This AI reference system integrates with the DocHub transformation pipeline:

1. **Template Conversion**: MkDocs templates are adapted to Docusaurus format
2. **Frontmatter Processing**: Enhanced metadata is converted to DocHub-compatible format
3. **Content Validation**: Automated checks ensure compliance with style guides
4. **Version Management**: Content visibility controlled by version metadata

## Future Enhancements

- **Automated Style Checking**: Integration with linting tools
- **Content Analytics**: Usage metrics and optimization suggestions
- **Dynamic Templates**: Template generation based on content type
- **Multi-language Support**: Internationalization guidelines

## Support

For questions about the AI reference system or documentation standards:
- **Internal Documentation**: Refer to specific style guides
- **Template Issues**: Check the templates directory
- **Integration Problems**: Review the content strategy guidelines

---

This AI reference system provides the foundation for consistent, high-quality documentation across all NetBox products and platforms. 