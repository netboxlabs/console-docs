---
tags:
  - netbox-cloud
  - netbox-enterprise
  - netbox-community
---

# NetBox Discovery Agent

The NetBox Discovery Agent is part of the **Orb distributed agent framework** developed by NetBox Labs. This powerful discovery engine automatically collects network data from your infrastructure and seamlessly ingests it into NetBox, enabling you to maintain accurate, up-to-date network documentation without manual intervention.

## What is the Orb Framework?

The Orb framework is a distributed, cloud-native agent platform designed specifically for network automation and observability at scale. Built with modern infrastructure challenges in mind, Orb provides:

- **Distributed Architecture**: Deploy agents across multiple network segments and geographic locations
- **Cloud-Native Design**: Containerized agents that scale seamlessly in Kubernetes environments
- **Extensible Backend System**: Modular discovery capabilities that can be expanded with new data sources
- **Secure Communication**: All data transmission uses encrypted channels with API key authentication
- **High Availability**: Built-in redundancy and fault tolerance for mission-critical deployments

## Discovery Capabilities

NetBox Discovery Agent provides three core discovery backends:

### Network Discovery
- **Purpose**: Active network scanning and IP address management
- **Technology**: Leverages NMAP for comprehensive network scanning
- **Use Cases**: 
  - Day 1: Initial network mapping and IP inventory
  - Ongoing: IP address lifecycle management and conflict detection
  - Compliance: Automated network asset tracking

### Device Discovery  
- **Purpose**: Network device configuration and state collection
- **Technology**: Built on NAPALM for multi-vendor device support
- **Use Cases**:
  - Day 1: Device inventory and initial configuration capture
  - Day 2: Configuration drift detection and compliance monitoring
  - Troubleshooting: Real-time device state collection

### Controller Integrations (Roadmap)
Planned controller integrations include:
- **VMware vCenter**: Virtual infrastructure discovery (January 2025)
- **Juniper Mist**: Wireless and campus network data (February 2025)  
- **Cisco Catalyst Center**: Enterprise network management integration (February 2025)
- **Microsoft DHCP**: IP address management integration (March 2025)
- **AWS VPC IPAM**: Cloud infrastructure discovery (Q2 2025)

## Integration with NetBox Assurance

The NetBox Discovery Agent works seamlessly with **NetBox Assurance** to provide comprehensive operational drift detection:

1. **Data Collection**: Discovery agents continuously collect network state information
2. **Ingestion**: Data flows through Diode into your NetBox instance
3. **Drift Detection**: NetBox Assurance compares discovered data against documented intent
4. **Deviation Management**: Teams receive notifications about configuration drift and can take corrective action

This integration enables proactive network management by automatically identifying when your network's operational state diverges from its documented configuration.

## Architecture and Deployment

### Data Flow
```
Network Infrastructure → Discovery Agent → Diode → NetBox → Assurance Analysis
```

### Deployment Options
- **Docker Containers**: Single-node deployments and testing
- **Kubernetes**: Production-scale distributed deployments
- **Edge Locations**: Remote site discovery with centralized management
- **Multi-Cloud**: Hybrid and multi-cloud environment support

## Getting Started

The agent requires:
1. **Configuration File**: YAML-based configuration defining policies and targets
2. **Diode Connectivity**: Connection details for your NetBox instance
3. **Network Access**: Appropriate permissions to scan target networks/devices
4. **Authentication**: API keys and device credentials as needed

For detailed configuration instructions, see:
- [Configuration Format](configuration-file.md)
- [Network Discovery](network_discovery.md)  
- [Device Discovery](device_discovery.md)

## Benefits for Network Teams

### Day 1 Operations
- **Rapid Initial Discovery**: Quickly populate NetBox with existing infrastructure
- **Multi-Vendor Support**: Works with diverse network equipment via NAPALM
- **Scalable Deployment**: Handle large network environments efficiently

### Day 1.5 Operations  
- **Data Quality Improvement**: Enhance existing NetBox data with automated discovery
- **Gap Analysis**: Identify undocumented network assets and configurations
- **Standardization**: Normalize data formats across different network devices

### Day 2 Operations
- **Continuous Monitoring**: Ongoing network state collection and validation
- **Change Detection**: Automatic identification of configuration drift
- **Compliance Reporting**: Maintain accurate network documentation for audits

## Security and Compliance

- **Encrypted Communication**: All agent-to-server communication uses TLS encryption
- **API Key Authentication**: Secure authentication between agents and Diode
- **Credential Management**: Support for environment variables and secure credential storage
- **Network Segmentation**: Agents can be deployed in isolated network segments
- **Audit Logging**: Comprehensive logging of all discovery activities

## Next Steps

Ready to start using NetBox Discovery Agent? Check out our guides:

- [Getting Started](get-started.md): Step-by-step setup instructions
- [Configuration Examples](config_samples.md): Real-world configuration templates
- [Network Discovery](network_discovery.md): IP scanning and network mapping
- [Device Discovery](device_discovery.md): Device configuration collection