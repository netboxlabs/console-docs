# Streamlined Semantic Tagging Quick Usage Guide

## Overview
The streamlined semantic tagging system automatically enhances documentation with 20 carefully curated tags for better content discovery while avoiding tag overload.

## Quick Start

### 1. Apply Streamlined Semantic Tags
```bash
npm run enhanced-tag
```
This analyzes and updates all markdown files with the streamlined tag system (20 total tags).

### 2. Preview Basic Location Tags (Optional)
```bash
npm run preview-tags
```
This shows basic location-based tags without applying them.

### 3. Targeted Tagging
```bash
# Tag specific files directly
node scripts/enhanced-semantic-tagging.js
```

## What It Does

### Preserves Existing Content
- ✅ Keeps all existing tags
- ✅ Preserves all frontmatter fields
- ✅ Only adds new semantic tags
- ✅ Never removes or modifies existing content

### Adds Semantic Tags Based On:
- **File paths** - Automatically tags based on directory structure
- **Content analysis** - Scans for keywords and patterns
- **Filename patterns** - Recognizes common naming conventions

### Example Before/After

**Before:**
```yaml
---
title: NetBox Cloud SAML Configuration Guide
tags:
  - cloud
---
```

**After:**
```yaml
---
title: NetBox Cloud SAML Configuration Guide
tags:
  - cloud
  - netbox
  - authentication
  - administration
  - configuration
last_updated: "2025-01-27"
---
```

## Streamlined Tag Categories (20 Total)

### Platform Tags (4) - Top Pills
- `cloud`, `enterprise`, `community`, `airgap`

### Product Tags (4)
- `netbox`, `discovery`, `assurance`, `operator`

### Deployment Tags (2)
- `kubernetes`, `helm`

### Technical Categories (4)
- `api`, `authentication`, `administration`, `operations`

### Content Types (4)
- `installation`, `configuration`, `troubleshooting`, `getting-started`

### Features (4)
- `automation`, `networking`, `integration`, `ai`

## Benefits

### For Users
- Find all authentication-related content with the `authentication` tag
- Discover related content through broad, intuitive categories
- Avoid tag overload while maintaining comprehensive coverage
- Browse by clear, meaningful categories

### For DocHub Integration
- Simplified metadata with 20 well-defined tags
- Reduced complexity for better performance
- Clear categorization for easier content management
- Consistent cross-referencing with broad tag coverage

### For Documentation Team
- Streamlined tagging reduces cognitive load
- Intuitive tag categories are easier to understand
- Automated application with meaningful groupings
- Better user experience with focused tag sets

## Best Practices

### When to Run
- After adding new documentation files
- When reorganizing content structure
- Before major DocHub integration updates
- Periodically to maintain tag consistency

### What to Review After Running
- Check the summary report for tag distribution
- Verify that cross-cutting topics are properly tagged
- Ensure product-specific tags are correctly applied
- Review any files that received many new tags

### Manual Tag Additions
You can still manually add tags that the system doesn't detect:
```yaml
---
tags:
  - cloud
  - custom-tag
  - specific-use-case
---
```

The semantic tagging system will preserve these and add its detected tags.

## Troubleshooting

### No Tags Added
- Check that files have proper frontmatter structure
- Verify file paths match expected patterns
- Ensure content contains recognizable keywords

### Too Many Tags Added
- Review the tagging rules in `scripts/semantic-tagging.js`
- Consider if content genuinely covers multiple topics
- Some files naturally span many categories (overview documents)

### Missing Expected Tags
- Check if keywords exist in content or file path
- Review tagging rules for the specific topic
- Consider adding manual tags for specialized content

## Integration with Existing Workflow

The semantic tagging system works alongside:
- Existing product tagging (preserves `cloud`, etc.)
- Manual frontmatter tags (never removes user-added tags)
- DocHub integration requirements (provides required metadata)
- Version management system (respects version-specific content)

---

For current technical information, see:
- `ai-reference/reference-docs/tag-consolidation-summary.md` - Streamlined system overview
- `ai-reference/style-guides/product-tagging-guide.md` - Complete tagging guide 