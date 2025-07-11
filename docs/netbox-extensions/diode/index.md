# Diode

Diode is a data ingestion service for NetBox that greatly simplifies and enhances the process of adding and updating data in NetBox, ensuring your network source of truth is always accurate and up to date. Our guiding principle in designing Diode has been to make it as easy as possible to get data into NetBox, removing as much burden as possible from the user while shifting that effort to technology.

## Project Status

The Diode project is currently in the _Public Preview_ stage. Please see [NetBox Labs Product and Feature Lifecycle](https://netboxlabs.com/docs/console/product_feature_lifecycle/) for more details. We actively welcome feedback to help identify and prioritize bugs, new features and areas of improvement.

## Prerequisites

- NetBox 4.2.3 or later
- Python 3.8 or later (for Python SDK)
- Go 1.18 or later (for Go SDK)
- Network connectivity between Diode and NetBox

## Quick Start

For a quick step-by-step guide, see our [Getting Started Guide](getting-started.md).

1. **Deploy the Diode Server**
   See [deployment instructions](https://github.com/netboxlabs/diode/blob/develop/diode-server/README.md)

2. **Install the Diode NetBox Plugin**
   See [installation instructions](https://github.com/netboxlabs/diode-netbox-plugin/blob/develop/README.md)

3. **Choose Your Data Ingestion Method**
   - Use the NetBox Discovery agent for automated network discovery: see [instructions to run Orb agent](https://github.com/netboxlabs/orb-agent)
   - Build custom integrations using our SDKs:
     - [Python SDK](https://github.com/netboxlabs/diode-sdk-python)
     - [Go SDK](https://github.com/netboxlabs/diode-sdk-go)

## Documentation

- [Diode Protocol Documentation](protobuf/diode-proto.md)
- [Metrics](observability/metrics.md)
- Example scripts and tutorials can be found in the NetBox Labs [NetBox Learning repository](https://github.com/netboxlabs/netbox-learning/tree/develop/diode)

## Related Projects

- [Orb Agent](https://github.com/netboxlabs/orb-agent): Network discovery agent that uses Diode for data ingestion
- [Diode NetBox Plugin](https://github.com/netboxlabs/diode-netbox-plugin): Required NetBox plugin for Diode integration
- [Diode Protocol](https://github.com/netboxlabs/diode/tree/develop/diode-proto): Protocol definitions for Diode

## Community & Support

- [GitHub Issues](https://github.com/netboxlabs/diode/issues)
- [NetBox Community Slack](https://netdev.chat/) - Join the `#orb` channel

## License

Diode is released under the [NetBox Limited Use License 1.0](https://github.com/netboxlabs/diode/blob/develop/LICENSE.md).