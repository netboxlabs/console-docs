#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

// Edition tags (top-level pills)
const EDITION_TAGS = ['community', 'enterprise', 'cloud', 'airgap'];

// Product tags
const PRODUCT_TAGS = {
  netbox: /netbox/gi,  // Match any mention of NetBox (simplified)
  discovery: /discovery|network\s*discovery|device\s*discovery/gi,
  assurance: /assurance|operational\s*drift|deviation/gi,
  operator: /operator|ai.*operations|agentic\s*ai/gi
};

// Platform and deployment tags
const PLATFORM_TAGS = {
  kubernetes: /kubernetes|kubectl|k8s|pod|deployment|namespace/gi,
  helm: /helm\s*chart|helm\s*install|helm\s*deployment/gi
};

// Technical category tags
const TECHNICAL_TAGS = {
  api: /\bapi\b|rest\s*api|graphql|endpoint|\bsdk\b|software\s*development\s*kit|pynetbox|client\s*library/gi,
  authentication: /authentication|auth|login|signin|single\s*sign.?on|sso|saml|ldap|oauth|azure\s*ad|entra\s*id|security|encryption|certificate|tls|ssl|firewall|permissions|rbac|two.?factor/gi,
  administration: /administration|admin|manage|management|configuration|config|setting|parameter/gi,
  operations: /operations|monitoring|metric|alert|notification|backup|restore|snapshot|recovery|database|migration|migrate|transfer|move|upgrade|update|version|logging|audit/gi
};

// Content type tags
const CONTENT_TAGS = {
  installation: /installation|install|setup|deploy/gi,
  configuration: /configuration|config|setting|parameter|customize/gi,
  troubleshooting: /troubleshooting|debug|error|issue|problem/gi,
  'getting-started': /getting\s*started|quick\s*start|introduction|intro/gi
};

// Feature tags
const FEATURE_TAGS = {
  automation: /automation|workflow|automated|script|agentic/gi,
  networking: /networking|network|interface|routing|vlan|cloud\s*connectivity|aws|azure|gcp|vpc|direct\s*connect|connectivity/gi,
  integration: /integration|integrate|connector|third.?party|plugin|extension|add.?on/gi,
  ai: /\bai\b|artificial\s*intelligence|machine\s*learning|agentic/gi
};

// Directory-based edition rules
const DIRECTORY_EDITION_RULES = {
  'Administration Console': ['cloud'],
  'NetBox Cloud': ['cloud'],
  'cloud-connectivity': ['cloud'],
  'netbox-enterprise': ['enterprise'],
  'netbox-discovery': ['cloud', 'enterprise', 'community'],
  'netbox-assurance': ['cloud', 'enterprise'],
  'netbox-extensions': ['community', 'enterprise'],
  'netbox-operator': ['cloud', 'enterprise'],
  'sdks': ['cloud', 'enterprise', 'community'],
  'netbox-integrations': ['cloud', 'enterprise', 'community']
};

function analyzeContent(content, filePath) {
  const tags = new Set();
  const fileName = path.basename(filePath);
  const fullContent = content.toLowerCase();
  
  // Analyze product tags
  Object.entries(PRODUCT_TAGS).forEach(([tag, pattern]) => {
    if (pattern.test(content)) {
      tags.add(tag);
    }
  });
  
  // Analyze platform tags
  Object.entries(PLATFORM_TAGS).forEach(([tag, pattern]) => {
    if (pattern.test(content)) {
      tags.add(tag);
    }
  });
  
  // Analyze technical category tags
  Object.entries(TECHNICAL_TAGS).forEach(([tag, pattern]) => {
    if (pattern.test(content)) {
      tags.add(tag);
    }
  });
  
  // Analyze content type tags
  Object.entries(CONTENT_TAGS).forEach(([tag, pattern]) => {
    if (pattern.test(content)) {
      tags.add(tag);
    }
  });
  
  // Analyze feature tags
  Object.entries(FEATURE_TAGS).forEach(([tag, pattern]) => {
    if (pattern.test(content)) {
      tags.add(tag);
    }
  });
  
  // Path-based product inference
  const pathParts = filePath.split(path.sep);
  pathParts.forEach(part => {
    if (part.includes('discovery')) tags.add('discovery');
    if (part.includes('assurance')) tags.add('assurance');
    if (part.includes('operator')) tags.add('operator');
    if (part.includes('netbox') && !part.includes('-')) tags.add('netbox');
  });
  
  return Array.from(tags);
}

