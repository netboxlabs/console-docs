# Admin Dashboard Access Set Up

## Account Setup

The NetBox Cloud team will set up your account with your email address as the username, and you will use this to access the cloud admin dashboard. Access to the dashboard is secured using a TOTP (time-based one time password) which you need to generate using an Authenticator app such as Google Authenticator or Authy. 

To complete the set up of your account for access to the admin dashboard, follow these steps: 

1. When you receive the email with your temporary password and a link to the Cloud Admin Dashboard, simply click on the URL <https://admin.cloud.netboxapp.com/> to login:

![temp password email](../images/dashboard_access/tmp_pwd_email.png) 

<br>
<img src="../images/dashboard_access/tmp_pwd_email.png" alt="" width="100%" height="100%" title="temp password email">

<br>
2. Enter the username (your email address) and the temporary password as per the email, and click ‘Sign in’: 

<br>
<img src="../images/dashboard_access/sign_in_tmp.png" alt="" width="50%" height="50%" title="temp password signin">

<br>
3. You will then be prompted to change your password: 

<br>
<img src="images/dashboard_access/change_pwd.png" alt="" width="50%" height="50%" title="change password">

<br>
4. Next, add NetBox Cloud to your authenticator app of choice, by scanning the QR code from within the app. Then enter the TOTP code from your authenticator app, and click confirm:

<br>
<img src="images/dashboard_access/set_up_totp.png" alt="" width="50%" height="50%" title="set up totp">

<br>
5. The TOTP set up is now complete and you are logged into the NetBox Cloud Admin Dashboard. You will see (and be able to administer) the instances running under your Organization: 

<br>
<img src="images/dashboard_access/instances_view.png" alt="" width="100%" height="100%" title="view instances">

<br>
6. That is the set up complete and the next time you log in you will need to enter your email address, the updated password (from step 3), and then you will see the prompt for the TOTP, so enter this from your authenticator app and click ‘Confirm’: 

<br>
<img src="images/dashboard_access/confirm_totp.png" alt="" width="50%" height="50%" title="confirm totp">

<br>
7. To retrieve the password for the Admin user account for the NetBox Cloud web interface, first launch the admin console, by clicking on the link to the instance:

<br>
<img src="images/dashboard_access/retrieve_admin_pwd.png" alt="" width="100%" height="100%" title="confirm totp">

<br>
Then scroll down to the ‘Secrets’ section, and click the blue eye icon to reveal the secrets:

<br>
<img src="images/dashboard_access/retrieve_admin_pwd_2.png" alt="" width="80%" height="80%" title="retrive admin password">

<br>
8. Once the secrets are revealed, then you can copy the admin user password to your clipboard:

<br>
<img src="images/dashboard_access/retrieve_admin_pwd_3.png" alt="" width="80%" height="80%" title="retrive admin password">

<br>
9. Then click the green globe icon in the top right corner of the dashboard (underneath the instance name) to open the URL for your instance’s web interface: 

<br>
<img src="images/dashboard_access/launch_ui.png" alt="" width="100%" height="100%" title="launch ui">

<br>
10. Login with the Admin user account, username of ‘admin’, and the password you have copied from step 8: 

<br>
<img src="images/dashboard_access/admin_login.png" alt="" width="50%" height="50%" title="admin login">