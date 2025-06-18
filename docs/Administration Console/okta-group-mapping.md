---
title: Group Mapping For Okta Single Sign-On (SSO)
tags:
  - cloud
---

# Group Mapping For Okta Single Sign-On (SSO)

Upgrade your Single Sign-On experience with Group Mapping for Okta SSO – a smarter, more secure way to manage user access. The Group Mapping feature for Okta Single Sign-On, streamlines the synchronization of group memberships from Okta to groups in NetBox Cloud, allowing you to align your user access efficiently and accurately. 

Changes in Okta groups are reflected in NetBox Cloud, ensuring up-to-date access management and enhanced security. You can tailor the group mapping to your organizational needs while maintaining strict security and compliance standards.

If you are already securing access to NetBox Cloud using Okta for SSO, and would like use the Group Mapping feature it's easy to get set up. Simply create your groups and permissions in NetBox Cloud, then set up your groups in Okta and reach out to the support team at NetBox Labs and we will take care of the group mappings for you to suit your requirements. 

> ℹ️ Note
> 
> This feature is only available in Pro/Enterprise tiers.

## How it Works

Group mappings are based on the **name** of the group in Okta, which is mapped to a group in NetBox Cloud, and that group could have permissions assigned to it. For example, this group called **CircuitManager** in NetBox Cloud has permissions assigned to it that allows members of the group to manage all of the **Circuit** and  **Provider** object types: 

![NetBox Group](..//images/Azure%20SSO/azure_group_sync_2.png)

![NetBox Permissions](..//images/Azure%20SSO/azure_group_sync_3.png)

Optionally, members of the Okta groups can also be members of the NetBox built-in groups **Staff** which allows access to the NetBox admin interface, and **Superuser** which has all permissions without explicitly assigning them.

The NetBox Labs support team will map your Okta group names to your NetBox Cloud groups, for example: 

| Okta Group Name | NetBox Cloud Group | Staff | Super User |
| -------- | ------- |-------- | ------- |
| NetBox-Circuit-Mgrs | Circuit Manager | Yes | No | 

## How Do I Get it Set Up?
Simply provide us with your requirements in terms of Okta group names and NetBox groups and we will take care of the rest. 

If you have any questions about Group Mapping for Okta Sign-On (SSO), please raise a support ticket by emailing the [NetBox Labs Support Team](mailto:support@netboxlabs.com).
