---
title: NetBox Enterprise KOTS Installation
tags:
  - enterprise
---

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

### Install NetBox

#### Connect to the Admin Console

Access the NetBox Enterprise Admin Console by opening the provided URL in a browser.

!!! Tip
    If you are connecting to the cluster over the network, you might need to configure port forwarding to connect to the Admin Console: `kubectl port-forward -n <namespace> svc/kotsadm --address 0.0.0.0  3000:3000`


Once connected, you will be prompted for the password you created earlier:

<img src="/images/netbox-enterprise/admin-console.png" alt="enterprise-admin-console" width="400"/>

You will then be prompted to provide your license file. Your license file should have been provided to you by NetBox Labs.

<img src="/images/netbox-enterprise/netbox-enterprise-upload-license.png" alt="enterprise-upload-license" width="400"/>

#### Configure NetBox

You will now be presented with a form to configure NetBox for your environment:

<img src="/images/netbox-enterprise/netbox-enterprise-configure-netbox.png" alt="netbox-enterprise-configure-netbox" width="600"/>

You can configure the following NetBox configuration parameters:

- Version of NetBox to deploy
- NetBox superuser name and password
- Number of NetBox replicas to run
- (Optional) External PostgreSQL
- (Optional) External S3-compatible storage
- (Optional) External Redis cache
- Advanced settings: plugins, remote authentication (SSO) and user group sync

You'll also need to accept the NetBox Labs Terms of Service by entering `ACCEPT` before proceeding:

<img src="/images/netbox-enterprise/netbox-enterprise-tos.png" alt="netbox-enterprise-tos" width="400"/>

#### Deploy NetBox

The deployment of NetBox Enterprise will then proceed:

<img src="/images/netbox-enterprise/netbox-enterprise-deploy.png" alt="netbox-enterprise-deploy" width="500"/>

The `Unavailable` status will change to `Ready` once the deployment is complete and NetBox has fully initialized:

<img src="/images/netbox-enterprise/netbox-enterprise-ready.png" alt="netbox-enterprise-ready" width="500"/>

NetBox Enterprise should now be fully deployed.

!!! Tip
    Although deployment is complete, you may still need to configure your ingress controller before you can connect without having to use port-forwarding. NetBox Enterprise is configured to expose a ClusterIP service with the name netbox-enterprise on port 80.
    
