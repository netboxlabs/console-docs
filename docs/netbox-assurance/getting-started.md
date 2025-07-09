---
tags:
  - cloud
  - enterprise
  - assurance
  - getting-started
  - installation
  - configuration
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
status: "current"
related_docs:
  - "index.md"
  - "using-the-ui.md"
  - "../netbox-discovery/getting-started.md"
  - "../netbox-extensions/diode/index.md"
external_links:
  - "https://netdev.chat/"
---

# Getting Started with NetBox Assurance

This guide will help you set up, configure, and start using NetBox Assurance to maintain accurate network documentation and proactive drift detection. Follow these steps to go from installation to your first operational workflow.

## Prerequisites

Before enabling NetBox Assurance, ensure you have:

### **Technical Requirements**
- NetBox Enterprise 1.10+ or NetBox Cloud (coming soon) with Assurance add-on
- Active NetBox Assurance license
- Network connectivity for data ingestion sources

### **Data Sources**
To maximize value from NetBox Assurance, you'll need at least one data source:

- **[NetBox Discovery](../netbox-discovery/getting-started.md)** - Recommended for automated network discovery
- **Controller integrations** - For centralized network management platforms
- **Custom integrations** - Using the [Diode SDK](../netbox-extensions/diode/index.md)

### **Team Preparation**
- Identify team members who will manage deviations
- Define your drift tolerance and remediation policies
- Plan your initial network segment for testing

## Installation and Setup

### **NetBox Enterprise**
NetBox Assurance is available as an **optional component** of NetBox Enterprise. During installation, your license file determines whether Assurance is enabled.

**Installation Steps:**
1. Verify your license includes NetBox Assurance entitlement
2. During NetBox Enterprise installation, Assurance services are automatically deployed if licensed
3. The NetBox Assurance UI and Diode data plugins are installed automatically
4. Access the Assurance menu in your NetBox interface to confirm installation

### **NetBox Cloud**
NetBox Assurance will be available as an **optional add-on** for NetBox Cloud in a future release.

**Coming Soon:**
NetBox Assurance for NetBox Cloud is currently in development. When available, it will feature:
1. Seamless integration as an optional add-on
2. Automatic provisioning and setup
3. Built-in UI and Diode data plugins
4. No additional configuration required

Stay tuned for availability updates.

### **Verification**
After installation, verify NetBox Assurance is working:
1. Log into your NetBox instance
2. Look for the **Assurance** menu in the sidebar
3. Navigate to **Assurance > Deviations** to access the main interface
4. Confirm you can see the deviation management interface

## Initial Configuration

### **Data Source Setup**
Choose and configure your primary data source:

#### **Option 1: NetBox Discovery (Recommended)**
1. Follow the [NetBox Discovery setup guide](../netbox-discovery/getting-started.md)
2. Configure discovery agents for your network segments
3. Set up automated discovery schedules
4. Verify data is flowing into NetBox

#### **Option 2: Controller Integrations**
1. Configure your network controllers (VMware vCenter, Juniper Mist, etc.)
2. Set up API access and credentials
3. Configure data collection schedules
4. Test connectivity and data flow

#### **Option 3: Custom Diode Integration**
1. Review the [Diode integration documentation](../netbox-extensions/diode/index.md)
2. Develop custom integrations using Python or Go SDKs
3. Configure data ingestion pipelines
4. Test data flow and validation

## Your First Workflow

### **Phase 1: Initial Data Ingestion**
Start with a small, well-understood network segment:

1. **Select a test segment**: Choose 10-20 devices you know well
2. **Configure data source**: Set up discovery or integration for this segment
3. **Initial ingestion**: Run your first data collection
4. **Review results**: Check that devices appear correctly in NetBox

### **Phase 2: Understanding Deviations**
Learn how NetBox Assurance detects and presents drift:

1. **Access deviations**: Navigate to **Assurance > Active Deviations**
2. **Review first deviations**: Examine what Assurance detected
3. **Understand the interface**: Familiarize yourself with the [interface documentation](using-the-ui.md)
4. **Analyze changes**: Click on individual deviations to see detailed change analysis

### **Phase 3: Processing Your First Deviations**
Practice the remediation workflow:

