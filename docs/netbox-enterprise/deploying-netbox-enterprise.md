## Multiple deployment models to suit your environment
NetBox Enterprise supports different deployment models to best address varying requirements and environments. For a fully managed, hands-off experience, we support an Embedded Cluster (EC) installation that takes care of everything, including deploying and managing the underlying Kubernetes cluster. All that’s needed is a bare Linux operating system running on adequately sized compute resources. EC deployments deliver all the components and dependencies required to install and operate NetBox, including databases, application servers, application load balancers, and object stores. EC deployments also provide the option of leveraging external components, such as a cloud PostgreSQL cluster or an S3 Object Store.

For customers who are already operating their own Kubernetes clusters, we also support a Kubernetes Off-The-Shelf (KOTS) installation that deploys NetBox Enterprise on your k8s cluster. KOTS deployments include all the same components and take care of all the dependencies just like EC deployments. They also provide the same flexibility in leveraging external database and object store components.

## Walking through a fully contained NetBox Enterprise installation
Let’s walk through an Embedded Cluster (EC) install to see just how easy it is to get started with NetBox Enterprise!

1.  Download the deployment package and license file to your Linux host:
    ```
    curl https://replicated.app/embedded/netbox-enterprise/stable -o netbox-enterprise-stable.tgz
    ```

2. After uncompressing the package, simply launch the installation:
    ```
    sudo ./netbox-enterprise install --license license.yaml
    ```
    You’ll be requested to create a password for the NetBox Enterprise admin console and the cluster will be deployed, ready to host all the NetBox application components. The deployment of the cluster is complete when you see this message:

    Visit the Admin Console to configure and install netbox-enterprise: http://my.netbox-enterprise.host:30000

3. Access the NetBox Enterprise admin console and configure NetBox
    Open the provided URL in your browser. You’ll be prompted for the password you created in Step 2:

    ![enterprise-admin-console](../images/netbox-enterprise/admin-console.png)

    You’ll then be guided to configure NetBox for your environment:

    ![configure-netbox-enterprise](../images/netbox-enterprise/configure-netbox-enterprise.png)

    You’ll be able to configure:

    - Version of NetBox that you want to install:

    ![netbox-enterprise-version](../images/netbox-enterprise/netbox-enterprise-version.png)

    - Whether to use a built-in or external PostgreSQL:

    ![netbox-enterprise-postgres](../images/netbox-enterprise/netbox-enterprise-postgres.png)

    - Whether to use a built-in or external S3-Compatible object store:

    ![netbox-enterpise-storage](../images/netbox-enterprise/netbox-enterprise-s3.png)

    - And finally, advanced settings to configure plugins and SSO remote authentication:

    ![netbox-enterprise-overides](../images/netbox-enterprise/netbox-enterprise-overides.png)

    The deployment of NetBox Enterprise will then proceed:

    ![netbox-enterprise-deploy](../images/netbox-enterprise/netbox-enterprise-deploy.png)

    The `Unavailable` status will change to `Ready` once the deployment is complete and NetBox has fully initialized:

    ![netbox-enterprise-ready](../images/netbox-enterprise/netbox-enterprise-ready.png)

4. That’s it! You’re ready to get started with NetBox

    ![netbox-enterprise-login](../images/netbox-enterprise/netbox-enterprise-login.png)

    ![netbox-enterprise-home](../images/netbox-enterprise/netbox-enterprise-app-home.png)
