!!! info
    The following instructions assume you have installed NetBox in the `/opt/netbox` directory. Adjust instructions as necessary if you've installed NetBox in a different directory. 

### Install the plugin

Source the NetBox Python virtual environment:

```shell
cd /opt/netbox
source venv/bin/activate
```

Install the plugin in the Python virtual environment:

```bash
pip install netboxlabs-diode-netbox-plugin
```

### Configure NetBox

Edit the NetBox `configuration.py` file and add the `netbox_diode_plugin` to the `PLUGINS` list. The default location for this file is `/opt/netbox/netbox/netbox/configuration.py`.

```python
PLUGINS = [
    "netbox_diode_plugin",
]
```

Restart NetBox to load the plugin:

```
sudo systemctl restart netbox netbox-rq
```

### Configure the plugin

Diode requires three API keys that must be passed as environment variables to function. These API keys are random 40 character long alphanumeric strings and can be generated and set to the appropriate environment variables with the following commands:

```shell
# API key for the Diode service to interact with NetBox
export DIODE_TO_NETBOX_API_KEY=$(head -c20 </dev/urandom|xxd -p); env | grep DIODE_TO_NETBOX_API_KEY
# API key for the NetBox service to interact with Diode
export NETBOX_TO_DIODE_API_KEY=$(head -c20 </dev/urandom|xxd -p); env | grep NETBOX_TO_DIODE_API_KEY
# API key for Diode SDKs to ingest data into Diode
export INGESTION_API_KEY=$(head -c20 </dev/urandom|xxd -p); env | grep INGESTION_API_KEY
```

!!! warning

    Store the API key strings in a safe place as they will be needed to configure the Diode server

Configure the plugin to use the generated API keys:

```shell
cd /opt/netbox/netbox
./manage.py configurediodeplugin
```

### Verify

The plugin is successfully installed and configured:

- The NetBox Labs DIODE plugin is visible in the right-hand navigation bar
- Three NetBox users and three corresponding API keys have been created:
    - `INGESTION`
    - `DIODE_TO_NETBOX`
    - `NETBOX_TO_DIODE`

## Next step

The next step is to [configure and run the Diode server](diode-server.md)