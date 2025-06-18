# DocHub Integration Guide

## Overview

The `console-docs` repository is now optimized for DocHub integration with:
- **Frontmatter-based product tagging** (replacing HTML pills)
- **Enhanced metadata** for better content processing
- **Simplified navigation** (DocHub handles the complex structure)
- **DocHub-specific configuration** in `mkdocs.yml`

## Key Changes for DocHub

### 1. Product Tagging System

**Old Format (Deprecated):**
```html
<span class="pill pill-cloud">NetBox Cloud</span>
```

**New Format (DocHub-Ready):**
```yaml
---
tags:
  - netbox-cloud
  - netbox-enterprise
---
```

### 2. Available Product Tags

| Tag | Label | Color | Description |
|-----|-------|-------|-------------|
| `netbox-cloud` | NetBox Cloud | #00d9be | Cloud features and administration |
| `netbox-enterprise` | NetBox Enterprise | #ffac00 | On-premises features |
| `netbox-community` | NetBox Community | #00bee0 | Community edition features |
| `netbox-airgap` | NetBox Air-Gap | #ff0078 | Air-gap deployment features |

### 3. Enhanced Frontmatter Structure

Documents now include comprehensive metadata:

```yaml
---
tags: [product-tags]
title: "Document Title"
author: "Author Name or NetBox Labs Documentation Team"
last_updated: "YYYY-MM-DD"
versions:
  cloud: "v1.9 | v1.10"
  enterprise: "v1.9 | v1.10"
  community: "v4.2"
status: "current | beta | coming-soon | deprecated"
category: "feature | integration | admin | getting-started"
audience: "end-users | admins | developers | all"
complexity: "beginner | intermediate | advanced"
---
```

### 4. DocHub Configuration in mkdocs.yml

The `mkdocs.yml` now includes DocHub-specific metadata:

```yaml
extra:
  # Product tagging system for DocHub integration
  product_tags:
    netbox-cloud:
      label: "NetBox Cloud"
      color: "#00d9be"
      description: "NetBox Cloud features and administration"
    # ... other tags
    
  # DocHub integration metadata
  dochub:
    source_repo: "console-docs"
    integration_version: "2.0"
    content_type: "enterprise"
```

## Navigation Structure

**Important:** DocHub handles the complex navigation structure. The `mkdocs.yml` now has a minimal navigation for local development only.

## Content Processing

### For DocHub Integration:

1. **Parse frontmatter** to extract product tags and metadata
2. **Use product tags** for content filtering and categorization
3. **Apply version-specific** content visibility rules
4. **Generate tag-based** navigation and filtering

### Migration Status:

- ✅ **Product tagging system** - Complete
- ✅ **Enhanced frontmatter** - Complete
- ✅ **DocHub metadata** - Complete
- ✅ **Simplified navigation** - Complete
- ✅ **Merge conflicts resolved** - Complete

## Testing

To test the integration:

```bash
# Install dependencies
pip install -r requirements.txt

# Serve locally
mkdocs serve

# Check product tags
grep -r "tags:" docs/ --include="*.md" | head -10
```

## Next Steps

1. **DocHub team**: Update content ingestion to read frontmatter tags
2. **DocHub team**: Implement product filtering based on tags
3. **DocHub team**: Use the product tag metadata for UI components
4. **Console-docs team**: Continue migrating any remaining HTML pills

## Support

- **Technical questions**: Create issue in console-docs repository
- **Integration support**: Reference `DOCHUB_INTEGRATION_REQUIREMENTS.md` for detailed implementation guide
- **Migration scripts**: Available in `scripts/` directory

---

This setup provides a clean, maintainable foundation for DocHub integration while preserving all existing functionality. 