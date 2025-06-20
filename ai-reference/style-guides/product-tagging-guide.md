---
tags:
  - ai-reference
  - cloud
  - enterprise
  - community
  - discovery
  - style-guide
  - reference
  - ai-tools
  - tagging
  - documentation
sidebar_position: 999
description: AI Reference material for NetBox Labs documentation development
internal_only: true
draft: true
last_updated: '2025-01-27'
category: ai-reference
audience: developers
---

# Product Tagging System Guide

## Overview

This guide explains the comprehensive product tagging system that uses Docusaurus-native frontmatter tags for better integration, categorization, and filtering capabilities.

## Why This System

### Benefits:
- ✅ **SEO-friendly**: Search engines understand product categories
- ✅ **Docusaurus native**: Full integration with Docusaurus tag system
- ✅ **Automatic tag pages**: Generated pages for each product category
- ✅ **Filtering capabilities**: Easy to filter docs by product
- ✅ **API integration**: Programmatic access to document metadata
- ✅ **Better dochub integration**: Upstream can easily categorize content

## Available Product Tags

### Edition Tags (Display as Prominent Pills)
| Tag | Display Label | Color | Description |
|-----|---------------|-------|-------------|
| `cloud` | NetBox Cloud | 🟢 Teal (`#00d9be`) | Documentation for NetBox Cloud |
| `enterprise` | NetBox Enterprise | 🟠 Orange (`#ffac00`) | Documentation for NetBox Enterprise |
| `community` | NetBox Community | 🔵 Blue (`#00bee0`) | Documentation for NetBox Community |
| `airgap` | Air-Gap | 🔴 Pink (`#ff0078`) | Documentation for air-gapped deployments |

### Product Feature Tags (Display as Regular Tags)
| Tag | Display Label | Description |
|-----|---------------|-------------|
| `netbox` | NetBox | Core NetBox functionality |
| `discovery` | Discovery | Network discovery and device detection features |
| `assurance` | Assurance | Network monitoring and assurance capabilities |
| `operator` | Operator | AI-powered network operations and automation |
| `branching` | Branching | NetBox Branching extension features |

### Semantic Category Tags (Display as Smaller Tags)
All other tags display as smaller regular tags at the bottom under "Related Topics":

#### Authentication & Security
- `authentication`, `sso`, `ldap`, `saml`, `rbac`, `two-factor`
- `security`, `encryption`, `certificates`, `compliance`

#### Database & Operations
- `database`, `backup`, `migration`, `upgrade`, `maintenance`
- `monitoring`, `notifications`, `alerting`, `logging`, `metrics`

#### Development & APIs
- `rest-api`, `graphql`, `webhooks`, `automation`, `scripting`
- `custom-fields`, `plugins`, `customization`, `extensibility`

#### User Experience
- `getting-started`, `installation`, `configuration`, `administration`
- `networking`, `infrastructure`, `connectivity`, `dns`

## How to Use Tags

### Basic Usage
Add tags to your frontmatter and they'll automatically appear:

```yaml
---
title: My Document
tags:
  - cloud
  - enterprise
  - discovery
  - authentication
---

# My Document

The product tags will appear automatically above this content.
```

### Tag Hierarchy Display

#### Prominent Pills (Top of Document)
Edition tags display as large, colored pills at the top:
- `cloud`, `enterprise`, `community`, `airgap`

#### Regular Tags (Below Content)
Product and semantic tags display as regular tags:
- `netbox`, `discovery`, `assurance`, `operator`, `branching`
- All semantic category tags

### Version-Specific Tagging

#### Premium Features (Cloud/Enterprise Only)
```yaml
---
tags:
  - cloud
  - enterprise
  - assurance                # Premium product
  - monitoring
title: "NetBox Assurance Feature"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included
---
```

#### Universal Features (All Editions)
```yaml
---
tags:
  - cloud
  - enterprise
  - community
  - discovery                # Available everywhere
title: "NetBox Discovery Feature"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
---
```

#### Air-Gap Specific Features
```yaml
---
tags:
  - airgap
  - enterprise
  - installation
title: "Air-Gap Installation Guide"
versions:
  enterprise: "v1.10"
---
```

## Tag Selection Guidelines

### Choose Edition Tags Based On:
- **Cloud**: Features specific to NetBox Cloud hosting
- **Enterprise**: Features in NetBox Enterprise (on-premises)
- **Community**: Features in open source NetBox
- **Air-Gap**: Special air-gapped deployment considerations

### Choose Product Tags Based On:
- **NetBox**: Core NetBox functionality
- **Discovery**: Network discovery features
- **Assurance**: Network monitoring capabilities  
- **Operator**: AI-powered operations
- **Branching**: NetBox Branching extension

### Choose Semantic Tags Based On:
- **Primary function**: What does this feature do?
- **User workflow**: How do users interact with it?
- **Technical category**: What system does it relate to?

## Examples

### Authentication Feature (All Editions)
```yaml
---
tags:
  - cloud
  - enterprise
  - community
  - authentication
  - sso
  - security
title: "SAML Authentication Setup"
---
```

### Premium Monitoring Feature
```yaml
---
tags:
  - cloud
  - enterprise
  - assurance
  - monitoring
  - alerting
  - notifications
title: "NetBox Assurance Monitoring"
---
```

### API Documentation
```yaml
---
tags:
  - cloud
  - enterprise
  - community
  - rest-api
  - automation
  - development
title: "REST API Reference"
---
```

### Installation Guide
```yaml
---
tags:
  - enterprise
  - community
  - installation
  - getting-started
  - database
title: "NetBox Installation Guide"
---
```

## Integration Benefits

### For Documentation Writers
- Clear categorization system
- Automatic tag page generation
- Better content discoverability
- Consistent tagging across all docs

### For Users
- Easy filtering by product/feature
- Clear visual indicators of applicability
- Better search results
- Logical content organization

### For Developers
- Programmatic access to document metadata
- API integration capabilities
- Build-time content filtering
- Enhanced navigation generation

---

**Product Tagging Guide** | **Last Updated**: 2025-01-27  
**Status**: Production Ready | **Usage**: Internal Development 