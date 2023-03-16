# Migrating to NetBox Cloud

Migrating from an on-premises NetBox open source instance to a NetBox Labs NetBox Cloud environment is a straightforward
process. Since NetBox Cloud is built using the same open source software you’re already using, most imports can be
completed quickly for a timely cutover. This checklist will walk you through the steps, highlighting mandatory and optional
points in the process.

## 1 - Record your current NetBox version

Navigate to your NetBox portal login page to view the version of NetBox you are running. You can also find this information
within the application. This helps the NetBox team understand which upgrade path is required for your data.

## 2 - Export your existing NetBox database

Use the following command to export your existing NetBox database:

```shell
pg_dump --username [netbox] --password --host [localhost] [netbox] > [netbox.sql]
```

> **Warning**
> Inform the NS1 team if you used any additional flags for the pg_dump command, or if you exported the data to a
different format.

## 3 - (Optional) Archive your /media directory

Optionally, if you are storing images inside NetBox, use the command below to archive your media directory. Note that the
example below shows the default file path. Update the path if you have changed the location of these files.

```shell
tar -czf netbox_media.tar.gz /opt/netbox/netbox/media/
```

## 4 - (Optional) Archive your /scripts directory

Optionally, if you have uploaded custom scripts to NetBox, use the command below to archive your scripts directory. Note that
the example below shows the default file path. Update the path if you have changed the location of these files.

```shell
tar -czf netbox_scripts.tar.gz /opt/netbox/netbox/scripts/
```

## 5 - (Optional) Archive your /reports directory

Optionally, if you have uploaded custom reports to NetBox, use the command below to archive your reports directory. Note
that the example below shows the default file path. Update the path if you have changed the location of these files.

```shell
tar -czf netbox_scripts.tar.gz /opt/netbox/netbox/reports/
```

## 6 - Upload the files to a shared location

Upload the files created in the steps above to a shareable location such as FTP, Dropbox, Box, or Google Drive. If necessary, the
NS1 team can create a secure, dedicated location for you to use.