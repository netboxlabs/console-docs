# NetBox Enterprise KOTS Installation

### Deploying NetBox

Access the NetBox Enterprise admin console and configure NetBox

Open the provided URL in a browser. A prompt will require the password created in Step 2:

![enterprise-admin-console](../images/netbox-enterprise/admin-console.png)

A wizard will guide the configuration of NetBox for the environment:

![configure-netbox-enterprise](../images/netbox-enterprise/configure-netbox-enterprise.png)

Required configuration information includes:

- Version of NetBox to deploy:

![netbox-enterprise-version](../images/netbox-enterprise/netbox-enterprise-version.png)

- Built-in or external PostgreSQL:

![netbox-enterprise-postgres](../images/netbox-enterprise/netbox-enterprise-postgres.png)

- Built-in or external S3-Compatible object store:

![netbox-enterpise-storage](../images/netbox-enterprise/netbox-enterprise-s3.png)

- Advanced settings to configure plugins and SSO remote authentication:

![netbox-enterprise-overides](../images/netbox-enterprise/netbox-enterprise-overides.png)

The deployment of NetBox Enterprise will then proceed:

![netbox-enterprise-deploy](../images/netbox-enterprise/netbox-enterprise-deploy.png)

The `Unavailable` status will change to `Ready` once the deployment is complete and NetBox has fully initialized:

![netbox-enterprise-ready](../images/netbox-enterprise/netbox-enterprise-ready.png)

### Verify

NetBox Enterprise should now be fully deployed.

![netbox-enterprise-login](../images/netbox-enterprise/netbox-enterprise-login.png)

![netbox-enterprise-home](../images/netbox-enterprise/netbox-enterprise-app-home.png)
