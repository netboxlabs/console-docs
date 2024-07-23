### Requirements

The Diode server requires a Docker environment (and `docker compose`), version 27.0.3 or above.

### Configure the Diode server

The Diode server is configured using a configuration file and an environment file:

* `docker-compose.yml` - configures and run the Diode server docker containers
* `.env` - stores the specific environmental settings for the environmnet

In a clean directory:

```bash
mkdir /opt/diode
cd /opt/diode
```

Download the default `docker-compose.yml` and `.env` files from the Diode project repository:

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/netboxlabs/diode/develop/diode-server/docker/docker-compose.yaml
curl -o .env https://raw.githubusercontent.com/netboxlabs/diode/develop/diode-server/docker/sample.env
```

Edit the `.env` to match the environment:

* `NETBOX_DIODE_PLUGIN_API_BASE_URL`: URL for NetBox, appended with `/api/plugins/diode`
* `DIODE_TO_NETBOX_API_KEY`: API key from Diode plugin installation
* `DIODE_API_KEY`: API key from Diode plugin installation
* `NETBOX_TO_DIODE_API_KEY`: API key from Diode plugin installation

### Run the Diode server

From the `/opt/diode` directory, download and run the Diode server containers:

```bash
docker compose up -d
```

### Verify

The Diode server is successfully configured and running if the command `docker compose ps` returns the following four containers with a `STATUS` of `Up`:

```bash
docker compose ps
```
```{.bash .no-copy}
NAME                       IMAGE                                STATUS
diode-diode-ingester-1     netboxlabs/diode-ingester:latest     Up 
diode-diode-reconciler-1   netboxlabs/diode-reconciler:latest   Up 
diode-diode-redis-1        redis/redis-stack-server:latest      Up 
diode-ingress-nginx-1      nginx:latest                         Up 
```

## Next step

The next step is to [install the Diode client](diode-client.md)