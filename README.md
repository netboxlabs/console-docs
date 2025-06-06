# NetBox Labs Documentation Hub

This repository creates a unified documentation site for NetBox Labs products, accessible at [https://netboxlabs.com/docs/](https://netboxlabs.com/docs/). It consolidates documentation from multiple repositories into a single, cohesive Docusaurus-powered site.

## 🏗️ Architecture Overview

This project implements a **unified documentation architecture** that brings together documentation from two primary sources:

### Documentation Sources

1. **NetBox Community Documentation**
   - **Source**: [`netbox-community/netbox`](https://github.com/netbox-community/netbox) repository (`docs/` directory)
   - **Local Path**: `external-repos/netbox/docs/`
   - **Output**: Transformed to `docs/netbox/`
   - **Format**: MkDocs → Docusaurus MDX

2. **NetBox Enterprise Documentation** 
   - **Source**: [`netboxlabs/console-docs`](https://github.com/netboxlabs/console-docs) repository
   - **Local Path**: `external-repos/console-docs/docs/`
   - **Output**: Transformed to `docs/console/`
   - **Format**: MkDocs → Docusaurus MDX

### Integration Flow

```
External Repos (MkDocs) → Git Submodules → Transformation Script → Docusaurus → Next.js Rewrites → netboxlabs.com/docs
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn (preferred package manager)
- Git

### Local Development Setup

1. **Clone with submodules**:
   ```bash
   git clone --recurse-submodules https://github.com/netboxlabs/netboxlabs-website-dochub.git
   cd netboxlabs-website-dochub
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```
   *Note: The `postinstall` script automatically initializes and updates git submodules*

3. **Start development server**:
   ```bash
   yarn dev
   ```
   This will:
   - Transform documentation from submodules
   - Start Docusaurus dev server on `http://localhost:3001`
   - Enable hot reloading for local changes

### Production Build

```bash
yarn build    # Creates static build in build/ directory
```

## 🔄 How the Transformation Works

The heart of this system is the **transformation pipeline** that converts MkDocs documentation to Docusaurus-compatible format:

### 1. Git Submodules
- `external-repos/console-docs` and `external-repos/netbox` are Git submodules
- Automatically updated via `postinstall` script
- Point to specific commits/branches of external repositories

### 2. Transformation Script (`scripts/transformDocs.ts`)

This TypeScript script performs several critical functions:

**Content Processing:**
- Converts MkDocs-specific markdown syntax to MDX
- Transforms Material for MkDocs admonitions (notes, warnings, etc.)
- Handles image references and file paths
- Escapes special characters for React/MDX compatibility
- Processes internal links and cross-references

**File Operations:**
- Recursively processes all markdown files
- Copies static assets (images, etc.) preserving directory structure
- Generates clean file structures in `docs/netbox/` and `docs/console/`

**Sidebar Generation:**
- Parses `mkdocs.yml` navigation structure
- Converts to Docusaurus sidebar format
- Outputs `sidebars/netbox.json` and `sidebars/console.json`
- Maintains hierarchical navigation structure

### 3. Docusaurus Integration
- Uses transformed MDX files from `docs/` directory
- Applies custom theme and styling from `src/theme/`
- Leverages generated sidebars for navigation
- Builds static site optimized for production

### 4. Next.js Integration
- Main NetBox Labs website (`netboxlabs.com`) uses URL rewrites
- Documentation served seamlessly under `/docs/*` path
- Provides unified user experience across all NetBox Labs properties

## 📁 Project Structure

```
netboxlabs-website-dochub/
├── docs/                          # 🎯 Transformed documentation (Docusaurus input)
│   ├── console/                   # Transformed NetBox Enterprise docs
│   └── netbox/                    # Transformed NetBox Community docs
├── external-repos/                # 📚 Git submodules (source documentation)
│   ├── console-docs/              # NetBox Enterprise docs submodule
│   │   └── docs/                  # Original MkDocs source
│   └── netbox/                    # NetBox Community docs submodule
│       └── docs/                  # Original MkDocs source
├── scripts/
│   └── transformDocs.ts           # 🔄 Core transformation logic
├── sidebars/                      # 🧭 Generated navigation
│   ├── console.json               # Console documentation sidebar
│   └── netbox.json                # NetBox documentation sidebar
├── src/
│   ├── css/                       # 🎨 Custom styles
│   ├── pages/                     # Custom Docusaurus pages
│   └── theme/                     # Theme customizations
├── static/                        # Static assets
├── docusaurus.config.ts           # ⚙️ Docusaurus configuration
├── sidebars.ts                    # Sidebar imports and setup
└── package.json                   # Dependencies and scripts
```

## 👥 For Contributors

### Contributing to External Documentation

If you're contributing to the **NetBox** or **Console Documentation** repositories:

#### NetBox Community Contributors
- **Repository**: [`netbox-community/netbox`](https://github.com/netbox-community/netbox)
- **Documentation Path**: `docs/` directory in the NetBox repo
- **Format**: Standard MkDocs markdown
- **Preview**: Changes appear in this unified site after submodule updates

#### NetBox Enterprise Contributors  
- **Repository**: [`netboxlabs/console-docs`](https://github.com/netboxlabs/console-docs)
- **Documentation Path**: Root `docs/` directory
- **Format**: MkDocs with Material theme extensions
- **Preview**: Changes appear in this unified site after submodule updates

#### Documentation Guidelines

**Supported MkDocs Features:**
- Standard markdown syntax
- Material for MkDocs admonitions (`!!! note`, `!!! warning`, etc.)
- Code blocks with syntax highlighting
- Images and static assets
- Internal linking
- Navigation via `mkdocs.yml`

**Limitations & Considerations:**
- Complex MkDocs plugins may not translate perfectly
- Custom HTML should be minimal and MDX-compatible
- Image paths are preserved but copied to unified structure
- Cross-references between NetBox/Console docs require careful path handling

### Testing Documentation Changes

#### For External Repo Contributors:
1. Make changes in your respective repository
2. Test locally in that repository first
3. Submit PR to the external repository

#### For Documentation Hub Maintainers:
1. **Update submodules** to pull latest changes:
   ```bash
   git submodule update --remote
   ```

2. **Test transformation**:
   ```bash
   yarn transform-docs  # Run transformation only
   yarn dev             # Full development workflow
   ```

3. **Review output** in `docs/netbox/` or `docs/console/`

4. **Commit submodule updates**:
   ```bash
   git add external-repos/
   git commit -m "Update documentation submodules"
   ```

## 🛠️ Development Workflows

### Daily Development

```bash
# Start development with fresh transformation
yarn dev

# Transform docs only (after external changes)
yarn transform-docs

# Build for production testing
yarn build
```

### Updating External Documentation

```bash
# Update all submodules to latest
git submodule update --remote

# Update specific submodule
cd external-repos/netbox
git pull origin main
cd ../..

# Commit submodule updates
git add external-repos/
git commit -m "Update NetBox docs to latest"
```

### Troubleshooting

**Common Issues:**

1. **Submodules not initialized**: Run `git submodule update --init --recursive`
2. **Transformation errors**: Check `scripts/transformDocs.ts` output for specific file issues
3. **Missing images**: Ensure image paths in source docs are relative and correct
4. **Sidebar not updating**: Delete and regenerate with `yarn transform-docs`

**Debug Mode:**
```bash
# Enable verbose transformation logging
DEBUG=true yarn transform-docs
```

## 🚀 Deployment

### Production Deployment
- Hosted via Vercel (or similar platform)  
- Automatic deployments on main branch changes
- Submodule updates trigger rebuilds
- Served under `netboxlabs.com/docs/` via Next.js rewrites

### Manual Deployment
```bash
yarn build
# Deploy contents of build/ directory to your hosting provider
```

## 📋 Key Commands Reference

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with transformation |
| `yarn build` | Build production site |
| `yarn transform-docs` | Run documentation transformation only |
| `yarn start` | Serve built site locally |
| `git submodule update --remote` | Update all submodules |
| `git submodule update --init --recursive` | Initialize submodules |

## 🤝 Contributing to This Repository

### Development Preferences
- **Package Manager**: Use Yarn (not npm) - no `package-lock.json` files
- **Language**: Prefer TypeScript over JavaScript for new code
- **Code Style**: Follow existing patterns in the codebase

### Making Changes
1. Fork this repository
2. Create feature branch: `git checkout -b feature/description`
3. Test changes locally: `yarn dev`
4. Update documentation if needed
5. Submit pull request

## 📞 Support

- **NetBox Community**: [NetBox Discussions](https://github.com/netbox-community/netbox/discussions)
- **NetBox Enterprise**: [NetBox Labs Support](https://netboxlabs.com/support/)
- **Documentation Issues**: Open issues in respective repositories
- **Site Issues**: Open issues in this repository

---

This unified documentation system ensures that all NetBox-related documentation is easily discoverable and accessible from a single location while maintaining the flexibility for teams to work in their preferred repositories and formats.
