---
tags:
  - cloud
  - enterprise
  - community
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-02"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
status: "current"
category: "style-guide"
audience: "developers"
complexity: "intermediate"
---

# AI Prompting Guide for NetBox Documentation

This guide provides best practices for using AI tools to create, edit, and enhance NetBox documentation while maintaining consistency with our style guide and tagging system.

## Essential Context for AI Tools

### Always Include This Context
When working with AI on NetBox documentation, always provide this essential context:

```
You are helping create documentation for NetBox Labs products. Key requirements:

1. Complete YAML Frontmatter: Always include comprehensive frontmatter with version tracking
   Format: 
   ---
   tags:
     - netbox-cloud
     - netbox-enterprise
     - netbox-community
   title: "Document Title"
   author: "Author Name or NetBox Labs Documentation Team"
   last_updated: "YYYY-MM-DD"
   versions:
     cloud: "v1.9 | v1.10"
     enterprise: "v1.9 | v1.10"
     community: "v4.2"
   status: "current | beta | coming-soon | deprecated"
   ---

2. Version Guidelines:
   - Existing docs (not updated since May 1, 2025): v1.9 for Cloud/Enterprise
   - Modified docs (since May 1, 2025): v1.10 for Cloud/Enterprise
   - NetBox Community always maps to v4.2
   - Discovery/Assurance/Operator: v1.10 for Cloud/Enterprise

3. Product Names: Use exact capitalization
   - NetBox Cloud (not Netbox Cloud)
   - NetBox Enterprise (not Netbox Enterprise)  
   - NetBox Discovery, NetBox Assurance, NetBox Operator
   - Administration Console (NetBox Cloud's admin interface)

4. Writing Style: Active voice, direct address ("you"), professional but conversational

5. Content Patterns: Use our proven structures (Day 1/1.5/2, audience benefits, 3-key-differentiators)
```

## Version-Specific Prompting

### Version Guidelines for AI Context
Always specify appropriate version information when prompting:

```
Version Context for AI:

For existing documents not updated since May 1, 2025:
versions:
  cloud: "v1.9"
  enterprise: "v1.9"
  community: "v4.2"

For documents modified since May 1, 2025:
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"

For NetBox Discovery documents:
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"

For NetBox Assurance documents (premium only):
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: no community version

For NetBox Operator documents (premium only):
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  # Note: no community version
```

## Product-Specific Prompting

### For NetBox Discovery Content
```
Context: NetBox Discovery includes Network Discovery, Device Discovery, and Controller Discovery integrations (VMware vCenter, Juniper Mist, Cisco Catalyst Center, Microsoft DHCP, AWS VPC IPAM). Uses Orb distributed agent framework and Diode SDK. Available across all NetBox editions with different capabilities.

Tags to use: netbox-cloud, netbox-enterprise, netbox-community
Versions: cloud: "v1.10", enterprise: "v1.10", community: "v4.2"
Key terms: "Discovery Agent", "Orb distributed agent framework", "Diode SDK"
```

### For NetBox Assurance Content
```
Context: NetBox Assurance detects "operational drift" (not "configuration drift") between intended NetBox state and actual network state. Premium feature for Cloud/Enterprise only. Coming April 2025 for Enterprise, May 2025 for Cloud.

Tags to use: netbox-cloud, netbox-enterprise (NOT netbox-community)
Versions: cloud: "v1.10", enterprise: "v1.10" (no community version)
Key terms: "operational drift", "Assurance workflows", "Day 1/Day 1.5/Day 2 framework"
Status: "coming-soon"
```

### For NetBox Operator Content
```
Context: NetBox Operator provides AI-powered network operations using NetBox as the semantic map. Currently in design partner program. Uses "agentic AI" and provides "semantic awareness" for network operations.

Tags to use: netbox-cloud, netbox-enterprise (NOT netbox-community)
Versions: cloud: "v1.10", enterprise: "v1.10" (no community version)
Key terms: "agentic AI", "semantic map", "design partner program", "AI superpowers"
Status: "coming-soon"
```

### For Administration Console Content
```
Context: Administration Console is NetBox Cloud's management interface. Cloud-specific feature for managing instances, users, connectivity, and billing.

Tags to use: netbox-cloud (ONLY - not Enterprise or Community)
Versions: cloud: "v1.10" (no enterprise or community versions)
Key terms: "Administration Console", "NetBox Cloud", cloud-specific features
```

