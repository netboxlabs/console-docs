# NetBox Enterprise Embedded Cluster Installation

## Conventional Installation

You should be able to follow these instructions for installing the Embedded Cluster in most environments.
If you are in a more restrictive environment, see the [Advanced Installation](#advanced-installation) section below.

### Deploying the cluster

The following steps are required for an Embedded Cluster (EC) installation of NetBox Enterprise.

1. Download the deployment package and license file to your host (the `Authorization` token should be provided by NetBox Labs):

   ```
   curl https://replicated.app/embedded/netbox-enterprise/stable -H "Authorization: <provided by NetBox Labs>" -o netbox-enterprise-stable.tgz
   ```
2. Uncompress the package and launch the installation:

   ```
   tar -xvzf netbox-enterprise-stable.tgz
   sudo ./netbox-enterprise install --license license.yaml
   ```

   You’ll be requested to create a password for the NetBox Enterprise admin console. A Kubernetes cluster will then be deployed, ready to host all the NetBox application components. The deployment of the cluster is complete with this message:

   ```{.bash .no-copy} 
   Visit the Admin Console to configure and install netbox-enterprise: http://my.netbox-enterprise.host:30000
   ```

### Deploying NetBox

Access the NetBox Enterprise admin console and configure NetBox.

Open the provided URL in a browser. A prompt will require the password created in Step 2:

![Admin Console](../images/netbox-enterprise/admin-console.png){ width="50%" }

A wizard will guide the configuration of NetBox for the environment:

![NetBox Configuration](../images/netbox-enterprise/configure-netbox-enterprise.png)

Configuration information includes:

- Built-in or external PostgreSQL:
  ![Built-in or external PostgreSQL](../images/netbox-enterprise/netbox-enterprise-postgres.png)

- Built-in or external S3-Compatible object store:
  ![Built-in or external S3](../images/netbox-enterprise/netbox-enterprise-s3.png)

- Built-in or external Redis object store:
  ![Built-in or external Redis](../images/netbox-enterprise/netbox-enterprise-redis.png)

- Advanced settings to configure plugins and SSO remote authentication, and IPv4/IPv6 compatibility:
  ![Advanced Settings](../images/netbox-enterprise/netbox-enterprise-advanced.png)

Finally, accept the terms of service by writing "ACCEPT" (case-insensitive) and you can proceed to the deployment.

![Accept TOS](../images/netbox-enterprise/netbox-enterprise-accept-tos.png)

### Finish the Deployment

Once you have accepted the terms of service and continued on to the main admin console, deployment will start.
The first deployment will take some time, as it brings up all subsystems and runs migrations to initialize the database.

![Deployment Started](../images/netbox-enterprise/netbox-enterprise-deploy.png)

The `Unavailable` status will change to `Ready` once the deployment is complete and NetBox has fully initialized:

![Deployment Ready](../images/netbox-enterprise/netbox-enterprise-ready.png)

### Verify the Deployment

Once you see `Ready`, NetBox Enterprise is fully deployed, and available on ports `80` and `443`.

- ![NetBox Enterprise Login](../images/netbox-enterprise/netbox-enterprise-login.png)
- ![NetBox Enterprise Home](../images/netbox-enterprise/netbox-enterprise-app-home.png)

## Advanced Installation

### Proxies

If you are installing in a restrictive environment, you may have to provide extra configuration at install-time.
NetBox Enterprise as of version 1.6.0 has support for installing through proxies using the following configuration.

#### Proxy Configuration

Before you can install, you _must_ configure your proxy to allow the following hostnames:

* **app.enterprise.netboxlabs.com**
* **get.enterprise.netboxlabs.com**
* **proxy.enterprise.netboxlabs.com**
* **registry.enterprise.netboxlabs.com**

They are required to access various parts of the Enmbedded Cluster and NetBox Enterprise installation resources.

Additionally, you _may_ also want to configure a few more hosts:

* **api.netbox.oss.netboxlabs.com** - used to query an API for information on NetBox plugins
* **census.netbox.oss.netboxlabs.com** - used to collect anonymized data about your NetBox version. For details, see [the NetBox documentation](https://netboxlabs.com/docs/netbox/en/stable/configuration/miscellaneous/#census_reporting_enabled).

#### Installation

Once you have configured your proxy to allow access to the NetBox Enterprise hosts, you will need to pass some additional arguments to the Embedded Cluster installer.
Note that the Embedded Cluster will _not_ inherit proxy settings from the shell environment.

* `--http-proxy <proxy-url>`
  
  The proxy url should be a complete URL to reach the proxy. (eg, `http://myhost:8888`)
* `--https-proxy <proxy-url>`

  Like `--http-proxy`, this should be the proxy's URL.
* `--no-proxy`

  By default, the Embedded Cluster will automatically disable proxying on the internal cluster addresses, as well as the default network interface on your host.
  
  In some cases, if it can't autodetect an interface or you have a more complicated network, you may need to specify this manually in the form of a comma-separated list of addresses with CIDR netmasks (`1.2.3.4/32`), or domains (`foo.com`, `*.bar.com`).

#### Man-In-The-Middle (MITM) Proxies

If you are using a MITM proxy (ie, one which uses an internal TLS certificate authority for communication with the proxy, rather than directly passing encrypted traffic), you will need an additional option:

* `--private-ca </path/to/private-ca-bundle>`

This will allow the Embedded Cluster to accept traffic that has been encrypted using your internal CA.

### Firewalld

If you are using Firewalld (commonly found on RHEL installations, among others), you will need to create a zone for the cluster before installing.

1. Determine any host IP addresses or networks (external or otherwise) that might need access to the cluster.
2. Create a file called `/etc/firewalld/zones/embedded-cluster.xml` with the following contents:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <zone target="ACCEPT">
     <short>embedded-cluster</short>
     <description>Zone for Embedded Cluster communication</description>
     <!-- HOST IP ADDRESSES GO HERE -->
     <source address="10.244.0.0/17"/>
     <source address="10.244.128.0/17"/>
     <port protocol="tcp" port="2380"/>
     <port protocol="udp" port="4789"/>
     <port protocol="tcp" port="6443"/>
     <port protocol="tcp" port="7443"/>
     <port protocol="tcp" port="9091"/>
     <port protocol="tcp" port="9443"/>
     <port protocol="tcp" port="10249"/>
     <port protocol="tcp" port="10250"/>
     <port protocol="tcp" port="10256"/>
     <port protocol="tcp" port="30000"/>
     <port protocol="tcp" port="22"/>
   </zone>
   ```
3. In the spot where it says `<!-- HOST IP ADDRESSES GO HERE -->`, add a `<source />` tag for each host or network you want to allow.
   For example, if your external IP is `1.2.3.4`, and you also have a private class C network `192.168.123.0`, you would add two lines:
   ```xml
   <source address="1.2.3.4/32" />
   <source address="192.168.123.0/24" />
   ```
4. Run `sudo firewall-cmd --reload` to load the zone configuration.

### SELinux

There are two steps to installing with SELinux enabled with enforcement turned on.

First, before you install the Embedded Cluster, run:
```bash
setenforce 0
```

...this will temporarily disable SELinux enforcement until you reenable it, or reboot.

Next, follow the normal instructions for [Conventional Installation](#conventional-installation) above.

Finally, run the following commands to make sure your Embedded Cluster installation is accessible with enforcement enabled:

```bash
export EC_DIR="/var/lib/embedded-cluster"
export KUBE_DIR="${EC_DIR}/k0s"

sudo semanage fcontext -a -t container_var_lib_t "${EC_DIR}"
sudo restorecon -R -v "${EC_DIR}"

sudo semanage fcontext -a -t container_runtime_exec_t "${KUBE_DIR}/bin/containerd.*"
sudo semanage fcontext -a -t container_runtime_exec_t "${KUBE_DIR}/bin/runc"
sudo restorecon -R -v "${KUBE_DIR}/bin"

sudo semanage fcontext -a -t container_var_lib_t "${KUBE_DIR}/containerd(/.*)?"
sudo semanage fcontext -a -t container_ro_file_t "${KUBE_DIR}/containerd/io.containerd.snapshotter.*/snapshots(/.*)?"
sudo restorecon -R -v ${KUBE_DIR}/containerd
```
