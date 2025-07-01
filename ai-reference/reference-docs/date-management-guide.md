---
title: "Date Management Guide"
description: "Understanding and managing last_updated dates in documentation"
tags:
  - documentation
  - maintenance
  - dates
  - workflow
author: "NetBox Labs Documentation Team"
last_updated: "2025-07-01"
category: "reference"
audience: "developers"
complexity: "beginner"
internal_only: true
---

# Date Management Guide

This guide explains why hardcoded dates keep appearing in documentation and how to manage them effectively.

## 🔍 The Problem

You may notice that `last_updated: "2025-01-27"` keeps appearing across documentation files. This happens because:

### Root Causes

1. **Template Copying**: When files are copied from templates that contain hardcoded dates
2. **Submodule Sources**: External repositories (console-docs, netbox, etc.) contain files with hardcoded dates
3. **Manual Creation**: Documentation created manually often uses a fixed date
4. **AI Assistance**: AI tools may suggest hardcoded dates from training data patterns

### Where It Occurs

- **Console-docs submodule**: Most instances come from `external-repos/console-docs/`
- **AI Reference templates**: Some templates contain example dates
- **Manually created files**: New documentation files with copy-pasted frontmatter

## ✅ The Solution

### Automated Date Updates

Use the provided script to update all dates to the current date:

```bash
# Update all dates in main repository
yarn update-dates

# Or run directly
./scripts/update-dates.sh
```

### Manual Prevention

1. **Use Template Placeholders**: Templates should use `YYYY-MM-DD` or variables
2. **Check Before Commit**: Review frontmatter dates before committing
3. **Regular Maintenance**: Run date updates periodically

### Template Best Practices

✅ **Good - Use placeholders:**
```yaml
---
title: "Your Document Title"
last_updated: "YYYY-MM-DD"  # Replace with current date
---
```

❌ **Bad - Hardcoded dates:**
```yaml
---
title: "Your Document Title" 
last_updated: "2025-01-27"  # This will become outdated
---
```

## 🛠️ Available Tools

### 1. Update Dates Script

**File**: `scripts/update-dates.sh`
**Purpose**: Updates all `last_updated` dates to current date
**Usage**: 
```bash
yarn update-dates
```

**What it does**:
- Finds all `.md` files in main repository (excludes submodules)
- Updates `last_updated: "YYYY-MM-DD"` format
- Updates `**Last Updated**: YYYY-MM-DD` format
- Creates backup files (`.bak`) then cleans them up

### 2. Manual Commands

```bash
# Find all files with outdated dates
grep -r "last_updated: \"2025-01-27\"" . --include="*.md" --exclude-dir=external-repos

# Update specific file
sed -i 's/last_updated: "2025-01-27"/last_updated: "2025-07-01"/g' filename.md
```

## 📋 Workflow Integration

### For New Documentation

1. **Use templates** from `ai-reference/templates/`
2. **Replace placeholder dates** with current date
3. **Review frontmatter** before committing

### For Existing Documentation

1. **Run date update script** before major releases
2. **Check submodules** separately (they're not updated by main script)
3. **Commit date updates** as maintenance commits

### For Submodules

The main script doesn't update submodules. For external repositories:

```bash
# Update console-docs submodule
cd external-repos/console-docs
../../../scripts/update-dates.sh  # Run from submodule directory
cd ../..
git add external-repos/console-docs
git commit -m "Update console-docs dates"
```

## 🔄 Automation Opportunities

### Future Improvements

1. **Pre-commit Hook**: Automatically update dates before commit
2. **Template Variables**: Use build-time date injection
3. **CI/CD Integration**: Update dates during build process
4. **Submodule Automation**: Include submodule date updates in workflows

### Example Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit
./scripts/update-dates.sh
git add -A
```

## 📊 Monitoring

### Regular Maintenance

- **Weekly**: Check for hardcoded dates in new files
- **Monthly**: Run full date update across all repositories
- **Before Releases**: Ensure all dates are current

### Detection Commands

```bash
# Find all hardcoded dates from January 2025
grep -r "2025-01-" . --include="*.md" --exclude-dir=external-repos

# Find all last_updated fields
grep -r "last_updated:" . --include="*.md" --exclude-dir=external-repos
```

---

**Best Practice**: Always use current dates and run `yarn update-dates` before major commits or releases. 