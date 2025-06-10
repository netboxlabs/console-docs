# NetBox Enterprise Documentation Repository

This repository contains the commercial/enterprise documentation for NetBox Labs products. The documentation is automatically integrated with the [netboxlabs-website-dochub](https://github.com/netboxlabs/netboxlabs-website-dochub) repository to create a unified documentation experience at **https://netboxlabs.com/docs**.

## 🎯 For Documentation Team: Quick Start

### Understanding Our Workflow

**This repository feeds into the main NetBox Labs documentation site**, but content visibility is controlled by **version branches**. This allows us to:

- ✅ **Write documentation before features are released**
- ✅ **Keep unreleased features hidden from customers**
- ✅ **Maintain stable documentation for current customers**
- ✅ **Seamlessly activate new versions when ready**

### Where Your Content Goes Live

```mermaid
graph LR
    A[console-docs<br/>This Repo] --> B[dochub<br/>Integration Site]
    B --> C[netboxlabs.com/docs<br/>Customer-Facing]
    
    D[netbox repo<br/>Community Docs] --> B
```

**Key Point**: Only content from specific version branches appears on the live site. Development content stays hidden until activated.

## 🚀 Local Development Setup

### 1. Clone and Setup
```bash
git clone https://github.com/netboxlabs/console-docs
cd console-docs
```

### 2. Install Dependencies
```bash
# Using Python virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Or using global Python (if you have permission issues)
/Users/[username]/Library/Python/3.9/bin/mkdocs serve
```

### 3. Start Local Preview
```bash
mkdocs serve
# Visit: http://127.0.0.1:8000
```

## 📝 Documentation Team Workflow Guide

### Understanding Version Control Strategy

We use **branch-based versioning** to control what customers see on the live documentation site:

| Version | Status | Branch | Customer Visibility | Purpose |
|---------|--------|--------|-------------------|---------|
| **v1.9** | 🟢 **LIVE** | `v1.9` | ✅ **Visible** | Current customer documentation |
| **v1.10** | 🟡 **Beta** | `v1.10` | ❌ **Hidden** | NetBox Enterprise + Assurance features |
| **v1.11** | 🔴 **Alpha** | `main` | ❌ **Hidden** | NetBox Enterprise + Helm features |

### Where to Add New Documentation

#### ✅ **For Current Customer Issues/Fixes (v1.9)**
```bash
git checkout v1.9
# Edit documentation for current features
git add docs/path/to/file.md
git commit -m "Fix SSL certificate installation steps"
git push origin v1.9
git tag v1.9.1  # Automatically deploys to live site
git push origin v1.9.1
```
**Result**: ✅ Changes appear immediately on https://netboxlabs.com/docs

#### 🔄 **For NetBox Enterprise + Assurance Features (v1.10 Beta)**
```bash
git checkout v1.10  # (when branch exists)
# Add documentation for Assurance features
git add docs/netbox-assurance/new-feature.md
git commit -m "Add documentation for network monitoring workflows"
git push origin v1.10
# DON'T tag yet - content stays hidden until v1.10 release
```
**Result**: ❌ Content written but not visible to customers until activated

#### 🚀 **For NetBox Enterprise + Helm Features (v1.11 Alpha)**
```bash
git checkout main
# Add documentation for Helm deployment features
git add docs/netbox-enterprise/helm-installation.md
git commit -m "Add Helm deployment guide"
git push origin main
# DON'T tag yet - content stays hidden until v1.11 release
```
**Result**: ❌ Content written but not visible to customers until activated

### How Integration with Dochub Works

```mermaid
sequenceDiagram
    participant You as Documentation Writer
    participant Repo as console-docs
    participant GHA as GitHub Actions
    participant Dochub as netboxlabs-website-dochub
    participant Live as netboxlabs.com/docs
    
    You->>Repo: Push to version branch
    You->>Repo: Create version tag (v1.9.x)
    Repo->>GHA: Trigger workflow on tag
    GHA->>GHA: Deploy with Mike
    GHA->>Dochub: Send webhook notification
    Dochub->>Live: Update live documentation site
```

**Key Points:**
- 🏷️ **Only tagged versions appear on live site**
- 🔒 **Untagged branches remain hidden**
- ⚡ **Tagging triggers automatic deployment**
- 🌐 **Dochub combines with community docs**

### Release Workflow for New Versions

#### When v1.10 (Assurance) is Ready for Customers:

1. **Activate the version** (DevOps/Maintainers):
   ```bash
   # Edit versions.json - move v1.10 from future_versions to versions
   # Update mkdocs.yml - add v1.10 to available versions
   git commit -m "Activate v1.10 for customer access"
   git push origin main
   ```

2. **Deploy the version**:
   ```bash
   git checkout v1.10
   git tag v1.10.0
   git push origin v1.10.0
   ```

3. **Result**: ✅ v1.10 documentation becomes visible to customers

#### When v1.11 (Helm) is Ready for Customers:

Same process - move from `future_versions` to `versions` and tag the release.

### Common Scenarios

#### 📝 **Scenario 1: Fix Current Documentation Error**
**Goal**: Customer reports error in v1.9 installation guide
```bash
git checkout v1.9
# Fix the error in docs/
git commit -m "Fix typo in SSL certificate steps"
git push origin v1.9
git tag v1.9.2
git push origin v1.9.2
# ✅ Fix goes live immediately
```

#### 📝 **Scenario 2: Document Upcoming Assurance Feature**
**Goal**: Engineering added monitoring feature for v1.10
```bash
git checkout v1.10  # (or create branch if it doesn't exist)
# Add docs/netbox-assurance/monitoring-alerts.md
git commit -m "Add monitoring alerts documentation"
git push origin v1.10
# ❌ Stays hidden until v1.10 is released
```

#### 📝 **Scenario 3: Document Future Helm Feature**
**Goal**: Engineering working on Helm charts for v1.11
```bash
git checkout main
# Add docs/netbox-enterprise/helm-charts.md
git commit -m "Add Helm charts configuration guide"
git push origin main
# ❌ Stays hidden until v1.11 is released
```

#### 📝 **Scenario 4: Cross-Version Update**
**Goal**: Security update applies to all versions
```bash
# Update current version first
git checkout v1.9
# Make security update
git commit -m "Add security best practices"
git tag v1.9.3
git push origin v1.9 v1.9.3

# Apply to future versions
git checkout main
git cherry-pick <commit-hash>
git push origin main

git checkout v1.10
git cherry-pick <commit-hash>
git push origin v1.10
```

## ⚠️ Important Guidelines for Documentation Team

### 🚨 **Critical Rules**

#### **DO:**
- ✅ **Always work on the correct version branch** for your content
- ✅ **Tag v1.9 changes immediately** (they go live instantly)
- ✅ **Test your changes locally** before committing
- ✅ **Use clear commit messages** describing what changed
- ✅ **Check if your update applies to multiple versions**

#### **DON'T:**
- ❌ **Never tag v1.10 or v1.11 branches** until release is approved
- ❌ **Don't merge development features into v1.9** branch
- ❌ **Don't assume all versions need the same content**
- ❌ **Don't work directly on main branch** for production fixes

### 🎯 **Quick Decision Guide**

**Ask yourself**: *"Should customers see this immediately?"*

- **YES** → Work on `v1.9` branch and tag when ready
- **NO, it's for Assurance features** → Work on `v1.10` branch (don't tag)
- **NO, it's for Helm features** → Work on `main` branch (don't tag)

