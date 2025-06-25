---
tags:
  - ai-reference
  - quick-reference
  - templates
  - development
author: "NetBox Labs Documentation Team"
last_updated: "2025-06-25"
category: "ai-reference"
audience: "developers"
complexity: "beginner"
description: "Quick reference guide for common AI reference tasks"
internal_only: true
draft: true
---

:::info Quick Reference Guide
Fast lookup for common tasks in the AI reference system.  
For comprehensive information, see [README.md](./README.md).
**Excluded from public website builds.**
:::

# AI Reference Quick Reference

## 🚀 Common Tasks

### Writing New Documentation
```bash
# 1. Choose template
templates/netbox-feature-doc-template.md    # Feature docs
templates/product-landing-page.md           # Product overviews
templates/semantic-tagging-usage.md         # Tag examples

# 2. Reference style guide
style-guides/netbox-docs-style-guide.md

# 3. Apply proper tags
style-guides/product-tagging-guide.md
```

### Understanding Navigation
```bash
# Strategy and principles
content-strategy/navigation-strategy.md

# Technical implementation
project-docs/implementation_plan.md

# Cross-repo coordination
reference-docs/dochub-coordination.md
```

### AI-Assisted Writing
```bash
# Best practices
style-guides/ai-prompting-guide.md

# Template examples
templates/semantic-tagging-usage.md

# Complete style reference
style-guides/netbox-docs-style-guide.md
```

## 🏷️ Tag Reference

### Edition Tags (Prominent Pills)
| Tag | Usage | Color |
|-----|-------|-------|
| `cloud` | NetBox Cloud features | #00d9be |
| `enterprise` | NetBox Enterprise features | #ffac00 |
| `community` | Open source features | #00bee0 |
| `airgap` | Air-gapped deployments | #6c757d |

### Product Tags (Regular)
| Tag | Usage |
|-----|-------|
| `netbox` | Core NetBox functionality |
| `discovery` | Network discovery features |
| `assurance` | Network monitoring capabilities |
| `operator` | AI-powered network operations |
| `branching` | NetBox Branching extension |

### Common Semantic Tags
- **Auth**: `authentication`, `sso`, `ldap`, `saml`, `rbac`
- **Security**: `security`, `encryption`, `certificates`
- **Database**: `database`, `backup`, `migration`, `upgrade`
- **APIs**: `rest-api`, `graphql`, `webhooks`, `automation`
- **UX**: `getting-started`, `installation`, `configuration`

## 🎨 Frontmatter Templates

### Standard Document
```yaml
---
tags:
  - cloud                    # Edition (prominent)
  - enterprise
  - discovery                # Product (regular)
  - authentication           # Semantic (regular)
title: "Document Title"
description: "SEO description"
author: "NetBox Labs Documentation Team"
last_updated: "2025-06-25"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current"
category: "feature"
audience: "end-users"
complexity: "beginner"
---
```

### Premium Feature (Cloud/Enterprise Only)
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

### Universal Feature (All Editions)
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

## 🔧 Development Commands

```bash
# Update source materials
git submodule update --remote

# Process AI reference materials
yarn transform-ai-reference

# Transform all documentation
yarn transform-docs

# Start development server
yarn start --port 3001

# Build for production
yarn build
```

## 📁 File Finder

### Need to...
| Task | File |
|------|------|
| Write feature docs | `templates/netbox-feature-doc-template.md` |
| Create product page | `templates/product-landing-page.md` |
| Understand tags | `style-guides/product-tagging-guide.md` |
| Follow style guide | `style-guides/netbox-docs-style-guide.md` |
| Use AI prompts | `style-guides/ai-prompting-guide.md` |
| Understand navigation | `content-strategy/navigation-strategy.md` |
| Technical implementation | `project-docs/implementation_plan.md` |
| Tag system details | `reference-docs/semantic-tagging-system.md` |
| Integration specs | `reference-docs/dochub-integration-requirements.md` |

## ⚡ Quick Checks

### Before Writing
- [ ] Template selected
- [ ] Style guide reviewed
- [ ] Tags identified
- [ ] Version mapping confirmed

### Before Publishing
- [ ] Frontmatter complete
- [ ] Tags applied correctly
- [ ] Version information accurate
- [ ] Internal notices removed (if public)

### For AI Prompts
- [ ] Context provided from relevant files
- [ ] Style guide referenced
- [ ] Tag system explained
- [ ] Version requirements specified

---

**Quick Reference** | **Last Updated**: 2025-06-25  
**For full details**: See [README.md](./README.md) and individual files

*Fast lookup for AI reference system - development team use.* 