## Content Structure Prompts

### For Feature Documentation
```
Create feature documentation using this structure:
1. Complete frontmatter with version tracking and metadata
2. Brief overview (1-2 sentences of value)
3. "What Makes [Feature] Different" (3 key benefits)
4. "How It Works" (technical explanation)
5. "Who Benefits" (by audience type)
6. "Key Capabilities" (organized by category)
7. "Getting Started" (clear next steps)
8. Use cases (Day 1/1.5/2 when applicable)
9. FAQ section

Include proper version information based on document type and update status.
Reference our NetBox Operator page as a successful example.
```

### For Landing Pages
```
Create a product landing page using our proven pattern:
1. Complete frontmatter with appropriate version tracking
2. Status notice (Coming Soon, Beta, Available)
3. Value proposition (immediate benefit)
4. 3 key differentiators (unique capabilities)
5. How it works (architecture/components)
6. Audience-specific benefits
7. Key capabilities by category
8. Prerequisites and requirements
9. Getting started steps
10. Use cases with Challenge/Solution/Outcome
11. FAQ section

Use active voice, concrete language, avoid marketing speak.
Include version information appropriate for the product's availability.
```

### For Integration Guides
```
Create an integration guide with:
1. Complete frontmatter including version compatibility
2. Overview of what the integration provides
3. Prerequisites (technical and access requirements)
4. Installation steps (complete, tested)
5. Configuration details (with code examples)
6. Validation steps (how to verify it works)
7. Troubleshooting common issues
8. Advanced configuration options

Include working code examples and proper syntax highlighting.
Specify version requirements for all components.
```

## Enhanced Frontmatter Prompting

### Complete Frontmatter Request
```
Always include complete frontmatter with these fields:

Required:
- tags: [appropriate product tags]
- title: "Descriptive Document Title"
- author: "Author Name or NetBox Labs Documentation Team"
- last_updated: "YYYY-MM-DD" (today's date)
- versions: [appropriate version mapping]
- status: [current/beta/coming-soon/deprecated]

Optional but recommended:
- description: "SEO-friendly description"
- category: [feature/integration/admin/getting-started/product-overview]
- audience: [end-users/admins/developers/all]
- complexity: [beginner/intermediate/advanced]
- related_docs: [array of related document paths]
- external_links: [array of relevant external resources]
```

### Version-Specific Frontmatter Examples
```
# For existing Administration Console docs:
versions:
  cloud: "v1.9"

# For new NetBox Discovery content:
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"

# For NetBox Assurance (premium):
versions:
  cloud: "v1.10"
  enterprise: "v1.10"

# For updated integration guides:
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v4.2"
```

## Style and Voice Prompts

### Writing Style
```
Write in NetBox documentation style:
- Active voice: "Configure the setting" not "The setting can be configured"
- Direct address: Use "you" to address readers
- Confident tone: Avoid "simply", "just", "easy"
- Outcome-focused: Explain what users will achieve
- Professional but conversational
- Concrete language over marketing speak
```

### Technical Writing
```
For technical content:
- Provide complete, working code examples
- Include file paths and context
- Use proper syntax highlighting
- Test all examples before including
- Explain prerequisites clearly
- Include error handling where relevant
- Specify version requirements for all components
```

## Common Prompting Mistakes to Avoid

### ❌ Don't Do This
```
"Write documentation for NetBox Discovery using pills to show it works with all products"
```
**Problems**: References deprecated HTML pills, doesn't specify our frontmatter system

### ❌ Don't Do This
```
"Create simple docs for netbox assurance"
```
**Problems**: Incorrect capitalization, uses "simple" (avoid this word), no context about product specifics, no version information

### ❌ Don't Do This
```
"Update this doc with new tags but keep everything else the same"
```
**Problems**: Doesn't specify version tracking, missing frontmatter updates

### ✅ Do This Instead
```
"Create NetBox Assurance documentation using complete YAML frontmatter (tags: netbox-cloud, netbox-enterprise only - not community; versions: cloud v1.10, enterprise v1.10; status: coming-soon). Focus on operational drift detection, premium feature status, and Day 1/1.5/2 framework. Include coming soon notice for April 2025 Enterprise, May 2025 Cloud. Author: NetBox Labs Documentation Team, last_updated: 2025-01-02."
```

