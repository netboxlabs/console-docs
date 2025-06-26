---
tags:
  - cloud
  - authentication
  - sso
  - azure
  - rbac
  - configuration
title: "Microsoft Entra ID Group Mapping"
description: "Configure automatic group synchronization and role mapping between Microsoft Entra ID and NetBox Cloud for streamlined user access management."
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
versions:
  netbox_cloud: "v1.10"
status: "current"
category: "authentication"
audience: "administrators"
complexity: "intermediate"
---

# Group Mapping For Microsoft Entra ID Single Sign-On (SSO)

Upgrade your Single Sign-On experience with Group Mapping for Microsoft Entra ID SSO – a smarter, more secure way to manage user access. The Group Mapping feature for Entra ID Single Sign-On, streamlines the synchronization of group memberships from Microsoft Entra ID to groups in NetBox Cloud, allowing you to align your user access efficiently and accurately. 

!!! info
    This feature is only available in Pro/Enterprise tiers.

Changes in Microsoft Entra ID groups are reflected in NetBox Cloud, ensuring up-to-date access management and enhanced security. You can tailor the group mapping to your organizational needs while maintaining strict security and compliance standards.

If you are already securing access to NetBox Cloud using Entra ID for SSO, and would like use the Group Mapping feature it's easy to get set up. Simply create your groups and permissions in NetBox Cloud, then set up your groups in Entra ID and reach out to the support team at NetBox Labs and we will take care of the group mappings for you to suit your requirements. 

!!! note
    We've made some important updates to the Entra ID user group sync feature that may affect group memberships and permissions of Entra ID SSO users accessing NetBox Cloud. To support enterprise Entra ID environments, we've added pagination to retrieve large lists (100+) of membership groups for users. To support NetBox group assignments from Entra ID nested groups, we've changed the Microsoft API endpoint used for group retrieval from [`memberOf`](https://learn.microsoft.com/en-us/graph/api/user-list-memberof) to [`transitiveMemberOf`](https://learn.microsoft.com/en-us/graph/api/user-list-transitivememberof). 
    
    This means that users will now be made members of NetBox user groups based on the configured group mappings for both direct membership Entra ID groups and transitive Entra ID groups (parent groups of direct membership groups). Under specific conditions, users may gain additional group memberships and permissions. We strongly advise you review your NetBox Cloud and Entra ID user, group and permission configurations to ensure they align to your security requirements.

Watch the video below for a step-by-step example of how the Group Mapping feature works, or read on for an explanation. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/Vg0xpWJiKAs?si=0UElAwKzWIrKzgHH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## How it Works

Group mappings are based on the **Object ID** of the group in Entra ID. For example: 

![Entra ID Group Object ID](../images/Azure%20SSO/azure_group_sync_1.png)

The **Object ID** is mapped to a group in NetBox Cloud, and that group could have permissions assigned to it. For example, this group called **CircuitManager** in NetBox Cloud has permissions assigned to it that allows members of the group to manage all of the **Circuit** and  **Provider** object types: 

![NetBox Group Configuration](../images/Azure%20SSO/azure_group_sync_2.png)

![NetBox Group Permissions](../images/Azure%20SSO/azure_group_sync_3.png)

Optionally, members of the Entra ID groups can also be members of the NetBox built-in groups **Staff** which allows access to the NetBox admin interface, and **Superuser** which has all permissions without explicitly assigning them.

The NetBox Labs support team will map your Entra ID Group Object ID's to your NetBox Cloud groups, for example: 

| Entra ID Group Object ID | NetBox Cloud Group | Staff | Super User |
| -------- | ------- |-------- | ------- |
| 1a36bed9-3bdc-4970-ab66-faf9704e0af4 | Circuit Manager | Yes | No | 

## How Do I Get it Set Up?
Simply provide us with your requirements in terms of object IDs and NetBox groups and we will take care of the rest. 

If you have any questions about Group Mapping for Entra ID Single Sign-On (SSO), please raise a support ticket by emailing the [NetBox Labs Support Team](mailto:support@netboxlabs.com).
