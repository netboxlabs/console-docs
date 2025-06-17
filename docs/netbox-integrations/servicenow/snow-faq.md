---
title: FAQ and Troubleshooting
tags:
  - netbox-cloud
  - netbox-enterprise
  - netbox-community
---# FAQ and Troubleshooting

## Installation Issues

### Update set installation won't get past the Preview phase

**Common Causes:**
- **Missing Dependencies**: Ensure all required plugins are installed (IntegrationHub Starter Pack, Model Management, System Import Sets)
- **Version Incompatibility**: Verify the update set version matches your ServiceNow instance version
- **Insufficient Privileges**: Confirm you have admin privileges on the ServiceNow instance
- **Conflicting Customizations**: Local customizations may conflict with the application

**Resolution Steps:**
1. Check the preview log for specific error messages
2. Verify all dependencies are installed and activated
3. Review any conflicts shown in the preview results
4. Contact NetBox Labs support if errors persist

### What can I check to see that installation went well?

**Verification Checklist:**
1. **Application Menu**: Verify "NetBox" application appears in the application navigator
2. **Tables Created**: Check that new tables are present:
   - `x_990381_netbox_cl_netbox_parameters`
   - `x_990381_netbox_cl_devices_import_set`
   - `x_990381_netbox_cl_device_types_import_set`
   - `x_990381_netbox_cl_netbox_sites_import`
3. **Extended Fields**: Verify NetBox fields are added to existing tables:
   - `cmdb_ci.x_990381_netbox_cl_netbox_correlation_id`
   - `cmn_location.x_990381_netbox_cl_netbox_synchronize`
4. **Guided Setup**: Access **All > NetBox > Configuration > Guided Setup** successfully
5. **No Critical Errors**: Check system logs for any critical errors during installation

### What new tables are included with the application?

**Import Set Tables:**
- `x_990381_netbox_cl_devices_import_set` - NetBox devices staging
- `x_990381_netbox_cl_device_types_import_set` - NetBox device types staging  
- `x_990381_netbox_cl_netbox_sites_import` - NetBox sites staging
- `x_990381_netbox_cl_netbox_regions_import` - NetBox regions staging
- `x_990381_netbox_cl_netbox_clients_import` - NetBox tenants/clients staging
- `x_990381_netbox_cl_netbox_departments_imports` - NetBox departments staging
- `x_990381_netbox_cl_netbox_manufacturers_import` - NetBox manufacturers staging

**Configuration Tables:**
- `x_990381_netbox_cl_netbox_parameters` - Application configuration parameters
- `x_990381_netbox_cl_netbox_notification_queue` - NetBox notification queue

### Under which license should I subscribe the new tables?

**Licensing Guidance:**
- **Import Set Tables**: These are typically covered under the base ServiceNow platform license as they are temporary staging tables
- **Configuration Tables**: These tables would usually be licensed under the ITSM allotment, but can be included wherever some allotments remain
- **Extended Fields**: No additional licensing required as they extend existing licensed tables

**Recommendation**: Consult with your ServiceNow account manager for specific licensing questions, as requirements may vary based on your ServiceNow contract and usage.

## Guided Setup Issues

### I'm missing some plugins and don't have a license for them

**Required vs. Recommended Plugins:**
- **Essential Plugins** (Required):
  - IntegrationHub Starter Pack
  - System Import Sets
  - Model Management
- **Recommended Plugins** (Optional):
  - Additional IntegrationHub spokes for enhanced functionality

**Resolution Options:**
1. **Contact ServiceNow**: Request licensing for required plugins through your ServiceNow account manager
2. **PDI Users**: Activate plugins through the PDI configuration screen
3. **Alternative Approach**: Some functionality may be limited without optional plugins, but core integration will still work

### What's the purpose of manually creating an HTTP(s) connection record?

**Purpose and Importance:**
- **Application package**: This record cannot be packaged with the NetBox CMDB Integration scoped application and must therefore be created manually during the setup process
- **API Communication**: Establishes the connection between ServiceNow and your NetBox instance
- **Authentication**: Stores connection parameters and credential references
- **MID Server Support**: Configures routing through MID servers if required
- **Standardization**: Uses ServiceNow's standard HTTP connection framework for reliability

**Key Requirements:**
- **Name**: Must be exactly "NetBox API" (serves as a key for the application)
- **Connection Alias**: Must be `x_990381_netbox_cl.NetBox_API`
- **URL Format**: Must not include trailing slash

### Both our NetBox and ServiceNow instances are in the cloud but we have a MID server on premises, should I configure it in step 2.1 or 2.2 of the guided setup?

