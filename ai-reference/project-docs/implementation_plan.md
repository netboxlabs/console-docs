# NetBox Labs Documentation Navigation Restructuring - Implementation Plan

## 🎯 Technical Feasibility Assessment

**ANSWER: YES - This restructuring is technically feasible with the current dochub architecture.**

### Current Architecture Strengths:
- ✅ Existing transformation pipeline (`scripts/transformDocs.ts`) can be extended
- ✅ Sidebar generation system already supports complex nested structures
- ✅ Git submodule system can handle the console-docs changes
- ✅ Docusaurus supports multiple navigation configurations

## 🔧 Required Implementation Changes

### **1. Enhanced Transformation System**

#### **A. Content Filtering Logic**
```typescript
// New content filtering system in transformDocs.ts
interface EditionConfig {
  name: 'community' | 'cloud' | 'enterprise';
  allowedPaths: string[];
  blockedPaths: string[];
}

const editionConfigs: EditionConfig[] = [
  {
    name: 'community',
    allowedPaths: [
      'netbox-discovery/**',
      'netbox-extensions/diode/**',
      'netbox-integrations/**',
      'sdks/**'
    ],
    blockedPaths: [
      'netbox-assurance/**',
      'netbox-extensions/branching/**',
      'netbox-extensions/changes/**'
    ]
  },
  {
    name: 'cloud',
    allowedPaths: ['**'], // All content allowed
    blockedPaths: []
  },
  {
    name: 'enterprise',
    allowedPaths: ['**'], // All content allowed
    blockedPaths: []
  }
];
```

#### **B. Multi-Edition Sidebar Generation**
```typescript
// Generate edition-specific sidebars
const generateEditionSidebars = async () => {
  for (const edition of ['community', 'cloud', 'enterprise']) {
    const filteredContent = filterContentByEdition(consoleContent, edition);
    const sidebar = generateSidebar(filteredContent, edition);
    await writeFile(`sidebars/console-${edition}.json`, JSON.stringify(sidebar, null, 2));
  }
};
```

### **2. Navigation Configuration Updates**

#### **A. New Sidebar Structure**
```typescript
// sidebars.ts - New structure
const sidebars: SidebarsConfig = {
  defaultSidebar: [
    {
      type: "category",
      label: "Community",
      items: [
        {
          type: "category",
          label: "NetBox Core",
          items: netboxSidebar as any
        },
        ...communityConsoleSidebar
      ]
    },
    {
      type: "category", 
      label: "Cloud",
      items: cloudConsoleSidebar
    },
    {
      type: "category",
      label: "Enterprise", 
      items: enterpriseConsoleSidebar
    }
  ]
};
```

#### **B. Content Availability Matrix Implementation**
```typescript
// Content filtering based on edition availability
const contentMatrix = {
  'netbox-core': ['community', 'cloud', 'enterprise'],
  'netbox-discovery': ['community', 'cloud', 'enterprise'],
  'netbox-assurance': ['cloud', 'enterprise'], // Not in community
  'extensions-diode': ['community', 'cloud', 'enterprise'],
  'extensions-branching': ['cloud', 'enterprise'], // Not in community
  'extensions-changes': ['cloud', 'enterprise'], // Not in community
  'integrations': ['community', 'cloud', 'enterprise'],
  'sdks': ['community', 'cloud', 'enterprise']
};
```

### **3. URL Management & Redirects**

#### **A. Redirect Mapping**
```typescript
// URL redirect configuration for backward compatibility
const redirects = [
  { from: '/docs/Discovery & Assurance/NetBox Discovery', to: '/docs/Community/NetBox Discovery' },
  { from: '/docs/Discovery & Assurance/NetBox Discovery', to: '/docs/Cloud/NetBox Discovery' },
  { from: '/docs/Discovery & Assurance/NetBox Discovery', to: '/docs/Enterprise/NetBox Discovery' },
  { from: '/docs/Extensions/Branching', to: '/docs/Cloud/Extensions/Branching' },
  { from: '/docs/Extensions/Change Management', to: '/docs/Cloud/Extensions/Change Management' },
  // ... more redirects
];
```

