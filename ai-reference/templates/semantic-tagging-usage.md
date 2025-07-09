---
tags:
  - ai-reference
  - cloud
  - template
  - reference
  - ai-tools
  - authentication
  - tagging
  - documentation
sidebar_position: 999
description: AI Reference material for NetBox Labs documentation development
internal_only: true
draft: true
last_updated: '2025-06-25'
category: ai-reference
audience: developers
---
:::info Development Resource
This content is synced from console-docs/ai-reference for development team use.
:::

# Semantic Tagging Quick Usage Guide

## Overview
The semantic tagging system automatically enhances documentation with comprehensive tags for better content discovery and cross-referencing.

## Quick Start

### 1. Preview Changes (Recommended First Step)
```bash
npm run semantic-tag-dry
```
This shows what tags would be added without making any changes.

### 2. Apply Semantic Tags
```bash
npm run semantic-tag
```
This analyzes and updates all markdown files with appropriate semantic tags.

### 3. Targeted Tagging
```bash
# Tag specific directory
node scripts/semantic-tagging.js docs/Administration\ Console

# Dry run on specific directory
node scripts/semantic-tagging.js docs/netbox-enterprise --dry-run
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
title: NetBox Cloud SAML Configuration Guide
tags:
  - cloud
```

**After:**
```yaml
title: NetBox Cloud SAML Configuration Guide
tags:
  - cloud
  - administration
  - configuration
  - authentication
  - sso
  - saml
  - security
last_updated: "2025-07-01"
```

## Tag Categories Applied

### Product Tags
- `cloud`, `enterprise`, `community`, `discovery`, `assurance`, `operator`, `netbox`, `airgap`

### Cross-Cutting Topics
- **Authentication**: `authentication`, `sso`, `ldap`, `saml`, `two-factor`
- **Security**: `security`, `permissions`, `rbac`
- **Operations**: `database`, `backup`, `upgrade`, `monitoring`
- **Integration**: `rest-api`, `automation`, `webhooks`
- **Infrastructure**: `cloud-connectivity`, `networking`, `infrastructure`

### Content Types
- `getting-started`, `installation`, `configuration`, `administration`, `troubleshooting`

## Benefits

### For Users
- Find all SSO-related content across products with `sso` tag
- Discover related authentication methods through consistent tagging
- Browse by topic rather than just product

### For DocHub Integration
- Structured metadata for better categorization
- Enhanced search and filtering capabilities
- Consistent cross-referencing across products

### For Documentation Team
- Automated tagging reduces manual effort
- Consistent tag application across all content
- Easy identification of content relationships

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
tags:
  - cloud
  - custom-tag
  - specific-use-case
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

For detailed technical information, see `ai-reference/reference-docs/semantic-tagging-system.md`. 
