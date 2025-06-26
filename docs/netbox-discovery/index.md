---
tags:
  - cloud
  - enterprise
  - community
  - discovery
title: "NetBox Discovery"
description: "Advanced network discovery and observability solution for automated network documentation and drift detection across all NetBox deployments"
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v1.10"
status: "current"
category: "product-overview"
audience: "all"
complexity: "intermediate"
related_docs:
  - "getting-started.md"
  - "../netbox-assurance/index.md"
  - "../netbox-extensions/diode/index.md"
external_links:
  - "https://github.com/netboxlabs/orb-agent"
  - "https://netdev.chat/"
---

# NetBox Discovery

NetBox Discovery is an advanced network discovery and observability solution designed to simplify documenting your network and help detect network drift. It extends NetBox by providing automated network and device discovery capabilities through the orb-agent, a lightweight and scalable discovery component.

## Enterprise Benefits

NetBox Discovery enables enterprise teams to:

- **Accelerate Network Documentation**: Automatically discover and populate your NetBox instance with accurate network topology and device information
- **Ensure Compliance**: Continuously audit your network against documented standards and detect unauthorized changes
- **Reduce Manual Effort**: Eliminate time-consuming manual data entry and reduce human error in network documentation
- **Enable Automation**: Maintain an accurate source of truth that powers network automation workflows
- **Detect Drift**: Identify when your network configuration deviates from intended designs

## Getting Started

Ready to start discovering your network? Follow our comprehensive getting started guide:

**[Get Started with NetBox Discovery](getting-started.md)** - Complete setup and configuration guide

### Quick Start Paths

**For NetBox Enterprise Users:**
- **[Enterprise Quick Start](getting-started.md#for-netbox-enterprise)** - Get up and running quickly with your existing NetBox Enterprise deployment

**For New Deployments:**
- **[Complete Setup Guide](getting-started.md#installation-steps)** - Full end-to-end installation and configuration

## Enterprise Use Cases

### **Network Asset Management**
Automatically discover and maintain an accurate inventory of network devices, interfaces, and IP addresses across your enterprise infrastructure.

**Ideal for**: Large enterprises, multi-site deployments, compliance requirements

### **Network Auditing & Compliance**
Continuously scan your network to ensure configurations match documented standards and detect unauthorized changes.

**Ideal for**: Regulated industries, security-focused organizations, change management processes

### **Infrastructure Documentation**
Keep your network documentation current by automatically updating NetBox with discovered changes to your network topology.

**Ideal for**: Growing organizations, complex networks, automation initiatives

## Key Features

- **Automated Network Discovery**: Schedule scans and identify devices and assets across your network using multiple discovery backends
- **Flexible Configuration**: Define custom discovery policies tailored to specific network environments through YAML configuration  
- **Enterprise Security**: Integrate with external secret stores like HashiCorp Vault for secure credential handling
- **Multiple Discovery Methods**: Support for network discovery, device discovery, and worker backend capabilities
- **Seamless Integration**: Fully integrated with NetBox through Diode for data ingestion and reconciliation
- **Production Ready**: Docker-based deployment designed for enterprise scaling and management

## Architecture Overview

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

- **Getting Started**: For complete setup instructions, see the [NetBox Discovery Getting Started Guide](getting-started.md)
- **Diode Documentation**: For advanced Diode configuration and SDK usage, see the [Diode documentation](../netbox-extensions/diode/index.md)
- **GitHub Repository**: Find the orb-agent source code [here](https://github.com/netboxlabs/orb-agent)
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel

---

**NetBox Discovery** transforms network documentation from a manual, error-prone process into an automated, reliable foundation for network operations, enabling teams to focus on strategic initiatives while maintaining comprehensive and current network visibility.

