# Semantic Tagging System for Console Docs

## Overview

The semantic tagging system provides comprehensive content categorization and cross-referencing capabilities for the NetBox Labs console documentation. This system enhances content discovery by automatically analyzing file paths and content to apply appropriate semantic tags.

## Tag Categories

### Product-Specific Tags
These tags identify which NetBox products the content applies to:

- `cloud` - NetBox Cloud features and administration
- `enterprise` - NetBox Enterprise features and installation
- `community` - NetBox Community edition features
- `discovery` - Network discovery and device detection
- `assurance` - Network monitoring and assurance capabilities
- `operator` - AI-powered network operations and automation
- `netbox` - Core NetBox features and functionality
- `airgap` - Air-gapped deployment scenarios

### Authentication & Security Tags
These tags cover identity management and security features:

- `authentication` - User authentication and identity management
- `sso` - Single sign-on configuration and setup
- `ldap` - LDAP authentication and directory services
- `saml` - SAML-based authentication and federation
- `permissions` - User permissions and access control
- `rbac` - Role-based access control and group management
- `security` - Security features and best practices
- `two-factor` - Multi-factor authentication setup

### Database & Operations Tags
These tags cover data management and operational procedures:

- `database` - Database management and operations
- `backup` - Data backup and recovery procedures
- `migration` - Data migration and transfer processes
- `upgrade` - System upgrades and version management
- `monitoring` - System monitoring and health checks
- `notifications` - Alert notifications and messaging
- `alerting` - Alert configuration and management
- `logging` - System logging and audit trails

### APIs & Integration Tags
These tags cover programmatic access and third-party integrations:

- `rest-api` - REST API usage and integration
- `graphql` - GraphQL API and queries
- `webhooks` - Webhook configuration and event handling
- `automation` - Automation tools and workflows

### Cloud Infrastructure Tags
These tags cover networking and infrastructure:

- `cloud-connectivity` - Cloud network connectivity options
- `networking` - Network configuration and management
- `infrastructure` - Infrastructure setup and management
- `connectivity` - Network connectivity and communication

### Content Type Tags
These tags categorize the type of documentation:

- `getting-started` - Introductory guides and quick start documentation
- `installation` - Installation guides and setup procedures
- `configuration` - Configuration guides and settings
- `administration` - Administrative tasks and management
- `troubleshooting` - Problem resolution and debugging guides

### Cross-Cutting Topic Tags
These tags cover topics that span multiple products:

- `high-availability` - High availability setup and configuration
- `performance` - Performance optimization and tuning
- `scalability` - Scaling and capacity planning
- `compliance` - Compliance and regulatory requirements
- `integration` - Third-party integrations and connectors

## Automatic Tagging Rules

### Path-Based Tagging
The system automatically applies tags based on file location:

```
Administration Console/ → cloud, administration, configuration
NetBox Cloud/ → cloud, getting-started
netbox-enterprise/ → enterprise, installation, configuration
netbox-discovery/ → discovery, networking
netbox-assurance/ → assurance, monitoring
netbox-operator/ → operator, automation
cloud-connectivity/ → cloud-connectivity, networking, infrastructure
```

### Content-Based Tagging
The system analyzes file content for specific patterns:

#### SSO Detection
- Files containing "single sign-on", "SSO", "OIDC", "OAuth" → `sso`, `authentication`
- Files containing "SAML", "x509cert", "Identity Provider" → `saml`, `sso`, `authentication`
- Files containing "LDAP", "Active Directory", "AUTH_LDAP" → `ldap`, `authentication`

#### Security Detection
- Files containing "permissions", "access control", "group mapping" → `permissions`, `rbac`
- Files containing "security", "encryption", "certificate" → `security`
- Files containing "two-factor", "2FA", "multi-factor" → `two-factor`

#### Operations Detection
- Files containing "backup", "restore", "database backup" → `backup`, `database`
- Files containing "upgrade", "upgrading", "version upgrade" → `upgrade`, `administration`
- Files containing "monitoring", "health check" → `monitoring`

#### Cloud Infrastructure Detection
- Files containing "AWS", "Azure", "GCP", "Direct Connect" → `cloud-connectivity`
- Files containing "networking", "VPN", "IPsec" → `networking`

### Filename-Based Tagging
Special handling for common filename patterns:

- Files with "sso" in name → `sso`, `authentication`
- Files with "saml" in name → `saml`, `sso`, `authentication`
- Files with "ldap" in name → `ldap`, `authentication`
- Files with "group-map" in name → `rbac`, `permissions`
- Files with "backup" in name → `backup`, `database`
- Files with "upgrade" in name → `upgrade`, `administration`

