<<<<<<< HEAD
<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>

!!! info "*Coming June 2025 for NetBox Enterprise, July 2025 for NetBox Cloud*"
=======
---
tags:
  - netbox-cloud
  - netbox-enterprise
---!!! info "*Coming early 2025*"
>>>>>>> origin/feature/product-tagging-system
    Be among the first to experience **NetBox Assurance**. [Sign up](https://netboxlabs.com/netbox-assurance/) to be notified when we launch.

NetBox Assurance allows customers to control which data goes into NetBox. It does this by giving users a view of the difference between the data in their NetBox (representing the intended state of the infrastructure) and the data in their network (the operational state of the infrastructure). We call this difference **"operational drift"**, or simply "drift". 

This is different from "configuration drift", which is the difference between the running configuration on a network device and the intended configuration. NetBox Assurance detects and manages "operational drift", but not "configuration drift" today.

## Problem Being Solved

Finding and fixing operational drift is a game-changer for network teams striving to maintain reliable documentation of intent as the foundation for network automation, compliance, and operational excellence.

Without good network documentation networking teams suffer friction in their manual and automated processes, but all network documentation is eventually out of date. NetBox Assurance gives operators the tools to make sure that their documentation is always up-to-date while keeping them fully in control.

- **Assurance allows operators onboarding to NetBox** the ability to review the data (including the proposed updates to NetBox) prior to adding it to NetBox
- **Most importantly, Assurance enables operators to identify changes** in the operational configuration of the network that indicate drift from the intended configuration as documented in NetBox, and quickly understand and resolve that drift

## Key Features
- **Operational Drift Detection**: Automatically identify deviations between NetBox documented intent and actual network state
- **Data Ingestion Control**: Review and approve all data before it enters NetBox
- **Efficient Remediation**: Correct detected deviations through guided workflows with options to apply changes, re-analyze, or archive
- **Seamless Integration**: Enhance NetBox Cloud and NetBox Enterprise with continuous network validation and state synchronization
- **Multiple Data Sources**: Works with NetBox Discovery agents, controller integrations, and Diode API/SDKs
- **Detailed Reports**: Generate actionable reports highlighting network consistency and detected deviations
- **User Branch Workflows**: Apply changes to specific user branches for controlled updates

## How It Works

NetBox Assurance provides automated operational drift detection by continuously comparing ingested network data against your documented intent in NetBox. The workflow follows these key steps:

### 1. Data Ingestion
Network information is sent to NetBox Assurance as ingested messages. These messages can originate from:
- **NetBox Discovery agents** scanning your network using SSH, API calls, ping sweeps, and port scanning
- **Controller integrations** with VMware vCenter, Juniper Mist, Cisco Catalyst Center, Microsoft DHCP, AWS VPC IPAM
- **Diode API and SDKs** for custom integrations from monitoring systems, inventory systems, CMDBs, or spreadsheets

### 2. Analysis & Comparison
Ingested messages are analyzed against existing NetBox data to identify matches and detect potential deviations from the intended network state. These deviations are considered "operational drift".

### 3. Deviation Review
Users can review detected deviations and examine proposed updates (change sets) based on identified operational drift with NetBox.

### 4. Action & Resolution
Users can take action on deviations by:
- **Applying changes** to NetBox, either in the main branch or a specific user branch
- **Recalculating drift** by rediffing changes against updated data
- **Archiving deviations** as needed for historical tracking

## Use Cases

### Day 1 - Initial population of NetBox
All teams start with an empty NetBox. Using NetBox Assurance teams can stay in control as they rapidly populate their NetBox instance with data from the NetBox Discovery family of capabilities (network discovery, device discovery, controller integrations discovery). This gives teams insight into the data being onboarded and the ability to refine that data as they move through the first important steps of getting in control of their networks.

**Outcome**: Faster time to value with NetBox, confidence in the data going into NetBox

### Day 1.5 - Staying in control while improving network management maturity
Getting networking documentation under control is a gradual process and it is imperative that teams are able to keep going with day to day operations while this is underway. NetBox Assurance gives teams a clear understanding of how their documentation processes are progressing, while also highlighting areas that need further improvement. For example it may be that after documenting a part of the network NetBox Assurance shows that the network is drifting from the documentation. This points teams in the right direction for process improvements, including network automation efforts.

**Outcome**: Accelerating transformation/automation

### Day 2 - Staying in control
As teams approach higher levels of operational maturity the drift between their documentation and their network reduces, but they need to remain hyper vigilant not to slide backwards. NetBox Assurance gives network operators timely and accurate information about parts of their network that are changing outside of the process, whether due to human error or technical fault. This allows teams to respond immediately to operational drift, armed with full context about the issue at hand.

**Outcome**: Faster time to remediate drift, reduction in time to resolve operational issues, less downtime, less risk, confidence to move faster

### Additional Use Cases
- **Network Drift Detection**: Ensure network configurations remain consistent with the source of truth
- **Compliance Audits**: Support compliance efforts by detecting unauthorized changes and providing audit trails
- **Incident Prevention**: Identify and address deviations before they cause major disruptions
- **Change Management**: Improve coordination between teams by highlighting discrepancies early

## Integration with NetBox Editions

### NetBox Community Edition
NetBox Assurance is a commercial product that is available to NetBox Cloud and NetBox Enterprise customers, however some of the underlying technologies including Diode and Orb agents are available to all users.

### NetBox Cloud
NetBox Assurance is an optional add-on for NetBox Cloud. When purchased, its services are provisioned in the cloud and securely integrated with the NetBox Cloud instance. Additionally, the NetBox Assurance UI and Diode data plugins are automatically installed on the instance.

### NetBox Enterprise
NetBox Assurance is an optional component of NetBox Enterprise and is included in the installation bundle. During installation, the customer license file determines whether NetBox Assurance is enabled. If entitled, the installation deploys NetBox Assurance services along with the NetBox Assurance UI and Diode data plugins.

## Relationship to Diode

Diode is a source-available project from NetBox Labs that offers a subset of NetBox Assurance functionality for loading data into NetBox. It is fully compatible with the NetBox Discovery agent and works across all NetBox editions.

Diode and NetBox Assurance share a common API for data ingestion, the Diode SDK, which is available for Python and Golang. This interface provides an alternative API for sending data to NetBox, featuring built-in idempotence, automatic ordering, and other capabilities designed to simplify the development of high-performance, low-maintenance integrations.

## Pricing and Packaging

- NetBox Assurance is available as an add-on for NetBox Cloud and NetBox Enterprise but is not offered as a standalone product for the NetBox Community edition
- Each Assurance tier includes a designated volume of ingested entities per month, with the option to purchase additional capacity as needed
- The NetBox Discovery agent is included with NetBox Assurance, while agent extensions—provided as controller discovery integrations—are available in Standard and Premium bundles for Professional and Enterprise tiers

## Roadmap

### NetBox Assurance:
- **Released for NetBox Enterprise**: June 2025
- **Released for NetBox Cloud**: July 2025
- **Planned feature enhancements**:
  - Event triggers and notifications
  - API
  - Analytics
  - Automated actions
  - Drift detection of device configurations ("configuration drift")

## Business Value

Accurate network documentation is foundational for high-performance networking teams, enabling them to scale operations efficiently, minimize downtime, and improve service quality. NetBox Assurance delivers:

### Improved Network Reliability and Stability
- Ensures teams always have an up-to-date view of their infrastructure
- Reduces troubleshooting time by providing accurate, real-time insights
- Detects and flags unauthorized or unintended changes

### Increased Operational Efficiency
- Streamlines network management by eliminating manual validation effort
- Reduces reliance on custom scripts and manual audits
- Enables automation efforts by ensuring NetBox data remains accurate and trustworthy

### Faster Incident Resolution and Reduced Downtime
- Provides immediate visibility into changes that may be impacting network performance
- Reduces Mean Time to Repair (MTTR) with full context about intended versus actual state
- Enhances root cause analysis with clear historical records

### Strengthened Security and Compliance
- Helps enforce governance and compliance policies by identifying unauthorized changes
- Supports regulatory frameworks (PCI-DSS, SOC 2, NIST, ISO 27001)
- Reduces security breach risks from undocumented modifications

## Support and Resources
- **Documentation**: Until NetBox Assurance is officially released, please refer to the [Diode](../netbox-extensions/diode/index.md) project documentation.
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel.

---
With **NetBox Assurance**, teams can detect, report, and resolve network deviations in real time, ensuring a consistent and reliable network environment through continuous validation and corrective actions.