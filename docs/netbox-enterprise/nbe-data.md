# NetBox Enterprise Data

Much like the NetBox software itself, NetBox Enterprise uses 2 main datastores: PostgreSQL, and Redis.

PostgreSQL is used for the primary model data in NetBox, including sites, facilities, racks, and so on.
Redis is used for caching, the task queue, and some other data including stored scripts and such.

Additionally, NetBox Enterprise uses an S3-compatible store for some specific resources, most notably image uploads.
_NOTE: The built-in S3-compatible store keeps its data in Redis, so it is not necessary to back it up separately._

For each type of datastore you can choose to use a built-in deployment, or configure NetBox Enterprise to use an existing external resource already in your environment.

## Backing Up Your Data

### External Datastores

If you are providing your own database(s) for use by NetBox Enterprise, it is expected that you have your own processes for high availability, backup, and restore.

### Built-In PostgreSQL

The built-in PostgreSQL is deployed using the CrunchyData Postgres Operator.

Since the PostgreSQL CLI tools are already available inside the cluster, all we need to do to dump the database is to call into the correct container and run a `pg_dump` there.

_NOTE: The default namespace for installs is `netbox-enterprise`, but if you have overridden it for your install, replace the argument after `-n` with the proper namespace for your instance._

```shell
POSTGRESQL_MAIN_POD="$(kubectl get pod -o name -n netbox-enterprise -l 'postgres-operator.crunchydata.com/role=master')"
kubectl exec "${POSTGRESQL_MAIN_POD}" -n netbox-enterprise -c database -- \
    pg_dump -Fc -C netbox > netbox.pgsql
```

This will create a `netbox.pgsql` file in your local directory.
Save it somewhere safe for future restores.

_This command uses the `-Fc` argument to `pg_dump`, which instructs it to create a "custom" format dump file.
This is a binary file that is more efficient than a standard SQL dump, and also provides some additional metadata that makes PostgreSQL handle restores across different versions a bit better.
You can remove the `-Fc` if you wish to create a readable text file dump instead._

For more details on backing up NetBox databases, see [the official NetBox documentation](https://netboxlabs.com/docs/netbox/en/stable/administration/replicating-netbox/).