## Usage

### Running the Semantic Tagging Tool

#### Dry Run (Preview Changes)
```bash
npm run semantic-tag-dry
```

This will analyze all files and show what tags would be added without making changes.

#### Apply Semantic Tags
```bash
npm run semantic-tag
```

This will analyze and update all markdown files with appropriate semantic tags.

#### Manual Usage
```bash
# Dry run on specific directory
node scripts/semantic-tagging.js docs/Administration\ Console --dry-run

# Apply tags to specific directory
node scripts/semantic-tagging.js docs/netbox-enterprise
```

### Integration with Existing Workflow

The semantic tagging system:
- **Preserves existing tags** - Never removes manually added tags
- **Adds missing semantic tags** - Only adds new tags that aren't already present
- **Updates last_updated field** - Automatically updates the last modified date
- **Extracts titles** - Adds title from first heading if not present

## Cross-Cutting Topic Examples

### SSO Configuration Across Products

Files tagged with `sso` + `saml`:
- `docs/Administration Console/saml-sso-setup.md` (`cloud`, `sso`, `saml`, `authentication`)
- `docs/netbox-enterprise/nbe-saml.md` (`enterprise`, `sso`, `saml`, `authentication`)

Files tagged with `sso` + `ldap`:
- `docs/netbox-enterprise/nbe-ldap.md` (`enterprise`, `ldap`, `authentication`)

### Group Mapping Across Identity Providers

Files tagged with `rbac` + `permissions`:
- `docs/Administration Console/azure-group-mapping.md` (`cloud`, `rbac`, `permissions`)
- `docs/Administration Console/okta-group-mapping.md` (`cloud`, `rbac`, `permissions`)
- `docs/netbox-enterprise/nbe-azure-group-mapping.md` (`enterprise`, `rbac`, `permissions`)

### Database Operations

Files tagged with `backup` + `database`:
- `docs/Administration Console/working_with_database_backups.md` (`cloud`, `backup`, `database`)
- `docs/netbox-enterprise/nbe-backups.md` (`enterprise`, `backup`, `database`)

### Cloud Connectivity Options

Files tagged with `cloud-connectivity`:
- `docs/cloud-connectivity/aws-direct-connect.md` (`cloud-connectivity`, `networking`)
- `docs/cloud-connectivity/aws-private-link.md` (`cloud-connectivity`, `networking`)
- `docs/cloud-connectivity/ipsec-vpn-tunnels.md` (`cloud-connectivity`, `networking`)

## Benefits

### Enhanced Content Discovery
- Users can find all SSO-related content across products by searching for `sso` tag
- Related authentication methods are cross-referenced through consistent tagging
- Similar procedures across Cloud and Enterprise are easily discoverable

### Better DocHub Integration
- Semantic tags provide structured metadata for the upstream DocHub repository
- Cross-cutting topics are properly categorized for better user experience
- Content filtering and navigation are enhanced through consistent tagging

### Improved Search and Navigation
- Search results can be filtered by semantic categories
- Related content is automatically linked through shared tags
- Topic-based browsing becomes possible across product boundaries

### Maintenance Benefits
- Automated tagging reduces manual effort
- Consistent tag application across the entire documentation set
- Easy identification of content gaps through tag analysis

## Quality Assurance

### Tag Validation
The system includes validation to ensure:
- All applied tags exist in `docs/tags.yml`
- Tags are consistently applied across similar content
- No duplicate or conflicting tags are added

### Content Analysis
Regular analysis helps identify:
- Content that should be cross-referenced but isn't tagged consistently
- Missing semantic tags for important topics
- Opportunities for better content organization

### Reporting
The tagging tool provides detailed reports on:
- Number of files processed and updated
- Most commonly applied tags
- Files that need manual review

## Future Enhancements

### Planned Features
- **Automatic cross-references** - Generate "Related Topics" sections based on shared tags
- **Tag-based navigation** - Create topic-based navigation menus
- **Content gap analysis** - Identify missing documentation based on tag patterns
- **Integration validation** - Ensure DocHub integration requirements are met

### Advanced Tagging Rules
- **Version-specific tagging** - Apply version-specific tags based on content analysis
- **Audience-specific tagging** - Tag content for different user roles (admin, developer, end-user)
- **Complexity tagging** - Automatically assess and tag content complexity levels

---

This semantic tagging system provides a foundation for enhanced content discovery and cross-referencing while maintaining consistency with the main DocHub tagging system for seamless integration. 