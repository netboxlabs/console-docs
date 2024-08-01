# NetBox Enterprise KOTS Requirements

### System requirements

To install NetBox Enterprise on an existing cluster, the cluster must meet the following requirements:

#### Admin console minimum requirements

Existing clusters that have LimitRanges specified must support the following minimum requirements for the Admin Console:

- **CPU resources and memory**: The Admin Console pod requests 100m CPU resources and 100Mi memory
- **Disk space**: The Admin Console requires a minimum of 5GB of disk space on the cluster for persistent storage, including 4GB for S3-compatible object store
- **1GB for rqlite PersistentVolume**: The Admin Console requires 1GB for a rqlite StatefulSet to store version history, application metadata, and other small amounts of data needed to manage the application

#### Supported operating systems

The following are the supported operating systems for nodes:

- Linux AMD64
- Linux ARM64

#### Available StorageClass

The cluster must have an existing StorageClass available. KOTS creates the required stateful components using the default StorageClass in the cluster.

#### Kubernetes version compatibility

The version of Kubernetes running on the cluster must be compatible with the version of KOTS:

|KOTS Versions          |Kubernetes Compatibility|
|---                    |---                     |
|v1.105.2 and later     |v1.29, v1.28, v1.27     |
|v1.102.1 to v1.105.1   |v1.28, v1.27            |
|v1.100.0 to v1.102.0   |v1.27                   |  

<!--
#### OpenShift version compatibility

For Red Hat OpenShift clusters, the version of OpenShift must use a supported Kubernetes version.
-->

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