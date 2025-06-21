---
title: Built-in Plugins in NetBox Enterprise
tags:
  - enterprise
  - community
  - netbox
  - installation
---

# Built-in Plugins in NetBox Enterprise

NetBox Enterprise ships with a curated set of built-in plugins that extend the platform's core capabilities—offering enhanced features without the complexity of manual setup. These plugins are pre-integrated and supported within the platform, ensuring streamlined deployment and reliable performance.

## Available Plugins

 Built-in plugins are regularly added to NetBox Enterprise as new releases become available. For the most current list of built-in plugins, refer to the [NetBox Enterprise Release Notes](https://docs.netboxlabs.com/netbox-enterprise/nbe-release-notes/).

## Plugin Management and Deployment

The following steps will guide you through installation of built-in plugins:

1. Navigate to the `Config` tab in the admin console.
2. Enable `Advanced Settings` by clicking the 'Show Advanced Settings' checkbox:
![Screenshot: advanced settings](../images/netbox-enterprise/advanced_settings.png){ style="max-width: 75%" }
3. In the **NetBox Python Configuration Overrides** field, define your plugin list:
```
PLUGINS = ['netbox_topology_views', 'netbox_bgp']
```
4. Additional plugin options can be configured in the override as well. Below is an example for NetBox Topology Views:
```
PLUGINS_CONFIG = {
    'netbox_topology_views': {
        'allow_coordinates_saving': True,
        'always_save_coordinates': True
    }
}
``` 
*Be sure to consult the plugin’s GitHub repository for specific configuration details.* 
5. Save the configuration at the bottom of the page. When prompted, click **Go to updated version**, then select **Deploy** to apply the configuration changes.

Once your NetBox Enterprise is back in a `Ready` state, log in to your instance and your plugins will be available. 




