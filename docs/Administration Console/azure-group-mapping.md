# Group Mapping For Azure AD Single Sign-On (SSO)

Upgrade your Single Sign-On experience with Group Mapping for Azure SSO – a smarter, more secure way to manage user access. The Group Mapping feature for Azure Single Sign-On, streamlines the synchronization of group memberships from Azure Active Directory to groups in NetBox Cloud, allowing you to align your user access efficiently and accurately. 

!!! info
    This feature is only available in Pro/Enterprise tiers.

Changes in Azure Active Directory groups are reflected in NetBox Cloud, ensuring up-to-date access management and enhanced security. You can tailor the group mapping to your organizational needs while maintaining strict security and compliance standards.

If you are already securing access to NetBox Cloud using Azure AD for SSO, and would like use the Group Mapping feature it's easy to get set up. Simply create your groups and permissions in NetBox Cloud, then set up your groups in Azure AD and reach out to the support team at NetBox Labs and we will take care of the group mappings for you to suit your requirements. 

!!! note
    We’ve made some important updates to the Azure AD user group sync feature that may affect group memberships and permissions of Azure AD SSO users accessing NetBox Cloud. To support enterprise Azure AD environments, we’ve added pagination to retrieve large lists (100+) of membership groups for users. To support NetBox group assignments from Azure nested groups, we’ve changed the Azure API endpoint used for group retrieval from [`memberOf`](https://learn.microsoft.com/en-us/graph/api/user-list-memberof) to [`transitiveMemberOf`](https://learn.microsoft.com/en-us/graph/api/user-list-transitivememberof). 
    
    This means that users will now be made members of NetBox user groups based on the configured group mappings for both direct membership Azure groups and transitive Azure groups (parent groups of direct membership groups). Under specific conditions, users may gain additional group memberships and permissions. We strongly advise you review your NetBox Cloud and Azure AD user, group and permission configurations to ensure they align to your security requirements.

Watch the video below for a step-by-step example of how the Group Mapping feature works, or read on for an explanation. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/Vg0xpWJiKAs?si=0UElAwKzWIrKzgHH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## How it Works

Group mappings are based on the **Object ID** of the group in Azure AD. For example: 

![Azure Group Object ID](..//images/Azure%20SSO/azure_group_sync_1.png)

The **Object ID** is mapped to a group in NetBox Cloud, and that group could have permissions assigned to it. For example, this group called **CircuitManager** in NetBox Cloud has permissions assigned to it that allows members of the group to manage all of the **Circuit** and  **Provider** object types: 

![NetBox Group](..//images/Azure%20SSO/azure_group_sync_2.png)

![NetBox Permissions](..//images/Azure%20SSO/azure_group_sync_3.png)

Optionally, members of the Azure AD groups can also be members of the NetBox built-in groups **Staff** which allows access to the NetBox admin interface, and **Superuser** which has all permissions without explicitly assigning them.

The NetBox Labs support team will map your Azure AD Group Object ID's to your NetBox Cloud groups, for example: 

| Azure AD Group Object ID | NetBox Cloud Group | Staff | Super User |
| -------- | ------- |-------- | ------- |
| 1a36bed9-3bdc-4970-ab66-faf9704e0af4 | Circuit Manager | Yes | No | 

## How Do I Get it Set Up?
Simply provide us with your requirements in terms of object IDs and NetBox groups and we will take care of the rest. 

If you have any questions about Group Mapping for Azure AD Single Sign-On (SSO), please raise a support ticket by emailing the [NetBox Labs Support Team](mailto:support@netboxlabs.com).