## Effective Prompting Patterns

### For New Content
```
Create [content type] for [NetBox product] that:
1. Uses complete YAML frontmatter with:
   - tags: [specific tags]
   - versions: [specific version mapping]
   - author: [author name]
   - last_updated: [current date]
   - status: [appropriate status]
2. Follows our [specific template/pattern]
3. Includes [specific sections needed]
4. Targets [specific audience]
5. Emphasizes [key benefits/capabilities]
6. Uses proper NetBox terminology and capitalization
7. References [any specific authoritative sources]
8. Includes version compatibility information throughout
```

### For Content Updates
```
Update this [content type] to:
1. Add complete YAML frontmatter with version tracking
2. Convert any HTML pills to frontmatter tags
3. Align with our style guide (active voice, direct address)
4. Add [specific new information]
5. Update version information based on [document age/type]
6. Improve [specific aspect]
7. Ensure consistency with [related documentation]
8. Maintain our proven content patterns
9. Update last_updated field to current date
```

### For Content Review
```
Review this documentation for:
1. Complete and correct YAML frontmatter
2. Proper version tracking and mapping
3. Correct NetBox product naming and terminology
4. Style guide compliance (active voice, direct address)
5. Content pattern consistency
6. Technical accuracy
7. Link validity and image references
8. Audience-appropriate language and structure
9. Version compatibility information accuracy
```

## Advanced Prompting Techniques

### Multi-Step Content Creation
```
Step 1: Create outline for [content] including:
- Appropriate product tags and version mapping
- Target audience and complexity level
- Key sections needed
- Content patterns to use
- Author and metadata information

Step 2: Write the content following the outline with complete frontmatter
Step 3: Review for style guide compliance and version accuracy
Step 4: Optimize for our proven patterns and user experience
```

### Version-Aware Content Updates
```
Update this content considering version requirements:
1. Analyze current version information and document age
2. Apply appropriate version mapping (v1.9 vs v1.10)
3. Update frontmatter with correct versions
4. Ensure content reflects version-specific capabilities
5. Add version compatibility notes where relevant
6. Update last_updated field to current date
```

## Quality Assurance Prompts

### Content Validation
```
Validate this documentation for:
- Complete YAML frontmatter with all required fields
- Correct version mapping and compatibility information
- NetBox product naming consistency
- Style guide compliance
- Technical accuracy
- Link functionality
- Image references and alt text
- Accessibility considerations
- Version-specific feature availability
```

### Integration Testing
```
Check this content for dochub integration:
- Proper frontmatter structure and syntax
- Valid markdown syntax
- Appropriate heading hierarchy
- Working internal links
- Proper image paths
- SEO-friendly structure
- Version tracking compatibility with build system
```

## Prompt Templates by Use Case

### Creating Feature Documentation
```
Create comprehensive feature documentation for [Feature Name] with:

Context: [Specific product context, availability, key capabilities]
Tags: [Specific YAML tags to use]
Versions: [Specific version mapping based on feature/document type]
Author: [Author name or NetBox Labs Documentation Team]
Status: [current/beta/coming-soon based on availability]
Audience: [Primary and secondary audiences]
Template: Use our netbox-feature-doc-template.md structure
Key Points: [3-5 most important things to communicate]
Examples: [Any specific examples or use cases to include]
References: [Authoritative sources to reference]

Ensure active voice, proper NetBox terminology, version tracking, and our proven content patterns.
```

### Updating Existing Content
```
Update this existing documentation to:

1. Add complete YAML frontmatter with version tracking
2. Apply version mapping: [specify based on document age and type]
3. Convert any HTML pills to frontmatter tags
4. Align with current style guide
5. Add new information about: [specific updates]
6. Improve [specific aspects - clarity, structure, examples]
7. Maintain consistency with: [related documentation]
8. Ensure technical accuracy and working examples
9. Update last_updated field to 2025-01-02
10. Set appropriate status field

Preserve good existing content while modernizing format and adding version tracking.
```

---

*This prompting guide helps ensure consistent, high-quality NetBox documentation when using AI tools, incorporating our modern frontmatter system with comprehensive version tracking and proven content patterns.* 