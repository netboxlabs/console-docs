---
title: "Project Documentation"
description: "Internal project documentation for NetBox Documentation Hub development"
tags:
  - project-docs
  - internal
  - development
  - navigation
  - ai-reference
author: "NetBox Labs Documentation Team"
last_updated: "2025-06-25"
category: "project-documentation"
audience: "developers"
complexity: "intermediate"
internal_only: true
draft: true
---

:::info Internal Project Documentation
This directory contains internal project documentation for DocHub2 development.  
**Not published to public documentation sites.** For development team use only.
:::

# NetBox Labs Documentation Project Overview

This document provides comprehensive coverage of both the **dochub** (unified documentation site) and **console-docs** (console documentation) projects, their workflows, and integration strategy.

## 🏗️ Project Architecture

### Two-Repository System

```mermaid
graph TB
    A[console-docs Repository] --> B[dochub Repository]
    C[netbox Repository] --> B
    D[pynetbox Repository] --> B
    E[netbox-branching Repository] --> B
    F[diode Repository] --> B
    
    B --> G[netboxlabs.com/docs]
    
    H[Version Control] --> A
    I[GitHub Actions] --> B
    J[Vercel Deployment] --> G
```

### **Console-Docs Repository**
- **Purpose**: Source repository for NetBox Enterprise/Cloud documentation
- **Content**: Administration, Discovery, Assurance, Extensions, Integrations
- **Workflow**: Version-based branch strategy for release management
- **Integration**: Feeds into dochub via git submodules

### **Dochub Repository** 
- **Purpose**: Unified documentation site combining all NetBox documentation
- **Content**: Transforms and integrates multiple source repositories
- **Workflow**: Automated transformation and deployment pipeline
- **Output**: Customer-facing documentation at netboxlabs.com/docs

## 🔄 Development Workflows

### Console-Docs Workflow

#### **Current Version Strategy**
| Version | Status | Branch | Customer Visibility | Purpose |
|---------|--------|--------|-------------------|---------|
| **v1.9** | 🟢 **LIVE** | `main` | ✅ **Visible** | Current customer documentation |
| **v1.10** | 🟡 **Beta** | *not created yet* | ❌ **Hidden** | Enterprise + Assurance features |
| **v1.11** | 🔴 **Alpha** | *future* | ❌ **Hidden** | Enterprise + Helm features |

#### **Writing Guidelines**
```bash
# For current customers (goes live immediately)
git checkout main
# Make changes
git commit -m "Fix installation guide"
git tag v1.9.1
git push origin main v1.9.1

# For future features (stays hidden)
git checkout -b feature/assurance-monitoring
# Add new feature documentation
git commit -m "Add monitoring documentation"
git push origin feature/assurance-monitoring
# DON'T merge until version branch exists
```

#### **Release Process**
1. **Development**: Write documentation in feature branches
2. **Version Preparation**: Create version branch when ready
3. **Activation**: Move from `future_versions` to `versions` in config
4. **Deployment**: Tag version branch to deploy to customers

### Dochub Workflow

#### **Automated Integration**
```bash
# Daily development workflow
yarn dev              # Start with full transformation
yarn transform-docs  # Transform only
yarn build           # Production build

# Submodule management
git submodule update --remote  # Update all external repos
yarn update-submodules        # Update and transform
```

#### **GitHub Actions Automation**
- **Hourly**: Check for external repo changes (business hours)
- **6-hourly**: Check for changes (off hours)
- **Automatic**: Create PRs with transformed content
- **Validation**: Auto-merge after Vercel deployment checks
- **Cleanup**: Remove outdated automated PRs

## 🏷️ Comprehensive Tagging System

### Edition Tags (Prominent Pills)
```yaml
tags:
  - cloud      # NetBox Cloud features (#00d9be)
  - enterprise # NetBox Enterprise features (#ffac00)  
  - community  # Open source features (#00bee0)
  - airgap     # Air-gapped deployments (#6c757d)
```

### Product Tags (Regular Display)
```yaml
tags:
  - netbox     # Core NetBox functionality
  - discovery  # Network discovery (all editions)
  - assurance  # Network monitoring (Cloud/Enterprise only)
  - operator   # AI operations (Cloud/Enterprise only)
  - branching  # Branching extension (Cloud/Enterprise only)
```

