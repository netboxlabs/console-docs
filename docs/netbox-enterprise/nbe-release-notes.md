# NetBox Enterprise 1.x Release Notes

## 1.4.0

Adds support for supplying custom environment variables (eg, for LDAP config).
It also contains a small auth change to allow curly braces and spaces in the new password validator.

A number of included plugins were updated to their latest compatible versions:
* `netbox_bgp` was updated to 0.13.3
* `netbox_floorplan_plugin` was updated to 0.4.1
* `netbox_plugin_dns` was updated to 1.1.3
* `netbox_topology_views` was updated to 4.0.1
* `slurpit_netbox` was updated to 0.9.84


## 1.3.0

Compatible with any standard Kubernetes ingress controller now in KOTS installs, rather than only Nginx.
Also fixes a potential data loss issue with uploaded images, as well as enabling script and report uploads.

## 1.2.0

Improves ingress configuration, adds support for inheriting the TLS configuration from the Embedded Cluster, and adds a "restore mode" for restoring manual backup data, plus many dependency updates and internal improvements.

## 1.1.0

Simplifies the firewall configuration necessary for installation by making sure all initialization downloads go through our proxy domain.

## 1.0.6

Adds support for NetBox resource usage adjustment and some improvements to startup time on a first install.

It also adds support for backup and restore in the Embedded Cluster and KOTS installs, depending on your environment and license.

## 1.0.5

Adds support for KOTS installs to scrape Prometheus metrics from NetBox, as well as the embedded PostgreSQL, Redis, and SeaweedFS if they are enabled.

Updated to support NetBox v4.0.9, and includes additional bug fixes and startup time improvements.

## 1.0.4

Adds OWASP password complexity validation to NetBox, and includes dependency updates.

## 1.0.3

Fixes issues with preflight checks, and includes minor dependency updates.

## 1.0.2

Provides a number of dependency updates and bug fixes, and includes initial support for backups of built-in Redis and PostgreSQL.

## 1.0.1

Provides bug fixes encountered during the initial rollout of the NetBox Enterprise application.

## 1.0.0

Provides final cleanup of the Beta stream in preparation for the wider release.

Provides a number of internal changes, and includes fixes for an issue where annotations could render improperly and cause problems with upgrades.
Updated to support NetBox v4.0.7.