---
tags:
  - cloud
  - enterprise
title: "NetBox Assurance"
description: "Automated operational drift detection for NetBox - continuously monitor network infrastructure and maintain accurate documentation with proactive remediation capabilities"
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
status: "current"
category: "product-overview"
audience: "all"
complexity: "intermediate"
related_docs:
  - "getting-started.md"
  - "using-the-ui.md"
  - "../netbox-discovery/index.md"
external_links:
  - "https://netboxlabs.com/docs/console/netbox-assurance/"
---

# NetBox Assurance

NetBox Assurance is an add-on component for NetBox Enterprise that automatically detects when your real-world network infrastructure diverges from what's documented in NetBox—what we call "operational drift." Instead of hoping your documentation stays current, Assurance proactively identifies and helps remediate gaps between reality and your source of truth.

## What Makes NetBox Assurance Unique

**Continuous Drift Detection**: Automatically compares live network data against your NetBox documentation to identify discrepancies as they occur, not during incidents.

**Source-of-Truth Integration**: Purpose-built for NetBox's structured data model, ensuring seamless integration with your existing network documentation workflows.

**Proactive Alerting**: Surface deviations in a prioritized dashboard showing what needs your team's attention, with actionable insights for remediation.

**Audit-Ready Compliance**: Provides comprehensive audit trails and historical tracking to support regulatory requirements and change management processes.

## Business Impact

### Operational Excellence
- **Faster Incident Resolution**: Trust your documentation when you need it most during outages and troubleshooting
- **Reduced Operational Overhead**: Eliminate manual documentation verification and reconciliation processes
- **Improved Change Management**: Immediately see the impact of network changes with automated validation

### Compliance & Security
- **Enhanced Security Posture**: Detect unauthorized or non-compliant network changes in real-time
- **Audit Readiness**: Maintain detailed change tracking and compliance reporting for regulatory requirements
- **Risk Mitigation**: Prevent misconfigurations and security vulnerabilities through continuous validation

### Team Efficiency
- **Cross-Team Collaboration**: Enable better coordination between NetOps, SecOps, and DevOps teams
- **Automated Workflows**: Reduce manual effort with intelligent categorization and bulk processing capabilities
- **Scalable Operations**: Handle complex, multi-vendor environments without increasing operational burden

## Key Features

**Automated Data Ingestion**: Receives network data through NetBox Discovery agents, controller integrations, or the Diode API, with automatic processing and categorization.

**Intelligent Deviation Detection**: Smart categorization of drift types including infrastructure changes, new device discovery, and data quality issues.

**Workflow Integration**: Built-in processes for accepting updates, investigating anomalies, and bulk processing similar deviations.

**Historical Tracking**: Complete audit trails showing how your network changes over time, with status tracking and timestamps for operational accountability.

**Real-Time Dashboards**: Visual representation of network health with prioritized deviation lists and trend analysis.

**Bulk Operations**: Efficient processing of multiple similar deviations with streamlined approval workflows.

## How It Works

1. **Data Collection**: Network data flows into NetBox Enterprise through multiple channels:
   - NetBox Discovery agents for automated network scanning
   - Controller integrations (VMware vCenter, Juniper Mist, Cisco Catalyst Center)
   - Diode API for custom integrations and legacy systems

2. **Comparison & Analysis**: Assurance continuously compares ingested data against your documented network intent in NetBox, identifying discrepancies automatically.

3. **Deviation Categorization**: Changes are intelligently categorized by type:
   - New infrastructure discovered
   - Configuration drift detected
   - Data quality inconsistencies
   - Unauthorized modifications

4. **Workflow Management**: Process deviations through structured workflows:
   - Accept & Update NetBox documentation
   - Investigate for deeper analysis
   - Archive processed items with audit trails

## Primary Use Cases

### Network Asset Management
Automatically discover and track new devices, interfaces, and connections as your network evolves, ensuring NetBox always reflects current reality.

### Compliance & Auditing
Maintain real-time visibility into network changes for regulatory compliance, with detailed audit trails and automated reporting capabilities.

### Change Validation
Verify that planned network changes are properly implemented and documented, with immediate detection of unintended modifications.

### Security Monitoring
Identify unauthorized network modifications, configuration changes, or new device additions that could represent security risks.

### Infrastructure Documentation
Keep network documentation accurate and up-to-date without manual effort, supporting operational efficiency and knowledge management.

## Integration with Existing Workflows

### NetDevOps & Automation
- Seamlessly integrates with Ansible, Terraform, and CI/CD pipelines
- Validates automated network changes in real-time
- Provides feedback loops for Infrastructure as Code workflows

### Monitoring & Observability
- Complements existing monitoring tools with configuration-level insights
- Integrates with SIEM and alerting systems through APIs
- Supports custom dashboards and reporting requirements

### ITSM & Change Management
- Provides audit trails for ITSM platforms
- Supports approval workflows and change tracking
- Enables compliance reporting for change management processes

## Who Benefits Most

### Large Enterprises
Organizations with complex, multi-vendor networks requiring continuous validation and compliance reporting.

### Service Providers
MSPs and ISPs managing diverse customer networks at scale, needing automated validation and multi-tenant visibility.

### Regulated Industries
Financial services, healthcare, and government organizations with strict compliance and auditing requirements.

### DevOps-Focused Teams
Organizations implementing network automation and Infrastructure as Code practices requiring continuous validation.

## Availability

NetBox Assurance is available as an add-on component for NetBox Enterprise starting with version 1.10. Your license file determines whether Assurance capabilities are enabled.

**For Existing NetBox Enterprise Users**: Contact [NetBox Labs](https://netboxlabs.com/contact/) to add Assurance to your deployment.

**For New Users**: NetBox Assurance is included with NetBox Enterprise subscriptions and can be enabled during installation.

**Note**: Even without an Assurance license, NetBox Enterprise includes Diode for powerful data ingestion capabilities. Assurance adds the drift detection and management layer on top of this foundation.

## Getting Started

1. **Enable Assurance**: Ensure your NetBox Enterprise license includes Assurance capabilities
2. **Configure Data Sources**: Set up NetBox Discovery agents or integrate with your network controllers
3. **Review Initial Deviations**: Process the initial set of discovered discrepancies to establish baseline
4. **Establish Workflows**: Configure team processes for handling different types of deviations
5. **Monitor & Optimize**: Use dashboards and reports to track network health and optimize processes

For detailed setup instructions, see our [getting started guide](getting-started-with-nbc.md).

For UI workflow documentation, see [Using the NetBox Assurance UI](using-the-ui.md).

## Documentation

- [Using the NetBox Assurance UI](using-the-ui.md)
- [Getting Started with NetBox Cloud](getting-started-with-nbc.md)

**Learn More**: [Contact NetBox Labs](https://netboxlabs.com/contact/) to discuss how NetBox Assurance can transform your network operations and compliance posture.

---

With **NetBox Assurance**, teams can detect, report, and resolve network deviations in real time, ensuring a consistent and reliable network environment through continuous validation and corrective actions. Transform your network operations by ensuring your documentation stays current and accurate, enabling faster incident resolution, better compliance, and the confidence to move quickly with reliable network automation.