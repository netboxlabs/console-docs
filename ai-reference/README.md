---
tags:
  - cloud
  - enterprise
  - community
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current"
category: "ai-reference"
audience: "developers"
complexity: "intermediate"
---

# AI Reference Materials

This directory contains reference materials, templates, and documentation resources for use with AI/LLM tools when building NetBox Labs documentation. **This directory is not published to dochub** and is intended for internal development use only.

## Purpose

- 📝 Store reference documentation and examples for AI-assisted writing
- 🤖 Provide context and templates for LLM tools using our comprehensive frontmatter system
- 📋 Maintain style guides and content patterns with version tracking
- 🔧 Keep development notes and content strategy documents
- 🏷️ Demonstrate proper use of our enhanced frontmatter tagging and versioning system

## Structure

```
ai-reference/
├── README.md                           # This file
├── templates/                          # Document templates using enhanced frontmatter system
│   ├── netbox-feature-doc-template.md  # Standard feature documentation template
│   └── product-landing-page.md         # Landing page template (like NetBox Operator)
├── style-guides/                       # Writing style and formatting guidelines
│   ├── netbox-docs-style-guide.md      # Complete style guide with enhanced frontmatter
│   ├── product-tagging-guide.md        # Complete product tagging system documentation
│   └── ai-prompting-guide.md           # Best practices for AI assistance with version tracking
├── content-strategy/                   # Strategy docs and planning materials
│   ├── navigation-strategy.md          # Our navigation restructuring approach
│   ├── version-management.md           # How we handle versions and releases
│   └── dochub-integration-strategy.md  # DocHub integration strategy and quick reference
└── reference-docs/                     # External reference materials and authoritative sources
    ├── netbox-assurance-kb.md         # LLM KB NetBox Assurance content
    ├── netbox-assurance-blog.md       # Blog post content
    ├── auto-tagging-analysis.md       # Auto-tagging system analysis and results
    ├── product-tagging-migration.md   # Product tagging migration documentation
    ├── semantic-tagging-enhancement-summary.md # (ARCHIVED) Original 43-tag system summary
├── semantic-tagging-system.md     # (ARCHIVED) Legacy semantic tagging documentation
├── tag-consolidation-summary.md   # Current streamlined 20-tag system overview
    ├── dochub-coordination.md         # Navigation restructuring coordination spec
    └── dochub-integration-requirements.md # Detailed technical implementation requirements
```

## Enhanced Frontmatter System

We use **comprehensive YAML frontmatter** with version tracking for better organization and AI context:

### Complete Frontmatter Format
```yaml
---
tags:
  - cloud
  - enterprise
  - community
title: "Document Title"
description: "SEO-friendly description for search and social sharing"
author: "Author Name or NetBox Labs Documentation Team"
last_updated: "YYYY-MM-DD"
versions:
  cloud: "v1.9 | v1.10"
  enterprise: "v1.9 | v1.10"
  community: "v4.2"
status: "current | beta | coming-soon | deprecated"
category: "feature | integration | admin | getting-started | product-overview"
audience: "end-users | admins | developers | all"
complexity: "beginner | intermediate | advanced"
related_docs:
  - "path/to/related-doc.md"
external_links:
  - "https://example.com/resource"
---
```

### Version Guidelines

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

#### For NetBox Discovery Documents
```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
```

#### For NetBox Assurance Documents (Premium Only)
```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included as Assurance is premium-only
```

#### For NetBox Operator Documents (Premium Only)
```yaml
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: community not included as Operator is premium-only
```

### Version Mapping Reference
| NetBox Cloud/Enterprise | NetBox Community | Release Period | Key Features |
|------------------------|------------------|----------------|--------------|
| v1.9 | v4.2 | Current stable | Base functionality |
| v1.10 | v4.2 | Current/Recent updates | + Enterprise Assurance & Discovery |
| v1.11 | v4.2 | Future releases | + Enterprise High Availability (HA) |
| v1.12 | v4.3 | Next major release cycle | TBD |

### Deprecated Format (Don't Use)
```html
<!-- OLD - Don't use HTML pills -->
<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
```

### Available Product Tags

#### Edition Tags (Display as Prominent Pills)
| Tag | Display | Use For | Display Style |
|-----|---------|---------|---------------|
| `cloud` | Cloud | Cloud-specific features and administration | **Prominent pill at top** |
| `enterprise` | Enterprise | Enterprise-specific features and installation | **Prominent pill at top** |
| `community` | Community | Open source features and community tools | **Prominent pill at top** |
| `airgap` | Air-Gap | Air-gapped deployment scenarios | **Prominent pill at top** |

