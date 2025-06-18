---
tags:
  - cloud
  - enterprise
---

# NetBox Discovery

NetBox Discovery is a family of applications that automate network discovery and data collection to keep your NetBox instance current and comprehensive. Through a combination of active network scanning, device discovery, and controller integrations, NetBox Discovery provides multiple pathways to populate and maintain accurate network documentation.

## What It Includes

NetBox Discovery encompasses three core capabilities:

### Network Discovery
Active network scanning that discovers network infrastructure through:
- SSH-based device connections for detailed configuration analysis
- SNMP polling for device information and status
- Ping sweeps to identify active network hosts
- Port scanning to detect running services
- Network topology mapping

### Device Discovery
Automated identification and documentation of network devices including:
- Physical device characteristics and capabilities
- Interface configurations and relationships
- IP address assignments and network mappings
- Device inventory and asset tracking
- Operating system and firmware details

### Controller Integrations Discovery
Pre-built integrations with network controllers and management platforms:
- **VMware vCenter**: Virtual infrastructure discovery and documentation
- **Juniper Mist**: Cloud-managed network infrastructure
- **Cisco Catalyst Center**: Network management and automation platform
- **Microsoft DHCP**: IP address management and assignment tracking
- **AWS VPC IPAM**: Cloud infrastructure and IP address management

Each integration automatically synchronizes data from these platforms into NetBox, ensuring your network documentation remains current as these systems evolve.

## The Orb Distributed Agent Framework

NetBox Discovery is built on the **Orb distributed agent framework**, a robust and scalable architecture that enables secure, distributed data collection across complex network environments. Key benefits include:

- **Distributed Architecture**: Deploy lightweight agents across multiple network segments and locations
- **Secure Communication**: Encrypted communication channels between agents and central management
- **Scalable Collection**: Handle large-scale network environments through distributed processing
- **Flexible Deployment**: Support for various deployment models including on-premises, cloud, and hybrid environments
- **Fault Tolerance**: Built-in redundancy and error handling for reliable data collection

## Key Features

- **Automated Device Discovery**: Scan network ranges to identify active devices and their characteristics
- **Multi-Protocol Support**: Leverage SSH, SNMP, HTTP/HTTPS, and vendor APIs for comprehensive data collection
- **Incremental Updates**: Detect and sync only changed information to minimize network impact
- **Flexible Scheduling**: Configure discovery jobs to run at optimal times for your network
- **Data Validation**: Built-in validation ensures data quality before populating NetBox
- **Extensive Controller Support**: Pre-built integrations with major network management platforms
- **Custom Integration Support**: Extensible framework for developing custom data source integrations
- **Real-time Monitoring**: Track discovery job status and performance metrics
- **Conflict Resolution**: Intelligent handling of data conflicts and duplicate detection

## How It Works

NetBox Discovery operates through a streamlined workflow designed to maintain continuous network visibility:

### 1. Network Scanning & Data Collection
Discovery agents actively scan configured network ranges using multiple protocols (SSH, SNMP, APIs) to gather comprehensive device and configuration information from your infrastructure.

### 2. Data Processing & Validation
Collected information is processed, validated, and normalized to ensure data quality and consistency before integration with NetBox.

### 3. Intelligent Synchronization
The system intelligently compares discovered data with existing NetBox records, identifying new devices, configuration changes, and potential conflicts.

### 4. NetBox Integration
Validated data is seamlessly integrated into NetBox, updating existing records and creating new ones as needed. When combined with NetBox Assurance, this process includes operational drift detection to maintain documentation accuracy.

### 5. Continuous Monitoring
Discovery jobs run on configurable schedules, ensuring your NetBox instance remains current with the actual state of your network infrastructure.

## Use Cases

### Day 1 - Initial Network Documentation
**Challenge**: Starting with an empty NetBox instance and needing to document an existing network infrastructure.

**Solution**: NetBox Discovery rapidly populates NetBox with comprehensive network data through automated discovery and controller integrations, providing teams with immediate visibility into their infrastructure.

**Outcome**: Dramatically reduced time to initial NetBox population, comprehensive baseline documentation, and confidence in data accuracy.

### Day 1.5 - Improving Network Management Maturity
**Challenge**: Gradually improving network documentation processes while maintaining day-to-day operations.

**Solution**: NetBox Discovery provides continuous data updates and validation, helping teams identify areas where documentation processes need improvement while maintaining operational continuity.

**Outcome**: Accelerated network automation initiatives, improved process maturity, and reduced manual documentation overhead.

### Day 2 - Maintaining Operational Excellence
**Challenge**: Keeping network documentation current as infrastructure evolves and changes.

**Solution**: Scheduled discovery jobs and real-time controller integrations ensure NetBox remains synchronized with actual network state, detecting changes as they occur.

**Outcome**: Always-current network documentation, reduced incident resolution time, and confidence in automation systems.

