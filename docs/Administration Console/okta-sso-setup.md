---
title: Okta SSO Setup
tags:
  - cloud
  - netbox
  - authentication
  - administration
  - installation
  - configuration
  - integration
---

# Okta SSO Setup
This guide explains how to configure single sign-on (SSO) support for NetBox Cloud using Okta as an authentication backend.

## Okta Configuration
Note that Okta offers [free developer accounts](https://developer.okta.com/)

1. Create a test user (optional)
Create a new user in the Okta admin portal to be used for testing. You can skip this step if you already have a suitable account created.

2. Create an app registration
Within the Okta administration dashboard, navigate to Applications > Applications, and click the "Create App Integration" button. Select "OIDC" as the sign-in method, and "Web application" for the application type.

    ![Create an app registration](../images/OKTA%20SSO/okta_create_app_registration.png)

    On the next page, give the app integration a name (e.g. "NetBox Cloud") and specify the sign-in and sign-out URIs. These URIs should follow the formats below:

    - Sign-in URI:   https://{your-domain}.cloud.netboxapp.com/oauth/complete/okta-openidconnect/
    - Sign-out URI:  https://{your-domain}.cloud.netboxapp.com/oauth/disconnect/okta-openidconnect/
    
    ![Web app integration](../images/OKTA%20SSO/okta_web_app_integration.png   )

    Under "Assignments," select the controlled access setting most appropriate for your organization. Click "Save" to complete the creation.

    Once finished, note the following parameters. These will be used to configured NetBox Cloud.

    - Client ID
    - Client secret
    - Okta domain

    ![Okta integration parameters](../images/OKTA%20SSO/okta_integration_parameters.png)

## NetBox Cloud Configuration

Securely share the following configuration parameters with [NetBox Labs Support](mailto:support@netboxlabs.com), substituting your own values:

REMOTE_AUTH_BACKEND = 'social_core.backends.okta_openidconnect.OktaOpenIdConnect'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_KEY = '{Client ID}'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_SECRET = '{Client secret}'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_API_URL = 'https://{Okta domain}/oauth2/'

The support team will add these parameters to your NetBox Cloud instance and confirm when this is ready for testing.

## Testing
Log out of NetBox Cloud if already authenticated, and click the "Log In" button at top right. You should see the normal login form as well as an option to authenticate using Okta. Click that link.

![NetBox Okta login form](../images/OKTA%20SSO/netbox_okta_login.png)

You should be redirected to Okta's authentication portal. Enter the username/email and password of your test account to continue. You may also be prompted to grant this application access to your account.

![Okta login portal](../images/OKTA%20SSO/okta_login_portal.png)

If successful, you will be redirected back to the NetBox Cloud UI, and will be logged in as the Okta user. You can verify this by navigating to your profile (using the button at top right).

This user account has been replicated locally to NetBox Cloud, and can now be assigned groups and permissions within the NetBox Cloud admin UI.
