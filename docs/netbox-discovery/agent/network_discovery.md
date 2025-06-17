---
title: Network Discovery
tags:
  - netbox-cloud
  - netbox-enterprise
  - netbox-community
---# Network Discovery

The network discovery backend is a powerful component of NetBox Discovery that performs active network scanning to discover IP addresses, detect network topology, and maintain accurate IP address management (IPAM) data. Built on the industry-standard [NMAP](https://nmap.org/) scanning engine, it provides comprehensive network visibility and automated IP inventory management.

## Overview

Network discovery enables automated collection of:

- **IP Address Inventory**: Active IP addresses and their operational status
- **Network Topology**: Subnets, VLANs, and network segment mapping  
- **Service Detection**: Open ports and running services on discovered hosts
- **DNS Resolution**: Forward and reverse DNS lookups for complete address documentation
- **MAC Address Mapping**: Physical address information where available

This data flows seamlessly into NetBox through the Diode ingestion service, maintaining accurate IP address management and enabling operational drift detection when used with NetBox Assurance.

## Use Cases

### Day 1 Operations: Initial Network Mapping
- **IP Inventory**: Rapidly discover and document all active IP addresses in your network
- **Subnet Documentation**: Identify active subnets and their utilization patterns
- **Network Planning**: Establish baseline IP usage for capacity planning and allocation
- **Service Discovery**: Document running services and open ports for security analysis

### Day 1.5 Operations: IPAM Data Quality  
- **Gap Analysis**: Identify IP addresses not yet documented in NetBox IPAM
- **Conflict Detection**: Discover duplicate or conflicting IP address assignments
- **Utilization Tracking**: Monitor actual IP address usage vs. documented allocations
- **DNS Validation**: Verify DNS records match actual network configuration

### Day 2 Operations: Continuous IP Management
- **Address Lifecycle Management**: Track IP address allocation, utilization, and deallocation
- **Compliance Monitoring**: Ensure IP address usage follows organizational policies
- **Change Detection**: Identify unauthorized IP address assignments or network changes
- **Capacity Planning**: Monitor IP address pool utilization and predict exhaustion

## Scanning Capabilities

Network discovery leverages NMAP's advanced scanning techniques:

- **Host Discovery**: ICMP echo, TCP SYN, and UDP probe techniques
- **Port Scanning**: Configurable port ranges and service detection
- **OS Fingerprinting**: Operating system identification where possible
- **Service Version Detection**: Application and service version information
- **Stealth Scanning**: Low-impact scanning options for sensitive environments

## Configuration
The `network_discovery` backend does not require any special configuration, though overriding `host` and `port` values can be specified. The backend will use the `diode` settings specified in the `common` subsection to forward discovery results.


```yaml
orb:
  backends:
    common:
      diode:
        target: grpc://192.168.0.100:8080/diode
        api_key: ${DIODE_API_KEY}
        agent_name: agent01
    network_discovery:
      host: 192.168.5.11 # default 0.0.0.0
      port: 8863 # default 8072
      log_level: ERROR # default INFO
      log_format: JSON # default TEXT

```

## Policy Configuration
Network discovery policies are broken down into two subsections: `config` and `scope`.

### Config Section
Config defines data for the whole scope and is optional overall.

| Parameter | Type | Required | Description |
|:---------:|:----:|:--------:|:-----------:|
| schedule | cron format | no  |  If defined, it will execute scope following cron schedule time. If not defined, it will execute scope only once  |
| defaults | map | no  |  key value pair that defines default values  |
| timeout | int | no | Timeout in minutes for the nmap scan operation. The default value is 2 minutes.

#### Defaults
Current supported defaults:

|  Key  |  Description  |
|:-----:|:-------------:|
| comments  |  NetBox Comments information to be added to discovered IP |
| description  |  NetBox Description data to be added to discovered IP |

### Scope Section
The scope defines a list of targets to be scanned.

| Parameter | Type | Required | Description |
|:---------:|:----:|:--------:|:-----------:|
| targets | list | yes  | The targets that NMAP will scan. These can be specified as IP addresses (192.168.1.1), IP ranges (192.168.1.10-20), IP subnets with mask (192.168.1.0/24) or resolvable domain names. |

### Policy Example
An example of the policy section, including all parameters supported by the network discovery backend.
```yaml
orb:
  ...
  policies:
    network_discovery:
      discovery_1:
        config:
          schedule: "0 */4 * * *"  # Every 4 hours
          timeout: 10  # 10 minute timeout for large networks
          defaults:
            comments: Discovered by network scanning
            description: IP discovered by NetBox Discovery
        scope:
          targets: 
            - 192.168.7.32
            - 192.168.7.30-40 # IP range
            - 192.168.7.0/24 # IP subnet
            - google.com # dns lookup

```

## Complete Configuration Example
This sample configuration file demonstrates the network discovery backend scanning the 192.168.1.0/24 network and the resolved IP address associated with `google.com`. It generates IP address information and sends the data to a [diode](https://github.com/netboxlabs/diode) server running at 192.168.0.100.

```yaml
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    common:
      diode:
        target: grpc://192.168.0.100:8080/diode
        api_key: ${DIODE_API_KEY}
        agent_name: agent02
  policies:
    network_discovery:
      policy_1:
        config:
          schedule: "0 */4 * * *"  # Run every 4 hours
          timeout: 10
        scope:
          targets: [192.168.1.0/24, google.com]
```

### Running the Agent
```sh
 docker run -v /local/orb:/opt/orb/ \
 -e DIODE_API_KEY={YOUR_API_KEY} \
 netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

## Advanced Scanning Options

### Target Specification
Network discovery supports flexible target specification:

- **Single IPs**: `192.168.1.100`
- **IP Ranges**: `192.168.1.10-50` or `192.168.1.100-192.168.1.200`
- **CIDR Subnets**: `192.168.1.0/24` or `10.0.0.0/16`
- **Hostnames**: `server.company.com`
- **Mixed Lists**: Combine any of the above in a single targets list

### Scheduling Considerations
- **High-Frequency Scanning**: Use shorter intervals (hourly) for critical networks requiring real-time IPAM
- **Standard Monitoring**: 4-6 hour intervals balance discovery freshness with network impact
- **Low-Impact Scanning**: Daily or weekly scans for stable networks or compliance reporting

## Integration with NetBox Assurance

When used with NetBox Assurance, network discovery provides critical IPAM data for drift detection:

1. **IP Address Baseline**: Initial scanning establishes documented IP address allocations
2. **Continuous Monitoring**: Regular scans detect new, changed, or removed IP assignments
3. **Drift Detection**: NetBox Assurance identifies when actual IP usage deviates from documented plans
4. **IPAM Compliance**: Automated detection of unauthorized IP address usage or allocation violations

This integration ensures that your IP address management remains accurate and compliant, enabling proactive management of network addressing and rapid response to unauthorized changes.

## Performance and Security

### Performance Optimization
- **Timeout Configuration**: Adjust scan timeouts based on network size and responsiveness
- **Target Segmentation**: Split large networks into smaller scan targets for parallel processing
- **Scheduling**: Distribute scan times to avoid network congestion
- **Resource Limits**: Configure agent resource limits for containerized deployments

### Security Considerations
- **Network Access**: Ensure discovery agents have appropriate network access to target ranges
- **Scanning Impact**: Monitor network utilization during scans and adjust timing as needed
- **Credential Requirements**: Network discovery typically requires no device credentials
- **Audit Logging**: All scanning activities are logged for security and compliance purposes
- **Stealth Options**: Use NMAP stealth scanning options in sensitive environments

## Troubleshooting

### Common Issues
- **Timeout Errors**: Increase timeout values for large networks or slow-responding hosts
- **Access Denied**: Verify network ACLs allow ICMP and TCP probes from agent locations
- **Missing Results**: Check firewall rules and network routing between agents and targets
- **Performance Issues**: Reduce scan scope or increase timeout values for better reliability

### Diagnostic Commands
```sh
# Test connectivity from agent to target
docker exec -it <agent_container> ping <target_ip>

# Verify NMAP functionality
docker exec -it <agent_container> nmap -sn <target_range>

# Check agent logs
docker logs <agent_container>
```

## Next Steps

- **Configuration**: Review [configuration file format](configuration-file.md) for advanced options
- **Device Discovery**: Combine with [device discovery](device_discovery.md) for comprehensive coverage  
- **Getting Started**: Follow the [getting started guide](get-started.md) for step-by-step setup
- **NetBox Assurance**: Learn about [operational drift detection](../../netbox-assurance/index.md)

