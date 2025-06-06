# CURSOR_CONTEXT.md

## Repository Overview

This repository (`console-docs`) contains the commercial/enterprise documentation for NetBox Labs' products and services. It serves as one component of the unified NetBox documentation ecosystem that powers the official documentation site at https://netboxlabs.com/docs.

## Documentation Architecture

The NetBox documentation ecosystem consists of multiple repositories that are combined to create a comprehensive documentation hub:

### Repository Structure
- **`netboxlabs/netbox`**: Contains the core NetBox open-source documentation (community docs)
- **`netboxlabs/console-docs`** (this repo): Contains commercial/enterprise product documentation
- **`netboxlabs/netboxlabs-website-dochub`**: The deployment/integration repository that combines both documentation sources

### Content Organization

This repository contains documentation for NetBox Labs' commercial offerings:

#### Core Sections
- **Administration Console/**: NetBox Cloud administration interface documentation
- **NetBox Cloud/**: Cloud-hosted NetBox service documentation  
- **netbox-enterprise/**: Enterprise edition features and configuration
- **netbox-assurance/**: Network assurance and monitoring capabilities
- **netbox-discovery/**: Automated network discovery features
- **netbox-extensions/**: Advanced features like branching, changes tracking, and diode
- **netbox-integrations/**: Third-party service integrations (ServiceNow, etc.)
- **cloud-connectivity/**: Cloud connectivity and networking documentation
- **sdks/**: Software development kits and API documentation

#### Supporting Content
- **images/**: Screenshots, diagrams, and visual assets organized by feature
- **stylesheets/**: Custom styling for documentation presentation

## Integration Process

The documentation deployment process works as follows:

1. **Content Sources**: 
   - Community docs from `netboxlabs/netbox` repository
   - Commercial docs from this repository (`netboxlabs/console-docs`)

2. **Integration Hub**: 
   - `netboxlabs/netboxlabs-website-dochub` repository combines both sources
   - Handles navigation structure, cross-references, and unified presentation

3. **Deployment**: 
   - Combined documentation is deployed to https://netboxlabs.com/docs
   - Provides seamless experience between community and commercial documentation

## Build & Deployment Pipeline

The `netboxlabs-website-dochub` repository handles the technical build and deployment process:

### Build Technology
- **Framework**: Uses Docusaurus for static site generation
- **Package Manager**: yarn for dependency management and build orchestration
- **Source Integration**: Combines content from both community and commercial documentation repositories

### Deployment Workflow
1. **Preview Environment**: Changes are previewed in Vercel before production deployment
2. **Production Pipeline**: Built site is pushed to production hosting
3. **Automatic Integration**: **(Unverified)** Merges to this repository should automatically trigger the production pipeline, but this process has not been fully verified yet

### Integration Status
- **Current State**: Manual verification may be required for production deployments
- **Intended Behavior**: Automatic merge-to-production workflow from this repository
- **Status**: Integration pipeline verification is pending

## Documentation Technology

- **Framework**: Built using MkDocs (configured in `mkdocs.yml`)
- **Content Format**: Markdown files with MkDocs extensions
- **Styling**: Custom CSS in `stylesheets/` directory
- **Assets**: Images and media files organized by feature/product

## Key Considerations for Development

### Content Strategy
- **Audience Separation**: Clear distinction between community (open-source) and commercial content
- **Feature Parity**: Commercial docs should complement, not duplicate, community documentation
- **Cross-References**: Links between community and commercial docs should work seamlessly

### File Organization
- Keep related images in corresponding subdirectories under `docs/images/`
- Maintain consistent naming conventions across features
- Organize content hierarchically to match product structure

### Integration Points
- Navigation structure must align with the combined documentation site
- Cross-references to community docs should use appropriate linking strategies
- Consider how content will appear in the unified search experience

## Development Workflow

When working on this repository:

1. **Local Development**: Use MkDocs for local preview and testing
2. **Content Changes**: Focus on commercial/enterprise features and capabilities
3. **Asset Management**: Ensure images are optimized and properly organized
4. **Integration Testing**: Consider how changes will appear in the combined documentation site
5. **Deployment Verification**: Monitor the automatic deployment process (when fully verified)

## Related Resources

- **Main Documentation Site**: https://netboxlabs.com/docs
- **NetBox Community Docs**: Part of the `netboxlabs/netbox` repository
- **Integration Repository**: `netboxlabs/netboxlabs-website-dochub`
- **NetBox GitHub**: https://github.com/netbox-community/netbox (referenced in web content)

## Purpose Statement

This repository ensures that NetBox Labs' commercial customers have comprehensive, well-organized documentation for enterprise features while maintaining the unified experience with community documentation that makes NetBox the premier network source of truth solution. 