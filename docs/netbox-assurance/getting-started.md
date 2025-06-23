# Getting Started with NetBox Assurance

<span class="pill pill-cloud">NetBox Cloud (Coming Soon)</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>

NetBox Assurance automatically detects operational drift between your intended network design (documented in NetBox) and your actual network infrastructure. This guide will help you understand, enable, and start using NetBox Assurance to maintain accurate network documentation and proactive drift detection.

## What is NetBox Assurance?

NetBox Assurance provides **automated operational drift detection** by continuously comparing ingested network data against your documented intent in NetBox. When discrepancies are found, Assurance creates "deviations" that you can review, analyze, and remediate.

### Key Capabilities

- **Instant Drift Detection**: Continuously compare your intended design against real-world infrastructure
- **Proactive Issue Resolution**: Act on real-time data to remediate drift before it escalates
- **Automated Documentation**: Keep your NetBox documentation aligned with operational reality
- **Real-time Monitoring**: Provides real-time insights into network configuration changes
- **Integration Ready**: Works seamlessly with existing network operations investments

## Business Value

NetBox Assurance solves critical challenges that network teams face daily:

### **Faster Incident Resolution**
- **Trustworthy documentation** when you need it most during incidents
- **Reduced Mean Time to Repair (MTTR)** with accurate network state information
- **Proactive detection** of issues before they become major problems

### **Improved Compliance Posture**
- **Automated auditing** against documented standards
- **Historical tracking** of network changes for compliance reporting
- **Immediate detection** of unauthorized changes

### **Reduced Operational Overhead**
- **Eliminate manual documentation verification** processes
- **Automated detection** of configuration drift
- **Streamlined change management** workflows

### **Better Change Management**
- **Immediate visibility** into the impact of network changes
- **Confidence to move faster** with reliable source of truth
- **Reduced risk** of undocumented changes causing issues

## How NetBox Assurance Works

### **Data Ingestion**
Network data flows into NetBox Enterprise through multiple sources:

1. **[NetBox Discovery Agents](../netbox-discovery/index.md)** - Automated network and device discovery
2. **Controller Integrations** - VMware vCenter, Juniper Mist, Cisco Catalyst Center, etc.
3. **[Diode API](../netbox-extensions/diode/index.md)** - Custom integrations using Python or Go SDKs

### **Analysis & Comparison**
Assurance automatically compares ingested data against existing NetBox documentation to identify:
- **New devices** discovered but not documented
- **Configuration changes** that deviate from intended state
- **Missing infrastructure** that exists in documentation but not in reality
- **Data quality issues** that require investigation

### **Deviation Management**
When operational drift is detected, Assurance creates **deviations** that provide:
- **Detailed change analysis** showing what differs
- **Proposed remediation actions** to resolve the drift
- **Historical context** for understanding patterns
- **Workflow tools** for team collaboration

## Availability and Licensing

### **NetBox Enterprise**
NetBox Assurance is available as an **optional component** of NetBox Enterprise. During installation, your license file determines whether Assurance is enabled.

**Installation**: When entitled, Assurance services are automatically deployed along with the NetBox Assurance UI and Diode data plugins.

### **NetBox Cloud**
NetBox Assurance is **coming soon** as an optional add-on for NetBox Cloud. When available, services will be provisioned in the cloud and securely integrated with your NetBox Cloud instance.

**Setup**: The NetBox Assurance UI and Diode data plugins will be automatically installed on your instance when released.

### **NetBox Community Edition**
NetBox Assurance is **not available** for NetBox Community Edition. However, the underlying [Diode project](../netbox-extensions/diode/index.md) provides data ingestion capabilities that work with NetBox Discovery agents.

## Prerequisites

Before enabling NetBox Assurance, ensure you have:

### **Technical Requirements**
- NetBox Enterprise 1.10+ or NetBox Cloud with Assurance add-on
- Active NetBox Assurance license
- Network connectivity for data ingestion sources
- Appropriate user permissions in NetBox

### **Data Sources**
To maximize value from NetBox Assurance, you'll need at least one data source:

- **[NetBox Discovery](../netbox-discovery/getting-started.md)** - Recommended for automated network discovery
- **Controller integrations** - For centralized network management platforms
- **Custom integrations** - Using the [Diode SDK](../netbox-extensions/diode/index.md)

## Getting Started Workflow

### **Phase 1: Initial Setup**
1. **Verify Assurance is enabled** in your NetBox Enterprise or NetBox Cloud instance
2. **Set up data ingestion** using NetBox Discovery or other sources
3. **Configure user permissions** for team members who will use Assurance
4. **Review the [UI documentation](using-the-ui.md)** to understand the interface

### **Phase 2: First Data Ingestion**
1. **Start with a small network segment** to understand the workflow
2. **Ingest initial data** from your chosen source
3. **Review generated deviations** to understand what Assurance detected
4. **Process your first deviations** using the [UI workflow](using-the-ui.md#workflow-best-practices)

### **Phase 3: Operational Integration**
1. **Establish daily review processes** for active deviations
2. **Create team workflows** for deviation triage and remediation
3. **Expand coverage** to additional network segments
4. **Integrate with change management** processes

## Common Use Cases

### **Day 1: Initial NetBox Population**
- **Controlled onboarding** of network data into NetBox
- **Review and refine** data before it becomes part of your source of truth
- **Faster time to value** with confidence in data accuracy

### **Day 1.5: Improving Network Management Maturity**
- **Gradual documentation improvement** while maintaining daily operations
- **Process improvement insights** based on drift patterns
- **Foundation building** for network automation initiatives

### **Day 2: Operational Excellence**
- **Proactive drift detection** for mature network operations
- **Immediate response** to unauthorized or unexpected changes
- **Continuous validation** of network automation results

## Integration with NetBox Discovery

NetBox Assurance and [NetBox Discovery](../netbox-discovery/index.md) work together seamlessly:

- **Discovery provides the data** - Automated collection from network devices and controllers
- **Assurance provides the intelligence** - Analysis, drift detection, and remediation workflows
- **Combined value** - Complete visibility and control over network documentation accuracy

> **Recommendation**: Start with NetBox Discovery for automated data collection, then use NetBox Assurance to manage the ingestion and detect ongoing drift.

## Next Steps

1. **[Explore the UI](using-the-ui.md)** - Learn how to navigate and use the NetBox Assurance interface
2. **[Set up NetBox Discovery](../netbox-discovery/getting-started.md)** - Configure automated data collection
3. **[Learn about Diode](../netbox-extensions/diode/index.md)** - Understand the underlying data ingestion platform

## Support and Resources

- **UI Documentation**: Detailed guide to [using the NetBox Assurance interface](using-the-ui.md)
- **NetBox Discovery**: Complete [setup and configuration guide](../netbox-discovery/getting-started.md)
- **Diode Integration**: Advanced [API and SDK documentation](../netbox-extensions/diode/index.md)
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel

---

**NetBox Assurance** transforms network operations by ensuring your documentation stays current and accurate, enabling faster incident resolution, better compliance, and the confidence to move quickly with reliable network automation. 