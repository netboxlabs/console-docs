#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

// Directory-based tagging rules
const DIRECTORY_RULES = {
  // NetBox Cloud specific paths
  'Administration Console': ['netbox-cloud'],
  'NetBox Cloud': ['netbox-cloud'],
  'cloud-connectivity': ['netbox-cloud'],
  
  // NetBox Enterprise specific paths  
  'netbox-enterprise': ['netbox-enterprise'],
  
  // NetBox Discovery - usually multi-product
  'netbox-discovery': ['netbox-cloud', 'netbox-enterprise', 'netbox-community'],
  'netbox-assurance': ['netbox-cloud', 'netbox-enterprise'],
  
  // NetBox Extensions - usually community + enterprise
  'netbox-extensions': ['netbox-community', 'netbox-enterprise'],
  
  // SDKs and Integrations - usually all products
  'sdks': ['netbox-cloud', 'netbox-enterprise', 'netbox-community'],
  'netbox-integrations': ['netbox-cloud', 'netbox-enterprise', 'netbox-community'],
};

// Content-based tagging rules
const CONTENT_RULES = [
  {
    pattern: /netbox cloud|administration console|console\.netboxlabs\.com/gi,
    tags: ['netbox-cloud'],
    weight: 3
  },
  {
    pattern: /netbox enterprise|nbe-|enterprise installer|embedded cluster/gi,
    tags: ['netbox-enterprise'],
    weight: 3
  },
  {
    pattern: /netbox community|community edition|open source/gi,
    tags: ['netbox-community'],
    weight: 2
  },
  {
    pattern: /air.?gap|airgap|offline|disconnected/gi,
    tags: ['airgap'],
    weight: 2
  },
  {
    pattern: /free plan|trial/gi,
    tags: ['netbox-cloud'],
    weight: 1
  },
  {
    pattern: /plugin|extension/gi,
    tags: ['netbox-enterprise', 'netbox-community'],
    weight: 1
  },
  {
    pattern: /sso|saml|ldap|oauth/gi,
    tags: ['netbox-cloud', 'netbox-enterprise'],
    weight: 1
  }
];

// File name patterns
const FILENAME_RULES = [
  {
    pattern: /nbc-|cloud-/gi,
    tags: ['netbox-cloud']
  },
  {
    pattern: /nbe-|enterprise-/gi,
    tags: ['netbox-enterprise']
  },
  {
    pattern: /free-plan/gi,
    tags: ['netbox-cloud']
  },
  {
    pattern: /console-/gi,
    tags: ['netbox-cloud']
  }
];

