# NetBox Enterprise Documentation Repository

This repository contains the commercial/enterprise documentation for NetBox Labs products. Documentation written here gets published to **https://netboxlabs.com/docs** through a multi-repository integration process.

## 🏗️ How Documentation Gets Published

This repository feeds into a **three-repository publishing pipeline**:

```
console-docs (this repo) → netboxlabs-website-dochub → netboxlabs.com/docs
```

1. **console-docs** (this repo) → Contains documentation source files
2. **netboxlabs-website-dochub** → Integrates multiple doc repos and builds the site
3. **netboxlabs-website** → Serves the final site at netboxlabs.com/docs via URL rewrite

## 📝 How to Contribute Documentation

### Two-Step Publishing Process

**Step 1: Update Content (This Repo)**
```bash
git checkout -b feature/your-documentation
# Write your documentation in docs/
git add docs/your-new-file.md
git commit -m "Add documentation for your feature"
git push origin feature/your-documentation
# Create and merge PR
```

**Step 2: Publish Changes (Dochub Repo)**
```bash
# In netboxlabs-website-dochub repository
yarn update-submodules  # Pulls latest from console-docs
git add external-repos/console-docs
git commit -m "Update console documentation"
git push origin main
# Create and merge PR to publish live
```

**Important**: Changes in this repo don't go live until Step 2 is completed in the dochub repository.

## 🚀 Quick Start

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
├── mkdocs.yml                      # 🔧 Local development configuration
└── README.md                       # 📖 This file
```

## 🏷️ Documentation Standards

### Required Frontmatter
```yaml
---
tags:
  - cloud                    # Edition (cloud, enterprise, community)
  - administration           # Category
  - getting-started          # Content type (installation, configuration, etc.)
---
```

### Edition Tags
- `cloud` - NetBox Cloud features
- `enterprise` - NetBox Enterprise features  
- `community` - NetBox Community (open source) features

### Content Type Tags
- `getting-started` - Introductory guides
- `installation` - Setup procedures
- `configuration` - Settings and customization
- `administration` - System administration
- `troubleshooting` - Problem resolution
- `api` - API documentation

## 🔄 Integration with DocHub

### What DocHub Handles
- **Content Integration**: Combines docs from multiple repositories
- **Site Building**: Transforms markdown to web pages
- **URL Management**: Creates customer-facing URLs
- **Search**: Provides search functionality across all docs
- **Navigation**: Generates unified navigation structure

### What This Repo Provides
- **Source Content**: Raw documentation files
- **Metadata**: Tags and frontmatter for organization
- **Local Preview**: MkDocs for development testing
- **Version Control**: Git history for documentation changes

## ⚠️ Important Notes

- **Changes aren't live immediately** - requires dochub integration
- **Use proper tags** - helps with content organization and discovery
- **Test locally** before submitting PRs
- **Follow two-step process** for publishing

## 🛠️ Troubleshooting

### Common Issues
- **MkDocs theme errors**: Try `pip uninstall mkdocs && pip install -r requirements.txt`
- **Changes not appearing**: Remember the two-step publishing process
- **Local preview not working**: Check Python virtual environment is activated

### Getting Help
- **Documentation Issues**: Create an issue in this repository
- **Publishing Questions**: Ask in the netboxlabs-website-dochub repository
- **Community Support**: Join [NetBox Slack](https://netdev.chat/) #netbox channel

---

**Ready to contribute?** Follow the [Quick Start](#-quick-start) and remember the [two-step publishing process](#two-step-publishing-process)!