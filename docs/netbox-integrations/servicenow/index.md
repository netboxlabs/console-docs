---
tags:
  - cloud
  - enterprise
  - community
  - administration
  - operations
  - installation
  - configuration
  - troubleshooting
  - integration
title: Index
---

## ServiceNow Integration Overview

The **NetBox ServiceNow Integration** provides API and CMDB integration capabilities between ServiceNow and NetBox instances. This application enables bidirectional synchronization of infrastructure data, allowing organizations to maintain consistent configuration management data across both platforms.

**ServiceNow Compatibility**: Certified for Washington DC and Xanadu versions.

### Key Features

- **Bidirectional Synchronization**: Synchronize configuration items between ServiceNow CMDB and NetBox
- **Automated Data Import**: Import NetBox objects (devices, device types, sites, locations, etc.) into ServiceNow through import sets
- **Real-time Integration**: API-based integration for real-time data exchange
- **Data Validation**: Built-in validation and correlation mechanisms to ensure data integrity
- **Extensible Architecture**: Modular design using ServiceNow Flow Designer and Integration Hub actions
- **Security Integration**: Role-based access controls and secure API communication

### NetBox to ServiceNow Object Mapping

The following table shows the supported NetBox objects and their corresponding destinations in ServiceNow:

| NetBox Object | ServiceNow Destination | Mapping Details |
|---------------|------------------------|-----------------|
| **Device** | Configuration Item (cmdb_ci) | Mapped to appropriate CI class based on device role and type |
| **Device Type** | Hardware Product Model (cmdb_hardware_product_model) | Device specifications, manufacturer, and model information |
| **Site** | Location (cmn_location) | Physical site information and geographical data |
| **Region** | Location (cmn_location) | Geographic regions as top-level locations |
| **Manufacturer** | Company (core_company) | Vendor/manufacturer information |
| **Tenant** | Department (cmn_department) | Organizational units and client information |
| **Device Role** | CI Classification | Maps to ServiceNow CI classification and categories |

### Business Value

- Centralized configuration management across multiple platforms
- Reduced manual data entry and associated errors
- Improved visibility into infrastructure assets
- Enhanced change management processes
- Streamlined compliance reporting


### Technical Architecture

The application is built as a ServiceNow scoped application (`x_990381_netbox_cl`) and includes:

- Custom tables for NetBox data import staging
- Extended ServiceNow CMDB tables with NetBox-specific fields
- Flow Designer flows for automated synchronization processes
- Integration Hub spokes for NetBox API connectivity
- Business rules and UI actions for user interaction

## Obtaining the Application

The NetBox CMDB Integration application is currently distributed as XML update sets. To obtain the application:

### Prerequisites

Before requesting the application, ensure your organization meets the following requirements:

- **ServiceNow Integration Purchased**: Purchased the ServiceNow Integration from NetBox Labs
- **ServiceNow Instance**: Active ServiceNow instance with appropriate licensing
- **NetBox Environment**: Operational NetBox instance with API access
- **Administrator Access**: ServiceNow administrator privileges for application installation
- **ServiceNow MID Server (NetBox Enterprise Only)**: MID server installed on-prem to handle communication between ServiceNow and NetBox Enterprise

### Obtaining Access

1. **Contact NetBox Labs**: Reach out to your NetBox Labs support team or account manager
2. **Request Access**: Submit a request for the NetBox CMDB Integration application for ServiceNow
3. **Receive Update Set**: NetBox Labs will provide you with the XML update set file(s)


## Version Information
- **Application Version**: 1.4
- **Dependencies**: 
  - System Import Sets
  - Model Management
  - Configuration Management (CMDB)
  - System (apps/system_user)