#### **B. Docusaurus Redirect Plugin**
```typescript
// docusaurus.config.ts
plugins: [
  [
    '@docusaurus/plugin-client-redirects',
    {
      redirects: redirectMapping,
      createRedirects(existingPath) {
        // Handle dynamic redirects for old structure
        return generateDynamicRedirects(existingPath);
      },
    },
  ],
]
```

## ⏱️ Implementation Timeline Estimate

### **Phase 1: Core Architecture (Week 1-2)**
- [ ] **Week 1**: Modify `transformDocs.ts` for content filtering
- [ ] **Week 1**: Implement edition-specific sidebar generation  
- [ ] **Week 2**: Update `sidebars.ts` with new navigation structure
- [ ] **Week 2**: Add redirect configuration

### **Phase 2: Content Processing (Week 3-4)**  
- [ ] **Week 3**: Implement content availability matrix filtering
- [ ] **Week 3**: Test transformation with console-docs navigation changes
- [ ] **Week 4**: Generate edition-specific documentation builds
- [ ] **Week 4**: Validate content filtering accuracy

### **Phase 3: Testing & Validation (Week 5-6)**
- [ ] **Week 5**: Staging environment deployment and testing
- [ ] **Week 5**: Navigation structure validation across editions
- [ ] **Week 6**: URL backward compatibility testing
- [ ] **Week 6**: Search functionality verification

### **Phase 4: Production Deployment (Week 7)**
- [ ] **Production deployment coordination**
- [ ] **Monitoring and issue response**
- [ ] **Rollback plan if needed**

## 🚨 Risk Assessment & Mitigation

### **HIGH RISK - Mitigated**
1. **Broken Customer Links** 
   - ✅ **Mitigation**: Comprehensive redirect mapping implemented
   - ✅ **Testing**: Automated link validation in CI/CD

2. **Content Duplication**
   - ✅ **Mitigation**: Edition-specific filtering prevents duplication
   - ✅ **Testing**: Content audit scripts to detect duplicates

### **MEDIUM RISK - Manageable**
3. **Search Functionality Impact**
   - ✅ **Mitigation**: Algolia index reconfiguration for new structure
   - ✅ **Testing**: Search result validation per edition

4. **Navigation Complexity**
   - ✅ **Mitigation**: User testing feedback collection
   - ✅ **Testing**: Mobile navigation validation

## 💻 Resource Requirements

### **From Console-Docs Team:**
- [ ] **Coordination meetings**: 2-3 sessions for alignment
- [ ] **Content validation**: Review transformed content accuracy
- [ ] **Testing support**: Validate edition-specific content filtering

### **From Dochub Team:**
- [ ] **Development effort**: ~3-4 weeks full-time equivalent
- [ ] **Testing coordination**: Staging environment setup and validation
- [ ] **Deployment planning**: Production rollout coordination

## ✅ Success Criteria Validation

- ✅ **Technical Feasibility**: Current architecture supports all requirements
- ✅ **Content Filtering**: Edition-specific content can be implemented
- ✅ **Navigation Structure**: Docusaurus supports nested navigation
- ✅ **URL Compatibility**: Redirect system will maintain backward compatibility
- ✅ **Search Integration**: Algolia can be reconfigured for new structure

## 🔄 Next Steps - IMMEDIATE ACTIONS

### **1. Technical Architecture Meeting** 
**WHEN**: This week
**WHO**: Console-docs team + Dochub maintainers
**AGENDA**: 
- Review this implementation plan
- Finalize content filtering approach
- Agree on testing strategy

### **2. Development Sprint Planning**
**WHEN**: After architecture meeting
**DELIVERABLES**:
- Detailed technical specifications
- Development task breakdown
- Testing checklist creation

### **3. Staging Environment Setup**
**WHEN**: Week 2
**PURPOSE**: 
- Test navigation restructuring
- Validate content filtering
- URL redirect verification

## 📞 Coordination Response

**ANSWERS TO CONSOLE-DOCS TEAM QUESTIONS:**

1. **Technical feasibility**: ✅ **YES** - Fully feasible with current architecture
2. **Timeline estimate**: **7 weeks total** (3-4 weeks development + testing)
3. **Resource requirements**: **Moderate** - primarily dochub development effort
4. **Risk concerns**: **Manageable** - comprehensive mitigation strategies identified
5. **Testing coordination**: **Collaborative** - joint staging environment validation

**RECOMMENDATION**: Proceed with implementation using this phased approach. 