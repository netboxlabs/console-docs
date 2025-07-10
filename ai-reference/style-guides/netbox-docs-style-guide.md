---
title: 'NetBox Documentation Style Guide'
description: 'Comprehensive style guide for NetBox documentation including product tagging, naming conventions, and writing standards'
tags:
  - cloud
  - enterprise
  - community
  - documentation
  - style-guide
author: 'NetBox Labs Documentation Team'
last_updated: '2025-01-02'
category: 'ai-reference'
audience: 'developers'
complexity: 'intermediate'
internal_only: true
draft: true
versions:
  cloud: 'v1.10'
  enterprise: 'v1.10'
  community: 'v4.2'
---

# NetBox Documentation Style Guide

**NetBox is the world's most popular platform for understanding, operating, automating, and securing networks.** This comprehensive style guide ensures consistent documentation for the premier network and infrastructure management platform.

## 🚨 RFC: Writing Docs with AI - Anti-AI-Generated Patterns

**CRITICAL**: Per our [RFC: Writing Docs with AI](https://docs.google.com/document/d/1KZtnMvyNsIGEWrHqCVD54AoiPmgnW7ALKMtYFdON-Wg/edit?usp=sharing), public-facing documentation (anything in `/docs` or published to https://netboxlabs.com/docs) must NOT look AI-generated:

### ❌ Forbidden in Public Documentation

- **NO emojis** - Technical docs don't need emojis (emojis are OK in ai-reference for internal use)
- **NO emdashes** - Find-and-replace every emdash with prejudice
- **NO overwrought phrasing** - Kill fluff dead
- **NO recognizable AI patterns** - Emoji lists, repetitive phrasing, marketing speak
- **NO content that smells like AI** - If it feels AI-generated, nobody will trust it's accurate

### ✅ Required for Public Documentation

- **Crisp, clear, technical writing** for network engineers
- **Concise and to the point** - optimize for clarity
- **Accurate and verifiable** - test all instructions and code examples
- **Professional tone** - you're writing for NetBox users and network engineers
- **Trustworthy content** - customers must feel confident in the accuracy

**"If it feels like AI wrote it, nobody will trust that you put all the work in to make sure the docs are accurate. It will be immediately discounted."**

## Product Tagging System (REQUIRED)

### Enhanced YAML Frontmatter

**Always include comprehensive frontmatter at the top of every document:**

```yaml
---
tags:
  - cloud
  - enterprise
  - community
title: 'Document Title'
description: 'SEO-friendly description for search and social sharing'
author: 'Author Name or NetBox Labs Documentation Team'
last_updated: 'YYYY-MM-DD'
versions:
  cloud: 'v1.9 | v1.10'
  enterprise: 'v1.9 | v1.10'
  community: 'v4.2'
status: 'current | beta | coming-soon | deprecated'
---
```

### Version Guidelines

Use these version mappings based on document age and content:

#### For Existing Documents (Not Updated Since May 1, 2025)

```yaml
versions:
  cloud: 'v1.9'
  enterprise: 'v1.9'
  community: 'v4.2'
```

#### For Documents Modified Since May 1, 2025

```yaml
versions:
  cloud: 'v1.10'
  enterprise: 'v1.10'
  community: 'v4.2'
```

#### For NetBox Discovery Documents

```yaml
versions:
  cloud: 'v1.10'
  enterprise: 'v1.10'
  community: 'v4.2'
```

#### For NetBox Assurance Documents

```yaml
versions:
  cloud: 'v1.10'
  enterprise: 'v1.10'
  # Note: community not included as Assurance is premium-only
```

#### For NetBox Operator Documents

```yaml
versions:
  cloud: 'v1.10'
  enterprise: 'v1.10'
  # Note: community not included as Operator is premium-only
```

### Version Mapping Reference

| NetBox Cloud/Enterprise | NetBox Community | Release Period         |
| ----------------------- | ---------------- | ---------------------- |
| v1.9                    | v4.2             | Current stable         |
| v1.10                   | v4.2             | Current/Recent updates |
| v1.11                   | v4.2             | Future releases        |

### Complete Frontmatter Fields

#### Required Fields

- **tags**: Product availability tags (required)
- **title**: Document title for SEO and navigation
- **author**: Author name or "NetBox Labs Documentation Team"
- **last_updated**: Date in YYYY-MM-DD format
- **versions**: Version compatibility information

#### Optional Fields

- **description**: SEO meta description
- **status**: Document status (current, beta, coming-soon, deprecated)
- **category**: Content category (feature, integration, admin, getting-started)
- **audience**: Target audience (end-users, admins, developers, all)
- **complexity**: Content complexity (beginner, intermediate, advanced)
- **related_docs**: Array of related document paths
- **external_links**: Array of important external references

#### Example Complete Frontmatter

```yaml
---
tags:
  - cloud
  - enterprise
title: 'NetBox Discovery Agent Configuration'
description: 'Complete guide to configuring the NetBox Discovery Agent for automated network discovery and data collection'
author: 'NetBox Labs Documentation Team'
last_updated: '2025-01-02'
versions:
  cloud: 'v1.10'
  enterprise: 'v1.10'
  community: 'v4.2'
status: 'current'
category: 'feature'
audience: 'admins'
complexity: 'intermediate'
related_docs:
  - '../quickstart-guide.md'
  - 'device_discovery.md'
external_links:
  - 'https://docs.netbox.dev/'
---
```

### Available Product Tags

| Tag          | Display Name      | Use For                                                             |
| ------------ | ----------------- | ------------------------------------------------------------------- |
| `cloud`      | NetBox Cloud      | Cloud-specific features, Administration Console, cloud connectivity |
| `enterprise` | NetBox Enterprise | Enterprise installation, enterprise-specific features               |
| `community`  | NetBox Community  | Open source features, community plugins, SDKs                       |
| `airgap`     | Air-Gap           | Air-gapped deployment scenarios                                     |

### Tagging Guidelines

- **Use only relevant tags** - don't include all tags if feature is product-specific
- **Cloud + Enterprise**: SSO, advanced authentication, premium features
- **All products**: Integrations, SDKs, general NetBox concepts
- **Community + Enterprise**: Open source extensions, plugins
- **Cloud only**: Administration Console, free plan features, cloud connectivity

### Status Field Values

- **current**: Generally available and fully supported
- **beta**: Available in beta or design partner programs
- **coming-soon**: Announced but not yet available
- **deprecated**: Still available but superseded by newer functionality

### Deprecated: HTML Pills

❌ **Don't use HTML pills anymore:**

```html
<!-- OLD - Don't use -->
<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
```

## Product Naming Conventions

### Correct Product Names

- ✅ **NetBox Cloud** (not Netbox Cloud, NetBox cloud, or netbox-cloud)
- ✅ **NetBox Enterprise** (not Netbox Enterprise, NetBox enterprise)
- ✅ **NetBox Discovery** (not Netbox Discovery)
- ✅ **NetBox Assurance** (not Netbox Assurance)
- ✅ **NetBox Operator** (not Netbox Operator)
- ✅ **NetBox Labs** (company name)
- ✅ **Orb distributed agent framework** (not Orb framework)
- ✅ **Diode SDK** (not diode sdk)

### Product-Specific Terms

- ✅ **Administration Console** (NetBox Cloud's admin interface)
- ✅ **NetBox Enterprise Installer** (not NBE installer)
- ✅ **Discovery Agent** (not discovery agent)
- ✅ **Assurance workflows** (not assurance flows)
- ✅ **Operational drift** (not configuration drift - see NetBox Assurance docs)
- ✅ **Design partner program** (for NetBox Operator)

## Writing Style

### Voice and Tone

- **Active voice**: "Configure the setting" not "The setting can be configured"
- **Direct address**: Use "you" to address the reader
- **Conversational yet professional**: Helpful but authoritative
- **Outcome-focused**: Explain what the user will achieve
- **Confident**: Avoid "simply," "just," or "easy" (implies ease when it might not be)

### Headings and Structure

- Use descriptive, action-oriented headings
- Keep heading hierarchy consistent (H1 → H2 → H3)
- Use sentence case for headings: "Setting up authentication" not "Setting Up Authentication"
- Include "Overview" sections for complex topics
- Add "Prerequisites" when setup is required

### Lists and Formatting

- Use numbered lists for sequential steps
- Use bullet points for feature lists or options
- Use **bold** for UI elements: "Click the **Save** button"
- Use `code formatting` for: commands, file names, API endpoints, field names
- Use _italics_ for emphasis or new terms being introduced

## Technical Writing Guidelines

### Code Examples

- Always provide complete, working examples
- Include necessary context (file paths, prerequisites)
- Test all code snippets before publishing
- Use appropriate language tags for syntax highlighting

```yaml
# Good example with context
# File: /opt/netbox/netbox/configuration.py
ALLOWED_HOSTS = ['netbox.example.com']
DEBUG = False
```

### Screenshots and Images

- Include screenshots for complex UI interactions
- Use callouts to highlight important areas
- Keep images up-to-date with current UI
- Store in `docs/images/[feature-name]/` directory
- Provide descriptive alt text for accessibility

### API Documentation

- Show both request and response examples
- Include error handling examples
- Provide curl examples where relevant
- Link to full API documentation

## Content Structure Patterns

### Feature Documentation Pattern

1. **Complete frontmatter** (tags, versions, author, etc.)
2. **Title and overview** - What the feature does
3. **Prerequisites** (if applicable)
4. **Key benefits** - Why users should care
5. **Getting started** - Basic setup
6. **Configuration details** - Advanced options
7. **Use cases** - Real-world scenarios
8. **Troubleshooting** (if applicable)
9. **Related information** - Links to other docs

### Landing Page Pattern (like NetBox Operator)

1. **Complete frontmatter** (tags, versions, author, etc.)
2. **Coming soon notice** (if applicable)
3. **Overview** - What the product does
4. **Key differentiators** - What makes it special
5. **How it works** - Architecture and components
6. **Benefits by audience** - Different user types
7. **Technical requirements**
8. **Getting started** - How to begin
9. **FAQ section**

### Integration Guide Pattern

1. **Complete frontmatter** (tags, versions, author, etc.)
2. **Overview** - What the integration provides
3. **Prerequisites** - Requirements and setup
4. **Installation steps** - Complete setup process
5. **Configuration** - Detailed options
6. **Validation** - How to test it works
7. **Troubleshooting** - Common issues
8. **Advanced topics** - Optional enhancements

## Version and Release Information

### Version Formatting

- Use consistent version numbering: v1.9, v1.10, v1.11
- Include specific release dates when known
- Use "Coming [Month Year]" format for future releases

### Release Status Language

- **Current**: Available now for customers
- **Beta**: Available to design partners or limited users
- **Alpha**: In development, not yet available
- **Coming Soon**: Planned for future release with timeline

### Version-Specific Content

```markdown
!!! info "Version Information"
This feature is available in NetBox Enterprise v1.10 and later (June 23, 2025).

!!! info "Coming Soon"
NetBox Operator is currently in active development with design partners.
[Become a design partner](https://netboxlabs.com/products/netbox-operator/)
to shape the roadmap and gain early access.
```

### Version Compatibility Notes

When documenting features across versions:

- Clearly state minimum version requirements
- Note any version-specific differences
- Provide migration guidance for version updates
- Reference NetBox Community version compatibility

## Common Terminology

### Preferred Terms

- ✅ **Administrator** (not admin when referring to role)
- ✅ **User interface** or **UI** (not GUI)
- ✅ **Log in** (verb) / **Login** (noun)
- ✅ **Set up** (verb) / **Setup** (noun)
- ✅ **Back up** (verb) / **Backup** (noun)
- ✅ **Email** (not e-mail)
- ✅ **Username** (not user name)
- ✅ **Workflow** (not work flow)
- ✅ **Real-time** (not realtime)

### NetBox-Specific Terms

- ✅ **Source of truth** (not single source of truth)
- ✅ **Network documentation** (not network docs)
- ✅ **Infrastructure management** (not infra management)
- ✅ **Semantic map** (NetBox Operator context)
- ✅ **Agentic AI** (NetBox Operator capabilities)

## Admonitions Usage

### When to Use Each Type

```markdown
!!! info "Information"
For general information, context, version details, or background.
Example: Release dates, version requirements, beta status.

!!! tip "Pro Tip"
For best practices, expert advice, or optimization suggestions.
Example: Performance tips, recommended configurations.

!!! warning "Important"
For critical information that could cause problems if ignored.
Example: Breaking changes, security considerations, data loss risks.

!!! note "Note"
For additional context, clarifications, or side information.
Example: Alternative approaches, related considerations.

!!! example "Example"
To introduce code examples or detailed use cases.
Example: Configuration examples, API calls, real-world scenarios.
```

### Admonition Best Practices

- Keep admonitions concise and focused
- Use descriptive titles that explain the content
- Don't overuse - they should highlight truly important information
- Place them logically within the content flow
- Use consistent language: "Coming Soon" for unreleased features

## Link Guidelines

### Internal Links

- Use relative paths from the `docs/` directory
- Include file extensions (.md)
- Use descriptive link text (not "click here")

```markdown
# Good

[Console Access Guide](../Administration Console/console-access.md)
[NetBox Discovery Overview](../netbox-discovery/index.md)

# Bad

[Click here](../Administration Console/console-access.md) for console access
```

### External Links

- Use descriptive text that explains the destination
- Verify links are current and accessible
- Use the full site name for context

```markdown
# Good

[NetBox Community Documentation](https://docs.netbox.dev/)
[NetBox Labs Product Lifecycle](https://netboxlabs.com/product-lifecycle/)

# Bad

[Click here](https://docs.netbox.dev/)
```

## Use Case Framework

### Day 1/Day 1.5/Day 2 Pattern

Based on our NetBox Assurance documentation, use this framework for complex products:

- **Day 1**: Initial setup and population
- **Day 1.5**: Improving maturity and processes
- **Day 2**: Ongoing operations and maintenance

### Audience-Specific Benefits

Structure benefits by user type:

- **Network Engineers**: Technical capabilities and time savings
- **Operations Leaders**: Business value and team efficiency
- **Consulting Partners**: Client value and service differentiation

## Accessibility Guidelines

### Writing for Accessibility

- Use clear, simple language
- Provide alternative text for images
- Use descriptive link text
- Ensure proper heading hierarchy
- Don't rely solely on color to convey information

### Image Accessibility

```markdown
![NetBox Console Dashboard showing the main navigation menu with Discovery and Assurance sections highlighted](../images/console/console-dashboard.png)
```

## Common Mistakes to Avoid

### Writing Issues

- ❌ Using passive voice extensively
- ❌ Saying "simply" or "just" (implies ease when it might not be)
- ❌ Using "we" instead of "you" when addressing the reader
- ❌ Inconsistent product naming
- ❌ Forgetting product tags in frontmatter
- ❌ Missing version information in frontmatter

### Technical Issues

- ❌ Untested code examples
- ❌ Missing prerequisites or context
- ❌ Outdated screenshots
- ❌ Broken internal links
- ❌ Using deprecated HTML pills instead of frontmatter tags
- ❌ Incorrect version mappings

### Structure Issues

- ❌ Poor heading hierarchy
- ❌ Overuse of admonitions
- ❌ Long paragraphs without breaks
- ❌ Missing or unclear section organization
- ❌ Inconsistent use of our content patterns
- ❌ Incomplete frontmatter metadata

## AI-Specific Guidelines

### When Using AI Tools

- Always specify our complete frontmatter system in prompts
- Reference this style guide for consistency
- Validate all technical information against authoritative sources
- Test generated code examples before publishing
- Review for proper NetBox terminology and naming
- Ensure correct version mappings

### Prompt Best Practices

- Include product context (Cloud, Enterprise, Community)
- Specify target audience (admins, end users, developers)
- Reference existing documentation patterns
- Ask for specific content structures (Day 1/1.5/2, audience benefits, etc.)
- Always request complete frontmatter with version information

---

_This style guide should be referenced when creating or editing NetBox documentation, especially when using AI tools for content generation. It incorporates our modern frontmatter tagging system, version tracking, and proven content patterns._