**Recommendation**: **Configure in Step 2.1** (Create the HTTP(s) connection record)

**Reasoning:**
- If both instances are in the cloud, direct communication is typically possible
- MID server configuration should only be used if network policies require it
- Step 2.2 is for optional modifications after initial setup

**Decision Factors:**
- **Network Policies**: Check if your organization requires all API traffic to route through the MID server
- **Security Requirements**: Some organizations mandate MID server usage for all external connections
- **Performance**: Direct cloud-to-cloud communication is typically faster

**Testing Approach**: Try without MID server first, then add it in Step 2.2 if connection tests fail.

### The connection test keeps failing, how do I troubleshoot connections?

**Systematic Troubleshooting:**

1. **Verify Basic Connectivity**
   - Check for firewall restrictions between instances
   - Verify DNS resolution of NetBox hostname

2. **Check API Token Format**
   - Ensure API token is exactly 32 hexadecimal characters
   - Verify token is active in NetBox
   - Test token manually using curl or Postman

3. **Validate Connection Record**
   - Confirm connection name is exactly "NetBox API"
   - Verify URL has no trailing slash
   - Check credential association is correct

4. **Review Network Configuration**
   - Check MID server configuration if applicable
   - Verify proxy settings if required
   - Test from ServiceNow's network diagnostic tools

5. **Check Logs**
   - Review ServiceNow system logs for detailed error messages
   - Check NetBox logs for incoming connection attempts
   - Look for authentication or authorization errors

## Application Parameters

### What are the important Application parameters to know about initially?

**Critical Parameters for Initial Setup:**

| Parameter | Purpose | Default Value |
|-----------|---------|---------------|
| **NetBox Log Level** | Controls application logging verbosity | Medium |
| **API user in NetBox** | Username for ServiceNow→NetBox API calls | servicenow_integration |
| **API user in ServiceNow** | Username for NetBox→ServiceNow API calls | netbox_integration |
| **Import [Object Types]** | Enable/disable synchronization from NetBox to ServiceNow (import direction) for specific objects | false |
| **Export [Object Types]** | Enable/disable synchronization from ServiceNow to NetBox (export direction) for specific objects | false |

**Navigation**: Go to **All > NetBox > Configuration > Parameters** to view and modify these settings.

### What are the Synchronize and Sync direction parameters used for?

**Synchronize Parameters** (Boolean - true/false):
- **Purpose**: Not used

**Sync Direction Parameters** (String values):
- **Purpose**: Not used


### How can I tell the application to increase the logging level?

**Steps to Increase Logging:**

1. **Navigate to Parameters**
   - Go to **All > NetBox > Configuration > Parameters**
   - Find the "NetBox Log Level" parameter

2. **Available Log Levels** (case insensitive):
   - **None**: No logging
   - **Low**: Basic operational messages
   - **Medium**: Moderate detail including warnings (default)
   - **High**: Detailed debug information

3. **Change Log Level**
   - Edit the "NetBox Log Level" parameter
   - Set value to "High" for maximum detail
   - Save the parameter

4. **View Logs**
   - Check **All > NetBox > Maintenance > NetBox Logs** for NetBox-related entries

### What are the NetBox Tenant Group ID parameters used for?

**Purpose**: These parameters map NetBox tenant groups to ServiceNow organizational structures.

**Key Parameters:**
- **NetBox Tenant Group ID for Customers**: Maps NetBox tenants to ServiceNow customer companies
- **NetBox Tenant Group ID for Departments**: Maps NetBox tenants to ServiceNow departments

**Usage:**
- **Import**: Only tenants belonging to specified tenant groups are imported into Companies or Departments tables
- **Export**: ServiceNow records are assigned to these tenant groups in NetBox
- **Format**: Integer value representing the NetBox tenant group ID

**Configuration**: Set these during guided setup or modify in the Parameters table.

### Why do some parameters have a value of "Not used"?

**Explanation**: Parameters with "Not used" values are **placeholders for future functionality**.

**Examples:**
- Role ID parameters for specific CI classes (Server, IP Switch, Virtualization Server)
- Features planned for future releases but not yet implemented

**Current Behavior**:
- These parameters are ignored by the current application logic
- "Role ID - Generic" is used instead for all device types
- No action required from users

**Future Updates**: These parameters will become functional in future application releases.

### Why not use the sys_properties table instead of a custom table for parameters?

**Design Rationale:**

**Advantages of Custom Table:**
- **Scoped Isolation**: Parameters are contained within the application scope
- **Enhanced Metadata**: Supports detailed descriptions and ordering
- **Guided Setup Integration**: Easier integration with setup wizards
- **Backup/Restore**: Parameters are included in application update sets
- **Security**: Scoped access controls

