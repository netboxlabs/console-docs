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
<span class="pill pill-cloud">NetBox Cloud</span>
```

**New Format (DocHub-Ready):**
```yaml
---
tags:
  - cloud
  - enterprise
---
```

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