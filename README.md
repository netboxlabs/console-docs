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

## Documentation Writer Guide

### Understanding the Version Structure

Our documentation follows the NetBox Enterprise release cycle with these version states:

- **Current Version (v1.9)**: Live customer documentation, displayed to users
- **Development Versions (v1.10, v1.11)**: Prepared infrastructure, hidden from users until release

### Branch and Content Strategy

#### Branch Structure
```
main              # Latest development (v1.11 content)
├── v1.10         # v1.10 maintenance branch (when ready)
├── v1.9          # v1.9 maintenance branch (current)
└── feature/*     # Feature branches for new content
```

#### Where to Write Documentation

| Content Type | Target Branch | When to Use |
|-------------|---------------|-------------|
| **New features for future release** | `main` | Writing docs for v1.11 features |
| **Updates to current release** | `v1.9` | Bug fixes, clarifications for current customers |
| **Preparing next release** | `v1.10` | Writing docs for v1.10 features (when branch exists) |

### Tagging and Release Workflow

#### For Documentation Updates (Most Common)

1. **Current version updates (v1.9)**:
   ```bash
   # Work on v1.9 branch for customer-facing updates
   git checkout v1.9
   git pull origin v1.9
   
   # Make your documentation changes
   # Commit and push changes
   git add .
   git commit -m "Update installation guide for v1.9"
   git push origin v1.9
   
   # Tag the update (increment patch version)
   git tag v1.9.3
   git push origin v1.9.3
   ```
   **Result**: Documentation automatically deploys to production

2. **Future version content (v1.11)**:
   ```bash
   # Work on main branch for future features
   git checkout main
   git pull origin main
   
   # Make your documentation changes for new features
   # Commit and push changes
   git add .
   git commit -m "Add documentation for new Jinja2 features in v1.11"
   git push origin main
   
   # Don't tag yet - wait for v1.11 release
   ```
   **Result**: Content ready for v1.11 but not visible to customers yet

#### For Major Release Preparation

When preparing a new major/minor version (like v1.10 or v1.11):

1. **Create version branch** (typically done by maintainers):
   ```bash
   # Create new version branch from main
   git checkout main
   git pull origin main
   git checkout -b v1.10
   git push origin v1.10
   ```

2. **Update version configuration** (maintainers):
   ```bash
   # Edit versions.json to move v1.10 from future_versions to versions
   # Update default_version if this becomes the new current version
   # Commit and push configuration changes
   ```

3. **Tag the release**:
   ```bash
   git checkout v1.10
   git tag v1.10.0
   git push origin v1.10.0
   ```

### Content Guidelines by Version

#### Current Version (v1.9) Content
- **Focus**: Stable, tested features available to customers
- **Updates**: Bug fixes, clarifications, improved examples
- **Avoid**: Documentation for unreleased features
- **Review**: Test all examples and procedures

#### Development Version (v1.11) Content  
- **Focus**: New features, major changes, future functionality
- **Updates**: Draft documentation, work-in-progress content
- **Include**: Feature flags, beta warnings if applicable
- **Note**: Content won't be visible to customers until release

### Common Workflows

#### Scenario 1: Fix Documentation Error for Current Customers
```bash
# Customer reports error in v1.9 installation guide
git checkout v1.9
# Fix the error
git commit -m "Fix typo in SSL certificate installation steps"
git push origin v1.9
git tag v1.9.4  # Increment patch version
git push origin v1.9.4
# Documentation automatically updates for customers
```

#### Scenario 2: Document New Feature for Next Release
```bash
# New Jinja2 template feature added to v1.11
git checkout main
# Add comprehensive documentation
git commit -m "Add Jinja2 conditional logic documentation"
git push origin main
# Content staged for v1.11 release, not visible to customers yet
```

#### Scenario 3: Backport Important Update
```bash
# Important security update applies to both v1.9 and v1.11
git checkout v1.9
# Make the update
git commit -m "Add security best practices for LDAP configuration"
git push origin v1.9
git tag v1.9.5
git push origin v1.9.5

# Also apply to future version
git checkout main
git cherry-pick <commit-hash>
git push origin main
```

### Version Activation Process

When a development version becomes ready for customers:

#### Step 1: Update Configuration
Edit `versions.json`:
```json
{
  "versions": [
    {
      "version": "v1.10",
      "branch": "v1.10", 
      "title": "v1.10 (Latest)",
      "default": true,
      "status": "latest"
    },
    {
      "version": "v1.9",
      "branch": "v1.9",
      "title": "v1.9 (Stable)", 
      "status": "stable"
    }
  ],
  "default_version": "v1.10"
  // Move v1.10 from future_versions to versions array
}
```

#### Step 2: Update Other Files
- `mkdocs.yml`: Add v1.10 to available versions
- `.github/workflows/version-deploy.yml`: Update LATEST_VERSION
- `README.md`: Update current versions list

#### Step 3: Test and Deploy
```bash
git add .
git commit -m "Activate v1.10 for customer access"
git push origin main
```

### Best Practices

#### ✅ **Do:**
- Test all code examples before committing
- Use clear, descriptive commit messages
- Tag immediately after pushing customer-facing changes
- Keep development content in appropriate branches
- Review changes in the context of the target version

#### ❌ **Don't:**
- Tag development versions (main branch) until ready for release
- Mix current customer fixes with future feature documentation
- Forget to increment version numbers in tags
- Skip testing examples in the target version environment

### Getting Help

- **Version questions**: Check `versions.json` for current configuration
- **Branch questions**: Use `git branch -a` to see all available branches  
- **Tag questions**: Use `git tag -l` to see existing version tags
- **Integration questions**: Contact the dochub team for unified site issues

### Quick Reference Commands

```bash
# Check current version configuration
cat versions.json

# See all available branches
git branch -a

# See all version tags
git tag -l | sort -V

# Check which version branch you're on
git branch --show-current

# See recent version deployments
git log --oneline --grep="v1\."
```

## :warning:

If you see errors like this...

> ERROR   -  Config value 'theme': Unrecognised theme name: 'material'. The available installed themes are: mkdocs, readthedocs
> ERROR   -  Config value 'markdown_extensions': Failed to load extension 'pymdownx.tabbed'.
>            ModuleNotFoundError: No module named 'pymdownx'


 Try uninstalling `mkdocs` from your package manager, (e.g. `brew uninstall mkdocs`) and just using the version installed by `pip`. It seems that `mkdocs` doesn't like it when you've installed it using different methods.