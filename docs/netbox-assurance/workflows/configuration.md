---
tags:
  - cloud
  - enterprise
  - netbox
  - assurance
  - administration
  - operations
  - configuration
  - troubleshooting
  - automation
  - networking
title: Workflow Configuration
---
<span class="pill pill-enterprise">Enterprise</span>

# Workflow Configuration

!!! note "NetBox Cloud Support"
    NetBox Cloud support coming July 7, 2025.

This page covers how to configure NetBox Assurance workflows to manage data ingestion and detect operational drift from the intended state in NetBox.

## Configuration Overview

NetBox Assurance workflows are configured through the NetBox interface and consist of:

- **Monitoring Targets**: Devices, services, or network segments to monitor
- **Detection Rules**: Criteria that define what constitutes a deviation
- **Actions**: Responses to execute when deviations are detected
- **Schedules**: When and how often to run the workflow

## Basic Workflow Configuration

### 1. Define Monitoring Targets

Specify which network elements to monitor:

```yaml
targets:
  - device_role: "router"
    site: "datacenter-01"
  - device_type: "cisco-catalyst-9300"
    tenant: "production"
```

### 2. Set Detection Rules

Configure the conditions that trigger deviation alerts:

```yaml
rules:
  - name: "Configuration Drift"
    type: "config_comparison"
    threshold: "any_change"
  - name: "Interface State"
    type: "operational_state"
    expected: "up"
```

### 3. Configure Actions

Define what happens when deviations are detected:

```yaml
actions:
  - type: "alert"
    severity: "warning"
    recipients: ["network-team@example.com"]
  - type: "create_ticket"
    system: "servicenow"
    priority: "medium"
```

## Advanced Configuration

### Custom Validation Rules

Create custom rules for organization-specific requirements:

```yaml
custom_rules:
  - name: "VLAN Consistency"
    description: "Ensure VLANs match NetBox configuration"
    script: |
      # Custom validation logic
      if device.vlans != netbox.vlans:
          return deviation_found("VLAN mismatch detected")
```

### Remediation Workflows

Configure automatic remediation for common issues:

```yaml
remediation:
  - condition: "interface_down"
    action: "restart_interface"
    approval_required: false
  - condition: "config_drift"
    action: "restore_config"
    approval_required: true
```

## Best Practices

- Start with read-only monitoring before enabling remediation
- Test workflows in non-production environments first
- Use appropriate notification channels for different severity levels
- Regularly review and update detection rules
- Monitor workflow performance and adjust schedules as needed

## Troubleshooting

Common configuration issues and solutions:

- **Workflow not triggering**: Check monitoring target configuration and device accessibility
- **False positives**: Refine detection rules to reduce noise
- **Performance issues**: Adjust monitoring frequency and target scope 
