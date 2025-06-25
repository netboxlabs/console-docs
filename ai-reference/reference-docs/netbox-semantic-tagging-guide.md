---
tags:
  - ai-reference
  - cloud
  - enterprise
  - community
  - netbox
  - documentation
  - tagging
  - automation
  - development
sidebar_position: 999
description: Comprehensive guide for applying semantic tags to NetBox documentation using ai-reference guidelines
internal_only: false
draft: true
last_updated: '2025-06-25'
category: ai-reference
audience: developers
---

:::info Development Resource
This content is synced from console-docs/ai-reference for development team use.
:::

# NetBox Semantic Tagging Guide

## Overview

This guide explains how to use the enhanced semantic tagging system for NetBox documentation. The system automatically applies comprehensive semantic tags following the ai-reference guidelines, enabling better categorization, search, and "Related Topics" display.

## Enhanced Tagging Script

### Usage

```bash
# Tag all NetBox documentation
yarn enhanced-tag-netbox docs/netbox

# Tag specific directories
yarn enhanced-tag-netbox docs/netbox/features
yarn enhanced-tag-netbox docs/netbox/models
yarn enhanced-tag-netbox docs/netbox/installation

# Tag console documentation (existing script)
yarn enhanced-tag docs/console
```

### What the Script Does

1. **Analyzes content** using regex patterns to identify relevant topics
2. **Determines edition tags** based on directory structure and content
3. **Applies semantic tags** for features, models, and technical categories
4. **Removes old HTML pills** (`<span class="pill">` elements)
5. **Updates frontmatter** with comprehensive tag sets
6. **Preserves existing metadata** while adding/updating tags

## Tagging Categories

### Edition Tags (Display as Prominent Pills)

These appear as prominent pills at the top of documents:

| Tag | Display | Use For |
|-----|---------|---------|
| `community` | Community | Open source NetBox features |
| `enterprise` | Enterprise | NetBox Enterprise features |
| `cloud` | Cloud | NetBox Cloud features |
| `airgap` | Air-Gap | Air-gapped deployments |

### Product Tags (Display as Regular Tags)

| Tag | Display | Use For |
|-----|---------|---------|
| `netbox` | NetBox | Core NetBox functionality |
| `discovery` | Discovery | Network discovery features |
| `assurance` | Assurance | Network assurance and monitoring |
| `operator` | Operator | AI-powered operations |

### NetBox Model Categories

| Tag | Display | Description |
|-----|---------|-------------|
| `circuits` | Circuits | Circuit providers and connectivity |
| `dcim` | DCIM | Data center infrastructure management |
| `ipam` | IPAM | IP address management |
| `tenancy` | Tenancy | Multi-tenancy and organizations |
| `virtualization` | Virtualization | Virtual machines and clusters |
| `vpn` | VPN | VPN tunnels and configurations |
| `wireless` | Wireless | Wireless networks and access points |
| `extras` | Extras | Custom fields, webhooks, templates |
| `core` | Core | Core NetBox functionality |

### Technical Categories

| Tag | Display | Description |
|-----|---------|-------------|
| `api` | API | REST API, GraphQL, SDKs |
| `authentication` | Authentication | SSO, LDAP, security |
| `administration` | Administration | System administration |
| `operations` | Operations | Monitoring, backups, maintenance |

### Content Types

| Tag | Display | Description |
|-----|---------|-------------|
| `installation` | Installation | Installation and setup guides |
| `configuration` | Configuration | Configuration and settings |
| `troubleshooting` | Troubleshooting | Problem resolution |
| `getting-started` | Getting Started | Introductory guides |

### NetBox Feature Categories

| Tag | Display | Description |
|-----|---------|-------------|
| `custom-fields` | Custom Fields | Custom field functionality |
| `custom-links` | Custom Links | External link integration |
| `custom-scripts` | Custom Scripts | Automation scripting |
| `export-templates` | Export Templates | Data export formatting |
| `data-validation` | Data Validation | Validation rules |
| `change-logging` | Change Logging | Audit trail |
| `journaling` | Journaling | Notes and comments |
| `notifications` | Notifications | Alerts and webhooks |
| `background-jobs` | Background Jobs | Task processing |
| `search` | Search | Search and filtering |
| `tags` | Tags | Tagging system |
| `contacts` | Contacts | Contact management |
| `permissions` | Permissions | Access control |
| `plugins` | Plugins | Plugin development |
| `models` | Models | Data models |
| `development` | Development | Development guides |

### Platform Tags

