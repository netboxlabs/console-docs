<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

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
- **Data Center Infrastructure Management**: Keep track of routers, switches, and other network devices.
- **Network Asset Management**: Maintain an up-to-date inventory of network assets.
- **Network Audits**: Perform network audits for compliance and troubleshooting.

## Architecture

The orb-agent is built with the following components:

- **Configuration Manager**: Handles configuration retrieval from local files or Git repositories
- **Secrets Manager**: Manages secure credential storage and retrieval
- **Discovery Backends**: Pluggable discovery engines for different network protocols and methods
- **Policy Engine**: Processes discovery policies and orchestrates scanning activities

## Support and Resources
- **Getting Started**: For complete setup instructions, see the [NetBox Discovery Agent Getting Started Guide](agent/get-started.md)
- **Diode Documentation**: For advanced Diode configuration and SDK usage, see the [Diode documentation](../netbox-extensions/diode/index.md)
- **GitHub Repository**: Find the orb-agent source code [here](https://github.com/netboxlabs/orb-agent).
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel.

---
By leveraging **NetBox Discovery**, organizations can enhance their network visibility, streamline IT operations, and maintain an accurate source of truth for their network infrastructure.

