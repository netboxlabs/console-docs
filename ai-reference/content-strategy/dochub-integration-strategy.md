# DocHub Integration Strategy & Implementation Guide

## Overview
This document provides the DocHub team with comprehensive instructions to integrate the enhanced NetBox documentation structure from the `netboxlabs/console-docs` repository into `netboxlabs/netboxlabs-website-dochub`.

## Repository Context
- **Source Repository**: `netboxlabs/console-docs`
- **Target Repository**: `netboxlabs/netboxlabs-website-dochub`
- **Current Branch**: `origin/feat/navigation-restructure-and-docs-enhancement`
- **Integration Date**: January 2025

## Key Enhancements

### 1. Streamlined Semantic Tagging System
- **Total Tags**: 20 (reduced from 43 - 53% reduction)
- **Two-tier system**: Edition pills (top) + semantic tags (bottom)
- **Optimized for DocHub**: Simplified structure reduces cognitive load

#### Platform Tags (4) - Top-Level Pills
| Tag | Label | Color | Description |
|-----|-------|-------|-------------|
| `cloud` | NetBox Cloud | #00d9be | Cloud features and administration |
| `enterprise` | NetBox Enterprise | #ffac00 | On-premises features |
| `community` | NetBox Community | #00bee0 | Community edition features |
| `airgap` | Air-Gap | #ff0078 | Air-gap deployment features |

#### Semantic Tags (16) - Bottom References
- **Products** (4): `netbox`, `discovery`, `assurance`, `operator`
- **Deployment** (2): `kubernetes`, `helm`
- **Technical** (4): `api`, `authentication`, `administration`, `operations`
- **Content Types** (4): `installation`, `configuration`, `troubleshooting`, `getting-started`
- **Features** (4): `automation`, `networking`, `integration`, `ai`

### 2. Enhanced Frontmatter System
All documentation includes comprehensive metadata:

```yaml
---
tags: 
  - cloud              # Platform pill (top)
  - enterprise         # Platform pill (top)
  - assurance          # Product reference (bottom)
  - automation         # Feature reference (bottom)
  - operations         # Technical reference (bottom)
title: "Document Title"
author: "NetBox Labs"
last_updated: "2025-01-XX"
versions:
  netbox_cloud: "v1.10"
  netbox_enterprise: "v1.10"
  netbox_community: "v4.2"
status: "current"
description: "Brief description of the document"
category: "administration"
audience: "administrators"
complexity: "intermediate"
---
```

### 3. AI Reference Structure
- **Location**: `ai-reference/` directory
- **Purpose**: Standardized templates, style guides, and reference materials
- **Key Components**:
  - Style guides with enhanced frontmatter specifications
  - Document templates for features and landing pages
  - AI prompting guidelines for content generation
  - Content strategy and navigation guidelines

## Migration Status

- ✅ **Streamlined tagging system** - Complete (20 tags)
- ✅ **Enhanced frontmatter** - Complete
- ✅ **AI reference structure** - Complete
- ✅ **Updated NetBox Assurance docs** - Complete
- ✅ **Script cleanup** - Complete
- ✅ **Documentation alignment** - Complete

## Integration Instructions

### Step 1: Repository Setup
```bash
# Clone the source repository
git clone https://github.com/netboxlabs/console-docs.git
cd console-docs
git checkout origin/feat/navigation-restructure-and-docs-enhancement

# Prepare target repository
cd ../netboxlabs-website-dochub
git checkout main
git pull origin main
git checkout -b integrate-enhanced-docs-structure
```

### Step 2: Content Migration Strategy

#### A. AI Reference Integration
1. **Copy AI Reference Structure**:
   - Migrate entire `ai-reference/` directory to DocHub
   - Adapt file paths and references for Docusaurus structure
   - Integrate style guides into DocHub's documentation standards

2. **Template Adaptation**:
   - Convert MkDocs templates to Docusaurus format
   - Update frontmatter schema to match DocHub requirements
   - Ensure version tracking compatibility

#### B. Streamlined Tagging Implementation
1. **Apply Enhanced Tagging**:
   ```bash
   npm run enhanced-tag  # Primary command for streamlined system
   ```

2. **Tag Structure**:
   - **Platform tags** display as top-level pills
   - **Semantic tags** provide bottom references
   - Two-tier system optimizes both discovery and organization

3. **Frontmatter Conversion**:
   - Convert YAML frontmatter to Docusaurus format
   - Map version information to DocHub's versioning system
   - Preserve enhanced tag structure and metadata

