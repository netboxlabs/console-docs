# Product Tagging System Guide

## Overview

This guide explains the new product tagging system that replaces HTML `<span>` pills with Docusaurus-native frontmatter tags. This system provides better integration with the upstream netboxlabs-website-dochub repository and enables powerful categorization and filtering capabilities.

## Why We Changed

### Old System Problems:
- ❌ HTML `<span>` elements aren't semantic
- ❌ Hard for Docusaurus to categorize and filter content
- ❌ No integration with Docusaurus tag system
- ❌ Search engines can't understand product categorization
- ❌ No automatic tag pages generation

### New System Benefits:
- ✅ **SEO-friendly**: Search engines understand product categories
- ✅ **Docusaurus native**: Full integration with Docusaurus tag system
- ✅ **Automatic tag pages**: Generated pages for each product category
- ✅ **Filtering capabilities**: Easy to filter docs by product
- ✅ **API integration**: Programmatic access to document metadata
- ✅ **Better dochub integration**: Upstream can easily categorize content

## Migration Guide

### Before (Old HTML Pills):
```markdown
<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

# Document Title

Content here...
```

### After (New Frontmatter Tags):
```markdown
---
title: Document Title
description: Brief description for SEO
tags:
  - cloud
  - enterprise
  - community
---

# Document Title

Content here...
```

## Available Product Tags

The following product tags are available in `docs/tags.yml`:

| Tag Key | Display Label | Color | Description |
|---------|---------------|-------|-------------|
| `cloud` | NetBox Cloud | 🟢 Teal (`#00d9be`) | Documentation for NetBox Cloud |
| `enterprise` | NetBox Enterprise | 🟠 Orange (`#ffac00`) | Documentation for NetBox Enterprise |
| `community` | NetBox Community | 🔵 Blue (`#00bee0`) | Documentation for NetBox Community |
| `airgap` | Air-Gap | 🔴 Pink (`#ff0078`) | Documentation for air-gapped deployments |

## How to Use

### 1. **Automatic Display (Recommended)**

Add tags to your frontmatter and they'll automatically appear at the top of the document:

```markdown
---
title: My Document
tags:
  - cloud
  - enterprise
---

# My Document

The product tags will appear automatically above this content.
```

### 2. **Manual Component Usage**

You can also manually place the component anywhere in your document:

```markdown
---
title: My Document
tags:
  - cloud
---

# My Document

<ProductTags />

Some content...

<ProductTags tags={['enterprise', 'community']} />

More content...
```

### 3. **Custom Tags**

You can override the automatic tags by passing them directly:

```jsx
import ProductTags from '@theme/ProductTags';

<ProductTags tags={['cloud', 'enterprise']} />
```

## Migration Scripts

### Automatic Migration

Run the migration script to automatically convert all files:

```bash
# Install dependencies
npm install

# Run migration
npm run migrate-pills

# Review changes
git diff

# Test locally
npm run serve
```

### Manual Migration

For individual files:

1. **Remove old HTML pills**:
   ```html
   <!-- Remove these -->
   <span class="pill pill-cloud">NetBox Cloud</span>
   <span class="pill pill-enterprise">NetBox Enterprise</span>
   ```

2. **Add frontmatter tags**:
   ```yaml
   ---
   tags:
     - cloud
     - enterprise
   ---
   ```

## Integration with Dochub

The new system provides multiple integration points for the upstream dochub repository:

### 1. **API Access**

```javascript
// Access document metadata programmatically
import { useDoc } from '@docusaurus/plugin-content-docs/client';

function MyComponent() {
  const doc = useDoc();
  const productTags = doc.frontMatter.tags?.filter(tag => 
    ['cloud', 'enterprise', 'community', 'discovery', 'assurance', 'operator', 'netbox', 'airgap'].includes(tag)
  );
  
  return <div>This doc applies to: {productTags.join(', ')}</div>;
}
```

### 2. **Build-time Data**

