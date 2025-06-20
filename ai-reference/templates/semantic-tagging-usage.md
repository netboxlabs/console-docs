---
tags:
  - ai-reference
  - template
  - cloud
  - enterprise
  - community
  - discovery
  - semantic-tagging
  - examples
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
category: "template"
audience: "developers"
complexity: "beginner"
description: "Examples and usage patterns for the semantic tagging system"
internal_only: true
draft: true
---

# Semantic Tagging Usage Examples

## Overview

This template demonstrates proper usage of the comprehensive tagging system with real-world examples across different types of NetBox documentation.

## Tag Categories

### Edition Tags (Prominent Pills)
- `cloud` - NetBox Cloud features
- `enterprise` - NetBox Enterprise features  
- `community` - NetBox Community features
- `airgap` - Air-gapped deployment features

### Product Tags (Regular Display)
- `netbox` - Core NetBox functionality
- `discovery` - Network discovery features
- `assurance` - Network monitoring capabilities
- `operator` - AI-powered operations
- `branching` - NetBox Branching extension

### Semantic Tags (Smaller Display)
- Authentication, security, database, APIs, monitoring, etc.

## Usage Examples

### 1. Universal Core Feature
**Use Case**: A feature available in all NetBox editions

```yaml
---
tags:
  - cloud
  - enterprise
  - community
  - netbox
  - rest-api
  - automation
title: "REST API Authentication"
description: "Configure API authentication across all NetBox editions"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current"
category: "integration"
audience: "developers"
complexity: "intermediate"
---
```

### 2. Premium Monitoring Feature
**Use Case**: NetBox Assurance feature (Cloud/Enterprise only)

```yaml
---
tags:
  - cloud
  - enterprise
  - assurance
  - monitoring
  - alerting
  - notifications
title: "NetBox Assurance Monitoring Setup"
description: "Configure network monitoring and alerting in NetBox Assurance"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included - premium feature
status: "current"
category: "feature"
audience: "administrators"
complexity: "intermediate"
---
```

### 3. Discovery Feature (All Editions)
**Use Case**: Network discovery available everywhere

```yaml
---
tags:
  - cloud
  - enterprise
  - community
  - discovery
  - networking
  - automation
  - getting-started
title: "Network Discovery Configuration"
description: "Set up automated network discovery across your infrastructure"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current"
category: "feature"
audience: "administrators"
complexity: "beginner"
---
```

### 4. Authentication Setup (Universal)
**Use Case**: SSO configuration for all editions

```yaml
---
tags:
  - cloud
  - enterprise
  - community
  - authentication
  - sso
  - saml
  - security
  - configuration
title: "SAML SSO Configuration"
description: "Configure SAML single sign-on for NetBox authentication"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current"
category: "admin"
audience: "administrators"
complexity: "advanced"
---
```

### 5. Installation Guide (Enterprise/Community)
**Use Case**: Installation instructions (not applicable to Cloud)

```yaml
---
tags:
  - enterprise
  - community
  - installation
  - getting-started
  - database
  - configuration
title: "NetBox Installation Guide"
description: "Complete installation guide for NetBox Enterprise and Community"
versions:
  enterprise: "v1.10"
  community: "v4.2"
  # Note: cloud not included - installation not applicable
status: "current"
category: "getting-started"
audience: "administrators"
complexity: "intermediate"
---
```

### 6. Air-Gap Deployment (Enterprise Only)
**Use Case**: Air-gapped deployment specific to Enterprise

```yaml
---
tags:
  - airgap
  - enterprise
  - installation
  - security
  - deployment
title: "Air-Gap Deployment Guide"
description: "Deploy NetBox Enterprise in air-gapped environments"
versions:
  enterprise: "v1.10"
  # Note: Air-gap specific to Enterprise deployments
status: "current"
category: "deployment"
audience: "administrators"
complexity: "advanced"
---
```

### 7. API Development (All Editions)
**Use Case**: API usage examples for developers

```yaml
---
tags:
  - cloud
  - enterprise
  - community
  - rest-api
  - graphql
  - development
  - automation
  - scripting
title: "API Development Examples"
description: "Code examples for NetBox API integration and automation"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current"
category: "integration"
audience: "developers"
complexity: "intermediate"
---
```

### 8. Plugin Development (Community Focus)
**Use Case**: Custom plugin development

```yaml
---
tags:
  - community
  - enterprise
  - plugins
  - customization
  - development
  - extensibility
title: "Custom Plugin Development"
description: "Create custom NetBox plugins for extended functionality"
versions:
  enterprise: "v1.10"
  community: "v4.2"
  # Note: Cloud doesn't support custom plugins
status: "current"
category: "development"
audience: "developers"
complexity: "advanced"
---
```

### 9. Backup and Maintenance (Enterprise/Community)
**Use Case**: Database backup procedures

```yaml
---
tags:
  - enterprise
  - community
  - database
  - backup
  - maintenance
  - administration
title: "Database Backup Procedures"
description: "Backup and maintenance procedures for NetBox databases"
versions:
  enterprise: "v1.10"
  community: "v4.2"
  # Note: Cloud backups are managed automatically
status: "current"
category: "admin"
audience: "administrators"
complexity: "intermediate"
---
```

### 10. Beta Feature Documentation
**Use Case**: New feature in beta testing

```yaml
---
tags:
  - cloud
  - enterprise
  - operator
  - automation
  - beta
title: "NetBox Operator AI Features (Beta)"
description: "New AI-powered automation features in NetBox Operator"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
status: "beta"
category: "feature"
audience: "administrators"
complexity: "intermediate"
---
```

## Tag Selection Guidelines

### Choose Edition Tags Based On:
- **Where the feature is available**: Cloud, Enterprise, Community, or Air-gap
- **Deployment model**: Hosted (Cloud) vs self-hosted (Enterprise/Community)
- **Licensing**: Open source (Community) vs commercial (Cloud/Enterprise)

### Choose Product Tags Based On:
- **Core functionality**: Use `netbox` for basic NetBox features
- **Specialized products**: Use `discovery`, `assurance`, `operator`, `branching`
- **Feature category**: What product area does this relate to?

### Choose Semantic Tags Based On:
- **Primary function**: What does this feature accomplish?
- **User workflow**: How do users interact with it?
- **Technical domain**: Database, API, security, etc.
- **Complexity level**: Getting started, configuration, development

## Best Practices

### Do's ✅
- Use edition tags to clearly indicate product availability
- Include semantic tags that describe the feature's purpose
- Add version information for all applicable products
- Use appropriate status (current/beta/coming-soon)
- Include audience and complexity metadata

### Don'ts ❌
- Don't use edition tags for products that don't support the feature
- Don't over-tag - focus on the most relevant 3-5 semantic tags
- Don't forget to update version numbers when content changes
- Don't use deprecated HTML pill syntax

### Tag Hierarchy
1. **Edition tags** (prominent pills at top)
2. **Product tags** (regular tags below content)
3. **Semantic tags** (smaller tags for categorization)

---

**Semantic Tagging Usage** | **Last Updated**: 2025-01-27  
**Status**: Production Ready | **Usage**: Internal Development Template 