#### C. Configuration Updates
1. **Navigation Structure**:
   - Convert `mkdocs.yml` navigation to Docusaurus sidebars
   - Maintain Cloud/Enterprise/Community separation
   - Preserve logical document grouping

2. **Version Management**:
   - Implement version-aware content filtering
   - Ensure proper edition-specific content display
   - Maintain backward compatibility for existing links

### Step 3: Technical Considerations

#### Version Mapping
- **NetBox Cloud**: v1.10 (updated docs)
- **NetBox Enterprise**: v1.10 (updated docs)
- **NetBox Community**: Always v4.2
- **Discovery/Assurance**: v1.10 for premium features

#### Content Filtering
Implement logic to show/hide content based on:
- Product edition (Cloud, Enterprise, Community)
- Version compatibility
- Feature availability
- User access level

#### Asset Management
- **Images**: Located in `docs/images/` with organized subdirectories
- **Stylesheets**: Custom CSS in `docs/stylesheets/`
- **Scripts**: Utility scripts in `scripts/` directory

## Testing & Validation

### Pre-Integration Checklist
- [ ] All frontmatter follows DocHub schema
- [ ] Streamlined tagging system is applied
- [ ] Internal links are properly formatted
- [ ] Images and assets are accessible
- [ ] Navigation structure is logical
- [ ] Version filtering works correctly

### Testing Commands
```bash
# Install dependencies
pip install -r requirements.txt

# Serve locally
mkdocs serve

# Check streamlined tags
grep -r "tags:" docs/ --include="*.md" | head -10

# Test enhanced tagging script
npm run enhanced-tag
```

### Post-Integration Testing
- [ ] All pages render correctly
- [ ] Search functionality works with new tags
- [ ] Version-specific content displays properly
- [ ] Mobile responsiveness maintained
- [ ] Performance metrics acceptable

## Key Files to Review

### Critical Configuration Files
- `mkdocs.yml` - Navigation and site configuration
- `docs/tags.yml` - Streamlined 20-tag definitions
- `package.json` - Updated script references

### Current Documentation
- `ai-reference/style-guides/product-tagging-guide.md` - Complete tagging system
- `ai-reference/reference-docs/tag-consolidation-summary.md` - Streamlined system overview
- `ai-reference/templates/semantic-tagging-usage.md` - Current usage examples

### Recently Updated Content
- `docs/netbox-assurance/index.md` - Major content update
- `docs/netbox-discovery/index.md` - Enhanced structure
- All files in `docs/netbox-assurance/` directory

## Success Criteria

### Functional Requirements
- All documentation content is accessible and properly formatted
- Streamlined tagging system provides intuitive content discovery
- Version-specific content displays correctly
- Search functionality includes all new content with semantic tags
- Navigation maintains existing user paths while improving organization

### Technical Requirements
- Page load times remain acceptable with reduced tag complexity
- Mobile experience is optimized
- SEO metadata is preserved or improved
- Analytics tracking continues to function

### Content Quality
- All frontmatter uses streamlined 20-tag system
- Internal links function correctly
- Images and media display properly
- Version information is current and accurate

## Deployment Timeline

### Phase 1 (Week 1): Setup and Analysis
- Repository setup and branch creation
- Content analysis and mapping
- Technical architecture planning

### Phase 2 (Week 2): Content Migration
- AI reference structure integration
- Documentation content conversion with streamlined tags
- Asset migration and path updates

### Phase 3 (Week 3): Configuration and Testing
- Navigation structure implementation
- Version filtering setup
- Staging environment testing

### Phase 4 (Week 4): Deployment and Validation
- Production deployment
- Post-deployment testing
- Performance monitoring and optimization

## Support and Troubleshooting

### Common Issues
1. **Frontmatter Parsing Errors**: Check YAML syntax and required fields
2. **Tag System Issues**: Ensure using streamlined 20-tag system
3. **Broken Internal Links**: Update relative paths for new structure
4. **Missing Images**: Verify asset paths and file locations
5. **Version Filtering**: Ensure logic matches frontmatter versions

### Contact Information
For questions or issues during integration, refer to:
- AI Reference documentation in `ai-reference/README.md`
- Style guide in `ai-reference/style-guides/product-tagging-guide.md`
- Tag consolidation summary in `ai-reference/reference-docs/tag-consolidation-summary.md`

---

**Note**: This integration represents a significant enhancement to the NetBox documentation structure with a streamlined, maintainable tagging system. The AI reference materials and enhanced frontmatter system provide a foundation for consistent, high-quality documentation while reducing complexity through the 53% tag reduction. 