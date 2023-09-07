# Configuring IP Allow Lists

You can protect access to your NetBox Cloud instance by adding IPv4 and IPv6 addresses and ranges to an **IP Allow List** to control which source IP’s your instance will accept connections from. 

**Note** - Be careful as once you add CIDR ranges to the **IP Allow List** you will NOT be able to access the WebUI or API of your instance from any other IP addresses than those covered in the list. However, don’t worry if you make a mistake as you can easily remove incorrect entries from the list. 

Watch this quick video or follow the steps outlined below: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/utSGhkWlEzs?si=W21nq5HvlusX0oLd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


1. Login to the NetBox Labs [Console](https://console.netboxlabs.com/dashboard/) and then click on the name of the NetBox instance you are updating, on the left-hand side.  
    ![select netbox instance](../images/ip_allow_list/ip_allow_list_1.png)

2. Scroll down to the **IP Allow List** section and click **Add** on the right hand side: 

    ![Add new IP](../images/ip_allow_list/ip_allow_list_2.png)

3. Add your IP address or range in CIDR notation. Give the range a description, and click **Publish** to add it to the list: 

    ![Publish IP allow List](../images/ip_allow_list/ip_allow_list_3.png)

    **Note** if you are adding multiple entries, then you can click **Publish** after adding them all. 

4. To remove an entry from the IP Allow List, click the trash can icon next to the entry, which marks the entry for deletion:

    ![remove entry](../images/ip_allow_list/ip_allow_list_4.png)

5. Then click **Publish** to remove the entry. Again, you can update multiple entries before clicking on **Publish**.

    ![Publish IP allow list](../images/ip_allow_list/ip_allow_list_5.png)

If you encounter any issues while working with the IP Allow List raise a support ticket by emailing the [NetBox Labs Support Team](mailto:support@netboxlabs.com)`