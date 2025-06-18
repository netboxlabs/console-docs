---
title: NetBox Enterprise SAML Configuration Guide
tags:
  - enterprise
---

# NetBox Enterprise SAML Configuration Guide

## Required Information

- **Entity ID**: This is your IdP's Entity ID obtained from the SAML metadata
- **SSO URL**: Your IdP's SSO login URL
- **x509 Certificate**: The Base64-encoded X.509 certificate used to sign SAML assertions
- **NetBox Enterprise URL**: URL For the NetBox Enterprise instance

## Generate Public and Private Keys
These will be used later during configuration and can be generated from anywhere. Be sure to keep the private key secure.

``` shell
openssl genpkey -algorithm RSA -out saml_private_key.pem -pkeyopt rsa_keygen_bits:2048

openssl req -new -x509 -key saml_private_key.pem -out saml_cert.pem -days <specify number of days valid>
```

## Configure the IdP
Set up the IdP using the public key from the previous section, and the ACS URL (based on the NetBox Enterprise URL). These steps will vary depending on the IdP in use.

**ACS URL**: "{NetBox Enterprise URL}/oauth/complete/saml/"
**SP Entity ID**: "{NetBox Enterprise URL}"

Example:

![SAML Settings](../images/netbox-enterprise/SAML/netbox-enterprise-saml-idp.png)

### Configure Attributes or Claims
Setup similar mappings in the IdP's "Attributes" or "Claims" section. Names may vary on different platforms.

``` shell
"attr_first_name": "first_name"
"attr_last_name": "last_name"
"attr_username": "email"
"attr_email": "email"
```

Example:

![Attribute Settings](../images/netbox-enterprise/SAML/netbox-enterprise-saml-attributes.png)

### Capture x509 Certificate
After setting up the IdP, generate a certificate in the IdP (this may be done by default). The x509 certificate can either be downloaded or viewed in the SAML metadata URL. This certificate data will be used in the next step.

## Update NetBox Enterprise Config
1. In the Admin Console for NetBox Enterprise, navigate to the **Config** tab and scroll to the bottom to check **Advanced Settings**
2. Apply the following into **NetBox Python Configuration Overrides**, replacing the relevant information from previous steps.

``` shell
REMOTE_AUTH_ENABLED = True
REMOTE_AUTH_AUTO_CREATE_USER = True
REMOTE_AUTH_BACKEND = 'social_core.backends.saml.SAMLAuth'
SOCIAL_AUTH_REDIRECT_IS_HTTPS = True

SOCIAL_AUTH_SAML_SP_ENTITY_ID = "<NetBox Enterprise Instance URL>"
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = "-----BEGIN CERTIFICATE-----<Public Key goes here>-----END CERTIFICATE-----"
SOCIAL_AUTH_SAML_SP_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----<Private Key goes here>-----END PRIVATE KEY-----"

SOCIAL_AUTH_SAML_ORG_INFO = {
    "en-US": {
        "name": "<Org Name>",
        "displayname": "<Org Display Name>",
        "url": "<Org Website>",
    }
}

SOCIAL_AUTH_SAML_TECHNICAL_CONTACT = {
    "givenName": "support",
    "emailAddress": "[<Support Email Address>](mailto:<Support Email Address>)"
}

SOCIAL_AUTH_SAML_SUPPORT_CONTACT = {
    "givenName": "support",
    "emailAddress": "[<Support Email Address>](mailto:<Support Email Address>)"
}

SOCIAL_AUTH_SAML_ENABLED_IDPS = {
    "idp": {
        "entity_id": "<SAML Entity ID>",
        "url": "<SAML Sign-on URL>",
        "x509cert": "<x509 Certificate>",
        "attr_user_permanent_id": "email",
        "attr_first_name": "first_name",
        "attr_last_name": "last_name",
        "attr_username": "email",
        "attr_email": "email",
    }
}
```