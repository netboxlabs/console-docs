<span class="pill pill-cloud">NetBox Cloud</span>
<span class="pill pill-enterprise">NetBox Enterprise</span>
<span class="pill pill-community">NetBox Community</span>

## Agent configuration file
To run, the NetBox Discovery agent requires a YAML configuration file. This configuration file consists of three main sections: `config_manager`, `backends`, and `policies`.


### Config Manager
The `config_manager` section specifies how NetBox Discovery agent should retrieve it's configuration information. The configuration manager is responsible for processing the configuration to retrieve policies and pass them to the appropriate backends.

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
Only the `network_discovery` and `device_discovery` backends are currently supported and they do not require any special configuration. Refer to [Device Discovery](device_discovery.md) and [Network Discovery](network_discovery.md) for policy settings specific to each backend. 

#### Commons
A special `common` subsection of `backends` defines configuration settings that are shared with all backends. Currently, it supports passing [diode](https://github.com/netboxlabs/diode) server settings to all backends.

```yaml
  backends:
      ...
      common:
        diode:
            target: grpc://${DIODE_IP_ADDRESS}:8080/diode
            client_id: ${DIODE_CLIENT_ID}
            client_secret: ${DIODE_CLIENT_SECRET}
            agent_name: ${AGENT_NAME}
```

**Authentication**: The NetBox Discovery agent uses OAuth2 client credentials for secure authentication with the Diode server. The `client_id` and `client_secret` are generated through the NetBox Diode plugin interface. For setup instructions, see the [getting started guide](get-started.md).

### Policies
The `policies` section specifies what discovery policies should be passed to each backend. Policies define specific settings for discovery (such as scheduling and default properties) and the scope (targets). Backends can run multiple policies simultaneously, but for each backend all policies must have a unique name. These policies are defined in the `policies` section and are grouped by backend:

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

## Configuration example
Here is a complete configuration example:

```yaml
orb:
  config_manager:
    active: local
  backends:
    network_discovery:
    common:
      diode:
        target: grpc://${DIODE_IP_ADDRESS}:8080/diode
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

You can find other example configurations for [Device Discovery](device_discovery.md) and [Network Discovery](network_discovery.md).