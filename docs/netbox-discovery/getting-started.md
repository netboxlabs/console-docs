# Get Started with NetBox Discovery

<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

This guide will help you set up and start using NetBox Discovery to ingest network data into NetBox.

## For NetBox Enterprise

If you're using **NetBox Enterprise**, you have several deployment options optimized for enterprise environments:

### **Quick Start for Existing NetBox Enterprise**

If you already have NetBox Enterprise running, follow this streamlined approach:

1. **Deploy Diode Server** (recommended on separate infrastructure)
2. **Install Diode Plugin** (adds to your existing NetBox Enterprise)
3. **Configure Discovery Agents** (deploy on network segments)

> **Enterprise Benefits**: This approach provides centralized discovery management, secure credential handling, and scales horizontally across multiple network segments.

### **Enterprise Deployment Considerations**

- **Security**: NetBox Discovery supports secure credential handling and can integrate with external secret management systems
- **Scalability**: Deploy multiple discovery agents across different network segments or data centers
- **Compliance**: Supports enterprise auditing and compliance workflows through comprehensive logging
- **High Availability**: Diode server can be deployed in high-availability configurations

### **Common Enterprise Use Cases**

- **Network Asset Discovery**: Automated discovery of network devices across multiple sites
- **Compliance Auditing**: Continuous monitoring of network configuration against enterprise standards  
- **Change Detection**: Identify unauthorized changes to network infrastructure
- **Documentation Automation**: Keep network documentation current without manual intervention

### **Enterprise Setup Path**