### 📋 **Before You Start Writing**

1. **Check which NetBox Enterprise version** the feature is targeting
2. **Confirm the correct branch** to work on
3. **Understand if it's customer-ready** or still in development
4. **Ask DevOps if unsure** about version targeting

### 🔧 **Technical Reference**

#### Branch Structure
```
main              # v1.11 alpha (Helm capabilities) - HIDDEN from customers
├── v1.10         # v1.10 beta (Assurance capabilities) - HIDDEN from customers  
├── v1.9          # v1.9 current (Live customer docs) - VISIBLE to customers
└── feature/*     # Feature branches for new content
```

#### Configuration Files
- `versions.json` - Controls which versions are visible to customers
- `mkdocs.yml` - Local development configuration  
- `.github/workflows/version-deploy.yml` - Automated deployment system

## 🛠️ For DevOps/Maintainers: Technical Details

<details>
<summary>Click to expand technical workflow information</summary>

### Automated Deployment Process

The repository uses GitHub Actions to automatically deploy documentation when version tags are pushed:

```bash
# Tagging triggers automatic deployment
git tag v1.9.1
git push origin v1.9.1
# → Triggers GitHub Actions → Deploys to live site
```

### Version Configuration Management

Version visibility is controlled by `versions.json`:

```json
{
  "versions": [
    {
      "version": "v1.9", 
      "title": "v1.9 (Current)",
      "default": true,
      "status": "current"
    }
  ],
  "future_versions": [
    {
      "version": "v1.10",
      "title": "v1.10 (Beta) - NetBox Enterprise with Assurance",
      "status": "beta"
    },
    {
      "version": "v1.11",
      "title": "v1.11 (Alpha) - NetBox Enterprise with Helm",
      "status": "alpha"
    }
  ]
}
```

### Activating New Versions

To make a development version visible to customers:

1. Move version from `future_versions` to `versions` in `versions.json`
2. Update `mkdocs.yml` available versions list
3. Update `LATEST_VERSION` in GitHub Actions workflow
4. Tag the version branch to deploy

### Integration with Dochub

The repository sends webhook notifications to `netboxlabs-website-dochub` when versions are deployed, triggering updates to the unified documentation site.

</details>

## :warning:

If you see errors like this...

> ERROR   -  Config value 'theme': Unrecognised theme name: 'material'. The available installed themes are: mkdocs, readthedocs
> ERROR   -  Config value 'markdown_extensions': Failed to load extension 'pymdownx.tabbed'.
>            ModuleNotFoundError: No module named 'pymdownx'


 Try uninstalling `mkdocs` from your package manager, (e.g. `brew uninstall mkdocs`) and just using the version installed by `pip`. It seems that `mkdocs` doesn't like it when you've installed it using different methods.