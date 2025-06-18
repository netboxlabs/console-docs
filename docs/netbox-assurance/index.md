<span class="pill pill-enterprise">Enterprise</span>

!!! note "NetBox Cloud Support"
    NetBox Cloud support coming early July 2025.

NetBox Assurance allows you to control which data goes into NetBox by giving you a view of the difference between the data in your NetBox (representing the intended state of the infrastructure) and the data in your network (the operational state of the infrastructure). We call this difference "operational drift", which helps teams maintain accurate documentation as the foundation for network automation, compliance, and operational excellence.

## Key Features
- **Operational Drift Detection**: Identify differences between NetBox's intended state and actual network state.
- **Data Ingestion Control**: Review and approve data before it enters NetBox, maintaining data quality.
- **NetBox Discovery Integration**: Leverage existing discovery data and controller integrations.
- **Diode SDK Integration**: Public API for ingesting data from any system or data source.
- **Change Set Management**: Review proposed updates and apply them to NetBox branches.

## How It Works
NetBox Assurance follows a four-step process:

1. **Data Ingestion**: Network information is sent to NetBox Assurance as ingested messages from NetBox Discovery, direct device interrogation, or other network data sources via the Diode SDK.
2. **Analysis & Comparison**: Ingested messages are analyzed against existing NetBox data to identify matches and detect operational drift.
3. **Deviation Review**: You can review detected deviations and examine proposed updates (change sets) based on identified operational drift.
4. **Action & Resolution**: Take action by applying changes to NetBox (main branch or user branches), recalculating drift, or ignoring deviations as needed.

## Use Cases
- **Day 1 - Initial NetBox Population**: Stay in control while rapidly populating NetBox with discovery data, ensuring data quality from the start.
- **Day 1.5 - Improving Network Management**: Maintain operational continuity while gradually improving documentation processes and automation maturity.
- **Day 2 - Operational Excellence**: Achieve high maturity with timely, accurate information about operational drift to respond immediately and maintain confidence.

## Getting Started

1. **[Quickstart Guide](quickstart-guide.md)**: Get up and running quickly with NetBox Assurance
2. **[Assurance Workflows](workflows/index.md)**: Configure operational drift detection and data review processes
3. **[Data Ingestion](monitoring/index.md)**: Set up data sources and ingestion from NetBox Discovery and other systems

## Documentation Sections

### Workflows
- **[Workflow Configuration](workflows/configuration.md)**: Configure monitoring targets, detection rules, and actions
- **[Deviation Detection](workflows/deviation-detection.md)**: Understand how deviations are identified and classified
- **[Remediation](workflows/remediation.md)**: Automated and guided remediation of detected issues

### Data Ingestion
- **[Data Ingestion Overview](monitoring/index.md)**: NetBox Discovery integration and Diode SDK data sources

## Support and Resources
- **Community Support**: Connect with the community on [Slack](https://netdev.chat/) in the `#netbox` channel.
- **Documentation**: Additional resources and integration guides available in related sections.

---
With **NetBox Assurance**, teams can detect, report, and resolve network deviations in real time, ensuring a consistent and reliable network environment through continuous validation and corrective actions.