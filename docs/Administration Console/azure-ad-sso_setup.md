# NetBox Cloud Azure AD SSO Setup

To set up Azure AD SSO for NetBox Cloud, follow these steps:
<br>

1. Go to `NetBox Configmap ENV` section of the admin dashboard:

<br>
<img src="images/netbox_cloud/configmap_env.png" alt="" width="50%" height="100%" title="configmap env">
<br>

2. Add your 3 key / value pairs for Azure SSO set up (click the green `+` when you enter each one)

You can copy/paste from below:

```
REMOTE_AUTH_BACKEND /  social_core.backends.azuread.AzureADOAuth2
```
```
SOCIAL_AUTH_AZUREAD_OAUTH2_KEY / { the key value }
```
```
SOCIAL_AUTH_AZUREAD_OAUTH2_SECRET / { the secret value }
```

<br>
<img src="images/netbox_cloud/azure_keys.png" alt="" width="100%" height="100%" title="azure keys">
<br>

3. Click the blue cloud icon to push the change. After a few minutes, when you open the Web UI again you will have the option to log in with Azure SSO.

<br>
<img src="images/netbox_cloud/netbox_azure_login.png" alt="" width="50%" height="100%" title="azure log in">
<br>
