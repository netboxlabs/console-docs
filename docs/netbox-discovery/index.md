---
tags:
  - cloud
  - enterprise
  - community
  - netbox
  - discovery
  - assurance
  - operator
  - kubernetes
  - authentication
  - administration
  - operations
  - installation
  - configuration
  - troubleshooting
  - getting-started
  - automation
  - networking
  - integration
title: NetBox Discovery
---

NetBox Discovery is an advanced network discovery and observability solution designed to simplify documenting your network and help detect network drift. It extends NetBox by providing automated network and device discovery capabilities through the orb-agent, a lightweight and scalable discovery component.

## Key Features
- **Automated Network Discovery**: Schedule scans and identify devices and assets across your network using multiple discovery backends
- **Flexible Configuration**: Define custom discovery policies tailored to specific network environments through YAML configuration
- **Secrets Management**: Integrate with external secret stores like HashiCorp Vault for secure credential handling
- **Multiple Discovery Backends**: Support for network discovery, device discovery, and worker backend capabilities
- **Seamless Integration**: Fully integrated with NetBox through Diode for data ingestion and reconciliation
- **Containerized Deployment**: Docker-based deployment for easy scaling and management

## How It Works
NetBox Discovery leverages the orb-agent, a containerized Go application that uses network protocols (ICMP, TCP, UDP, SSH) to discover devices and other network assets. The agent is configured through YAML files that define:

- **Configuration Sources**: Local files or Git repositories for policy management
- **Secrets Management**: Integration with external secret stores for credential security
- **Discovery Policies**: Customizable rules for network scanning and device identification
- **Backend Selection**: Choice of discovery methods based on network requirements

Discovered data is sent to Diode for ingestion into NetBox, where it can be matched and reconciled to identify drift and deviations. The NetBox database is updated where relevant, ensuring data accuracy and reducing manual entry.

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

## Getting Started

For detailed setup and configuration instructions, see our [Quickstart Guide](quickstart-guide.md).

## Support and Resources
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel
- **Documentation**: Additional resources and integration guides available in related sections
- **GitHub Repository**: Find NetBox Discovery integration [here](https://github.com/netboxlabs/orb-agent)

---

**NetBox Discovery** transforms network documentation from a manual, error-prone process into an automated, reliable foundation for network operations, enabling teams to focus on strategic initiatives while maintaining comprehensive and current network visibility.

