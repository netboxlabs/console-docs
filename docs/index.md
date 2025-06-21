---
hide:
  - navigation
  - toc
tags:
  - cloud
  - community
  - netbox
  - discovery
  - assurance
  - operator
  - api
  - authentication
  - administration
  - operations
  - installation
  - configuration
  - getting-started
  - automation
  - networking
  - integration
  - ai
title: Welcome to the NetBox Labs Documentation Site
---

<div class="homepage-hero">

<style>
.homepage-hero {
  background-color: #02060A;
  margin: -2rem -2rem 0 -2rem;
  padding: 3rem 2rem;
}

.hero-subtitle {
  text-align: center;
  margin: 2rem 0 4rem 0;
  color: #ccc;
  font-size: 1.125rem;
  line-height: 1.6;
}

.section-header {
  text-align: center;
  margin: 4rem 0 3rem 0;
}

.section-header h2 {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-divider {
  width: 64px;
  height: 4px;
  margin: 0 auto;
  border-radius: 2px;
}

.products-divider {
  background: linear-gradient(to right, #00d9be, #007bff);
}

.extensions-divider {
  background: linear-gradient(to right, #6f42c1, #28a745);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.integration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card,
.integration-card,
.resource-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  min-height: 320px;
  display: flex;
  flex-direction: column;
}

.product-card:hover,
.integration-card:hover,
.resource-card:hover {
  transform: translateY(-2px);
  border-color: #555;
  background: #222;
}

.product-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.icon-container {
  width: 48px;
  height: 48px;
  background: #000;
  border-radius: 8px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-img {
  width: 32px;
  height: 32px;
}

.icon-letter {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.discovery-icon {
  background: #28a745;
}

.assurance-icon {
  background: #6f42c1;
}

.operator-icon {
  background: #fd7e14;
}

.product-card h3,
.integration-card h3,
.resource-card h3 {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.product-card p,
.integration-card p,
.resource-card p {
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.product-links {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 90px;
}

.product-links a,
.product-links span {
  display: block;
  padding: 0.5rem 0;
  line-height: 1.3;
  font-size: 0.95rem;
  word-wrap: break-word;
  white-space: normal;
  font-weight: 500;
  text-decoration: none;
}

.link-community {
  color: #00bee0;
}

.link-enterprise {
  color: #ffac00;
}

.link-cloud {
  color: #00d9be;
}

.link-integrations {
  color: #28a745;
}

.link-sdks {
  color: #007bff;
}

.link-extensions {
  color: #6f42c1;
}

.unavailable {
  color: #666;
}

.product-links a:hover,
.integration-card a:hover,
.resource-card a:hover {
  opacity: 0.8;
}

.community-section {
  background-color: #000;
  margin: 4rem -2rem 0 -2rem;
  padding: 3rem 2rem;
}

.community-section .section-header h2 {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.community-section .section-header p {
  color: #ccc;
  font-size: 1.125rem;
}

.resource-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.resource-header img {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.da-icon {
  width: 40px;
  height: 40px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 1rem;
}
</style>

# Welcome to the NetBox Labs Documentation Site 

<div class="hero-subtitle">
The home of documentation for NetBox <a href="Administration Console/console-access" class="link-cloud">Cloud</a>, <a href="netbox-enterprise/nbe-overview" class="link-enterprise">Enterprise</a>, <a href="netbox-integrations/netbox-ansible-collection" class="link-integrations">Integrations</a>, <a href="sdks/pynetbox" class="link-sdks">SDKs</a> and <a href="netbox-extensions/diode/index" class="link-extensions">Extensions</a>.
</div>

<div class="section-header">
  <h2>Products</h2>
  <div class="section-divider products-divider"></div>
</div>

<div class="products-grid">
  
  <!-- NetBox Card -->
  <div class="product-card">
    <div class="product-header">
      <div class="icon-container">
        <img src="images/netbox-favicon.png" alt="NetBox" class="icon-img" />
      </div>
      <h3>NetBox</h3>
    </div>
    <p>
      The world's leading network source of truth. Model, document, and automate your infrastructure.
    </p>
    <div class="product-links">
      <a href="https://github.com/netbox-community/netbox" class="link-community">Community</a>
      <a href="netbox-enterprise/nbe-overview" class="link-enterprise">Enterprise</a>
      <a href="NetBox Cloud/getting-started-with-nbc" class="link-cloud">Cloud</a>
    </div>
  </div>

  <!-- Discovery Card -->
  <div class="product-card" >
    <div class="product-header" >
      <div class="icon-container" >
        <div class="icon-letter discovery-icon">D</div>
      </div>
      <h3 >Discovery</h3>
    </div>
    <p >
      Automatically map your networks and infrastructure. Accelerate documentation and streamline operations.
    </p>
    <div class="product-links">
      <a href="netbox-discovery/index" class="link-community">Community</a>
      <a href="netbox-discovery/index" class="link-enterprise">Enterprise</a>
      <a href="netbox-discovery/index" class="link-cloud">Cloud</a>
    </div>
  </div>

  <!-- Assurance Card -->
  <div class="product-card" >
    <div class="product-header" >
      <div class="icon-container" >
        <div class="icon-letter assurance-icon">A</div>
      </div>
      <h3 >Assurance</h3>
    </div>
    <p >
      Find and fix operational drift. Continuously monitor and detect deviations in your infrastructure.
    </p>
    <div class="product-links">
      <span class="unavailable">Community (Not Available)</span>
      <a href="netbox-assurance/index" class="link-enterprise">Enterprise</a>
      <a href="netbox-assurance/index" class="link-cloud">Cloud (Coming Soon)</a>
    </div>
  </div>

  <!-- Operator Card -->
  <div class="product-card" >
    <div class="product-header" >
      <div class="icon-container" >
        <div class="icon-letter operator-icon">O</div>
      </div>
      <h3 >Operator</h3>
    </div>
    <p >
      AI superpowers for network engineers. Agentic AI operations with NetBox as your infrastructure map.
    </p>
    <div class="product-links">
      <span class="unavailable">Community (Not Available)</span>
      <a href="netbox-operator/index" class="link-enterprise">Enterprise (Coming Soon)</a>
      <a href="netbox-operator/index" class="link-cloud">Cloud (Coming Soon)</a>
    </div>
  </div>

</div>

<div class="section-header">
  <h2>Extensions & Integrations</h2>
  <div class="section-divider extensions-divider"></div>
</div>

<div class="integration-grid">
  
  <div class="integration-card" >
    <h3 >NetBox Branching Plugin</h3>
    <p >
      Introduces branching functionality with discrete, static snapshots of the NetBox database that can be modified independently and merged back.
    </p>
    <a href="netbox-extensions/branching/index" class="link-extensions">Learn more about NetBox Branching →</a>
  </div>

  <div class="integration-card" >
    <h3 >NetBox Change Management Plugin</h3>
    <p >
      Powerful workflows for team collaboration in designing, testing, and deploying network and infrastructure changes.
    </p>
    <a href="netbox-extensions/changes/index" class="link-extensions">Learn more about Change Management →</a>
  </div>

  <div class="integration-card" >
    <h3 >Diode</h3>
    <p >
      Data ingestion service that simplifies and enhances the process to add and update network data in NetBox.
    </p>
    <a href="netbox-extensions/diode/index" class="link-extensions">Learn more about Diode →</a>
  </div>

  <div class="integration-card" >
    <h3 >NetBox Ansible Collection</h3>
    <p >
      Automate NetBox operations and integrate with your Ansible workflows for infrastructure as code.
    </p>
    <a href="netbox-integrations/netbox-ansible-collection" class="link-integrations">Learn more about Ansible Collection →</a>
  </div>

  <div class="integration-card" >
    <h3 >ServiceNow Integration</h3>
    <p >
      Seamlessly integrate NetBox with ServiceNow for ITSM workflows and configuration management.
    </p>
    <a href="netbox-integrations/servicenow/index" class="link-integrations">Learn more about ServiceNow Integration →</a>
  </div>

  <div class="integration-card" >
    <h3 >PyNetBox SDK</h3>
    <p >
      Python SDK for NetBox API integration. Build custom tools and automations with ease.
    </p>
    <a href="sdks/pynetbox" class="link-sdks">Learn more about PyNetBox →</a>
  </div>

</div>

</div>

<div class="community-section">
  <div class="section-header">
    <h2>Open Source & Community</h2>
    <p>NetBox Labs builds software in the open, with thriving communities</p>
  </div>
  
  <div class="community-grid">
    
    <div class="resource-card" >
      <div class="resource-header">
        <img src="images/netbox-favicon.png" alt="NetBox Community" />
        <h3 >NetBox Community</h3>
      </div>
      <p >
        NetBox exists to empower network engineers. Since 2016, it has become the go-to solution for modeling and documenting network infrastructure worldwide.
      </p>
      <a href="https://github.com/netbox-community/netbox" class="link-community">Visit NetBox Community GitHub →</a>
    </div>

    <div class="resource-card" >
      <div class="resource-header">
        <div class="da-icon">DA</div>
        <h3 >Discovery Agent</h3>
      </div>
      <p >
        NetBox discovery agents map network resources and gather device information to build a comprehensive model of your infrastructure.
      </p>
      <a href="netbox-discovery/agent/index" class="link-integrations">Learn more about Discovery Agent →</a>
    </div>

  </div>
</div>
