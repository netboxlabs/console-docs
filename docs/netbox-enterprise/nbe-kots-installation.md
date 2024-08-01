# NetBox Enterprise KOTS Installation

### Kubernetes dependencies

Ensure you have the following Kubernetes dependencies installed. Please refer to the instructions for your operating system to install them.

- **kubectl**: general tool for interacting with Kubernetes clusters
- **helm**: a "package manager" for Kubernetes

### Install KOTS

KOTS is a kubectl plugin and admin console to help manage Kubernetes Off-The-Shelf software from one or more Helm charts. To install, run the following command:

```bash
curl https://kots.io/install | bash
```

### Install the NetBox Enterprise Helm chart

Install the chart into the cluster:
```bash
kubectl kots install netbox-enterprise
```

You will be prompted to create a namespace to deploy to:
```{.txt .no-copy}
Enter the namespace to deploy to:
```

You will also be prompted to create a password for the Admin Console:
```{.txt .no-copy}
Enter a new password for the admin console (6+ characters):
```

The helm chart was successfully installed when you see this:
```{.txt .no-copy}
  • Deploying Admin Console
    • Creating namespace ✓
    • Waiting for datastore to be ready ✓
  • Waiting for Admin Console to be ready ✓

  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console
```

### Deploy NetBox

#### Connect to the Admin Console

Access the NetBox Enterprise Admin Console by opening the provided URL in a browser.

!!! Tip
    If you are connecting to the cluster over the network, you might need to configure port forwarding to connect to the Admin Console: `kubectl port-forward -n <namespace> svc/kotsadm --address 0.0.0.0  3000:3000`


Once connected, you will be prompted for the password you created earlier:

<img src="/images/netbox-enterprise/admin-console.png" alt="enterprise-admin-console" width="500"/>

You will then be prompted to provide your license file. Your license file should have been provided to you by NetBox Labs.

<img src="/images/netbox-enterprise/netbox-enterprise-upload-license.png" alt="enterprise-upload-license" width="500"/>

#### Configure NetBox

A wizard will now guide you through the configuration of NetBox for the environment:

<img src="/images/netbox-enterprise/configure-netbox-enterprise.png" alt="configure-netbox-enterprise" width="500"/>

Required configuration information includes:

- Version of NetBox to deploy:

<img src="/images/netbox-enterprise/netbox-enterprise-version.png" alt="netbox-enterprise-version" width="500"/>

- Built-in or external PostgreSQL:

<img src="/images/netbox-enterprise/netbox-enterprise-postgres.png" alt="netbox-enterprise-postgres" width="500"/>

- Built-in or external S3-Compatible object store:

<img src="/images/netbox-enterprise/netbox-enterprise-s3.png" alt="etbox-enterpise-storage" width="500"/>

- Advanced settings to configure plugins and SSO remote authentication:

<img src="/images/netbox-enterprise/netbox-enterprise-overides.png" alt="netbox-enterprise-overides" width="500"/>

The deployment of NetBox Enterprise will then proceed:

<img src="/images/netbox-enterprise/netbox-enterprise-deploy.png" alt="netbox-enterprise-deploy" width="500"/>

The `Unavailable` status will change to `Ready` once the deployment is complete and NetBox has fully initialized:

<img src="/images/netbox-enterprise/netbox-enterprise-ready.png" alt="netbox-enterprise-ready" width="500"/>

### Verify

NetBox Enterprise should now be fully deployed.

<img src="/images/netbox-enterprise/netbox-enterprise-login.png" alt="netbox-enterprise-login" width="300"/>

<img src="/images/netbox-enterprise/netbox-enterprise-app-home.png" alt="netbox-enterprise-home" width="500"/>
