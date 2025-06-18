---
title: Technical Information
tags:
  - cloud
  - enterprise
  - community
---

# Technical Information


## New Tables in ServiceNow

The NetBox CMDB Integration application creates several new tables in ServiceNow for staging imported data from NetBox:

### Import Set Tables

| Table Name | Purpose | Key Fields |
|------------|---------|------------|
| `x_990381_netbox_cl_devices_import_set` | Staging table for NetBox devices | Device name, serial, asset tag, device type, site, location, status |
| `x_990381_netbox_cl_device_types_import_set` | Staging table for NetBox device types | Model, manufacturer, height, weight, specifications |
| `x_990381_netbox_cl_netbox_sites_import` | Staging table for NetBox sites | Site name, description, physical address, contact information |
| `x_990381_netbox_cl_netbox_regions_import` | Staging table for NetBox regions | Region name, description, hierarchy |
| `x_990381_netbox_cl_netbox_clients_import` | Staging table for NetBox tenants/clients | Client name, description, contact details |
| `x_990381_netbox_cl_netbox_departments_imports` | Staging table for NetBox departments | Department information and organizational structure |
| `x_990381_netbox_cl_netbox_manufacturers_import` | Staging table for NetBox manufacturers | Manufacturer name, description, contact information |
| `x_990381_netbox_cl_netbox_notification_queue` | Queue for NetBox notifications | Notification type, status, payload |
| `x_990381_netbox_cl_netbox_parameters` | Configuration parameters | Parameter name, value, description |


## Extended ServiceNow Tables

The application extends existing ServiceNow tables with NetBox-specific fields:

### Configuration Item (cmdb_ci)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_990381_netbox_cl_netbox_correlation_id` | String | Unique identifier linking ServiceNow CI to NetBox object |
| `x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if CI should be synchronized with NetBox |

### Location (cmn_location)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_990381_netbox_cl_netbox_correlation_id` | String | Unique identifier linking ServiceNow location to NetBox location |
| `x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if location should be synchronized with NetBox |
| `x_990381_netbox_cl_level` | Integer | Hierarchical level in NetBox location structure |

### Hardware Product Model (cmdb_hardware_product_model)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_990381_netbox_cl_netbox_correlation_id` | String | Links ServiceNow model to NetBox device type |
| `x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if location should be synchronized with NetBox |

### Department (cmn_department)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_990381_netbox_cl_netbox_correlation_id` | String | Links ServiceNow department to NetBox tenant |
| `x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if location should be synchronized with NetBox |

### Company (core_company)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_990381_netbox_cl_netbox_correlation_id` | String | Links ServiceNow company to NetBox organization |
| `x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if location should be synchronized with NetBox |

## Data Synchronization Flow

1. **Import Phase**: NetBox data is retrieved via API and staged in import set tables
2. **Transform Phase**: Import set processors transform and validate data according to mapping rules
3. **Load Phase**: Transformed data is inserted/updated in target ServiceNow tables
4. **Correlation Phase**: NetBox correlation IDs are maintained for bidirectional synchronization
5. **Export Phase**: ServiceNow changes are propagated back to NetBox when synchronization is enabled
