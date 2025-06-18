# AI Prompting Guide for NetBox Documentation

This guide provides best practices for using AI tools to create, edit, and enhance NetBox documentation while maintaining consistency with our style guide and tagging system.

## Essential Context for AI Tools

### Always Include This Context
When working with AI on NetBox documentation, always provide this essential context:

```
You are helping create documentation for NetBox Labs products. Key requirements:

1. YAML Frontmatter Tags: Always use YAML frontmatter tags, never HTML pills
   Format: 
   ---
   tags:
     - netbox-cloud
     - netbox-enterprise
     - netbox-community
   ---

2. Product Names: Use exact capitalization
   - NetBox Cloud (not Netbox Cloud)
   - NetBox Enterprise (not Netbox Enterprise)  
   - NetBox Discovery, NetBox Assurance, NetBox Operator
   - Administration Console (NetBox Cloud's admin interface)

3. Writing Style: Active voice, direct address ("you"), professional but conversational

4. Content Patterns: Use our proven structures (Day 1/1.5/2, audience benefits, 3-key-differentiators)
```

## Product-Specific Prompting

### For NetBox Discovery Content
```
Context: NetBox Discovery includes Network Discovery, Device Discovery, and Controller Discovery integrations (VMware vCenter, Juniper Mist, Cisco Catalyst Center, Microsoft DHCP, AWS VPC IPAM). Uses Orb distributed agent framework and Diode SDK. Available across all NetBox editions with different capabilities.

Tags to use: netbox-cloud, netbox-enterprise, netbox-community
Key terms: "Discovery Agent", "Orb distributed agent framework", "Diode SDK"
```

### For NetBox Assurance Content
```
Context: NetBox Assurance detects "operational drift" (not "configuration drift") between intended NetBox state and actual network state. Premium feature for Cloud/Enterprise only. Coming April 2025 for Enterprise, May 2025 for Cloud.

Tags to use: netbox-cloud, netbox-enterprise (NOT netbox-community)
Key terms: "operational drift", "Assurance workflows", "Day 1/Day 1.5/Day 2 framework"
```

### For NetBox Operator Content
```
Context: NetBox Operator provides AI-powered network operations using NetBox as the semantic map. Currently in design partner program. Uses "agentic AI" and provides "semantic awareness" for network operations.

Tags to use: netbox-cloud, netbox-enterprise (NOT netbox-community)
Key terms: "agentic AI", "semantic map", "design partner program", "AI superpowers"
```

### For Administration Console Content
```
Context: Administration Console is NetBox Cloud's management interface. Cloud-specific feature for managing instances, users, connectivity, and billing.

Tags to use: netbox-cloud (ONLY - not Enterprise or Community)
Key terms: "Administration Console", "NetBox Cloud", cloud-specific features
```

## Content Structure Prompts

### For Feature Documentation
```
Create feature documentation using this structure:
1. Product tags in YAML frontmatter
2. Brief overview (1-2 sentences of value)
3. "What Makes [Feature] Different" (3 key benefits)
4. "How It Works" (technical explanation)
5. "Who Benefits" (by audience type)
6. "Key Capabilities" (organized by category)
7. "Getting Started" (clear next steps)
8. Use cases (Day 1/1.5/2 when applicable)
9. FAQ section

Reference our NetBox Operator page as a successful example.
```

### For Landing Pages
```
Create a product landing page using our proven pattern:
1. Status notice (Coming Soon, Beta, Available)
2. Value proposition (immediate benefit)
3. 3 key differentiators (unique capabilities)
4. How it works (architecture/components)
5. Audience-specific benefits
6. Key capabilities by category
7. Prerequisites and requirements
8. Getting started steps
9. Use cases with Challenge/Solution/Outcome
10. FAQ section

Use active voice, concrete language, avoid marketing speak.
```

### For Integration Guides
```
Create an integration guide with:
1. Overview of what the integration provides
2. Prerequisites (technical and access requirements)
3. Installation steps (complete, tested)
4. Configuration details (with code examples)
5. Validation steps (how to verify it works)
6. Troubleshooting common issues
7. Advanced configuration options

Include working code examples and proper syntax highlighting.
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
```

