---
tags:
  - ai-reference
  - version-management
  - cloud
  - enterprise
  - community
  - content-strategy
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
category: "content-strategy"
audience: "developers"
complexity: "intermediate"
description: "Version management guidelines for NetBox documentation"
internal_only: true
draft: true
---

# Version Management Guidelines

## Overview

This guide explains how to manage version information across NetBox Cloud, Enterprise, and Community documentation to ensure accuracy and consistency.

## Version Mapping

### Current Version Alignment
| NetBox Cloud/Enterprise | NetBox Community | Release Period | Key Features |
|------------------------|------------------|----------------|--------------|
| v1.9 | v4.2 | Previous stable | Base functionality |
| v1.10 | v4.2 | Current/Recent updates | + Enterprise Assurance & Discovery |
| v1.11 | v4.2 | Future releases | + Enterprise High Availability (HA) |
| v1.12 | v4.3 | Next major release cycle | TBD |

### Version Guidelines

#### For Documents Modified Since May 1, 2025
```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
```

#### For Legacy Documents (Pre-May 1, 2025)
```yaml
versions:
  cloud: "v1.9"
  enterprise: "v1.9"
  community: "v4.2"
```

## Product-Specific Versioning

### NetBox Discovery (Universal Feature)
Available across all editions:
```yaml
tags:
  - cloud
  - enterprise
  - community
  - discovery
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
```

### NetBox Assurance (Premium Only)
Cloud and Enterprise only:
```yaml
tags:
  - cloud
  - enterprise
  - assurance
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included as Assurance is premium-only
```

### NetBox Operator (Premium Only)
Cloud and Enterprise only:
```yaml
tags:
  - cloud
  - enterprise
  - operator
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included as Operator is premium-only
```

### NetBox Branching (Premium Extension)
Cloud and Enterprise only:
```yaml
tags:
  - cloud
  - enterprise
  - branching
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included as Branching is premium extension
```

### Air-Gap Deployments
Enterprise-specific deployment method:
```yaml
tags:
  - airgap
  - enterprise
versions:
  enterprise: "v1.10"
  # Note: Air-gap is Enterprise-specific
```

## Status Management

### Status Values
- `current` - Currently supported and recommended
- `beta` - In beta testing, may have limitations
- `coming-soon` - Announced but not yet available
- `deprecated` - Still supported but not recommended for new deployments
- `archived` - No longer supported

### Status Examples

#### Current Feature
```yaml
status: "current"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
```

#### Beta Feature
```yaml
status: "beta"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
description: "This feature is in beta and may have limitations"
```

#### Coming Soon Feature
```yaml
status: "coming-soon"
versions:
  cloud: "v1.11"
  enterprise: "v1.11"
description: "This feature will be available in the next release"
```

## Version-Aware Content

### Conditional Content Display
Use status and version information to control content visibility:

```yaml
# This content only shows for current versions
status: "current"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
```

### Future Feature Documentation
```yaml
# Document future features with coming-soon status
status: "coming-soon"
versions:
  cloud: "v1.11"
  enterprise: "v1.11"
title: "NetBox High Availability (Coming Soon)"
```

## Best Practices

### When Writing New Documentation

1. **Check Current Versions**: Always use the latest version numbers
2. **Verify Product Availability**: Ensure the feature exists in specified editions
3. **Set Appropriate Status**: Use current/beta/coming-soon as appropriate
4. **Include All Applicable Editions**: Don't forget Community if the feature is universal

### When Updating Existing Documentation

1. **Update Version Numbers**: Bump to current versions if content is updated
2. **Review Product Availability**: Check if feature availability has changed
3. **Update Status**: Move from beta to current, or current to deprecated as needed
4. **Maintain Accuracy**: Ensure version info matches actual product releases

### Version Coordination

1. **Cloud/Enterprise Alignment**: These typically share version numbers
2. **Community Independence**: Community follows its own versioning scheme
3. **Feature Parity**: Not all features are available in all editions
4. **Release Timing**: Cloud/Enterprise may release features before Community

## Common Patterns

### Universal Core Feature
```yaml
tags:
  - cloud
  - enterprise
  - community
  - netbox
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current"
```

### Premium Monitoring Feature
```yaml
tags:
  - cloud
  - enterprise
  - assurance
  - monitoring
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
status: "current"
```

### Enterprise Installation
```yaml
tags:
  - enterprise
  - installation
  - getting-started
versions:
  enterprise: "v1.10"
status: "current"
```

### Community Plugin
```yaml
tags:
  - community
  - plugins
  - customization
versions:
  community: "v4.2"
status: "current"
```

## Troubleshooting Version Issues

### Common Problems

1. **Outdated Version Numbers**: Regular review and updates needed
2. **Incorrect Product Availability**: Features marked for wrong editions
3. **Status Misalignment**: Beta features marked as current, etc.
4. **Missing Version Info**: Documents without proper version metadata

### Solutions

1. **Regular Audits**: Quarterly review of version information
2. **Release Coordination**: Update docs when new versions are released
3. **Product Team Sync**: Coordinate with product teams on feature availability
4. **Automated Checks**: Consider automated validation of version consistency

---

**Version Management** | **Last Updated**: 2025-01-27  
**Status**: Production Ready | **Usage**: Internal Development 