#### Product Feature Tags (Display as Regular Tags)
| Tag | Display | Use For | Display Style |
|-----|---------|---------|---------------|
| `discovery` | Discovery | Network discovery and device detection features | Regular tag at bottom |
| `assurance` | Assurance | Network monitoring and assurance capabilities | Regular tag at bottom |
| `operator` | Operator | AI-powered network operations and automation | Regular tag at bottom |
| `netbox` | NetBox | Core NetBox features and functionality | Regular tag at bottom |

#### Category Tags (Display as Regular Tags)
All other tags (authentication, sso, ldap, saml, security, database, backup, etc.) display as smaller regular tags at the bottom under "Related Topics".

## Guidelines for AI-Assisted Documentation

### What Goes Here
✅ **DO include:**
- Document templates using our enhanced frontmatter system
- Style guides and writing standards with version tracking
- Example content patterns from our existing docs
- Reference materials from authoritative sources
- Development notes and planning documents
- AI prompts and content generation helpers with version context
- Migration guides and coordination specs

### What Doesn't Go Here
❌ **DON'T include:**
- Customer-facing documentation (belongs in `docs/`)
- Sensitive information or credentials
- Large binary files or images (use `scratch/images/` instead)
- Anything that should be version controlled with the main docs

### Usage with AI Tools

When working with AI/LLM tools:

1. **Reference this directory** for context and examples
2. **Use our enhanced frontmatter system** - always include comprehensive metadata with version tracking
3. **Follow our style guide** to maintain consistency with existing docs
4. **Check examples** for patterns and structures that work well
5. **Update templates** when you create good patterns
6. **Document your prompts** for future reference
7. **Include version information** in all AI prompts for accuracy

## Integration with Our Workflow

### Branch Strategy
- Work on `feat/navigation-restructure-and-docs-enhancement` for current updates
- Use version-specific branches for future releases
- Reference `content-strategy/version-management.md` for details

### DocHub Coordination
- All content must work with netboxlabs-website-dochub integration
- Use structured frontmatter for better categorization and version tracking
- Reference `content-strategy/dochub-integration-strategy.md` for quick overview
- See `reference-docs/dochub-coordination.md` and `reference-docs/dochub-integration-requirements.md` for detailed specifications
- Use streamlined semantic tagging system for enhanced content discovery - see `reference-docs/tag-consolidation-summary.md` for current implementation details

### Quality Assurance
- Test all templates locally with `mkdocs serve`
- Validate frontmatter syntax and version mappings
- Ensure consistency with existing documentation patterns
- Verify version compatibility information accuracy

## Directory Safety

This directory is safe from publication because:
- It's outside the `docs/` folder (not processed by mkdocs)
- It's not referenced in `mkdocs.yml` navigation
- It won't be included in GitHub Actions deployment workflows
- It's listed in `.gitignore` patterns for dochub integration

## Contributing

When adding materials to this directory:
- Keep files organized in appropriate subdirectories
- Use clear, descriptive filenames following our naming conventions
- Always include proper frontmatter with version tracking
- Add a brief description in this README when adding new categories
- Don't commit sensitive information
- Test templates before committing
- Update version information when making changes

## Quick Reference

### For New Feature Documentation:
1. Use `templates/netbox-feature-doc-template.md`
2. Apply appropriate product tags and version mapping
3. Follow `style-guides/netbox-docs-style-guide.md`
4. Include complete frontmatter with version tracking

### For Product Landing Pages:
1. Use `templates/product-landing-page.md` 
2. Reference NetBox Operator page as example
3. Include design partner or beta information if applicable
4. Apply correct version mapping based on product availability

### For AI-Assisted Content Creation:
1. Reference `style-guides/ai-prompting-guide.md` for best practices
2. Always specify complete frontmatter requirements in prompts
3. Include version context appropriate for the document type
4. Validate generated content against our style guide and version requirements

### For Semantic Tagging Enhancement:
1. Use `npm run enhanced-tag` to apply streamlined semantic tags
2. Review results and test locally with `npm run serve`
3. Reference `reference-docs/tag-consolidation-summary.md` for streamlined system details
4. See `style-guides/product-tagging-guide.md` for complete tagging documentation

## Version-Specific Content Guidelines

### When Creating Content:
- **Always include version information** in frontmatter
- **Use appropriate version mapping** based on document type and age
- **Update last_updated field** when making changes
- **Set correct status field** (current, beta, coming-soon, deprecated)
- **Include version compatibility notes** in content when relevant

### Version Tracking Best Practices:
- Existing docs not updated since May 1, 2025: use v1.9 for Cloud/Enterprise
- Modified docs since May 1, 2025: use v1.10 for Cloud/Enterprise
- NetBox Community always maps to v4.2
- Premium features (Assurance, Operator) don't include community versions
- Discovery features include all three product versions

---

*This directory supports the NetBox Labs documentation enhancement project, providing AI tools with proper context for creating high-quality, consistent documentation using our enhanced frontmatter system with comprehensive version tracking and modern tagging.* 