# Dochub Integration and Coordination Reference

This document consolidates information from DOCHUB_COORDINATION_SPEC.md and DOCHUB_INTEGRATION_REQUIREMENTS.md for AI reference.

## Integration Overview

The console-docs repository integrates with the netboxlabs-website-dochub system to publish documentation to https://netboxlabs.com/docs/console/. This integration requires specific formatting, structure, and coordination.

## Technical Requirements

### File Structure
- All publishable content must be in the `docs/` directory
- Use proper directory structure matching navigation hierarchy
- Maintain consistent file naming conventions
- Include proper frontmatter in all documents

### Frontmatter Requirements
```yaml
---
tags:
  - netbox-cloud
  - netbox-enterprise
  - netbox-community
title: "Document Title"
description: "SEO-friendly description"
---
```

### Content Standards
- All content must use YAML frontmatter tags (not HTML pills)
- Proper heading hierarchy (H1 → H2 → H3)
- Valid markdown syntax
- Working internal and external links
- Accessible image alt text

## Navigation Integration

### MkDocs Configuration
- Navigation structure defined in `mkdocs.yml`
- Must align with dochub navigation expectations
- Support for nested navigation hierarchies
- Proper section organization (Cloud, Enterprise, Extensions)

### URL Structure
- Clean URLs without file extensions
- Consistent path structure
- Proper redirects for moved content
- SEO-friendly URL patterns

## Build Process

### Validation Pipeline
1. **Syntax Validation**: Markdown and YAML syntax checking
2. **Link Validation**: Internal and external link verification
3. **Image Validation**: Image accessibility and loading
4. **Tag Validation**: Product tag consistency and accuracy
5. **Content Validation**: Style guide compliance

### Deployment Process
1. **Staging Environment**: Test all changes before production
2. **Content Review**: Ensure accuracy and completeness
3. **Integration Testing**: Verify dochub integration works
4. **Production Deployment**: Automated deployment to live site

## Content Categorization

### Product-Specific Content
- **NetBox Cloud**: Cloud-specific features and administration
- **NetBox Enterprise**: Enterprise installation and features
- **NetBox Community**: Open source features and community tools
- **Universal**: Features available across all editions

### Content Types
- **Feature Documentation**: Product capabilities and usage
- **Integration Guides**: Setup and configuration instructions
- **Administration**: Management and operational procedures
- **Getting Started**: Onboarding and quickstart content

## Quality Assurance

### Content Standards
- Accurate technical information
- Up-to-date screenshots and examples
- Working code examples
- Proper product naming and terminology
- Consistent voice and tone

### Review Process
- Technical accuracy review
- Editorial review for clarity and style
- Product tag validation
- Link and image verification
- Cross-reference validation

## Branch Strategy

### Development Workflow
- **Feature branches**: For specific documentation updates
- **Main branch**: Stable, production-ready content
- **Staging integration**: Test dochub integration before merge
- **Version control**: Track changes and maintain history

### Coordination Requirements
- Coordinate with website team for major changes
- Test integration in staging environment
- Validate navigation and URL structure
- Ensure proper content categorization

## Image and Asset Management

### Image Requirements
- Store images in `docs/images/[feature-name]/` directories
- Use descriptive filenames
- Provide proper alt text for accessibility
- Optimize for web performance
- Maintain current screenshots

### Asset Organization
- Logical directory structure
- Consistent naming conventions
- Version control for assets
- Proper file formats (PNG, JPG, SVG)

## SEO and Metadata

### SEO Requirements
- Descriptive page titles
- Meta descriptions in frontmatter
- Proper heading hierarchy
- Internal linking strategy
- Keyword optimization

### Social Sharing
- Open Graph metadata
- Twitter Card support
- Social media-friendly descriptions
- Proper image sharing tags

## Integration Testing

### Pre-Deployment Checklist
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Navigation structure is correct
- [ ] Product tags are accurate
- [ ] Content renders properly
- [ ] Mobile responsiveness
- [ ] Search functionality
- [ ] Cross-browser compatibility

### Post-Deployment Validation
- [ ] Live site functionality
- [ ] Search indexing
- [ ] Analytics tracking
- [ ] Error monitoring
- [ ] Performance metrics

## Troubleshooting Common Issues

### Build Failures
- **Invalid YAML**: Check frontmatter syntax
- **Broken Links**: Verify internal and external links
- **Missing Images**: Ensure proper image paths
- **Tag Errors**: Validate product tag usage

### Integration Issues
- **Navigation Problems**: Check mkdocs.yml structure
- **URL Issues**: Verify path consistency
- **Content Missing**: Ensure proper file placement
- **Styling Problems**: Check markdown formatting

## Coordination Protocols

### Communication Requirements
- Notify website team of major structural changes
- Coordinate navigation updates
- Plan content releases
- Manage breaking changes

### Change Management
- Document all significant changes
- Test integration thoroughly
- Maintain backward compatibility
- Plan migration strategies

## Future Considerations

### Planned Enhancements
- Enhanced search capabilities
- Improved mobile experience
- Better content discovery
- Advanced filtering options

### Scalability
- Support for growing content volume
- Improved build performance
- Better asset management
- Enhanced collaboration tools

## AI Tool Integration

### Context for AI Tools
- This directory (`ai-reference/`) is not published to dochub
- Use for development and AI assistance only
- Contains templates, style guides, and reference materials
- Provides context for consistent content generation

### Best Practices
- Reference style guides for consistency
- Use templates for new content
- Validate against integration requirements
- Test locally before committing

---

*This coordination document ensures smooth integration between console-docs development and the dochub publishing system, maintaining quality and consistency across all NetBox documentation.* 