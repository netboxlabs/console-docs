# NetBox Discovery Quickstart Guide

<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

Get started with NetBox Discovery quickly and see the power of automated network documentation in action. This guide provides multiple pathways to begin your journey with NetBox Discovery, from simple experiments to production deployments.

## Overview

NetBox Discovery automates the collection and ingestion of network data into NetBox, enabling you to:

- **Day 1**: Rapidly populate NetBox with existing network infrastructure
- **Day 1.5**: Improve data quality and fill documentation gaps  
- **Day 2**: Maintain continuous network state monitoring and drift detection

Whether you're documenting a new network, migrating to NetBox, or implementing operational drift detection with NetBox Assurance, NetBox Discovery provides the automation you need.

## Quick Lab Setup

Looking to try NetBox Discovery as quickly and easily as possible? The [NetBox Discovery Quickstart Guide](https://netboxlabs.com/blog/netbox-discovery-quickstart-guide/) on the NetBox Labs blog has you covered! 

In just a few commands, you'll have a complete lab environment with:

- **NetBox**: Fully configured NetBox instance
- **NetBox Discovery Agent**: Ready-to-use discovery automation
- **Simulated Network**: ContainerLab topology with virtual devices
- **Sample Configurations**: Pre-built policies for immediate testing

This lab environment lets you explore both discovery backends:

- **[Network Discovery](agent/network_discovery.md)**: IP scanning and network mapping
- **[Device Discovery](agent/device_discovery.md)**: Device configuration collection

## Production Deployment Options

### NetBox Cloud Integration
For NetBox Cloud customers, NetBox Discovery provides seamless integration:

1. **Managed Infrastructure**: NetBox Labs handles the Diode ingestion service
2. **Simplified Setup**: Focus on agent configuration, not infrastructure management
3. **Scalable Architecture**: Built-in support for multi-site deployments
4. **Enterprise Support**: Professional services available for large deployments

### NetBox Enterprise Integration  
NetBox Enterprise customers benefit from:

1. **On-Premises Control**: Full data sovereignty and security
2. **Advanced Workflows**: Integration with NetBox Assurance for drift detection
3. **Custom Integrations**: Extensible framework for proprietary systems
4. **High Availability**: Enterprise-grade deployment architectures

### NetBox Community Integration
Open source users can leverage:

1. **Self-Hosted Diode**: Deploy your own data ingestion service
2. **Docker Deployment**: Container-based agent deployment
3. **Community Support**: Active community forums and documentation
4. **Flexible Configuration**: Full control over discovery policies and scheduling

## Discovery Use Cases

### Network Mapping and IP Management
Perfect for organizations that need to:
- Document existing network infrastructure quickly
- Maintain accurate IP address inventories
- Detect IP conflicts and allocation issues
- Support network planning and capacity management

### Device Configuration Management
Ideal for teams focused on:
- Automated device inventory and documentation
- Configuration drift detection and compliance
- Multi-vendor network standardization
- Change management and audit trail maintenance

### Operational Drift Detection
Essential for organizations implementing:
- NetBox as the "source of truth" for network documentation
- Continuous compliance monitoring and reporting
- Automated detection of unauthorized network changes
- Integration between network automation and documentation systems

## Next Steps

### For Immediate Experimentation
1. **Start with the Lab**: Follow the [blog quickstart guide](https://netboxlabs.com/blog/netbox-discovery-quickstart-guide/)
2. **Explore Backends**: Test both network and device discovery capabilities
3. **Understand Data Flow**: See how discovered data appears in NetBox

### For Production Planning
1. **Architecture Review**: Understand [agent deployment options](agent/index.md)
2. **Configuration Planning**: Review [configuration file format](agent/configuration-file.md)
3. **Security Considerations**: Plan credential management and network access
4. **Integration Design**: Consider how discovery fits with existing workflows

### For NetBox Assurance Integration
1. **Drift Detection**: Learn about [operational drift concepts](../netbox-assurance/index.md)
2. **Workflow Design**: Plan how teams will respond to detected deviations
3. **Automation Strategy**: Consider integration with change management systems
4. **Monitoring Setup**: Design alerting and notification workflows

## Getting Help

- **Documentation**: Comprehensive guides for [agent configuration](agent/configuration-file.md)
- **Community Support**: Join the [NetBox community Slack](https://netdev.chat/) in the `#netbox` channel
- **Professional Services**: Contact NetBox Labs for enterprise deployment assistance
- **GitHub Repository**: Contribute to the [open source project](https://github.com/netboxlabs/orb-agent)