---
tags:
  - cloud
  - enterprise
  - community
  - ai-reference
  - assurance
  - discovery
  - operator
  - template
  - style-guide
  - reference
  - strategy
  - ai-tools
  - authentication
  - tagging
  - navigation
  - documentation
author: NetBox Labs Documentation Team
last_updated: '2025-01-27'
versions:
  cloud: v1.10
  enterprise: v1.10
  community: v4.2
status: current
category: ai-reference
audience: developers
complexity: intermediate
sidebar_position: 999
description: AI Reference material for NetBox Labs documentation development
internal_only: true
draft: true
---

# AI Reference Materials

This directory contains reference materials, templates, and documentation resources for use with AI/LLM tools when building NetBox Labs documentation. **This directory is not published to the live site** and is intended for internal development use only.

## Purpose

- 📝 Store reference documentation and examples for AI-assisted writing
- 🤖 Provide context and templates for LLM tools using our comprehensive frontmatter system
- 📋 Maintain style guides and content patterns with version tracking
- 🔧 Keep development notes and content strategy documents
- 🏷️ Demonstrate proper use of our enhanced frontmatter tagging and versioning system

## Structure

```
ai-reference/
├── README.md                           # This file - comprehensive guide
├── SYSTEM_OVERVIEW.md                  # Complete system documentation
├── QUICK_REFERENCE.md                  # Fast lookup guide
├── templates/                          # Document templates using enhanced frontmatter
│   ├── netbox-feature-doc-template.md  # Standard feature documentation template
│   ├── product-landing-page.md         # Landing page template (like NetBox Operator)
│   └── semantic-tagging-usage.md       # Tag usage examples
├── style-guides/                       # Writing style and formatting guidelines
│   ├── netbox-docs-style-guide.md      # Complete style guide with enhanced frontmatter
│   ├── product-tagging-guide.md        # Complete product tagging system documentation
│   └── ai-prompting-guide.md           # Best practices for AI assistance with version tracking
├── content-strategy/                   # Strategy docs and planning materials
│   ├── navigation-guidelines.md        # Our navigation restructuring approach
│   └── version-management.md           # How we handle versions and releases
└── reference-docs/                     # External reference materials and authoritative sources
    ├── dochub-integration-summary.md   # Complete DocHub integration implementation summary
    ├── workflow-fixes.md               # GitHub Actions workflow fixes and troubleshooting
    ├── semantic-tagging-system.md      # Comprehensive semantic tagging system documentation (to be added)
    └── dochub-integration-requirements.md # Detailed technical implementation requirements (to be added)
```

## Enhanced Frontmatter System

We use **comprehensive YAML frontmatter** with version tracking for better organization and AI context:

### Complete Frontmatter Format
```yaml
---
tags:
  - cloud                    # Edition tags (display as prominent pills)
  - enterprise
  - community
  - discovery                # Product tags (display as regular tags)
  - assurance
  - authentication           # Semantic tags (display as smaller tags)
  - sso
title: "Document Title"
description: "SEO-friendly description for search and social sharing"
author: "Author Name or NetBox Labs Documentation Team"
last_updated: "YYYY-MM-DD"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current | beta | coming-soon | deprecated"
category: "feature | integration | admin | getting-started | product-overview"
audience: "end-users | admins | developers | all"
complexity: "beginner | intermediate | advanced"
related_docs:
  - "path/to/related-doc.md"
external_links:
  - "https://example.com/resource"
---
```

### Available Product Tags

#### Edition Tags (Display as Prominent Pills)
| Tag | Display | Use For | Display Style |
|-----|---------|---------|---------------|
| `cloud` | Cloud | Cloud-specific features and administration | **Prominent pill at top** |
| `enterprise` | Enterprise | Enterprise-specific features and installation | **Prominent pill at top** |
| `community` | Community | Open source features and community tools | **Prominent pill at top** |
| `airgap` | Air-Gap | Air-gapped deployment scenarios | **Prominent pill at top** |