**Limitations of sys_properties:**
- Global scope could cause conflicts
- Limited metadata support
- More complex guided setup integration
- Potential interference with other applications

### What is the nbk parameter for?

**Purpose**: The `nbk` parameter is a **temporary administrative credential** used during the guided setup process.

**Details:**
- **Temporary Nature**: Created during guided setup and automatically deleted afterward
- **Elevated Privileges**: Provides admin-level access to NetBox for configuration
- **Security**: Ensures only low-privilege accounts remain after setup completion
- **Usage**: Enables ServiceNow to configure NetBox settings during initial setup

**Important**: This parameter should not exist after guided setup completion. If it persists, it may indicate an incomplete setup process. If you think the setup has concluded normally, you can and should delete the parameter from the table.

## Operations

### Data is not getting synchronized between ServiceNow and NetBox

**Troubleshooting Steps:**

1. **Check Synchronization Parameters**
   - Verify "Export [Object]" parameters are set to `true`
   - Check that specific records have "NetBox Synchronize" field set to `true`

2. **Verify Connection Health**
   - Test API connectivity in both directions by navigating to **All >`NetBox > Maintenance > Test connections**
   - Check credential validity and expiration
   - Review HTTP connection record configuration

3. **Review Flow Execution**
   - Check **All > Process Automation > Flow Designer > Executions**
   - Look for failed or stuck flow executions
   - Review error messages in execution logs
   - Increase NetBox Log Level parameter if logs are not verbose enough

4. **Check Import Set Processing**
   - Navigate to **All > System Import Sets > Import Sets**
   - Verify import sets are being created and processed
   - Check for transformation errors

5. **Check Data Sources**
   - Navigate to **All > NetBox > Configuration > Data Sources**
   - Verify that data sources don't contain more than one attachment
   - Verify that the NetBox Buffer data source is being gradually emptied over time

6. **Validate Data Requirements**
   - Ensure required fields are populated
   - Check for data validation failures
   - Verify correlation IDs are properly set

### Data is not getting synchronized between NetBox and ServiceNow

**Specific NetBox→ServiceNow Issues:**

1. **Verify Connection Health**
   - Test API connectivity in both directions by navigating to **All >`NetBox > Maintenance > Test connections**
   - Check credential validity and expiration
   - Review HTTP connection record configuration

2. **Webhook Configuration**
   - Verify NetBox webhooks are properly configured
   - Check webhook URL points to correct ServiceNow instance
   - Confirm webhook authentication credentials

3. **NetBox Event Rules**
   - Ensure event rules are active in NetBox
   - Verify event rules trigger on appropriate object changes
   - Check event rule conditions and actions

4. **ServiceNow Inbound Processing**
   - Check **All > System Web Services > Inbound > REST Messages**
   - Review inbound API call logs
   - Verify authentication is successful

5. **Import Processing**
   - Check import set creation from NetBox data
   - Review transformation map execution
   - Verify target table updates

### How do I pause synchronization between systems, one way or another?

**Temporary Pause Options:**

**Option 1: Disable Synchronization Parameters**
- Navigate to **All > NetBox > Configuration > Parameters**
- Set "Import [Object]" and "Export [Object]" parameters to `false` for affected object types
- This stops all synchronization for those objects

**Option 2: Record-Level Control**
- Set "NetBox Synchronize" field to `false` on specific records
- This provides granular control over individual items

**Option 3: Connection Disruption** (Emergency only)
- Modify HTTP connection record to invalid URL
- Remove or invalidate API credentials
- **Warning**: This may cause errors in logs

**Resuming Synchronization:**
- Reverse the changes made during pause
- Verify connection tests pass
- Monitor initial synchronization for any issues

**Best Practice**: Use Option 1 (parameter-based) for planned maintenance, as it's the cleanest approach and doesn't generate error messages.

### I'm getting duplicate records in ServiceNow or NetBox

Duplicate records can occur during synchronization due to various factors such as data inconsistencies or identification rule challenges.

**Mitigation Steps**:

1. **Review Correlation IDs**
   - Check that NetBox Correlation ID fields are properly populated
   - Verify correlation IDs are unique and consistent between systems

2. **Manual Cleanup**
   - Identify duplicate records
   - Manually merge or delete duplicates as appropriate
   - Document patterns for NetBox Labs support

**Future Improvements**: NetBox Labs is developing enhanced IRE rules and automated deduplication capabilities that will be included in future releases to minimize this issue.
