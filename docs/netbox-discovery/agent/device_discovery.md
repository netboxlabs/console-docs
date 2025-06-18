---
title: Device Discovery
tags:
  - cloud
  - enterprise
  - community
---

# Device Discovery

The device discovery backend is a core component of NetBox Discovery that automatically connects to network devices to collect configuration data, interface information, and operational state. Built on the industry-standard [NAPALM](https://napalm.readthedocs.io/en/latest/index.html) library, it provides consistent multi-vendor support across diverse network infrastructures.

## Overview

Device discovery enables automated collection of:

- **Device Information**: Hardware details, software versions, and system configuration
- **Interface Data**: Physical and logical interface configurations, status, and addressing
- **IP Addressing**: Interface IP assignments, VLAN configurations, and routing information
- **Operational State**: Real-time device status for drift detection and compliance monitoring

This data flows seamlessly into NetBox through the Diode ingestion service, maintaining accurate network documentation and enabling operational drift detection when used with NetBox Assurance.

## Use Cases

### Day 1 Operations: Initial Network Documentation
- **Device Inventory**: Automatically discover and document existing network infrastructure
- **Configuration Baseline**: Capture current device configurations as the initial source of truth
- **Interface Mapping**: Document physical and logical network connectivity
- **IP Address Management**: Populate NetBox with existing IP address assignments

### Day 1.5 Operations: Data Quality Improvement  
- **Gap Analysis**: Identify devices not yet documented in NetBox
- **Data Enrichment**: Enhance existing NetBox records with detailed configuration data
- **Standardization**: Normalize device information across different vendors and models
- **Validation**: Verify and correct existing NetBox documentation against actual device state

### Day 2 Operations: Continuous Monitoring
- **Configuration Drift Detection**: Identify when device configurations deviate from documented intent
- **Compliance Monitoring**: Ensure devices maintain required configuration standards
- **Change Validation**: Verify that planned changes are properly implemented
- **Operational Assurance**: Support NetBox Assurance workflows for maintaining network control

## Supported Platforms

Device discovery leverages NAPALM's extensive platform support, including:

- **Cisco**: IOS, IOS-XE, IOS-XR, NX-OS
- **Juniper**: Junos
- **Arista**: EOS  
- **HPE/Aruba**: ArubaOS
- **VyOS**: VyOS
- **Fortinet**: FortiOS
- **Custom Drivers**: Support for community and proprietary NAPALM drivers

## Configuration
The `device_discovery` backend does not require any special configuration, though overriding `host` and `port` values can be specified. The backend will use the `diode` settings specified in the `common` subsection to forward discovery results.

```yaml
orb:
  backends:
    common:
      diode:
        target: grpc://192.168.0.100:8080/diode
        api_key: ${DIODE_API_KEY}
        agent_name: agent01
    device_discovery:
      host: 192.168.5.11 # default 0.0.0.0
      port: 8857 # default 8072
```

## Policy Configuration
Device discovery policies are broken down into two subsections: `config` and `scope`. 

### Config Section
Config defines data for the whole scope and is optional overall.

| Parameter | Type | Required | Description |
|:---------:|:----:|:--------:|:-----------:|
| schedule | cron format | no  |  If defined, it will execute scope following cron schedule time. If not defined, it will execute scope only once  |
| defaults | map | no  |  key value pair that defines default values  |

#### Defaults
Current supported defaults:

|  Key  |  Description  |
|:-----:|:-------------:|
| site  |  NetBox Site Name |

### Scope Section
The scope defines a list of devices that can be accessed and pulled data. 

| Parameter | Type | Required | Description |
|:---------:|:----:|:--------:|:-----------:|
| hostname | string | yes  | Device hostname or IP address |
| username | string | yes  | Device username  |
| password | string | yes  | Device username's password |
| optional_args | map | no  | NAPALM optional arguments defined [here](https://napalm.readthedocs.io/en/latest/support/#list-of-supported-optional-arguments) |
| driver | string | no  |  If defined, try to connect to device using the specified NAPALM driver. If not, it will try all the current installed drivers |

### Policy Example
An example of the policy section, including all parameters supported by the device discovery backend:
```yaml
orb:
  ...
  policies:
    device_discovery:
      discovery_1:
        config:
          schedule: "0 */6 * * *"  # Every 6 hours
          defaults:
            site: New York NY
        scope:
          - driver: ios
            hostname: 192.168.0.5
            username: admin
            password: ${PASS}
            optional_args:
               canonical_int: True
          - hostname: myhost.com
            username: remote
            password: 12345
```

## Complete Configuration Example
This sample configuration file demonstrates the device discovery backend connecting to a Cisco router at 192.168.0.5. It retrieves device, interface, and IP information, then sends the data to a [diode](https://github.com/netboxlabs/diode) server running at 192.168.0.100.

```yaml
orb:
  config_manager: 
    active: local
  backends:
    device_discovery:
    common:
      diode:
        target: grpc://192.168.0.100:8080/diode
        api_key: ${DIODE_API_KEY}
        agent_name: agent01
  policies:
    device_discovery:
      discovery_1:
        config:
          schedule: "0 */6 * * *"  # Run every 6 hours
          defaults:
            site: New York NY
        scope:
          - driver: ios
            hostname: 192.168.0.5
            username: admin
            password: ${PASS}
```

### Running the Agent
```sh
 docker run -v /local/orb:/opt/orb/ \
 -e DIODE_API_KEY={YOUR_API_KEY} \
 -e PASS={DEVICE_PASSWORD} \
 netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

## Custom Device Drivers
To specify community or custom NAPALM drivers, use the environment variable `INSTALL_DRIVERS_PATH`. Ensure that the required files are placed in the mounted volume (`/opt/orb`).

### Example Directory Structure
```sh
/local/orb/
├── agent.yaml
├── drivers.txt
├── napalm-mos/
└── napalm-ros-0.3.2.tar.gz
```

### Example `drivers.txt`
```txt
napalm-sros==1.0.2 # try install from pypi
napalm-ros-0.3.2.tar.gz # try install from a tar.gz
./napalm-mos # try to install from a folder that contains project.toml
```

### Running with Custom Drivers
```sh
 docker run -v /local/orb:/opt/orb/ \
 -e DIODE_API_KEY={YOUR_API_KEY} \
 -e PASS={DEVICE_PASSWORD} \
 -e INSTALL_DRIVERS_PATH=/opt/orb/drivers.txt \
 netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```
The relative path used by `pip install` should point to the directory containing the `.txt` file.

## Integration with NetBox Assurance

When used with NetBox Assurance, device discovery provides the operational data needed for drift detection:

1. **Baseline Establishment**: Initial discovery creates the documented "intent" in NetBox
2. **Continuous Collection**: Regular discovery updates provide the "operational state" data
3. **Drift Detection**: NetBox Assurance compares intent vs. operational state to identify deviations
4. **Remediation Workflows**: Teams can investigate and correct identified configuration drift

This integration ensures that your network's documented configuration always reflects reality, enabling proactive management and rapid response to unauthorized changes.

## Security Considerations

- **Credential Management**: Use environment variables for sensitive information
- **Network Access**: Ensure discovery agents have appropriate network access to target devices
- **Authentication**: Support for various authentication methods via NAPALM optional arguments
- **Audit Logging**: All discovery activities are logged for security and compliance purposes

## Next Steps

- **Configuration**: Review [configuration file format](configuration-file.md) for advanced options
- **Network Discovery**: Combine with [network discovery](network_discovery.md) for comprehensive coverage
- **Getting Started**: Follow the [getting started guide](get-started.md) for step-by-step setup
- **NetBox Assurance**: Learn about [operational drift detection](../../netbox-assurance/index.md)