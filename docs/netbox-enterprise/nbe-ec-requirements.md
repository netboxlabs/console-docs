---
title: NetBox Enterprise Requirements
tags:
  - enterprise
  - netbox
  - kubernetes
  - authentication
  - administration
  - operations
  - installation
  - configuration
  - automation
  - networking
---

# NetBox Enterprise Requirements

### Host system requirements

#### Recommended

The following are the _recommended_ system requirements for a **production** deployment of NetBox Enterprise running two replicas. For larger environments with more replicas, additional resources should be allocated.

- 8 Virtual CPU (vCPU)
- 24 GB Memory (RAM)
- 100 GB SSD free disk space in `/var/lib`
- disable swap if enabled

!!! note
    For **non-production** deployments of NetBox Enterprise, the _minimum_ system requirements can be reduced to 4 Virtual CPU (vCPU) and 16 GB Memory (RAM). All other requirements remain the same.

### Host operating system

- Linux (Kernel versions 4.3 and above)

!!! note
    For **Red Hat Enterprise Linux (RHEL)** deployments please see additional requirements [here](./nbe-ec-requirements-rhel.md).

### Architecture

- x86-64

## Special Cases for Restricted Environments

In some restricted environments, you will need to take additional steps alongside the [basic installation instructions](./nbe-ec-installation.md).

### Traditional Proxies

As of version 1.6.0, NetBox Enterprise supports installing through proxies using the following configuration.

#### Proxy Configuration

Before you can install, you _must_ configure your proxy to allow the following hostnames:

* **app.enterprise.netboxlabs.com**
* **get.enterprise.netboxlabs.com**
* **proxy.enterprise.netboxlabs.com**
* **registry.enterprise.netboxlabs.com**
* **replicated.app**
* **proxy.replicated.com**
* ***.enterprise.netboxlabs.com**

They are required to access various resources used in the NetBox Enterprise installation.

#### Installation

Once you have configured your proxy to allow access to the NetBox Enterprise hosts, you will need to pass some additional arguments to the NetBox Enterprise installer when following the [basic installation instructions](./nbe-ec-installation.md).

!!! note
    NetBox Enterprise will _not_ inherit proxy settings from the shell environment, they must be explicitly provided on the installation command-line.

* `--http-proxy <proxy-url>` and `--https-proxy <proxy-url>`

    The proxy url should be a complete URL to reach the proxy. (eg, `http://myhost:8888`)

* `--no-proxy`

    By default, the installer will automatically disable proxying on the internal cluster addresses, as well as the default network interface on your host.

    In some cases, if the installer can't autodetect an interface or if you have a more complicated network, you may need to specify this manually.
    It should be in the form of a comma-separated list of addresses with CIDR netmasks (`1.2.3.4/32`), or domains (`foo.com`, `*.bar.com`).

### Man-In-The-Middle (MITM) Proxies

If you are using a MITM proxy (ie, one which uses an internal TLS certificate authority for communication with the proxy, rather than directly passing encrypted traffic), you will need an additional option:

* `--private-ca </path/to/private-ca-bundle>`

This will allow the cluster to accept traffic that has been encrypted using your internal CA.

### Firewalld

If you are using Firewalld (commonly found on RHEL installations), you will need to create a zone for the cluster before installing.

1. Determine any host IP addresses or networks (external or otherwise) that might need access to the cluster.
2. Create a file called `/etc/firewalld/zones/netbox-enterprise.xml` with the following contents:

3. ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <zone target="ACCEPT">
     <short>netbox-enterprise</short>
     <description>Zone for NetBox Enterprise communication</description>
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

4. In the spot where it says `<!-- HOST IP ADDRESSES GO HERE -->`, add a `<source />` tag for each host or network you want to allow.
   For example, if your external IP is `1.2.3.4`, and you also have a private class C network `192.168.123.0`, you would add two lines:

   ```xml
   <source address="1.2.3.4/32" />
   <source address="192.168.123.0/24" />
   ```

5. Run `sudo firewall-cmd --reload` to load the zone configuration.

Then you can follow the [basic installation instructions](./nbe-ec-installation.md) as normal.

### SELinux

There are two steps to installing with SELinux enabled with enforcement turned on.

First, before you install NetBox Enterprise, run:

```bash
sudo setenforce 0
```

This will temporarily disable SELinux enforcement until you explicitly reenable it or reboot.

Next, follow the [basic installation instructions](./nbe-ec-installation.md).

Finally, run the following commands to make sure your NetBox Enterprise installation is accessible with enforcement enabled:

```bash
export EC_DIR="/var/lib/embedded-cluster"
export KUBE_DIR="${EC_DIR}/k0s"

# tell SELinux the Cluster directory is owned by Containerd
sudo semanage fcontext -a -t container_var_lib_t "${EC_DIR}"
sudo restorecon -R -v "${EC_DIR}"

# additionally, binaries should be allowed to execute
sudo semanage fcontext -a -t container_runtime_exec_t "${KUBE_DIR}/bin/containerd.*"
sudo semanage fcontext -a -t container_runtime_exec_t "${KUBE_DIR}/bin/runc"
sudo restorecon -R -v "${KUBE_DIR}/bin"

# fix permissions for containerd and restrict some folders to read-only
sudo semanage fcontext -a -t container_var_lib_t "${KUBE_DIR}/containerd(/.*)?"
sudo semanage fcontext -a -t container_ro_file_t "${KUBE_DIR}/containerd/io.containerd.snapshotter.*/snapshots(/.*)?"
sudo restorecon -R -v ${KUBE_DIR}/containerd
```

You can then reboot, or run `sudo setenforce 1` to put your system back into a normal state.
