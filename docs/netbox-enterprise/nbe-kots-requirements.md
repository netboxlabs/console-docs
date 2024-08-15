# NetBox Enterprise KOTS Requirements

### System requirements

To install NetBox Enterprise on an existing cluster, the cluster must meet the following requirements:

#### NetBox Enterprise minimum requirements

Like an embedded cluster install, we recommend the following _minimum_ system requirements for a deployment of NetBox Enterprise running two replicas. For larger environments with more replicas, additional resources should be allocated.

- 4 Virtual CPU (vCPU)
- 8 GB Memory (RAM)
- 40 GB unallocated cluster disk space

#### Supported operating systems

The following are the supported operating systems for nodes:

- Linux AMD64
- Linux ARM64

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