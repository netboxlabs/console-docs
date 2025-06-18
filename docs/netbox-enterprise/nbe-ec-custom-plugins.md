---
title: Installing Custom NetBox Plugins
tags:
  - enterprise
  - community
---# Installing Custom NetBox Plugins

While NetBox Enterprise comes with a variety of certified and other community plugins built-in, there are cases where you will want to include additional plugins in your NetBox runtime.

To do so, you will need to create a tarball containing the plugins you wish to install, known as a wheelhouse archive.

!!! note
    On each startup, the wheelhouse's contents will be re-applied to a fresh NetBox Python environment.

## Create a working directory

First, create a temporary directory for your plugin downloads to go:

```{.bash}
mkdir /tmp/wheelhouse
```

## Dowload the `constraints.txt` file for your release

You can use `kubectl cp` to download a constraints file that contains a complete list of the pre-installed Python modules in your NetBox Enterprise version.

To do so, download it with this command:

```{.bash}
sudo ./netbox-enterprise shell

NBE_SOURCE_POD="$( \
  kubectl get pods -A \
  -o go-template='{{ range .items }}{{ .metadata.name }}{{ "\n" }}{{ end }}' \
  -l com.netboxlabs.netbox-enterprise/custom-plugins-upload=true \
  --field-selector status.phase=Running \
  | head -n 1 \
)"

kubectl cp -n kotsadm \
  "${NBE_SOURCE_POD}:/opt/netbox/constraints.txt" \
  /tmp/wheelhouse/constraints.txt
```

## Create Wheels From Your Custom Modules

If you are including any custom Python modules that aren't in PyPy, you will need to create wheel archives from them.
You can generate them with `pip wheel`, passing one or more paths or archives, like so:

```{.bash}
pip wheel \
  --prefer-binary \
  --wheel-dir "/tmp/wheelhouse" \
  --constraint /tmp/wheelhouse/constraints.txt \
  </path/to/your/python-module-dir|/path/to/your/python-module.tar.gz>
```

!!! note
    If your custom modules require compilation, you should build them on an `x86_64` platform running Ubuntu 24 LTS and Python 3.12 so they match NetBox Enterprise's containers.

## Create a `requirements.txt`

Create a file called `requirements.txt` in your `/tmp/wheelhouse` directory, listing each of the plugins you'd like to include.

If you created custom wheels, make sure you add them to `requirements.txt` like any other dependency.

For details on the format of requirements files, please see the [pip documentation](https://pip.pypa.io/en/stable/reference/requirements-file-format/).
However, it is strongly recommended that you use `==` to include a specific known and tested version in your requirements file.

## Use `pip` to download the plugins and their dependencies

Next, use `pip` to populate the wheelhouse folder with any other dependencies, by running it with the `download` command, and the arguments necessary to pull the correct architecture and version to run inside the NetBox Enterprise container:

```{.bash}
pip download \
  --platform="manylinux_2_17_x86_64" \
  --only-binary=":all:" \
  --python-version="3.12" \
  --dest "/tmp/wheelhouse" \
  --find-links "/tmp/wheelhouse" \
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
  --field-selector status.phase=Running \
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

# Migrations and Upgrades

When upgrading to a new NetBox Enterprise version which includes a different version of the included NetBox, you will likely need to generate a new wheelhouse file that matches its changed dependencies.

To do so, you should perform the following steps:

1. Put NetBox Enterprise into "restore mode" in the Admin Console configuration, and deploy the config change.
2. Deploy the new NetBox Enterprise version.
3. Redo the instructions above to download the new `constraints.txt` file, create, and then upload a new wheelhouse tarball.
4. Uncheck "restore mode" and deploy.