### Semantic Categories (38+ Tags)
- **Authentication**: `authentication`, `sso`, `ldap`, `saml`, `rbac`
- **Security**: `security`, `encryption`, `certificates`, `compliance`
- **Database**: `database`, `backup`, `migration`, `upgrade`, `maintenance`
- **APIs**: `rest-api`, `graphql`, `webhooks`, `automation`, `scripting`
- **Monitoring**: `monitoring`, `notifications`, `alerting`, `logging`
- **Development**: `custom-fields`, `plugins`, `customization`
- **Networking**: `networking`, `infrastructure`, `connectivity`
- **User Experience**: `getting-started`, `installation`, `configuration`

## 🔧 Technical Implementation

### Git Submodules Strategy

#### **Submodule Protection in CI/CD**
Critical issue: `yarn install` triggers `postinstall` which resets submodules.

**Solution**:
```bash
# Save updated commit hashes
NETBOX_COMMIT=$(cd external-repos/netbox && git rev-parse HEAD)
CONSOLE_COMMIT=$(cd external-repos/console-docs && git rev-parse HEAD)

# Install dependencies (resets submodules)
yarn install --frozen-lockfile

# Restore to updated commits
cd external-repos/netbox && git checkout $NETBOX_COMMIT
cd ../console-docs && git checkout $CONSOLE_COMMIT
```

#### **Manual Submodule Management**
```bash
# Initialize all submodules
git submodule update --init --recursive

# Update specific submodule
cd external-repos/netbox
git pull origin main
cd ../..
git add external-repos/netbox
git commit -m "Update NetBox docs to latest"

# Update all submodules
git submodule update --remote
git add external-repos/
git commit -m "Update all documentation submodules"
```

### Transformation Pipeline

#### **Content Processing Steps**
1. **Parse Source**: Read MkDocs YAML and markdown files
2. **Convert Format**: Transform MkDocs syntax to Docusaurus MDX
3. **Handle Assets**: Copy images and static files with path updates
4. **Escape Content**: Handle React/MDX special characters
5. **Apply Tagging**: Add comprehensive semantic tags automatically
6. **Generate Sidebars**: Convert navigation to Docusaurus format
7. **Build Integration**: Combine with custom theme and components

#### **Enhanced Features**
- **Autodoc Processing**: Handle NetBox autodoc directives
- **Link Resolution**: Fix internal cross-references
- **Image Optimization**: Preserve directory structures
- **Frontmatter Enhancement**: Add missing metadata automatically
- **Version Filtering**: Show/hide content based on version compatibility

### URL Redirect System

#### **Vercel Configuration (200+ Rules)**
```json
{
  "redirects": [
    {
      "source": "/Administration Console/(.*)",
      "destination": "/docs/console/administration-console/$1",
      "permanent": true
    },
    {
      "source": "/netbox-discovery/(.*)",
      "destination": "/docs/console/netbox-discovery/$1",
      "permanent": true
    }
  ]
}
```

#### **Redirect Categories**
- **Primary Navigation**: Root and docs path handling
- **Console Legacy**: Old URL patterns to new structure
- **Submodule Integration**: External repo documentation paths
- **Asset Handling**: GitHub raw content for images
- **Backward Compatibility**: Maintain existing customer links

### Content Exclusion System

#### **Docusaurus Configuration**
```typescript
docs: {
  exclude: [
    // Internal development materials
    '**/ai-reference/**',
    '**/AUTOMATED_DOCS_SYSTEM.md',
    '**/CHANGELOG_SYSTEM.md',
    
    // Incomplete external content
    '**/external-repos/**/console-access-from-ui.md',
    '**/external-repos/**/nbe-kots-installation.md',
    
    // Placeholder files
    '**/external-repos/**/aws-direct-connect-setup.md',
    
    // Legacy/superseded content
    '**/external-repos/**/sdks/pynetbox.md',
  ],
}
```

## 🚀 Deployment & Operations

