# Diode

!!! info "Currently in Public Preview"

    The Diode project is currently in _Public Preview_. Please see [NetBox Labs Product and Feature Lifecycle](https://docs.netboxlabs.com/product_feature_lifecycle/) for more details.

## Overview 

Diode is a NetBox data ingestion service that aims to simplify and enhance the process to add and update network data in NetBox. The guiding principle behind Diode has been to make it as easy as possible to get data into NetBox, removing as much burden as possible from the user while shifting that effort to technology.

Diode is a sidecar service to NetBox that provides a gRPC/protobuf API designed for ingestion of common NetBox data models. Diode reduces the need to preprocess data to make it conform to the strict object hierarchy imposed by the NetBox data model. This allows data to be sent to NetBox in a more freeform manner, in blocks that are intuitive for network engineers such as by device or by interface. Related information is treated as attributes or properties of these blocks. Diode takes care of the heavy lifting of transforming this data to make it align with NetBox's structured and comprehensive data model. Diode will create placeholder objects to compensate for missing information, allowing fragmented or incomplete information about the network to be collected.

## Prerequisites

* NetBox 4.2.3 or later
* Python 3.8 or later (for Python SDK)
* Go 1.18 or later (for Go SDK)
* Network connectivity between Diode and NetBox

## Components

There are several components that make up the Diode ecosystem:

1. **Diode Server** - The core service that provides ingestion and reconciliation services. See [deployment instructions](https://github.com/netboxlabs/diode/tree/develop/diode-server#readme).

2. **Diode NetBox Plugin** - Required component that provides API key management and ORM integration into NetBox. See [installation instructions](https://github.com/netboxlabs/diode-netbox-plugin).

3. **Data Ingestion Methods**:
   * **NetBox Discovery Agent** - Automated network discovery using the Orb agent
   * **SDK Integrations**:
     * [Python SDK](https://github.com/netboxlabs/diode-sdk-python)
     * [Go SDK](https://github.com/netboxlabs/diode-sdk-go)

## Quick Start

For a quick step-by-step guide, see our [Getting Started Guide](diode-get-started.md).

## Additional Resources

* [Diode Protocol Documentation](https://github.com/netboxlabs/diode/tree/develop/diode-proto)
* Example scripts and tutorials can be found in the NetBox Labs [NetBox Learning repository](https://github.com/netboxlabs/netbox-learning/tree/develop/diode)

## Support

* [GitHub Issues](https://github.com/netboxlabs/diode/issues)
* Slack NetDev Community (#orb channel)