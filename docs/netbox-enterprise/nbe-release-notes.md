# NetBox Enterprise 1.x Release Notes

### 1.10.1/1.10.2

Minor releases to fix a number of issues with Diode
and Assurance integration.

#### Bug Fixes

* **db:** move postgresql permissions-setting to an init
* **diode:** backport runtime-secret script from 1.11
* **netbox:** make sure netbox refreshes when override hostname changes
* **redis:** remove redis modules no longer needed for diode

#### Features

* **config:** add hostname override to the KOTS config
* **config:** show Diode/Assurance license status in KOTS UI
* **diode:** add deployments and services for diode components in replicated-app.yaml

#### Versions

This release uses the following upstream software:

* NetBox 4.2.9
* Redis 7.4.2 (if built-in Redis is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)
* Diode 1.2.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.1.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.6 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.10.0

This in the first release to include Diode and the
NetBox Assurance plugin.

#### Features

* *cluster:* import basic diode chart
* *cluster:* only pull images if necessary
* *diode:* add diode chart dependency and enable configuration
* *diode:* add diode reconciler and ingester configuration to netbox enterprise chart
* *diode:* add proxy to diode image pull
* *diode:* auto-configure diode plugin in netbox config
* *diode:* always update the host secret
* *diode:* bump assurance plugin to 1.0.1
* *diode:* change diode/hydra to use NBE PostgreSQL
* *diode:* configure plugin based on ingress hostname
* *diode:* don't auto-apply changesets if assurance is enabled
* *diode:* generate a secret containing the external host reliably
* *diode:* wait for backend to be running before configuring the diode plugin
* *docker:* switch chart to use production (1.20.0) nbe image

#### Versions

This release uses the following upstream software:

* NetBox 4.2.9
* Redis 7.4.2 (if built-in Redis is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)
* Diode 1.2.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.0.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.4 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.9.3

Fix a bug that caused failure to download resources
in airgap and proxied environments. Also includes
an updated Branching plugin that fixes a number of
bugs.

#### Bug Fixes

* *cluster:* clean up proxy references for dependencies

#### Versions

This release uses the following upstream software:

