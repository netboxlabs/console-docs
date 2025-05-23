This repository, `netboxlabs-website-combined`, creates a unified documentation site viewable at https://netboxlabs.com/docs. It achieves this by pulling documentation from two primary sources:

1.  **NetBox Community Documentation:** Content is sourced from the `docs` directory of the main NetBox open-source repository, located at `https://github.com/netbox-community/netbox/tree/main`. Within this project, these files are mirrored under `external-repos/netbox/docs/` and are then integrated into the main `docs/netbox/` directory after transformation.
2.  **NetBox Enterprise Documentation:** Commercial product documentation is sourced from the `https://github.com/netboxlabs/console-docs` repository. These files are mirrored under `external-repos/console-docs/docs/` and also integrated into the main `docs/console/` directory after transformation.

This setup allows for a centralized documentation experience for users, encompassing both the open-source NetBox project and NetBox Labs' commercial offerings.

**Key Processes:**
*   **Git Submodules:** The `external-repos/console-docs` and `external-repos/netbox` directories are Git submodules.
*   **Transformation Script (`scripts/transformDocs.ts`):** This script converts MkDocs-specific markdown to MDX-compatible syntax for Docusaurus. It also copies non-markdown files (like images) and generates Docusaurus sidebar configurations (`sidebars/console.json`, `sidebars/netbox.json`) from the `mkdocs.yml` files of the submodules.
*   **Docusaurus Build:** Docusaurus uses the transformed files in `docs/` and the generated sidebars to build the site.
*   **Next.js Rewrites:** The main NetBox Labs website (Next.js app at `https://netboxlabs.com`) uses URL rewrites to serve this Docusaurus documentation under `https://netboxlabs.com/docs/`.

**Development Preferences:**
*   **Package Management:** This project uses `yarn` for package management. Please ensure that no `package-lock.json` file is created; all dependencies should be managed through `yarn.lock`. The `postinstall` script automatically initializes and updates git submodules.
*   **Language Preference:** Where possible, TypeScript should be preferred over JavaScript for new code or when refactoring existing JavaScript code.
*   **Local Development:** Use `yarn dev` to start the local development server. This command also runs the transformation script. Changes in `external-repos/` require re-running `yarn dev` or at least `yarn transform-docs`.
*   **Building for Production:** Use `yarn build`.

**How to Use This Context with Cursor:**

When starting a new session or if Cursor seems to lack context about this repository, copy and paste the entire content of this file (`CURSOR_CONTEXT.md`) into the chat prompt. This will provide the AI assistant with a summary of the project structure, key processes, and development preferences. 