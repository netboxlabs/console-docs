---
hide:
  - navigation
  - toc
tags:
  - cloud
  - enterprise
  - community
  - discovery
  - assurance
  - operator
  - netbox
---

<div style="background-color: #02060A; margin: -2rem -2rem 0 -2rem; padding: 3rem 2rem;">

<style>
.product-card:hover {
  transform: translateY(-2px);
  border-color: #555 !important;
  background: #222 !important;
}

.product-links a:hover {
  opacity: 0.8;
}

.integration-card:hover {
  transform: translateY(-2px);
  border-color: #555 !important;
  background: #222 !important;
}

.resource-card:hover {
  transform: translateY(-2px);
  border-color: #555 !important;
  background: #222 !important;
}
</style>

# Welcome to the NetBox Labs Documentation Site 

<div style="text-align: center; margin: 2rem 0 4rem 0; color: #ccc; font-size: 1.125rem; line-height: 1.6;">
The home of documentation for NetBox <a href="Administration Console/console-access" style="color: #00d9be; text-decoration: none;">Cloud</a>, <a href="netbox-enterprise/nbe-overview" style="color: #ffac00; text-decoration: none;">Enterprise</a>, <a href="netbox-integrations/netbox-ansible-collection" style="color: #28a745; text-decoration: none;">Integrations</a>, <a href="sdks/pynetbox" style="color: #007bff; text-decoration: none;">SDKs</a> and <a href="netbox-extensions/diode/index" style="color: #6f42c1; text-decoration: none;">Extensions</a>.
</div>

<div style="text-align: center; margin: 4rem 0 3rem 0;">
  <h2 style="color: white; font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">Products</h2>
  <div style="width: 64px; height: 4px; background: linear-gradient(to right, #00d9be, #007bff); margin: 0 auto; border-radius: 2px;"></div>
</div>

<div class="products-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin: 3rem 0;">
  
  <!-- NetBox Card -->
  <div class="product-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <div class="product-header" style="display: flex; align-items: center; margin-bottom: 1rem;">
      <div class="icon-container" style="width: 48px; height: 48px; background: #000; border-radius: 8px; margin-right: 1rem; display: flex; align-items: center; justify-content: center;">
        <img src="images/netbox-favicon.png" alt="NetBox" style="width: 32px; height: 32px;" />
      </div>
      <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0;">NetBox</h3>
    </div>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      The world's leading network source of truth. Model, document, and automate your infrastructure.
    </p>
    <div class="product-links" style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="https://github.com/netbox-community/netbox" style="color: #00bee0; text-decoration: none; font-weight: 500;">Community</a>
      <a href="netbox-enterprise/nbe-overview" style="color: #ffac00; text-decoration: none; font-weight: 500;">Enterprise</a>
      <a href="NetBox Cloud/getting-started-with-nbc" style="color: #00d9be; text-decoration: none; font-weight: 500;">Cloud</a>
    </div>
  </div>

  <!-- Discovery Card -->
  <div class="product-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <div class="product-header" style="display: flex; align-items: center; margin-bottom: 1rem;">
      <div class="icon-container" style="width: 48px; height: 48px; background: #000; border-radius: 8px; margin-right: 1rem; display: flex; align-items: center; justify-content: center;">
        <div style="width: 32px; height: 32px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">D</div>
      </div>
      <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0;">Discovery</h3>
    </div>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      Automatically map your networks and infrastructure. Accelerate documentation and streamline operations.
    </p>
    <div class="product-links" style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="netbox-discovery/index" style="color: #00bee0; text-decoration: none; font-weight: 500;">Community</a>
      <a href="netbox-discovery/index" style="color: #ffac00; text-decoration: none; font-weight: 500;">Enterprise</a>
      <a href="netbox-discovery/index" style="color: #00d9be; text-decoration: none; font-weight: 500;">Cloud</a>
    </div>
  </div>

  <!-- Assurance Card -->
  <div class="product-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <div class="product-header" style="display: flex; align-items: center; margin-bottom: 1rem;">
      <div class="icon-container" style="width: 48px; height: 48px; background: #000; border-radius: 8px; margin-right: 1rem; display: flex; align-items: center; justify-content: center;">
        <div style="width: 32px; height: 32px; background: #6f42c1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">A</div>
      </div>
      <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0;">Assurance</h3>
    </div>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      Find and fix operational drift. Continuously monitor and detect deviations in your infrastructure.
    </p>
    <div class="product-links" style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="color: #666; font-weight: 500;">Community (Not Available)</span>
      <a href="netbox-assurance/index" style="color: #ffac00; text-decoration: none; font-weight: 500;">Enterprise</a>
      <a href="netbox-assurance/index" style="color: #00d9be; text-decoration: none; font-weight: 500;">Cloud (Coming Soon)</a>
    </div>
  </div>

  <!-- Operator Card -->
  <div class="product-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <div class="product-header" style="display: flex; align-items: center; margin-bottom: 1rem;">
      <div class="icon-container" style="width: 48px; height: 48px; background: #000; border-radius: 8px; margin-right: 1rem; display: flex; align-items: center; justify-content: center;">
        <div style="width: 32px; height: 32px; background: #fd7e14; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">O</div>
      </div>
      <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0;">Operator</h3>
    </div>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      AI superpowers for network engineers. Agentic AI operations with NetBox as your infrastructure map.
    </p>
    <div class="product-links" style="display: flex; flex-direction: column; gap: 0.5rem;">
      <span style="color: #666; font-weight: 500;">Community (Not Available)</span>
      <a href="netbox-operator/index" style="color: #ffac00; text-decoration: none; font-weight: 500;">Enterprise (Coming Soon)</a>
      <a href="netbox-operator/index" style="color: #00d9be; text-decoration: none; font-weight: 500;">Cloud (Coming Soon)</a>
    </div>
  </div>

