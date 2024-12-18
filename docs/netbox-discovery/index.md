<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

!!! info "*Public Preview*"
    **NetBox Discovery** is currently in Public Preview. Please refer to [NetBox Labs Product and Feature Lifecycle](https://docs.netboxlabs.com/product_feature_lifecycle/) to get more details. We actively welcome feedback to help identify and prioritize bugs, new features and areas of improvement.

NetBox Discovery is an advanced network discovery tool designed to simplify documenting your network and help detect network drift. It extends NetBox by providing automated network and device discovery capabilities.

## Key Features
- **Automated Network Discovery**: Schedule scans and identify devices and assets across your network.
- **Seamless Integration**: Fully integrated with NetBox through NetBox Assurance, helping you detect network drift.
- **Customizable Policies**: Define custom discovery policies tailored to specific network environments.
- **Extensible and Scalable**: Open source, lightweight discovery agent is built to scale with enterprise environments and support various network protocols.

## How It Works
NetBox Discovery leverages network protocols like SSH and ICMP to discover devices and other network assets. Discovered data is sent to NetBox Assurance to be matched and reconciled with NetBox to identify drift and deviations. The NetBox database can be updated where relevant, ensuring data accuracy and reducing manual entry.

### Discovery Process
1. **Define Discovery Policies**: Specify targets for scanning, such as IP addresses, IP ranges, IP subnets or resolvable domain names.
2. **Schedule Discoveries**: Set up automated scans at scheduled intervals.
3. **Review Deviations**: Analyze discovered information in NetBox Assurance, and synchronize them with NetBox where relevant.

## Requirements
- **NetBox Editions**: Available in NetBox Cloud and NetBox Enterprise editions.
- **NetBox Version**: Compatible starting with NetBox v4.1.
- **Supported Protocols**: ICMP, SSH.

## Use Cases
- **Data Center Management**: Keep track of routers, switches, and other network devices.
- **Network Asset Management**: Maintain an up-to-date inventory of network assets.
- **Network Audits**: Perform network audits for compliance and troubleshooting.

## Support and Resources
- **Documentation**: Get started with the NetBox Discovery agent [documentation](agent/index.md).
- **GitHub Repository**: Find the NetBox Discovery agent [here](https://github.com/netboxlabs/orb-agent).
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#orb` channel.

---
By leveraging NetBox Discovery, organizations can enhance their network visibility, streamline IT operations, and maintain an accurate source of truth for their network infrastructure.

