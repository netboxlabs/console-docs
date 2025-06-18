---
title: Configuring SAML Group Mapping in NetBox Cloud  
tags:
  - cloud
  - enterprise
---

# Configuring SAML Group Mapping in NetBox Cloud  

NetBox Cloud supports SAML-based authentication, including group mappings to enforce role-based access control. For group mapping, you will need to provide your Identity Provider (IdP) group names so we can associate them with the desired NetBox groups.

## Group Attribute Mapping  

By default, NetBox Cloud expects the SAML group attribute statement to be named `groups`, which contains a list of group names the user belongs to. If your IdP sends group information under a different attribute name, such as `MemberOf`, you must update its configuration to use `groups` to ensure proper mapping.

## Providing Your Group Mappings  

To set up group mapping, follow these steps:  

1. **Create Groups in NetBox** – Set up user groups in NetBox and assign appropriate permissions.  
2. **Define Your Mappings** – Determine which IdP groups should be mapped to which NetBox groups. Ensure you are using the exact group names as they appear in your IdP.  
3. **Share Your Mappings** – Provide your IdP group names along with the corresponding NetBox groups to the NetBox Cloud team so we can configure the mappings on our end.  


Below is an example that illustrates how IdP groups are mapped to NetBox user groups:  

```
    "IdP-group-name": "netbox-user-group",
    "another-IdP-group-name": "another-netbox-user-group"
```

Once configured, users will be assigned NetBox roles based on their IdP group membership.