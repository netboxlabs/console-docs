---
tags:
  - cloud
  - enterprise
  - netbox
  - discovery
  - assurance
  - api
  - authentication
  - administration
  - operations
  - configuration
  - getting-started
  - automation
  - networking
  - integration
title: Data Ingestion and Analysis
---

!!! note "NetBox Cloud Support"
    NetBox Cloud support coming early July 2025.

NetBox Assurance provides data ingestion and analysis capabilities to identify operational drift between the intended state in NetBox and actual network information from various data sources.

## Data Ingestion Overview

NetBox Assurance receives network information as ingested messages from various data sources and analyzes them against the intended state stored in NetBox. This analysis identifies operational drift and provides you with change sets to review before updating NetBox.

## Data Sources and Integration

### NetBox Discovery Integration
- **Discovery Agent**: Leverage network discovery, device discovery, and controller integrations
- **Controller Discovery**: VMware vCenter, Juniper Mist, Cisco Catalyst Center, Microsoft DHCP, AWS VPC IPAM
- **Automated Data Collection**: Device inventory, topology, and network state information

### Diode SDK Integration
- **Public API**: Ingest data from any system or data source
- **Python and Golang SDKs**: Available development kits for custom integrations
- **Monitoring Systems**: Integration with observability systems like Prometheus, Grafana, DataDog
- **Inventory Systems**: CMDB, spreadsheets, and other data sources

### Analysis and Comparison
- **Operational Drift Detection**: Compare ingested data against existing NetBox records
- **Change Set Generation**: Create proposed updates based on identified differences
- **Data Quality Control**: Review and approve data before it enters NetBox

## Monitoring Modes

### Continuous Monitoring
Real-time observation of network state with immediate deviation detection:
- Low-latency change detection
- Critical infrastructure monitoring
- Security event monitoring
- Performance threshold monitoring

### Scheduled Monitoring  
Periodic comprehensive validation of network state:
- Daily configuration audits
- Weekly compliance reports
- Monthly trend analysis
- Quarterly infrastructure reviews

### Event-driven Monitoring
Triggered monitoring based on specific network events:
- Configuration change notifications
- Device restart events
- Interface state changes
- Maintenance window activities

## Integration Points

### NetBox Discovery
- Leverage existing discovery data for monitoring
- Automatic target identification from discovery results
- Shared credential management
- Unified reporting and alerting

### External Systems
- **ITSM Integration**: ServiceNow, Jira Service Desk
- **Monitoring Tools**: Prometheus, Grafana, DataDog
- **Communication**: Slack, Microsoft Teams, Email
- **Automation**: Ansible, Terraform, custom APIs

## Getting Started

1. **Configure Monitoring Targets**: Define which devices and services to monitor
2. **Set Up Data Sources**: Configure SNMP, APIs, and other data collection methods
3. **Define Monitoring Rules**: Establish what constitutes normal vs. deviant behavior
4. **Configure Alerting**: Set up notifications and escalation procedures
5. **Enable Continuous Monitoring**: Start real-time network state observation

For detailed configuration instructions, see the monitoring-specific documentation pages. 
