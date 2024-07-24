# NetBox Extensions

## Diode

!!! info "Currently in Public Preview"

    The Diode project is currently in _Public Preview_. Please see [NetBox Labs Product and Feature Lifecycle](https://docs.netboxlabs.com/product_feature_lifecycle/) for more details.

## Overview 

Diode is a NetBox data ingestion service that aims to simplify and enhance the process to add and update network data in NetBox. The guiding principle behind Diode is to make it as easy as possible to get data into NetBox by removing as much burden as possible from the user while shifting that effort to technology.

Diode is a sidecar service to NetBox that provides a gRPC/protobuf API designed for ingestion of common NetBox data models. Diode reduces the need to preprocess data to make it conform to the strict object hierarchy imposed by the NetBox data model. This allows data to be sent to NetBox in a more freeform manner, in blocks that are intuitive for network engineers such as by device or by interface. Related information is treated as attributes or properties of these blocks. Diode takes care of the heavy lifting of transforming this data to make it align with NetBox’s structured and comprehensive data model. Diode will create placeholder objects to compensate for missing information, allowing fragmented or incomplete information about the network to be collected.

## Supported versions of NetBox

Diode has been tested with NetBox versions 3.7.2 and above.

## Diode components

There are three required components to the Diode service:

1. **Diode NetBox plugin** - This component provides API key management and ORM integration into NetBox for the Diode server. See how to [install the Diode plugin](https://github.com/netboxlabs/diode-netbox-plugin).
2. **Diode server** - This component provides the ingestion and reconciliation services that process the incoming data. See how to [run the Diode server](https://github.com/netboxlabs/diode/tree/develop/diode-server#readme).
3. **Diode client** - This component receives the data to be ingested and forwards that data as gRPC/protobuf to the Diode server. It is implemented as an SDK and can be embedded in scripts and integrations. See how to [install the Diode Python SDK](https://github.com/netboxlabs/diode-sdk-python).

## Additional resources

Additional resources including example scripts can be found in the NetBox Labs [NetBox Learning repository](https://github.com/netboxlabs/netbox-learning/tree/develop/diode).