---
tags:
  - ai-reference
  - system-overview
  - documentation
  - development
  - comprehensive
author: "NetBox Labs Documentation Team"
last_updated: "2025-06-25"
category: "system-overview"
audience: "developers"
complexity: "intermediate"
description: "Comprehensive system overview of AI reference materials and documentation system"
internal_only: true
draft: true
---

:::info Comprehensive System Overview
Complete overview of the AI reference system, documentation structure, and development workflow.  
**For development team use.** Excluded from public website builds but available in repository.
:::

# NetBox Labs Documentation System - Complete Overview

## 🎯 System Purpose

The AI Reference System provides comprehensive development resources for NetBox Labs documentation, supporting both human developers and AI-assisted workflows.

## 🏗️ Architecture

### Two-Tier Processing Model
```
console-docs/ai-reference/ → ai-reference-internal/ (git-ignored)
```

## 🏷️ Complete Tagging System

### Edition Tags (Prominent Pills)
- `cloud` - NetBox Cloud features (#00d9be)
- `enterprise` - NetBox Enterprise features (#ffac00)  
- `community` - Open source features (#00bee0)
- `airgap` - Air-gapped deployments (#6c757d)

### Product Tags (Regular Display)
- `netbox` - Core NetBox functionality
- `discovery` - Network discovery features (all editions)
- `assurance` - Network monitoring (Cloud/Enterprise only)
- `operator` - AI-powered operations (Cloud/Enterprise only)
- `branching` - NetBox Branching extension (Cloud/Enterprise only)

### Semantic Categories (38+ Tags)
- **Authentication**: `authentication`, `sso`, `ldap`, `saml`, `rbac`, `two-factor`
- **Security**: `security`, `encryption`, `certificates`, `compliance`
- **Database**: `database`, `backup`, `migration`, `upgrade`, `maintenance`
- **APIs**: `rest-api`, `graphql`, `webhooks`, `automation`, `scripting`
- **Monitoring**: `monitoring`, `notifications`, `alerting`, `logging`, `metrics`
- **Development**: `custom-fields`, `plugins`, `customization`, `extensibility`
- **Networking**: `networking`, `infrastructure`, `connectivity`, `dns`
- **User Experience**: `getting-started`, `installation`, `configuration`, `administration`

## 📋 Frontmatter Template

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

## 🚀 Development Workflow

```bash
# Update source materials
git submodule update --remote

# Process AI reference materials
yarn transform-ai-reference

# Transform all documentation
yarn transform-docs

# Start development server
yarn start --port 3001
```

## 📁 File Reference

### Templates (3 files)
- `netbox-feature-doc-template.md` - Standard feature docs
- `product-landing-page.md` - Product overview pages
- `semantic-tagging-usage.md` - Tag examples

### Style Guides (3 files)
- `netbox-docs-style-guide.md` - Writing standards
- `product-tagging-guide.md` - Tagging system
- `ai-prompting-guide.md` - AI assistance best practices

### Content Strategy (3 files)
- `navigation-strategy.md` - User-centric organization
- `version-management.md` - Version coordination
- `dochub-integration-strategy.md` - Migration strategy

### Reference Docs (8 files)
- `semantic-tagging-system.md` - Complete tagging documentation
- `auto-tagging-analysis.md` - Automated detection results
- `dochub-coordination.md` - Navigation restructuring
- `dochub-integration-requirements.md` - Technical specs
- `product-tagging-migration.md` - Migration guide
- `semantic-tagging-enhancement-summary.md` - Project summary
- `netbox-assurance-kb.md` - Assurance knowledge base
- `netbox-assurance-blog.md` - Blog content reference

### Project Docs (3 files)
- `README.md` - Project documentation index
- `implementation_plan.md` - Navigation restructuring plan
- `DOCUMENTATION_CONSOLIDATION_SUMMARY.md` - System consolidation

## 🎯 Common Usage Scenarios

### Writing Feature Documentation
1. Start with `templates/netbox-feature-doc-template.md`
2. Apply appropriate edition/product/semantic tags
3. Follow `style-guides/netbox-docs-style-guide.md`
4. Use correct version mapping

### Premium Features (Cloud/Enterprise Only)
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

### Universal Features (All Editions)
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

### AI-Assisted Writing
1. Provide context from relevant ai-reference-internal files
2. Follow `style-guides/ai-prompting-guide.md`
3. Use appropriate template
4. Apply comprehensive tagging system

## 📊 System Metrics

- **Total Files**: 21 (18 from console-docs + 3 internal)
- **Edition Tags**: 4 (cloud, enterprise, community, airgap)
- **Product Tags**: 5 (netbox, discovery, assurance, operator, branching)
- **Semantic Categories**: 38+ across 8 major areas
- **Version Coordination**: NetBox v4.2 (Community), v1.10 (Cloud/Enterprise)

## 🔧 Maintenance

- **Source Sync**: Automated via submodule updates
- **Processing**: Enhanced frontmatter and internal notices
- **Security**: Git-ignored internal materials
- **Quality**: Style guide validation and tag accuracy

---

**System Overview** | **Last Updated**: 2025-06-25  
**Status**: Production Ready | **Version**: v2.0

*Complete overview of NetBox Labs AI reference system for development team use.* 