1. **[Review Enterprise Prerequisites](#enterprise-prerequisites)** - Additional considerations for enterprise deployments
2. **[Deploy Production Diode](#deploy-diode-server)** - Set up Diode server for enterprise use
3. **[Configure NetBox Enterprise Plugin](#install-diode-netbox-plugin)** - Integrate with your existing NetBox Enterprise
4. **[Deploy Discovery Agents](#run-netbox-discovery-agent)** - Set up agents across your network infrastructure

---

## Prerequisites

Before you begin, ensure you have:

- NetBox version 4.2.3 or later
- Docker version 27.0.3 or newer
- bash 4.x or newer
- jq
- Network connectivity between your NetBox server and the Diode server
- Sufficient permissions to run Docker commands

### Enterprise Prerequisites

For enterprise deployments, also consider:

- **Network Segmentation**: Ensure discovery agents can reach target network segments
- **Firewall Configuration**: Open necessary ports for Diode communication (default: 8080)
- **DNS Resolution**: Ensure all components can resolve each other's hostnames
- **Secret Management**: Plan integration with your enterprise secret management system
- **Resource Planning**: Size Diode server infrastructure based on discovery scope
- **Backup Strategy**: Include Diode server data in your backup procedures

## Installation Steps

### Deploy Diode server

> **Host**: These steps should be performed on the host where you want to run the Diode server.

> **Note**: For the complete installation instructions, please refer to the [official Diode Server documentation](https://github.com/netboxlabs/diode/tree/develop/diode-server).

We provide a `quickstart.sh` script to automate the setup process. The script will download and configure all necessary files:

- `docker-compose.yaml` — Defines Diode server containers
- `.env` — Environment settings for customization
- `nginx.conf` — Nginx configuration for routing Diode endpoints
- `client-credentials.json` — Defines OAuth2 clients for secure communication

1. Create a working directory:
   ```bash
   mkdir -p /opt/diode
   cd /opt/diode
   ```

2. Download and prepare the quickstart script:
   ```bash
   curl -sSfLo quickstart.sh https://raw.githubusercontent.com/netboxlabs/diode/release/diode-server/docker/scripts/quickstart.sh
   chmod +x quickstart.sh
   ```

3. Run the script with your NetBox server address:
   ```bash
   ./quickstart.sh https://<netbox-server>
   ```
   > **Note**: Replace `<netbox-server>` with your actual NetBox server address. Do not include a trailing slash.
   > Example: `./quickstart.sh https://netbox.example.com`

   This should have created an `.env` file for your environment.

4. Start the Diode server:
   ```bash
   docker compose up -d
   ```

5. Verify the Diode server is running:
   ```bash
   docker compose ps
   ```
   All services should show as "running" or "healthy".

6. Extract the `netbox-to-diode` client secret. This will be needed for the Diode NetBox plugin installation:
   ```bash
   echo $(jq -r '.[] | select(.client_id == "netbox-to-diode") | .client_secret' /opt/diode/oauth2/client/client-credentials.json)
   ```
   > **Note**: This will return a credential that will be used by the Diode NetBox plugin to connect to the Diode server. Store it safely.

### Install Diode NetBox Plugin

> **Host**: These steps should be performed on the host where NetBox is installed.

> **Note**: For the complete installation instructions, please refer to the [official Diode NetBox Plugin documentation](https://github.com/netboxlabs/diode-netbox-plugin/blob/develop/README.md).

1. **Source the NetBox Python Virtual Environment**
   ```bash
   cd /opt/netbox
   source venv/bin/activate
   ```

2. **Install the Plugin Package**
   ```bash
   pip install netboxlabs-diode-netbox-plugin
   ```

3. **Configure NetBox Settings**
   Add the following to your `configuration.py`:
   ```python
   PLUGINS = [
       "netbox_diode_plugin",
   ]

   PLUGINS_CONFIG = {
       "netbox_diode_plugin": {
           # Diode gRPC target for communication with Diode server
           "diode_target_override": "grpc://<diode-server:port>/diode",
           # NetBox username associated with changes applied via plugin
           "diode_username": "diode",
           # netbox-to-diode client secret from earlier step
           "netbox_to_diode_client_secret": "<netbox-to-diode-secret>"
       },
   }
   ```
   > **Note**: Replace `<diode-server:port>` with your Diode server address and port (default: 8080)
   > Example: `grpc://diode.example.com:8080/diode`

4. **Apply Database Migrations**
   ```bash
   cd /opt/netbox/netbox
   ./manage.py migrate netbox_diode_plugin
   ```

5. **Restart NetBox Services**
   ```bash
   sudo systemctl restart netbox netbox-rq
   ```

6. **Generate Diode Client Credentials**
   > **Note**: These credentials will be used by the NetBox Discovery agent to send discovery results to NetBox via Diode.

   1. Go to your NetBox instance (https://<netbox-server>)
   2. In the left-hand pane, navigate to **Diode -> Client Credentials**
   3. Click on **+ Add a Credential**
   4. For Client Name, enter any name and click **Create**
   5. **IMPORTANT**: Copy the _Client ID_ and _Client Secret_ and save them securely
   6. Click **Return to List**

   You have now created your Diode client credentials. These will be used as environment variables when running the NetBox Discovery agent.

### Run NetBox Discovery Agent

> **Host**: These steps should be performed on the host where you want to run the NetBox Discovery agent for network discovery.

> **Note**: For the complete installation instructions, please refer to the [official NetBox Discovery Agent documentation](https://github.com/netboxlabs/orb-agent).

1. **Export Client Credentials**
   ```bash
   # Export the client credentials you generated in NetBox
   export DIODE_CLIENT_ID="<your-client-id>"
   export DIODE_CLIENT_SECRET="<your-client-secret>"
   ```

2. **Create Agent Configuration File**
   Create an `agent.yaml` file with the following content:
   ```yaml
   orb:
     config_manager:
       active: local
     backends:
       network_discovery:  # Enable network discovery backend
       common:
         diode:
           target: grpc://<diode-server:port>/diode
           client_id: ${DIODE_CLIENT_ID}
           client_secret: ${DIODE_CLIENT_SECRET}
           agent_name: my_agent
     policies:
       network_discovery:
         loopback_policy:
           config:
           scope:
             targets: 
               - 127.0.0.1
   ```
   > **Note**: Replace `<diode-server:port>` with your Diode server address and port (default: 8080)
   > Example: `grpc://diode.example.com:8080/diode`

3. **Run the Agent**
   
   Using host network mode (recommended):
   ```bash
   docker run --net=host \
     -v $(pwd):/opt/orb/ \
     -e DIODE_CLIENT_ID \
     -e DIODE_CLIENT_SECRET \
     netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
   ```

   Alternative using root user:
   ```bash
   docker run -u root \
     -v $(pwd):/opt/orb/ \
     -e DIODE_CLIENT_ID \
     -e DIODE_CLIENT_SECRET \
     netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
   ```

   > **Note**: The container needs sufficient permissions to send ICMP and TCP packets. This can be achieved either by:
   > - Setting the network mode to `host` (recommended)
   > - Running the container as root user

4. **Verify Agent Operation**
   - Check the agent logs for successful startup
   - Verify data appears in NetBox

## Configuration Examples

### Basic Network Discovery
Simple network discovery for IP and device identification:

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

### Basic Device Discovery
Simple device discovery for getting started:

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
            password: ${DEVICE_PASSWORD}
```

### Enterprise Multi-Site Discovery
For organizations with multiple locations requiring coordinated discovery:

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

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - Verify network connectivity between Diode and NetBox:
     ```bash
     # From Diode server
     curl -v https://<netbox-server>
     # From NetBox server
     curl -v grpc://<diode-server:port>/diode
     ```
   - Check firewall rules:
     ```bash
     # Check if required ports are open
     netstat -tulpn | grep -E '8080|443'
     ```
   - Validate URLs and ports in configuration files:
     - Diode server `.env`
     - NetBox `configuration.py`
     - NetBox Discovery agent `agent.yaml`

2. **Authentication Issues**
   - **Problem**: "Authentication failed" or "Invalid credentials" errors
   - **Solution**: Verify client credentials are correct
     ```bash
     # Verify environment variables
     echo $DIODE_CLIENT_ID
     echo $DIODE_CLIENT_SECRET
     ```

3. **Discovery Issues**
   - **Problem**: No devices being discovered
   - **Solution**: Check network connectivity and credentials
     ```bash
     # Test ICMP connectivity
     ping <target-device>
     # Test SSH connectivity
     nc -zv <target-device> 22
     ```

4. **Docker Issues**
   - Check Docker service status:
     ```bash
     systemctl status docker
     ```
   - Verify Docker container logs:
     ```bash
     docker compose logs
     ```

5. **Permission Issues**
   - Ensure proper file permissions:
     ```bash
     ls -la /opt/diode/
     ls -la /opt/netbox/
     ```
   - Check Docker socket permissions:
     ```bash
     ls -l /var/run/docker.sock
     ```

### Enterprise Troubleshooting

#### **Multi-Agent Deployments**
- **Problem**: Agents overwriting each other's data
- **Solution**: Ensure unique agent names and proper site/tenant configuration
- **Best Practice**: Use descriptive agent names like `datacenter-east-01`

#### **Performance Issues**
- **Problem**: Discovery taking too long or timing out
- **Solution**: Adjust timeout values and schedule frequency
  ```yaml
  config:
    timeout: 30  # Increase timeout
    schedule: "0 */6 * * *"  # Reduce frequency
  ```

#### **Security Compliance**
- **Problem**: Credentials stored in plain text
- **Solution**: Use environment variables and secure credential management
  ```yaml
  # Use environment variables for sensitive data
  username: ${DISCOVERY_USERNAME}
  password: ${DISCOVERY_PASSWORD}
  ```

### Log Analysis

#### **Enable Debug Logging**
```bash
docker run --net=host \
  -v $(pwd):/opt/orb/ \
  -e DIODE_CLIENT_ID \
  -e DIODE_CLIENT_SECRET \
  -e LOG_LEVEL=DEBUG \
  netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

#### **Common Log Messages**
- `"Connection established"` - Agent successfully connected to Diode
- `"Discovery completed"` - Discovery cycle finished successfully
- `"Authentication failed"` - Check client credentials
- `"Connection refused"` - Check Diode server availability

## Enterprise Operations

### **Production Deployment Best Practices**

#### **High Availability Setup**
- Deploy multiple agents across different hosts
- Use container orchestration (Kubernetes, Docker Swarm)
- Implement health checks and automatic restarts

#### **Resource Planning**
- **CPU**: 1-2 cores per agent (depending on discovery scope)
- **Memory**: 512MB-1GB per agent
- **Network**: Ensure sufficient bandwidth for discovery traffic
- **Storage**: 10-50GB for logs and temporary data

#### **Monitoring and Alerting**
Set up monitoring for:
- Agent health and connectivity
- Discovery success rates
- Diode server performance
- NetBox data ingestion rates

### **Security Considerations**

#### **Network Security**
- Use TLS/SSL for all communications
- Implement network segmentation
- Apply least-privilege access principles
- Regular security audits

#### **Credential Management**
- Never store credentials in configuration files
- Use environment variables for sensitive data
- Rotate credentials regularly
- Implement proper access controls

## Getting Help

If you encounter issues:

1. Search GitHub: [Issues](https://github.com/netboxlabs/orb-agent/issues)
2. Find us in Slack: [NetDev Community #netbox](https://netdev-community.slack.com/)
3. Check the logs:
   - NetBox Discovery agent logs: `docker logs <container-id>`
   - Diode server logs: `docker compose logs`
   - NetBox Diode plugin logs: Check NetBox logs and the `Ingestion Logs` view in the Diode plugin

## Next Steps

### **For Production Deployment**
1. **[Review Enterprise Prerequisites](#enterprise-prerequisites)** - Ensure all requirements are met
2. **[Plan Your Architecture](#enterprise-deployment-considerations)** - Design your deployment strategy
3. **[Configure Security](#security-considerations)** - Implement enterprise security measures
4. **[Set Up Monitoring](#monitoring-and-alerting)** - Implement operational monitoring

### **Support Resources**
- **[Diode Documentation](../netbox-extensions/diode/index.md)** - Advanced Diode configuration
- **[GitHub Issues](https://github.com/netboxlabs/orb-agent/issues)** - Report bugs and feature requests
- **[Community Support](https://netdev.chat/)** - Connect with the community on Slack

---

**Congratulations!** You now have NetBox Discovery running and ingesting network data into NetBox. The system will continue to discover and update your network infrastructure automatically based on your configured schedules. 