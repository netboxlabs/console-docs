---
tags:
  - cloud
  - enterprise
  - community
  - netbox
  - discovery
  - getting-started
  - installation
  - configuration
versions:
  cloud: "v1.10"
  enterprise: "v1.10"
  community: "v1.10"
status: "current"
related_docs:
  - "index.md"
  - "../netbox-assurance/getting-started.md"
  - "../netbox-extensions/diode/index.md"
external_links:
  - "https://github.com/netboxlabs/orb-agent"
  - "https://netdev.chat/"
---

# Get Started with NetBox Discovery

This guide will help you set up and start using NetBox Discovery to ingest network data into NetBox. The setup process varies depending on your NetBox deployment type.

## Choose Your Deployment Type

### NetBox Cloud
If you're using **NetBox Cloud**, NetBox Discovery is managed for you:
- ✅ **Diode server is managed** by NetBox Labs
- ✅ **Plugin enabled** by Customer Support upon request
- 🔧 **You configure**: Client credentials and discovery agents

### NetBox Enterprise  
If you're using **NetBox Enterprise**, NetBox Discovery comes pre-configured:
- ✅ **Diode server is built-in** to your Enterprise deployment
- ✅ **Plugin enabled by default** if you have the Discovery entitlement
- 🔧 **You configure**: Client credentials and discovery agents

