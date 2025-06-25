# NetBox Documentation Style Guide

## Overview
This style guide ensures consistency across all NetBox documentation, including Community, Cloud, Enterprise, and plugin documentation.

## Enhanced Frontmatter System

### Standard Frontmatter Template
```yaml
---
tags: [product-tags, feature-tags, category-tags]
title: "Clear, Descriptive Title"
author: "NetBox Labs"
last_updated: "YYYY-MM-DD"
versions:
  netbox_cloud: "v1.10"
  netbox_enterprise: "v1.10" 
  netbox_community: "v4.2"
status: "current"  # current, deprecated, beta, alpha
description: "Brief, SEO-friendly description"
category: "administration"  # See categories below
audience: "administrators"  # administrators, developers, end-users
complexity: "intermediate"  # beginner, intermediate, advanced
---
```

### Required Fields
- **tags**: Array of relevant tags for filtering and categorization
- **title**: Human-readable page title
- **author**: Always "NetBox Labs" for consistency
- **last_updated**: ISO date format (YYYY-MM-DD)
- **versions**: Version compatibility information
- **status**: Document lifecycle status
- **description**: Brief description for SEO and previews

### Optional Fields
- **category**: Content categorization
- **audience**: Target audience
- **complexity**: Technical complexity level

## Content Categories

### Primary Categories
- **administration**: System administration and configuration
- **development**: Developer guides and API documentation
- **features**: Feature documentation and usage guides
- **installation**: Installation and setup procedures
- **troubleshooting**: Problem resolution guides
- **integrations**: Third-party integrations and SDKs
- **reference**: Reference materials and specifications

### Audience Types
- **administrators**: System administrators and IT professionals
- **developers**: Software developers and integrators
- **end-users**: Regular NetBox users
- **decision-makers**: Management and procurement

### Complexity Levels
- **beginner**: Requires minimal technical knowledge
- **intermediate**: Requires basic technical familiarity
- **advanced**: Requires specialized technical expertise

## Version Management

### Version Specification Format
```yaml
versions:
  netbox_cloud: "v1.10"        # NetBox Cloud version compatibility
  netbox_enterprise: "v1.10"  # NetBox Enterprise version compatibility
  netbox_community: "v4.2"    # NetBox Community version compatibility
```

### Version Status Values
- **current**: Currently supported and maintained
- **deprecated**: Deprecated but still functional
- **beta**: In beta testing phase
- **alpha**: In alpha development phase
- **archived**: Historical reference only

## Tag Guidelines

### Product Tags
- `netbox-cloud`: NetBox Cloud specific content
- `netbox-enterprise`: NetBox Enterprise specific content
- `netbox-community`: NetBox Community specific content
- `netbox-discovery`: NetBox Discovery related content
- `netbox-assurance`: NetBox Assurance related content

### Feature Tags
- `api`: API related content
- `authentication`: Authentication and authorization
- `automation`: Automation and scripting
- `backup`: Backup and recovery
- `configuration`: Configuration management
- `integrations`: Third-party integrations
- `monitoring`: Monitoring and alerting
- `networking`: Networking features
- `security`: Security features
- `ui`: User interface related content

### Category Tags
- `administration`: Administrative tasks
- `development`: Development and customization
- `installation`: Installation procedures
- `troubleshooting`: Problem resolution
- `reference`: Reference materials

## Content Structure Guidelines

### Page Structure
1. **Frontmatter** (required)
2. **Product Pills** (for multi-product features)
3. **Introduction** (brief overview)
4. **Prerequisites** (if applicable)
5. **Main Content** (structured with headers)
6. **Related Links** (if applicable)
7. **Support Information**

### Product Pills
Use HTML spans to indicate product availability:
```html
<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>
```

### Header Hierarchy
- **H1**: Page title (one per page)
- **H2**: Major sections
- **H3**: Subsections
- **H4**: Sub-subsections (use sparingly)

### Code Examples
- Use appropriate language tags for syntax highlighting
- Include complete, runnable examples
- Provide context and explanation
- Use consistent naming conventions

### Screenshots and Images
- Use descriptive alt text
- Optimize for web (reasonable file sizes)
- Use consistent styling and UI elements
- Update regularly to reflect current UI

## Writing Style

### Tone and Voice
- **Professional but approachable**: Clear, helpful, and authoritative
- **Active voice**: "Configure the setting" vs "The setting should be configured"
- **Present tense**: "NetBox displays the results" vs "NetBox will display"
- **Direct address**: "You can configure" vs "Users can configure"

### Terminology
- **Consistent naming**: Use official product names and feature names
- **Avoid jargon**: Explain technical terms when first introduced
- **Standard spellings**: NetBox (not Netbox), API (not api)

### Formatting
- **Bold**: For UI elements, important concepts, and emphasis
- **Italic**: For file paths, variable names, and emphasis
- **Code**: For code examples, commands, and configuration values
- **Lists**: For sequential steps and multiple items

## Quality Standards

### Content Requirements
- **Accuracy**: All information must be current and correct
- **Completeness**: Cover all necessary steps and information
- **Clarity**: Easy to understand and follow
- **Consistency**: Follow established patterns and conventions

### Review Checklist
- [ ] Frontmatter complete and accurate
- [ ] Product pills correctly applied
- [ ] Version compatibility verified
- [ ] Screenshots current and relevant
- [ ] Code examples tested and working
- [ ] Links functional and appropriate
- [ ] Grammar and spelling checked
- [ ] Style guide compliance verified

## Integration with DocHub

### Docusaurus Compatibility
- Frontmatter will be converted to Docusaurus format during transformation
- Product pills will be processed by custom CSS
- Navigation structure will be maintained through sidebar generation
- Version information will be used for content filtering

### SEO Considerations
- Use descriptive titles and descriptions
- Include relevant tags for discoverability
- Maintain consistent URL structures
- Optimize images with alt text

## Maintenance Guidelines

### Regular Updates
- Review and update version compatibility quarterly
- Refresh screenshots with UI changes
- Validate links and code examples regularly
- Update frontmatter dates when content changes

### Deprecation Process
1. Update status to "deprecated"
2. Add deprecation notice to content
3. Maintain for one major version cycle
4. Archive or remove after sufficient notice

---

This style guide ensures consistent, high-quality documentation across all NetBox products and maintains compatibility with the DocHub integration system. 