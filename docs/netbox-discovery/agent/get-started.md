---
tags:
  - cloud
  - enterprise
  - community
  - discovery
  - api
  - installation
  - getting-started
  - networking
  - integration
title: Get Started
---

## Before getting started
You'll need the following to successfully run the NetBox Discovery agent end-to-end:

- **NetBox**: a running instance of [NetBox](https://github.com/netbox-community/netbox).
- **Diode plugin**: NetBox Diode [plugin](https://github.com/netboxlabs/diode-netbox-plugin) installed in your NetBox instance.
- **Diode**: a running instance of [Diode](https://github.com/netboxlabs/diode/tree/develop/diode-server#readme).

## Download agent image
First pull the Docker image from [Docker Hub](https://hub.docker.com/r/netboxlabs/orb-agent):

```sh
docker pull netboxlabs/orb-agent:latest
```

NetBox Discovery is based on the Orb open source project, hence the `orb-agent` image name.

## Create an agent configuration file
The NetBox Discovery agent requires a configuration, specifying what discovery tasks you'd like it to accomplish. Here's a sample configuration:

```yaml
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    common:
      diode:
        target: grpc://<DIODE_IP_ADDRESS>:8080/diode
        api_key: ${DIODE_API_KEY}
        agent_name: agent1
  policies:
    network_discovery:
      policy_1:
        scope:
          targets:
            - 192.168.1.10-20
```

Copy the configuration to a file (named `agent.yaml` for these instructions). Edit the file as necessary to match your environment:

- Replace `<DIODE_IP_ADDRESS>` with the IP address or hostname of your Diode server
- Edit and add `targets` relevant to your environment (they can expressed as a mix of ranges, network prefixes with mask, IP addresses or domain names)

You can find more complete examples for [Device Discovery](device_discovery.md) and [Network Discovery](network_discovery.md).

## Run the agent
Run the agent from the same directory where you created your agent configuration file (`agent.yaml`):

```sh
 docker run -v $(PWD):/opt/orb/ \
   -e DIODE_API_KEY=<api_key>   \
   netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```

Replace `<api_key>` with the actual Diode API key you used in configuring your Diode server.

## View the output
You can view output from the running agent:

- Agent Docker container logs (displayed in the terminal)
- Diode server Docker container logs (`docker logs diode-diode-reconciler-1`)
- `Ingestion Logs` view in Netbox Diode plugin