1. **Triage deviations**: Determine which require action
2. **Apply safe changes**: Start with obvious corrections (e.g., missing devices)
3. **Ignore acceptable drift**: Mark intentional differences as ignored
4. **Document decisions**: Use NetBox's change logging for audit trails

### **Phase 4: Operational Integration**
Establish ongoing processes:

1. **Daily review schedule**: Set up regular deviation review sessions
2. **Team workflows**: Define roles and responsibilities for deviation management
3. **Escalation procedures**: Create processes for complex or critical deviations
4. **Expand coverage**: Gradually add more network segments

## Common Implementation Patterns

### **Day 1: Initial NetBox Population**
Use NetBox Assurance to control the initial population of your NetBox instance:

**Workflow:**
1. Configure data sources for comprehensive network discovery
2. Review all discovered devices before accepting into NetBox
3. Use deviations to validate data quality and completeness
4. Establish baseline documentation with confidence

**Benefits:**
- Controlled onboarding with review and approval workflows
- Data quality validation before information becomes your source of truth
- Faster time to value with confidence in documentation accuracy

### **Day 1.5: Improving Network Management Maturity**
Gradually improve your network documentation while maintaining operations:

**Workflow:**
1. Focus on high-priority network segments first
2. Use drift patterns to identify process improvement opportunities
3. Implement automation based on consistent deviation types
4. Build foundation for advanced network automation

**Benefits:**
- Gradual documentation improvement without disrupting daily operations
- Process improvement insights based on drift detection patterns
- Foundation building for network automation initiatives

### **Day 2: Operational Excellence**
Maintain high-quality network documentation for mature operations:

**Workflow:**
1. Monitor for unauthorized or unexpected configuration changes
2. Validate network automation results automatically
3. Integrate with change management processes
4. Use for compliance reporting and auditing

**Benefits:**
- Proactive drift detection for mature network operations teams
- Immediate response to unauthorized or unexpected configuration changes
- Continuous validation of network automation results and change management processes

## Integration with Existing Workflows

### **Change Management Integration**
- **Pre-change validation**: Verify current state before making changes
- **Post-change verification**: Confirm changes were applied correctly
- **Rollback detection**: Identify when changes need to be reverted

### **Incident Response Enhancement**
- **Faster troubleshooting**: Access to accurate, real-time network state
- **Root cause analysis**: Historical tracking of configuration changes
- **Documentation trust**: Confidence in network documentation during incidents

### **Compliance and Auditing**
- **Automated compliance checking**: Continuous validation against standards
- **Audit trail maintenance**: Historical record of all network changes
- **Reporting capabilities**: Generate compliance reports and metrics

## Troubleshooting Common Issues

### **No Deviations Appearing**
1. Verify data sources are configured and running
2. Check network connectivity between sources and NetBox
3. Confirm permissions are set correctly
4. Review logs for ingestion errors

### **Too Many False Positives**
1. Review your tolerance settings for acceptable drift
2. Use the ignore function for known acceptable differences
3. Refine your data source configurations
4. Consider adjusting detection sensitivity

### **Performance Issues**
1. Use date range filters to limit large datasets
2. Process deviations in smaller batches
3. Schedule data ingestion during off-peak hours
4. Contact support for optimization guidance

## Next Steps

Once you've completed your initial setup and first workflow:

1. **[Master the Interface](using-the-ui.md)** - Learn advanced features and workflows
2. **[Expand NetBox Discovery](../netbox-discovery/getting-started.md)** - Add more network segments and device types
3. **[Explore Diode Integration](../netbox-extensions/diode/index.md)** - Build custom integrations for specialized needs
4. **Scale Operations** - Expand to full network coverage and integrate with enterprise workflows

## Support and Resources

- **Interface Documentation**: Detailed guide to [using the NetBox Assurance interface](using-the-ui.md)
- **NetBox Discovery**: Complete [setup and configuration guide](../netbox-discovery/getting-started.md)
- **Diode Integration**: Advanced [API and SDK documentation](../netbox-extensions/diode/index.md)
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel

---

**NetBox Assurance** transforms network operations by ensuring your documentation stays current and accurate. Follow this guide to establish a solid foundation for maintaining network documentation integrity and enabling confident network automation. 