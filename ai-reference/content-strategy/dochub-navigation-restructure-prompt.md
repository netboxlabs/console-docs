---
title: "DocHub Navigation Restructure Implementation Prompt"
description: "Comprehensive instructions for implementing major navigation restructure from console-centric to platform-first organization"
tags:
  - dochub
  - navigation
  - restructure
  - implementation
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-02"
category: "ai-reference"
audience: "developers"
complexity: "advanced"
internal_only: true
draft: true
---

# DocHub Navigation Restructure Implementation Prompt

## Overview

This prompt provides the DocHub team with comprehensive instructions to implement the major navigation restructure for NetBox Labs documentation, transitioning from a console-centric structure to a platform-first organization (Community, Cloud, Enterprise).

## Repository Context
- **Source Repository**: `netboxlabs/console-docs`
- **Target Repository**: `netboxlabs/netboxlabs-website-dochub`
- **Current Branch**: `feat/navigation-restructure-and-docs-enhancement`
- **Implementation Date**: July 7, 2025
- **Timeline**: **2 weeks maximum** with parallel development and accelerated testing

## Major Changes Required

### 1. Navigation Structure Overhaul

#### **Current Structure (To Be Replaced)**
```
├── Administration Console/        # Console-centric organization
├── NetBox Cloud/                 # Mixed with console content
├── netbox-assurance/            # Scattered product sections
├── netbox-discovery/            # Fragmented organization
├── netbox-enterprise/           # Separate from related content
├── netbox-extensions/           # Plugin content isolated
├── netbox-integrations/         # Integration content separate
├── cloud-connectivity/          # Cloud features scattered
└── sdks/                        # To be removed
```

#### **New Structure (To Be Implemented)**
```
📁 Community/
├── NetBox/                      # Core NetBox documentation
│   ├── Features/                # All current NetBox features
│   ├── Getting Started/         # Installation, quickstart
│   ├── Customization/           # Plugins, custom fields
│   ├── Integrations/            # APIs, webhooks, third-party
│   ├── Data Model/              # Object types, relationships
│   ├── Reference/               # Configuration, troubleshooting
│   └── Release Notes/           # Version history
├── NetBox Plugins/
│   ├── Branching/               # From netbox-extensions/branching/*
│   ├── Diode/                   # From netbox-extensions/diode/*
│   └── Custom Objects/          # Future plugin documentation
├── Diode/
│   ├── Diode Server/            # Server installation and config
│   ├── Diode Python SDK/        # Python SDK documentation
│   └── Diode Go SDK/            # Go SDK documentation
└── Orb/
    └── Orb Agent/               # Orb agent documentation

📁 Cloud/
├── NetBox/                      # Duplicate Community/NetBox + Cloud-specific
├── Plugins/                     # Cloud-specific plugin management
├── Administration/              # FROM "Administration Console"
│   ├── Getting Started/
│   │   ├── Migrating to NetBox Cloud/
│   │   ├── Getting Console Access/
│   │   ├── Setting up 2FA/
│   │   ├── Retrieving Admin Credentials/
│   │   └── Adding Admin Users/
│   ├── Management/
│   │   ├── Database Backups/
│   │   ├── Upgrading NetBox/
│   │   ├── Managing Hostnames/
│   │   └── Viewing Installed Plugins/
│   ├── Security/
│   │   ├── Prefix Lists/
│   │   ├── Public IP Addressing/
│   │   └── Single Sign-On (SSO)/
│   │       ├── Entra ID/ (Microsoft Entra ID SSO + Group Mapping)
│   │       ├── Okta/ (Okta SSO + Group Mapping)
│   │       └── SAML/ (SAML SSO Setup + Group Mapping)
│   ├── Free Plan/ (Features + Add New User)
│   └── Maintenance/ (Scheduled Maintenance)
├── Cloud Connectivity/          # FROM "cloud-connectivity/*"
│   ├── Overview/
│   ├── Connection Types/
│   └── FAQ/
├── NetBox Assurance/           # FROM "netbox-assurance/*"
├── NetBox Discovery/           # FROM "netbox-discovery/*"
├── Integrations/               # FROM "netbox-integrations/*"
└── Product Lifecycle/          # FROM "product_feature_lifecycle.md"

📁 Enterprise/
├── NetBox/                     # Duplicate Community/NetBox + Enterprise-specific
├── Plugins/                    # Enterprise-specific plugin management
├── Administration/             # FROM "netbox-enterprise/*"
│   ├── Overview/
│   ├── Installation/
│   ├── Management/
│   ├── Single Sign-On (SSO)/
│   ├── Advanced Tools and Troubleshooting/
│   └── Release Notes/
├── NetBox Assurance/          # Same as Cloud/NetBox Assurance
├── NetBox Discovery/          # Same as Cloud/NetBox Discovery
├── Integrations/              # Same as Cloud/Integrations
└── Product Lifecycle/         # Same as Cloud/Product Lifecycle
```

