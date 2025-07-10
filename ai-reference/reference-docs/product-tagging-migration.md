---
title: "Product Tagging System Migration Guide"
description: "Complete guide for migrating from HTML pill-based to YAML frontmatter product tagging"
tags:
  - documentation
  - tagging
  - migration
  - product-tags
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-02"
category: "ai-reference"
audience: "developers"
complexity: "intermediate"
internal_only: true
draft: true
---

# Product Tagging System Migration Guide

This document consolidates information from our product tagging migration and provides the complete context for AI tools.

## Migration Overview

We've migrated from HTML pill-based product tagging to YAML frontmatter tags for better Docusaurus integration and automated processing.

### Before (HTML Pills)
```html
<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>
```

### After (YAML Frontmatter)
```yaml
---
tags:
  - netbox-cloud
  - netbox-enterprise
  - netbox-community
---
```

## Product Tag Definitions

| Tag | Display Name | Use Cases |
|-----|--------------|-----------|
| `netbox-cloud` | NetBox Cloud | Cloud-specific features, Administration Console, cloud connectivity, free plan features |
| `netbox-enterprise` | NetBox Enterprise | Enterprise installation, enterprise-specific features, on-premises deployment |
| `netbox-community` | NetBox Community | Open source features, community plugins, SDKs, general NetBox concepts |
| `airgap` | Air-Gap | Air-gapped deployment scenarios, offline installations |

## Tagging Strategy by Content Type

### Administration and Management
- **Cloud-only features**: `netbox-cloud` only
  - Administration Console access
  - Free plan features  
  - Cloud connectivity options
  - Managed service features

- **Enterprise-only features**: `netbox-enterprise` only
  - Enterprise installer
  - On-premises deployment
  - Enterprise-specific plugins

- **Universal admin features**: `netbox-cloud` + `netbox-enterprise`
  - SSO configuration
  - User management
  - Advanced authentication
  - Premium support features

### Discovery and Assurance
- **NetBox Discovery**: `netbox-cloud` + `netbox-enterprise` + `netbox-community`
  - Available across all editions
  - Community can use discovery agent
  - Cloud/Enterprise get additional integrations

- **NetBox Assurance**: `netbox-cloud` + `netbox-enterprise`
  - Premium feature only
  - Not available in Community edition

- **NetBox Operator**: `netbox-cloud` + `netbox-enterprise`
  - AI-powered features for premium editions
  - Requires NetBox as semantic map

### Integrations and Extensions
- **Community integrations**: `netbox-community` (+ others if applicable)
  - Open source plugins
  - Community-maintained tools
  - SDKs and APIs

- **Premium integrations**: `netbox-cloud` + `netbox-enterprise`
  - Advanced connectors
  - Enterprise partnerships
  - Managed integrations

- **Universal integrations**: All tags
  - REST API access
  - GraphQL API
  - Webhook functionality

## Implementation Examples

### Feature Documentation
```yaml
---
tags:
  - netbox-cloud
  - netbox-enterprise
---

# NetBox Assurance

!!! info "Available in NetBox Cloud and Enterprise"
    NetBox Assurance is a premium feature available as an add-on.
```

### Universal Features
```yaml
---
tags:
  - netbox-cloud
  - netbox-enterprise
  - netbox-community
---

# REST API Documentation

The NetBox REST API is available in all editions.
```

### Cloud-Specific Features
```yaml
---
tags:
  - netbox-cloud
---

# Administration Console

The Administration Console provides cloud-specific management capabilities.
```

## Migration Checklist

### Files Successfully Migrated
- ✅ `docs/netbox-discovery/index.md`
- ✅ `docs/netbox-discovery/quickstart-guide.md`
- ✅ `docs/netbox-discovery/agent/index.md`
- ✅ `docs/netbox-assurance/index.md`
- ✅ `docs/netbox-operator/index.md`

### Migration Process
1. **Identify existing HTML pills** in each document
2. **Determine appropriate tags** based on feature availability
3. **Add YAML frontmatter** at the top of the file
4. **Remove HTML pill elements** from content
5. **Test rendering** to ensure proper display
6. **Validate tag accuracy** against product matrix

### Validation Rules
- Every document must have at least one product tag
- Tags must match actual product availability
- Use minimal set of relevant tags (don't over-tag)
- Maintain consistency across related documents

## Auto-Tagging Summary

From the AUTO_TAGGING_SUMMARY.md:

### Automated Processing
- Tags are processed automatically by the Docusaurus build system
- Enables filtering and categorization of content
- Supports search and navigation improvements
- Integrates with netboxlabs-website-dochub system

### Benefits of New System
1. **Better Integration**: Works seamlessly with Docusaurus
2. **Automated Processing**: Enables auto-categorization
3. **Improved Search**: Better content discovery
4. **Consistent Display**: Standardized tag rendering
5. **Future-Proof**: Easier to extend and modify

### Technical Implementation
- Tags are defined in YAML frontmatter
- Processed during build time
- Rendered as visual indicators in the UI
- Used for content filtering and organization

## Style Guide Integration

### Writing Guidelines
- Always include appropriate product tags in frontmatter
- Use only relevant tags (don't include all tags by default)
- Maintain consistency with existing documentation
- Test tag accuracy against product feature matrix

### Content Patterns
- Start with product tags in frontmatter
- Include status information for beta/upcoming features
- Structure content by audience when multiple products involved
- Provide clear product-specific instructions when needed

## Dochub Integration Requirements

From DOCHUB_INTEGRATION_REQUIREMENTS.md:

### Technical Requirements
- All tags must be valid and recognized by the system
- Frontmatter must be valid YAML syntax
- Tags must be lowercase with hyphens (kebab-case)
- Consistent tag usage across all documentation

### Content Requirements
- Every document must have appropriate product tags
- Tags must accurately reflect product availability
- Use standardized tag names from approved list
- Maintain tag consistency across related documents

### Processing Requirements
- Tags are processed during build pipeline
- Invalid tags will cause build failures
- Tag validation happens automatically
- Changes require testing in staging environment

## Future Considerations

### Planned Enhancements
- Additional product tags for new offerings
- Enhanced filtering capabilities
- Improved search integration
- Better mobile display of tags

### Maintenance
- Regular audits of tag accuracy
- Updates when product availability changes
- Validation of new content against tagging standards
- Monitoring for tag consistency across documentation

---

*This migration guide consolidates all product tagging information for use by AI tools and documentation contributors. It ensures consistent application of our new frontmatter tagging system across all NetBox documentation.* 