# NetBox Labs Documentation Navigation Restructuring Specification

**Document Version:** 1.0  
**Date:** July 7, 2025  
**From:** Console-Docs Team  
**To:** Dochub Integration Team  

## 🎯 Executive Summary

The console-docs repository has implemented a major navigation restructuring to organize NetBox Discovery, NetBox Assurance, Extensions, Integrations, and SDKs under edition-specific sections (Community, Cloud, Enterprise). This change requires coordination with the dochub repository to implement the same structure on the customer-facing documentation site at netboxlabs.com/docs.

## 📋 Current vs. Proposed Navigation Structure

### **BEFORE (Current Live Structure)**
```
netboxlabs.com/docs/
├── Community (from netbox/netbox repo)
├── Cloud (from console-docs repo)
├── Enterprise (from console-docs repo)
├── Discovery & Assurance (from console-docs repo)
│   ├── NetBox Discovery
│   └── NetBox Assurance
├── Extensions (from console-docs repo)
│   ├── Branching
│   ├── Change Management
│   └── Diode
├── Integrations (from console-docs repo)
└── SDKs (from console-docs repo)
```

### **AFTER (Proposed New Structure)**
```
netboxlabs.com/docs/
├── Community
│   ├── [NetBox Core] (from netbox/netbox repo)
│   ├── NetBox Discovery (from console-docs repo)
│   ├── Extensions
│   │   └── Diode (from console-docs repo)
│   ├── Integrations (from console-docs repo)
│   └── SDKs (from console-docs repo)
├── Cloud
│   ├── [Cloud Admin] (from console-docs repo)
│   ├── NetBox Discovery (from console-docs repo)
│   ├── NetBox Assurance (from console-docs repo)
│   ├── Extensions
│   │   ├── Branching (from console-docs repo)
│   │   ├── Change Management (from console-docs repo)
│   │   └── Diode (from console-docs repo)
│   ├── Integrations (from console-docs repo)
│   └── SDKs (from console-docs repo)
└── Enterprise
    ├── [Enterprise Admin] (from console-docs repo)
    ├── NetBox Discovery (from console-docs repo)
    ├── NetBox Assurance (from console-docs repo)
    ├── Extensions
    │   ├── Branching (from console-docs repo)
    │   ├── Change Management (from console-docs repo)
    │   └── Diode (from console-docs repo)
    ├── Integrations (from console-docs repo)
    └── SDKs (from console-docs repo)
```

## 🔧 Technical Implementation Requirements

### **1. Content Availability Matrix**

| Feature | Community | Cloud | Enterprise | Source Repository |
|---------|-----------|-------|------------|-------------------|
| **NetBox Core** | ✅ | ✅ | ✅ | netbox/netbox |
| **NetBox Discovery** | ✅ | ✅ | ✅ | console-docs |
| **NetBox Assurance** | ❌ | ✅ | ✅ | console-docs |
| **Extensions - Diode** | ✅ | ✅ | ✅ | console-docs |
| **Extensions - Branching** | ❌ | ✅ | ✅ | console-docs |
| **Extensions - Change Mgmt** | ❌ | ✅ | ✅ | console-docs |
| **Integrations - All** | ✅ | ✅ | ✅ | console-docs |
| **SDKs - All** | ✅ | ✅ | ✅ | console-docs |

### **2. Navigation Mapping Configuration**