```javascript
// In docusaurus.config.js or plugins
module.exports = {
  plugins: [
    function customPlugin() {
      return {
        name: 'product-tagger',
        async loadContent() {
          // Access all docs with their tags for categorization
          const docs = await loadDocs();
          return docs.filter(doc => 
            doc.frontMatter.tags?.includes('cloud')
          );
        }
      };
    }
  ]
};
```

### 3. **GraphQL/JSON Export**

The dochub integration can export document metadata including tags:

```json
{
  "documents": [
    {
      "id": "discovery-assurance",
      "title": "NetBox Discovery & Assurance", 
      "tags": ["cloud", "enterprise", "community"],
      "products": ["NetBox Cloud", "NetBox Enterprise", "NetBox Community"],
      "url": "/docs/discovery-assurance"
    }
  ]
}
```

## Benefits for Docusaurus Integration

### 1. **Tag Pages**

Docusaurus automatically generates tag pages at:
- `/docs/tags` - List of all tags
- `/docs/tags/cloud` - All docs tagged with cloud
- `/docs/tags/enterprise` - All docs tagged with enterprise

### 2. **Search Integration**

Tags are included in search metadata, improving discoverability:

```javascript
// Search results include tag information
{
  "title": "Document Title",
  "tags": ["cloud", "enterprise"],
  "excerpt": "...",
  "url": "/docs/path"
}
```

### 3. **RSS/Sitemap Integration**

Tags are included in generated sitemaps and RSS feeds:

```xml
<url>
  <loc>https://netboxlabs.com/docs/discovery-assurance</loc>
  <meta name="tags" content="cloud,enterprise,community" />
</url>
```

## Troubleshooting

### Tags Not Showing

1. **Check frontmatter syntax**:
   ```yaml
   # Correct
   tags:
     - cloud
     - enterprise
   
   # Also correct
   tags: [cloud, enterprise]
   ```

2. **Verify tag names match `tags.yml`**:
   - Use exact tag keys from `docs/tags.yml`
   - Common mistake: `netbox_cloud` vs `cloud`

3. **Check component import**:
   ```jsx
   // Make sure component is imported correctly
   import ProductTags from '@theme/ProductTags';
   ```

### Styling Issues

1. **Colors not showing**: Check that CSS imports are working
2. **Layout problems**: Verify CSS Grid/Flexbox support
3. **Dark mode**: Component automatically adapts to theme

### Migration Script Issues

1. **Files not processed**: Make sure they're in `docs/` directory
2. **Frontmatter conflicts**: Script skips files with existing tags
3. **Permissions**: Ensure write access to files

## Development

### Adding New Product Tags

1. **Update `docs/tags.yml`**:
   ```yaml
   new-product:
     label: 'New Product'
     permalink: '/new-product'
     description: 'Documentation for new product'
   ```

2. **Update component config**:
   ```javascript
   // In src/theme/ProductTags/index.js
   const PRODUCT_TAG_CONFIG = {
     // ... existing tags
     'new-product': {
       label: 'New Product',
       className: 'pill-new-product',
       color: '#123456'
     }
   };
   ```

3. **Add CSS**:
   ```css
   /* In src/theme/ProductTags/styles.module.css */
   .pill-new-product {
     background-color: #123456;
   }
   ```

### Testing

```bash
# Test locally
npm run serve

# Build and test
npm run build

# Check tag pages work
# Visit: http://localhost:8000/docs/tags
```

## Best Practices

1. **Use consistent tag names**: Stick to the predefined tags in `tags.yml`
2. **Add descriptions**: Include `description` in frontmatter for SEO
3. **Be selective**: Only tag with relevant products
4. **Test integration**: Verify tags work in both MkDocs and Docusaurus
5. **Update documentation**: Keep this guide updated as system evolves

## Support

For questions about the product tagging system:

1. **Check this guide first**
2. **Review the migration script output**
3. **Test with a single file before bulk migration**
4. **Document any issues for the team**

The new system provides a solid foundation for product categorization that will scale with the NetBox Labs documentation ecosystem. 