# Installing Custom NetBox Plugins

While NetBox Enterprise comes with a variety of certified and other community plugins built-in, there are cases where you will want to include additional plugins in your NetBox runtime.

To do so, you will need to create a tarball containing the plugins you wish to install, known as a wheelhouse archive.

!!! note
    On each startup, the wheelhouse's contents will be applied to a fresh NetBox Python environment.
    Also, you will need to create a new wheelhouse archive when the NetBox version provided in the NetBox Enterprise environment changes.

## Create a working directory

First, create a temporary directory for your plugin downloads to go:

```{.bash}
mkdir /tmp/wheelhouse
```

## Create a `requirements.txt`

Create a file called `requirements.txt` in your `/tmp/wheelhouse` directory, listing each of the plugins you'd like to include.

For details on the format of requirements files, please see the [pip documentation](https://pip.pypa.io/en/stable/reference/requirements-file-format/).
However, it is strongly recommended that you use `==` to include a specific known and tested version in your requirements file.

## Dowload the `constraints.txt` file for your release

You can use `kubectl cp` to download a constraints file that contains a complete list of the pre-installed Python modules in your NetBox Enterprise version.

To do so, download it with this command:

```{.bash}
sudo ./netbox-enterprise shell

NBE_SOURCE_POD="$( \
  kubectl get pods -A \
  -o go-template='{{ range .items }}{{ .metadata.name }}{{ "\n" }}{{ end }}' \
  -l com.netboxlabs.netbox-enterprise/custom-plugins-upload=true \
  | head -n 1 \
)"

kubectl cp -n kotsadm \
  "${NBE_SOURCE_POD}:/opt/netbox/netbox/media/constraints.txt" \
  /tmp/wheelhouse/constraints.txt
```

## Use `pip` to download the plugins and their dependencies

Next, use `pip` to populate the wheelhouse folder, by running it with the `download` command, and the arguments necessary to pull the correct architecture and version to run inside the NetBox Enterprise container:

```{.bash}
pip download \
  --platform="manylinux_2_17_x86_64" \
  --only-binary=":all:" \
  --python-version="3.12" \
  --dest "/tmp/wheelhouse" \
  -c /tmp/wheelhouse/constraints.txt \
  -r /tmp/wheelhouse/requirements.txt
```

If all went well, you should see `*.whl` files in the `/tmp/wheelhouse/` folder for each of the packages you specified, as well as their dependencies.

## Create the archive

Finally, create the archive:

```{.bash}
tar -C /tmp \
    -czf /tmp/wheelhouse.tar.gz \
    wheelhouse
```

This should create a tarball that contains the `wheelhouse/` directory and everything inside of it.

## Add your plugins to NetBox Enterprise

On your NetBox Enterprise node, you can now upload the wheelhouse to a media directory.
Note that this should work whether or not you are in restore mode.
Both are configured to be able to accept wheelhouse uploads.

To do so, run this:

```{.bash}
sudo ./netbox-enterprise shell

NBE_SOURCE_POD="$( \
  kubectl get pods -A \
  -o go-template='{{ range .items }}{{ .metadata.name }}{{ "\n" }}{{ end }}' \
  -l com.netboxlabs.netbox-enterprise/custom-plugins-upload=true \
  | head -n 1 \
)"

kubectl cp -n kotsadm \
  /tmp/wheelhouse.tar.gz \
  "${NBE_SOURCE_POD}:/opt/netbox/netbox/media/wheelhouse.tar.gz"
```

## Enable and Configure Your Plugins

In the Admin Console configuration, make sure _Show Advanced Settings_ is checked.
In the Python configuration overrides box, you can enter `PLUGINS = [...]` and `PLUGINS_CONFIG = {}` just as you would for any NetBox install.
For details, see the [NetBox plugin documentation](https://netboxlabs.com/docs/netbox/en/stable/configuration/plugins/).

## Restart the NetBox containers

The next time the NetBox pods restart, your changes should be automatically applied.

If you are in restore mode, switching out of restore mode will enable installation of your plugins.
If you are not, a "redeploy" in the admin console will trigger the same.
