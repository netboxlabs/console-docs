# Microsoft Entra ID Setup (formerly Azure Active Directory)

This guide explains how to configure single sign-on (SSO) support for NetBox Enterprise using Microsoft Entra ID (formerly Azure Active Directory) as an authentication backend.

## Entra ID Configuration
1. Create a test user (optional)
Create a new Entra ID user to be used for testing. You can skip this step if you already have a suitable account created.

2. Create an app registration
Under the Microsoft Entra ID dashboard, navigate to **Add** > **App registration**.

    ![Add an app registration](../images/azure-sso/azure_ad_add_app_registration.png)

    Enter a name for the registration (e.g. "NetBox Enterprise") and ensure that the "single tenant" option is selected.

    Under "Redirect URI", select "Web" for the platform and enter the path to your NetBox Enterprise installation, ending with /oauth/complete/azuread-oauth2/. 

    Eg. https://{your-domain}.com/oauth/complete/azuread-oauth2/

    ![Add an app registration](../images/azure-sso/azure_ad_app_registration.png)

    Once finished, make note of the application (client) ID; this will be used when configuring NetBox Enterprise instance.

    ![Completed app registration](../images/azure-sso/azure_ad_app_registration_created.png)


    **Multitenant authentication**

    NetBox also supports multitenant authentication via Entra ID, however it requires a different backend and an additional configuration parameter. Please see the `python-social-auth` [documentation](https://python-social-auth.readthedocs.io/en/latest/backends/azuread.html#tenant-support) for details concerning multitenant authentication.

3. Create a secret

    When viewing the newly-created app registration, click the "Add a certificate or secret" link under "Client credentials". Under the "Client secrets" tab, click the "New client secret" button.

    ![Add a client secret](../images/azure-sso/azure_ad_add_client_secret.png)

    You can optionally specify a description and select a lifetime for the secret.

    ![Client secret parameters](../images/azure-sso/azure_ad_client_secret.png)

    Once finished, make note of the secret value (not the secret ID); this will be used when configuring your NetBox Enterprise instance.

    ![Client secret parameters](../images/azure-sso/azure_ad_client_secret_created.png)

## NetBox Enterprise Configuration

After completing the app registration, navigate to the `Config tab` in the NetBox Enterprise admin console, scroll down to `Advanced Settings` and tick the `Show Advanced Settings` check box. 

![advanced settings](../images/netbox-enterprise/advanced_settings.png)

Then, in the  the `NetBox Python Configuration Overrides` field paste the following value from the previous steps:

```shell
REMOTE_AUTH_BACKEND = 'social_core.backends.azuread.AzureADOAuth2' 
SOCIAL_AUTH_AZUREAD_OAUTH2_KEY = 'APPLICATION_ID' 
SOCIAL_AUTH_AZUREAD_OAUTH2_SECRET = 'SECRET_VALUE'
```

Once added, scroll down to the bottom of the page and click `Save config`. Follow the prompt to `Go to updated version` and click the `Deploy` button to deploy the updated version of your app with the configuration changes. 

## Testing
Open your NetBox Instance once it is back up in the `Ready` state. Log out of NetBox instance if already authenticated, and click the "Log In" button at top right. You should see the normal login form as well as an option to authenticate using Entra ID. Click that link.

![NetBox Entra ID login form](../images/azure-sso/netbox_azure_ad_login.png)

You should be redirected to Microsoft's authentication portal. Enter the username/email and password of your account to continue. You may also be prompted to grant this application access to your account.

![Microsoft authentication portal](../images/azure-sso/azure_ad_login_portal.png)

If successful, you will be redirected back to the NetBox Enterprise UI, and will be logged in as the Entra ID user. You can verify this by navigating to your profile (using the button at top right).

This user account has been replicated locally to NetBox Enterprose, and can now be assigned groups and permissions within the NetBox Enterprise admin UI.

## Troubleshooting
### Redirect URI does not Match
Entra ID requires that the authenticating client request a redirect URI that matches what you've configured for the app in step two. This URI must begin with https:// 

### Not Logged in After Authenticating
If you are redirected to the NetBox Enterprise UI after authenticating successfully, but are not logged in, double-check the configured backend and app registration. The instructions in this guide pertain only to the `azuread.AzureADOAuth2` backend using a single-tenant app registration.