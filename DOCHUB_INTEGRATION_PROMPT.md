# DocHub Integration Prompt for NetBox Documentation

## Overview
This prompt provides the DocHub team with instructions to integrate the enhanced NetBox documentation structure from the `console-docs-2` repository into the current HEAD branch of `netboxlabs-website-dochub`.

## Repository Context
- **Source Repository**: `https://github.com/netboxlabs/console-docs`
- **Target Repository**: `https://github.com/netboxlabs/netboxlabs-website-dochub`
- **Current Branch**: `feat/navigation-restructure-and-docs-enhancement`
- **Integration Date**: January 2025

## Key Enhancements in This Branch

### 1. Comprehensive AI Reference Structure
- **Location**: `ai-reference/` directory
- **Purpose**: Provides standardized templates, style guides, and reference materials for consistent documentation
- **Key Components**:
  - Style guides with enhanced frontmatter specifications
  - Document templates for features and landing pages
  - AI prompting guidelines for content generation
  - Content strategy and navigation guidelines

### 2. Enhanced Frontmatter System
All documentation now includes comprehensive metadata:
```yaml
---
tags: [netbox-cloud, netbox-enterprise, administration]
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

### 3. Updated NetBox Assurance Documentation
- **Location**: `docs/netbox-assurance/`
- **Status**: Recently merged from `prd-439/update-assurance-docs-for-cloud-enterprise`
- **Includes**: New workflow documentation, monitoring guides, and UI screenshots
- **Version**: Targets NetBox Cloud v1.10 and Enterprise v1.10

### 4. Improved Navigation Structure
- Enhanced MkDocs navigation in `mkdocs.yml`
- Clear separation of Cloud, Enterprise, and Community features
- Logical grouping of related documentation

## Integration Instructions

### Step 1: Repository Setup
```bash
# Clone the source repository
git clone https://github.com/netboxlabs/console-docs.git
cd console-docs
git checkout feat/navigation-restructure-and-docs-enhancement

# Prepare target repository
cd ../netboxlabs-website-dochub
git clone https://github.com/netboxlabs/netboxlabs-website-dochub.git netboxlabs-website-dochub
cd netboxlabs-website-dochub
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

#### B. Documentation Content Migration
1. **Frontmatter Conversion**:
   - Convert YAML frontmatter to Docusaurus format
   - Map version information to DocHub's versioning system
   - Preserve tag structure and metadata

2. **Content Structure**:
   - Maintain existing navigation hierarchy
   - Adapt image paths and internal links
   - Ensure proper categorization in DocHub

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
- **NetBox Cloud**: v1.9 (older docs) → v1.10 (updated docs)
- **NetBox Enterprise**: v1.9 (older docs) → v1.10 (updated docs)
- **NetBox Community**: Always v4.2
- **Discovery/Assurance**: v1.10 for premium features only

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

### Step 4: Quality Assurance

#### Pre-Integration Checklist
- [ ] All frontmatter follows DocHub schema
- [ ] Internal links are properly formatted
- [ ] Images and assets are accessible
- [ ] Navigation structure is logical
- [ ] Version filtering works correctly

#### Post-Integration Testing
- [ ] All pages render correctly
- [ ] Search functionality works
- [ ] Version-specific content displays properly
- [ ] Mobile responsiveness maintained
- [ ] Performance metrics acceptable

### Step 5: Deployment Considerations

#### Staging Environment
1. Deploy to staging environment first
2. Test all navigation paths
3. Verify search functionality
4. Check version filtering
5. Validate asset loading

#### Production Deployment
1. Coordinate with existing DocHub content
2. Implement proper redirects for changed URLs
3. Monitor for broken links
4. Ensure SEO metadata is preserved

## Key Files to Review

### Critical Configuration Files
- `mkdocs.yml` - Navigation and site configuration
- `ai-reference/style-guides/netbox-docs-style-guide.md` - Documentation standards
- `docs/tags.yml` - Tag definitions and mappings

### Template Files
- `ai-reference/templates/netbox-feature-doc-template.md`
- `ai-reference/templates/product-landing-page.md`

### Recently Updated Content
- `docs/netbox-assurance/index.md` - Major content update
- `docs/netbox-discovery/index.md` - Enhanced structure
- All files in `docs/netbox-assurance/` directory

## Success Criteria

### Functional Requirements
- All documentation content is accessible and properly formatted
- Version-specific content displays correctly
- Search functionality includes all new content
- Navigation is intuitive and maintains existing user paths

### Technical Requirements
- Page load times remain acceptable
- Mobile experience is optimized
- SEO metadata is preserved or improved
- Analytics tracking continues to function

### Content Quality
- All frontmatter is complete and accurate
- Internal links function correctly
- Images and media display properly
- Version information is current and accurate

## Support and Troubleshooting

### Common Issues
1. **Frontmatter Parsing Errors**: Check YAML syntax and required fields
2. **Broken Internal Links**: Update relative paths for new structure
3. **Missing Images**: Verify asset paths and file locations
4. **Version Filtering**: Ensure logic matches frontmatter versions

### Contact Information
For questions or issues during integration, refer to:
- AI Reference documentation in `ai-reference/README.md`
- Style guide in `ai-reference/style-guides/netbox-docs-style-guide.md`
- Original repository commit history for context

## Timeline Recommendations

### Phase 1 (Day 1-2): Setup and Analysis
- Repository setup and branch creation
- Content analysis and mapping
- Technical architecture planning

### Phase 2 (Day 3-4): Content Migration
- AI reference structure integration
- Documentation content conversion
- Asset migration and path updates

### Phase 3 (Day 5-6): Configuration and Testing
- Navigation structure implementation
- Version filtering setup
- Staging environment testing

### Phase 4 (Day 7): Deployment and Validation
- Production deployment
- Post-deployment testing
- Performance monitoring and optimization

---

**Note**: This integration represents a significant enhancement to the NetBox documentation structure. The AI reference materials and enhanced frontmatter system will provide a foundation for consistent, high-quality documentation moving forward. 