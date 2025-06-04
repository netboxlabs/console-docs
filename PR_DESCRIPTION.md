# 📚 Documentation Update: Latest NetBox and Console Documentation with Configuration Enhancements

## Summary

This PR updates the external documentation repositories to pull in the latest changes from both NetBox Community and NetBox Enterprise documentation sources, and includes configuration improvements to ensure proper display of console documentation.

## 🔄 Submodule Updates

### NetBox Console Documentation (`console-docs`)
- **Updated from:** `9e72e47` → `e42e74b`
- **Key Changes:**
  - ✨ **Database Dump Documentation**: Added comprehensive database dump documentation (PR #123)
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

## 🔧 Configuration Improvements

### Docusaurus Configuration Enhancements
- **Enhanced File Processing**: Added explicit `include: ['**/*.md', '**/*.mdx']` to ensure all markdown files are processed
- **Improved Asset Serving**: Updated `staticDirectories` to include both console and netbox media directories
- **Better Documentation Visibility**: Configuration changes ensure console documentation appears properly in the unified site

## 📈 Impact

- **Total Documentation Files Processed**: 349 files
- **Files Requiring Transformation**: 12 files modified during MDX conversion
- **New Content Areas**: Enhanced ServiceNow integration documentation + Database dump guides
- **API Documentation**: Updated GraphQL filtering capabilities
- **Site Configuration**: Improved console documentation integration and asset serving

## 🔧 Technical Changes

- Updated git submodules to latest commits on `main` branches
- Regenerated Docusaurus sidebars (`sidebars/console.json`, `sidebars/netbox.json`)
- Processed all documentation through MkDocs → MDX transformation pipeline
- Applied automated processing for Django model documentation
- **Enhanced Docusaurus configuration for better console documentation display**

## ✅ Verification

- [x] Submodules successfully updated to latest versions
- [x] Documentation transformation completed without errors
- [x] Sidebar configurations regenerated
- [x] All 349 files processed successfully
- [x] 12 files properly transformed for Docusaurus compatibility
- [x] Configuration improvements applied for console documentation visibility
- [x] Static directories configured for proper asset serving

## 🚀 Deployment Notes

This update brings the latest documentation improvements to the unified NetBox Labs documentation site, including:
- Enhanced ServiceNow integration guides
- Comprehensive database dump documentation
- Improved console documentation display through configuration enhancements
- Better API documentation with GraphQL filtering updates

---

**Branch:** `docs-update-20250604-2`  
**Affected Areas:** External documentation, sidebars, transformed MDX files, Docusaurus configuration 