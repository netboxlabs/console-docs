#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Comprehensive semantic tag mapping based on content analysis
const SEMANTIC_TAG_RULES = {
  // Product-specific tags based on file paths
  productTags: {
    'cloud': [
      '/Administration Console/',
      '/NetBox Cloud/',
      'cloud.netboxapp.com',
      'NetBox Cloud',
      'cloud-specific'
    ],
    'enterprise': [
      '/netbox-enterprise/',
      'NetBox Enterprise',
      'enterprise-specific',
      'on-premises',
      'self-hosted'
    ],
    'discovery': [
      '/netbox-discovery/',
      'NetBox Discovery',
      'device discovery',
      'network discovery',
      'discovery agent'
    ],
    'assurance': [
      '/netbox-assurance/',
      'NetBox Assurance',
      'network monitoring',
      'assurance',
      'monitoring workflows'
    ],
    'operator': [
      '/netbox-operator/',
      'NetBox Operator',
      'AI-powered',
      'agentic AI',
      'semantic map'
    ],
    'netbox': [
      'NetBox',
      'core NetBox',
      'NetBox features',
      'NetBox functionality'
    ]
  },

  // Authentication & Security tags
  authSecurityTags: {
    'authentication': [
      'authentication',
      'auth',
      'login',
      'user authentication',
      'identity management'
    ],
    'sso': [
      'single sign-on',
      'SSO',
      'OIDC',
      'OAuth',
      'federated authentication'
    ],
    'ldap': [
      'LDAP',
      'Active Directory',
      'directory services',
      'AUTH_LDAP',
      'ldap.OPT_REFERRALS'
    ],
    'saml': [
      'SAML',
      'SAML_SP_',
      'SOCIAL_AUTH_SAML',
      'x509cert',
      'Identity Provider',
      'IdP'
    ],
    'permissions': [
      'permissions',
      'access control',
      'user permissions',
      'group permissions',
      'authorization'
    ],
    'rbac': [
      'role-based',
      'RBAC',
      'group mapping',
      'user groups',
      'group memberships'
    ],
    'security': [
      'security',
      'secure',
      'encryption',
      'certificate',
      'TLS',
      'SSL'
    ],
    'two-factor': [
      'two-factor',
      '2FA',
      'multi-factor',
      'MFA',
      'authentication factors'
    ]
  },

  // Database & Operations tags
  databaseOpsTags: {
    'database': [
      'database',
      'DB',
      'PostgreSQL',
      'MySQL',
      'database management'
    ],
    'backup': [
      'backup',
      'restore',
      'backup and restore',
      'data backup',
      'database backup'
    ],
    'migration': [
      'migration',
      'migrate',
      'data migration',
      'migrating to',
      'transfer'
    ],
    'upgrade': [
      'upgrade',
      'upgrading',
      'version upgrade',
      'update',
      'updating'
    ],
    'monitoring': [
      'monitoring',
      'monitor',
      'health check',
      'system monitoring',
      'performance monitoring'
    ],
    'notifications': [
      'notifications',
      'notify',
      'alerts',
      'messaging',
      'email notifications'
    ],
    'alerting': [
      'alerting',
      'alert',
      'alarm',
      'alert configuration',
      'alert management'
    ],
    'logging': [
      'logging',
      'logs',
      'audit',
      'audit trail',
      'log management'
    ]
  },

  // APIs & Integration tags
  apiIntegrationTags: {
    'rest-api': [
      'REST API',
      'API',
      'REST',
      'HTTP API',
      'API endpoints'
    ],
    'graphql': [
      'GraphQL',
      'GraphQL API',
      'GraphQL queries',
      'GraphQL schema'
    ],
    'webhooks': [
      'webhooks',
      'webhook',
      'event handling',
      'HTTP callbacks',
      'webhook configuration'
    ],
    'automation': [
      'automation',
      'automated',
      'scripting',
      'workflow automation',
      'API automation'
    ]
  },

  // Cloud Infrastructure tags
  cloudInfraTags: {
    'cloud-connectivity': [
      'cloud connectivity',
      'cloud connection',
      'AWS',
      'Azure',
      'GCP',
      'Direct Connect',
      'Private Link'
    ],
    'networking': [
      'networking',
      'network',
      'VPN',
      'IPsec',
      'network configuration'
    ],
    'infrastructure': [
      'infrastructure',
      'deployment',
      'setup',
      'installation',
      'configuration'
    ],
    'connectivity': [
      'connectivity',
      'connection',
      'network connectivity',
      'internet delivery'
    ]
  },

  // Content Type tags
  contentTypeTags: {
    'getting-started': [
      'getting started',
      'quick start',
      'quickstart',
      'introduction',
      'overview'
    ],
    'installation': [
      'installation',
      'install',
      'setup',
      'deployment',
      'requirements'
    ],
    'configuration': [
      'configuration',
      'configure',
      'config',
      'settings',
      'setup'
    ],
    'administration': [
      'administration',
      'admin',
      'management',
      'administrative',
      'admin console'
    ],
    'troubleshooting': [
      'troubleshooting',
      'troubleshoot',
      'problem',
      'issue',
      'error',
      'debugging'
    ]
  },

  // Cross-cutting topic tags
  crossCuttingTags: {
    'high-availability': [
      'high availability',
      'HA',
      'failover',
      'redundancy',
      'clustering'
    ],
    'performance': [
      'performance',
      'optimization',
      'tuning',
      'performance tuning',
      'scalability'
    ],
    'compliance': [
      'compliance',
      'regulatory',
      'audit',
      'governance',
      'standards'
    ],
    'integration': [
      'integration',
      'integrate',
      'third-party',
      'connector',
      'plugin'
    ]
  }
};

