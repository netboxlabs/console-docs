---
tags:
  - ai-reference
  - cloud
  - enterprise
  - community
  - documentation
  - tagging
  - development
title: 'AI Reference Materials'
description: 'Reference materials, templates, and documentation resources for AI-assisted NetBox Labs documentation development'
author: 'NetBox Labs Documentation Team'
category: 'ai-reference'
audience: 'developers'
complexity: 'intermediate'
sidebar_position: 999
internal_only: true
draft: true
---

:::info Development Resource
This content is synced from console-docs/ai-reference for development team use.
**This directory is not published to dochub** and is intended for internal development use only.
:::

# NetBox Documentation System - Reference Guide

This directory contains reference materials, style guides, and documentation standards for the NetBox documentation system that publishes to [netboxlabs.com/docs](https://netboxlabs.com/docs).

## How the Documentation System Works

### Architecture Overview

The NetBox documentation system uses a multi-repository approach with automated synchronization:

```
Source Repositories (External)
├── netbox-community/netbox      → docs/netbox/
├── netboxlabs/console-docs      → docs/console/
├── netboxlabs/diode             → docs/console/extensions/diode/
├── netboxlabs/pynetbox          → docs/console/sdks/pynetbox/
├── netboxlabs/diode-sdk-python  → docs/console/sdks/diode-sdk-python/
├── netboxlabs/diode-sdk-go      → docs/console/sdks/diode-sdk-go/
└── netboxlabs/netbox-branching  → docs/console/netbox-extensions/branching/

                    ↓
            This Repository
    (netboxlabs/netboxlabs-website-dochub)
                    ↓
            Vercel Deployment
                    ↓
        https://netboxlabs.com/docs
```

### Key Components

- **Docusaurus v2**: Static site generator that builds the documentation
- **Git Submodules**: External documentation sources are included as submodules
- **Automated Workflows**: GitHub Actions automatically sync external changes
- **Vercel**: Handles deployment and hosting with CDN distribution

## Contributing Documentation

### Where to Write Documentation

**Important**: Do not write documentation directly in this repository. Documentation should be written in the appropriate source repository:

| Content Type            | Source Repository                                                             | Published Path                               |
| ----------------------- | ----------------------------------------------------------------------------- | -------------------------------------------- |
| NetBox Community        | [netbox-community/netbox](https://github.com/netbox-community/netbox)         | `/docs/netbox/`                              |
| NetBox Enterprise/Cloud | [netboxlabs/console-docs](https://github.com/netboxlabs/console-docs)         | `/docs/console/`                             |
| NetBox Diode            | [netboxlabs/diode](https://github.com/netboxlabs/diode)                       | `/docs/console/extensions/diode/`            |
| PyNetBox SDK            | [netboxlabs/pynetbox](https://github.com/netboxlabs/pynetbox)                 | `/docs/console/sdks/pynetbox/`               |
| Diode SDK Python        | [netboxlabs/diode-sdk-python](https://github.com/netboxlabs/diode-sdk-python) | `/docs/console/sdks/diode-sdk-python/`       |
| Diode SDK Go            | [netboxlabs/diode-sdk-go](https://github.com/netboxlabs/diode-sdk-go)         | `/docs/console/sdks/diode-sdk-go/`           |
| NetBox Branching        | [netboxlabs/netbox-branching](https://github.com/netboxlabs/netbox-branching) | `/docs/console/netbox-extensions/branching/` |

### Contribution Workflow

1. **Identify the correct source repository** from the table above
2. **Clone and work in that repository**:
   ```bash
   git clone https://github.com/netboxlabs/console-docs.git
   cd console-docs
   # Make your changes
   git add .
   git commit -m "Update documentation"
   git push
   ```
3. **Submit a pull request** to the source repository
4. **Documentation automatically appears** on netboxlabs.com/docs within hours

### Automated Synchronization

This repository automatically pulls changes from source repositories using:

- **Scheduled updates**: Every 2 hours via GitHub Actions
- **Manual triggers**: Can be run on-demand
- **Submodule management**: Handles version tracking and conflicts

## Development and Testing

### Local Development

```bash
# Clone this repository
git clone https://github.com/netboxlabs/netboxlabs-website-dochub.git
cd netboxlabs-website-dochub

# Install dependencies
yarn install

# Update external documentation
yarn update-submodules

# Start development server
yarn dev
```

The development server runs at `http://localhost:3000` and includes:

- Live reload for local changes
- Hot module replacement
- Link validation
- Build error reporting

### Available Commands

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn serve            # Serve built site locally

# Content Management
yarn update-submodules    # Sync external documentation
yarn transform-docs      # Process and transform content
yarn enhanced-tag        # Apply semantic tags
yarn update-dates        # Update last modified dates

# Quality Assurance
yarn typecheck          # TypeScript validation
yarn seo-audit          # SEO performance check
yarn clear              # Clear build cache
```

### SDK Documentation Processing

The system includes special handling for SDK repositories that contain README files instead of full documentation directories:

**SDK Repository Types:**

- **PyNetBox**: Uses MkDocs structure with `docs/` directory
- **Diode SDK Python**: Uses README.md in repository root
- **Diode SDK Go**: Uses README.md in repository root

**Transformation Process:**

1. **Content Detection**: Automatically identifies SDK repositories
2. **README Processing**: Transforms README.md files into Docusaurus format
3. **Sidebar Integration**: Adds SDK documentation to console sidebar under "SDKs" section
4. **Semantic Tagging**: Applies appropriate tags for SDK content
5. **Navigation Generation**: Creates clean URLs like `/docs/console/sdks/diode-sdk-python/`

**Special Handling:**

- SDK repositories don't require `mkdocs.yml` files
- README files are processed as main documentation pages
- Automatic tagging with `sdk`, `python`, `go`, and `api-client` tags
- Integration with existing PyNetBox documentation structure

## Deployment and Hosting

### Vercel Integration

The documentation is automatically deployed to production using Vercel:

- **Production URL**: https://netboxlabs.com/docs
- **Preview deployments**: Generated for all pull requests
- **Branch deployments**: Feature branches get temporary URLs
- **Build time**: Typically 2-3 minutes
- **Global CDN**: Content distributed via Vercel Edge Network

### Deployment Process

1. **Code changes** pushed to `main` branch
2. **Vercel detects changes** and starts build
3. **Docusaurus builds** the static site
4. **Content transformation** processes external documentation
5. **Deployment** to production with automatic cache invalidation

### Environment Configuration

Production builds use environment-specific settings:

- `VERCEL_ENV=production` enables production optimizations
- `baseUrl` is set to `/docs/` for netboxlabs.com integration
- External asset URLs are redirected appropriately

## ai-reference Directory Contents

This directory contains internal resources for documentation contributors:

### Style Guides

- **`netbox-docs-style-guide.md`**: Comprehensive writing standards and formatting rules
- **`ai-prompting-guide.md`**: Guidelines for AI-assisted documentation writing
- **`example-prompts.md`**: Ready-to-use prompts for common documentation tasks

### Templates

- **`page-layout-examples.md`**: Standard page structures and formatting examples

### Reference Materials

- **`seo-optimization-guide.md`**: SEO best practices and optimization techniques
- **`deployment-guide.md`**: Detailed deployment procedures and troubleshooting

### Content Strategy

- **`page-creation-guide.md`**: Guidelines for creating new documentation pages

### Distribution

- **`DISTRIBUTION_URLS.md`**: Direct access URLs for files and resources
- **`QUICK_REFERENCE.md`**: Quick lookup for common tasks and commands

## Documentation Standards

### Writing Guidelines

Follow these principles for all documentation:

**Professional Technical Writing**

- Write for network engineers and system administrators
- Use clear, concise language
- Include practical examples and code snippets
- Test all procedures before publishing

**Avoid AI-Generated Patterns**

- No emojis in public documentation
- No excessive use of words like "seamless" or "robust"
- No overwrought introductory paragraphs
- Focus on accuracy and utility over style

**Structure and Organization**

- Use consistent heading hierarchies
- Include table of contents for long documents
- Provide cross-references between related topics
- Maintain logical information flow

### Content Tagging System

Documentation uses semantic tags for organization:

**Edition Tags** (for feature availability):

- `cloud` - NetBox Cloud features
- `enterprise` - NetBox Enterprise features
- `community` - Open source features

**Product Tags** (for product classification):

- `netbox` - Core NetBox functionality
- `discovery` - Network discovery features
- `assurance` - Network monitoring capabilities

**Semantic Tags** (for content categorization):

- `authentication`, `installation`, `configuration`
- `troubleshooting`, `api`, `automation`
- `security`, `backup`, `migration`

## Official Documentation Strategy Documents

### Strategic Planning Resources

- **[Docs Site Structure](https://docs.google.com/document/d/1S1myF5S7BS2foTqo4-XP4bW-eDBU7mZmrx8P1526DFY/edit?usp=sharing)** - Comprehensive site structure planning and organization strategy (last updated May 15, 2025)
- **[RFC: NetBoxLabs Docs Reorganization](https://docs.google.com/document/d/12kH5sMTcHw6qE4n6BbbIXQ498RBMN1Bb19O6p6-N2dw/edit?usp=sharing)** - Strategic documentation reorganization and improvement plan (last updated May 23, 2025)
- **[RFC: Writing Docs with AI](https://docs.google.com/document/d/1KZtnMvyNsIGEWrHqCVD54AoiPmgnW7ALKMtYFdON-Wg/edit?usp=sharing)** - Guidelines for AI-assisted documentation to maintain professional quality (last updated July 3, 2025)

These documents provide the strategic foundation for NetBox documentation architecture, content organization, and quality standards.

## Troubleshooting

### Common Issues

**Build Failures**

```bash
# Clear cache and rebuild
yarn clear
yarn build
```

**Submodule Conflicts**

```bash
# Reset submodules
git submodule update --init --recursive
yarn update-submodules
```

**Development Server Issues**

```bash
# Kill conflicting processes
pkill -f "yarn dev"
rm -rf .docusaurus
yarn dev
```

### Getting Help

- **General Questions**: Check existing documentation in this directory
- **Technical Issues**: Review recent commit history for similar problems
- **Bug Reports**: Open an issue with detailed reproduction steps
- **Feature Requests**: Discuss in the appropriate source repository

## System Monitoring

The documentation system includes automated monitoring for:

- **Build success rates**: Tracked via GitHub Actions
- **Deployment health**: Monitored by Vercel
- **Content freshness**: Automated submodule updates
- **Link validity**: Checked during builds
- **SEO performance**: Regular audits available

---

**For more detailed information**, refer to the specific files in the subdirectories of this `ai-reference` folder. This system is designed to maintain high-quality, accurate documentation while streamlining the contribution process for all NetBox documentation.
