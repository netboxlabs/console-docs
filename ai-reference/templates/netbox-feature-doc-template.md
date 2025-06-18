# [Feature Name] Template

## Metadata
```yaml
# Use this for AI context
product: [NetBox Cloud | NetBox Enterprise | Both]
version: [v1.9 | v1.10 | v1.11]
feature_status: [current | beta | alpha | coming_soon]
audience: [end_users | admins | developers]
complexity: [beginner | intermediate | advanced]
```

## Standard Header Pattern
```markdown
<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
# OR use only the relevant pill(s)

!!! info "Version Information"
    This feature is available in [Product] version [X.X] and later.
    # OR for unreleased features:
    # This feature will be available in [Product] version [X.X] (coming [timeframe]).
```

## Document Structure

### 1. Overview Section
- Brief description of what the feature does
- Key benefits and use cases
- Prerequisites or requirements

### 2. Getting Started / Quick Start
- Minimum viable configuration
- Basic setup steps
- First successful use case

### 3. Configuration Details
- Detailed configuration options
- Advanced settings
- Environment-specific considerations

### 4. Common Use Cases
- Real-world scenarios
- Step-by-step workflows
- Best practices

### 5. Troubleshooting (if applicable)
- Common issues and solutions
- Error messages and meanings
- Debugging steps

### 6. Related Information
- Links to related features
- External resources
- API documentation (if applicable)

## Writing Style Guidelines

### Voice and Tone
- Use active voice
- Be conversational but professional
- Focus on user benefits and outcomes
- Use "you" to address the reader directly

### Structure
- Use descriptive headings
- Include code examples where relevant
- Add screenshots for UI elements
- Use admonitions (info, warning, tip) appropriately

### Technical Content
- Include complete, working examples
- Test all code snippets
- Provide context for configuration values
- Explain the "why" not just the "how"

## Common Admonitions

```markdown
!!! info "Information"
    Use for helpful context or background information.

!!! tip "Pro Tip"
    Use for best practices or expert advice.

!!! warning "Important"
    Use for critical information that could cause issues if ignored.

!!! note "Note"
    Use for additional context or clarifications.

!!! example "Example"
    Use to introduce code examples or use cases.
```

## Link Patterns

```markdown
# Internal links (relative to docs/)
[Console Access](../Administration Console/console-access.md)

# External links
[NetBox Documentation](https://docs.netbox.dev/)

# API references
[REST API Documentation](/api/docs/)
```

## Code Block Patterns

```markdown
# Configuration files
```yaml
# netbox.yaml
SETTING_NAME: value
another_setting: "string value"
```

# Command line
```bash
sudo systemctl restart netbox
```

# API examples
```json
{
  "name": "example",
  "value": "data"
}
```
```

## Image Guidelines

- Store images in `docs/images/[feature-name]/`
- Use descriptive filenames
- Keep file sizes reasonable (<500KB)
- Use PNG for screenshots, SVG for diagrams
- Include alt text for accessibility

---

*This is a template for AI-assisted documentation creation. Customize based on the specific feature being documented.* 