function determineEditionTags(filePath, content) {
  const pathParts = filePath.split(path.sep);
  const tags = new Set();
  
  // Check directory rules
  pathParts.forEach(part => {
    if (DIRECTORY_EDITION_RULES[part]) {
      DIRECTORY_EDITION_RULES[part].forEach(tag => tags.add(tag));
    }
  });
  
  // Content-based edition detection
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('netbox cloud') || 
      lowerContent.includes('administration console') ||
      filePath.includes('Administration Console')) {
    tags.add('cloud');
  }
  
  if (lowerContent.includes('netbox enterprise') || 
      lowerContent.includes('enterprise installer') ||
      filePath.includes('netbox-enterprise')) {
    tags.add('enterprise');
  }
  
  if (lowerContent.includes('community') || 
      lowerContent.includes('open source') ||
      filePath.includes('netbox-extensions')) {
    tags.add('community');
  }
  
  if (lowerContent.includes('air-gap') || 
      lowerContent.includes('airgap') || 
      lowerContent.includes('offline')) {
    tags.add('airgap');
  }
  
  // Default for discovery/assurance if no specific edition found
  if (tags.size === 0 && (filePath.includes('discovery') || filePath.includes('assurance'))) {
    return ['cloud', 'enterprise', 'community'];
  }
  
  // Default for SDK/integration docs
  if (tags.size === 0 && (filePath.includes('sdk') || filePath.includes('integration'))) {
    return ['cloud', 'enterprise', 'community'];
  }
  
  return Array.from(tags);
}

function addTagsToFile(filePath, editionTags, semanticTags) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    
    // Combine edition tags (first) with semantic tags
    const allTags = [...editionTags, ...semanticTags];
    
    // Remove duplicates while preserving order
    const uniqueTags = [...new Set(allTags)];
    
    // Update frontmatter
    parsed.data.tags = uniqueTags;
    
    // Ensure title exists
    if (!parsed.data.title) {
      parsed.data.title = extractTitleFromContent(parsed.content, filePath);
    }
    
    // Write back to file
    const updatedContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updatedContent);
    
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function extractTitleFromContent(content, filePath) {
  // Try to extract title from first H1
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  
  // Fallback to filename
  const fileName = path.basename(filePath, '.md');
  return fileName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    
    // Determine edition tags
    const editionTags = determineEditionTags(filePath, content);
    
    // Determine semantic tags
    const semanticTags = analyzeContent(content, filePath);
    
    // Apply tags
    const success = addTagsToFile(filePath, editionTags, semanticTags);
    
    if (success) {
      console.log(`✅ Updated: ${filePath}`);
      console.log(`   Edition tags: ${editionTags.join(', ')}`);
      console.log(`   Semantic tags: ${semanticTags.join(', ')}`);
    }
    
    return success;
  } catch (error) {
    console.error(`❌ Failed: ${filePath} - ${error.message}`);
    return false;
  }
}

function main() {
  const docsPattern = 'docs/**/*.md';
  const files = glob.sync(docsPattern);
  
  console.log(`Found ${files.length} markdown files to process\n`);
  
  let processed = 0;
  let updated = 0;
  
  files.forEach(file => {
    processed++;
    if (processFile(file)) {
      updated++;
    }
  });
  
  console.log(`\n📊 Processing complete:`);
  console.log(`   Files processed: ${processed}`);
  console.log(`   Files updated: ${updated}`);
  console.log(`   Files failed: ${processed - updated}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  analyzeContent,
  determineEditionTags,
  processFile
}; 