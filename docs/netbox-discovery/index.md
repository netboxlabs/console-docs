<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

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

### For NetBox Enterprise Users

If you're running NetBox Enterprise, start here:

- **[Quick Start for NetBox Enterprise](agent/get-started.md#for-netbox-enterprise)** - Get up and running quickly with your existing NetBox Enterprise deployment
- **[Enterprise Use Cases](#enterprise-use-cases)** - Common enterprise scenarios and configurations

### For New Deployments

If you're setting up NetBox Discovery from scratch:

- **[Complete Setup Guide](agent/get-started.md)** - Full end-to-end installation and configuration
- **[Requirements](agent/index.md#requirements)** - System requirements and prerequisites

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

## Next Steps

### Quick Setup
1. **[Review Requirements](agent/index.md#requirements)** - Ensure your environment meets the prerequisites
2. **[Follow Quick Start](agent/get-started.md)** - Complete step-by-step setup guide
3. **[Configure Discovery](agent/configuration-file.md)** - Customize for your network environment

### Advanced Configuration  
- **[Network Discovery](agent/network_discovery.md)** - Configure network scanning and IP discovery
- **[Device Discovery](agent/device_discovery.md)** - Set up device connection and data collection
- **[Configuration Examples](agent/config_samples.md)** - Pre-built configurations for common scenarios

## Support and Resources
- **Getting Started**: For complete setup instructions, see the [NetBox Discovery Agent Getting Started Guide](agent/get-started.md)
- **Diode Documentation**: For advanced Diode configuration and SDK usage, see the [Diode documentation](../netbox-extensions/diode/index.md)
- **GitHub Repository**: Find the orb-agent source code [here](https://github.com/netboxlabs/orb-agent)
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel

---
By leveraging **NetBox Discovery**, organizations can enhance their network visibility, streamline IT operations, and maintain an accurate source of truth for their network infrastructure.

