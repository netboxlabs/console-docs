# Dochub Integration Requirements for New Product Tagging System

## Overview

The console-docs repository has migrated from HTML `<span>` pills to Docusaurus frontmatter tags for product categorization. This document outlines the required changes for the netboxlabs-website-dochub repository to properly consume and display this new tagging system.

## Required Changes for netboxlabs-website-dochub

### 1. **Content Ingestion Updates**

#### Before (HTML Parsing):
```javascript
// Old method - parsing HTML spans
function extractProductPills(htmlContent) {
  const pillRegex = /<span class="pill (pill-[^"]+)"[^>]*>([^<]+)<\/span>/g;
  const products = [];
  let match;
  
  while ((match = pillRegex.exec(htmlContent)) !== null) {
    products.push({
      class: match[1],
      label: match[2]
    });
  }
  
  return products;
}
```

#### After (Frontmatter Parsing):
```javascript
// New method - reading frontmatter tags
function extractProductTags(frontmatter) {
  const productTags = frontmatter.tags?.filter(tag => 
    tag.startsWith('netbox-') || KNOWN_PRODUCT_TAGS.includes(tag)
  ) || [];
  
  return productTags.map(tag => ({
    key: tag,
    label: TAG_LABELS[tag] || tag,
    color: TAG_COLORS[tag] || '#cccccc'
  }));
}

const TAG_LABELS = {
  'netbox-cloud': 'NetBox Cloud',
  'netbox-enterprise': 'NetBox Enterprise', 
  'netbox-community': 'NetBox Community',
  'airgap': 'Air-Gap'
};

const TAG_COLORS = {
  'netbox-cloud': '#00d9be',
  'netbox-enterprise': '#ffac00',
  'netbox-community': '#00bee0', 
  'airgap': '#ff0078'
};
```

### 2. **Document Processing Pipeline**

Update your document processing to handle frontmatter:

```javascript
// Example using gray-matter or similar
import matter from 'gray-matter';

function processConsoleDoc(markdownContent, filePath) {
  const { data: frontmatter, content } = matter(markdownContent);
  
  return {
    id: generateDocId(filePath),
    title: frontmatter.title || extractTitleFromContent(content),
    description: frontmatter.description || extractDescription(content),
    tags: frontmatter.tags || [],
    productTags: extractProductTags(frontmatter),
    content: content,
    lastModified: frontmatter.last_update?.date || getGitLastModified(filePath),
    author: frontmatter.last_update?.author || 'NetBox Labs',
    // Other metadata...
  };
}
```

### 3. **API Endpoints Updates**

#### Product Filtering Endpoint:
```javascript
// GET /api/docs/by-product/:product
app.get('/api/docs/by-product/:product', (req, res) => {
  const { product } = req.params;
  const tagKey = `netbox-${product.toLowerCase()}`;
  
  const docs = allDocs.filter(doc => 
    doc.productTags.some(tag => tag.key === tagKey)
  );
  
  res.json({
    product: product,
    tagKey: tagKey,
    count: docs.length,
    documents: docs
  });
});

// GET /api/docs/tags - List all available tags
app.get('/api/docs/tags', (req, res) => {
  const tagCounts = {};
  
  allDocs.forEach(doc => {
    doc.productTags.forEach(tag => {
      tagCounts[tag.key] = (tagCounts[tag.key] || 0) + 1;
    });
  });
  
  res.json({
    tags: Object.entries(tagCounts).map(([key, count]) => ({
      key,
      label: TAG_LABELS[key] || key,
      color: TAG_COLORS[key] || '#cccccc',
      count,
      url: `/docs/products/${key.replace('netbox-', '')}`
    }))
  });
});
```

### 4. **UI Component Updates**

#### Product Pills Component:
```jsx
// React component for displaying product tags
function ProductPills({ tags, size = 'normal' }) {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="product-pills">
      {tags.map(tag => (
        <Link
          key={tag.key}
          to={`/docs/products/${tag.key.replace('netbox-', '')}`}
          className={`product-pill product-pill--${size}`}
          style={{ backgroundColor: tag.color }}
        >
          {tag.label}
        </Link>
      ))}
    </div>
  );
}

// Usage in document display
function DocumentCard({ document }) {
  return (
    <div className="document-card">
      <ProductPills tags={document.productTags} size="small" />
      <h3>
        <Link to={document.url}>{document.title}</Link>
      </h3>
      <p>{document.description}</p>
    </div>
  );
}
```

### 5. **Search Integration**

