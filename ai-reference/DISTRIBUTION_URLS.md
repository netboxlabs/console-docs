---
title: "Distribution URLs Quick Reference"
description: "Quick reference for all distribution URLs available from the documentation hub"
tags:
  - distribution
  - urls
  - reference
  - customer-messages
  - helm
  - enterprise
author: "NetBox Labs Documentation Team"
category: "reference"
audience: "internal"
complexity: "beginner"
internal_only: true
---

# Distribution URLs Quick Reference

This document provides a quick reference for all distribution URLs available from the NetBox Labs documentation hub.

## 🔗 Active Distribution URLs

### Customer Messages Feed System

| Resource | URL | Purpose |
|----------|-----|---------|
| **RSS Feed** | `https://netboxlabs.com/docs/feeds/customer-messages.xml` | RSS 2.0 feed for NetBox Enterprise console integration |

**Cache Settings**: 60-minute TTL for urgent message delivery  
**Format**: Standard RSS 2.0 XML format for enterprise compatibility

### NetBox Enterprise Helm Documentation

| Resource | URL | Purpose |
|----------|-----|---------|
| **Values Template** | `https://netboxlabs.com/docs/files/helm/values-extra.yaml` | Customer customization overlay template |
| **Validator Script** | `https://netboxlabs.com/docs/files/helm/validate-config.sh` | Configuration validation script |
| **Usage Guide** | `https://netboxlabs.com/docs/guides/helm/helm-values-guide.md` | Complete deployment documentation |
| **Full Installation Guide** | `https://netboxlabs.com/docs/guides/helm/netbox-enterprise-helm-complete.md` | Comprehensive A-Z installation guide (1400+ lines) |

**Registry Compatibility**: All resources work with `registry.replicated.com`

## 📋 Quick Commands

### For Customer Success Team (Messages)
```bash
# Download and test RSS feed
curl https://netboxlabs.com/docs/feeds/customer-messages.xml

# Update RSS feed
vim static/feeds/customer-messages.xml
git add static/feeds/customer-messages.xml && git commit -m "Update customer messages" && git push
```

### For Enterprise Support Team (Helm)
```bash
# Download resources for customer
curl -O https://netboxlabs.com/docs/files/helm/values-extra.yaml
curl -O https://netboxlabs.com/docs/files/helm/validate-config.sh
chmod +x validate-config.sh

# Update documentation
vim static/files/helm/values-extra.yaml
vim static/files/helm/validate-config.sh
vim static/guides/helm/helm-values-guide.md
git add static/ && git commit -m "Update Helm documentation" && git push
```

### For Customers (Helm Deployment)
```bash
# Download and validate
curl -O https://netboxlabs.com/docs/files/helm/values-extra.yaml
curl -O https://netboxlabs.com/docs/files/helm/validate-config.sh
chmod +x validate-config.sh
./validate-config.sh

# Deploy with overlay
helm install netbox-enterprise \
  oci://registry.replicated.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-extra.yaml \
  --version 1.11.4
```

## 🔒 Access Control

- **Public Access**: All URLs are publicly accessible
- **Hidden from Navigation**: Not listed in site navigation or search
- **Direct URL Only**: Must be accessed via direct URL
- **No Indexing**: Excluded from search engines and Algolia

## 📊 File Locations in Repository

```
static/
├── feeds/
│   └── customer-messages.xml          # RSS feed for console integration
├── files/helm/
│   ├── index.html                     # File navigation index
│   ├── values-extra.yaml              # Helm values template
│   ├── validate-config.sh             # Configuration validator
│   ├── private-registry.yaml          # Private registry template
│   └── private-registry.sh            # Registry setup script
└── guides/helm/
    ├── index.html                     # Guide navigation index
    ├── helm-values-guide.md           # Complete usage guide
    └── netbox-enterprise-helm-*.md   # Installation guides (7 files)
```

## 🚀 Deployment Notes

- **Automatic**: All files deploy automatically via Vercel
- **CDN Cached**: Served via Vercel Edge Network
- **Fast Updates**: Changes appear within minutes of git push
- **High Availability**: Vercel's global CDN ensures uptime

## 📂 Recent Improvements (2025)

### **Reorganization & Professional Enhancement**
**Background**: Helm documentation was reorganized and professionally enhanced for enterprise customers.

**Key Changes**:
- **Structure**: Moved all Helm files into `/helm/` subdirectories for better organization
- **Professional Styling**: Removed emojis, enhanced file card design with improved contrast and visual hierarchy
- **Environment-Aware Links**: Fixed file download links to work correctly in both local development and production
- **Content Quality**: Replaced AI-generated content with professional technical documentation
- **Navigation**: Added HTML index pages for user-friendly browsing
- **Rendering**: Guides processed by Docusaurus for enhanced presentation while maintaining direct access

### **Technical Fixes**
- **✅ Local Development Compatibility**: File links now work correctly in `yarn dev` environment
- **✅ Production Links**: All URLs function properly on `netboxlabs.com/docs`
- **✅ MDX Compilation**: Fixed template literal formatting issues in code blocks
- **✅ Professional Appearance**: Clean, enterprise-appropriate styling throughout

**Benefits**: Clean organization, professional presentation, environment compatibility, direct distribution access.

---

**Status**: Production Ready | **Recent Improvements**: Professional enhancement completed  
**Next Review**: As needed for new distribution requirements 

*Note: Last updated timestamps are automatically managed by Git via Docusaurus configuration* 