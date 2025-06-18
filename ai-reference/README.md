# AI Reference Materials

This directory contains reference materials, templates, and documentation resources for use with AI/LLM tools when building NetBox Labs documentation. **This directory is not published to dochub** and is intended for internal development use only.

## Purpose

- 📝 Store reference documentation and examples for AI-assisted writing
- 🤖 Provide context and templates for LLM tools using our frontmatter tagging system
- 📋 Maintain style guides and content patterns
- 🔧 Keep development notes and content strategy documents
- 🏷️ Demonstrate proper use of our new product tagging system

## Structure

```
ai-reference/
├── README.md                           # This file
├── templates/                          # Document templates using new tagging system
│   ├── netbox-feature-doc-template.md  # Standard feature documentation template
│   ├── product-landing-page.md         # Landing page template (like NetBox Operator)
│   ├── quickstart-guide-template.md    # Quickstart guide template
│   └── integration-guide-template.md   # Integration/setup guide template
├── style-guides/                       # Writing style and formatting guidelines
│   ├── netbox-docs-style-guide.md      # Complete style guide
│   ├── product-tagging-guide.md        # How to use our tagging system
│   └── ai-prompting-guide.md           # Best practices for AI assistance
├── examples/                           # Example content and best practices
│   ├── good-documentation-examples.md  # Examples of well-written docs
│   ├── tagging-examples.md            # Product tagging examples
│   └── content-patterns.md            # Common content patterns and structures
├── content-strategy/                   # Strategy docs and planning materials
│   ├── navigation-strategy.md          # Our navigation restructuring approach
│   ├── version-management.md           # How we handle versions and releases
│   └── dochub-integration-notes.md     # Integration requirements and coordination
└── reference-docs/                     # External reference materials and authoritative sources
    ├── netbox-assurance-kb.md         # LLM KB NetBox Assurance content
    ├── netbox-assurance-blog.md       # Blog post content
    ├── product-tagging-migration.md   # Migration documentation
    └── dochub-coordination.md         # Coordination specifications
```

## Our Product Tagging System

We use **YAML frontmatter tags** instead of HTML pills for better Docusaurus integration:

### Correct Format (Use This):
```yaml
---
tags:
  - netbox-cloud
  - netbox-enterprise
  - netbox-community
---
```

### Deprecated Format (Don't Use):
```html
<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
```

### Available Product Tags:
| Tag | Display | Use For |
|-----|---------|---------|
| `netbox-cloud` | NetBox Cloud | Cloud-specific features and administration |
| `netbox-enterprise` | NetBox Enterprise | Enterprise-specific features and installation |
| `netbox-community` | NetBox Community | Open source features and community tools |
| `netbox-airgap` | NetBox Air-Gap | Air-gapped deployment scenarios |

## Guidelines for AI-Assisted Documentation

### What Goes Here
✅ **DO include:**
- Document templates using our tagging system
- Style guides and writing standards
- Example content patterns from our existing docs
- Reference materials from authoritative sources
- Development notes and planning documents
- AI prompts and content generation helpers
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
2. **Use our tagging system** - always include appropriate frontmatter tags
3. **Follow our style guide** to maintain consistency with existing docs
4. **Check examples** for patterns and structures that work well
5. **Update templates** when you create good patterns
6. **Document your prompts** for future reference

## Integration with Our Workflow

### Branch Strategy
- Work on `feat/navigation-restructure-and-docs-enhancement` for current updates
- Use version-specific branches for future releases
- Reference `content-strategy/version-management.md` for details

### Dochub Coordination
- All content must work with netboxlabs-website-dochub integration
- Use structured frontmatter for better categorization
- Reference `reference-docs/dochub-coordination.md` for requirements

### Quality Assurance
- Test all templates locally with `mkdocs serve`
- Validate tagging with our auto-tagging scripts
- Ensure consistency with existing documentation patterns

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
- Always include proper frontmatter tags in templates
- Add a brief description in this README when adding new categories
- Don't commit sensitive information
- Test templates before committing

## Quick Reference

### For New Feature Documentation:
1. Use `templates/netbox-feature-doc-template.md`
2. Apply appropriate product tags
3. Follow `style-guides/netbox-docs-style-guide.md`
4. Check `examples/good-documentation-examples.md` for patterns

### For Product Landing Pages:
1. Use `templates/product-landing-page.md` 
2. Reference NetBox Operator page as example
3. Include design partner or beta information if applicable

### For Integration Guides:
1. Use `templates/integration-guide-template.md`
2. Include all necessary setup steps
3. Provide troubleshooting section

---

*This directory supports the NetBox Labs documentation enhancement project, providing AI tools with proper context for creating high-quality, consistent documentation using our modern tagging and navigation systems.* 