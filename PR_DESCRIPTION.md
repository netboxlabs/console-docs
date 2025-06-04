# 📚 Documentation Update: Latest NetBox and Console Documentation

## Summary

This PR updates the external documentation repositories to pull in the latest changes from both NetBox Community and NetBox Enterprise documentation sources.

## 🔄 Submodule Updates

### NetBox Console Documentation (`console-docs`)
- **Updated from:** `eaee5e6` → `9e72e47`
- **Key Changes:**
  - ✨ **ServiceNow Integration Documentation**: Added expanded ServiceNow documentation (PR #126)
  - 📝 **Hostname Management Updates**: Updated headings in managing hostnames documentation for consistency
  - 📊 **File Count**: Increased from 320 to 324 files (+4 new documentation files)

### NetBox Community Documentation (`netbox`)
- **Updated from:** `065511f` → `ecb8656` (NetBox v4.3.1-30)
- **Key Changes:**
  - 🌐 **Translation Updates**: Updated source translation strings
  - 🔍 **GraphQL Enhancement**: Allow filtering IP addresses by family in GraphQL API
  - 🐛 **Bug Fixes**: 
    - Fixed occupied filter to match interfaces terminating wireless links (#19587)
    - Show description on provider account detail view (#19623)
  - 📝 **Documentation Consistency**: Updated documentation for improved consistency (#19619)

## 📈 Impact

- **Total Documentation Files Processed**: 349 files
- **Files Requiring Transformation**: 12 files modified during MDX conversion
- **New Content Areas**: Enhanced ServiceNow integration documentation
- **API Documentation**: Updated GraphQL filtering capabilities

## 🔧 Technical Changes

- Updated git submodules to latest commits on `main` branches
- Regenerated Docusaurus sidebars (`sidebars/console.json`, `sidebars/netbox.json`)
- Processed all documentation through MkDocs → MDX transformation pipeline
- Applied automated processing for Django model documentation

## ✅ Verification

- [x] Submodules successfully updated to latest versions
- [x] Documentation transformation completed without errors
- [x] Sidebar configurations regenerated
- [x] All 349 files processed successfully
- [x] 12 files properly transformed for Docusaurus compatibility

## 🚀 Deployment Notes

This update brings the latest documentation improvements to the unified NetBox Labs documentation site, including enhanced ServiceNow integration guides and improved API documentation.

---

**Branch:** `docs-update-20250604`  
**Affected Areas:** External documentation, sidebars, transformed MDX files 