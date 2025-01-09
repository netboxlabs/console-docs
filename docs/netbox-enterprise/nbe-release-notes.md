# NetBox Enterprise 1.x Release Notes

### 1.4.2

A re-release of 1.4.1 with a fix that makes sure plugin versions
that are only compatible with NetBox 4.1 are not included.

#### Features

* *netbox:* update to latest 4.0.x-compatible plugins (ENG-3923)

#### Plugins

The following plugins are included in this release:

| Plugin | Version | Certified |
| ------ | ------- | --------- |
| nbrisk | 40.0.1 | ☐ |
| netbox-acls | 1.6.1 | ☐ |
| netbox-bgp | 0.13.3 | ☑︎ |
| netbox-config-diff | 2.7.0 | ☐ |
| netbox-documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | 0.4.1 | ☑︎ |
| netbox-interface-synchronization | 4.1.4 | ☐ |
| netbox-inventory | 2.0.2 | ☐ |
| netbox-lifecycle | 1.0.4 | ☐ |
| netbox-plugin-dns | 1.1.5 | ☑︎ |
| netbox-qrcode | 0.0.14 | ☑︎ |
| netbox-reorder-rack | 1.1.3 | ☐ |
| netbox-secrets | 2.0.3 | ☐ |
| netbox-topology-views | 4.0.1 | ☑︎ |
| netbox-validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | 0.3.0 | ☐ |
| phonebox-plugin | 0.0.9 | ☐ |
| slurpit_netbox | 0.9.84 | ☑︎ |

### 1.4.1

A small release with some dependency updates and the latest set
of NetBox 4.0-compatible plugins.

#### Features

* *deps:* update bitnami-common and netbox oss charts
* *netbox:* update to latest 4.0.x-compatible plugins (ENG-3794)

#### Plugins

The following plugins are included in this release:

| Plugin | Version | Certified |
| ------ | ------- | --------- |
| nbrisk | 41.0.1 | ☐ |
| netbox-acls | 1.7.0 | ☑︎ |
| netbox-bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | 2.7.0 | ☐ |
| netbox-documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | 0.4.1 | ☑︎ |
| netbox-interface-synchronization | 4.1.4 | ☐ |
| netbox-inventory | 2.1.0 | ☐ |
| netbox-lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | 1.1.5 | ☑︎ |
| netbox-qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | 1.1.3 | ☐ |
| netbox-secrets | 2.1.0 | ☐ |
| netbox-topology-views | 4.1.0 | ☑︎ |
| netbox-validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | 0.6.0 | ☑︎ |
| phonebox-plugin | 0.0.10 | ☐ |
| slurpit_netbox | 1.0.33 | ☑︎ |

### 1.4.0

Adds support for supplying custom environment variables (eg, for LDAP config).
It also contains a small auth change to allow curly braces and spaces in the new password validator.

A number of included plugins were updated to their latest compatible versions:
* `netbox_bgp` was updated to 0.13.3
* `netbox_floorplan_plugin` was updated to 0.4.1
* `netbox_plugin_dns` was updated to 1.1.3
* `netbox_topology_views` was updated to 4.0.1
* `slurpit_netbox` was updated to 0.9.84

### 1.3.0

Compatible with any standard Kubernetes ingress controller now in KOTS installs, rather than only Nginx.
Also fixes a potential data loss issue with uploaded images, as well as enabling script and report uploads.

### 1.2.0

Improves ingress configuration, adds support for inheriting the TLS configuration from the Embedded Cluster, and adds a "restore mode" for restoring manual backup data, plus many dependency updates and internal improvements.

### 1.1.0

Simplifies the firewall configuration necessary for installation by making sure all initialization downloads go through our proxy domain.

### 1.0.6

Adds support for NetBox resource usage adjustment and some improvements to startup time on a first install.

It also adds support for backup and restore in the Embedded Cluster and KOTS installs, depending on your environment and license.

### 1.0.5

Adds support for KOTS installs to scrape Prometheus metrics from NetBox, as well as the embedded PostgreSQL, Redis, and SeaweedFS if they are enabled.

Updated to support NetBox v4.0.9, and includes additional bug fixes and startup time improvements.

### 1.0.4

Adds OWASP password complexity validation to NetBox, and includes dependency updates.

### 1.0.3

Fixes issues with preflight checks, and includes minor dependency updates.

### 1.0.2

Provides a number of dependency updates and bug fixes, and includes initial support for backups of built-in Redis and PostgreSQL.

### 1.0.1

Provides bug fixes encountered during the initial rollout of the NetBox Enterprise application.

### 1.0.0

Provides final cleanup of the Beta stream in preparation for the wider release.

Provides a number of internal changes, and includes fixes for an issue where annotations could render improperly and cause problems with upgrades.
Updated to support NetBox v4.0.7.