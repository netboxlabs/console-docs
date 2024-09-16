# NetBox Enterprise Embedded Cluster Installation

### Deploying the cluster

The following steps are required for an Embedded Cluster (EC) installation of NetBox Enterprise.

1. Download the deployment package and license file to your host (the `Authorization` token should be provided by NetBox Labs):

   ```
   curl https://replicated.app/embedded/netbox-enterprise/stable -H "Authorization: <provided by NetBox Labs>" -o netbox-enterprise-stable.tgz
   ```
2. Uncompress the package and launch the installation:

   ```
   tar -xvzf netbox-enterprise-unstable.tgz
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
