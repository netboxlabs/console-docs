# Upgrading NetBox Cloud

To upgrade your version of NetBox Cloud, follow these steps:

1. Scroll down to the "Deployment" section of the admin dashboard:

<br>
<img src="images/netbox_cloud/deployment_section.png" alt="" width="100%" height="100%" title="deployment section">
<br>

2. From the drop-down menu, select the version that you wish to upgrade to. In this example we are upgrading from `v3.3.5` to `v3.3.6`

<br>
<img src="images/netbox_cloud/deployment_options.png" alt="" width="100%" height="100%" title="deployment options">
<br>

3. Then click the blue cloud icon to push the change to your NetBox cloud instance: 

<br>
<img src="images/netbox_cloud/deployment_upgraded_version.png" alt="" width="100%" height="100%" title="deployment chosen version">
<br>

4. The upgrade will take a few minutes to complete. you can monitor the progress of the upgrade by navigating down to the 'Pods' section, and clicking the refresh icon on the right hand side, and then the drop-down arrow to view the state of each of the application instances.

<br>
<img src="images/netbox_cloud/refresh_pods.png" alt="" width="100%" height="100%" title="refresh pods">
<br>

Then click the down arrow on the left hand side of the screen to expand the pod data:

<br>
<img src="images/netbox_cloud/expand_pods.png" alt="" width="100%" height="100%" title="expand pods">
<br>

5. When you see a status of 'pending' then this is the upgrade taking place. To view the log output for each pod in real-time, click the ‘Load Logs Below’ icon on the right hand side.

<br>
<img src="images/netbox_cloud/pending_pod.png" alt="" width="100%" height="100%" title="pending pods">
<br>

This will load the log view for the selected pod:

<br>
<img src="images/netbox_cloud/pod_log_view.png" alt="" width="100%" height="100%" title="pod log view">
<br>

6. Once the status of all the pods is 'running' then the upgrade is complete.

<br>
<img src="images/netbox_cloud/complete_upgrade.png" alt="" width="100%" height="100%" title="complete upgrade">
<br>


7. You can then confirm the version in number in the ‘Deployment’ section (see step 1) or by logging into the Web Interface, where you will find the version number in the bottom right hand corner:

<br>
<img src="images/netbox_cloud/version_number.png" alt="" width="100%" height="100%" title="version number">
<br>