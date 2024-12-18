<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

## Download agent image
To run `orb-agent`, first pull the Docker image from [Docker Hub](https://hub.docker.com/r/netboxlabs/orb-agent):


```sh
docker pull netboxlabs/orb-agent:latest
```

## Agent configuration file
To run, the Orb agent requires a configuration file. This configuration file consists of three main sections: `config_manager`, `backends`, and `policies`.


### Config Manager
The `config_manager` section specifies how Orb agent should retrieve it's configuration information. The configuration manager is responsible for processing the configuration to retrieve policies and pass them to the appropriate backend.

```yaml
orb:
  config_manager:
    active: local
  ...
```

Currently, only the `local` manager is supported, which retrieves policies from the local configuration file passed to the agent.

### Backends
The `backends` section specifies what Orb agent backends should be enabled. Each Orb agent backend offers specific discovery or observability capabilities and may require specific configuration information.  

```yaml
orb:
  ...
  backends:
    network_discovery:
        ...
    device_discovery:
        ...
```
Only the `network_discovery` and `device_discovery` backends are currently supported. They do not require any special configuration. Refer to [Device Discovery](device_discovery.md) and [Network Discovery](network_discovery.md) for policy settings specific to each backend. 

#### Commons
A special `common` subsection under `backends` defines configuration settings that are shared with all backends. Currently, it supports passing [diode](https://github.com/netboxlabs/diode) server settings to all backends.

```yaml
  backends:
      ...
      common:
        diode:
            target: grpc://192.168.0.22:8080/diode
            api_key: ${DIODE_API_KEY}
            agent_name: agent01
```


### Policies
The `policies` section specifies what discovery policies should be passed to each backend. Policies define specific settings for discovery (such as scheduling and default properties) and the scope (targets). Backends can run multiple policies simultaneously, but for each backend all policies must have a unique name. These policies are defined in the `policies` section and are grouped under a subsection for each backend:

```yaml
orb:
    ...
    policies:
        device_discovery:
            device_policy_1:
                # see device_discovery section
        network_discovery:
            network_policy_1:
                # see network_discovery section
```

## Configuration examples
You can find complete sample configurations for [Device Discovery](device_discovery.md) and [Network Discovery](network_discovery.md) to configure and run Orb agent.

## Running the agent

To run `orb-agent`, use the following command from the directory where your created your agent configuration file (named `agent.yaml` here):

```sh
 docker run -v $(PWD):/opt/orb/ netboxlabs/orb-agent:latest run -c /opt/orb/agent.yaml
```