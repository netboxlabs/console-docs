---
tags:
  - ai-reference
  - cloud
  - enterprise
  - reference
  - ai-tools
  - authentication
  - tagging
  - navigation
  - documentation
sidebar_position: 999
description: AI Reference material for NetBox Labs documentation development
internal_only: false
draft: true
last_updated: '2025-06-25'
category: ai-reference
audience: developers
---
:::info Development Resource
This content is synced from console-docs/ai-reference for development team use.
:::

# Auto-Tagging Analysis Summary

## 📊 Current Status

- **Total files**: 101 markdown files
- **Already tagged**: 9 files (mostly migrated discovery docs)
- **Need tagging**: 92 files ready for automatic tagging

## 🎯 Smart Tagging Results by Category

### ☁️ **NetBox Cloud Only** (21 files)
**Directory**: `Administration Console/`, `cloud-connectivity/`
**Examples**:
- `Administration Console/free-plan-features.md` → **Cloud only** (free plan exclusive)
- `Administration Console/console-access.md` → **Cloud only** (console-specific)
- `cloud-connectivity/aws-private-link.md` → **Cloud only** (cloud networking)

### 🏢 **NetBox Enterprise Only** (6 files)
**Directory**: `netbox-enterprise/`
**Examples**:
- `netbox-enterprise/nbe-overview.md` → **Enterprise only**
- `netbox-enterprise/nbe-troubleshooting.md` → **Enterprise only**
- `netbox-enterprise/nbe-backups.md` → **Enterprise only**

### 🔗 **Cloud + Enterprise** (14 files)
**Multi-product features** (SSO, authentication, advanced features)
**Examples**:
- `Administration Console/azure-ad-sso-setup.md` → **Cloud + Enterprise** (SSO available in both)
- `netbox-enterprise/nbe-saml.md` → **Enterprise + Cloud** (SAML in both platforms)

### 🌍 **All Products** (29 files)
**Universal content** (integrations, SDKs, discovery, general docs)
**Examples**:
- `sdks/pynetbox.md` → **All products** (SDK works with all)
- `netbox-integrations/servicenow/` → **All products** (integration for all)
- `index.md` → **All products** (main landing page)

### 🔧 **Community + Enterprise** (22 files)
**Open source extensions and plugins**
**Examples**:
- `netbox-extensions/branching/` → **Community + Enterprise** (plugin ecosystem)
- `netbox-extensions/diode/` → **Community + Enterprise** (open source tooling)

## 🤖 How the Smart Logic Works

### 1. **Directory-Based Rules**
```
Administration Console/ → netbox-cloud
netbox-enterprise/     → netbox-enterprise
cloud-connectivity/    → netbox-cloud
netbox-extensions/     → netbox-community + netbox-enterprise
sdks/                  → All products
netbox-integrations/   → All products
```

### 2. **Content Analysis**
- **High confidence patterns** (weight 3):
  - "NetBox Cloud", "console.netboxlabs.com" → Cloud
  - "NetBox Enterprise", "nbe-", "installer" → Enterprise
  
- **Medium confidence patterns** (weight 2):
  - "community edition", "open source" → Community
  - "air-gap", "offline" → Air-gap
  
- **Low confidence patterns** (weight 1):
  - "free plan", "trial" → Cloud
  - "plugin", "extension" → Community + Enterprise
  - "SSO", "SAML", "LDAP" → Cloud + Enterprise

### 3. **Smart Refinements**
- **Free plan content** → Cloud only (exclusive feature)
- **SSO in Admin Console** → Cloud (cloud-specific implementation)
- **Enterprise installer docs** → Enterprise only (product-specific)
- **Discovery/Assurance** → All products (unless content specifies otherwise)

## 📋 Next Steps

### 1. **Preview and Validate** ✅ **DONE**
```bash
npm run preview-tags  # Shows what would be tagged
```

### 2. **Apply Auto-Tagging**
```bash
npm run auto-tag      # Applies tags to all 92 files
git diff             # Review the changes
```

### 3. **Manual Review**
- Check any files that seem incorrectly tagged
- Adjust edge cases manually
- Ensure sensitive content (like security features) are correctly categorized

### 4. **Test Integration**
```bash
mkdocs serve         # Test local build
# Check that tag pages work correctly
# Verify visual consistency
```

## 🎉 Benefits

### **For Documentation Team**:
- ✅ **No manual work** - 92 files tagged automatically
- ✅ **Consistent categorization** - Rule-based, not subjective
- ✅ **Smart edge case handling** - Context-aware refinements

### **For dochub Integration**:
- ✅ **Structured metadata** - Easy to parse and filter
- ✅ **Product-specific filtering** - Users can find relevant docs
- ✅ **SEO improvements** - Search engines understand categories

### **For Users**:
- ✅ **Better discovery** - Find docs for their specific product
- ✅ **Clear applicability** - Know what applies to their setup
- ✅ **Improved navigation** - Browse by product category

## 🔍 Quality Assurance

### **High Confidence Tags** (87 files)
- Directory-based rules provide strong confidence
- Content analysis confirms categorization
- Smart refinements handle edge cases

### **Review Recommended** (5 files)
Files that might need manual review:
- Complex multi-product features
- New content not fitting existing patterns
- Security/enterprise features with unclear scope

## 📈 Impact

- **92 files** will gain proper product categorization
- **100% coverage** for location-based tagging
- **Enhanced search** and filtering capabilities
- **Better user experience** on netboxlabs.com/docs

The auto-tagging system successfully categorizes the entire documentation set with high accuracy, providing a solid foundation for the new product tagging system! 
