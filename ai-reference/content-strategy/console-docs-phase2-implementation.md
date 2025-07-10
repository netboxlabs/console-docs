---
title: "Phase 2: Console-Docs Coordination Implementation Plan"
description: "Implementation plan for reorganizing console-docs to match DocHub structure and implement content sharing"
tags:
  - console-docs
  - coordination
  - implementation
  - phase2
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-02"
category: "ai-reference"
audience: "developers"
complexity: "advanced"
internal_only: true
draft: true
---

# Phase 2: Console-Docs Coordination Implementation Plan

**Timeline**: 1-2 weeks after DocHub implementation  
**Scope**: Reorganize console-docs to match DocHub structure and implement content sharing  
**Dependencies**: DocHub Phase 1 complete with new navigation structure deployed

## Overview

Phase 2 transforms the `console-docs` repository to align with the new platform-first structure implemented in DocHub, establishing a synchronized content management system that maintains single-source-of-truth while supporting platform-specific customization.

## 🎯 Phase 2 Objectives

1. **Reorganize console-docs** to match DocHub platform-first structure
2. **Implement content sharing system** for common documentation
3. **Update build processes** to support new structure
4. **Sync with DocHub** content filtering and navigation
5. **Maintain content integrity** during transition

## 📋 Implementation Tasks

### Week 1: Repository Restructure

#### Day 1-2: Directory Reorganization
```bash
# Current structure
docs/
├── Administration Console/
├── netbox-enterprise/
├── netbox-assurance/
├── netbox-discovery/
└── netbox-integrations/

# New structure (matching DocHub)
docs/
├── community/
│   ├── netbox/
│   ├── netbox-plugins/
│   ├── diode/
│   └── orb/
├── cloud/
│   ├── netbox/
│   ├── administration/
│   ├── cloud-connectivity/
│   ├── netbox-assurance/
│   ├── netbox-discovery/
│   └── integrations/
├── enterprise/
│   ├── netbox/
│   ├── administration/
│   ├── netbox-assurance/
│   ├── netbox-discovery/
│   └── integrations/
└── shared/
    ├── netbox-core/
    ├── api-reference/
    └── common-procedures/
```

#### Day 3-4: Content Migration Scripts
```javascript
// scripts/migrate-to-platform-structure.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const MIGRATION_MAP = {
  'Administration Console/': {
    cloud: 'cloud/administration/',
    enterprise: 'enterprise/administration/'
  },
  'netbox-enterprise/': {
    enterprise: 'enterprise/administration/'
  },
  'netbox-assurance/': {
    cloud: 'cloud/netbox-assurance/',
    enterprise: 'enterprise/netbox-assurance/'
  },
  'netbox-discovery/': {
    cloud: 'cloud/netbox-discovery/',
    enterprise: 'enterprise/netbox-discovery/'
  }
};

function migrateContent() {
  // Implementation for content migration
  // - Parse frontmatter tags
  // - Determine target platform(s)
  // - Copy/move files to appropriate directories
  // - Update internal links
  // - Generate shared content references
}
```

#### Day 5-7: Content Sharing System
```markdown
<!-- shared/netbox-core/data-model.md -->
---
shared: true
applies_to: [community, cloud, enterprise]
title: NetBox Data Model
---

# NetBox Data Model
[Core content that applies to all platforms]

<!-- cloud/netbox/data-model.md -->
---
title: NetBox Data Model - Cloud
platform: cloud
shared_content: shared/netbox-core/data-model.md
---

{% include shared_content %}

## Cloud-Specific Considerations
[Cloud-specific additions]
```

### Week 2: Build Process and Sync Implementation

#### Day 8-10: Build Process Updates
```yaml
# .github/workflows/build-platform-docs.yml
name: Build Platform-Specific Documentation

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-community:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Community Docs
        run: |
          npm run build:community
          npm run validate:links
          
  build-cloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Cloud Docs
        run: |
          npm run build:cloud
          npm run validate:platform-specific
          
  build-enterprise:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Enterprise Docs
        run: |
          npm run build:enterprise
          npm run validate:platform-specific
```

