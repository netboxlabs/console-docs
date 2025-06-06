# Changelog

All notable changes to the NetBox Labs Documentation Hub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial changelog automation system with GitHub Actions workflow
- Support for conventional commit parsing and automatic categorization
- Integration with protected branch workflows via pull requests

### Infrastructure

- Added comprehensive automated documentation update system
- Implemented hourly submodule checking for NetBox and Console documentation
- Created auto-merge workflows with branch protection compatibility
- Added security vulnerability fixes for webpack-dev-server
- Enhanced README with comprehensive developer documentation

### Documentation

- Complete rewrite of README.md with developer-focused content
- Added architecture diagrams and contribution guidelines
- Created detailed setup instructions and troubleshooting guides
- Added project structure documentation with visual indicators

### Security

- Fixed 8 moderate security vulnerabilities in webpack-dev-server
- Updated all Docusaurus packages to latest secure versions
- Added resolutions to force secure dependency versions

## How to Use This Changelog

This changelog is automatically generated from commit history and pull requests. Here's how to contribute:

### For Contributors

When making changes, use conventional commit messages for automatic categorization:

- `feat:` for new features → **Added** section
- `fix:` for bug fixes → **Fixed** section  
- `docs:` for documentation → **Documentation** section
- `security:` for security fixes → **Security** section
- `refactor:`, `perf:`, `style:` for improvements → **Changed** section
- `build:`, `ci:`, `chore:` for infrastructure → **Infrastructure** section

### For Maintainers

The changelog is automatically updated when:

1. **New tags are pushed** - Creates a new version entry
2. **Manual trigger** - Updates unreleased section or specific version
3. **Pull requests are merged** - May trigger unreleased section updates

### Release Process

1. Ensure all changes are documented in the `[Unreleased]` section
2. Create and push a new version tag (e.g., `v1.0.0`)
3. The changelog workflow automatically creates a PR with the version entry
4. Review and merge the changelog PR
5. The version entry becomes part of the permanent changelog

### Manual Updates

For changes that don't fit the automatic categorization:

1. Edit the `[Unreleased]` section manually
2. Follow the Keep a Changelog format
3. Use the appropriate category: **Added**, **Changed**, **Deprecated**, **Removed**, **Fixed**, **Security**

---

*This changelog is automatically maintained by GitHub Actions. Last updated: Initial version* 