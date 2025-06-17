---
title: NetBox Enterprise KOTS Requirements
tags:
  - netbox-enterprise
---# NetBox Enterprise KOTS Requirements

### System requirements

To install NetBox Enterprise on an existing cluster, the cluster must meet the following requirements:

#### Recommended cluster requirements

The following are the _recommended_ system requirements for a **production** deployment of NetBox Enterprise running two replicas. For larger environments with more replicas, additional resources should be allocated.

- 8 Virtual CPU (vCPU)
- 24 GB Memory (RAM)
- 100 GB SSD free disk space in `/var/lib`

!!! note 
    For **non-production** deployments of NetBox Enterprise, the _minimum_ system requirements can be reduced to 4 Virtual CPU (vCPU) and 16 GB Memory (RAM). All other requirements remain the same.


#### Supported operating systems

The following are the supported operating systems for nodes:

- Linux AMD64

#### Available StorageClass

The cluster must have an existing StorageClass available. KOTS creates the required stateful components using the default StorageClass in the cluster.

#### Kubernetes version compatibility

KOTS installation of NetBox Enterprise is supported on most common Kubernetes clusters, running v1.27 or higher.

#### Port forwarding

To support port forwarding, Kubernetes clusters require that the SOcket CAT (socat) package is installed on each node.

### RBAC Requirements

The user that runs the installation command must have at least the minimum role-based access control (RBAC) permissions that are required by KOTS. If the user does not have the required RBAC permissions, then an error message displays: `Current user has insufficient privileges to install Admin Console`.

The required RBAC permissions vary depending on if the user attempts to install KOTS with cluster-scoped access or namespace-scoped access:

- Cluster-scoped RBAC Requirements (Default)
- Namespace-scoped RBAC Requirements

#### Cluster-scoped RBAC Requirements (Default)

By default, KOTS requires cluster-scoped access. With cluster-scoped access, a Kubernetes ClusterRole and ClusterRoleBinding are created that grant KOTS access to all resources across all namespaces in the cluster.

To install KOTS with cluster-scoped access, the user must meet the following RBAC requirements:

- The user must be able to create workloads, ClusterRoles, and ClusterRoleBindings.
- The user must have cluster-admin permissions to create namespaces and assign RBAC roles across the cluster.

#### Namespace-scoped RBAC Requirements

KOTS can be installed with namespace-scoped access rather than the default cluster-scoped access. With namespace-scoped access, a Kubernetes Role and RoleBinding are automatically created that grant KOTS permissions only in the namespace where it is installed. Please contact us for more details.