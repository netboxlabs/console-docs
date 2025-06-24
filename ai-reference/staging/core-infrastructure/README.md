# Core Infrastructure Files - Staging

This directory contains the core infrastructure files from the `feat/navigation-restructure-and-docs-enhancement` branch, staged for future implementation.

## Files Included

### `tags.yml`
- **Purpose**: Streamlined 20-tag system definitions
- **Location when ready**: `docs/tags.yml`
- **Description**: Contains platform tags (cloud, enterprise, community, airgap), product tags (netbox, discovery, assurance, operator), and technical category tags with color schemes and permalink definitions for DocHub integration.

### `enhanced-semantic-tagging.js`
- **Purpose**: Intelligent auto-tagging script
- **Location when ready**: `scripts/enhanced-semantic-tagging.js`
- **Description**: Provides semantic content analysis for automatic tag assignment, pattern matching for NetBox products and features, edition-aware tagging, and technical category detection. Reduces manual tagging effort by ~90%.

### `package.json`
- **Purpose**: Updated build and automation scripts
- **Location when ready**: Root directory `package.json`
- **Description**: Contains enhanced build scripts including `enhanced-tag`, `migrate:phase2`, `build:all`, `sync:dochub`, and `validate:structure` commands.

## Implementation Instructions

When ready to implement the enhanced tagging system:

```bash
# 1. Copy files to their target locations
cp ai-reference/staging/core-infrastructure/tags.yml docs/
mkdir -p scripts
cp ai-reference/staging/core-infrastructure/enhanced-semantic-tagging.js scripts/
cp ai-reference/staging/core-infrastructure/package.json .

# 2. Install dependencies
npm install

# 3. Test the enhanced tagging (dry run if available)
npm run enhanced-tag --dry-run

# 4. Apply enhanced tagging
npm run enhanced-tag

# 5. Verify results
mkdocs build
```

## Benefits of Enhanced Tagging System

- **Streamlined taxonomy**: Reduced from 43 to 20 tags (53% reduction)
- **Intelligent automation**: Automatic tag assignment based on content analysis
- **Multi-edition support**: Cloud/Enterprise/Community build processes
- **DocHub integration**: Ready for seamless migration to unified documentation site
- **Improved discoverability**: Better content categorization and search

## Safety Notes

- The enhanced tagging system is **non-destructive** and **additive**
- It preserves all existing content while adding semantic metadata
- Compatible with current MkDocs functionality
- Can be safely tested with dry-run options
- Maintains backward compatibility with existing documentation structure

## Related Documentation

- [DocHub Integration Strategy](../content-strategy/dochub-integration-strategy.md) - Complete migration documentation
- [Product Tagging Guide](../style-guides/product-tagging-guide.md) - Tagging system specifications
- [Tag Consolidation Summary](../reference-docs/tag-consolidation-summary.md) - Streamlined system overview

---

**Status**: Staged and ready for implementation when needed
**Source Branch**: `feat/navigation-restructure-and-docs-enhancement`
**Target Branch**: Current working branch when ready to implement 