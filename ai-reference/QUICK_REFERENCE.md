---
tags:
  - ai-reference
  - quick-reference
  - templates
  - development
author: 'NetBox Labs Documentation Team'
category: 'ai-reference'
audience: 'developers'
complexity: 'beginner'
description: "Quick reference guide for common AI reference tasks for the world's most popular platform for understanding, operating, automating, and securing networks."
internal_only: true
draft: true
---

:::info Quick Reference Guide
Fast lookup for common tasks in the AI reference system for NetBox - the world's most popular platform for understanding, operating, automating, and securing networks.  
For comprehensive information, see [README.md](./README.md).
**Excluded from public website builds.**
:::

# AI Reference Quick Reference

**NetBox is the world's most popular platform for understanding, operating, automating, and securing networks.** This quick reference provides essential information for documenting the premier network and infrastructure management platform.

## 🚨 RFC: Anti-AI-Generated Patterns for Public Docs

**CRITICAL**: Public documentation (anything in `/docs` or published to https://netboxlabs.com/docs) must NOT look AI-generated per our [RFC: Writing Docs with AI](https://docs.google.com/document/d/1KZtnMvyNsIGEWrHqCVD54AoiPmgnW7ALKMtYFdON-Wg/edit?usp=sharing):

### ❌ Forbidden in Public Documentation

- NO emojis (emojis are OK in ai-reference for internal use)
- NO emdashes - find-and-replace every emdash with prejudice
- NO overwrought phrasing or fluff
- NO recognizable AI patterns

### ✅ Required for Public Documentation

- Crisp, clear, technical writing for network engineers
- Concise and to the point - optimize for clarity
- Accurate and verifiable - test all instructions
- Professional tone - you're writing for NetBox users

**"If it feels like AI wrote it, nobody will trust that you put all the work in to make sure the docs are accurate."**

## 🚀 Common Commands

### Vale Commands
```bash
# Quick analysis (see README.md for full list)
yarn vale-our-content    # Our controlled content only
yarn vale-summary        # Quick overview
yarn vale-install        # Installation help
```

### Lefthook Commands
```bash
# Test hooks without committing
lefthook run pre-commit
lefthook run pre-push

# Skip hooks for urgent fixes
SKIP_BUILD_VALIDATION=true git push
LEFTHOOK_SKIP_BUILD=true git push
```

### Development Commands
```bash
# Full development setup
yarn dev

# Transform only
yarn transform-docs

# Build validation
yarn build
```

## 📋 Template Locations

### Document Templates
- **Feature docs**: `ai-reference/templates/netbox-feature-doc-template.md`
- **Product pages**: `ai-reference/templates/product-landing-page.md`
- **Semantic tagging**: `ai-reference/templates/semantic-tagging-usage.md`

### Style Guides
- **AI prompting**: `ai-reference/style-guides/ai-prompting-guide.md`
- **NetBox style**: `ai-reference/style-guides/netbox-docs-style-guide.md`
- **Product tagging**: `ai-reference/style-guides/product-tagging-guide.md`

## 🏷️ Tag Quick Reference

### Platform Tags (Pills)
```yaml
tags:
  - cloud        # NetBox Cloud
  - enterprise   # NetBox Enterprise  
  - community    # NetBox Community
```

### Product Tags
```yaml
tags:
  - discovery    # NetBox Discovery
  - assurance    # NetBox Assurance
  - operator     # NetBox Operator
```

### Content Type Tags
```yaml
tags:
  - installation      # Setup/install guides
  - configuration     # Config guides
  - troubleshooting   # Problem solving
  - api              # API documentation
```

## 📁 Directory Structure

```
ai-reference/
├── README.md                    # Main overview
├── QUICK_REFERENCE.md          # This file
├── content-strategy/           # Navigation & strategy
├── project-docs/              # Project documentation
├── reference-docs/            # Technical references
├── style-guides/              # Writing guidelines
└── templates/                 # Document templates
```

## 🔗 Key Resources

### External Links
- [RFC: Writing Docs with AI](https://docs.google.com/document/d/1KZtnMvyNsIGEWrHqCVD54AoiPmgnW7ALKMtYFdON-Wg/edit?usp=sharing)
- [Docs Site Structure](https://docs.google.com/document/d/1S1myF5S7BS2foTqo4-XP4bW-eDBU7mZmrx8P1526DFY/edit?usp=sharing)
- [NetBoxLabs Docs Reorganization](https://docs.google.com/document/d/12kH5sMTcHw6qE4n6BbbIXQ498RBMN1Bb19O6p6-N2dw/edit?usp=sharing)

### Internal References
- **Main README**: Comprehensive system overview
- **Documentation Quality System**: Technical implementation details
- **Version Management**: Product versioning strategy
- **Distribution URLs**: Customer-facing endpoints

---

*For detailed information, see the main [README.md](./README.md) and specific files in the ai-reference directory.*