### NetBox Community
If you're using **NetBox Community**, you'll need to set up the complete infrastructure:
- 🔧 **You deploy**: Diode server, plugin installation, and discovery agents
- 📖 **Full setup guide**: [Community Setup Instructions](#community-setup-instructions)

---

## NetBox Cloud Setup

### Prerequisites
- Active NetBox Cloud subscription with Discovery entitlement
- Docker installed on agent host systems
- Network connectivity from agent hosts to your NetBox Cloud instance

### Step 1: Enable NetBox Discovery
Contact Customer Support to enable NetBox Discovery for your NetBox Cloud instance. Once enabled, you'll see the **Diode** section in your NetBox navigation menu.

### Step 2: Generate Client Credentials
1. Log into your NetBox Cloud instance
2. Navigate to **Diode → Client Credentials**
3. Click **+ Add a Credential**
4. Enter a descriptive name (e.g., "Production Discovery Agent")
5. Click **Create**
6. **Important**: Copy and securely store the Client ID and Client Secret

### Step 3: Deploy Discovery Agents
Deploy agents on your network infrastructure to discover devices:

```bash
# Export your credentials
export DIODE_CLIENT_ID="your-client-id"
export DIODE_CLIENT_SECRET="your-client-secret"

# Create agent configuration
cat > agent.yaml << EOF
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    common:
      diode:
        target: https://your-instance.netboxcloud.com/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: cloud_agent_01
  policies:
    network_discovery:
      network_scan:
        config:
          schedule: "0 */4 * * *"  # Every 4 hours
          timeout: 5
        scope:
          targets: 
            - "192.168.1.0/24"
            - "10.0.0.0/16"
EOF

# Run the discovery agent
docker run --net=host \
  -v $(pwd):/opt/orb/ \
  -e DIODE_CLIENT_ID \
  -e DIODE_CLIENT_SECRET \
  netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

---

## NetBox Enterprise Setup

### Prerequisites
- NetBox Enterprise deployment with Discovery entitlement
- Docker installed on agent host systems
- Network connectivity from agent hosts to your NetBox Enterprise instance

### Step 1: Verify Plugin Status
The Diode plugin is enabled by default in NetBox Enterprise if you have the Discovery entitlement. Verify by checking for the **Diode** section in your NetBox navigation menu.

### Step 2: Generate Client Credentials
1. Log into your NetBox Enterprise instance
2. Navigate to **Diode → Client Credentials**
3. Click **+ Add a Credential**
4. Enter a descriptive name (e.g., "Datacenter East Agent")
5. Click **Create**
6. **Important**: Copy and securely store the Client ID and Client Secret

### Step 3: Deploy Discovery Agents
Deploy agents across your network infrastructure:

```bash
# Export your credentials
export DIODE_CLIENT_ID="your-client-id"
export DIODE_CLIENT_SECRET="your-client-secret"

# Create agent configuration
cat > agent.yaml << EOF
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    device_discovery:
    common:
      diode:
        target: https://your-instance.netboxcloud.com/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: enterprise_agent_01
  policies:
    network_discovery:
      headquarters:
        config:
          schedule: "0 */2 * * *"  # Every 2 hours
          timeout: 5
        scope:
          targets: 
            - "192.168.0.0/16"
            - "10.0.0.0/8"
    device_discovery:
      cisco_devices:
        config:
          schedule: "0 */6 * * *"  # Every 6 hours
          defaults:
            site: Headquarters
        scope:
          - driver: ios
            hostname: 192.168.1.1
            username: ${DEVICE_USERNAME}
            password: ${DEVICE_PASSWORD}
EOF

# Run the discovery agent
docker run --net=host \
  -v $(pwd):/opt/orb/ \
  -e DIODE_CLIENT_ID \
  -e DIODE_CLIENT_SECRET \
  -e DEVICE_USERNAME \
  -e DEVICE_PASSWORD \
  netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

---

## Configuration Examples

### NetBox Cloud - Basic Network Discovery
```yaml
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    common:
      diode:
        target: https://your-instance.netboxcloud.com/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: cloud_network_agent
  policies:
    network_discovery:
      office_networks:
        config:
          schedule: "0 */4 * * *"
          timeout: 5
        scope:
          targets: 
            - "192.168.1.0/24"
            - "10.1.0.0/16"
```

### NetBox Enterprise - Multi-Site Discovery
```yaml
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    device_discovery:
    common:
      diode:
        target: https://your-instance.netboxcloud.com/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: multi_site_agent
  policies:
    network_discovery:
      headquarters:
        config:
          schedule: "0 */4 * * *"
          timeout: 5
        scope:
          targets: 
            - "192.168.0.0/16"
            - "10.0.0.0/8"
      remote_offices:
        config:
          schedule: "0 */12 * * *"
          timeout: 10
        scope:
          targets:
            - "172.16.0.0/16"
            - "172.17.0.0/16"
    device_discovery:
      core_switches:
        config:
          schedule: "0 */8 * * *"
          defaults:
            site: Headquarters
        scope:
          - driver: ios
            hostname: 192.168.1.10
            username: ${SWITCH_USERNAME}
            password: ${SWITCH_PASSWORD}
          - driver: junos
            hostname: 192.168.1.11
            username: ${SWITCH_USERNAME}
            password: ${SWITCH_PASSWORD}
```

### NetBox Enterprise - Device Discovery Focus
```yaml
orb:
  config_manager:
    active: local
  backends:
    device_discovery:
    common:
      diode:
        target: https://your-instance.netboxcloud.com/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: device_discovery_agent
  policies:
    device_discovery:
      cisco_infrastructure:
        config:
          schedule: "0 */6 * * *"
          defaults:
            site: Data Center 1
            tenant: Infrastructure
        scope:
          - driver: ios
            hostname: core-sw-01.company.local
            username: ${CISCO_USERNAME}
            password: ${CISCO_PASSWORD}
          - driver: ios
            hostname: core-sw-02.company.local
            username: ${CISCO_USERNAME}
            password: ${CISCO_PASSWORD}
      juniper_edge:
        config:
          schedule: "0 */12 * * *"
          defaults:
            site: Edge Locations
        scope:
          - driver: junos
            hostname: edge-01.company.local
            username: ${JUNIPER_USERNAME}
            password: ${JUNIPER_PASSWORD}
```

---

## Community Setup Instructions

If you're using NetBox Community, you'll need to set up the complete NetBox Discovery infrastructure:

### Prerequisites
- NetBox Community version 4.2.3 or later
- Docker version 27.0.3 or newer
- bash 4.x or newer
- jq
- Sufficient permissions to run Docker commands

### Step 1: Deploy Diode Server

Create a working directory and deploy the Diode server:

```bash
# Create working directory
mkdir -p /opt/diode
cd /opt/diode

# Download quickstart script
curl -sSfLo quickstart.sh https://raw.githubusercontent.com/netboxlabs/diode/release/diode-server/docker/scripts/quickstart.sh
chmod +x quickstart.sh

# Run setup script
./quickstart.sh https://your-netbox-server.com

# Start Diode server
docker compose up -d

# Verify services are running
docker compose ps
```

### Step 2: Install Diode Plugin

Install and configure the Diode plugin in your NetBox Community instance:

```bash
# Activate NetBox virtual environment
cd /opt/netbox
source venv/bin/activate

# Install plugin
pip install netboxlabs-diode-netbox-plugin

# Add to configuration.py
cat >> /opt/netbox/netbox/netbox/configuration.py << EOF

# Diode Plugin Configuration
PLUGINS.append("netbox_diode_plugin")

PLUGINS_CONFIG["netbox_diode_plugin"] = {
    "diode_target_override": "grpc://localhost:8080/diode",
    "diode_username": "diode",
    "netbox_to_diode_client_secret": "your-secret-from-quickstart"
}
EOF

# Apply migrations
cd /opt/netbox/netbox
./manage.py migrate netbox_diode_plugin

# Restart NetBox
sudo systemctl restart netbox netbox-rq
```

### Step 3: Generate Client Credentials and Deploy Agents

Follow the same credential generation and agent deployment steps as Enterprise, but use your self-hosted Diode server URL:

```yaml
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    common:
      diode:
        target: grpc://your-diode-server.com:8080/diode
        client_id: ${DIODE_CLIENT_ID}
        client_secret: ${DIODE_CLIENT_SECRET}
        agent_name: community_agent
  policies:
    network_discovery:
      home_network:
        config:
          schedule: "0 */6 * * *"
          timeout: 5
        scope:
          targets: 
            - "192.168.1.0/24"
```

---

## Troubleshooting

### Cloud & Enterprise Common Issues

1. **Authentication Issues**
   - Verify client credentials are correct
   - Check that Discovery entitlement is active
   - Ensure credentials haven't expired

2. **Agent Connection Issues**
   - Verify network connectivity to your NetBox instance
   - Check firewall rules for HTTPS traffic
   - Validate the target URL in agent configuration

3. **Discovery Issues**
   - Verify agent has network access to target devices
   - Check device credentials and permissions
   - Review agent logs for specific error messages

### Cloud-Specific Issues

1. **Plugin Not Available**
   - Contact Customer Support to enable Discovery
   - Verify your subscription includes Discovery entitlement

2. **Target URL Issues**
   - Use format: `https://your-instance.netboxcloud.com/diode`
   - Ensure no trailing slashes in URL

### Enterprise-Specific Issues

1. **Plugin Not Enabled**
   - Verify Discovery entitlement in your license
   - Check with your NetBox Enterprise administrator
   - Review NetBox Enterprise logs for plugin errors

2. **Internal Network Access**
   - Ensure agents can reach NetBox Enterprise instance
   - Check internal DNS resolution
   - Verify SSL certificates for internal domains

### Agent Troubleshooting

**Enable Debug Logging:**
```bash
docker run --net=host \
  -v $(pwd):/opt/orb/ \
  -e DIODE_CLIENT_ID \
  -e DIODE_CLIENT_SECRET \
  -e LOG_LEVEL=DEBUG \
  netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

**Common Log Messages:**
- `"Connection established"` - Agent connected successfully
- `"Discovery completed"` - Discovery cycle finished
- `"Authentication failed"` - Check client credentials
- `"Connection refused"` - Check target URL and network connectivity

---

## Best Practices

### Security
- Store credentials as environment variables, never in configuration files
- Use descriptive agent names for easier troubleshooting
- Rotate client credentials regularly
- Implement network segmentation for discovery traffic

### Performance
- Adjust discovery schedules based on network size and change frequency
- Use appropriate timeout values for your network conditions
- Deploy multiple agents for large networks
- Monitor agent resource usage

### Operations
- Implement monitoring for agent health and connectivity
- Set up alerting for discovery failures
- Maintain documentation of agent deployments
- Regular review of discovered data accuracy

---

## Getting Help

### Support Resources
- **NetBox Cloud**: Contact Customer Support through your cloud portal
- **NetBox Enterprise**: Contact your NetBox Labs support representative
- **Community**: Join [NetDev Community Slack](https://netdev.chat/) #netbox channel

### Documentation
- [NetBox Discovery Agent Documentation](https://github.com/netboxlabs/orb-agent)
- [Diode Documentation](../netbox-extensions/diode/index.md)
- [NetBox Enterprise Documentation](../netbox-enterprise/nbe-overview.md)

### Troubleshooting
- [GitHub Issues](https://github.com/netboxlabs/orb-agent/issues) - Report bugs and feature requests
- Agent logs: `docker logs <container-id>`
- NetBox Diode plugin logs: Check the Ingestion Logs view in NetBox

---

**Success!** You now have NetBox Discovery configured and running. Your agents will automatically discover and update network infrastructure data in NetBox based on your configured schedules. 