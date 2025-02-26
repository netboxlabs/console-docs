# Migrating to NetBox Enterprise

Migrating from a NetBox open source instance to a NetBox Labs NetBox Enterprise deployment is a straightforward
process. Since NetBox Enterprise is built using the same open source software you may already be using, most database imports can be
completed quickly for a timely cutover. 

1. Compatibility Check - Record your current NetBox version <br>
The database being imported will need to match the major and minor version of the NetBox deployed with NetBox Enterprise. Support can upgrade older databases on your behalf to assist in the migration process.

2. Export your existing NetBox database<br>
Use the following command to export your existing NetBox database:
```shell
pg_dump --username netbox --password --host localhost netbox > netbox.pgsql 
```
**Note** <br>
>   Inform the NetBox Labs team if you used any additional flags for the pg_dump command, or if you exported the data to a different format.
<br><br>

3. (Optional) Archive your "media" files<br>
Optionally, if you are storing images, scripts, etc. inside NetBox, use the command below to archive these files. Note that the
example below shows the default file path. Update the path if you have changed the location of these files.
```shell
cd /opt/netbox/netbox && \
    find media scripts reports static -type f > /tmp/files.txt && \
    tar -czf - \
    --owner=0 \
    --group=0 \
    -T /tmp/files.txt' > netbox-data.tar.gz
```

4. Import the database and media files to NetBox Enterprise<br>
Use the steps outlined [here](./nbe-backups.md#restoring-your-backups) for importing the database and media files to NetBox Enterprise.