```yaml
# Proposed dochub navigation configuration
navigation_structure:
  community:
    sources:
      - repository: "netbox/netbox"
        content: "core documentation"
        nav_prefix: ""
      - repository: "console-docs"
        content: "netbox-discovery/**"
        nav_prefix: "NetBox Discovery"
      - repository: "console-docs"
        content: "netbox-extensions/diode/**"
        nav_prefix: "Extensions/Diode"
      - repository: "console-docs"
        content: "netbox-integrations/**"
        nav_prefix: "Integrations"
      - repository: "console-docs"
        content: "sdks/**"  
        nav_prefix: "SDKs"

  cloud:
    sources:
      - repository: "console-docs"
        content: "Administration Console/**"
        nav_prefix: "Administration"
      - repository: "console-docs"
        content: "cloud-connectivity/**"
        nav_prefix: "Cloud Connectivity"
      - repository: "console-docs"
        content: "netbox-discovery/**"
        nav_prefix: "NetBox Discovery"
      - repository: "console-docs"
        content: "netbox-assurance/**"
        nav_prefix: "NetBox Assurance"
      - repository: "console-docs"
        content: "netbox-extensions/**"
        nav_prefix: "Extensions"
      - repository: "console-docs"
        content: "netbox-integrations/**"
        nav_prefix: "Integrations"
      - repository: "console-docs"
        content: "sdks/**"
        nav_prefix: "SDKs"

  enterprise:
    sources:
      - repository: "console-docs"
        content: "netbox-enterprise/**"
        nav_prefix: "Installation & Admin"
      - repository: "console-docs"
        content: "netbox-discovery/**"
        nav_prefix: "NetBox Discovery"
      - repository: "console-docs"
        content: "netbox-assurance/**"
        nav_prefix: "NetBox Assurance"
      - repository: "console-docs"
        content: "netbox-extensions/**"
        nav_prefix: "Extensions"
      - repository: "console-docs"
        content: "netbox-integrations/**"
        nav_prefix: "Integrations"
      - repository: "console-docs"
        content: "sdks/**"
        nav_prefix: "SDKs"
```

### **3. Content Filtering Logic**

```python
# Proposed content filtering logic for dochub
def filter_content_by_edition(content_path, edition):
    """
    Filter content based on NetBox edition availability
    """
    edition_rules = {
        'community': {
            'allowed_paths': [
                'netbox-discovery/**',
                'netbox-extensions/diode/**',
                'netbox-integrations/**',
                'sdks/**'
            ],
            'blocked_paths': [
                'netbox-assurance/**',
                'netbox-extensions/branching/**',
                'netbox-extensions/changes/**'
            ]
        },
        'cloud': {
            'allowed_paths': ['**'],  # All content allowed
            'blocked_paths': []
        },
        'enterprise': {
            'allowed_paths': ['**'],  # All content allowed  
            'blocked_paths': []
        }
    }
    
    return check_path_allowed(content_path, edition_rules[edition])
```

## 📄 File Changes in Console-Docs Repository

### **Modified Files:**
1. **`mkdocs.yml`** - Complete navigation restructuring
2. **`docs/netbox-discovery/index.md`** - Enhanced with Orb framework details
3. **`docs/netbox-discovery/quickstart-guide.md`** - Expanded quickstart content
4. **`docs/netbox-discovery/agent/index.md`** - Comprehensive agent overview
5. **`docs/netbox-discovery/agent/device_discovery.md`** - Enhanced device discovery
6. **`docs/netbox-discovery/agent/network_discovery.md`** - Enhanced network discovery
7. **`docs/netbox-assurance/index.md`** - Complete rewrite with release dates

### **Key Content Updates:**
- **NetBox Assurance release dates**: June 23, 2025 (Enterprise), July 7, 2025 (Cloud)
- **Enhanced use case framework**: Day 1/Day 1.5/Day 2 scenarios
- **Controller integration roadmap**: Specific dates for VMware, Juniper, Cisco, etc.
- **Operational drift detection**: Comprehensive workflow documentation
- **Security and performance guidance**: Enhanced technical details

## 🔄 Integration Architecture Questions

### **Questions for Dochub Team:**

#### **1. Current Integration Mechanism**
- How does dochub currently merge content from multiple repositories?
- What's the existing logic for combining netbox/netbox and console-docs content?
- Are there existing content filtering mechanisms by edition?

#### **2. Navigation Configuration**
- Where is the master navigation configuration stored in dochub?
- How are navigation updates currently deployed and tested?
- Is there existing support for nested navigation structures?

#### **3. Content Processing**
- How are the edition pills (`<span class="pill pill-cloud">`) currently processed?
- Is there existing logic to show/hide content based on NetBox edition?
- How are duplicate content paths handled across editions?

#### **4. Version Management**
- How does dochub handle version-specific content from console-docs?
- Are there mechanisms to show/hide content based on release dates?
- How is the version strategy coordinated between repositories?