### 2. Content Migration Strategy

#### **Shared Content (Community Base)**
The following content should be shared across all platforms:
- Core NetBox features documentation
- Data model documentation
- API reference documentation
- Basic configuration guides

#### **Platform-Specific Content**
Content that varies by platform:
- Installation procedures
- Administration methods
- SSO configuration
- Backup procedures
- Plugin management

#### **Content Duplication Approach**
Implement one of these strategies:

**Option A: Content Includes (Recommended)**
```javascript
// In Cloud/NetBox/Features/index.md
import SharedContent from '@site/src/shared/netbox-features-core.mdx';

export default function CloudNetBoxFeatures() {
  return (
    <div>
      <h1>NetBox Features - Cloud</h1>
      <SharedContent />
      <h2>Cloud-Specific Features</h2>
      <ul>
        <li>Managed hosting</li>
        <li>Automatic backups</li>
        <li>Cloud connectivity options</li>
      </ul>
    </div>
  );
}
```

**Option B: Conditional Rendering**
```jsx
import PlatformContent from '@theme/PlatformContent';

<PlatformContent platforms={['community', 'cloud', 'enterprise']}>
  {/* Core content visible to all platforms */}
</PlatformContent>

<PlatformContent platforms={['cloud']}>
  {/* Cloud-specific content */}
</PlatformContent>

<PlatformContent platforms={['enterprise']}>
  {/* Enterprise-specific content */}
</PlatformContent>
```

### 3. URL Migration and Redirects

#### **Critical URL Mappings**
```javascript
// redirect-mappings.js
const redirectMappings = {
  // Administration Console → Cloud Administration
  '/Administration Console/azure-ad-sso-setup': '/cloud/administration/security/sso/entra-id/sso-setup',
  '/Administration Console/azure-group-mapping': '/cloud/administration/security/sso/entra-id/group-mapping',
  '/Administration Console/okta-sso-setup': '/cloud/administration/security/sso/okta/sso-setup',
  '/Administration Console/okta-group-mapping': '/cloud/administration/security/sso/okta/group-mapping',
  '/Administration Console/saml-sso-setup': '/cloud/administration/security/sso/saml/sso-setup',
  '/Administration Console/saml-group-map': '/cloud/administration/security/sso/saml/group-mapping',
  '/Administration Console/console-access': '/cloud/administration/getting-started/console-access',
  '/Administration Console/set_up_2fa': '/cloud/administration/getting-started/setting-up-2fa',
  '/Administration Console/working_with_database_backups': '/cloud/administration/management/database-backups',
  '/Administration Console/upgrading-nbc': '/cloud/administration/management/upgrading-netbox',
  '/Administration Console/managing-hostnames': '/cloud/administration/management/managing-hostnames',
  '/Administration Console/prefix-lists': '/cloud/administration/security/prefix-lists',
  '/Administration Console/free-plan-features': '/cloud/administration/free-plan/features',
  '/Administration Console/free-plan-new-user': '/cloud/administration/free-plan/add-new-user',

  // Enterprise Administration
  '/netbox-enterprise/nbe-azure-sso': '/enterprise/administration/sso/entra-id/sso-setup',
  '/netbox-enterprise/nbe-azure-group-mapping': '/enterprise/administration/sso/entra-id/group-mapping',
  '/netbox-enterprise/nbe-saml': '/enterprise/administration/sso/saml/sso-setup',
  '/netbox-enterprise/nbe-saml-group-map': '/enterprise/administration/sso/saml/group-mapping',
  '/netbox-enterprise/nbe-ldap': '/enterprise/administration/sso/ldap',
  '/netbox-enterprise/nbe-overview': '/enterprise/administration/overview',
  '/netbox-enterprise/nbe-ec-installation': '/enterprise/administration/installation',
  '/netbox-enterprise/nbe-backups': '/enterprise/administration/management/backups',

  // Cloud Connectivity
  '/cloud-connectivity/aws-direct-connect': '/cloud/cloud-connectivity/connection-types/aws-direct-connect',
  '/cloud-connectivity/aws-private-link': '/cloud/cloud-connectivity/connection-types/aws-private-link',
  '/cloud-connectivity/ipsec-vpn-tunnels': '/cloud/cloud-connectivity/connection-types/ipsec-vpn-tunnels',
  '/cloud-connectivity/do-i-need-cloud-connectivity': '/cloud/cloud-connectivity/overview/do-i-need-cloud-connectivity',
  '/cloud-connectivity/which-connectivity-option': '/cloud/cloud-connectivity/overview/which-option-is-right',

  // Product Sections (Duplicate to both Cloud and Enterprise)
  '/netbox-assurance/quickstart-guide': [
    '/cloud/netbox-assurance/quickstart-guide',
    '/enterprise/netbox-assurance/quickstart-guide'
  ],
  '/netbox-discovery/quickstart-guide': [
    '/cloud/netbox-discovery/quickstart-guide',
    '/enterprise/netbox-discovery/quickstart-guide'
  ],
  '/netbox-integrations/netbox-ansible-collection': [
    '/cloud/integrations/netbox-ansible-collection',
    '/enterprise/integrations/netbox-ansible-collection'
  ],

  // Extensions → Community Plugins
  '/netbox-extensions/branching/': '/community/netbox-plugins/branching/',
  '/netbox-extensions/diode/': '/community/netbox-plugins/diode/',

  // Remove SDKs (redirect to external documentation)
  '/sdks/pynetbox': 'https://pynetbox.readthedocs.io/',

  // Product Lifecycle
  '/product_feature_lifecycle': [
    '/cloud/product-lifecycle',
    '/enterprise/product-lifecycle'
  ]
};
```