```javascript
// Enhanced search with product filtering
function searchDocuments(query, filters = {}) {
  let results = performTextSearch(query);
  
  // Filter by product if specified
  if (filters.products && filters.products.length > 0) {
    results = results.filter(doc =>
      filters.products.some(product =>
        doc.productTags.some(tag => tag.key === `netbox-${product}`)
      )
    );
  }
  
  // Add product tag highlighting in results
  return results.map(doc => ({
    ...doc,
    relevantTags: doc.productTags.filter(tag =>
      filters.products?.includes(tag.key.replace('netbox-', ''))
    )
  }));
}
```

### 6. **Sitemap and SEO Updates**

```javascript
// Generate product-specific sitemaps
function generateProductSitemaps() {
  const productDocs = groupBy(allDocs, doc => doc.productTags);
  
  Object.entries(productDocs).forEach(([product, docs]) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${docs.map(doc => `
  <url>
    <loc>${BASE_URL}${doc.url}</loc>
    <lastmod>${doc.lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <meta name="product" content="${product}" />
  </url>
`).join('')}
</urlset>`;
    
    fs.writeFileSync(`public/sitemap-${product}.xml`, sitemap);
  });
}
```

### 7. **Configuration Updates**

Update your dochub configuration to handle the new system:

```javascript
// docusaurus.config.js or equivalent
module.exports = {
  // ... existing config
  
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'console-docs',
        path: '../console-docs/docs',
        routeBasePath: 'console',
        
        // Enable tags processing
        tags: {
          basePath: 'console/tags',
          tagsBasePath: 'console/tags',
        },
        
        // Custom processing for console docs
        async processDocMetadata(metadata) {
          return {
            ...metadata,
            productTags: extractProductTags(metadata.frontMatter),
            source: 'console-docs'
          };
        }
      }
    ]
  ],
  
  themeConfig: {
    // Add product filtering to search
    algolia: {
      // ... existing algolia config
      searchParameters: {
        facetFilters: [],
        facets: ['products', 'tags', 'source']
      }
    }
  }
};
```

## Migration Timeline

### Phase 1: Backward Compatibility (Week 1-2)
- Update content ingestion to read both HTML pills AND frontmatter tags
- Deploy with fallback logic to handle both formats
- Test with mixed content

### Phase 2: New System Primary (Week 3-4)  
- Switch to frontmatter tags as primary source
- Keep HTML parsing as fallback for unmigrated content
- Update UI components to use new tag structure

### Phase 3: Complete Migration (Week 5-6)
- Remove HTML pill parsing logic
- Fully leverage new tag system features (filtering, tag pages, etc.)
- Optimize performance with new metadata structure

## Testing Strategy

### 1. **Content Validation**
```bash
# Test script to validate all docs have proper tags
node scripts/validate-console-docs-tags.js
```

### 2. **API Testing**
```javascript
// Test that all console docs are properly categorized
describe('Console Docs Integration', () => {
  test('all docs have product tags', async () => {
    const docs = await fetchConsoleDocs();
    docs.forEach(doc => {
      expect(doc.productTags.length).toBeGreaterThan(0);
    });
  });
  
  test('product filtering works', async () => {
    const cloudDocs = await fetchDocsByProduct('cloud');
    cloudDocs.forEach(doc => {
      expect(doc.productTags.some(tag => tag.key === 'netbox-cloud')).toBe(true);
    });
  });
});
```

### 3. **UI Testing**
- Verify product pills display correctly
- Test filtering and search functionality
- Validate tag page generation
- Check mobile responsiveness

## Benefits After Implementation

1. **🚀 Performance**: Faster categorization using structured metadata
2. **🔍 Search**: Enhanced search with product filtering
3. **📱 UX**: Better user experience with clickable product categories
4. **🤖 SEO**: Improved search engine optimization
5. **📊 Analytics**: Better tracking of product-specific documentation usage
6. **🔧 Maintenance**: Easier to maintain consistent categorization

## Support During Migration

The console-docs team will provide:

1. **Sample integration code** (this document)
2. **Test data** with both old and new formats
3. **Validation scripts** to ensure proper migration
4. **Documentation updates** as the system evolves

## Contact

For questions about the integration:
- **Technical Questions**: Create issue in console-docs repository
- **Migration Support**: Tag @console-docs-team in dochub repository
- **Timeline Coordination**: NetBox Labs internal team coordination

This migration will significantly improve the integration between console-docs and dochub, providing better user experience and more powerful documentation features. 