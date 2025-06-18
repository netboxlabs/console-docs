# NetBox Documentation Style Guide

## Product Naming Conventions

### Correct Product Names
- ✅ **NetBox Cloud** (not Netbox Cloud, NetBox cloud, or netbox-cloud)
- ✅ **NetBox Enterprise** (not Netbox Enterprise, NetBox enterprise, or netbox-enterprise)
- ✅ **NetBox Discovery** (not Netbox Discovery)
- ✅ **NetBox Assurance** (not Netbox Assurance)
- ✅ **NetBox Operator** (not Netbox Operator)
- ✅ **NetBox Labs** (company name)

### Product Pills
Always use the appropriate product pills at the top of documents:

```markdown
<span class="pill pill-cloud">Cloud</span>
<span class="pill pill-enterprise">Enterprise</span>
<span class="pill pill-community">Community</span>
```

Use only relevant pills - don't include all if the feature is only available in specific products.

## Writing Style

### Voice and Tone
- **Active voice**: "Configure the setting" not "The setting can be configured"
- **Direct address**: Use "you" to address the reader
- **Conversational yet professional**: Helpful but authoritative
- **Outcome-focused**: Explain what the user will achieve

### Headings and Structure
- Use descriptive, action-oriented headings
- Keep heading hierarchy consistent (H1 → H2 → H3)
- Use sentence case for headings: "Setting up authentication" not "Setting Up Authentication"

### Lists and Formatting
- Use numbered lists for sequential steps
- Use bullet points for feature lists or options
- Use **bold** for UI elements: "Click the **Save** button"
- Use `code formatting` for: commands, file names, API endpoints, field names

## Technical Writing Guidelines

### Code Examples
- Always provide complete, working examples
- Include necessary context (file paths, prerequisites)
- Test all code snippets before publishing
- Use appropriate language tags for syntax highlighting

### Screenshots and Images
- Include screenshots for complex UI interactions
- Use callouts to highlight important areas
- Keep images up-to-date with current UI
- Provide alt text for accessibility

### API Documentation
- Show both request and response examples
- Include error handling examples
- Provide curl examples where relevant
- Link to full API documentation

## Common Terminology

### Preferred Terms
- ✅ **Administrator** (not admin when referring to role)
- ✅ **User interface** or **UI** (not GUI)
- ✅ **Log in** (verb) / **Login** (noun)
- ✅ **Set up** (verb) / **Setup** (noun)
- ✅ **Back up** (verb) / **Backup** (noun)
- ✅ **Email** (not e-mail)
- ✅ **Username** (not user name)

### Product-Specific Terms
- ✅ **Administration Console** (NetBox Cloud's admin interface)
- ✅ **NetBox Enterprise Installer** (not NBE installer)
- ✅ **Discovery Agent** (not discovery agent)
- ✅ **Assurance workflows** (not assurance flows)

## Admonitions Usage

### When to Use Each Type

```markdown
!!! info "Info Box"
    For general information, context, or background details.

!!! tip "Pro Tip"
    For best practices, expert advice, or optimization suggestions.

!!! warning "Important"
    For critical information that could cause problems if ignored.

!!! note "Note"
    For additional context, clarifications, or side information.

!!! example "Example"
    To introduce code examples or detailed use cases.
```

### Admonition Best Practices
- Keep admonitions concise
- Use descriptive titles
- Don't overuse - they should highlight truly important information
- Place them logically within the content flow

## Link Guidelines

### Internal Links
- Use relative paths from the `docs/` directory
- Include file extensions (.md)
- Use descriptive link text (not "click here")

```markdown
# Good
[Console Access Guide](../Administration Console/console-access.md)

# Bad
[Click here](../Administration Console/console-access.md) for console access
```

### External Links
- Open in the same window (don't use target="_blank")
- Verify links are current and accessible
- Use the full site name for context

## Content Organization

### Page Structure
1. **Product pills** (if applicable)
2. **Introduction** - Brief overview of what the page covers
3. **Prerequisites** (if applicable)
4. **Main content** - Organized in logical sections
5. **Troubleshooting** (if applicable)
6. **Related information** - Links to other relevant docs

### Navigation Considerations
- Ensure pages fit logically in the navigation structure
- Use consistent naming between navigation and page titles
- Consider the user's journey and logical flow

## Version-Specific Guidelines

### Version Information
- Clearly indicate which versions support features
- Use consistent version numbering (v1.9, v1.10, etc.)
- Include deprecation notices for outdated features

### Cross-Version Content
- Indicate if instructions differ between versions
- Provide version-specific examples when needed
- Maintain backward compatibility information

## Accessibility Guidelines

### Writing for Accessibility
- Use clear, simple language
- Provide alternative text for images
- Use descriptive link text
- Ensure proper heading hierarchy
- Don't rely solely on color to convey information

### Image Accessibility
```markdown
![NetBox Console Dashboard showing the main navigation menu](../images/console/console-dashboard.png)
```

## Common Mistakes to Avoid

### Writing Issues
- ❌ Using passive voice extensively
- ❌ Saying "simply" or "just" (implies ease when it might not be)
- ❌ Using "we" instead of "you" when addressing the reader
- ❌ Inconsistent product naming

### Technical Issues
- ❌ Untested code examples
- ❌ Missing prerequisites or context
- ❌ Outdated screenshots
- ❌ Broken internal links

### Structure Issues
- ❌ Poor heading hierarchy
- ❌ Overuse of admonitions
- ❌ Long paragraphs without breaks
- ❌ Missing or unclear section organization

---

*This style guide should be referenced when creating or editing NetBox documentation, especially when using AI tools for content generation.* 