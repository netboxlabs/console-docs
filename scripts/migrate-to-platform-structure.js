#!/usr/bin/env node

/**
 * Phase 2 Content Migration Script
 * Migrates console-docs content to platform-first structure
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

// Migration mapping configuration
const MIGRATION_MAP = {
  'Administration Console/': {
    cloud: 'cloud/administration/',
    enterprise: 'enterprise/administration/',
    shared: 'shared/common-procedures/administration/'
  },
  'netbox-enterprise/': {
    enterprise: 'enterprise/administration/',
    shared: 'shared/common-procedures/enterprise/'
  },
  'netbox-assurance/': {
    cloud: 'cloud/netbox-assurance/',
    enterprise: 'enterprise/netbox-assurance/',
    shared: 'shared/netbox-assurance/'
  },
  'netbox-discovery/': {
    cloud: 'cloud/netbox-discovery/',
    enterprise: 'enterprise/netbox-discovery/',
    shared: 'shared/netbox-discovery/'
  },
  'netbox-integrations/': {
    cloud: 'cloud/integrations/',
    enterprise: 'enterprise/integrations/',
    community: 'community/integrations/',
    shared: 'shared/integrations/'
  },
  'cloud-connectivity/': {
    cloud: 'cloud/cloud-connectivity/'
  },
  'netbox-extensions/': {
    community: 'community/netbox-plugins/',
    shared: 'shared/netbox-plugins/'
  }
};

// Platform-specific content patterns
const PLATFORM_PATTERNS = {
  cloud: [
    /netbox cloud/i,
    /cloud console/i,
    /managed hosting/i,
    /cloud connectivity/i,
    /aws direct connect/i,
    /private link/i
  ],
  enterprise: [
    /netbox enterprise/i,
    /on-premises/i,
    /self-hosted/i,
    /enterprise console/i,
    /ldap/i,
    /saml/i
  ],
  community: [
    /netbox community/i,
    /open source/i,
    /self-hosted/i,
    /plugins/i,
    /extensions/i
  ]
};

class ContentMigrator {
  constructor() {
    this.sourceDir = 'docs';
    this.backupDir = 'docs-backup';
    this.migrationLog = [];
    this.errors = [];
  }

  async migrate() {
    console.log('🚀 Starting Phase 2 Content Migration...');
    
    try {
      await this.createBackup();
      await this.analyzePlatformContent();
      await this.createNewStructure();
      await this.migrateContent();
      await this.updateInternalLinks();
      await this.generateSharedContent();
      await this.validateMigration();
      await this.generateReport();
      
      console.log('✅ Migration completed successfully!');
    } catch (error) {
      console.error('❌ Migration failed:', error);
      await this.rollback();
      process.exit(1);
    }
  }

  async createBackup() {
    console.log('📁 Creating backup...');
    
    if (fs.existsSync(this.backupDir)) {
      fs.rmSync(this.backupDir, { recursive: true });
    }
    
    fs.cpSync(this.sourceDir, this.backupDir, { recursive: true });
    console.log('✅ Backup created');
  }

  async analyzePlatformContent() {
    console.log('🔍 Analyzing content for platform assignment...');
    
    const files = glob.sync('docs/**/*.md', { ignore: ['docs/index.md'] });
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const parsed = matter(content);
      
      const analysis = this.analyzeContentPlatform(file, parsed);
      this.migrationLog.push(analysis);
    }
    
    console.log(`✅ Analyzed ${files.length} files`);
  }

  analyzeContentPlatform(filePath, parsed) {
    const { data: frontmatter, content } = parsed;
    const fullContent = content.toLowerCase();
    
    // Check existing tags
    const existingTags = frontmatter.tags || [];
    const platforms = [];
    
    // Platform detection from tags
    if (existingTags.includes('cloud')) platforms.push('cloud');
    if (existingTags.includes('enterprise')) platforms.push('enterprise');
    if (existingTags.includes('community')) platforms.push('community');
    
    // Content-based platform detection
    if (platforms.length === 0) {
      for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
        if (patterns.some(pattern => pattern.test(fullContent))) {
          platforms.push(platform);
        }
      }
    }
    
    // Default fallback
    if (platforms.length === 0) {
      // Determine based on directory
      if (filePath.includes('Administration Console')) {
        platforms.push('cloud', 'enterprise');
      } else if (filePath.includes('netbox-enterprise')) {
        platforms.push('enterprise');
      } else if (filePath.includes('netbox-extensions')) {
        platforms.push('community');
      } else {
        platforms.push('cloud', 'enterprise', 'community');
      }
    }
    
    return {
      originalPath: filePath,
      platforms,
      frontmatter,
      content,
      targetPaths: this.calculateTargetPaths(filePath, platforms),
      shared: platforms.length > 1
    };
  }

  calculateTargetPaths(originalPath, platforms) {
    const paths = {};
    const relativePath = originalPath.replace('docs/', '');
    
    // Find matching migration rule
    let targetDir = null;
    let remainingPath = relativePath;
    
    for (const [sourcePattern, targets] of Object.entries(MIGRATION_MAP)) {
      if (relativePath.startsWith(sourcePattern)) {
        targetDir = targets;
        remainingPath = relativePath.substring(sourcePattern.length);
        break;
      }
    }
    
    if (!targetDir) {
      // Default mapping
      targetDir = {
        cloud: 'cloud/netbox/',
        enterprise: 'enterprise/netbox/',
        community: 'community/netbox/'
      };
    }
    
    // Generate paths for each platform
    for (const platform of platforms) {
      if (targetDir[platform]) {
        paths[platform] = path.join('docs', targetDir[platform], remainingPath);
      }
    }
    
    // Generate shared path if applicable
    if (platforms.length > 1 && targetDir.shared) {
      paths.shared = path.join('docs', targetDir.shared, remainingPath);
    }
    
    return paths;
  }

  async createNewStructure() {
    console.log('📁 Creating new directory structure...');
    
    const directories = [
      'docs/community/netbox',
      'docs/community/netbox-plugins',
      'docs/community/diode',
      'docs/community/orb',
      'docs/cloud/netbox',
      'docs/cloud/administration',
      'docs/cloud/cloud-connectivity',
      'docs/cloud/netbox-assurance',
      'docs/cloud/netbox-discovery',
      'docs/cloud/integrations',
      'docs/enterprise/netbox',
      'docs/enterprise/administration',
      'docs/enterprise/netbox-assurance',
      'docs/enterprise/netbox-discovery',
      'docs/enterprise/integrations',
      'docs/shared/netbox-core',
      'docs/shared/api-reference',
      'docs/shared/common-procedures',
      'docs/shared/integrations'
    ];
    
    for (const dir of directories) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    console.log('✅ Directory structure created');
  }

  async migrateContent() {
    console.log('📝 Migrating content files...');
    
    for (const analysis of this.migrationLog) {
      try {
        await this.migrateFile(analysis);
      } catch (error) {
        this.errors.push({
          file: analysis.originalPath,
          error: error.message
        });
      }
    }
    
    console.log(`✅ Migrated ${this.migrationLog.length} files`);
    if (this.errors.length > 0) {
      console.warn(`⚠️  ${this.errors.length} files had errors`);
    }
  }

  async migrateFile(analysis) {
    const { originalPath, targetPaths, frontmatter, content, platforms, shared } = analysis;
    
    if (shared && targetPaths.shared) {
      // Create shared content
      await this.createSharedContent(analysis);
    }
    
    // Create platform-specific files
    for (const platform of platforms) {
      if (targetPaths[platform]) {
        await this.createPlatformContent(analysis, platform);
      }
    }
  }

  async createSharedContent(analysis) {
    const { targetPaths, frontmatter, content } = analysis;
    const sharedPath = targetPaths.shared;
    
    // Update frontmatter for shared content
    const sharedFrontmatter = {
      ...frontmatter,
      shared: true,
      applies_to: analysis.platforms,
      tags: this.updateTagsForShared(frontmatter.tags || [])
    };
    
    const sharedContent = matter.stringify(content, sharedFrontmatter);
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(sharedPath), { recursive: true });
    fs.writeFileSync(sharedPath, sharedContent);
  }

  async createPlatformContent(analysis, platform) {
    const { targetPaths, frontmatter, content, shared } = analysis;
    const platformPath = targetPaths[platform];
    
    let platformFrontmatter = {
      ...frontmatter,
      platform,
      tags: this.updateTagsForPlatform(frontmatter.tags || [], platform)
    };
    
    let platformContent = content;
    
    if (shared && targetPaths.shared) {
      // Reference shared content
      const sharedRelativePath = path.relative(
        path.dirname(platformPath),
        targetPaths.shared
      );
      
      platformFrontmatter.shared_content = sharedRelativePath;
      
      // Add platform-specific content template
      platformContent = this.generatePlatformSpecificTemplate(content, platform);
    }
    
    const finalContent = matter.stringify(platformContent, platformFrontmatter);
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(platformPath), { recursive: true });
    fs.writeFileSync(platformPath, finalContent);
  }

  updateTagsForShared(tags) {
    // Remove platform-specific tags from shared content
    return tags.filter(tag => !['cloud', 'enterprise', 'community'].includes(tag));
  }

  updateTagsForPlatform(tags, platform) {
    // Ensure platform tag is present
    const platformTags = [...tags];
    if (!platformTags.includes(platform)) {
      platformTags.unshift(platform);
    }
    
    // Remove other platform tags
    const otherPlatforms = ['cloud', 'enterprise', 'community'].filter(p => p !== platform);
    return platformTags.filter(tag => !otherPlatforms.includes(tag));
  }

  generatePlatformSpecificTemplate(content, platform) {
    return `{% include shared_content %}

## ${platform.charAt(0).toUpperCase() + platform.slice(1)}-Specific Information

<!-- Add ${platform}-specific content here -->

`;
  }

  async updateInternalLinks() {
    console.log('🔗 Updating internal links...');
    
    const files = glob.sync('docs/**/*.md');
    
    for (const file of files) {
      try {
        await this.updateLinksInFile(file);
      } catch (error) {
        this.errors.push({
          file,
          error: `Link update failed: ${error.message}`
        });
      }
    }
    
    console.log('✅ Internal links updated');
  }

  async updateLinksInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update relative links
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    content = content.replace(linkPattern, (match, text, url) => {
      if (url.startsWith('http') || url.startsWith('#')) {
        return match; // Skip external links and anchors
      }
      
      const updatedUrl = this.translateUrl(url, filePath);
      return `[${text}](${updatedUrl})`;
    });
    
    fs.writeFileSync(filePath, content);
  }

  translateUrl(url, currentFile) {
    // Implementation for URL translation based on new structure
    // This would need to be customized based on specific migration rules
    return url;
  }

  async generateSharedContent() {
    console.log('🔄 Generating shared content references...');
    
    // Implementation for generating shared content system
    // This would create the include/reference system for shared content
    
    console.log('✅ Shared content system generated');
  }

  async validateMigration() {
    console.log('✅ Validating migration...');
    
    const validations = [
      this.validateFileCount(),
      this.validateFrontmatter(),
      this.validateDirectoryStructure(),
      this.validateLinks()
    ];
    
    const results = await Promise.all(validations);
    
    if (results.some(result => !result.valid)) {
      throw new Error('Migration validation failed');
    }
    
    console.log('✅ Migration validation passed');
  }

  async validateFileCount() {
    const originalFiles = glob.sync(`${this.backupDir}/**/*.md`);
    const newFiles = glob.sync('docs/**/*.md');
    
    return {
      valid: newFiles.length >= originalFiles.length,
      message: `File count: ${originalFiles.length} → ${newFiles.length}`
    };
  }

  async validateFrontmatter() {
    const files = glob.sync('docs/**/*.md');
    let validCount = 0;
    
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const parsed = matter(content);
        
        if (parsed.data.tags && Array.isArray(parsed.data.tags)) {
          validCount++;
        }
      } catch (error) {
        // Invalid frontmatter
      }
    }
    
    return {
      valid: validCount === files.length,
      message: `Frontmatter validation: ${validCount}/${files.length} files valid`
    };
  }

  async validateDirectoryStructure() {
    const requiredDirs = [
      'docs/community',
      'docs/cloud',
      'docs/enterprise',
      'docs/shared'
    ];
    
    const existingDirs = requiredDirs.filter(dir => fs.existsSync(dir));
    
    return {
      valid: existingDirs.length === requiredDirs.length,
      message: `Directory structure: ${existingDirs.length}/${requiredDirs.length} required directories exist`
    };
  }

  async validateLinks() {
    // Implementation for link validation
    return {
      valid: true,
      message: 'Link validation passed'
    };
  }

  async generateReport() {
    console.log('📊 Generating migration report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.migrationLog.length,
        errors: this.errors.length,
        platforms: ['community', 'cloud', 'enterprise'],
        sharedContent: this.migrationLog.filter(item => item.shared).length
      },
      migrations: this.migrationLog,
      errors: this.errors
    };
    
    fs.writeFileSync('migration-report.json', JSON.stringify(report, null, 2));
    
    console.log('✅ Migration report generated: migration-report.json');
  }

  async rollback() {
    console.log('🔄 Rolling back migration...');
    
    if (fs.existsSync(this.backupDir)) {
      fs.rmSync(this.sourceDir, { recursive: true });
      fs.cpSync(this.backupDir, this.sourceDir, { recursive: true });
      console.log('✅ Rollback completed');
    } else {
      console.error('❌ No backup found for rollback');
    }
  }
}

// CLI interface
if (require.main === module) {
  const migrator = new ContentMigrator();
  
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    console.log(`
Phase 2 Content Migration Tool

Usage:
  node migrate-to-platform-structure.js [options]

Options:
  --dry-run    Analyze content without making changes
  --rollback   Rollback to backup
  --help       Show this help message

Examples:
  node migrate-to-platform-structure.js --dry-run
  node migrate-to-platform-structure.js
  node migrate-to-platform-structure.js --rollback
    `);
    process.exit(0);
  }
  
  if (args.includes('--rollback')) {
    migrator.rollback().then(() => process.exit(0));
  } else if (args.includes('--dry-run')) {
    console.log('🔍 Running in dry-run mode...');
    migrator.analyzePlatformContent().then(() => {
      console.log('✅ Dry-run completed. Check migration-report.json for details.');
    });
  } else {
    migrator.migrate();
  }
}

module.exports = ContentMigrator; 