### 4. Implementation Timeline (2 Weeks Maximum)

#### **Week 1: Infrastructure and Core Migration**
**Days 1-3: Rapid Setup**
1. **Set up new directory structure** in DocHub
2. **Implement platform detection** and content filtering components
3. **Create shared content system** (includes or components)
4. **Set up redirect mappings** and infrastructure

**Days 4-7: Parallel Content Migration**
1. **Migrate Administration Console** → Cloud/Administration (parallel with infrastructure)
2. **Migrate netbox-enterprise** → Enterprise/Administration
3. **Begin product sections** migration (Assurance, Discovery, Integrations)

#### **Week 2: Complete Migration and Launch**
**Days 8-10: Finish Migration**
1. **Complete product sections** migration
2. **Set up content duplication** for shared NetBox content
3. **Implement new sidebar structure**
4. **Test all redirects** and content filtering in parallel

**Days 11-14: Testing and Launch**
1. **Verify search functionality** with platform context
2. **User acceptance testing** (accelerated)
3. **Deploy to production** with monitoring
4. **Monitor performance** and gather immediate feedback

### 5. Success Metrics

#### **User Experience Metrics**
- **Reduced navigation depth**: Target 3 clicks maximum to find content
- **Platform clarity**: Users can immediately identify relevant content
- **Content discoverability**: Related content easily accessible
- **Search effectiveness**: Platform-specific search results

#### **Technical Metrics**
- **Page load performance**: Maintain current performance levels
- **Search performance**: Sub-second search results
- **Redirect success rate**: 100% of old URLs redirect correctly
- **Mobile responsiveness**: All new navigation works on mobile

#### **Content Management Metrics**
- **Reduced duplication**: Shared content managed in one place
- **Clear ownership**: Each section has clear platform ownership
- **Easier maintenance**: Updates propagate to all relevant platforms

## Critical Requirements for DocHub Team

### **Must-Have Features**
1. **Platform-aware navigation**: Content filtering based on platform context
2. **Shared content system**: Ability to include common content across platforms
3. **Comprehensive redirects**: All existing URLs must redirect correctly
4. **Search integration**: Platform context in search results
5. **Mobile optimization**: New navigation must work on all devices

### **Technical Specifications**
- **Framework**: Docusaurus v2+ with custom platform components
- **Performance**: Page load times under 3 seconds
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Proper meta tags and structured data
- **Analytics**: Track platform-specific usage patterns

### **Content Requirements**
- **Frontmatter compatibility**: Support for platform tags and metadata
- **Version management**: Handle multiple product versions
- **Asset management**: Proper handling of images and media files
- **Link validation**: Automated checking of internal links

This restructure will transform the NetBox Labs documentation from a fragmented, console-centric organization into a user-friendly, platform-first experience that matches how users actually think about and use NetBox products. 