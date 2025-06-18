---
title: Migrating to NetBox Enterprise
tags:
  - enterprise
  - community
---

# Migrating to NetBox Enterprise

Migrating from NetBox open source to NetBox Labs Enterprise is a simple and efficient process. Because NetBox Enterprise is built on the same open source platform, database imports can be completed quickly, enabling a smooth transition.

## Database 
!!! warning "Compatibility Check"
    The database being migrated must match the major and minor version of the NetBox deployed with NetBox Enterprise. NetBox Labs support can upgrade older databases on your behalf to assist in the migration process.

### Exporting the Open Source Database 
1. Use the following command to export your existing NetBox database:
```shell
pg_dump --username netbox --password --host localhost netbox > netbox.pgsql 
```
!!! info
    Notify the NetBox Labs team if you used any additional flags for the 'pg_dump' command, or if you exported the data to a different format.

### Importing the Database to NetBox Enterprise
1. Follow the steps outlined [here](./nbe-backups.md#restoring-your-backups) to import the database into NetBox Enterprise.


## Media Files (Optional)
If images and/or scripts are used in your NetBox, migrate them to the NetBox Labs deployment.

!!! info
    The steps below assume the default paths used by the open source deployment. If the Media or Scripts locations have been changed with the MEDIA_ROOT or SCRIPTS_ROOT parameters in configuration.py, modify the following steps according to those paths.

### Images
1. Locate existing images in your open source installation's media root directory:
```console
cd /opt/netbox/netbox/ && ls -lR media
```
2. Copy and transfer the entire __media__ directory to the NetBox Enterprise server.

3. Enable the NetBox Enterprise shell and identify a running __netbox-enterprise__ pod:
```console
sudo ./netbox-enterprise shell
kubectl get pods -n kotsadm
```
```console
NAME                                                  READY   STATUS      RESTARTS      AGE
kotsadm-54bbd64487-dkj6t                              1/1     Running     1 (24h ago)   3d18h
kotsadm-rqlite-0                                      1/1     Running     1 (24h ago)   3d18h
kurl-proxy-kotsadm-6c7c96b4cb-66p6g                   1/1     Running     2 (24h ago)   3d18h
netbox-enterprise-backup-labeler-29028255-rxlzm       0/1     Completed   0             39m
netbox-enterprise-backup-labeler-29028270-7x2w8       0/1     Completed   0             24m
netbox-enterprise-backup-labeler-29028285-xqqn6       0/1     Completed   0             9m34s
----> netbox-enterprise-c769578d5-f9kl7               1/1     Running     1 (24h ago)   24h
netbox-enterprise-housekeeping-29023200-mm7wd         0/1     Completed   0             3d12h
netbox-enterprise-housekeeping-29024640-9zq9s         0/1     Completed   0             2d12h
netbox-enterprise-housekeeping-29026080-dxb6j         0/1     Completed   0             36h
netbox-enterprise-housekeeping-29027520-fj7zk         0/1     Completed   0             12h
netbox-enterprise-postgres-cluster-instance1-59f8-0   2/2     Running     2 (24h ago)   3d16h
netbox-enterprise-redis-no-persistence-master-0       2/2     Running     2 (24h ago)   3d17h
netbox-enterprise-redis-no-persistence-replicas-0     2/2     Running     2 (24h ago)   3d17h
netbox-enterprise-worker-589cf884c4-z57pg             1/1     Running     2 (24h ago)   3d16h
pgo-88dccd7c9-w766g                                   1/1     Running     1 (24h ago)   3d17h
replicated-56c85b569f-b22hm                           1/1     Running     1 (24h ago)   3d16h
```
4. Copy the media directory contents into the pod.
```shell
kubectl cp -n kotsadm ./media netbox-enterprise-c769578d5-f9kl7:/opt/netbox/netbox
```
!!! info "Note"
    Pod names are randomly generated and need to be identified. If multiple replicas are running, select any pod with the pattern "netbox-enterprise-########-XXXXX"

### Scripts

1. Locate existing scripts in your open source installation's scripts root directory:
```console
cd /opt/netbox/netbox/ && ls -lR scripts
```
2. Copy and transfer scripts onto an endpoint with access to the NetBox Enterprise web interface.
3. Login to NetBox Enterprise and navigate to __Customization__ > __Scripts__.
4. Click __Add__ and upload the first script.
5. Repeat the previous step for any remaining scripts.
