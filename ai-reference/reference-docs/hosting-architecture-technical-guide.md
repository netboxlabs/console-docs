---
title: 'Hosting Architecture Technical Guide'
description: 'Technical deep-dive into the complex hosting architecture affecting URL behavior across environments'
tags:
  - hosting
  - architecture
  - vercel
  - docusaurus
  - urls
  - redirects
author: 'NetBox Labs Documentation Team'
last_updated: '2025-01-02'
category: 'ai-reference'
audience: 'developers'
complexity: 'advanced'
internal_only: true
draft: true
---

# Hosting Architecture Technical Guide

This technical guide provides comprehensive details about the complex hosting architecture that affects how URLs work across different environments. This information is essential for developers working on the documentation system.

## Production Hosting Architecture

### Main Website (netboxlabs.com)

- **Repository**: `netboxlabs/netboxlabs-website` (Next.js)
- **Hosts**: `https://netboxlabs.com/`
- **Content**: Marketing site, product pages, blog

### Documentation (netboxlabs.com/docs/)

- **Repository**: `netboxlabs/netboxlabs-website-dochub` (Docusaurus) - **THIS REPO**
- **Deployed to**: Separate Vercel project
- **Rewritten to**: `https://netboxlabs.com/docs/` via Next.js rewrites

### How the Rewrite Works

The main website (`netboxlabs-website`) uses Next.js rewrites to serve documentation:

```javascript
// In netboxlabs-website next.config.js
async rewrites() {
  return [
    {
      source: '/docs/:path*',
      destination: 'https://dochub-production.vercel.app/docs/:path*'
    }
  ];
}
```

This means:

- **Customer sees**: `https://netboxlabs.com/docs/netbox/introduction/`
- **Actually served from**: `https://dochub-production.vercel.app/docs/netbox/introduction/`

## Environment Configuration Differences

| Environment        | Base URL                      | Docs Path | How It Works                       |
| ------------------ | ----------------------------- | --------- | ---------------------------------- |
| **Local Dev**      | `http://localhost:3001/`      | `/docs/`  | Direct Docusaurus serving          |
| **Vercel Preview** | `https://preview.vercel.app/` | `/docs/`  | Direct Docusaurus serving          |
| **Production**     | `https://netboxlabs.com/`     | `/docs/`  | Rewritten from separate deployment |

## Docusaurus Configuration

The `docusaurus.config.ts` handles these different environments:

```typescript
export default {
  url: 'https://netboxlabs.com',
  baseUrl: process.env.VERCEL_ENV === 'production' ? '/docs/' : '/',
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: process.env.VERCEL_ENV === 'production' ? '/' : '/docs/',
        },
      },
    ],
  ],
};
```

### Configuration Behavior

**Local Development & Vercel Preview:**

- `baseUrl: "/"` - Site serves from root
- `routeBasePath: "/docs/"` - Docs appear at `/docs/`
- **Result**: `http://localhost:3001/docs/netbox/introduction/`

**Production:**

- `baseUrl: "/docs/"` - Site expects to be served under `/docs/`
- `routeBasePath: "/"` - Docs appear at root of the site
- **Result**: `https://netboxlabs.com/docs/netbox/introduction/`

## Vercel Redirects System

The `vercel.json` file contains **150+ redirect rules** that handle legacy URLs and URL-encoded characters.

### URL-Encoded Space Handling

```json
{
  "source": "/docs/console/Administration Console/(.*)",
  "destination": "/docs/console/administration-console/$1",
  "permanent": true
}
```

**Important**: URL-encoded spaces (`%20`) in paths like `/Administration%20Console/` are handled by these redirects.

### Why Redirects Don't Work in Local Dev

- **Local dev** serves directly from Docusaurus without Vercel's redirect processing
- **Production** processes redirects before serving content
- **Vercel Preview** processes redirects (so previews work correctly)

### Testing Redirects

```bash
# ❌ Won't work locally (no redirect processing)
curl http://localhost:3001/docs/console/Administration%20Console/working_with_database_backups/

# ✅ Works locally (direct path)
curl http://localhost:3001/docs/console/administration-console/working_with_database_backups/

# ✅ Works in production (redirect processed)
curl https://netboxlabs.com/docs/console/Administration%20Console/working_with_database_backups/
```

## Redirect Categories

### Legacy URL Compatibility

```json
{
  "source": "/Administration Console/(.*)",
  "destination": "/docs/console/administration-console/$1",
  "permanent": true
}
```

### Product Integration Redirects

```json
{
  "source": "/sdks/pynetbox",
  "destination": "/docs/console/sdks/pynetbox/",
  "permanent": true
}
```

### External Asset Redirects

```json
{
  "source": "/docs/netbox/media/screenshots/home-light.png",
  "destination": "https://raw.githubusercontent.com/netbox-community/netbox/main/docs/media/screenshots/home-light.png",
  "permanent": true
}
```

## Environment Variables

| Variable        | Local Dev | Vercel Preview | Production   |
| --------------- | --------- | -------------- | ------------ |
| `VERCEL_ENV`    | undefined | "preview"      | "production" |
| `baseUrl`       | "/"       | "/"            | "/docs/"     |
| `routeBasePath` | "/docs/"  | "/docs/"       | "/"          |

## Troubleshooting Common Issues

### "Redirects don't work locally"

- **Expected**: Redirects only work in Vercel deployments
- **Solution**: Test redirects using Vercel preview deployments
- **Workaround**: Use the final destination URLs directly in local dev

### "Preview works but production doesn't"

- **Cause**: Different `baseUrl` and `routeBasePath` in production
- **Check**: Verify `VERCEL_ENV` environment variable
- **Solution**: Test with production environment variables

### "URL-encoded characters cause 404s"

- **Cause**: Spaces in URLs become `%20` and need redirects
- **Solution**: Add appropriate redirects in `vercel.json`
- **Prevention**: Use kebab-case for all directory names

## Development Best Practices

### Test in All Environments

```bash
# Local development
yarn dev

# Vercel preview (after pushing to branch)
git push origin feature-branch
# Check Vercel preview URL

# Production (after merging to main)
git push origin main
# Check https://netboxlabs.com/docs/
```

### Use Relative Links in Documentation

```markdown
# ✅ Good - works in all environments

[Installation Guide](../installation/overview.md)

# ❌ Bad - hardcoded paths may break

[Installation Guide](/docs/console/installation/overview/)
```

### Test Redirects Using Vercel Preview

- Push changes to a branch
- Use Vercel preview URL to test redirects
- Don't rely on local development for redirect testing

## Architecture Benefits

1. **SEO Benefits**: All content appears under `netboxlabs.com` domain
2. **Unified Experience**: Seamless navigation between marketing and docs
3. **Independent Deployment**: Documentation can be updated without affecting main site
4. **Performance**: Separate optimization strategies for different content types
5. **Team Autonomy**: Documentation team can deploy independently

## Technical Implementation Details

### Complex Rewrite System

The production architecture uses a sophisticated rewrite system where:

- `netboxlabs.com/docs/` is served from a separate Vercel deployment
- The main website handles the rewriting transparently
- Users see a unified domain experience
- Documentation team can deploy independently

### URL Handling Complexity

Different environments handle URLs differently:

- Local development serves docs directly at `/docs/`
- Vercel preview deployments work like local development
- Production uses the rewrite system with different base paths

This complexity is necessary to provide the best user experience while maintaining development flexibility.

---

This technical architecture ensures optimal user experience while maintaining development flexibility and team autonomy. Understanding these details is crucial for developers working on the documentation system.
