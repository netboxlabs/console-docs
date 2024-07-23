The Diode SDK is a Python library for sending data to the Diode server over gRPC/protbuf for ingestion in to NetBox.

### Requirements 

The Diode SDK requires Python version 3.10 or greater.

### Install the Diode SDK

Create a virtual environment and activate it:

```bash
python3 -m venv venv
source venv/bin/activate
```

Upgrade pip:

```
python3 -m pip install --upgrade pip
```

Install the SDK package:

```bash
pip install netboxlabs-diode-sdk
```

### Configure the client

Set the following environment variable with the `DIODE_API_KEY` API key from the plugin installation:

```bash
export DIODE_API_KEY=<API key from Diode plugin installation>
```

### Verify

The Diode client is successfully installed if the `pip freeze` command returns:

```bash
pip freeze | grep diode
```
```{.bash .no-copy}
netboxlabs-diode-sdk==0.1.0
```

## Next step

The next step is to explore and download [example Diode scripts](https://github.com/netboxlabs/netbox-learning/tree/develop/diode) or to install and run the [Diode discovery agent](diode-agent.md).