* NetBox 4.2.9
* Redis 7.4.2 (if built-in Redis is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.1.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.6 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.9.2

Updates NetBox to 4.2.9, plus includes an update to
the cluster software which improves the handling of
upgrades.

NOTE: This update will upgrade NetBox to 4.2.9.
If you have custom plugins installed, you will need
to upgrade to NetBox Enterprise 1.9.2 and then create
a new wheelhouse that contains plugins compatible
with 4.2.9.

Please review the [upstream NetBox release
notes](https://github.com/netbox-community/netbox/releases)
from your current version through 4.2.9 for a
complete list of breaking changes, enhancements,
and bug fixes.

#### Features

* **cluster:** bump to 2.4.0
* **netbox:** bump to NetBox 4.2.9

#### Versions

This release uses the following upstream software:
* NetBox 4.2.9
* Redis 7.4.2 (if built-in Redis is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.1 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.4 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.9.1

A minor release that contains build process updates
under the covers, plus the Python XML fixes introduced
in NetBox Enterprise 1.8.6.

#### Versions

This release uses the following upstream software:
* NetBox 4.2.6
* Redis 7.4.2 (if built-in Redis is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.1 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.4 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.9.0

Updates the embedded NetBox to 4.2.6. Also upgrades
a number of dependencies to their latest versions,
adds some extra system consistency validation checks,
and reduces the number of proxied domains necessary to
install NetBox Enterprise.

#### Bug Fixes

* **netbox:** update to docker image with pydantic fix (NBE-185)
* add exit statements for better error handling in configmap-executable.yaml
* adjust formatting in cronjob-backup-labeler.yaml for consistency
* remove branch reference for command bar disabling from CI workflow and update Docker image tag
* remove unnecessary conditional for nodeSelector in cronjob-backup-labeler.yaml
* replace hardcoded imagePullPolicy with configurable value in cronjob-backup-labeler.yaml
* restore TTL and backoff limit in backup labeler CronJob configuration
* update Docker image tag to indicate command bar disabling
* update imagePullPolicy to 'IfNotPresent' in cronjob-backup-labeler.yaml
* update system validation query to use jq and change backup labeler image to netboxlabs/nbe-utils:latest
* update system validation query image version to netboxlabs/nbe-utils:1

#### Features

* add CronJob for netbox sidecar task to do system validation
* add system validation check CronJob with service account and role binding
* add TTL and backoff limit to backup labeler CronJob configuration
* **cluster:** add settings for the improved proxy support
* **cluster:** update to 2.3.1
* **config:** create some macros for nbe-utils and replace busybox
* **deps:** update pgo to 5.7.4, replicated-sdk to 1.5.0
* increase replicas for postgres instance to improve availability
* **netbox:** bump to netbox 4.2.6 and ensure versions are correct
* rename replicas_node_count to node_count for consistency in postgres configuration
* update backup labeler configuration with TTL and backoff limit
* update backup labeler to routines labeler and improve system validation error handling
* update dependencies in Chart.lock for netbox-enterprise
* update netbox sidecar CronJob to run every 5 minutes and improve error handling
* update postgres replica configuration to use dynamic node count

#### Versions

This release uses the following upstream software:
* NetBox 4.2.6
* Redis 7.4.2 (if built-in Redis is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.1 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.4 | ☑︎ |

### 1.8.6

Contains a fix for mismatched XML modules used by
some 3rd-party plugins.

#### Bug Fixes

* *docker:* ignore low-priority trivy warning about KOTS dep
* *docker:* make sure lxml and xmlsec match (NBE-193)

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.5

Contains a fix for upgrades freezing in some situations.

#### Bug Fixes

* *cluster:* remove unnecessary repository entry in ingress-nginx config

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.4

Provides a number of updates to custom plugin
installation, as well as other small enhancements
and bug fixes, included in the 1.7.x series, most
notably the security fix for the `ingress-nginx`
controller (CVE-2025-1974).

#### Bug Fixes

* *cluster:* properly show "ready" in restore mode
* *cluster:* remove the admission controller from status checks
* *cluster:* repair some shellcheck issues, remove vestigial config
* *netbox:* a few small cosmetic fixes to plugin install
* *netbox:* improve plugin installation issues for custom tarballs

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.3

Provides a number of updates to custom plugin
installation, as well as other small enhancements
and bug fixes, included in the 1.7.x series, most
notably the security fix for the `ingress-nginx`
controller (CVE-2025-1974).

#### Bug Fixes

* *cluster:* properly show "ready" in restore mode
* *netbox:* a few small cosmetic fixes to plugin install
* repair some shellcheck issues, remove vestigial config

#### Features

* *cluster:* make a label to tag pods supporting upload

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.1

Fixes user creation, password validation, and group/SSO
issues in NetBox.

#### Bug Fixes

* *netbox:* use proper import location of the OWASP validator
* *docker:* fix nbce-common install, remove deprecated nbc_auth
* *docker:* make sure nbc_auth_extensions are in the right place

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.0

Improves logging in the NetBox containers, and adds support
for uploading custom plugins.

#### Bug Fixes

* *cluster:* fixed a few pod label macros
* *config:* feedback - use bash for extra script safety
* *config:* remove vestigial validation mount

#### Features

* *config:* adding log fixing branch to the CI workflow to create a release in Replicated
* *config:* allow uploading plugins for `pip install`

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.6

Contains a fix for incorrect permissions in the media folder
after restore from backup.

#### Bug Fixes

* *cluster:* remove the admission controller from status checks
* *netbox:* make sure volume permissions are correct

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.5

Contains a security fix for the `ingress-nginx` controller
(CVE-2025-1974).

#### Bug Fixes

* *cluster:* disable ingress-nginx admission controller

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.2 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.4

Fix missing authentication plugins for group and SSO configs.

#### Bug Fixes

* *docker:* make sure nbc_auth_extensions are in the right place

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.3

Re-release of 1.7.2 with additional password validator fixes,
plus reverting to a previous working redis chart.

#### Bug Fixes

* *netbox:* use proper import location of the OWASP validator

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.2

Fixes a bug where the custom password validator was
missing.

#### Bug Fixes

* *docker:* fix nbce-common install, remove deprecated nbc_auth

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.1

Fixes a bug in downloading the ingress Helm chart when
using a proxy for installation.

#### Bug Fixes

* *cluster:* use the proxy to download the ingress chart

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2 (if built-in database is enabled)
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.2 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.0

Updates the embedded NetBox to 4.1.11. Also upgrades
the cluster software, which brings many bug fixes and
features, including better preflight checks, and
a direct link to the NetBox UI from the admin console.

#### Features

* *cluster:* update to 1.19.0
* *cluster:* add a link to the NetBox UI from the admin console
* *deps:* update to NetBox 4.1.11 + latest NetBox chart

#### Versions

This release uses the following upstream software:
* NetBox 4.1.11
* Redis 7.4.2
* PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.2 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.6.5

Fixes a small bug that would cause the admin console to
improperly display an error on upgrade. Also updates
a few dependencies.

#### Bug Fixes

* *cluster:* move ingress back to `ingress-nginx` namespace

#### Features

* *deps:* bump to latest docker image + current plugins
* *deps:* update bitnami-common and netbox oss charts
* *netbox:* update to latest 4.0.x-compatible plugins

#### Plugins

The following plugins are included in this release:

| Plugin | Version | Certified |
| ------ | ------- | --------- |
| nbrisk | 41.0.1 | ☐ |
| netbox-acls | 1.7.0 | ☑︎ |
| netbox-bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | 2.7.0 | ☐ |
| netbox-documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | 4.1.4 | ☐ |
| netbox-inventory | 2.1.0 | ☐ |
| netbox-lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | 1.1.6 | ☑︎ |
| netbox-qrcode | 0.0.15 | ☑︎ |
| netbox-secrets | 2.1.0 | ☐ |
| netbox-topology-views | 4.1.0 | ☑︎ |
| netbox-validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | 0.5.2 | ☑︎ |
| phonebox-plugin | 0.0.10 | ☐ |
| slurpit_netbox | 1.0.43 | ☑︎ |

### 1.6.4

Disable unnecessary Redis persistence and redundant PostgreSQL backups,
plus fix an issue with file upload limits and missing static content
from enabled plugins.

NetBox Enterprise 1.6.4 includes NetBox 4.1.7, and is anticipated to
be a release candidate for stable.

#### Plugins

The following plugins are included in this release:

| Plugin | Version | Certified |
| ------ | ------- | --------- |
| nbrisk | 41.0.1 | ☐ |
| netbox-acls | 1.7.0 | ☑︎ |
| netbox-bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | 2.7.0 | ☐ |
| netbox-documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | 4.1.4 | ☐ |
| netbox-inventory | 2.1.0 | ☐ |
| netbox-lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | 1.1.6 | ☑︎ |
| netbox-qrcode | 0.0.15 | ☑︎ |
| netbox-secrets | 2.1.0 | ☐ |
| netbox-topology-views | 4.1.0 | ☑︎ |
| netbox-validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | 0.5.2 | ☑︎ |
| phonebox-plugin | 0.0.10 | ☐ |
| slurpit_netbox | 1.0.43 | ☑︎ |

### 1.6.3

Just a few small bug fixes, mostly related to internal changes.
Also contains dependency updates.


### 1.6.2

Primarily internal and build-related changes.
No new features.

### 1.6.1

Fixes a number of bugs related to file uploads and proxy environments.

### 1.6.0

Adds the changes plugin by default, and upgrades NetBox to 4.1.7.
Fixes some small bugs in plugin initialization and proxied installs.

### 1.5.0

The 1.5.x series was released internally for development
testing of upgrades to NetBox 4.1 and branching plugin inclusion.

### 1.4.2

A re-release of 1.4.1 with a fix that makes sure plugin versions
that are only compatible with NetBox 4.1 are not included.

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

Improves ingress configuration, adds support for inheriting the TLS configuration from the Admin Console configuration, and adds a "restore mode" for restoring manual backup data, plus many dependency updates and internal improvements.

### 1.1.0

Simplifies the firewall configuration necessary for installation by making sure all initialization downloads go through our proxy domain.

### 1.0.6

Adds support for NetBox resource usage adjustment and some improvements to startup time on a first install.

It also adds support for backup and restore, depending on your environment and license.

### 1.0.5

Adds support for scraping Prometheus metrics from NetBox, as well as the embedded PostgreSQL, Redis, and SeaweedFS if they are enabled.

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