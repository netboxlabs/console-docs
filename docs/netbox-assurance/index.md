# NetBox Assurance

<span class="pill pill-cloud">NetBox Cloud (Coming Soon)</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>

NetBox Assurance automatically detects operational drift between your intended network design (documented in NetBox) and your actual network infrastructure. It continuously monitors network and infrastructure, comparing your intended design against real-world infrastructure to uncover discrepancies and provide proactive remediation capabilities.

By ensuring your NetBox documentation stays current and accurate, Assurance enables faster incident resolution, better compliance, and the confidence to move quickly with reliable network automation.

## What Makes NetBox Assurance Unique

Unlike traditional monitoring tools that focus on performance metrics, NetBox Assurance focuses on **configuration accuracy and documentation integrity**. It bridges the gap between what you've documented in NetBox and what actually exists in your network.

### **Automated Operational Drift Detection**
- **Continuous comparison** of ingested network data against NetBox documentation
- **Real-time detection** of configuration changes and undocumented infrastructure
- **Intelligent analysis** that identifies meaningful deviations requiring attention
- **Historical tracking** of changes and drift patterns over time

### **Proactive Issue Resolution**
- **Early warning system** for configuration drift before it becomes a problem
- **Actionable insights** with specific remediation recommendations
- **Workflow integration** for team collaboration and change management
- **Reduced Mean Time to Repair (MTTR)** with trustworthy documentation during incidents

## Key Features

- **Instant Drift Detection**: Continuously compare your intended design against real-world infrastructure to uncover discrepancies
- **Proactive Issue Resolution**: Act on real-time data to remediate drift before it escalates, reducing downtime and troubleshooting delays
- **Automated Documentation**: Automatically keep your NetBox documentation aligned with operational reality, ensuring a consistent source of truth
- **Real-time Monitoring**: Provides real-time insights into network configuration changes
- **Integration Ready**: Works seamlessly with existing network and infrastructure operations investments
- **Deviation Management**: Comprehensive workflow for reviewing, analyzing, and resolving detected drift
- **Data Quality Assurance**: Validates the accuracy and completeness of network documentation

## How NetBox Assurance Works

### **Data Ingestion Pipeline**
Network data flows into NetBox Enterprise through multiple sources:
1. **[NetBox Discovery Agents](../netbox-discovery/index.md)** - Automated network and device discovery
2. **Controller Integrations** - VMware vCenter, Juniper Mist, Cisco Catalyst Center, etc.
3. **[Diode API](../netbox-extensions/diode/index.md)** - Custom integrations using Python or Go SDKs

### **Intelligent Analysis**
Assurance automatically compares ingested data against existing NetBox documentation to identify:
- **New devices** discovered but not documented in NetBox
- **Configuration changes** that deviate from intended state
- **Missing infrastructure** that exists in documentation but not in reality
- **Data quality issues** that require investigation or cleanup

### **Deviation Workflow**
When operational drift is detected, Assurance creates **deviations** that provide:
- **Detailed change analysis** showing exactly what differs
- **Proposed remediation actions** to resolve the drift
- **Historical context** for understanding change patterns
- **Collaboration tools** for team review and approval

## Common Use Cases

### **Day 1: Initial NetBox Population**
- **Controlled onboarding** of network data into NetBox with review and approval workflows
- **Data quality validation** before information becomes part of your source of truth
- **Faster time to value** with confidence in documentation accuracy

### **Day 1.5: Network Management Maturity**
- **Gradual documentation improvement** while maintaining daily operations
- **Process improvement insights** based on drift detection patterns
- **Foundation building** for network automation initiatives

### **Day 2: Operational Excellence**
- **Proactive drift detection** for mature network operations teams
- **Immediate response** to unauthorized or unexpected configuration changes
- **Continuous validation** of network automation results and change management processes

### **Specific Applications**
- **Network Operations**: Maintain network configurations consistent with documented standards
- **Infrastructure Management**: Ensure infrastructure remains aligned with planned designs  
- **Compliance and Security**: Support compliance efforts by detecting unauthorized changes and configuration drift
- **Incident Prevention**: Identify and address deviations proactively to prevent major disruptions
- **Change Management**: Track and validate configuration changes across your infrastructure

## Integration with NetBox Discovery

NetBox Assurance and [NetBox Discovery](../netbox-discovery/index.md) work together to provide complete network visibility and control:

- **Discovery provides the data** - Automated collection from network devices and controllers
- **Assurance provides the intelligence** - Analysis, drift detection, and remediation workflows
- **Combined value** - Complete visibility and control over network documentation accuracy

This integration enables teams to not only discover their network infrastructure automatically but also maintain its accuracy over time.

## Availability

### **NetBox Enterprise**
NetBox Assurance is available as an optional component of NetBox Enterprise. Your license file determines whether Assurance services are enabled during installation.

### **NetBox Cloud**
NetBox Assurance is **coming soon** as an optional add-on for NetBox Cloud. When available, services will be automatically provisioned and integrated with your instance.

### **NetBox Community Edition**
NetBox Assurance is not available for NetBox Community Edition. However, the underlying [Diode project](../netbox-extensions/diode/index.md) provides data ingestion capabilities that work with NetBox Discovery agents.

## Documentation and Resources

### **Getting Started**
- **[Getting Started Guide](getting-started.md)** - Complete setup and configuration guide for new users
- **[Using the UI](using-the-ui.md)** - Detailed guide to navigating and using the NetBox Assurance interface

### **Integration Guides**
- **[NetBox Discovery](../netbox-discovery/getting-started.md)** - Set up automated network discovery for data ingestion
- **[Diode Integration](../netbox-extensions/diode/index.md)** - Advanced API and SDK documentation for custom integrations

### **Support and Community**
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel

---

With **NetBox Assurance**, teams can detect, report, and resolve network deviations in real time, ensuring a consistent and reliable network environment through continuous validation and corrective actions. Transform your network operations by ensuring your documentation stays current and accurate, enabling faster incident resolution, better compliance, and the confidence to move quickly with reliable network automation.