// File path-based tagging rules
const PATH_BASED_TAGS = {
  'Administration Console': ['cloud', 'administration', 'configuration'],
  'NetBox Cloud': ['cloud', 'getting-started'],
  'netbox-enterprise': ['enterprise', 'installation', 'configuration'],
  'netbox-discovery': ['discovery', 'networking'],
  'netbox-assurance': ['assurance', 'monitoring'],
  'netbox-operator': ['operator', 'automation'],
  'cloud-connectivity': ['cloud-connectivity', 'networking', 'infrastructure'],
  'netbox-integrations': ['integration', 'automation'],
  'netbox-extensions': ['integration', 'automation'],
  'sdks': ['rest-api', 'automation', 'integration']
};

// Content analysis patterns
const CONTENT_PATTERNS = {
  // SSO patterns
  sso: /single sign-on|SSO|OIDC|OAuth|federated/i,
  saml: /SAML|SOCIAL_AUTH_SAML|x509cert|Identity Provider|IdP/i,
  ldap: /LDAP|Active Directory|AUTH_LDAP|directory services/i,
  
  // Security patterns
  authentication: /authentication|auth|login|user authentication/i,
  security: /security|secure|encryption|certificate|TLS|SSL/i,
  permissions: /permissions|access control|authorization|group mapping/i,
  
  // Database patterns
  database: /database|DB|PostgreSQL|MySQL|database management/i,
  backup: /backup|restore|data backup|database backup/i,
  
  // API patterns
  restApi: /REST API|API|HTTP API|API endpoints/i,
  automation: /automation|automated|scripting|workflow/i,
  
  // Cloud patterns
  cloudConnectivity: /cloud connectivity|AWS|Azure|GCP|Direct Connect|Private Link/i,
  networking: /networking|network|VPN|IPsec/i,
  
  // Content type patterns
  gettingStarted: /getting started|quick start|quickstart|introduction|overview/i,
  installation: /installation|install|setup|deployment|requirements/i,
  configuration: /configuration|configure|config|settings/i,
  troubleshooting: /troubleshooting|troubleshoot|problem|issue|error|debugging/i
};

/**
 * Analyze file content and path to determine appropriate semantic tags
 */
function analyzeContentForTags(filePath, content) {
  const tags = new Set();
  const fileName = path.basename(filePath, '.md');
  const fullPath = filePath;
  const lowerContent = content.toLowerCase();
  const lowerPath = fullPath.toLowerCase();

  // Add path-based tags
  for (const [pathPattern, pathTags] of Object.entries(PATH_BASED_TAGS)) {
    if (fullPath.includes(pathPattern)) {
      pathTags.forEach(tag => tags.add(tag));
    }
  }

  // Add content-based tags using comprehensive rules
  const allTagRules = {
    ...SEMANTIC_TAG_RULES.productTags,
    ...SEMANTIC_TAG_RULES.authSecurityTags,
    ...SEMANTIC_TAG_RULES.databaseOpsTags,
    ...SEMANTIC_TAG_RULES.apiIntegrationTags,
    ...SEMANTIC_TAG_RULES.cloudInfraTags,
    ...SEMANTIC_TAG_RULES.contentTypeTags,
    ...SEMANTIC_TAG_RULES.crossCuttingTags
  };

  for (const [tag, patterns] of Object.entries(allTagRules)) {
    for (const pattern of patterns) {
      if (lowerContent.includes(pattern.toLowerCase()) || 
          lowerPath.includes(pattern.toLowerCase())) {
        tags.add(tag);
        break;
      }
    }
  }

  // Apply content pattern matching
  for (const [tagName, pattern] of Object.entries(CONTENT_PATTERNS)) {
    if (pattern.test(content) || pattern.test(fullPath)) {
      // Map pattern names to actual tag names
      const tagMapping = {
        sso: 'sso',
        saml: 'saml',
        ldap: 'ldap',
        authentication: 'authentication',
        security: 'security',
        permissions: 'permissions',
        database: 'database',
        backup: 'backup',
        restApi: 'rest-api',
        automation: 'automation',
        cloudConnectivity: 'cloud-connectivity',
        networking: 'networking',
        gettingStarted: 'getting-started',
        installation: 'installation',
        configuration: 'configuration',
        troubleshooting: 'troubleshooting'
      };
      
      if (tagMapping[tagName]) {
        tags.add(tagMapping[tagName]);
      }
    }
  }

  // Special handling for specific file patterns
  if (fileName.includes('sso') || fileName.includes('SSO')) {
    tags.add('sso');
    tags.add('authentication');
  }
  
  if (fileName.includes('saml') || fileName.includes('SAML')) {
    tags.add('saml');
    tags.add('sso');
    tags.add('authentication');
  }
  
  if (fileName.includes('ldap') || fileName.includes('LDAP')) {
    tags.add('ldap');
    tags.add('authentication');
  }
  
  if (fileName.includes('group') && fileName.includes('map')) {
    tags.add('rbac');
    tags.add('permissions');
  }

  if (fileName.includes('backup')) {
    tags.add('backup');
    tags.add('database');
  }

  if (fileName.includes('upgrade') || fileName.includes('upgrading')) {
    tags.add('upgrade');
    tags.add('administration');
  }

  return Array.from(tags);
}

