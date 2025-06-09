# console-docs 

## Clone and step into the repo

```
# git clone https://github.com/netboxlabs/console-docs
# cd console-docs
```

## Install required python packages

```
# python3 -m venv venv
# source venv/bin/activate
(venv) # pip install -r requirements.txt
```

## Run mkdocs

```
(venv) # mkdocs serve
INFO    -  Building documentation...
INFO    -  Cleaning site directory
INFO    -  The following pages exist in the docs directory, but are not included in the "nav" configuration:
             - Administration Console/console-overview.md
             - NetBox Cloud/getting-started-with-nbc.md
INFO    -  Documentation built in 0.75 seconds
INFO    -  [13:37:39] Watching paths for changes: 'docs', 'mkdocs.yml'
INFO    -  [13:37:39] Serving on http://127.0.0.1:8000/
```

## Versioning

This repository supports versioned documentation using [Mike](https://github.com/jimporter/mike). Versions are managed automatically via GitHub Actions when tags are pushed.

### Current Versions
- **v1.9** (Current) - Customer stable channel

### Future Versions
- **v1.10** (Development) - Upcoming release
- **v1.11** (Development) - Future release

### Creating a New Version

1. **Tag a release** (automatic deployment):
   ```bash
   git tag v1.9.3
   git push origin v1.9.3
   ```

2. **Manual deployment** (if needed):
   ```bash
   mike deploy v1.9 latest --title="v1.9 (Current)" --push --update-aliases
   mike set-default latest --push
   ```

3. **List versions**:
   ```bash
   mike list
   ```

### Version Configuration

Version settings are defined in:
- `versions.json` - Version metadata and branch mapping
- `mkdocs.yml` - MkDocs version configuration
- `.github/workflows/version-deploy.yml` - Automated deployment

### Integration with Dochub

This repository integrates with `netboxlabs-website-dochub` for unified documentation. Version deployments automatically trigger integration updates.

## :warning:

If you see errors like this...

> ERROR   -  Config value 'theme': Unrecognised theme name: 'material'. The available installed themes are: mkdocs, readthedocs
> ERROR   -  Config value 'markdown_extensions': Failed to load extension 'pymdownx.tabbed'.
>            ModuleNotFoundError: No module named 'pymdownx'


 Try uninstalling `mkdocs` from your package manager, (e.g. `brew uninstall mkdocs`) and just using the version installed by `pip`. It seems that `mkdocs` doesn't like it when you've installed it using different methods.