## Common Prompting Mistakes to Avoid

### ❌ Don't Do This
```
"Write documentation for NetBox Discovery using pills to show it works with all products"
```
**Problems**: References deprecated HTML pills, doesn't specify our tagging system

### ❌ Don't Do This
```
"Create simple docs for netbox assurance"
```
**Problems**: Incorrect capitalization, uses "simple" (avoid this word), no context about product specifics

### ✅ Do This Instead
```
"Create NetBox Assurance documentation using YAML frontmatter tags (netbox-cloud, netbox-enterprise only - not community). Focus on operational drift detection, premium feature status, and Day 1/1.5/2 framework. Include coming soon notice for April 2025 Enterprise, May 2025 Cloud."
```

## Effective Prompting Patterns

### For New Content
```
Create [content type] for [NetBox product] that:
1. Uses YAML frontmatter with tags: [specific tags]
2. Follows our [specific template/pattern]
3. Includes [specific sections needed]
4. Targets [specific audience]
5. Emphasizes [key benefits/capabilities]
6. Uses proper NetBox terminology and capitalization
7. References [any specific authoritative sources]
```

### For Content Updates
```
Update this [content type] to:
1. Convert HTML pills to YAML frontmatter tags
2. Align with our style guide (active voice, direct address)
3. Add [specific new information]
4. Improve [specific aspect]
5. Ensure consistency with [related documentation]
6. Maintain our proven content patterns
```

### For Content Review
```
Review this documentation for:
1. Correct YAML frontmatter tagging
2. Proper NetBox product naming and terminology
3. Style guide compliance (active voice, direct address)
4. Content pattern consistency
5. Technical accuracy
6. Link validity and image references
7. Audience-appropriate language and structure
```

## Advanced Prompting Techniques

### Multi-Step Content Creation
```
Step 1: Create outline for [content] including:
- Appropriate product tags
- Target audience
- Key sections needed
- Content patterns to use

Step 2: Write the content following the outline
Step 3: Review for style guide compliance
Step 4: Optimize for our proven patterns
```

### Iterative Improvement
```
Improve this content by:
1. Analyzing current structure against our templates
2. Identifying gaps or inconsistencies
3. Suggesting specific improvements
4. Maintaining existing good elements
5. Ensuring proper tagging and terminology
```

### Context-Aware Prompting
```
Based on our existing [related documentation], create [new content] that:
- Maintains consistency with established patterns
- References appropriate related content
- Uses similar structure and tone
- Avoids duplication while adding new value
- Follows our navigation and linking conventions
```

## Quality Assurance Prompts

### Content Validation
```
Validate this documentation for:
- YAML frontmatter syntax and appropriate tags
- NetBox product naming consistency
- Style guide compliance
- Technical accuracy
- Link functionality
- Image references and alt text
- Accessibility considerations
```

### Integration Testing
```
Check this content for dochub integration:
- Proper frontmatter structure
- Valid markdown syntax
- Appropriate heading hierarchy
- Working internal links
- Proper image paths
- SEO-friendly structure
```

## Prompt Templates by Use Case

### Creating Feature Documentation
```
Create comprehensive feature documentation for [Feature Name] with:

Context: [Specific product context, availability, key capabilities]
Tags: [Specific YAML tags to use]
Audience: [Primary and secondary audiences]
Template: Use our netbox-feature-doc-template.md structure
Key Points: [3-5 most important things to communicate]
Examples: [Any specific examples or use cases to include]
References: [Authoritative sources to reference]

Ensure active voice, proper NetBox terminology, and our proven content patterns.
```

### Updating Existing Content
```
Update this existing documentation to:

1. Convert to YAML frontmatter tags: [specific tags]
2. Align with current style guide
3. Add new information about: [specific updates]
4. Improve [specific aspects - clarity, structure, examples]
5. Maintain consistency with: [related documentation]
6. Ensure technical accuracy and working examples

Preserve good existing content while modernizing format and style.
```

---

*This prompting guide helps ensure consistent, high-quality NetBox documentation when using AI tools, incorporating our modern tagging system and proven content patterns.* 