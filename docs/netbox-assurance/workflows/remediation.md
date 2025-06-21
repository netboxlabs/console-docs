---
tags:
  - cloud
  - enterprise
  - netbox
  - assurance
  - operator
  - authentication
  - administration
  - operations
  - configuration
  - troubleshooting
  - automation
  - networking
  - integration
title: Remediation Workflows
---
<span class="pill pill-enterprise">Enterprise</span>

# Remediation Workflows

!!! note "NetBox Cloud Support"
    NetBox Cloud support coming early July 2025.

Remediation workflows automatically respond to detected deviations, either by correcting the issue directly or by initiating processes to address the deviation.

## Remediation Types

### Automatic Remediation
Direct correction of detected deviations without human intervention:

```yaml
remediation:
  - name: "Interface Recovery"
    trigger: "interface_down"
    action: "restart_interface"
    conditions:
      - "interface_administratively_down == false"
      - "physical_layer_ok == true"
    approval_required: false
```

### Guided Remediation
Providing step-by-step guidance for manual correction:

```yaml
remediation:
  - name: "Configuration Drift Correction"
    trigger: "config_drift_detected"
    action: "provide_guidance"
    steps:
      - "Review configuration differences"
      - "Validate proposed changes"
      - "Apply configuration update"
      - "Verify remediation success"
```

### Workflow Triggers
Initiating business processes for complex issues:

```yaml
remediation:
  - name: "Hardware Failure Response"
    trigger: "hardware_failure"
    action: "create_ticket"
    workflow:
      system: "servicenow"
      priority: "high"
      assignment_group: "network_operations"
      include_diagnostics: true
```

## Common Remediation Actions

### Network Device Actions
- **Interface Reset**: Restart interfaces that are administratively down
- **Configuration Restore**: Restore known-good configurations
- **Service Restart**: Restart network services experiencing issues
- **Routing Update**: Correct routing table entries

### NetBox Synchronization
- **Update Records**: Sync NetBox data with discovered network state
- **Create Missing Objects**: Add undocumented devices or interfaces
- **Deprecate Removed Items**: Mark removed network components as inactive

### Notification and Escalation
- **Alert Generation**: Send notifications to appropriate teams
- **Ticket Creation**: Create service desk tickets for manual intervention
- **Escalation**: Escalate unresolved issues to higher-level support

## Remediation Configuration

### Basic Configuration
```yaml
remediation_policy:
  name: "Standard Network Remediation"
  enabled: true
  approval_required: false
  
  actions:
    - type: "interface_restart"
      conditions:
        - "administrative_status == down"
        - "operational_status == down"
      max_attempts: 3
      retry_delay: "30s"
      
    - type: "config_sync"
      conditions:
        - "config_drift_detected == true"
        - "deviation_severity <= warning"
      approval_required: true
```

### Advanced Configuration
```yaml
remediation_policy:
  name: "Critical Infrastructure Remediation"
  enabled: true
  
  conditions:
    device_role: ["core_router", "core_switch"]
    
  actions:
    - type: "automated_recovery"
      max_impact: "single_device"
      approval_required: true
      approvers: ["network_manager", "operations_lead"]
      
    - type: "rollback_config"
      trigger: "config_validation_failed"
      rollback_window: "24h"
      
    - type: "emergency_notification"
      trigger: "critical_failure"
      recipients: ["on_call_engineer"]
      escalation_delay: "5m"
```

## Safety Mechanisms

### Approval Workflows
- **Multi-level Approval**: Require multiple approvals for high-impact changes
- **Time-based Approval**: Automatic approval after specified time periods
- **Risk Assessment**: Evaluate potential impact before remediation

### Rollback Capabilities
- **Configuration Snapshots**: Automatic backup before changes
- **Rollback Triggers**: Automatic rollback on validation failure
- **Manual Rollback**: Operator-initiated rollback procedures

### Impact Limitation
- **Maintenance Windows**: Restrict remediation to approved time periods
- **Device Limits**: Limit concurrent remediation actions
- **Circuit Protection**: Prevent remediation on critical circuits

## Monitoring and Reporting

### Remediation Tracking
```json
{
  "remediation_id": "rem-001",
  "deviation_id": "dev-123",
  "action": "interface_restart",
  "device": "sw01.datacenter.example.com",
  "status": "completed",
  "started": "2025-01-15T10:30:00Z",
  "completed": "2025-01-15T10:31:15Z",
  "success": true,
  "details": "Interface Gi0/1 successfully restarted"
}
```

### Success Metrics
- **Remediation Success Rate**: Percentage of successful automatic remediations
- **Time to Resolution**: Average time from detection to remediation
- **Manual Intervention Rate**: Percentage of deviations requiring manual intervention
- **Rollback Frequency**: Number of remediations requiring rollback

## Integration Examples

### ServiceNow Integration
```yaml
integration:
  servicenow:
    url: "https://company.service-now.com"
    authentication: "oauth2"
    ticket_creation:
      category: "Network"
      subcategory: "Infrastructure"
      priority_mapping:
        critical: "1"
        warning: "3"
        informational: "4"
```

### Slack Integration
```yaml
integration:
  slack:
    webhook_url: "https://hooks.slack.com/services/..."
    channels:
      critical: "#network-alerts"
      warning: "#network-monitoring"
      success: "#network-ops"
    message_format: "detailed"
```

### Ansible Integration
```yaml
integration:
  ansible:
    playbook_path: "/opt/netbox-assurance/playbooks"
    inventory: "dynamic"
    remediation_playbooks:
      interface_restart: "restart_interface.yml"
      config_restore: "restore_config.yml"
      service_restart: "restart_service.yml"
```

## Best Practices

### Remediation Strategy
- Start with read-only monitoring to understand deviation patterns
- Implement least-privilege remediation (minimal changes required)
- Use staged rollouts for new remediation policies
- Maintain detailed audit logs of all remediation actions

### Risk Management
- Test remediation actions in lab environments first
- Implement appropriate approval workflows for high-impact changes
- Monitor remediation success rates and adjust policies accordingly
- Have rollback procedures ready for all automated actions

### Operational Excellence
- Provide clear documentation for all remediation actions
- Train operators on manual intervention procedures
- Regular review and update of remediation policies
- Integration with existing change management processes 