function analyzeFileLocation(filePath) {
  const pathParts = filePath.split(path.sep);
  const tags = new Set();
  
  // Check each directory in the path
  pathParts.forEach(part => {
    if (DIRECTORY_RULES[part]) {
      DIRECTORY_RULES[part].forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags);
}

function analyzeFileContent(content, filePath) {
  const tagScores = {};
  const fileName = path.basename(filePath);
  
  // Analyze content patterns
  CONTENT_RULES.forEach(rule => {
    const matches = content.match(rule.pattern);
    if (matches) {
      rule.tags.forEach(tag => {
        tagScores[tag] = (tagScores[tag] || 0) + (matches.length * rule.weight);
      });
    }
  });
  
  // Analyze filename patterns
  FILENAME_RULES.forEach(rule => {
    if (rule.pattern.test(fileName)) {
      rule.tags.forEach(tag => {
        tagScores[tag] = (tagScores[tag] || 0) + 2;
      });
    }
  });
  
  // Return tags with score >= 1
  return Object.entries(tagScores)
    .filter(([tag, score]) => score >= 1)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);
}

function determineProductTags(filePath, content, frontmatter) {
  const locationTags = analyzeFileLocation(filePath);
  const contentTags = analyzeFileContent(content, filePath);
  
  // Combine and deduplicate
  const allTags = [...new Set([...locationTags, ...contentTags])];
  
  // Apply some logic to refine the tags
  const refinedTags = refineTags(allTags, filePath, content);
  
  return refinedTags;
}

function refineTags(tags, filePath, content) {
  const refined = [...tags];
  
  // Special cases and refinements
  
  // If it's clearly enterprise-only content, remove community
  if (content.includes('NetBox Enterprise') && 
      content.includes('installer') && 
      !content.includes('community')) {
    const communityIndex = refined.indexOf('netbox-community');
    if (communityIndex > -1) {
      refined.splice(communityIndex, 1);
    }
  }
  
  // If it's in Administration Console, it's definitely Cloud
  if (filePath.includes('Administration Console')) {
    if (!refined.includes('netbox-cloud')) {
      refined.unshift('netbox-cloud');
    }
  }
  
  // If it's a free plan feature, it's Cloud only
  if (filePath.includes('free-plan') || content.includes('Free Plan')) {
    return ['netbox-cloud'];
  }
  
  // If it's about SSO and in cloud docs, prioritize cloud
  if (content.includes('SSO') && filePath.includes('Administration Console')) {
    return ['netbox-cloud'];
  }
  
  // If it's about enterprise SSO, prioritize enterprise
  if (content.includes('SSO') && filePath.includes('netbox-enterprise')) {
    return ['netbox-enterprise'];
  }
  
  // Default Discovery and Assurance to all products unless specifically limited
  if (filePath.includes('netbox-discovery') || filePath.includes('netbox-assurance')) {
    const defaultTags = ['netbox-cloud', 'netbox-enterprise', 'netbox-community'];
    return refined.length > 0 ? refined : defaultTags;
  }
  
  // Ensure we have at least one tag
  if (refined.length === 0) {
    // Try to infer from broader context
    if (filePath.includes('cloud') || filePath.includes('Administration')) {
      return ['netbox-cloud'];
    } else if (filePath.includes('enterprise')) {
      return ['netbox-enterprise'];
    } else {
      // Default to all products for general content
      return ['netbox-cloud', 'netbox-enterprise', 'netbox-community'];
    }
  }
  
  return refined;
}

function addTagsToContent(content, tags, existingFrontmatter) {
  const hasFrontmatter = content.startsWith('---');
  
  if (hasFrontmatter) {
    // Parse existing frontmatter
    const { data: frontmatter, content: bodyContent } = matter(content);
    
    // Skip if tags already exist
    if (frontmatter.tags && frontmatter.tags.length > 0) {
      console.log('  ⚠️  File already has tags, skipping...');
      return content;
    }
    
    // Add tags to frontmatter
    frontmatter.tags = tags;
    
    // Reconstruct content
    const updatedFrontmatter = Object.entries(frontmatter)
      .map(([key, value]) => {
        if (key === 'tags') {
          return `${key}:\n${value.map(tag => `  - ${tag}`).join('\n')}`;
        } else if (Array.isArray(value)) {
          return `${key}:\n${value.map(item => `  - ${item}`).join('\n')}`;
        } else {
          return `${key}: ${value}`;
        }
      })
      .join('\n');
    
    return `---\n${updatedFrontmatter}\n---\n\n${bodyContent}`;
  } else {
    // Create new frontmatter
    const title = extractTitleFromContent(content);
    const frontmatter = [
      '---',
      title ? `title: ${title}` : '',
      'tags:',
      ...tags.map(tag => `  - ${tag}`),
      '---',
      ''
    ].filter(line => line !== '').join('\n');
    
    return frontmatter + content;
  }
}

function extractTitleFromContent(content) {
  // Try to extract title from first H1
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1];
  }
  
  // Try to extract from HTML title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1];
  }
  
  return null;
}

function processFile(filePath) {
  console.log(`📄 Processing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file already has tags
  if (content.startsWith('---')) {
    const { data: frontmatter } = matter(content);
    if (frontmatter.tags && frontmatter.tags.length > 0) {
      console.log('  ✅ Already has tags, skipping...');
      return;
    }
  }
  
  // Determine appropriate tags
  const tags = determineProductTags(filePath, content);
  
  if (tags.length === 0) {
    console.log('  ⚠️  No tags determined, skipping...');
    return;
  }
  
  console.log(`  🏷️  Suggested tags: ${tags.join(', ')}`);
  
  // Add tags to content
  const newContent = addTagsToContent(content, tags);
  
  // Write back to file
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('  ✅ Tags added successfully!');
}

function main() {
  console.log('🚀 Auto-tagging files based on location and content analysis...\n');
  
  // Find all markdown files
  const markdownFiles = glob.sync('docs/**/*.md', { 
    cwd: process.cwd(),
    ignore: ['docs/tags.yml', 'docs/index.md'] // Skip certain files
  });
  
  if (markdownFiles.length === 0) {
    console.log('❌ No markdown files found in docs/ directory');
    return;
  }
  
  console.log(`📁 Found ${markdownFiles.length} markdown files to analyze\n`);
  
  // Process each file
  markdownFiles.forEach(processFile);
  
  console.log('\n🎉 Auto-tagging complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the suggested tags: git diff');
  console.log('2. Make any manual adjustments needed');
  console.log('3. Test your site locally: mkdocs serve');
  console.log('4. Commit the changes when satisfied');
  
  console.log('\n📊 Tagging Summary:');
  console.log('- Files in "Administration Console/" → netbox-cloud');
  console.log('- Files in "netbox-enterprise/" → netbox-enterprise');
  console.log('- Files in "netbox-discovery/" → cloud + enterprise + community');
  console.log('- Content analysis used for additional tag suggestions');
}

if (require.main === module) {
  main();
} 