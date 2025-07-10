---
title: "Navigation Restructure Implementation Guide"
description: "Comprehensive navigation restructure guide transitioning from console-centric to platform-based organization"
tags:
  - navigation
  - restructure
  - implementation
  - platform-organization
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-02"
category: "ai-reference"
audience: "developers"
complexity: "advanced"
internal_only: true
draft: true
---

# Navigation Restructure Implementation Guide

## Overview

This document outlines the comprehensive navigation restructure for NetBox Labs documentation, transitioning from the current console-centric structure to a platform-based organization (Community, Cloud, Enterprise) with dedicated product sections.

## Current vs. Proposed Structure

### Current Structure Issues
- **Console-centric**: Most content buried under "Administration Console"
- **Platform confusion**: Cloud and Enterprise features mixed together
- **Product fragmentation**: Discovery, Assurance scattered across different sections
- **User journey problems**: Hard to find content based on deployment type

### Proposed Structure Benefits
- **Platform-first**: Clear separation by Community, Cloud, Enterprise
- **Product clarity**: Dedicated sections for Discovery, Assurance, Integrations
- **User-centric**: Navigation matches how users think about their deployments
- **Content duplication strategy**: Core NetBox content shared across platforms

## Detailed Navigation Structure

### 1. Community
```
Community/
├── NetBox/                           # Core NetBox documentation
│   ├── Features/                     # All current NetBox features
│   ├── Getting Started/              # Installation, quickstart
│   ├── Customization/                # Plugins, custom fields, etc.
│   ├── Integrations/                 # APIs, webhooks, third-party
│   ├── Data Model/                   # Object types, relationships
│   ├── Reference/                    # Configuration, troubleshooting
│   └── Release Notes/                # Version history
├── NetBox Plugins/
│   ├── Branching/                    # netbox-extensions/branching/*
│   ├── Diode/                        # netbox-extensions/diode/*
│   └── Custom Objects/               # Future plugin documentation
├── Diode/
│   ├── Diode Server/                 # Server installation and config
│   ├── Diode Python SDK/            # Python SDK documentation
│   └── Diode Go SDK/                 # Go SDK documentation
└── Orb/
    └── Orb Agent/                    # Orb agent documentation
```

### 2. Cloud
```
Cloud/
├── NetBox/                           # Duplicate Community/NetBox content
│   ├── Features/                     # Same as Community + Cloud-specific
│   ├── Getting Started/              # Cloud-specific getting started
│   ├── Customization/                # Cloud customization options
│   ├── Integrations/                 # Cloud-specific integrations
│   ├── Data Model/                   # Same as Community
│   ├── Reference/                    # Same as Community
│   └── Release Notes/                # Same as Community
├── Plugins/                          # Cloud-specific plugin management
│   ├── Branching/                    # Cloud branching features
│   ├── Change Management/            # Cloud change management
│   └── Diode/                        # Cloud Diode integration
├── Administration/                   # Current "Administration Console" content
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
│   │       ├── Entra ID/
│   │       │   ├── Microsoft Entra ID SSO/
│   │       │   └── Entra ID Group Mapping/
│   │       ├── Okta/
│   │       │   ├── Okta SSO/
│   │       │   └── Okta Group Mapping/
│   │       └── SAML/
│   │           ├── SAML SSO Setup/
│   │           └── SAML Group Mapping/
│   ├── Free Plan/
│   │   ├── Features/
│   │   └── Add a New User/
│   └── Maintenance/
│       └── Scheduled Maintenance/
├── Cloud Connectivity/               # Current cloud-connectivity/*
│   ├── Overview/
│   │   ├── Do I Need Cloud Connectivity?/
│   │   ├── Cloud Connectivity Options/
│   │   └── Which Option is Right for Me?/
│   ├── Connection Types/
│   │   ├── Internet Delivery (Single Region)/
│   │   ├── AWS Private Link (Single Region)/
│   │   ├── IPSEC VPN Tunnels (Single Region)/
│   │   ├── AWS Direct Connect (Single Region)/
│   │   └── AWS Direct Connect (Multi-Region)/
│   └── FAQ/
├── NetBox Assurance/                 # Current netbox-assurance/*
│   ├── Overview/
│   ├── Quickstart Guide/
│   ├── Using the UI/
│   └── Workflows/
│       ├── Configuration/
│       ├── Deviation Detection/
│       └── Remediation/
├── NetBox Discovery/                 # Current netbox-discovery/*
│   ├── Overview/
│   ├── Quickstart Guide/
│   └── Discovery Agent/
│       ├── Getting Started/
│       ├── Configuration/
│       ├── Network Discovery/
│       └── Device Discovery/
├── Integrations/                     # Current netbox-integrations/*
│   ├── NetBox Ansible Collection/
│   ├── pyATS/
│   └── ServiceNow/
└── Product Lifecycle/                # Current product_feature_lifecycle.md
```

