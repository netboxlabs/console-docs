# NetBox Cloud Azure AD SSO Setup

To set up Azure AD SSO for NetBox Cloud, follow these steps:

1. Go to **NetBox Configmap ENV** section of the Admin Console:

    ![configmap env](../images/netbox_cloud/configmap_env.png)

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

    ![azure keys](../images/netbox_cloud/azure_keys.png)

    Then click the blue cloud icon to push the change. 

3. In Microsoft Azure, under **Home --> Enterprise Applications**, add permissions for your NetBox Cloud application as follows (with admin consent):

    ![azure app permissions](../images/netbox_cloud/azure_app_permissions.png)

4. When you open the NetBox Cloud Web UI again you will now have the option to log in with Microsoft Azure SSO:

    ![azure login](../images/netbox_cloud/netbox_azure_login.png)