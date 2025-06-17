#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mapping of pill classes to tag names
const PILL_TO_TAG_MAP = {
  'pill-cloud': 'netbox-cloud',
  'pill-enterprise': 'netbox-enterprise', 
  'pill-community': 'netbox-community',
  'pill-airgap': 'netbox-airgap'
};

function extractPillsFromContent(content) {
  const pills = [];
  const pillRegex = /<span class="pill (pill-[^"]+)"[^>]*>([^<]+)<\/span>/g;
  let match;
  
  while ((match = pillRegex.exec(content)) !== null) {
    const pillClass = match[1];
    const tagName = PILL_TO_TAG_MAP[pillClass];
    if (tagName && !pills.includes(tagName)) {
      pills.push(tagName);
    }
  }
  
  return pills;
}

function removePillsFromContent(content) {
  // Remove pill spans and clean up extra whitespace
  let cleaned = content.replace(/<span class="pill pill-[^"]+">([^<]+)<\/span>\s*/g, '');
  
  // Remove any remaining empty lines at the start
  cleaned = cleaned.replace(/^\s*\n+/, '');
  
  return cleaned;
}

function addFrontmatterToContent(content, tags, existingTitle) {
  const hasFrontmatter = content.startsWith('---');
  
  if (hasFrontmatter) {
    // Extract existing frontmatter
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (frontmatterMatch) {
      const existingFrontmatter = frontmatterMatch[1];
      const bodyContent = frontmatterMatch[2];
      
      // Check if tags already exist
      if (existingFrontmatter.includes('tags:')) {
        console.log('  ⚠️  Frontmatter already contains tags, skipping...');
        return content;
      }
      
      // Add tags to existing frontmatter
      const updatedFrontmatter = existingFrontmatter + '\ntags:\n' + 
        tags.map(tag => `  - ${tag}`).join('\n');
      
      return `---\n${updatedFrontmatter}\n---\n\n${bodyContent}`;
    }
  }
  
  // Create new frontmatter
  const frontmatter = [
    '---',
    existingTitle ? `title: ${existingTitle}` : '',
    'tags:',
    ...tags.map(tag => `  - ${tag}`),
    '---',
    ''
  ].filter(line => line !== '').join('\n');
  
  return frontmatter + content;
}

function extractTitleFromContent(content) {
  // Try to extract title from first H1
  const h1Match = content.match(/^#\s+(.+)$/m);
  return h1Match ? h1Match[1] : null;
}

function migrateFile(filePath) {
  console.log(`📄 Processing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const pills = extractPillsFromContent(content);
  
  if (pills.length === 0) {
    console.log('  ✅ No pills found, skipping...');
    return;
  }
  
  console.log(`  🏷️  Found pills: ${pills.join(', ')}`);
  
  // Remove pills from content
  let newContent = removePillsFromContent(content);
  
  // Extract title for better frontmatter
  const title = extractTitleFromContent(newContent);
  
  // Add frontmatter with tags
  newContent = addFrontmatterToContent(newContent, pills, title);
  
  // Write back to file
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('  ✅ Migration complete!');
}

function main() {
  console.log('🚀 Starting migration from HTML pills to frontmatter tags...\n');
  
  // Find all markdown files
  const markdownFiles = glob.sync('docs/**/*.md', { cwd: process.cwd() });
  
  if (markdownFiles.length === 0) {
    console.log('❌ No markdown files found in docs/ directory');
    return;
  }
  
  console.log(`📁 Found ${markdownFiles.length} markdown files to process\n`);
  
  markdownFiles.forEach(migrateFile);
  
  console.log('\n🎉 Migration complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the changes with: git diff');
  console.log('2. Test your site locally: mkdocs serve');
  console.log('3. Update your dochub integration to use the new tag-based system');
}

if (require.main === module) {
  main();
} 