</div>

<div style="text-align: center; margin: 6rem 0 3rem 0;">
  <h2 style="color: white; font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">Extensions & Integrations</h2>
  <div style="width: 64px; height: 4px; background: linear-gradient(to right, #6f42c1, #28a745); margin: 0 auto; border-radius: 2px;"></div>
</div>

<div class="integration-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin: 2rem 0;">
  
  <div class="integration-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">NetBox Branching Plugin</h3>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      Introduces branching functionality with discrete, static snapshots of the NetBox database that can be modified independently and merged back.
    </p>
    <a href="netbox-extensions/branching/index" style="color: #6f42c1; text-decoration: none; font-weight: 500;">Learn more about NetBox Branching →</a>
  </div>

  <div class="integration-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">NetBox Change Management Plugin</h3>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      Powerful workflows for team collaboration in designing, testing, and deploying network and infrastructure changes.
    </p>
    <a href="netbox-extensions/changes/index" style="color: #6f42c1; text-decoration: none; font-weight: 500;">Learn more about Change Management →</a>
  </div>

  <div class="integration-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Diode</h3>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      Data ingestion service that simplifies and enhances the process to add and update network data in NetBox.
    </p>
    <a href="netbox-extensions/diode/index" style="color: #6f42c1; text-decoration: none; font-weight: 500;">Learn more about Diode →</a>
  </div>

  <div class="integration-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">NetBox Ansible Collection</h3>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      Automate NetBox operations and integrate with your Ansible workflows for infrastructure as code.
    </p>
    <a href="netbox-integrations/netbox-ansible-collection" style="color: #28a745; text-decoration: none; font-weight: 500;">Learn more about Ansible Collection →</a>
  </div>

  <div class="integration-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">ServiceNow Integration</h3>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      Seamlessly integrate NetBox with ServiceNow for ITSM workflows and configuration management.
    </p>
    <a href="netbox-integrations/servicenow/index" style="color: #28a745; text-decoration: none; font-weight: 500;">Learn more about ServiceNow Integration →</a>
  </div>

  <div class="integration-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
    <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">PyNetBox SDK</h3>
    <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
      Python SDK for NetBox API integration. Build custom tools and automations with ease.
    </p>
    <a href="sdks/pynetbox" style="color: #007bff; text-decoration: none; font-weight: 500;">Learn more about PyNetBox →</a>
  </div>

</div>

</div>

<div style="background-color: #000; margin: 4rem -2rem 0 -2rem; padding: 3rem 2rem;">
  <div style="text-align: center; margin-bottom: 3rem;">
    <h2 style="color: white; font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">Open Source & Community</h2>
    <p style="color: #ccc; font-size: 1.125rem;">NetBox Labs builds software in the open, with thriving communities</p>
  </div>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
    
    <div class="resource-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
      <div style="display: flex; align-items: center; margin-bottom: 1rem;">
        <img src="images/netbox-favicon.png" alt="NetBox Community" style="width: 40px; height: 40px; margin-right: 1rem;" />
        <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0;">NetBox Community</h3>
      </div>
      <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
        NetBox exists to empower network engineers. Since 2016, it has become the go-to solution for modeling and documenting network infrastructure worldwide.
      </p>
      <a href="https://github.com/netbox-community/netbox" style="color: #00bee0; text-decoration: none; font-weight: 500;">Visit NetBox Community GitHub →</a>
    </div>

    <div class="resource-card" style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
      <div style="display: flex; align-items: center; margin-bottom: 1rem;">
        <div style="width: 40px; height: 40px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 1rem;">DA</div>
        <h3 style="color: white; font-size: 1.25rem; font-weight: bold; margin: 0;">Discovery Agent</h3>
      </div>
      <p style="color: #ccc; margin-bottom: 1.5rem; line-height: 1.5;">
        NetBox discovery agents map network resources and gather device information to build a comprehensive model of your infrastructure.
      </p>
      <a href="netbox-discovery/agent/index" style="color: #28a745; text-decoration: none; font-weight: 500;">Learn more about Discovery Agent →</a>
    </div>

  </div>
</div>
