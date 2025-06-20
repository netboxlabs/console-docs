# Navigation Structure Guidelines

## Overview
This document provides guidelines for organizing and structuring navigation across all NetBox documentation to ensure consistency and optimal user experience.

## Navigation Hierarchy Principles

### 1. User-Centric Organization
- **Primary navigation** should reflect user goals and workflows
- **Secondary navigation** should group related tasks and concepts
- **Tertiary navigation** should provide granular access to specific topics

### 2. Logical Grouping
- Group related content together
- Use clear, descriptive labels
- Maintain consistent terminology across sections
- Limit nesting to 3-4 levels maximum

### 3. Progressive Disclosure
- Start with overview/getting started content
- Progress from basic to advanced topics
- Provide clear entry points for different user types

## Standard Navigation Structure

### Product Documentation Structure
```
Product Name/
├── Overview (landing page)
├── Getting Started/
│   ├── Quick Start
│   ├── Installation
│   └── Basic Configuration
├── User Guide/
│   ├── Common Tasks
│   ├── Advanced Features
│   └── Best Practices
├── Administration/
│   ├── Configuration
│   ├── Security
│   └── Maintenance
├── Integration/
│   ├── API Reference
│   ├── Third-party Tools
│   └── Custom Development
├── Troubleshooting/
│   ├── Common Issues
│   ├── Error Messages
│   └── Support Resources
└── Reference/
    ├── Configuration Options
    ├── CLI Commands
    └── Changelog
```

### Multi-Product Navigation
For the unified documentation site:

1. **NetBox Community** (first)
2. **NetBox Cloud** (second)
3. **NetBox Enterprise** (third)
4. **Discovery & Assurance** (fourth)
5. **Integrations** (fifth)
6. **Extensions** (last)

## Navigation Labels

### Standard Labels
- **Overview**: Product or feature introduction
- **Getting Started**: Initial setup and basic usage
- **User Guide**: Detailed usage instructions
- **Administration**: System administration tasks
- **Configuration**: Settings and customization
- **Installation**: Setup procedures
- **Troubleshooting**: Problem resolution
- **Reference**: Technical specifications
- **API**: API documentation
- **Examples**: Code samples and use cases

### Label Guidelines
- Use consistent terminology across products
- Keep labels concise (1-3 words)
- Use sentence case (not title case)
- Avoid technical jargon in top-level labels
- Use verbs for action-oriented content

## Content Organization Patterns

### Feature Documentation
```
Feature Name/
├── Overview
├── Prerequisites
├── Configuration
├── Usage Guide
├── API Reference
├── Examples
├── Troubleshooting
└── Related Features
```

### Integration Documentation
```
Integration Name/
├── Overview
├── Installation
├── Configuration
├── Usage Examples
├── API Reference
├── Troubleshooting
└── FAQ
```

### Administration Documentation
```
Administration Topic/
├── Overview
├── Prerequisites
├── Step-by-step Guide
├── Configuration Options
├── Security Considerations
├── Troubleshooting
└── Best Practices
```

## Navigation Metadata

### Frontmatter for Navigation
```yaml
---
nav_order: 10          # Controls ordering within section
nav_parent: "User Guide" # Parent section
nav_exclude: false     # Hide from navigation
nav_section: "Getting Started" # Section grouping
sidebar_position: 2    # Docusaurus sidebar position
---
```

### Navigation Tags
Use tags to enable cross-cutting navigation:
- `getting-started`: Entry-level content
- `advanced`: Advanced user content
- `admin`: Administrative content
- `api`: API-related content
- `troubleshooting`: Problem resolution

## Responsive Navigation

### Mobile Considerations
- Limit top-level sections to 6-8 items
- Use collapsible sections for deep hierarchies
- Provide search functionality
- Include breadcrumb navigation

### Desktop Optimization
- Show 2-3 levels of navigation simultaneously
- Use hover states for preview
- Provide quick access to frequently used sections
- Include contextual navigation aids

## Search Integration

### Search-Friendly Structure
- Use descriptive headings that match search queries
- Include synonyms and alternative terms
- Provide clear content descriptions
- Tag content appropriately for filtering

### Search Enhancement
- Include "Popular" or "Recommended" sections
- Provide guided navigation for new users
- Use progressive disclosure for complex topics
- Enable filtering by product, audience, or complexity

## Cross-References and Linking

### Internal Linking Strategy
- Link to related content within sections
- Provide "See also" sections
- Use contextual inline links
- Include navigation aids (next/previous)

### External Linking
- Clearly mark external links
- Provide context for external resources
- Use appropriate link text
- Consider link maintenance

## Version-Specific Navigation

### Version Handling
- Show version-specific content appropriately
- Provide clear version indicators
- Enable easy switching between versions
- Maintain consistent navigation across versions

### Content Filtering
- Filter by product edition (Community, Cloud, Enterprise)
- Filter by feature availability
- Show/hide based on user permissions
- Provide clear indicators for filtered content

## Accessibility Guidelines

### Navigation Accessibility
- Use semantic HTML for navigation elements
- Provide keyboard navigation support
- Include skip links for screen readers
- Use appropriate ARIA labels
- Ensure sufficient color contrast

### Content Structure
- Use proper heading hierarchy (H1 → H2 → H3)
- Provide alternative text for images
- Use descriptive link text
- Include page titles and descriptions

## Maintenance and Updates

### Regular Review
- Review navigation structure quarterly
- Update based on user feedback
- Monitor analytics for navigation patterns
- Test with new users regularly

### Content Updates
- Update navigation when adding new content
- Maintain consistency across related sections
- Archive or redirect outdated content
- Update cross-references when moving content

## Implementation Notes

### Docusaurus Specific
- Use `sidebars.ts` for main navigation structure
- Leverage `docusaurus.config.ts` for global navigation
- Use categories for grouping related content
- Implement custom navigation components as needed

### MkDocs Integration
- Map MkDocs navigation to Docusaurus structure
- Preserve existing URL patterns where possible
- Handle navigation differences between platforms
- Maintain backward compatibility

---

This navigation structure ensures consistent, user-friendly access to all NetBox documentation while supporting the enhanced frontmatter system and version management capabilities. 