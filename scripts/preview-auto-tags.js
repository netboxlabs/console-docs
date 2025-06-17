#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Import the tagging logic from auto-tag-by-location.js
// We'll copy the key functions here for preview purposes

// Directory-based tagging rules
const DIRECTORY_RULES = {
  'Administration Console': ['netbox-cloud'],
  'NetBox Cloud': ['netbox-cloud'],
  'cloud-connectivity': ['netbox-cloud'],
  'netbox-enterprise': ['netbox-enterprise'],
  'netbox-discovery': ['netbox-cloud', 'netbox-enterprise', 'netbox-community'],
  'netbox-assurance': ['netbox-cloud', 'netbox-enterprise'],
  'netbox-extensions': ['netbox-community', 'netbox-enterprise'],
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
    tags: ['netbox-airgap'],
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

function analyzeFileLocation(filePath) {
  const pathParts = filePath.split(path.sep);
  const tags = new Set();
  
  pathParts.forEach(part => {
    if (DIRECTORY_RULES[part]) {
      DIRECTORY_RULES[part].forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags);
}

function analyzeFileContent(content, filePath) {
  const tagScores = {};
  
  CONTENT_RULES.forEach(rule => {
    const matches = content.match(rule.pattern);
    if (matches) {
      rule.tags.forEach(tag => {
        tagScores[tag] = (tagScores[tag] || 0) + (matches.length * rule.weight);
      });
    }
  });
  
  return Object.entries(tagScores)
    .filter(([tag, score]) => score >= 1)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);
}

function determineProductTags(filePath, content) {
  const locationTags = analyzeFileLocation(filePath);
  const contentTags = analyzeFileContent(content, filePath);
  
  const allTags = [...new Set([...locationTags, ...contentTags])];
  
  // Apply refinements
  if (filePath.includes('Administration Console')) {
    return allTags.includes('netbox-cloud') ? allTags : ['netbox-cloud', ...allTags];
  }
  
  if (filePath.includes('free-plan') || content.includes('Free Plan')) {
    return ['netbox-cloud'];
  }
  
  if (filePath.includes('netbox-discovery') || filePath.includes('netbox-assurance')) {
    return allTags.length > 0 ? allTags : ['netbox-cloud', 'netbox-enterprise', 'netbox-community'];
  }
  
  if (allTags.length === 0) {
    if (filePath.includes('cloud') || filePath.includes('Administration')) {
      return ['netbox-cloud'];
    } else if (filePath.includes('enterprise')) {
      return ['netbox-enterprise'];
    } else {
      return ['netbox-cloud', 'netbox-enterprise', 'netbox-community'];
    }
  }
  
  return allTags;
}

function checkExistingTags(content) {
  if (content.startsWith('---')) {
    try {
      const endIndex = content.indexOf('---', 3);
      if (endIndex > -1) {
        const frontmatter = content.substring(3, endIndex);
        const tagsMatch = frontmatter.match(/tags:\s*\n((?:\s*-\s*.+\n?)*)/);
        if (tagsMatch) {
          const tags = tagsMatch[1]
            .split('\n')
            .map(line => line.trim().replace(/^-\s*/, ''))
            .filter(tag => tag.length > 0);
          return tags.length > 0 ? tags : null;
        }
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }
  return null;
}

function groupFilesByTags(files) {
  const groups = {};
  
  files.forEach(file => {
    const tagsKey = file.suggestedTags.join(', ');
    if (!groups[tagsKey]) {
      groups[tagsKey] = [];
    }
    groups[tagsKey].push(file);
  });
  
  return groups;
}

function main() {
  console.log('🔍 Preview: Auto-tagging analysis based on location and content\n');
  
  const markdownFiles = glob.sync('docs/**/*.md', { 
    cwd: process.cwd(),
    ignore: ['docs/tags.yml'] 
  });
  
  if (markdownFiles.length === 0) {
    console.log('❌ No markdown files found in docs/ directory');
    return;
  }
  
  const results = [];
  let alreadyTaggedCount = 0;
  let needsTaggingCount = 0;
  
  markdownFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const existingTags = checkExistingTags(content);
    
    if (existingTags) {
      alreadyTaggedCount++;
      results.push({
        path: filePath,
        status: 'already-tagged',
        existingTags: existingTags,
        suggestedTags: []
      });
    } else {
      needsTaggingCount++;
      const suggestedTags = determineProductTags(filePath, content);
      results.push({
        path: filePath,
        status: 'needs-tagging',
        existingTags: null,
        suggestedTags: suggestedTags
      });
    }
  });
  
  console.log(`📊 Summary:`);
  console.log(`   Total files: ${markdownFiles.length}`);
  console.log(`   Already tagged: ${alreadyTaggedCount}`);
  console.log(`   Need tagging: ${needsTaggingCount}\n`);
  
  // Show files that need tagging, grouped by suggested tags
  const needsTagging = results.filter(r => r.status === 'needs-tagging');
  if (needsTagging.length > 0) {
    console.log('📋 Files that would be tagged:\n');
    
    const grouped = groupFilesByTags(needsTagging);
    
    Object.entries(grouped).forEach(([tags, files]) => {
      console.log(`🏷️  ${tags}:`);
      files.forEach(file => {
        const shortPath = file.path.replace('docs/', '');
        console.log(`   📄 ${shortPath}`);
      });
      console.log('');
    });
  }
  
  // Show already tagged files
  const alreadyTagged = results.filter(r => r.status === 'already-tagged');
  if (alreadyTagged.length > 0) {
    console.log('✅ Files already tagged:\n');
    alreadyTagged.forEach(file => {
      const shortPath = file.path.replace('docs/', '');
      console.log(`   📄 ${shortPath} → ${file.existingTags.join(', ')}`);
    });
    console.log('');
  }
  
  // Show directory-based rules
  console.log('📁 Directory tagging rules:');
  Object.entries(DIRECTORY_RULES).forEach(([dir, tags]) => {
    console.log(`   ${dir}/ → ${tags.join(', ')}`);
  });
  
  console.log('\n🚀 To apply these tags automatically, run:');
  console.log('   npm run auto-tag');
  
  console.log('\n💡 Tips:');
  console.log('   - Review the suggested tags above');
  console.log('   - Files already with tags will be skipped');
  console.log('   - Content analysis is used in addition to directory rules');
  console.log('   - Run "git diff" after tagging to review changes');
}

if (require.main === module) {
  main();
} 