### 3. Enterprise
```
Enterprise/
├── NetBox/                           # Duplicate Community/NetBox content
│   ├── Features/                     # Same as Community + Enterprise-specific
│   ├── Getting Started/              # Enterprise-specific getting started
│   ├── Customization/                # Enterprise customization options
│   ├── Integrations/                 # Enterprise-specific integrations
│   ├── Data Model/                   # Same as Community
│   ├── Reference/                    # Same as Community
│   └── Release Notes/                # Same as Community
├── Plugins/                          # Enterprise-specific plugin management
│   ├── Branching/                    # Enterprise branching features
│   ├── Change Management/            # Enterprise change management
│   └── Diode/                        # Enterprise Diode integration
├── Administration/                   # Current netbox-enterprise/* content
│   ├── Overview/
│   ├── Installation/
│   │   ├── NetBox Enterprise Installer/
│   │   ├── Requirements/
│   │   ├── Distribution Specific Requirements/
│   │   ├── RHEL/
│   │   ├── Linux System Changes/
│   │   └── Installation/
│   ├── Management/
│   │   ├── Migrating/
│   │   ├── Built-in Plugin Installation/
│   │   ├── Custom Plugin Installation/
│   │   ├── TLS and Ingress/
│   │   └── Backups/
│   ├── Single Sign-On (SSO)/
│   │   ├── Entra ID/
│   │   │   ├── Microsoft Entra ID SSO/
│   │   │   └── Entra ID Group Mapping/
│   │   └── LDAP/
│   ├── Advanced Tools and Troubleshooting/
│   └── Release Notes/
├── NetBox Assurance/                 # Same as Cloud/NetBox Assurance
├── NetBox Discovery/                 # Same as Cloud/NetBox Discovery
├── Integrations/                     # Same as Cloud/Integrations
└── Product Lifecycle/                # Same as Cloud/Product Lifecycle
```

## Implementation Strategy

### Phase 1: Infrastructure and Content Audit (Week 1 - Days 1-3)
1. **Rapid content audit**:
   - Map all current documentation files to new structure
   - Identify content that needs duplication vs. unique content
   - Create content mapping spreadsheet in parallel

2. **Infrastructure setup**:
   ```
   Current Path | New Path | Content Type | Action Required
   docs/Administration Console/azure-ad-sso-setup.md | Cloud/Administration/Security/SSO/Entra ID/SSO Setup | Cloud-specific | Move + tag
   docs/netbox-enterprise/nbe-azure-sso.md | Enterprise/Administration/SSO/Entra ID/SSO Setup | Enterprise-specific | Move + tag
   ```

### Phase 2: Parallel Content Migration and DocHub Integration (Week 1 Days 4-7 + Week 2)
1. **Simultaneous implementation**:
   - Set up DocHub navigation structure
   - Migrate content in batches (Administration Console, Enterprise, Products)
   - Implement content filtering and shared content system
   - Create redirects for existing URLs

2. **Accelerated testing and deployment**:
   - Test navigation and redirects during migration
   - User acceptance testing in parallel with final migrations
   - Deploy to production with monitoring