### Production Deployment
- **Platform**: Vercel with automatic deployments
- **Integration**: Next.js rewrites serve docs under `/docs/*`
- **Performance**: Edge redirects, CDN distribution, optimized builds
- **Monitoring**: Analytics, error tracking, performance metrics

### External Documentation Sync

#### **Console-Docs External Sources**
| Path | Repository | Purpose | Update Method |
|------|------------|---------|---------------|
| `docs/netbox-extensions/changes/` | `netbox-changes` | Change Management docs | Script-based sync |

#### **Update Process**
```bash
# Update external documentation from source
./scripts/update-changes-docs.sh

# Review changes
git diff docs/netbox-extensions/changes/

# Test build
python -m mkdocs build

# Commit updates
git add docs/netbox-extensions/changes/
git commit -m "Update NetBox Changes documentation"
git push
```

### Quality Assurance

#### **Automated Testing**
- **Build Validation**: Ensure all content transforms correctly
- **Link Checking**: Verify internal and external links
- **Redirect Testing**: Validate URL redirect behavior
- **Performance Testing**: Monitor build times and page load speeds

#### **Manual Verification**
```bash
# Test full pipeline locally
git submodule update --remote
yarn transform-docs
yarn build

# Verify exclusions working
find build/ -name "ai-reference" -type d  # Should be empty
find build/ -name "*AUTOMATED_DOCS_SYSTEM*"  # Should be empty

# Check navigation structure
cat build/sitemap.xml | grep -c "docs/"  # Count pages
```

## 📊 Project Metrics & Status

### Content Volume
- **Total Repositories**: 5 (console-docs, netbox, pynetbox, netbox-branching, diode)
- **Total Files Processed**: 600+ (284 NetBox + 323 Console + submodules)
- **Redirect Rules**: 200+ in vercel.json
- **Automated Workflows**: 7 GitHub Actions workflows
- **Semantic Tags**: 50+ across 8 major categories

### Build Performance
- **Build Time**: < 30 seconds for full transformation
- **Development Server**: Hot reload in < 5 seconds
- **Deployment**: Automatic via Vercel on git push
- **Submodule Updates**: Automated hourly checks during business hours

### Integration Status
- ✅ **Successful Builds**: All content processes without errors
- ✅ **Navigation Generation**: Automatic sidebar creation
- ✅ **Search Integration**: Algolia search with enhanced metadata
- ✅ **Mobile Optimization**: Responsive design maintained
- ✅ **SEO Enhancement**: Improved metadata and sitemap generation

## 🔮 Future Enhancements

### Phase 2 Capabilities
1. **Content Filtering UI**: User-selectable version/edition filters
2. **Advanced Search**: Metadata-enhanced search results
3. **Content Analytics**: Usage tracking with enhanced metadata
4. **Automated Quality Checks**: Style guide validation
5. **Multi-language Support**: i18n framework preparation

### Technical Improvements
- **Performance Optimization**: Bundle splitting and lazy loading
- **Enhanced Automation**: Smarter change detection
- **Better Error Handling**: Graceful degradation for edge cases
- **Advanced Monitoring**: Detailed analytics and alerting

## 📞 Support & Resources

### **For Console-Docs Contributors**
- **Repository**: https://github.com/netboxlabs/console-docs
- **Local Setup**: `pip install -r requirements.txt && mkdocs serve`
- **Version Strategy**: See version management section above
- **AI Reference**: Use `/ai-reference/` materials for consistency

### **For Dochub Contributors**
- **Repository**: https://github.com/netboxlabs/dochub3
- **Local Setup**: `yarn install && yarn dev`
- **Workflow**: Automated submodule updates via GitHub Actions
- **AI Reference**: Comprehensive materials in `/ai-reference/`

### **For End Users**
- **Live Site**: https://netboxlabs.com/docs
- **Community Support**: NetBox Discussions
- **Enterprise Support**: NetBox Labs Support Portal
- **Issue Reporting**: Respective repository issue trackers

---

**Project Overview** | **Last Updated**: 2025-06-25  
**Status**: Production Ready | **Integration**: Complete  
**Next Review**: Quarterly project review and enhancement planning

*Comprehensive documentation covering both console-docs and dochub projects for development team coordination.* 