#### **5. URL Management**
- Will this restructuring break existing customer bookmarks?
- Are there redirect mechanisms to maintain backward compatibility?
- How are canonical URLs managed for shared content?

## 🚨 Risk Assessment & Mitigation

### **High Risk Items:**
1. **Broken Customer Links** - Existing bookmarks may break
   - **Mitigation**: Implement URL redirects for old paths
   
2. **Content Duplication** - Same content appearing in multiple sections
   - **Mitigation**: Implement content deduplication logic
   
3. **Edition Confusion** - Users may access wrong edition content
   - **Mitigation**: Clear edition indicators and content filtering

4. **Search Functionality** - Search results may be confusing with new structure
   - **Mitigation**: Update search indexing and result presentation

### **Medium Risk Items:**
1. **Navigation Complexity** - Deeper nesting may confuse users
   - **Mitigation**: User testing and feedback collection
   
2. **Maintenance Overhead** - More complex navigation to maintain
   - **Mitigation**: Automated testing and validation

## 📅 Implementation Timeline

### **Phase 1: Planning & Coordination (Week 1-2)**
- [ ] Dochub team reviews this specification
- [ ] Technical architecture discussion and alignment
- [ ] Implementation approach agreement
- [ ] Risk mitigation strategy finalization

### **Phase 2: Development (Week 3-4)**
- [ ] Dochub navigation configuration updates
- [ ] Content filtering logic implementation
- [ ] URL redirect mapping creation
- [ ] Automated testing setup

### **Phase 3: Testing (Week 5-6)**
- [ ] Staging environment deployment
- [ ] Navigation structure validation
- [ ] Content availability testing per edition
- [ ] URL backward compatibility verification
- [ ] Search functionality testing

### **Phase 4: Deployment (Week 7)**
- [ ] Production deployment coordination
- [ ] Monitoring and issue response
- [ ] Customer communication if needed
- [ ] Rollback plan activation if required

## 🧪 Testing Requirements

### **Pre-Deployment Testing Checklist:**
- [ ] **Navigation Structure**: All sections render correctly
- [ ] **Content Filtering**: Edition-specific content shows/hides properly
- [ ] **URL Compatibility**: Existing links continue to work
- [ ] **Search Functionality**: Results are relevant and properly categorized
- [ ] **Mobile Responsiveness**: Navigation works on mobile devices
- [ ] **Performance**: Page load times remain acceptable
- [ ] **Cross-Browser**: Functionality works across major browsers

### **Post-Deployment Monitoring:**
- [ ] **404 Error Tracking**: Monitor for broken links
- [ ] **User Behavior**: Track navigation usage patterns
- [ ] **Search Analytics**: Monitor search success rates
- [ ] **Customer Feedback**: Collect user experience feedback

## 📞 Contact Information

### **Console-Docs Team:**
- **Primary Contact**: [Your Name/Email]
- **Technical Lead**: [Technical Lead Name/Email]
- **Repository**: https://github.com/netboxlabs/console-docs
- **PR Reference**: feat/navigation-restructure-and-docs-enhancement

### **Required Response:**
1. **Technical feasibility assessment** - Can dochub implement this structure?
2. **Implementation timeline estimate** - How long will changes take?
3. **Resource requirements** - What resources are needed from console-docs team?
4. **Risk concerns** - Any additional risks we haven't considered?
5. **Testing coordination** - How should we coordinate testing efforts?

## 📋 Next Steps

### **Immediate Actions Required:**
1. **Dochub team review** of this specification document
2. **Technical architecture meeting** to discuss implementation approach
3. **Timeline coordination** with console-docs team
4. **Risk assessment validation** and mitigation planning

### **Success Criteria:**
- ✅ Customer-facing site reflects new navigation structure
- ✅ Edition-specific content filtering works correctly
- ✅ No broken links or 404 errors for existing customers
- ✅ Search functionality maintains effectiveness
- ✅ User experience improves with clearer content organization

---

**This document serves as the primary coordination artifact between console-docs and dochub teams. Please review, provide feedback, and schedule coordination meetings to begin implementation planning.** 