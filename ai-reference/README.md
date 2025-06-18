# AI Reference Materials

This directory contains reference materials, templates, and documentation resources for use with AI/LLM tools when building NetBox Labs documentation pages. **This directory is not published to dochub** and is intended for internal development use only.

## Purpose

- 📝 Store reference documentation and examples for AI-assisted writing
- 🤖 Provide context and templates for LLM tools
- 📋 Maintain style guides and content patterns
- 🔧 Keep development notes and content strategy documents

## Structure

```
ai-reference/
├── README.md                 # This file
├── templates/               # Document templates and patterns
├── style-guides/           # Writing style and formatting guidelines
├── examples/               # Example content and best practices
├── content-strategy/       # Strategy docs and planning materials
└── reference-docs/         # External reference materials and notes
```

## Guidelines

### What Goes Here
✅ **DO include:**
- Document templates and boilerplate content
- Style guides and writing standards
- Example content patterns
- Reference materials from other sources
- Development notes and planning documents
- AI prompts and content generation helpers

### What Doesn't Go Here
❌ **DON'T include:**
- Customer-facing documentation (belongs in `docs/`)
- Sensitive information or credentials
- Large binary files or images
- Anything that should be version controlled with the main docs

### Usage with AI Tools

When working with AI/LLM tools:

1. **Reference this directory** for context and examples
2. **Use templates** as starting points for new documentation
3. **Follow style guides** to maintain consistency
4. **Update examples** when you create good patterns
5. **Document your prompts** for future reference

## Directory Safety

This directory is safe from publication because:
- It's outside the `docs/` folder (not processed by mkdocs)
- It's not referenced in `mkdocs.yml` navigation
- It won't be included in GitHub Actions deployment workflows
- It's intended for development use only

## Contributing

When adding materials to this directory:
- Keep files organized in appropriate subdirectories
- Use clear, descriptive filenames
- Add a brief description in this README when adding new categories
- Don't commit sensitive information

---

*This directory was created for the NetBox Assurance documentation update project (PRD-439) to support AI-assisted content development.* 