#### Day 11-12: DocHub Sync Implementation
```javascript
// scripts/sync-with-dochub.js
const DOCHUB_API_BASE = 'https://api.dochub.netboxlabs.com';

class DocHubSync {
  async syncNavigation() {
    // Fetch DocHub navigation structure
    // Compare with console-docs structure
    // Report discrepancies
  }
  
  async syncContentFiltering() {
    // Ensure tag-based filtering matches DocHub
    // Validate platform-specific content visibility
  }
  
  async validateRedirects() {
    // Check that URL redirects are properly configured
    // Validate cross-platform links
  }
}
```

#### Day 13-14: Testing and Validation
```bash
# Testing scripts
npm run test:platform-structure
npm run test:content-sharing
npm run test:build-processes
npm run test:dochub-sync
```

## 🔧 Technical Implementation

### Content Sharing System

#### Shared Content Architecture
```
shared/
├── netbox-core/
│   ├── installation/
│   ├── configuration/
│   ├── api-reference/
│   └── data-model/
├── common-procedures/
│   ├── backup-restore/
│   ├── troubleshooting/
│   └── maintenance/
└── integrations/
    ├── ansible/
    ├── pyats/
    └── servicenow/
```

#### Platform-Specific Overrides
```markdown
<!-- Example: cloud/netbox/installation.md -->
---
title: NetBox Installation - Cloud
platform: cloud
shared_base: shared/netbox-core/installation/overview.md
overrides:
  - section: "Prerequisites"
    content: "cloud-specific-prerequisites.md"
  - section: "Installation Steps"
    content: "managed-installation.md"
---

{% include shared_base %}
{% override "Prerequisites" with overrides.prerequisites %}
{% override "Installation Steps" with overrides.installation %}

## Cloud-Specific Features
[Additional cloud-only content]
```

### Build Process Updates

#### Platform-Specific Builds
```json
{
  "scripts": {
    "build:community": "mkdocs build --config-file mkdocs-community.yml",
    "build:cloud": "mkdocs build --config-file mkdocs-cloud.yml", 
    "build:enterprise": "mkdocs build --config-file mkdocs-enterprise.yml",
    "build:all": "npm run build:community && npm run build:cloud && npm run build:enterprise",
    "sync:dochub": "node scripts/sync-with-dochub.js",
    "validate:structure": "node scripts/validate-platform-structure.js"
  }
}
```

#### MkDocs Configuration Updates
```yaml
# mkdocs-cloud.yml
site_name: NetBox Cloud Documentation
docs_dir: docs
nav:
  - Home: index.md
  - NetBox:
    - Overview: cloud/netbox/index.md
    - Installation: cloud/netbox/installation.md
    - Configuration: cloud/netbox/configuration.md
  - Administration:
    - Overview: cloud/administration/index.md
    - User Management: cloud/administration/users.md
    - SSO Setup: cloud/administration/sso/index.md
  - Cloud Connectivity:
    - Overview: cloud/cloud-connectivity/index.md
    - AWS Direct Connect: cloud/cloud-connectivity/aws-direct-connect.md
  - NetBox Assurance:
    - Overview: cloud/netbox-assurance/index.md
    - Quickstart: cloud/netbox-assurance/quickstart-guide.md

plugins:
  - platform-filter:
      platform: cloud
      include_shared: true
```

### DocHub Synchronization

#### Navigation Sync
```javascript
// scripts/validate-dochub-sync.js
class DocHubValidator {
  async validateNavigation() {
    const consoleDocsNav = await this.parseConsoleDocsNav();
    const docHubNav = await this.fetchDocHubNav();
    
    const discrepancies = this.compareStructures(consoleDocsNav, docHubNav);
    
    if (discrepancies.length > 0) {
      console.error('Navigation structure mismatch:', discrepancies);
      process.exit(1);
    }
  }
  
  async validateContentFiltering() {
    // Ensure tag-based filtering produces same results
    // Check platform-specific content visibility
    // Validate shared content inclusion
  }
}
```

#### Content Filtering Sync
```yaml
# Platform filtering configuration
platform_filters:
  community:
    include_tags: [community, netbox]
    exclude_tags: [cloud-only, enterprise-only]
  cloud:
    include_tags: [cloud, netbox, assurance, discovery]
    exclude_tags: [enterprise-only, airgap]
  enterprise:
    include_tags: [enterprise, netbox, assurance, discovery]
    exclude_tags: [cloud-only]
```