## Content Duplication Strategy

### Shared Content (Community Base)
Core NetBox documentation that applies to all platforms:
- Data model documentation
- API reference
- Basic configuration guides
- Core feature documentation

### Platform-Specific Content
Content that varies by platform:
- Installation procedures
- Administration methods
- SSO configuration
- Backup procedures
- Plugin management

### Implementation Approaches

#### Option 1: Content Includes
```markdown
<!-- In Cloud/NetBox/Features/index.md -->
---
title: NetBox Features - Cloud
platform: cloud
---

# NetBox Features

{% include "shared/netbox-features-core.md" %}

## Cloud-Specific Features
- Managed hosting
- Automatic backups
- Cloud connectivity options
```

#### Option 2: Conditional Content
```markdown
---
title: NetBox Features
platforms: [community, cloud, enterprise]
---

# NetBox Features

## Core Features
[Content for all platforms]

{% if platform == "cloud" %}
## Cloud-Specific Features
[Cloud-only content]
{% endif %}

{% if platform == "enterprise" %}
## Enterprise-Specific Features
[Enterprise-only content]
{% endif %}
```

#### Option 3: Tag-Based Filtering
```markdown
---
title: NetBox Features
tags:
  - community
  - cloud
  - enterprise
  - netbox
  - features
---

# NetBox Features

<PlatformContent platforms={['community', 'cloud', 'enterprise']}>
[Core content visible to all platforms]
</PlatformContent>

<PlatformContent platforms={['cloud']}>
## Cloud-Specific Features
[Cloud-only content]
</PlatformContent>
```

## URL Migration Plan

### Current URLs → New URLs
```
Current: /Administration Console/azure-ad-sso-setup
New: /cloud/administration/security/sso/entra-id/sso-setup

Current: /netbox-enterprise/nbe-azure-sso
New: /enterprise/administration/sso/entra-id/sso-setup

Current: /netbox-assurance/quickstart-guide
New: /cloud/netbox-assurance/quickstart-guide
     /enterprise/netbox-assurance/quickstart-guide

Current: /netbox-discovery/agent/get-started
New: /cloud/netbox-discovery/discovery-agent/getting-started
     /enterprise/netbox-discovery/discovery-agent/getting-started
```

### Redirect Strategy
1. **Implement 301 redirects** for all existing URLs
2. **Create redirect mapping file** for DocHub
3. **Maintain backwards compatibility** for external links

## Content Management Considerations

### Version Management
- **Community**: Always latest stable NetBox version
- **Cloud**: Cloud platform version (v1.10+)
- **Enterprise**: Enterprise platform version (v1.10+)

### Tag Strategy Updates
```yaml
# Platform tags (top-level navigation)
- community  # Community platform
- cloud      # Cloud platform  
- enterprise # Enterprise platform
- airgap     # Air-gapped deployments

# Product tags (feature organization)
- netbox     # Core NetBox features
- discovery  # Discovery features
- assurance  # Assurance features
- integrations # Integration features

# Content type tags
- getting-started
- administration
- configuration
- troubleshooting
```

## Success Metrics

### User Experience
- **Reduced navigation depth**: Average 3 clicks to find content (down from 5+)
- **Platform clarity**: Users can immediately identify relevant content
- **Content discoverability**: Related content easily accessible

### Content Management
- **Reduced duplication**: Shared content managed in one place
- **Clear ownership**: Each section has clear platform ownership
- **Easier maintenance**: Updates propagate to all relevant platforms

### SEO and Search
- **Better URL structure**: URLs reflect content hierarchy
- **Improved search**: Platform-specific search results
- **Enhanced metadata**: Better tagging and categorization

## Next Steps

1. **Review and approve** this navigation structure
2. **Create detailed content mapping** spreadsheet
3. **Implement pilot section** (e.g., SSO documentation)
4. **Gather feedback** from documentation team
5. **Full implementation** with DocHub team

---

This restructure will significantly improve user experience while maintaining our comprehensive documentation coverage across all NetBox platforms. 