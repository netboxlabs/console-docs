# Upgrading NetBox Cloud

To upgrade your version of NetBox Cloud, follow these steps:

1. In the admin console, click on the three dots in the top right corner of the instance you wish to upgrade and click **Manage**

    ![manage instance](..//images/console/manage_instance.png)

2. In the **Version Upgrade** section, select the target version from the drop-down menu. In this example we are upgrading from `v3.4.7` to `v3.5.1`

    ![select target version](../images/console/version_upgrade.png)

3. Then click **Apply** to start the upgrade process: 

    ![apply upgrade](../images/console/apply_version_upgrade.png)

4. The upgrade will take a few minutes to complete. you can monitor the progress of the upgrade by navigating down to the **Logs** section, and clicking the refresh icon on the right hand side:

    ![refresh logs](../images/console/refesh_logs.png)

5. Then click on the name of the instance with the latest timestamp (you may see the state change from `pending` to `running`). This will display the output from the log of your upgraded instance as it starts up:

    ![view log file](../images/console/view_logs.png)

5. Refresh the logs again, and after a few minutes you should soon see only one running instance (or two if you have a HA deployment):

    ![refresh logs](../images/console/view_logs_2.png)

6. When the upgrade is complete, you will see the new version instance has a status of `started` and the new version number will be displayed in the **Service Overview** section: 

    ![complete upgrade](../images/console/complete_upgrade.png)

7. If you encounter any issues while performing the upgrade, check the logs for error messages and raise a support ticket by emailing the [NetBox Labs Support Team](mailto:support@netboxlabs.com)