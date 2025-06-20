---
tags:
  - ai-reference
  - system-overview
  - documentation
  - development
  - comprehensive
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
category: "system-overview"
audience: "developers"
complexity: "intermediate"
description: "Comprehensive system overview of AI reference materials and documentation system"
internal_only: true
draft: true
---

# NetBox Labs Documentation System - Complete Overview

## 🎯 System Purpose

The AI Reference System provides comprehensive development resources for NetBox Labs documentation, supporting both human developers and AI-assisted workflows.

## 🏗️ Architecture

### Documentation Hub Integration
```
external-repos/ → ai-reference/ → docs/ → Live Site
```

The ai-reference system sits between the external repositories and the final documentation, providing templates, style guides, and reference materials for consistent documentation creation.

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

## 🚀 Development Workflow

```bash
# Update source materials
git submodule update --remote

# Transform all documentation
yarn transform-docs

# Start development server
yarn dev
```

## 📁 File Reference

### Templates (3 files)
- `netbox-feature-doc-template.md` - Standard feature docs
- `product-landing-page.md` - Product overview pages
- `semantic-tagging-usage.md` - Tag examples (to be added)

### Style Guides (3 files)
- `netbox-docs-style-guide.md` - Writing standards
- `product-tagging-guide.md` - Tagging system (to be added)
- `ai-prompting-guide.md` - AI assistance best practices (to be added)

### Content Strategy (2 files)
- `navigation-guidelines.md` - User-centric organization
- `version-management.md` - Version coordination (to be added)

### Reference Docs (2 files)
- `semantic-tagging-system.md` - Complete tagging documentation (to be added)
- `dochub-integration-requirements.md` - Technical specs (to be added)

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
1. Provide context from relevant ai-reference files
2. Follow `style-guides/ai-prompting-guide.md` (when available)
3. Use appropriate template
4. Apply comprehensive tagging system

## 📊 System Metrics

- **Total Files**: 15+ comprehensive reference files
- **Edition Tags**: 4 (cloud, enterprise, community, airgap)
- **Product Tags**: 5 (netbox, discovery, assurance, operator, branching)
- **Semantic Categories**: 38+ across 8 major areas
- **Version Coordination**: NetBox v4.2 (Community), v1.10 (Cloud/Enterprise)

## 🔧 Security & Deployment

### Protection Mechanisms
- **Git tracked**: Available to team members via repository
- **Build excluded**: Never appears on live site (netboxlabs.com/docs)
- **Docusaurus ignored**: Explicitly excluded in docusaurus.config.ts
- **Directory separation**: Located outside docs/ processing path

### How It Works
1. **Development Access**: Team can access via Git for templates and guidance
2. **Build Process**: Docusaurus ignores ai-reference during site generation
3. **Live Site**: Users never see internal reference materials
4. **Security**: Internal documentation stays internal

## 🔧 Maintenance

- **Source Sync**: Manual updates to reference materials as needed
- **Quality**: Style guide validation and tag accuracy
- **Updates**: Regular review of templates and guidelines
- **Integration**: Coordination with main documentation transformation pipeline

---

**System Overview** | **Last Updated**: 2025-01-27  
**Status**: Production Ready | **Version**: v2.0

*Complete overview of NetBox Labs AI reference system for development team use.* 