### Additional Use Cases
- **Network Audits**: Generate comprehensive reports of network infrastructure for compliance and security audits
- **Capacity Planning**: Track device utilization and interface capacity for informed infrastructure decisions
- **Change Detection**: Identify unauthorized or undocumented network changes through continuous monitoring
- **Migration Planning**: Document existing infrastructure before major network changes or migrations
- **Asset Management**: Maintain accurate inventory of network devices and their configurations

## Data Sources

NetBox Discovery supports multiple data collection methods to ensure comprehensive network coverage:

### Direct Network Access
- **SSH**: Secure command-line access for detailed device configuration analysis
- **SNMP v1/v2c/v3**: Standards-based device monitoring and information collection
- **HTTP/HTTPS APIs**: RESTful and proprietary API integrations for modern network devices
- **Ping/ICMP**: Network reachability testing and basic connectivity verification

### Controller Integrations
- **VMware vCenter**: Virtual machine inventory, network configurations, and resource allocation
- **Juniper Mist**: Wireless and wired infrastructure managed through Mist cloud platform
- **Cisco Catalyst Center**: Network device management, configuration, and monitoring
- **Microsoft DHCP**: IP address assignments, reservations, and scope management
- **AWS VPC IPAM**: Cloud infrastructure discovery and IP address management

### Custom Integrations
- **Diode SDK**: Python and Golang SDKs for developing custom data source integrations
- **Monitoring Systems**: Integration with network monitoring platforms and tools
- **Inventory Systems**: Connection to existing asset management and inventory databases
- **CMDBs**: Synchronization with Configuration Management Databases
- **Spreadsheets**: Import capabilities for existing documentation in spreadsheet format

## Integration with NetBox Editions

### NetBox Community Edition
The core NetBox Discovery agent is compatible with NetBox Community Edition through the open-source Diode project, providing basic discovery capabilities for all users.

### NetBox Cloud
NetBox Discovery is available as an optional add-on for NetBox Cloud, with cloud-managed agents and controller integrations provisioned and configured automatically.

### NetBox Enterprise
NetBox Discovery comes included with NetBox Enterprise installations, providing full access to all discovery capabilities and controller integrations based on your license tier.

## Pricing and Packaging

- **Agent Inclusion**: The base NetBox Discovery agent is included with NetBox Assurance subscriptions
- **Controller Integration Bundles**: 
  - **Standard Bundle**: Includes basic controller integrations for Professional tier customers
  - **Premium Bundle**: Comprehensive controller integration suite for Enterprise tier customers
- **Scalable Licensing**: Additional discovery capacity available based on network size and requirements

## Roadmap

NetBox Discovery follows an aggressive development timeline with regular feature releases:

### 2024 Releases
- **NetBox Discovery Agent**: December 2024 (Released)
- **Enhanced Network Scanning**: Advanced discovery algorithms and performance improvements

### 2025 Roadmap
- **Controller Integrations**: January 2025
  - VMware vCenter integration
  - Initial cloud platform support
- **Git Management Integration**: March 2025
  - Version control for network configurations
  - Change tracking and rollback capabilities
- **Advanced Analytics**: Q2 2025
  - Discovery performance metrics and insights
  - Network topology analysis and visualization
- **Enterprise Integrations**: Q3 2025
  - Additional controller platform support
  - Custom integration framework enhancements

### Future Enhancements
- Expanded protocol support (NETCONF, RESTCONF, gNMI)
- Machine learning-powered device classification
- Advanced network topology mapping
- Integration with additional cloud platforms
- Enhanced security and compliance reporting

## Technical Requirements

### Agent Deployment
- **Operating Systems**: Linux, Windows, macOS
- **Network Access**: SSH (port 22), SNMP (ports 161/162), HTTPS (port 443)
- **Resource Requirements**: Minimal footprint suitable for network appliances or virtual machines
- **Deployment Options**: Containerized, native installation, or cloud-managed

### Controller Integration Requirements
- **API Access**: Administrative or read-only API credentials for target systems
- **Network Connectivity**: Secure HTTPS connectivity to controller management interfaces
- **Permissions**: Appropriate access levels for data collection from integrated platforms

## Getting Started

1. **Planning**: Identify network segments and devices for discovery
2. **Agent Deployment**: Install and configure NetBox Discovery agents in your environment
3. **Controller Setup**: Configure integrations with your network management platforms
4. **Discovery Configuration**: Define discovery jobs and schedules
5. **Validation**: Review discovered data and refine discovery parameters
6. **Automation**: Schedule regular discovery jobs for continuous synchronization

## Support and Resources

- **Quick Start Guide**: [Getting Started with NetBox Discovery](quickstart-guide.md)
- **Documentation**: Comprehensive guides for each controller integration
- **Community Support**: Connect with users on [Slack](https://netdev.chat/) in the `#netbox` channel
- **Professional Services**: NetBox Labs offers implementation and consulting services

---

**NetBox Discovery** transforms network documentation from a manual, error-prone process into an automated, reliable foundation for network operations, enabling teams to focus on strategic initiatives while maintaining comprehensive and current network visibility.

