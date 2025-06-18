---
tags:
  - community
  - enterprise
---The Diode Agent is a lightweight **network device discovery** tool that uses [NAPALM](https://github.com/napalm-automation/napalm) to streamline data entry into NetBox through the Diode ingestion service. The following is a basic set of instructions to get started using Diode Agent on a local machine.

### Requirements

The Diode NAPALM Agent requires a Python runtime environment and has the following requirements:

- Diode service - see the [Get started](diode-get-started.md) guide
- Diode SDK - see the [Installing the Diode client SDK](diode-client.md) guide
- Python 3.10 or greater

### Install the agent

Clone the agent repository:
```bash
cd /opt
git clone https://github.com/netboxlabs/diode-agent.git
cd /opt/diode-agent/
```

Create a Python virtual environment and install the agent:
```bash
python3 -m venv venv
source venv/bin/activate
pip install /opt/diode-agent/diode-napalm-agent --no-cache-dir
```

### Create a discovery configuration file

The agent requires a configuration file to provide an inventory of devices to be discovered. A sample configuration file is provided with the agent. 

Create a copy of the sample configuration file:
```bash
cp /opt/diode-agent/diode-napalm-agent/config.sample.yaml /opt/diode-agent/config.yaml
```

Edit the `config.yaml` to suit the environment:

- The `config` section needs to be updated to reflect the Diode server environment 
- The `data` section should include a list of all devices (and their credentials) to be discovered

```yaml
diode:
  config:
    target: grpc://localhost:8081
    api_key: ${DIODE_API_KEY}
  policies:
    discovery_1:
      config:
        netbox:
          site: New York NY
      data:
        - hostname: 192.168.0.32
          username: ${USER}
          password: admin
        - driver: eos
          hostname: 127.0.0.1
          username: admin
          password: ${ARISTA_PASSWORD}
          optional_args:
            enable_password: ${ARISTA_PASSWORD}
```

!!! tip
    Variables (using `${ENV}` syntax) can be referenced in the configuration file from environmental variables or from a provided `.env` file.

!!! tip
    The `driver` device attribute is optional. If not specified, the agent will attempt to find a match from NAPALM supported drivers.

!!! note
    Detailed information about `optional_args` can be found in the NAPALM [documentation](https://napalm.readthedocs.io/en/latest/support/#optional-arguments).

#### Supported network device drivers

The default supported drivers are the natively supported [NAPALM](https://napalm.readthedocs.io/en/latest/#supported-network-operating-systems) drivers:

- Arista EOS ("eos")
- Cisco IOS ("ios")
- Cisco IOS-XR ("iosxr")
- Cisco NX-OS ("nxos")
- Juniper JunOS ("junos")

### Run the agent

The agent must be run in the Python virtual environment created earlier. To run the agent with the discovery configuration file:
```bash
diode-napalm-agent -c config.yaml
```

### Verify

The Diode agent is successfully installed if the command `diode-napalm-agent` returns:
```{.bash .no-copy}
usage: diode-napalm-agent [-h] [-V] -c config.yaml [-e .env] [-w N]

Diode Agent for NAPALM

options:
  -h, --help            show this help message and exit
  -V, --version         Display Diode Agent, NAPALM and Diode SDK versions
  -c config.yaml, --config config.yaml
                        Agent yaml configuration file
  -e .env, --env .env   File containing environment variables
  -w N, --workers N     Number of workers to be used
```


