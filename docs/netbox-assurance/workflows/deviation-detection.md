---
tags:
  - cloud
  - enterprise
  - netbox
  - discovery
  - assurance
  - authentication
  - administration
  - operations
  - configuration
  - troubleshooting
  - automation
  - networking
  - integration
title: Deviation Detection
---
<span class="pill pill-enterprise">Enterprise</span>

# Deviation Detection

!!! note "NetBox Cloud Support"
    NetBox Cloud support coming July 7, 2025.

Deviation detection is the core capability of NetBox Assurance, identifying operational drift between the intended network state documented in NetBox and the actual operational state of your network infrastructure.

## Types of Operational Drift

!!! note "Important"
    NetBox Assurance detects "operational drift" (differences between NetBox data and actual network state), not "configuration drift" (differences between running config and intended config).

### Network State Deviations
- **Device Information**: Device models, software versions, or hardware components that differ from NetBox records
- **Interface States**: Interface operational status that differs from expected values
- **Network Topology**: Physical or logical connections that don't match NetBox documentation

### Topology Deviations
- **Physical Connections**: Cable connections that don't match documented topology
- **Interface Status**: Interfaces in unexpected up/down states
- **VLAN Assignments**: VLAN configurations that differ from NetBox

### Inventory Discrepancies
- **Missing Devices**: Devices documented in NetBox but not found on network
- **Undocumented Devices**: Devices discovered on network but not in NetBox
- **Hardware Changes**: Component changes not reflected in NetBox

## Detection Methods

### Real-time Monitoring
Continuous monitoring of network state changes:

```yaml
detection:
  mode: "real-time"
  sources:
    - snmp_polling
    - syslog_monitoring
    - api_integration
  frequency: "30s"
```

### Scheduled Validation
Periodic comprehensive validation checks:

```yaml
detection:
  mode: "scheduled"
  schedule: "0 */6 * * *"  # Every 6 hours
  full_scan: true
  sources:
    - configuration_backup
    - discovery_agent
    - network_scanning
```

### Event-driven Detection
Triggered by specific network events:

```yaml
detection:
  mode: "event-driven"
  triggers:
    - config_change_notification
    - device_reboot
    - interface_state_change
```

## Detection Rules

### Standard Rules
Pre-built rules for common deviation scenarios:

- **Interface State Validation**: Ensure interface operational states match expected values
- **IP Address Consistency**: Verify IP assignments match NetBox records
- **Routing Table Validation**: Check routing entries against expected topology
- **Access Control Validation**: Ensure security policies are correctly applied

### Custom Rules
Organization-specific validation logic:

```python
def validate_vlan_consistency(device, netbox_data):
    """Custom rule to validate VLAN configuration"""
    device_vlans = device.get_vlans()
    netbox_vlans = netbox_data.get_vlans()
    
    deviations = []
    for vlan_id, vlan_config in device_vlans.items():
        if vlan_id not in netbox_vlans:
            deviations.append(f"Undocumented VLAN {vlan_id} found")
        elif vlan_config != netbox_vlans[vlan_id]:
            deviations.append(f"VLAN {vlan_id} configuration mismatch")
    
    return deviations
```

## Severity Levels

### Critical
- Security policy violations
- Complete service outages
- Major configuration errors

### Warning
- Minor configuration drift
- Performance degradation indicators
- Compliance violations

### Informational
- Documentation updates needed
- Optimization opportunities
- Preventive maintenance alerts

## Deviation Reporting

### Alert Format
```json
{
  "severity": "warning",
  "device": "sw01.datacenter.example.com",
  "rule": "Interface State Validation",
  "deviation": "Interface Gi0/1 is down, expected up",
  "timestamp": "2025-01-15T10:30:00Z",
  "remediation_suggested": "Check physical connection",
  "workflow_id": "assurance-001"
}
```

### Reporting Options
- **Real-time Alerts**: Immediate notifications for critical deviations
- **Daily Summaries**: Consolidated reports of all detected deviations
- **Trend Analysis**: Historical deviation patterns and trends
- **Compliance Reports**: Regulatory compliance status reports

## Best Practices

### Rule Configuration
- Start with conservative thresholds to avoid alert fatigue
- Gradually refine rules based on operational experience
- Use appropriate severity levels for different types of deviations
- Include context and remediation guidance in alerts

### Monitoring Strategy
- Prioritize critical infrastructure for real-time monitoring
- Use scheduled validation for comprehensive periodic checks
- Implement event-driven detection for immediate response to changes
- Balance monitoring frequency with system performance

### Integration
- Connect with existing alerting and ticketing systems
- Integrate with configuration management tools
- Use APIs for custom integrations and automation
- Maintain audit trails for compliance requirements 