| Tag | Display | Description |
|-----|---------|-------------|
| `kubernetes` | Kubernetes | Container orchestration |
| `helm` | Helm | Kubernetes package management |
| `docker` | Docker | Containerization |

### General Feature Tags

| Tag | Display | Description |
|-----|---------|-------------|
| `automation` | Automation | Workflow automation |
| `networking` | Networking | Network infrastructure |
| `integration` | Integration | Third-party integrations |
| `ai` | AI | Artificial intelligence features |

## Tagging Logic

### Edition Tag Determination

1. **NetBox Core**: All NetBox core documentation gets `community`, `enterprise`, `cloud`
2. **Directory-based**: Specific directories have predefined edition mappings
3. **Content-based**: Fallback analysis of document content
4. **Special cases**: Specific files have custom edition rules

### Content Analysis

The script uses regex patterns to identify:

- **Product mentions**: NetBox, Discovery, Assurance, Operator
- **Technical concepts**: API, authentication, permissions
- **NetBox models**: DCIM, IPAM, circuits, etc.
- **Features**: Custom fields, webhooks, automation
- **Platform technologies**: Kubernetes, Docker, Helm

### Path-based Inference

Directory and file names provide context:
- `/models/dcim/` → `dcim` tag
- `/features/customization.md` → `custom-fields` tag
- `/plugins/development/` → `plugins`, `development` tags

## Integration with DocHub

### Automatic Display

Tags automatically appear in two places:

1. **Edition Pills**: Prominent pills at document top
2. **Related Topics**: Tag cloud at document bottom

### Search Integration

All tags are indexed for search and filtering:
- Tag pages automatically generated
- Filtering by product/feature category
- SEO-friendly tag permalinks

### API Access

Tags are accessible programmatically:

```javascript
import { useDoc } from '@docusaurus/plugin-content-docs/client';

function MyComponent() {
  const doc = useDoc();
  const tags = doc.frontMatter.tags;
  const editionTags = tags?.filter(tag => 
    ['community', 'enterprise', 'cloud', 'airgap'].includes(tag)
  );
  
  return <div>Editions: {editionTags.join(', ')}</div>;
}
```

## Best Practices

### When to Run the Script

- **After content updates**: When NetBox documentation is updated
- **New feature additions**: When new NetBox features are documented
- **Content reorganization**: When directory structures change
- **Regular maintenance**: Periodic updates to ensure consistency

### Manual Tag Overrides

You can manually override automatic tags in frontmatter:

```yaml
---
title: My Document
tags:
  - community
  - enterprise
  - custom-override-tag
---
```

### Quality Assurance

After running the script:

1. **Review changes**: Use `git diff` to review applied tags
2. **Test locally**: Start dev server to verify tag display
3. **Check accuracy**: Ensure tags match document content
4. **Validate build**: Ensure no Docusaurus validation errors

## Troubleshooting

### Common Issues

**Missing tags in tags.yml**
- Add missing tag definitions to `docs/tags.yml`
- Include label, permalink, and description

**Incorrect edition tags**
- Check directory-based rules in script
- Verify content-based detection patterns
- Add special case handling if needed

**Too many/few tags**
- Adjust regex patterns for better precision
- Fine-tune content analysis rules
- Consider path-based inference accuracy

### Script Customization

The script can be customized by modifying:

- `PRODUCT_TAGS`: Product detection patterns
- `TECHNICAL_TAGS`: Technical category patterns
- `NETBOX_FEATURE_TAGS`: NetBox-specific features
- `DIRECTORY_EDITION_RULES`: Directory-based edition mapping

## Examples

### Before Processing

```markdown
<span class="pill pill-community">NetBox Community</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>

# Custom Fields

Custom fields allow you to...
```

### After Processing

```markdown
---
title: Custom Fields
tags:
  - community
  - enterprise
  - cloud
  - netbox
  - custom-fields
  - administration
  - configuration
  - extras
---

# Custom Fields

Custom fields allow you to...
```

## Script Output

The script provides detailed feedback:

```
🚀 Starting enhanced semantic tagging for docs/netbox...
📋 Using ai-reference guidelines for tagging strategy
📁 Found 248 markdown files to process

✅ Updated: docs/netbox/features/custom-fields.md
   Edition tags: community, enterprise, cloud
   Semantic tags: netbox, custom-fields, administration, configuration, extras

📊 Processing Summary:
   ✅ Successfully processed: 248 files
   ❌ Errors: 0 files
   📁 Total files: 248

🎉 Enhanced semantic tagging complete!
```

This comprehensive tagging system ensures NetBox documentation is properly categorized, searchable, and displays relevant topic relationships following the ai-reference guidelines. 