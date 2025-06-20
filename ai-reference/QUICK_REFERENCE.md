---
tags:
  - ai-reference
  - quick-reference
  - templates
  - development
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
category: "ai-reference"
audience: "developers"
complexity: "beginner"
description: "Quick reference guide for common AI reference tasks"
internal_only: true
draft: true
---

# AI Reference Quick Reference

## 🚀 Common Tasks

### Writing New Documentation
```bash
# 1. Choose template
templates/netbox-feature-doc-template.md    # Feature docs
templates/product-landing-page.md           # Product overviews

# 2. Reference style guide
style-guides/netbox-docs-style-guide.md

# 3. Apply proper tags
# See tag reference below
```

### Understanding Navigation
```bash
# Strategy and principles
content-strategy/navigation-guidelines.md

# System overview
SYSTEM_OVERVIEW.md
```

### AI-Assisted Writing
```bash
# Best practices
style-guides/ai-prompting-guide.md (to be added)

# Template examples
templates/netbox-feature-doc-template.md

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
last_updated: "2025-01-27"
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

# Transform all documentation
yarn transform-docs

# Start development server
yarn dev

# Build for production
yarn build
```

## 📁 File Finder

### Need to...
| Task | File |
|------|------|
| Write feature docs | `templates/netbox-feature-doc-template.md` |
| Create product page | `templates/product-landing-page.md` |
| Follow style guide | `style-guides/netbox-docs-style-guide.md` |
| Understand navigation | `content-strategy/navigation-guidelines.md` |
| System overview | `SYSTEM_OVERVIEW.md` |
| This quick reference | `QUICK_REFERENCE.md` |

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

**Quick Reference** | **Last Updated**: 2025-01-27  
**For comprehensive information**: See [README.md](./README.md) and [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md) 