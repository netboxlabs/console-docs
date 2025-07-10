---
tags:
  - ai-reference
  - cloud
  - community
  - assurance
  - operator
  - reference
  - strategy
  - ai-tools
  - tagging
  - navigation
  - documentation
sidebar_position: 999
description: AI Reference material for NetBox Labs documentation development
internal_only: true
draft: true
last_updated: '2025-06-25'
category: ai-reference
audience: developers
---
:::info Development Resource
This content is synced from console-docs/ai-reference for development team use.
:::

# Version Management Strategy

## Overview

This document explains how we handle version tracking and management across NetBox Labs documentation, including the relationship between NetBox Cloud/Enterprise versions and NetBox Community versions.

## Version Mapping System

### Current Version Mapping
| NetBox Cloud/Enterprise | NetBox Community | Status | Release Period | Key Features |
|------------------------|------------------|--------|----------------|--------------|
| v1.9 | v4.2 | 🟢 **LIVE** | Current stable (pre-May 2025) | Base Enterprise functionality |
| v1.10 | v4.2 | 🟡 **Current** | Recent updates (post-May 2025) | + Assurance & Discovery |
| v1.11 | v4.2 | 🔴 **Future** | Planned releases | + High Availability (HA) |
| v1.12 | v4.3 | 🔴 **Future** | Next major release cycle | TBD |

### Version Guidelines for Documentation

#### For Existing Documents (Not Updated Since May 1, 2025)
```yaml
versions:
  cloud: "v1.9"
  enterprise: "v1.9"
  community: "v4.2"
```

#### For Documents Modified Since May 1, 2025
```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
```

## Product-Specific Versioning

### NetBox Discovery
- **Available in**: Community, Cloud, Enterprise
- **Enterprise availability**: Added in v1.10
- **Current version**: v1.10 for Cloud/Enterprise, v4.2 for Community
- **Versioning**: All three editions get version tracking

```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"  # Added in v1.10
  community: "v4.2"
```

### NetBox Assurance (Premium Only)
- **Available in**: Cloud, Enterprise only
- **Enterprise availability**: Added in v1.10
- **Current version**: v1.10
- **Versioning**: No community version (premium feature)

```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"  # Added in v1.10
  # Note: community not included - premium only
```

### NetBox Operator (Premium Only)
- **Available in**: Cloud, Enterprise only
- **Current version**: v1.10
- **Versioning**: No community version (premium feature)

```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included - premium only
```

### NetBox High Availability (HA) (Enterprise Only)
- **Available in**: Enterprise only
- **Enterprise availability**: Coming in v1.11
- **Current version**: v1.11 (future)
- **Versioning**: Enterprise-specific feature

```yaml
versions:
  enterprise: "v1.11"  # Coming in v1.11
  # Note: cloud/community not included - enterprise-specific
```

### Administration Console (Cloud Only)
- **Available in**: Cloud only
- **Current version**: v1.10
- **Versioning**: Cloud-specific features

```yaml
versions:
  cloud: "v1.10"
  # Note: enterprise/community not included - cloud-specific
```

## Branch Strategy

### Current Workflow
- **Main branch**: Contains v1.9 content (currently live)
- **Feature branches**: Used for v1.10+ content development
- **Version branches**: Will be created when versions are ready for release

### Documentation Team Guidelines

#### For Immediate Customer Fixes (v1.9)
```bash
git checkout main
# Edit documentation
git commit -m "Fix: Update SSL certificate steps"
git tag v1.9.1
git push origin main v1.9.1
# → Goes live immediately
```

#### For New Features (v1.10+)
```bash
git checkout -b feature/new-feature-docs
# Add documentation with appropriate versioning:
# - v1.10: Assurance/Discovery Enterprise features
# - v1.11: High Availability Enterprise features
# - v1.12: NetBox v4.3 related features
git commit -m "Add: New feature documentation"
git push origin feature/new-feature-docs
# → Stays hidden until version branch is created and merged
```

## Status Field Guidelines

Use the `status` field in frontmatter to indicate document lifecycle:

- **`current`**: Live, stable documentation
- **`beta`**: Features in beta testing
- **`coming-soon`**: Announced but not yet available
- **`deprecated`**: Legacy content being phased out

## Last Updated Guidelines

- **Format**: `YYYY-MM-DD`
- **Update when**: Content changes, not just metadata
- **Automation**: Can be automated via git hooks if needed

## Quality Assurance

### Before Publishing
1. **Version accuracy**: Ensure versions match feature availability
2. **Product tags**: Verify tags match actual product availability
3. **Status consistency**: Check status matches actual feature state
4. **Cross-references**: Verify related_docs links are accurate

### Automated Checks
- Version format validation
- Tag consistency checking
- Link validation
- Frontmatter completeness

## Integration with DocHub

### Version Filtering
DocHub can filter content based on version information:
- Show only current versions to customers
- Hide beta/coming-soon content from public
- Display version-specific navigation

### Metadata Usage
- **SEO**: Version info helps with search optimization
- **User Experience**: Users see relevant version information
- **Content Management**: Easier to manage version lifecycles

## Future Considerations

### Version Branch Creation
When ready to create version branches:
1. Create `v1.10` branch from current feature work
2. Update DocHub integration to recognize new branch
3. Test version filtering and content availability
4. Deploy to staging for validation
5. Switch live traffic to new version branch

### Automated Version Updates
Consider automation for:
- Last updated timestamps
- Version bumping across multiple files
- Consistency checking between versions
- Automated tagging based on file changes

## Version Lifecycle Notes

### NetBox Community Version Transitions
- **v4.2 → v4.3**: This represents a major community release
- **Impact**: When v4.3 is released, new Cloud/Enterprise features will be versioned as v1.12+
- **Documentation**: Prepare for version branch creation when v4.3 development begins

### Future Version Planning
- **v1.12**: Will coincide with NetBox Community v4.3 release
- **Version branches**: Create v1.12 branch when NetBox v4.3 development starts
- **Content migration**: Plan migration of v1.11 content to v1.12 when ready

---

This version management strategy ensures consistent, accurate documentation versioning while supporting our multi-product, multi-edition architecture. 