## 📊 Content Migration Strategy

### Migration Priorities

#### High Priority (Week 1)
1. **Administration Console** → Cloud/Enterprise Administration
2. **NetBox Enterprise** → Enterprise Administration
3. **Core navigation structure**

#### Medium Priority (Week 2)
1. **NetBox Assurance** → Cloud/Enterprise Assurance
2. **NetBox Discovery** → Cloud/Enterprise Discovery
3. **Integrations** → Platform-specific integrations

#### Low Priority (Post-Phase 2)
1. **Shared content optimization**
2. **Advanced filtering features**
3. **Performance optimizations**

### Content Mapping

#### Administration Console Migration
```
Current: docs/Administration Console/azure-ad-sso-setup.md
New: 
  - cloud/administration/security/sso/entra-id/setup.md
  - enterprise/administration/security/sso/entra-id/setup.md
Shared: shared/common-procedures/sso/entra-id-base.md
```

#### NetBox Enterprise Migration
```
Current: docs/netbox-enterprise/nbe-azure-sso.md
New: enterprise/administration/sso/entra-id/setup.md
Merge: With Administration Console content
```

### URL Redirects Implementation
```javascript
// redirects.js
const REDIRECTS = {
  '/Administration Console/azure-ad-sso-setup': [
    '/cloud/administration/security/sso/entra-id/setup',
    '/enterprise/administration/security/sso/entra-id/setup'
  ],
  '/netbox-enterprise/nbe-azure-sso': '/enterprise/administration/sso/entra-id/setup',
  '/netbox-assurance/quickstart-guide': [
    '/cloud/netbox-assurance/quickstart-guide',
    '/enterprise/netbox-assurance/quickstart-guide'
  ]
};
```

## 🔍 Quality Assurance

### Validation Checklist

#### Structure Validation
- [ ] All content migrated to correct platform directories
- [ ] Shared content properly referenced
- [ ] Platform-specific content correctly tagged
- [ ] Navigation structure matches DocHub

#### Content Validation
- [ ] All internal links updated
- [ ] Images and assets moved correctly
- [ ] Frontmatter tags updated
- [ ] Platform-specific content accurate

#### Build Validation
- [ ] All platform builds successful
- [ ] Content filtering working correctly
- [ ] Shared content inclusion functional
- [ ] DocHub sync operational

#### User Experience Validation
- [ ] Navigation intuitive for each platform
- [ ] Content easily discoverable
- [ ] Platform-specific features clearly marked
- [ ] Redirects working properly

## 📈 Success Metrics

### Technical Metrics
- **Build Success Rate**: 100% for all platforms
- **Link Validation**: 0 broken internal links
- **Content Coverage**: All original content migrated
- **Sync Accuracy**: 100% alignment with DocHub structure

### User Experience Metrics
- **Navigation Depth**: Average 3 clicks to content (target)
- **Platform Clarity**: Clear platform identification
- **Content Findability**: Improved search results
- **Load Performance**: <2s page load times

### Content Management Metrics
- **Content Duplication**: Reduced by 60% through sharing
- **Update Efficiency**: Single-point updates for shared content
- **Maintenance Overhead**: Reduced by 40%

## 🚀 Deployment Strategy

### Staging Deployment
1. **Deploy to staging environment**
2. **Run full validation suite**
3. **User acceptance testing**
4. **Performance testing**
5. **DocHub integration testing**

### Production Deployment
1. **Coordinate with DocHub team**
2. **Implement redirects first**
3. **Deploy new structure**
4. **Monitor for issues**
5. **Validate all functionality**

### Rollback Plan
1. **Automated rollback triggers**
2. **Backup of original structure**
3. **Quick restoration procedures**
4. **Communication plan**

## 📞 Coordination Requirements

### DocHub Team Coordination
- **Daily standups** during implementation
- **Shared validation environment**
- **Joint testing sessions**
- **Synchronized deployment**

### Stakeholder Communication
- **Progress updates** every 2 days
- **Issue escalation** within 4 hours
- **User communication** for any disruptions
- **Success metrics reporting**

---

This Phase 2 implementation will establish a robust, scalable documentation system that maintains content integrity while providing platform-specific user experiences aligned with DocHub's navigation structure. 