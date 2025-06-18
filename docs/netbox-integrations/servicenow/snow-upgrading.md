---
title: Upgrades and Bug Fixes
tags:
  - cloud
  - enterprise
  - community
---# Upgrades and Bug Fixes

## Distribution and Installation

Upgrades, patches, and hotfixes for the NetBox CMDB Integration application are distributed through XML update sets, which can be obtained from NetBox Labs support.


### Critical: Review Update Status

After committing any update set, it is **essential** to review the update status for potential skipped records:

1. **Access Update Status**
   - Navigate to **All > Upgrade Center > Upgrade History**
   - Click on the related list link in colomn "Skipped"

2. **Identify Skipped Records**
   - Skipped records indicate potential conflicts or issues
   - Common causes include:
     - Local customizations conflicting with updates
     - Missing dependencies
     - Permission restrictions
     - Data validation failures

3. **Resolution Actions**
   - Review each skipped record individually
   - Determine if manual intervention is required
   - Consult with your system administrator if needed
   - Document any unresolved skips for support escalation

4. **ServiceNow Documentation**
   - For detailed guidance on handling skipped records, refer to the official ServiceNow documentation.

## Update Types and Considerations

### Major Version Upgrades
- **Planning Required**: May include significant changes to data model or functionality
- **Testing Recommended**: Test in development environment before production deployment
- **Backup Advised**: Create system backup before applying major updates
- **Documentation Review**: Review release notes for breaking changes or new requirements

### Patches and Minor Updates
- **Focused Changes**: Target specific issues or improvements
- **Lower Risk**: Generally safer to apply directly to production
- **Cumulative**: May include fixes from previous patches
- **Quick Deployment**: Usually faster to install and commit

### Hotfixes
- **Urgent Nature**: Address critical issues requiring immediate attention
- **Emergency Process**: May bypass standard testing procedures
- **Limited Scope**: Focus on specific critical problems
- **Rapid Deployment**: Prioritized for quick resolution

## Best Practices for Updates

### Pre-Update Preparation
1. **Environment Assessment**
   - Document current application version
   - Note any local customizations
   - Review system compatibility

2. **Backup Strategy**
   - Create update set backup of current configuration
   - Document critical business processes
   - Ensure rollback plan is available

3. **Testing Protocol**
   - Test updates in development environment when possible
   - Validate core functionality after update
   - Verify integration points remain functional

### During Update Process
1. **Monitoring**
   - Monitor system performance during installation
   - Watch for error messages or warnings
   - Document any unexpected behavior

2. **Communication**
   - Notify relevant stakeholders of update schedule
   - Coordinate with business users for testing
   - Maintain communication with NetBox Labs support if needed

### Post-Update Validation
1. **Functional Testing**
   - Test core synchronization processes
   - Verify API connectivity remains stable
   - Validate data integrity between systems

2. **Performance Monitoring**
   - Monitor system performance for any degradation
   - Check integration hub flow execution
   - Review system logs for new errors or warnings

3. **User Acceptance**
   - Coordinate with business users for validation
   - Gather feedback on any functional changes
   - Address any user-reported issues promptly

## Troubleshooting Update Issues

| Issue | Possible Cause | Resolution |
|-------|---------------|------------|
| Update Set Import Fails | File corruption or incompatible version | Re-download from NetBox Labs |
| Preview Shows Conflicts | Local customizations conflict with updates | Review conflicts and resolve manually |
| Commit Fails | Dependency issues or permission problems | Check dependencies and admin privileges |
| Records Skipped | Data validation or conflict issues | Review skipped records per ServiceNow documentation |
| Post-Update Errors | Configuration mismatches | Verify configuration and consult support |
| Performance Degradation | Resource conflicts or inefficient changes | Monitor system resources and contact support |

