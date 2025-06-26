---
tags:
  - ai-reference
  - cloud
  - enterprise
  - community
  - style-guide
  - reference
  - strategy
  - ai-tools
  - tagging
  - navigation
  - documentation
sidebar_position: 999
description: AI Reference material for NetBox Labs documentation development
internal_only: false
draft: true
last_updated: '2025-06-25'
category: ai-reference
audience: developers
---
:::info Development Resource
This content is synced from console-docs/ai-reference for development team use.
:::

# DocHub Integration Strategy

## Quick Reference

The `console-docs` repository is now optimized for DocHub integration with:
- **Frontmatter-based product tagging** (replacing HTML pills)
- **Enhanced metadata** for better content processing  
- **Simplified navigation** (DocHub handles the complex structure)
- **DocHub-specific configuration** in `mkdocs.yml`

## Migration Status

- ✅ **Product tagging system** - Complete
- ✅ **Enhanced frontmatter** - Complete
- ✅ **DocHub metadata** - Complete
- ✅ **Simplified navigation** - Complete
- ✅ **Merge conflicts resolved** - Complete

## Available Product Tags

| Tag | Label | Color | Description |
|-----|-------|-------|-------------|
| `cloud` | NetBox Cloud | #00d9be | Cloud features and administration |
| `enterprise` | NetBox Enterprise | #ffac00 | On-premises features |
| `community` | NetBox Community | #00bee0 | Community edition features |
| `airgap` | Air-Gap | #ff0078 | Air-gap deployment features |

## Format Migration

**Old Format (Deprecated):**
```html
\<span class="pill pill-cloud"\>NetBox Cloud</span>
```

**New Format (DocHub-Ready):**
```yaml
tags:
  - cloud
  - enterprise
```

## Edition Pills by Directory

The following mapping defines which edition pills should be displayed at the top of pages based on their directory path:

### Console Documentation
- `/docs/console/netbox-enterprise/` → **Enterprise only**
- `/docs/console/netbox-cloud/` → **Cloud only**  
- `/docs/console/netbox-cloud/` → **Cloud only**
- `/docs/console/administration-console/` → **Cloud only**
- `/docs/console/cloud-connectivity/` → **Cloud only**
- `/docs/console/netbox-discovery/` → **Community, Cloud, Enterprise**
- `/docs/console/netbox-assurance/` → **Cloud (Coming Soon), Enterprise**
- `/docs/console/netbox-integrations/` → **Cloud, Enterprise**
- `/docs/console/netbox-extensions/` → **Cloud, Enterprise**
  - `/docs/console/netbox-extensions/branching/` → **Community, Cloud, Enterprise** (exception)
  - `/docs/console/netbox-extensions/diode/` → **Community, Cloud, Enterprise** (exception)

### SDK Documentation
- `/docs/console/sdks/pynetbox` → **Community, Cloud, Enterprise**

### NetBox Core Documentation
- `/docs/netbox/` → **Community, Cloud, Enterprise** (main index)
- `/docs/netbox/index.md` → **Community, Cloud, Enterprise** (main index)
- `/docs/netbox/introduction.md` → **Community, Cloud, Enterprise** (introduction)
- `/docs/netbox/*` (all other pages) → **Community only**

### Implementation Notes
- Edition pills are determined by directory path, not frontmatter tags
- Frontmatter tags are still used for semantic "Related Topics" at the bottom
- This ensures consistent edition availability display across the documentation
- Special exceptions exist for universal features like Branching and Diode

### Color Scheme
- **Community**: `#00bee0` (blue)
- **Enterprise**: `#ffac00` (orange) 
- **Cloud**: `#00d9be` (teal)

## Next Steps for DocHub Team

1. **Review detailed specifications** in `ai-reference/reference-docs/`:
   - `dochub-coordination.md` - Navigation restructuring requirements
   - `dochub-integration-requirements.md` - Technical implementation details
   - `auto-tagging-analysis.md` - Content analysis and tagging results

2. **Reference style guides** in `ai-reference/style-guides/`:
   - `product-tagging-guide.md` - Complete tagging system documentation
   - `netbox-docs-style-guide.md` - Writing standards and patterns

3. **Test integration** with new frontmatter-based system

## Testing

```bash
# Install dependencies
pip install -r requirements.txt

# Serve locally
mkdocs serve

# Check product tags
grep -r "tags:" docs/ --include="*.md" | head -10
```

## Support

- **Technical questions**: Create issue in console-docs repository
- **Detailed implementation**: See `ai-reference/reference-docs/` for comprehensive guides
- **Migration scripts**: Available in `scripts/` directory

---

This setup provides a clean, maintainable foundation for DocHub integration while preserving all existing functionality. 
