# Workflow Fixes - Update Submodules Action

## Issues Addressed

This document outlines the fixes implemented for the `update-submodules.yml` GitHub Actions workflow to resolve several critical issues that were causing failures.

## 🔧 Fixed Issues

### 1. Submodule Restoration Failure

**Problem**: The workflow was failing with submodule restoration errors:
```
❌ NetBox submodule restoration failed!
Expected: $NETBOX_COMMIT
Got: $NETBOX_FINAL
```

**Root Cause**: After `yarn install` triggered the postinstall script that reset submodules, the workflow attempted to checkout specific commits without ensuring those commits were available locally.

**Solution**: Added `git fetch --all --tags` before attempting to checkout commits:
```bash
# Fetch all commits first to ensure they're available
cd external-repos/netbox
git fetch --all --tags
echo "NetBox: Checking out $NETBOX_COMMIT"
git checkout $NETBOX_COMMIT || (echo "Failed to checkout NetBox commit $NETBOX_COMMIT" && exit 1)
```

### 2. Permission Error for Label Creation

**Problem**: Workflow failing with:
```
RequestError [HttpError]: You do not have permission to create labels on this repository.
```

**Root Cause**: The workflow was attempting to add labels to PRs without proper error handling, and some configurations don't allow automated label creation.

**Solution**: 
- Added `issues: write` permission to the workflow
- Implemented graceful error handling for label creation:
```javascript
try {
  await github.rest.issues.addLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pr.number,
    labels: ['documentation', 'automated', 'submodule-update']
  });
  console.log("Added labels to PR #" + pr.number);
} catch (error) {
  if (error.message.includes('permission') || error.message.includes('unauthorized')) {
    console.warn('Skipping label creation: insufficient permissions. This is expected for some configurations.');
  } else {
    console.error('Unexpected error adding labels:', error.message);
    // Don't fail the workflow for label issues
  }
}
```

### 3. Incorrect File Change Detection

**Problem**: The workflow was analyzing transformed files in `docs/netbox/` and `docs/console/` instead of source files, missing changes that occurred in the actual source repositories.

**Root Cause**: The file analysis was looking at the wrong location - it should analyze changes in the submodule source directories, not the transformed output.

**Solution**: Created new step `analyze-source-changes` that:
- Analyzes changes directly in `external-repos/netbox/docs/`
- Analyzes changes in `external-repos/console-docs/docs/` and `external-repos/console-docs/overrides/`
- Uses `git diff --name-status` between commit ranges to detect actual source changes
- Properly handles both `.md` and `.html` files for console-docs

**Before**:
```bash
# Wrong - analyzing transformed files
grep "^A.*docs/netbox/.*\.md$" /tmp/git-status.txt
```

**After**:
```bash
# Correct - analyzing source files in submodules
cd external-repos/netbox
git diff --name-status $BEFORE_COMMIT..$AFTER_COMMIT -- docs/ | grep "^A" | cut -f2
```

### 4. Missing File Details in PR Descriptions

**Problem**: PR descriptions weren't showing specific file names that changed, making it difficult to understand what documentation was updated.

**Root Cause**: The file analysis wasn't properly capturing and displaying the actual changed files.

**Solution**: Enhanced PR description generation to:
- Show specific filenames that were added, modified, or removed
- Display up to 10 files per category with "more" indicators
- Clearly label sections as "Source Files" to distinguish from transformed output
- Include both NetBox and Console documentation changes

**Example Output**:
```
#### 📖 NetBox Documentation (Source Files)
**Modified (2):** installation-guide, api-reference (+3 more)

#### 🏢 Console Documentation (Source Files)  
**Added (1):** netbox-enterprise-setup
**Modified (1):** azure-sso-configuration
```

## 🎯 Key Improvements

### Enhanced Source Analysis
- **NetBox**: Analyzes `docs/` directory for `.md` files
- **Console**: Analyzes both `docs/` and `overrides/` directories for `.md` and `.html` files
- **Commit Range**: Uses proper git diff between before/after commits instead of git status

### Better Error Handling
- Graceful handling of permission errors
- Non-blocking label creation failures
- Comprehensive validation of git operations

### Improved PR Information
- More detailed file change summaries
- Better categorization of changes (Added/Modified/Removed)
- Source-focused analysis instead of transformation output

### Workflow Reliability
- Added git fetch operations to ensure commit availability
- Better validation of submodule states
- Enhanced debugging output for troubleshooting

## 🧪 Testing the Fixes

To test these fixes:

1. **Submodule Changes**: Make changes to files in `external-repos/netbox/docs/` or `external-repos/console-docs/docs/`
2. **Trigger Workflow**: Either wait for scheduled run or manually trigger with force_update
3. **Verify Results**: 
   - Check that submodule restoration completes successfully
   - Confirm PR descriptions show specific changed files
   - Verify labels are added (or gracefully skipped if permissions insufficient)

## 📋 Validation Checklist

- [x] Submodule restoration includes git fetch before checkout
- [x] Label creation has graceful error handling
- [x] File analysis targets source directories in submodules
- [x] PR descriptions include specific file change details
- [x] Console-docs analysis includes both docs/ and overrides/
- [x] NetBox analysis focuses on docs/ directory
- [x] Workflow permissions include issues: write
- [x] Error messages are clear and actionable

## 🔄 Related Files Modified

- `.github/workflows/update-submodules.yml` - Main workflow file with all fixes
- `WORKFLOW_FIXES.md` - This documentation file

## 📚 Additional Context

These fixes address the core issues that were preventing the automated documentation workflow from functioning properly. The changes maintain backward compatibility while significantly improving reliability and informativeness of the automated PRs.

The workflow now properly:
1. Handles submodule commit restoration after yarn install conflicts
2. Analyzes actual source file changes in the correct repositories
3. Provides detailed PR descriptions with specific file information
4. Gracefully handles permission limitations
5. Maintains comprehensive error logging for debugging 