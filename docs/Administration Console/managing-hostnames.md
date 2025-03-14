# Managing NetBox Cloud Hostnames

!!! info
    Current functionality of the **Hostnames Manager** is limited to viewing Hostnames along with their associated NetBox Cloud instances and categories. Enhanced functionality to manage Hostnames is coming soon in a future release.

1. From within the [NetBox Labs Console](https://console.netboxlabs.com) click on **Settings** and then **Hostnames Manager** in the left-hand main menu to manage the settings for your Organization: 

    ![netbox labs console](../images/console/settings.png)

2. From here you can view the Hostnames configured for your organization. Under **NetBox** you can see which NetBox instance is associated with a given hostname, and what **Category** the hostname is: 

    ![netbox labs console](../images/console/hostnames_view.png)


### Hostname Categories: 

Hostname categories are defined as follows: 

| Category | Definition | 
|----------|------------|
| `platform random` | A randomly generated hostname created when a new NetBox Cloud instance is created, usually as a trial. | 
| `platform custom` | A custom hostname on the NetBox cloud platform eg. `abcwidgets.cloud.netboxapp.com` |   
| `org custom` | A custom hostname defined by your organization eg. `netbox-prod.abcwidgets.com`|  

### Organization Custom Hostnames 

Organization Custom Hostnames are available in NetBox Cloud **Professional** and **Enterprise** plans, and if you would like to set one up please raise a support ticket by emailing the [NetBox Labs Support Team](mailto:support@netboxlabs.com). 

!!! note
    Organization Custom Hostnames are not available for Starter plans. For more information about pricing plans click [here](https://netboxlabs.com/pricing/) 