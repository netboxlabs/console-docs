# Documentation Hub

A centralised documentation hub built using [Docusaurus](https://docusaurus.io/) that aggregates documentation from multiple repositories.

## Features

- Aggregate documentation from multiple repositories
- Automatic synchronisation of external documentation
- Consistent navigation and search across all docs
- Customisable sidebar organisation
- Edit links that point to the source repository

## Setup

1. Install dependencies:
   ```bash
   yarn
   ```

2. Configure external documentation sources:
   - Open `remote-content.config.js`
   - Add your repository configurations:
     ```javascript
     sources: [
       {
         name: 'repo-name',
         source: {
           type: 'git',
           url: 'https://github.com/org/repo.git',
           branch: 'main',
           dir: 'docs'
         },
         target: 'docs/repo-name',
         include: ['**/*.md', '**/*.mdx']
       }
     ]
     ```

3. Update `docusaurus.config.ts`:
   - Add repository information to the `externalDocs` array
   - Customise the navigation and other site settings

## Development

```bash
# Start development server
yarn start

# Build for production
yarn build

# Serve production build locally
yarn serve
```

## Adding New Documentation Sources

1. Add the repository configuration to `remote-content.config.js`
2. Add repository information to `externalDocs` in `docusaurus.config.ts`
3. Update the sidebar configuration in `sidebars.ts` if needed
4. Restart the development server

## Deployment

The site can be deployed to any static hosting service:

```bash
# Build the site
yarn build

# Deploy to GitHub Pages
GIT_USER=<username> yarn deploy
```
