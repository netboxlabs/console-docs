---
tags:
  - cloud
  - administration
  - getting-started
  - configuration
  - billing
versions:
  netbox_cloud: "v1.10"
status: "current"
---

# Add a New User to Free Plan

To invite a new user to a NetBox Cloud Free instance, the user will need to have a valid email address, and be added as an administrator in the NetBox Labs Console.

1. From within the [NetBox Labs Console](https://console.netboxlabs.com), expand **Settings** and select **Administrators**

    ![netbox console admin nav](../images/console/console_administrators_nav.png)

2. Type the user's email address in the box, and click **Invite**

    ![netbox console admin invite](../images/console/console_administrators_invite.png)

3. Click **Continue** to confirm the email address to be invited

    ![netbox console admin invite confirm](../images/console/console_administrators_invite_confirm.png)

4. An email will be sent containing a temporary password for the Console

5. Have the user login with the temporary information, and it will prompt for a new password to be set

6. The user can now login to the Console and click the link to access the instance

    ![netbox console click instance link](../images/console/console_click_instance_link.png)

7. Login to the instance by clicking the auth button and using the same credentials that were just setup

    ![netbox console auth button](../images/console/instance_click_login.png)
    ![netbox console login](../images/console/instance_login.png)