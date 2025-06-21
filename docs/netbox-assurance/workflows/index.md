---
tags:
  - cloud
  - enterprise
  - discovery
  - assurance
  - api
  - administration
  - configuration
  - getting-started
  - networking
title: Assurance Workflows
---

!!! note "NetBox Cloud Support"
    NetBox Cloud support coming early July 2025.

NetBox Assurance workflows help you control data ingestion into NetBox by analyzing ingested messages and identifying operational drift between the intended state documented in NetBox and the actual network state.

## Key Concepts

**Operational Drift Detection**: Workflows analyze ingested messages against NetBox data to identify differences between intended and actual network state.

**Change Set Review**: When operational drift is detected, you can review proposed updates (change sets) before applying them to NetBox.

**Data Control**: Maintain full control over what data enters NetBox by reviewing and approving changes or ignoring deviations as needed.

## Workflow Process

NetBox Assurance follows a structured four-step workflow:

1. **Data Ingestion**: Receive network information as ingested messages from NetBox Discovery or other sources via Diode SDK
2. **Analysis & Comparison**: Compare ingested data against existing NetBox records to identify operational drift
3. **Deviation Review**: Review detected deviations and examine proposed change sets
4. **Action & Resolution**: Apply changes to NetBox branches, recalculate drift, or ignore deviations

## Getting Started

1. Configure data ingestion sources (NetBox Discovery, Diode SDK integrations)
2. Set up operational drift detection rules
3. Establish review and approval processes for change sets
4. Configure NetBox branch management for applying changes

For detailed configuration guidance, see the workflow-specific documentation pages. 
