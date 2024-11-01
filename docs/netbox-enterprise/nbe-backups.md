# NetBox Enterprise Backups

Much like the NetBox software itself, NetBox Enterprise uses 2 main datastores: PostgreSQL, and Redis.

PostgreSQL is used for the primary model data in NetBox, including sites, facilities, racks, and so on.
Redis is used for caching, the task queue, and some other data including stored scripts.

Additionally, NetBox Enterprise uses an S3-compatible store for some specific resources, most notably image uploads.
_NOTE: The built-in S3-compatible store keeps its data in Redis, so it is not necessary to back it up separately._

For each type of datastore you can choose to use a built-in deployment, or configure NetBox Enterprise to use an existing external resource already in your environment.

## External Databases

!!! info
    If you are providing your own database(s) for use by NetBox Enterprise, it is expected that you have your own processes for high availability, backup, and restore.

## Using Disaster Recovery for Backups

A disaster recovery backup will preserve the complete state of your NetBox Enterprise install, from allocated volumes to databases to custom configuration.

This feature is included in Embedded Cluster installs, and can be enabled by installing some extra dependencies to your cluster for KOTS installs.

### Backing Up the Embedded Cluster

1. Navigate to the backup configuration by clicking the _^^Backup settings^^_ link in the **Disaster Recovery** section of the admin console.
   ![Backup settings](../images/netbox-enterprise/netbox-enterprise-ec-backup-settings.png){ width=75% }
2. Input your S3 bucket, credentials, endpoint, and region.<br>
   ![Configure S3](../images/netbox-enterprise/netbox-enterprise-ec-configure-s3.png){ width=75% }
3. Click **Update storage settings** -- it will spend a few moments validating that your settings work.<br>
   ![Update storage settings](../images/netbox-enterprise/netbox-enterprise-ec-update-settings.png){ width=75% }
4. Perform a backup by clicking the **Backups** tab, and then clicking **Start backup**.<br>
   ![Start backup](../images/netbox-enterprise/netbox-enterprise-ec-start-backup.png)

### Restoring the Embedded Cluster

1. Download the latest embedded cluster installer following the same instructions you did for a new install, if you haven't already.
2. Run: `./netbox-enterprise restore`
3. Enter the same S3 credentials you use for backups.<br>
   ![S3 Credentials](../images/netbox-enterprise/netbox-enterprise-ec-restore-s3.png){ width=75% }
4. Next, it will take a few minutes to bring up the node.
   When it's complete, you will be prompted to continue the restore:<br>
   ![Restore from backup instance?](../images/netbox-enterprise/netbox-enterprise-ec-restore-prompt.png)
5. Enter `Y` to continue, and the restore will launch the cluster.
6. (Optional) If you plan to have more than one node in the new cluster, you can go to the admin console and configure them when prompted.
7. Enter `continue` to finish bringing the NetBox Enterprise application up.<br>
   ![Continue restore](../images/netbox-enterprise/netbox-enterprise-ec-restore-continue.png)
8. It will take a few more minutes to finish bringing the application up, and then you will see "Application restored!"<br>
   ![Application restored!](../images/netbox-enterprise/netbox-enterprise-ec-restore-complete.png){ width=90% }<br>
   NetBox Enterprise and the Admin Console should now be completely restored and available as normal.

<!-- ### KOTS Install -->

## Manual Backup and Restore

Besides disaster recovery, it is also a good idea to keep backups of your data in case you want to view, partially restore, or move your data to another system.

!!! info "NetBox Enterprise Namespace"
    The default namespace for KOTS installs is `netbox-enterprise`, and the Embedded Cluster default is `kotsadm`.

    The instructions below default to `kotsadm`, but you can change the `NETBOX_NAMESPACE` export to match your system.

### Backing Up Your Data

Backing up NetBox Enterprise's data manually is reasonably simple, and Kubernetes makes it easy to access them from the command-line.

