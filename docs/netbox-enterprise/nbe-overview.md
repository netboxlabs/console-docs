# NetBox Enterprise

## Overview

NetBox Enterprise is a distribution of NetBox built by NetBox Labs for organizations deploying NetBox in their own infrastructure. NetBox Enterprise users gain a simplified installation and upgrade process, as well as advanced features and integrations not available in the community editon of NetBox.

<!--
## Deployment

NetBox Enterprise supports two different deployment models to best address varying requirements and environments.
-->

The NetBox Enterprise installer provides a fully managed, hands-off installation experience for installing NetBox Enterprise, including deploying and managing an underlying Kubernetes cluster.
A bare Linux operating system with adequately sized compute resources is the only requirement.

NetBox Enterprise installer deployments deliver all the components and dependencies required to deploy and operate NetBox, including databases, application servers, application load balancers, and object stores.
This deployment still provides the flexibility of leveraging external components, such as a PostgreSQL cluster or a Redis key-value store.

See the [NetBox Enterprise Installation](nbe-ec-installation.md) guide for more details.

<!--
### KOTS installation

The Kubernetes Off-The-Shelf (KOTS) installation provides a more customizable installation experience of NetBox Enterprise. For organizations that are  operating their own Kubernetes environments, the KOTS installation enables them to deploy NetBox in their own k8s cluster. KOTS deployments include all the necessary components and take care of all the dependencies just like NetBox Enterprise installer deployments. They also provide the same flexibility in leveraging external components, such as a PostgreSQL cluster or an S3 Object Store.

See the [NetBox Enterprise KOTS Installation](nbe-kots-installation.md) guide for more details.
-->