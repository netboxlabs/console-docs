# Protocol Documentation

This document describes the Diode protocol buffer definitions used for data ingestion and communication between Diode services and NetBox.

## Overview

The Diode protocol is defined using Protocol Buffers (protobuf) and includes definitions for all major NetBox data models including:

- **Network Infrastructure**: Devices, Interfaces, Cables, Circuits
- **IP Management**: IP Addresses, Prefixes, Aggregates, VLANs
- **Data Center**: Racks, Locations, Sites, Clusters
- **Virtualization**: Virtual Machines, Clusters, Platforms
- **Organization**: Tenants, Contacts, Providers

## Service Definition

The main service endpoint is defined as:

```protobuf
service IngesterService {
  // Ingest data entities into NetBox
  rpc Ingest(stream IngestRequest) returns (stream IngestResponse);
}
```

## Core Message Types

### IngestRequest

The primary message type for sending data to Diode:

```protobuf
message IngestRequest {
  // Unique identifier for the data source
  string data_source_id = 1;
  
  // Entity being ingested
  Entity entity = 2;
}
```

### Entity

Wrapper for all supported NetBox entities:

```protobuf
message Entity {
  oneof entity {
    // DCIM entities
    Site site = 1;
    Location location = 2;
    Device device = 3;
    Interface interface = 4;
    Cable cable = 5;
    
    // IPAM entities
    Prefix prefix = 6;
    IPAddress ip_address = 7;
    VLAN vlan = 8;
    
    // Circuits entities
    Circuit circuit = 9;
    CircuitTermination circuit_termination = 10;
    
    // Tenancy entities
    Tenant tenant = 11;
    
    // Virtualization entities
    VirtualMachine virtual_machine = 12;
    
    // And many more...
  }
}
```

## Data Models

### Core Infrastructure

#### Site
Represents a physical location or facility:

```protobuf
message Site {
  string name = 1;
  string slug = 2;
  string status = 3;
  string description = 4;
  string facility = 5;
  repeated string tags = 6;
  map<string, CustomFieldValue> custom_fields = 7;
}
```

#### Device
Represents a network device:

```protobuf
message Device {
  string name = 1;
  string device_type = 2;
  string site = 3;
  string location = 4;
  string role = 5;
  string platform = 6;
  string serial = 7;
  string asset_tag = 8;
  string status = 9;
  repeated string tags = 10;
  map<string, CustomFieldValue> custom_fields = 11;
}
```

#### Interface
Represents a network interface:

```protobuf
message Interface {
  string device = 1;
  string name = 2;
  string type = 3;
  string description = 4;
  string mac_address = 5;
  bool enabled = 6;
  int32 mtu = 7;
  repeated string tags = 8;
  map<string, CustomFieldValue> custom_fields = 9;
}
```

### IP Address Management

#### Prefix
Represents an IP prefix:

```protobuf
message Prefix {
  string prefix = 1;
  string status = 2;
  string vrf = 3;
  string tenant = 4;
  string site = 5;
  string role = 6;
  string description = 7;
  repeated string tags = 8;
  map<string, CustomFieldValue> custom_fields = 9;
}
```

#### IPAddress
Represents an IP address:

```protobuf
message IPAddress {
  string address = 1;
  string status = 2;
  string vrf = 3;
  string tenant = 4;
  string description = 5;
  string dns_name = 6;
  repeated string tags = 7;
  map<string, CustomFieldValue> custom_fields = 8;
}
```

## Custom Fields

All entities support custom fields through a flexible map structure:

```protobuf
message CustomFieldValue {
  oneof value {
    string string_value = 1;
    int64 integer_value = 2;
    bool boolean_value = 3;
    double float_value = 4;
    string date_value = 5;
    string url_value = 6;
    string json_value = 7;
    repeated string multi_select_value = 8;
  }
}
```

## Response Messages

### IngestResponse

Response message containing ingestion results:

```protobuf
message IngestResponse {
  // Operation result
  string state = 1;
  
  // Entity that was processed
  Entity entity = 2;
  
  // Any errors that occurred
  repeated Error errors = 3;
}
```

## Usage Examples

### Python SDK Example

```python
from diode_sdk import DiodeClient

# Initialize client
client = DiodeClient(
    target="grpc://diode.example.com:8080/diode",
    client_id="your-client-id",
    client_secret="your-client-secret"
)

# Create a site
site = Site(
    name="New York DC",
    slug="ny-dc",
    status="active",
    description="Primary data center in New York"
)

# Ingest the site
response = client.ingest(site)
print(f"Ingestion result: {response.state}")
```

### Go SDK Example

```go
package main

import (
    "context"
    "github.com/netboxlabs/diode-sdk-go/diode"
)

func main() {
    // Initialize client
    client, err := diode.NewClient(
        "grpc://diode.example.com:8080/diode",
        "your-client-id",
        "your-client-secret",
    )
    if err != nil {
        panic(err)
    }

    // Create a device
    device := &diode.Device{
        Name:       "switch01",
        DeviceType: "cisco-catalyst-9300",
        Site:       "ny-dc",
        Status:     "active",
    }

    // Ingest the device
    response, err := client.Ingest(context.Background(), device)
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("Ingestion result: %s\n", response.State)
}
```

## References

- [Diode Protocol Repository](https://github.com/netboxlabs/diode/tree/develop/diode-proto)
- [Python SDK Documentation](https://github.com/netboxlabs/diode-sdk-python)
- [Go SDK Documentation](https://github.com/netboxlabs/diode-sdk-go)
- [Protocol Buffers Documentation](https://developers.google.com/protocol-buffers)