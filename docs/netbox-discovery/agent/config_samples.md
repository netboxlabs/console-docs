# Configuration Examples

<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

This page provides configuration examples organized by common enterprise use cases and deployment scenarios.

> **Note**: All examples use OAuth2 client credentials (`client_id` and `client_secret`) for authentication. These credentials are generated through the NetBox Diode plugin interface. For complete setup instructions including credential generation, see the [getting started guide](get-started.md).

## Enterprise Use Case Examples

### **Network Asset Discovery**
For enterprises needing to discover and inventory network devices across multiple sites.

```yaml
orb:
  config_manager: 
    active: local
  backends:
    device_discovery:
    common:
      diode:
        target: grpc://diode.company.com:8080/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: asset_discovery_agent
  policies:
    device_discovery:
      datacenter_devices:
        config:
          schedule: "0 6 * * *"  # Daily at 6 AM
          defaults:
            site: "Primary Data Center"
            tenant: "IT Infrastructure"
        scope:
          - driver: ios
            hostname: 192.168.1.1
            username: discovery_user
            password: ${CISCO_PASSWORD}
          - driver: junos
            hostname: 192.168.1.10
            username: discovery_user
            password: ${JUNIPER_PASSWORD}
      branch_office_devices:
        config:  
          schedule: "0 18 * * 0"  # Weekly on Sunday at 6 PM
          defaults:
            site: "Branch Office - Chicago"
            tenant: "Branch Operations"
        scope:
          - driver: ios
            hostname: 10.10.1.1
            username: discovery_user
            password: ${BRANCH_PASSWORD}
```

### **Compliance Auditing**
For regulated industries requiring regular network audits and compliance reporting.

```yaml
orb:
  config_manager:
    active: local
  backends:
    device_discovery:
    network_discovery:
    common:
      diode:
        target: grpc://diode.company.com:8080/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: compliance_audit_agent
  policies:
    device_discovery:
      compliance_scan:
        config:
          schedule: "0 2 * * 1"  # Weekly on Monday at 2 AM
          defaults:
            site: "Production Environment"
            tenant: "Compliance"
        scope:
          - driver: ios
            hostname: 192.168.100.1
            username: audit_user
            password: ${AUDIT_PASSWORD}
    network_discovery:
      network_inventory:
        config:
          schedule: "0 1 * * *"  # Daily at 1 AM
          timeout: 10
        scope:
          targets: 
            - "192.168.100.0/24"
            - "10.0.0.0/16"
```

### **Multi-Site Discovery**
For organizations with multiple geographic locations requiring coordinated discovery.

```yaml
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    common:
      diode:
        target: grpc://diode.company.com:8080/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: multi_site_agent
  policies:
    network_discovery:
      headquarters:
        config:
          schedule: "0 */4 * * *"  # Every 4 hours
          timeout: 5
        scope:
          targets: 
            - "192.168.0.0/16"
            - "10.0.0.0/8"
      remote_offices:
        config:
          schedule: "0 */12 * * *"  # Every 12 hours
          timeout: 10
        scope:
          targets:
            - "172.16.0.0/16"
            - "172.17.0.0/16"
```

## Deployment Examples

### **Basic Device Discovery**
Simple device discovery for getting started.

```yaml
orb:
  config_manager: 
    active: local
  backends:
    device_discovery:
    common:
      diode:
        target: grpc://192.168.0.100:8080/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: agent01
  policies:
    device_discovery:
      discovery_1:
        config:
          schedule: "* * * * *"
          defaults:
            site: New York NY
        scope:
          - driver: ios
            hostname: 192.168.0.5
            username: admin
            password: ${PASS}
```

**Docker Run Command:**
```bash
docker run -v /local/orb:/opt/orb/ \
  -e DIODE_CLIENT_ID={YOUR_CLIENT_ID} \
  -e DIODE_CLIENT_SECRET={YOUR_CLIENT_SECRET} \
  -e PASS={DEVICE_PASSWORD} \
  netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

### **Basic Network Discovery**
Simple network discovery for IP and device identification.

```yaml
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    common:
      diode:
        target: grpc://192.168.31.114:8080/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: agent02
  policies:
    network_discovery:
      policy_1:
        config:
          schedule: "0 */2 * * *"
          timeout: 5
        scope:
          targets: [192.168.1.1/22, google.com]
```

**Docker Run Command:**
```bash
docker run -v /local/orb:/opt/orb/ \
  -e DIODE_CLIENT_ID={YOUR_CLIENT_ID} \
  -e DIODE_CLIENT_SECRET={YOUR_CLIENT_SECRET} \
  netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

## Advanced Configuration

### **Custom NAPALM Drivers**
For organizations using specialized network equipment requiring custom drivers.

To specify community or custom NAPALM drivers, use the environment variable `INSTALL_DRIVERS_PATH`. Ensure that the required files are placed in the mounted volume (`/opt/orb`).

**Mounted folder structure:**
```
/local/orb/
├── agent.yaml
├── drivers.txt
├── napalm-mos/
└── napalm-ros-0.3.2.tar.gz
```

**Example `drivers.txt`:**
```txt
napalm-sros==1.0.2 # Install from PyPI
napalm-ros-0.3.2.tar.gz # Install from tar.gz
./napalm-mos # Install from local folder with project.toml
```

**Docker Run Command:**
```bash
docker run -v /local/orb:/opt/orb/ \
  -e DIODE_CLIENT_ID={YOUR_CLIENT_ID} \
  -e DIODE_CLIENT_SECRET={YOUR_CLIENT_SECRET} \
  -e PASS={DEVICE_PASSWORD} \
  -e INSTALL_DRIVERS_PATH=/opt/orb/drivers.txt \
  netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

### **Enterprise Security Integration**
Example configuration using HashiCorp Vault for credential management.

```yaml
orb:
  config_manager:
    active: local
  secrets_manager:
    active: vault
    vault:
      server: "https://vault.company.com:8200"
      token: ${VAULT_TOKEN}
      path: "secret/netbox-discovery"
  backends:
    device_discovery:
    common:
      diode:
        target: grpc://diode.company.com:8080/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: secure_discovery_agent
  policies:
    device_discovery:
      secure_discovery:
        config:
          schedule: "0 3 * * *"
          defaults:
            site: "Secure Environment"
        scope:
          - driver: ios
            hostname: 192.168.1.1
            username: discovery_user
            password: vault:device_passwords#cisco_password
```

## Next Steps

- **[Configuration Reference](configuration-file.md)** - Complete configuration file documentation
- **[Network Discovery](network_discovery.md)** - Detailed network discovery configuration
- **[Device Discovery](device_discovery.md)** - Detailed device discovery configuration
- **[Getting Started](get-started.md)** - Return to the setup guide