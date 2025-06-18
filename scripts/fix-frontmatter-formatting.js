#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all markdown files in docs directory
const files = glob.sync('docs/**/*.md', { 
  ignore: ['docs/images/**/*', 'docs/stylesheets/**/*'],
  nodir: true 
});

let fixedFiles = 0;
let totalFiles = 0;

files.forEach(filePath => {
  totalFiles++;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has frontmatter
    if (!content.startsWith('---')) {
      return;
    }
    
    // Find the closing --- of frontmatter
    const lines = content.split('\n');
    let frontmatterEndIndex = -1;
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '---' || lines[i].startsWith('---')) {
        // Handle both "---" on its own line and "---Content" on same line
        if (lines[i] === '---') {
          frontmatterEndIndex = i;
        } else if (lines[i].startsWith('---')) {
          // Content starts immediately after ---
          const contentAfterDashes = lines[i].substring(3);
          lines[i] = '---';
          lines.splice(i + 1, 0, '', contentAfterDashes);
          frontmatterEndIndex = i;
          fixedFiles++;
          console.log(`✅ Fixed: ${filePath} (content was on same line as closing ---)`);
          const fixedContent = lines.join('\n');
          fs.writeFileSync(filePath, fixedContent, 'utf8');
          return;
        }
        break;
      }
    }
    
    if (frontmatterEndIndex === -1) {
      return; // No closing frontmatter found
    }
    
    // Check if there's content immediately after the closing ---
    if (frontmatterEndIndex + 1 < lines.length && 
        lines[frontmatterEndIndex + 1] !== '' && 
        lines[frontmatterEndIndex + 1] !== undefined) {
      
      // Insert blank line after frontmatter
      lines.splice(frontmatterEndIndex + 1, 0, '');
      
      const fixedContent = lines.join('\n');
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      
      console.log(`✅ Fixed: ${filePath} (added blank line after frontmatter)`);
      fixedFiles++;
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Total files processed: ${totalFiles}`);
console.log(`   Files fixed: ${fixedFiles}`);
console.log(`   Files unchanged: ${totalFiles - fixedFiles}`);

if (fixedFiles > 0) {
  console.log(`\n✨ Fixed frontmatter formatting in ${fixedFiles} files!`);
  console.log(`   All files now have proper blank line after frontmatter closing ---`);
} else {
  console.log(`\n✅ All files already have proper frontmatter formatting!`);
} 