/**
 * Process a single markdown file to add semantic tags
 */
function processMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    
    // Get existing tags
    const existingTags = parsed.data.tags || [];
    
    // Analyze content for new tags
    const suggestedTags = analyzeContentForTags(filePath, content);
    
    // Merge tags, preserving existing ones
    const allTags = [...new Set([...existingTags, ...suggestedTags])];
    
    // Only update if we have new tags to add
    if (allTags.length > existingTags.length) {
      parsed.data.tags = allTags;
      
      // Preserve other frontmatter fields
      if (!parsed.data.title && parsed.content) {
        // Extract title from first heading if not present
        const titleMatch = parsed.content.match(/^#\s+(.+)$/m);
        if (titleMatch) {
          parsed.data.title = titleMatch[1];
        }
      }
      
      // Add semantic metadata
      if (!parsed.data.last_updated) {
        parsed.data.last_updated = new Date().toISOString().split('T')[0];
      }
      
      // Write back to file
      const updatedContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, updatedContent);
      
      console.log(`✅ Updated ${filePath}`);
      console.log(`   Added tags: ${suggestedTags.filter(tag => !existingTags.includes(tag)).join(', ')}`);
      console.log(`   Total tags: ${allTags.length}`);
      
      return {
        file: filePath,
        addedTags: suggestedTags.filter(tag => !existingTags.includes(tag)),
        totalTags: allTags.length
      };
    } else {
      console.log(`⏭️  Skipped ${filePath} (no new tags)`);
      return null;
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Recursively find all markdown files in a directory
 */
function findMarkdownFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir);
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip certain directories
        if (!['node_modules', '.git', 'site', 'venv'].includes(entry)) {
          traverse(fullPath);
        }
      } else if (entry.endsWith('.md') && entry !== 'README.md') {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Main execution function
 */
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const docsDir = args.find(arg => !arg.startsWith('--')) || './docs';
  
  console.log('🏷️  NetBox Console Docs Semantic Tagging Tool');
  console.log('='.repeat(50));
  console.log(`📁 Scanning directory: ${docsDir}`);
  console.log(`🔍 Dry run mode: ${dryRun ? 'ON' : 'OFF'}`);
  console.log('');
  
  if (!fs.existsSync(docsDir)) {
    console.error(`❌ Directory ${docsDir} does not exist`);
    process.exit(1);
  }
  
  const markdownFiles = findMarkdownFiles(docsDir);
  console.log(`📄 Found ${markdownFiles.length} markdown files`);
  console.log('');
  
  const results = [];
  let processedCount = 0;
  let updatedCount = 0;
  
  for (const file of markdownFiles) {
    processedCount++;
    
    if (dryRun) {
      // In dry run mode, just analyze and report
      try {
        const content = fs.readFileSync(file, 'utf8');
        const parsed = matter(content);
        const existingTags = parsed.data.tags || [];
        const suggestedTags = analyzeContentForTags(file, content);
        const newTags = suggestedTags.filter(tag => !existingTags.includes(tag));
        
        if (newTags.length > 0) {
          console.log(`📋 ${file}`);
          console.log(`   Existing tags: ${existingTags.join(', ') || 'none'}`);
          console.log(`   Would add: ${newTags.join(', ')}`);
          console.log('');
          updatedCount++;
        }
      } catch (error) {
        console.error(`❌ Error analyzing ${file}:`, error.message);
      }
    } else {
      const result = processMarkdownFile(file);
      if (result) {
        results.push(result);
        updatedCount++;
      }
    }
  }
  
  console.log('');
  console.log('📊 Summary');
  console.log('='.repeat(30));
  console.log(`📄 Files processed: ${processedCount}`);
  console.log(`✅ Files ${dryRun ? 'would be updated' : 'updated'}: ${updatedCount}`);
  console.log(`⏭️  Files skipped: ${processedCount - updatedCount}`);
  
  if (!dryRun && results.length > 0) {
    console.log('');
    console.log('🏷️  Tag Summary');
    console.log('='.repeat(30));
    
    const tagCounts = {};
    results.forEach(result => {
      result.addedTags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([tag, count]) => {
        console.log(`${tag}: ${count} files`);
      });
  }
  
  console.log('');
  console.log(dryRun ? '🔍 Dry run complete!' : '✅ Semantic tagging complete!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  analyzeContentForTags,
  processMarkdownFile,
  SEMANTIC_TAG_RULES,
  CONTENT_PATTERNS
}; 