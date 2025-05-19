# NetBox Labs Documentation Hub

This repository contains the Docusaurus v3 site for the NetBox Labs documentation, accessible at [https://netboxlabs.com/docs/](https://netboxlabs.com/docs/) (via Next.js rewrites from the main website to this dedicated Docusaurus instance).

## Project Overview

The primary function of this site is to consolidate and present documentation from two main external sources:

1.  **NetBox**: Documentation for the core NetBox product.
2.  **NetBox Console**: Documentation for the NetBox Cloud console.

These documentation sets are originally written in MkDocs format and reside in their respective repositories. This Docusaurus project uses Git submodules to pull in these external docs and then transforms them into a Docusaurus-compatible format.

## How it Works

The documentation aggregation and transformation process involves several key steps:

1.  **Git Submodules**: The `external-repos/console-docs` and `external-repos/netbox` directories are Git submodules pointing to the respective external documentation repositories. The `postinstall` script (`git submodule update --init --recursive`) ensures these are fetched and updated.

2.  **Transformation Script (`scripts/transformDocs.ts`)**: This TypeScript script is the core of the documentation processing. It performs the following actions for each external repository:
    *   **Reads MkDocs Files**: Recursively traverses the `docs/` folder within each submodule (e.g., `external-repos/netbox/docs`).
    *   **Transforms Markdown**: Applies a series of rules to convert MkDocs-specific markdown syntax (like material icons, specific admonition styles, image formatting) to MDX-compatible syntax suitable for Docusaurus. This includes escaping certain characters and restructuring elements.
    *   **Copies Transformed Files**: Saves the transformed markdown files into the corresponding Docusaurus content directory (e.g., `docs/netbox/`, `docs/console/`). Non-markdown files (like images) are copied directly.
    *   **Generates Sidebars**: Reads the `mkdocs.yml` file from each submodule to understand its navigation structure. It then converts this MkDocs navigation into a Docusaurus sidebar configuration file (e.g., `sidebars/netbox.json`, `sidebars/console.json`), which defines the menu structure for that section of the documentation.

3.  **Docusaurus Build**: Docusaurus then uses the transformed markdown files in the `docs/` directory and the generated sidebar configurations in `sidebars/` to build the static documentation site.

4.  **Next.js Rewrites**: The main NetBox Labs website, which is a Next.js application hosted at `https://netboxlabs.com`, is configured with URL rewrites. This Docusaurus documentation site operates as a standalone application (e.g., on its own port or internal service). The Next.js application acts as a reverse proxy for any requests to paths starting with `/docs/*`. It fetches the content from this Docusaurus instance and serves it under the `https://netboxlabs.com/docs/` path. This provides a seamless user experience, making the documentation appear as an integrated part of the main website without requiring the Docusaurus site to be a sub-application of the Next.js project directly.

## Key Directory Structure

```
.
├── docs/                     # Transformed Docusaurus-ready documentation files
│   ├── console/              # Transformed console documentation
│   └── netbox/               # Transformed NetBox documentation
├── external-repos/           # Git submodules for external documentation
│   ├── console-docs/         # Submodule for console documentation source
│   └── netbox/               # Submodule for NetBox documentation source
├── scripts/
│   └── transformDocs.ts      # Core script for transforming MkDocs to Docusaurus format
├── sidebars/
│   ├── console.json          # Generated Docusaurus sidebar for console docs
│   └── netbox.json           # Generated Docusaurus sidebar for NetBox docs
├── src/
│   ├── css/                  # Custom CSS and SCSS styles
│   ├── pages/                # Custom Docusaurus pages
│   └── theme/                # Docusaurus theme customizations (swizzled components)
├── docusaurus.config.js      # Main Docusaurus configuration file
├── package.json              # Project dependencies and scripts
└── yarn.lock                 # Yarn lockfile
```

## Setup Instructions

To set up and run this project locally:

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Initialise Submodules**:
    If you cloned without `--recurse-submodules`, or if they are not yet initialised:
    ```bash
    git submodule update --init --recursive
    ```
    This command is also run automatically during `yarn install` due to the `postinstall` script in `package.json`.

3.  **Install Dependencies**:
    This project uses Yarn as the package manager.
    ```bash
    yarn install
    ```

## Development Workflow

To start the local development server:

```bash
yarn dev
```

This command performs the following actions:

1.  `npm run fetch-options`: (Note: As per instructions, this part's specifics are not the focus, but it runs as part of the dev script).
2.  `npm run transform-docs`: Executes the `scripts/transformDocs.ts` script to process and copy documentation from the submodules.
3.  `docusaurus start --port 3001`: Starts the Docusaurus development server, typically accessible at `http://localhost:3001`.

Any changes made to the source markdown files in the `external-repos/` submodules will require re-running `yarn dev` (or at least `yarn transform-docs` and restarting the server if it doesn't pick up changes automatically) to see the updates reflected in the Docusaurus site.

## Build Process

To generate a static build of the documentation site for production:

```bash
yarn build
```

This command performs the following actions:

1.  `npm run fetch-options`.
2.  `npm run transform-docs`: Ensures all documentation is transformed and up-to-date.
3.  `docusaurus build`: Creates the static site in the `build/` directory.

The contents of the `build/` directory can then be deployed to a static hosting service.

## Production URL

The live documentation is served under [https://netboxlabs.com/docs/](https://netboxlabs.com/docs/).