!!! warning "Before You Back Up: Accessing Your Cluster"
    Before you can back anything up, you must first make sure you can access the cluster on the command line.

    See the [advanced tools documentation](./nbe-troubleshooting.md#accessing-your-cluster-from-the-command-line) for details on connecting to your NetBox Enterprise cluster.

#### Media, Scripts, and Reports

Media, scripts, and reports are stored in a volume accessible from the NetBox containers.
To back them up, you can run this:

```shell
export NETBOX_NAMESPACE="kotsadm" && \
NETBOX_MAIN_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'app.kubernetes.io/component=netbox' \
  | head -n 1 \
  )" && \
kubectl exec "${NETBOX_MAIN_POD}" \
  -n "${NETBOX_NAMESPACE}" \
  -c netbox \
  -- /bin/sh -c ' \
      cd /opt/netbox/netbox && \
      find media scripts reports -type f > /tmp/files.txt && \
      tar -czf - \
      --owner=0 \
      --group=0 \
      -T /tmp/files.txt' > netbox-data.tar.gz
```

#### Built-In PostgreSQL

The built-in PostgreSQL is deployed using the CrunchyData Postgres Operator.

Since the PostgreSQL CLI tools are already available inside the cluster, all we need to do to dump the database is to call into the correct container and run a `pg_dump` there.

To perform a database dump, run these commands:

```shell
export NETBOX_NAMESPACE="kotsadm" && \
POSTGRESQL_MAIN_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'postgres-operator.crunchydata.com/role=master' \
  | head -n 1 \
  )" && \
kubectl exec "${POSTGRESQL_MAIN_POD}" \
  -n "${NETBOX_NAMESPACE}" \
  -c database \
  -- \
    pg_dump netbox > netbox.pgsql
```

This will create a `netbox.pgsql` file in your local directory.
Save it somewhere safe for future restores.

For more details on backing up NetBox databases, see [the official NetBox documentation](https://netboxlabs.com/docs/netbox/en/stable/administration/replicating-netbox/).

#### Built-In Redis

The built-in Redis is deployed using the Bitnami Redis Helm chart.

Backing up Redis is straightforward, since it does its work in memory and then writes checkpoints to the filesystem atomically.

First, make sure that AOF rewrite isn't enabled, and confirm that a rewrite isn't in-process before you start backing up:

```shell
export NETBOX_NAMESPACE="kotsadm" && \
export REDIS_MAIN_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'app.kubernetes.io/component=master,app.kubernetes.io/name=redis' \
  | head -n 1 \
  )" && \
for COMMAND in \
  "CONFIG SET auto-aof-rewrite-percentage 0" \
  "SAVE" \
  "INFO persistence"; do
    kubectl exec ${REDIS_MAIN_POD} \
      -n "${NETBOX_NAMESPACE}" \
      -i \
      -c redis \
      -- bash -c \
        "REDISCLI_AUTH=\$REDIS_PASSWORD redis-cli ${COMMAND}" \
    | grep 'aof_rewrite_in_progress'
done
```

Make sure that those commands output `aof_rewrite_in_progress:0`, then you're ready to proceed.
Otherwise, just run them again until it says 0.

Next, all that's necessary to back up the data in your Redis install is a basic tar command to create an archive from the `/data` directory in the same shell:

```shell
kubectl exec ${REDIS_MAIN_POD} \
  -n "${NETBOX_NAMESPACE}" \
  -c redis \
  -- /bin/sh -c ' \
      cd /data && \
      find * -type f > /tmp/files.txt && \
      tar -czf - \
      --owner=0 \
      --group=0 \
      -T /tmp/files.txt' > redis-data.tar.gz
```

Finally, turn AOF rewrites back on:

```shell
kubectl exec ${REDIS_MAIN_POD} \
  -n "${NETBOX_NAMESPACE}" \
  -c redis \
  -- bash -c \
    'REDISCLI_AUTH=$REDIS_PASSWORD \
    redis-cli \
    CONFIG SET auto-aof-rewrite-percentage 100'
```

<!--
#### Built-In S3

The built-in S3 implementation uses Bitnami's Helm chart for SeaweedFS, a versatile storage system.

Backing it up requires just a simple `tar` command to save the contents of the data directory.

```shell
export NETBOX_NAMESPACE="kotsadm" && \
export S3_VOLUME_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'app.kubernetes.io/component=volume,app.kubernetes.io/name=seaweedfs' \
  | head -n 1 \
  )" && \
kubectl exec ${S3_VOLUME_POD} \
  -n "${NETBOX_NAMESPACE}" \
  -c seaweedfs \
  -- /bin/sh -c ' \
      cd /data && \
      tar -czf - \
      --owner=0 \
      --group=0 \
      *' > seaweedfs-data.tar.gz
```
-->

### Restoring Your Backups

Restoring is almost as simple as backing up.
You just need to put NetBox Enterprise into restore mode first.

#### Enabling and Disabling Restore Mode

1. Put NetBox Enterprise into "Restore Mode" by going to the _Config_ tab and checking the _Enable Restore Mode_ checkbox.
   ![Enable Restore Mode](../images/netbox-enterprise/netbox-enterprise-restore-mode-enable.png)
2. Click the "Save config" button at the bottom of the form, and then when the admin console prompts you, click "go to updated version".<br>
   ![Go to updated version](../images/netbox-enterprise/netbox-enterprise-restore-mode-updated-version.png){ width=75% }
3. Confirm that the _New version available_ at the top denotes it's a config change, and if so click the "Deploy" button.
   ![Deploy](../images/netbox-enterprise/netbox-enterprise-restore-mode-deploy.png)

This will shut down NetBox (and the built-in Redis, if you are using it) but leave the other NetBox Enterprise infrastructure up, so you can safely restore.

When you are done restoring your data, just follow the same steps, unchecking _Enable Restore Mode_ and deploying the updated configuration.

#### Media, Scripts, and Reports

To restore media, scripts, and reports, you just need to unpack them into the correct directory inside a NetBox container.

!!! note
    The backup instructions above back up all three of the `media/`, `scripts/`, and `reports/` subdirectories in one file.

    If you are restoring a backup from another NetBox instance, you might need to change the name of the tarball and the path after the `-C` at the end of this command to unpack your backup into the right location.

```shell
export NETBOX_NAMESPACE="kotsadm" && \
export NETBOX_RESTORE_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'app.kubernetes.io/component=restore-mode' \
  | head -n 1 \
  )" && \
cat netbox-data.tar.gz | kubectl exec ${NETBOX_RESTORE_POD} \
  -n "${NETBOX_NAMESPACE}" \
  -i \
  -- tar -xvzf - \
    --no-same-owner \
    --no-same-permission \
    -C /opt/netbox/netbox
```

#### Built-In PostgreSQL

To restore from a dump file, pipe the `netbox.pgsql` created during backup into `psql` in the PostgreSQL pod:

```shell
export NETBOX_NAMESPACE="kotsadm"
POSTGRESQL_MAIN_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'postgres-operator.crunchydata.com/role=master' \
  | head -n 1 \
  )" && \
kubectl exec "${POSTGRESQL_MAIN_POD}" \
  -n "${NETBOX_NAMESPACE}" \
  -c database \
  -- dropdb --if-exists --force netbox && \
kubectl exec "${POSTGRESQL_MAIN_POD}" \
  -n "${NETBOX_NAMESPACE}" \
  -c database \
  -- createdb -E UTF8 netbox && \
cat netbox.pgsql | kubectl exec "${POSTGRESQL_MAIN_POD}" \
  -n "${NETBOX_NAMESPACE}" \
  -i \
  -c database \
  -- psql -d netbox -f-
```
#### Built-In Redis

Since Redis isn't running in restore mode, there is no need to disable and re-enable append mode.
All that is necessary is to unpack the files back into place.

```shell
export NETBOX_NAMESPACE="kotsadm" && \
export REDIS_MAIN_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'app.kubernetes.io/component=master,app.kubernetes.io/name=redis' \
  | head -n 1 \
  )" && \
cat redis-data.tar.gz | kubectl exec ${REDIS_MAIN_POD} \
  -n "${NETBOX_NAMESPACE}" \
  -i \
  -c redis \
  -- tar -xvzf - \
    --no-same-owner \
    --no-same-permission \
    -C /data
```

<!--
#### Built-In S3

SeaweedFS won't have anything written to it while in restore mode, so it is safe to unpack the volume back into place.
Once done, we'll destroy the pod and it should be recreated automatically with the data intact.

```shell
export NETBOX_NAMESPACE="kotsadm" && \
export S3_VOLUME_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'app.kubernetes.io/component=volume,app.kubernetes.io/name=seaweedfs' \
  | head -n 1 \
  )" && \
cat seaweedfs-data.tar.gz | kubectl exec "${S3_VOLUME_POD}" \
  -n "${NETBOX_NAMESPACE}" \
  -i \
  -c seaweedfs \
  -- tar -xvzf - \
    --no-same-owner \
    --no-same-permission \
    -C /data && \
kubectl delete -n "${NETBOX_NAMESPACE}" "${S3_VOLUME_POD}"
```
-->