#### Product Feature Tags (Display as Regular Tags)
| Tag | Display | Use For | Display Style |
|-----|---------|---------|---------------|
| `discovery` | Discovery | Network discovery and device detection features | Regular tag at bottom |
| `assurance` | Assurance | Network monitoring and assurance capabilities | Regular tag at bottom |
| `operator` | Operator | AI-powered network operations and automation | Regular tag at bottom |
| `netbox` | NetBox | Core NetBox features and functionality | Regular tag at bottom |
| `branching` | Branching | NetBox Branching extension features | Regular tag at bottom |

#### Semantic Category Tags (Display as Regular Tags)
All other tags display as smaller regular tags at the bottom under "Related Topics":
- **Authentication**: `authentication`, `sso`, `ldap`, `saml`, `rbac`, `two-factor`
- **Security**: `security`, `encryption`, `certificates`, `compliance`
- **Database**: `database`, `backup`, `migration`, `upgrade`, `maintenance`
- **APIs**: `rest-api`, `graphql`, `webhooks`, `automation`, `scripting`
- **Monitoring**: `monitoring`, `notifications`, `alerting`, `logging`, `metrics`
- **Development**: `custom-fields`, `plugins`, `customization`, `extensibility`
- **Networking**: `networking`, `infrastructure`, `connectivity`, `dns`
- **User Experience**: `getting-started`, `installation`, `configuration`, `administration`

### Version Guidelines

#### For Documents Modified Since May 1, 2025
```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
```

#### For NetBox Assurance Documents (Premium Only)
```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included as Assurance is premium-only
```

#### For NetBox Operator Documents (Premium Only)
```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included as Operator is premium-only
```

### Version Mapping Reference
| NetBox Cloud/Enterprise | NetBox Community | Release Period | Key Features |
|------------------------|------------------|----------------|--------------|
| v1.9 | v4.2 | Previous stable | Base functionality |
| v1.10 | v4.2 | Current/Recent updates | + Enterprise Assurance & Discovery |
| v1.11 | v4.2 | Future releases | + Enterprise High Availability (HA) |
| v1.12 | v4.3 | Next major release cycle | TBD |

## Guidelines for AI-Assisted Documentation

### What Goes Here
✅ **DO include:**
- Document templates using our enhanced frontmatter system
- Style guides and writing standards with version tracking
- Example content patterns from our existing docs
- Reference materials from authoritative sources
- Development notes and planning documents
- AI prompts and content generation helpers with version context

### What Doesn't Go Here
❌ **DON'T include:**
- Customer-facing documentation (belongs in `docs/`)
- Sensitive information or credentials
- Large binary files or images

### Common Usage Scenarios

#### Writing Feature Documentation
1. Start with `templates/netbox-feature-doc-template.md`
2. Apply appropriate edition/product/semantic tags
3. Follow `style-guides/netbox-docs-style-guide.md`
4. Use correct version mapping

#### Premium Features (Cloud/Enterprise Only)
```yaml
tags:
  - cloud
  - enterprise
  - assurance                # Premium product
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included
```

#### Universal Features (All Editions)
```yaml
tags:
  - cloud
  - enterprise
  - community
  - discovery                # Available everywhere
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
```

## Security & Deployment

### Protection Status
- ✅ **Git tracked**: Available to team members and contributors
- ✅ **Build excluded**: Never appears on live site (netboxlabs.com/docs)
- ✅ **Docusaurus ignored**: Explicitly excluded in docusaurus.config.ts
- ✅ **Directory separation**: Located outside docs/ processing path

### How It's Protected
1. **Build-time exclusion**: Docusaurus configuration excludes `ai-reference/**`
2. **Directory separation**: Outside the public `docs/` path
3. **Multiple exclusion patterns**: Comprehensive protection in build process

This ensures the ai-reference system enhances your internal workflow without any risk to the live documentation site.

## Quick Reference

For fast lookup of common tasks, see [QUICK_REFERENCE.md](./QUICK_REFERENCE.md).
For comprehensive system details, see [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md).

---

**AI Reference System** | **Last Updated**: 2025-01-27  
**Status**: Production Ready | **Security**: Internal Only 