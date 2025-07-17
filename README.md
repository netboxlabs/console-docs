# ⚠️ DEPRECATED: NetBox Enterprise Documentation Repository

> **🚨 This repository is deprecated as of January 2025**
> 
> **All documentation changes must now be made in the [netboxlabs-website-dochub](https://github.com/netboxlabs/netboxlabs-website-dochub) repository.**
> 
> **Changes made to this repository will NOT be published to the docs site.**

## 🔄 Where to Go Now

| What you need to do | Where to do it |
|-------------------|----------------|
| **Edit Console/Cloud/Enterprise docs** | [netboxlabs-website-dochub](https://github.com/netboxlabs/netboxlabs-website-dochub) in `localdocs/console/` |
| **Add new documentation** | [netboxlabs-website-dochub](https://github.com/netboxlabs/netboxlabs-website-dochub) in `localdocs/console/` |
| **Update existing guides** | [netboxlabs-website-dochub](https://github.com/netboxlabs/netboxlabs-website-dochub) in `localdocs/console/` |

## 🚀 Quick Migration Guide

### If you previously worked with this repository:

**Old workflow (DEPRECATED):**
```bash
# ❌ Don't do this anymore - changes won't be published
git clone https://github.com/netboxlabs/console-docs
# Edit files in docs/
# Submit PR to console-docs
# Wait for dochub integration
```

**New workflow (CURRENT):**
```bash
# ✅ Do this instead
git clone --recurse-submodules https://github.com/netboxlabs/netboxlabs-website-dochub
cd netboxlabs-website-dochub
yarn install && yarn dev
# Edit files in localdocs/console/
# Changes go live immediately after merge
```

## 📍 New Documentation System

The documentation has moved to a **unified system** in the [netboxlabs-website-dochub](https://github.com/netboxlabs/netboxlabs-website-dochub) repository:

### What Changed
- **Direct editing**: Edit documentation directly in `localdocs/console/`
- **Immediate publishing**: Changes go live after merge (no two-step process)
- **Unified system**: All NetBox documentation in one place
- **Better development**: Live preview with `yarn dev`

### File Location Mapping
| Old Location (console-docs) | New Location (dochub) |
|----------------------------|----------------------|
| `docs/administration-console/` | `localdocs/console/administration-console/` |
| `docs/cloud-connectivity/` | `localdocs/console/cloud-connectivity/` |
| `docs/netbox-enterprise/` | `localdocs/console/netbox-enterprise/` |
| `docs/netbox-assurance/` | `localdocs/console/netbox-assurance/` |
| `docs/netbox-discovery/` | `localdocs/console/netbox-discovery/` |
| `docs/netbox-integrations/` | `localdocs/console/netbox-integrations/` |

## 🛠️ Getting Started with the New System

### 1. Clone the New Repository
```bash
git clone --recurse-submodules https://github.com/netboxlabs/netboxlabs-website-dochub.git
cd netboxlabs-website-dochub
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Start Development
```bash
yarn dev
# Visit http://localhost:3001 to see changes live
```

### 4. Edit Documentation
```bash
# Edit files in localdocs/console/
# Changes appear immediately in browser
```

### 5. Commit and Push
```bash
git add .
git commit -m "docs: update console documentation"
git push
# Changes go live after merge - no additional steps needed
```

## 📚 Reference Information

### 1. Local Development
```bash
git clone https://github.com/netboxlabs/console-docs
cd console-docs
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
mkdocs serve  # Visit http://127.0.0.1:8000
```

### 2. Write Documentation
Create `.md` files in the `docs/` directory with proper frontmatter:

```yaml
---
tags:
  - cloud                    # Edition availability
  - enterprise
  - administration           # Category
  - getting-started          # Content type
  - authentication           # Feature area
  - sso                      # Specific feature
---

# Your Documentation Title

Your content here...
```

### 3. Submit Changes
```bash
git checkout -b feature/your-feature-name
git add docs/your-file.md
git commit -m "Add documentation for feature"
git push origin feature/your-feature-name
# Create pull request
```

## 📁 Repository Structure

```
console-docs/
├── docs/                           # 📝 Documentation content
│   ├── administration-console/     # NetBox Cloud admin features  
│   ├── cloud-connectivity/         # Cloud connectivity guides
│   ├── netbox-assurance/          # NetBox Assurance documentation
│   ├── netbox-discovery/          # NetBox Discovery documentation
│   ├── netbox-enterprise/         # NetBox Enterprise guides
│   ├── netbox-integrations/       # Third-party integrations
│   └── netbox-cloud/              # NetBox Cloud migration
├── ai-reference/                   # 🤖 AI development resources
│   ├── README.md                   # AI reference system overview
│   ├── QUICK_REFERENCE.md         # Quick lookup for common tasks
│   ├── DISTRIBUTION_URLS.md       # Customer-facing URLs
│   ├── content-strategy/          # Navigation & content strategy
│   ├── project-docs/              # Project implementation details
│   ├── reference-docs/            # Technical reference materials
│   ├── style-guides/              # Writing and tagging guidelines
│   └── templates/                 # Document templates
├── mkdocs.yml                      # 🔧 Local development configuration
└── README.md                       # 📖 This file
```

## 🏷️ Documentation Standards

### Comprehensive Tagging System

Our documentation uses a multi-tier tagging system for better organization and discovery:

#### Edition Tags (Prominent Pills)
```yaml
tags:
  - cloud        # NetBox Cloud features
  - enterprise   # NetBox Enterprise features  
  - community    # NetBox Community (open source) features
  - airgap       # Air-gapped deployments
```

#### Product Tags
```yaml
tags:
  - netbox       # Core NetBox functionality
  - discovery    # NetBox Discovery features
  - assurance    # NetBox Assurance features
  - operator     # NetBox Operator features
```

#### Technical Category Tags
```yaml
tags:
  - authentication  # Authentication and SSO
  - administration  # System administration
  - security       # Security features
  - api           # API documentation
  - integration   # Third-party integrations
  - backup        # Backup and restore
  - monitoring    # Monitoring and alerting
```

#### Content Type Tags
```yaml
tags:
  - getting-started    # Introductory guides
  - installation       # Setup procedures
  - configuration      # Settings and customization
  - troubleshooting    # Problem resolution
  - reference         # Technical reference
```

### Enhanced Frontmatter Format

```yaml
---
title: "Document Title"
description: "Brief description of the document"
tags:
  - cloud                    # Edition availability
  - enterprise
  - administration           # Category
  - authentication           # Feature area
  - sso                      # Specific feature
  - configuration           # Content type
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-02"
versions:
  netbox_cloud: "v1.10"
  netbox_enterprise: "v1.10"
category: "administration"
audience: "administrators"
complexity: "intermediate"
---
```

## 🤖 AI Reference System

The `ai-reference/` directory contains comprehensive resources for AI-assisted documentation development. **These materials are still useful for reference** but should be applied in the new dochub repository.

### Key Resources
- **[AI Reference README](ai-reference/README.md)**: Complete system overview
- **[Quick Reference](ai-reference/QUICK_REFERENCE.md)**: Common tasks and commands
- **[Style Guides](ai-reference/style-guides/)**: Writing standards and guidelines
- **[Templates](ai-reference/templates/)**: Document templates and examples

## 📦 Version Management

### Current Version Strategy
| Version | Status | Purpose |
|---------|---------|---------|
| **v1.9** | 🟢 **LIVE** | Current stable customer documentation |
| **v1.10** | 🟡 **Beta** | Enterprise + Discovery/Assurance features |
| **v1.11** | 🔴 **Future** | Upcoming features and improvements |

### Version Guidelines
- **Current customers**: Documentation on `main` branch (v1.9)
- **New features**: Use feature branches until version branches are created
- **Version compatibility**: Specify in frontmatter when relevant

## 🔄 Integration with DocHub

### What DocHub Handles
- **Content Integration**: Combines docs from multiple repositories
- **Site Building**: Transforms markdown to web pages using Docusaurus
- **URL Management**: Creates customer-facing URLs
- **Search**: Provides search functionality across all docs
- **Navigation**: Generates unified navigation structure
- **Tagging**: Processes semantic tags for content organization

### What This Repo Provides
- **Source Content**: Raw documentation files with comprehensive metadata
- **AI Reference Materials**: Development resources and guidelines
- **Semantic Tagging**: Rich frontmatter for content organization
- **Local Preview**: MkDocs for development testing
- **Version Control**: Git history for documentation changes

## 🌐 Distribution URLs

This repository provides content for several customer-facing distribution endpoints:

### Customer Messages
- **RSS Feed**: `https://netboxlabs.com/docs/feeds/customer-messages.xml`
- **Purpose**: NetBox Enterprise console integration

### NetBox Enterprise Helm Documentation
- **Installation Guides**: `https://netboxlabs.com/docs/guides/helm/`
- **Configuration Files**: `https://netboxlabs.com/docs/files/helm/`
- **Values Template**: `https://netboxlabs.com/docs/files/helm/values-extra.yaml`

For complete distribution URL documentation, see [ai-reference/DISTRIBUTION_URLS.md](ai-reference/DISTRIBUTION_URLS.md).

## ⚠️ Important Notes

- **Changes aren't live immediately** - requires dochub integration
- **Use comprehensive tags** - helps with content organization and discovery
- **Test locally** before submitting PRs with `mkdocs serve`
- **Follow two-step process** for publishing
- **Consult ai-reference** for detailed guidelines and templates

## 🛠️ Troubleshooting

### Common Issues
- **MkDocs theme errors**: Try `pip uninstall mkdocs && pip install -r requirements.txt`
- **Changes not appearing**: Remember the two-step publishing process
- **Local preview not working**: Check Python virtual environment is activated
- **Tagging questions**: Consult [ai-reference/style-guides/](ai-reference/style-guides/)

### Getting Help
- **Documentation Issues**: Create an issue in this repository
- **Publishing Questions**: Ask in the netboxlabs-website-dochub repository
- **AI Reference**: Check [ai-reference/README.md](ai-reference/README.md) for comprehensive guidelines
- **Community Support**: Join [NetBox Slack](https://netdev.chat/) #netbox channel

## 🔍 Quality Assurance

### Before Publishing
- **Use proper tagging**: Follow the comprehensive tagging system
- **Test locally**: Run `mkdocs serve` to verify content renders correctly
- **Check frontmatter**: Ensure all required metadata is present
- **Review guidelines**: Consult ai-reference materials for best practices

### Content Standards
- **Professional technical writing** for network engineers
- **Clear, concise language** without AI-generated patterns
- **Tested procedures** with accurate examples
- **Consistent formatting** following style guides

## 🔄 Migration Support

### Need Help Migrating?
- **Read the dochub README**: [netboxlabs-website-dochub README](https://github.com/netboxlabs/netboxlabs-website-dochub#readme)
- **Check the migration guide**: Available in the dochub repository
- **Ask questions**: Create an issue in the dochub repository

### Common Migration Tasks
1. **Move your branch**: No need to migrate - start fresh in dochub
2. **Update bookmarks**: Point to netboxlabs-website-dochub repository
3. **Update documentation**: Reference the new workflow in team processes
4. **Transfer knowledge**: Share the new process with team members

## ⚠️ Final Reminders

- **❌ This repository is READ-ONLY** for documentation purposes
- **❌ PRs to this repository will NOT be published**
- **✅ All changes must go to [netboxlabs-website-dochub](https://github.com/netboxlabs/netboxlabs-website-dochub)**
- **✅ The new system is faster and more efficient**

---

**Ready to get started?** Head over to [netboxlabs-website-dochub](https://github.com/netboxlabs/netboxlabs-website-dochub) and follow the quick start guide!