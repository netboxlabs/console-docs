---
tags:
  - ai-reference
  - cloud
  - enterprise
  - community
  - reference
  - strategy
  - ai-tools
  - tagging
  - documentation
sidebar_position: 999
description: Directory-based edition pill mapping for NetBox documentation
internal_only: false
draft: true
last_updated: '2025-06-25'
category: ai-reference
audience: developers
---

# Edition Pills Directory Mapping

This document defines the authoritative mapping of which edition pills should be displayed at the top of pages based on their directory path.

## Directory-Based Edition Pill Rules

### Console Documentation
- `/docs/console/netbox-enterprise/` → **Enterprise only**
- `/docs/console/netbox-cloud/` → **Cloud only**  
- `/docs/console/netbox-cloud/` → **Cloud only**
- `/docs/console/administration-console/` → **Cloud only**
- `/docs/console/cloud-connectivity/` → **Cloud only**
- `/docs/console/netbox-discovery/` → **Community, Cloud, Enterprise**
- `/docs/console/netbox-assurance/` → **Cloud (Coming Soon), Enterprise**
- `/docs/console/netbox-integrations/` → **Cloud, Enterprise**
- `/docs/console/netbox-extensions/` → **Cloud, Enterprise**
  - `/docs/console/netbox-extensions/branching/` → **Community, Cloud, Enterprise** (exception)
  - `/docs/console/netbox-extensions/diode/` → **Community, Cloud, Enterprise** (exception)

### SDK Documentation
- `/docs/console/sdks/pynetbox` → **Community, Cloud, Enterprise**

### NetBox Core Documentation
- `/docs/netbox/` → **Community, Cloud, Enterprise** (main index)
- `/docs/netbox/index.md` → **Community, Cloud, Enterprise** (main index)
- `/docs/netbox/introduction.md` → **Community, Cloud, Enterprise** (introduction)
- `/docs/netbox/*` (all other pages) → **Community only**

## Implementation Logic

The edition pills are determined by a `getEditionPillsForPath()` function that:

1. **Checks specific paths first** (most specific matches)
2. **Falls back to broader patterns** (directory-level matches)
3. **Returns empty array for unmatched paths** (no edition pills)

### Color Scheme
- **Community**: `#00bee0` (blue)
- **Enterprise**: `#ffac00` (orange) 
- **Cloud**: `#00d9be` (teal)

## Business Logic

### Why These Mappings?

1. **Enterprise-only features** (like NBE installer) show only Enterprise pill
2. **Cloud-only features** (like Administration Console) show only Cloud pill  
3. **Multi-edition features** (like Discovery) show all applicable editions
4. **Universal plugins** (like Branching, Diode) show all three editions
5. **Core NetBox docs** are primarily Community, except main landing pages

### Special Cases

- **Branching & Diode**: Available in all editions despite being under extensions
- **Discovery**: Available in Community (limited) + Cloud + Enterprise (full)
- **Assurance**: Cloud (coming soon) + Enterprise (available)
- **Main landing pages**: Show all editions to indicate NetBox availability

## Usage in Code

```typescript
function getEditionPillsForPath(permalink: string): string[] {
  // NetBox Enterprise - Enterprise only
  if (permalink.includes('/netbox-enterprise/')) {
    return ['enterprise'];
  }
  
  // NetBox Cloud, Administration Console, cloud-connectivity - Cloud only
  if (permalink.includes('/netbox-cloud/') || 
      permalink.includes('/Netbox Cloud/') ||
      permalink.includes('/Administration Console/') ||
      permalink.includes('/cloud-connectivity/')) {
    return ['cloud'];
  }
  
  // Continue with other patterns...
}
```

## Maintenance

When adding new documentation sections:

1. **Determine edition availability** based on product roadmap
2. **Add path pattern** to the mapping function
3. **Update this reference document**
4. **Test on representative pages**

This ensures consistent edition pill display across all NetBox documentation. 