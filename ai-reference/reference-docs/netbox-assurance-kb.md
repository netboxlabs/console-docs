---
tags:
  - ai-reference
  - cloud
  - enterprise
  - community
  - assurance
  - discovery
  - reference
  - ai-tools
  - authentication
  - tagging
  - documentation
sidebar_position: 999
description: AI Reference material for NetBox Labs documentation development
internal_only: true
draft: true
last_updated: '2025-06-25'
category: ai-reference
audience: developers
---
:::info Development Resource
This content is synced from console-docs/ai-reference for development team use.
:::

# LLM Knowledge Base \- NetBox Assurance

# LLM Behavior Instructions

You are a helpful assistant for NetBox Labs internal staff to answer questions about NetBox Assurance. Use the provided documentation to answer questions clearly and accurately.  
If you don’t know the answer or need more context, ask a clarifying question. Do not make up information.  
If the user asks something outside the scope of the documentation, say so politely and suggest next steps (e.g., request additional information from the product management team or review official docs).  
If you cannot answer a question confidently, clearly state that more information is needed. Do not guess.  
Keep answers concise and friendly. When possible, reference the section or topic your answer comes from.

## Examples

"I'm not sure I have enough information to answer that accurately. Could you clarify what you're referring to?"  
"To help with that, I need a bit more context — can you tell me which feature or configuration you're working with?"

# NetBox Assurance

## What is NetBox Assurance

* NetBox Assurance allows customers to control which data goes into NetBox. It does this by giving users a view of the difference between the data in their NetBox (representing the intended state of the infrastructure) and the data in their network (the operational state of the infrastructure). We call this difference “operational drift”, or simply “drift”. This is different from “configuration drift”, which is the difference between the running configuration on a network device and the intended configuration. NetBox Assurance detects and manages “operational drift”, but not “configuration drift” today.  
* NetBox Discovery includes a family of capabilities for finding what is out there on the network including Network Discovery, Device Discovery and a constantly growing list of Controller Discovery integrations including VMWare vCenter, Juniper Mist, Cisco Catalyst Center, Microsoft DHCP, AWS VPC IPAM and many more to come. These pull the latest information from the network and expose them to the user for processing in NetBox Assurance.  
* NetBox Assurance provides a public API (via the Diode SDK) to allow ingestion of data about the network from just about any system or data source, including monitoring/observability systems, inventory systems, CMDBs, spreadsheets. The Diode SDK is available for Python and Golang.

## Problem being solved by NetBox Assurance

* Finding and fixing operational drift is a game-changer for network teams striving to maintain reliable documentation of intent as the foundation for network automation, compliance, and operational excellence.  
* Without good network documentation networking teams suffer friction in their manual and automated processes, but all network documentation is eventually out of date. NetBox Assurance gives operators the tools to make sure that their documentation is always up-to-date while keeping them fully in control.  
* Assurance allows operators onboarding to NetBox the ability to review the data (including the proposed updates to NetBox) prior to adding it to NetBox.  
* Finally and most importantly, Assurance enables operators to identify changes in the operational configuration of the network that indicate drift from the intended configuration as documented in NetBox, and quickly understand and resolve that drift.

## Value of solving this problem

Accurate network documentation is foundational for high-performance networking teams, enabling them to scale operations efficiently, minimize downtime, and improve service quality. Solving the problem of operational drift and ensuring that NetBox remains a reliable source of truth brings several key benefits:

### Improved Network Reliability and Stability

* Ensures that teams always have an up-to-date view of their infrastructure, reducing the risk of unexpected failures caused by undocumented changes.  
* Reduces troubleshooting time by providing accurate, real-time insights into the current and expected network state.  
* Detects and flags unauthorized or unintended changes, preventing network misconfigurations that can lead to outages.

### Increased Operational Efficiency

* Streamlines network management by eliminating the manual effort needed to validate and correct network documentation.  
* Reduces the reliance on custom scripts and manual audits, freeing up engineers to focus on higher-value tasks.  
* Enables automation efforts by ensuring that NetBox data remains accurate and trustworthy.

### Faster Incident Resolution and Reduced Downtime

* Provides immediate visibility into changes that may be impacting network performance, helping teams respond proactively rather than reactively.  
* Reduces Mean Time to Repair (MTTR) by ensuring operators have full context about the intended versus actual state of the network.  
* Enhances root cause analysis by maintaining a clear historical record of operational drift and deviations.

### Strengthened Security and Compliance

* Helps enforce governance and compliance policies by identifying unauthorized network changes.  
* Supports regulatory and security frameworks (e.g., PCI-DSS, SOC 2, NIST, ISO 27001\) by providing a structured approach to tracking network changes.  
* Reduces the risk of security breaches caused by undocumented or accidental modifications to network infrastructure.

### Accelerated Network Automation and Transformation

* Enables a smooth transition toward network automation by ensuring a reliable and up-to-date source of truth.  
* Provides a feedback loop for network automation processes, detecting drift and enabling automated remediation.  
* Gives teams confidence to adopt Infrastructure as Code (IaC) practices by ensuring alignment between intended and actual network states.

### Enhanced Collaboration Across Teams

* Bridges the gap between NetOps, SecOps, and DevOps teams by providing a unified and accurate network data source.  
* Improves coordination between teams by highlighting discrepancies early, reducing friction in change management and deployment workflows.  
* Supports better decision-making by providing a consistent and validated dataset for all stakeholders.

### Competitive Advantage and Business Agility

* Enables organizations to scale their network operations efficiently without being bogged down by manual processes.  
* Supports business growth by reducing operational risks associated with network changes and misconfigurations.  
* Provides a foundation for innovative networking practices, ensuring teams can move fast while maintaining confidence in their infrastructure.

## Specific use cases

### Day 1 \- Initial population of NetBox

* All teams start with an empty NetBox. Using NetBox Assurance teams can stay in control as they rapidly populate their NetBox instance with data from the NetBox Discovery family of capabilities (network discovery, device discovery, controller integrations discovery).  
* This gives teams insight into the data being onboarded and the ability to refine that data as they move through the first important steps of getting in control of their networks.  
* Outcome: faster time to value with NetBox, confidence in the data going into NetBox

### Day 1.5 \- Staying in control while improving network management maturity

* Getting networking documentation under control is a gradual process and it is imperative that teams are able to keep going with day to day operations while this is underway  
* NetBox Assurance gives teams a clear understanding of how their documentation processes are progressing, while also highlighting areas that need further improvement  
* For example it may be that after documenting a part of the network NetBox Assurance shows that the network is drifting from the documentation. This points teams in the right direction for process improvements, including network automation efforts.  
* Outcome: accelerating transformation/automation

### Day 2 \- Staying in control

* As teams approach higher levels of operational maturity the drift between their documentation and their network reduces, but they need to remain hyper vigilant not to slide backwards  
* NetBox Assurance gives network operators timely and accurate information about parts of their network that are changing outside of the process, whether due to human error or technical fault  
* This allows teams to respond immediately to operational drift, armed with full context about the issue at hand  
* Outcome: faster time to remediate drift, reduction in time to resolve operational issues, less downtime, less risk, confidence to move faster

## How does this work with NetBox, NetBox Cloud/NetBox Enterprise, NetBox Discovery

### NetBox Community Edition

* NetBox Assurance is a commercial product that is available to NetBox Cloud and NetBox Enterprise customers, however some of the underlying technologies including Diode and Orb agents are available to all users.

### NetBox Cloud

* NetBox Assurance is an optional add-on for NetBox Cloud. When purchased, its services are provisioned in the cloud and securely integrated with the NetBox Cloud instance. Additionally, the NetBox Assurance UI and Diode data plugins are automatically installed on the instance.

### NetBox Enterprise

* NetBox Assurance is an optional component of NetBox Enterprise and is included in the installation bundle. During installation, the customer license file determines whether NetBox Assurance is enabled. If entitled, the installation deploys NetBox Assurance services along with the NetBox Assurance UI and Diode data plugins.

## How does this relate to Diode

* Diode is a source-available project from NetBox Labs that offers a subset of NetBox Assurance functionality for loading data into NetBox. It is fully compatible with the NetBox Discovery agent and works across all NetBox editions.  
* Diode and NetBox Assurance share a common API for data ingestion, the Diode SDK, which is available for Python and Golang. This interface provides an alternative API for sending data to NetBox, featuring built-in idempotence, automatic ordering, and other capabilities designed to simplify the development of high-performance, low-maintenance integrations.

## Pricing/packaging

* NetBox Assurance is available as an add-on for NetBox Cloud and NetBox Enterprise but is not offered as a standalone product for the NetBox Community edition.  
* Each Assurance tier includes a designated volume of ingested entities per month, with the option to purchase additional capacity as needed.  
* The NetBox Discovery agent is included with NetBox Assurance, while agent extensions—provided as controller discovery integrations—are available in Standard and Premium bundles for Professional and Enterprise tiers. These controller discovery integrations include VMWare vCenter, Juniper Mist, Cisco Catalyst Center, Microsoft DHCP, and AWS VPC IPAM.

## Vision/roadmap

### NetBox Discovery:

* Agent released: December 2024  
  * Controller discovery Integrations as agent extensions added: January 2025  
  * Git-management of agent configurations added: March 2025  
  * Network discovery improvements (port scanning): March 2025  
  * Secrets manager integration (HashiCorp Vault): April 2025

### Diode (source available project)**:** 

* Source available release (enhancements vs public preview from 2024): April 2025

### NetBox Assurance: 

* Released for NetBox Enterprise: April 2025  
  * Released for NetBox Cloud: May 2025  
  * Planned feature enhancements:  
    * Event triggers and notifications  
    * API  
    * Analytics  
    * Automated actions  
    * Drift detection of device configurations (“configuration drift”)

## Anecdotal workflows

### Data Ingestion

* Network information is sent to NetBox Assurance as ingested messages. These messages can originate from network discovery processes, direct interrogation of network devices to collect inventory and configuration data, or other sources of network information.

### Analysis & Comparison

* Ingested messages are analyzed against existing NetBox data to identify matches and detect potential deviations from the intended network state. These deviations are considered “operational drift”, or simply “drift”.

### Deviation Review

* Users can review detected deviations and examine proposed updates (change sets) based on identified operational drift with NetBox.

### Action & Resolution

* Users can take action on deviations by:  
  * Applying changes to NetBox, either in the main branch or a specific user branch.  
    * Recalculating drift by rediffing changes against updated data.  
    * Ignoring deviations as needed.

## Competitive landscape

NetBox Assurance operates in the network source of truth (NSoT), network automation, and configuration validation space. It competes with traditional network monitoring, compliance tools, and automation platforms, while also differentiating itself with its deep integration into NetBox Cloud & Enterprise.

### Legacy Network Configuration & Compliance Tools

These solutions focus on configuration auditing, compliance enforcement, and policy validation but often lack the flexibility of a modern NetDevOps workflow.

* Competitors:  
  * Cisco NSO (Network Services Orchestrator)  
  * SolarWinds Network Configuration Manager (NCM)  
  * HP Aruba NetEdit  
  * BlueCat Integrity  
  * Infoblox NetMRI  
* How NetBox Assurance Differentiates:  
  * Integrated directly with NetBox as a single source of truth  
  * Modern API-driven architecture vs. older UI-heavy interfaces  
  * Lightweight agent-based approach vs. complex legacy deployments  
  * Drift detection and proactive insights vs. reactive auditing  
  * Vendor agnostic, suitable for heterogeneous environments

### Network Automation & NetDevOps Platforms

These platforms enable automated network changes, validation, and configuration management. Some overlap with NetBox Assurance in drift detection and config validation.

* Competitors:  
  * Ansible Network Automation (Red Hat)  
  * Nautobot (Network to Code)  
  * Batfish (Intentionet)  
  * Sonic (Microsoft's open network OS)  
  * Kentik (Network Observability)  
* How NetBox Assurance Differentiates:  
  * Tight integration with NetBox’s structured data model  
  * Automated reconciliation with NetBox as a source of truth  
  * Lightweight ingestion model (agents & API-based) vs. full automation platforms  
  * User-branch-based workflows for controlled updates

### Full-Stack Observability & Monitoring Tools

While NetBox Assurance isn’t a monitoring tool, some observability platforms offer topology insights, drift detection, and change validation as part of their broader feature set.

* Competitors:  
  * ThousandEyes (Cisco)  
  * Kentik (Network Observability)  
  * Splunk for Network Observability  
  * Datadog Network Performance Monitoring (NPM)  
  * AppNeta (Broadcom)  
* How NetBox Assurance Differentiates:  
  * Not just monitoring—assurance and reconciliation  
  * Source-of-truth-centric (NetBox-driven) vs. flow-based analytics  
  * Configuration-level drift detection, not just performance visibility  
  * Tighter integration with NetBox Cloud & Enterprise

### Open-Source & Community Alternatives

Some users may attempt to build their own assurance workflows using open-source tools, but these lack the fully integrated experience of NetBox Assurance.

* Competitors:  
  * Homegrown NetBox \+ Ansible validation scripts  
  * Batfish (Open-source network config validation)  
  * Nornir (Python automation framework)  
  * Custom monitoring pipelines with Prometheus/Grafana  
* How NetBox Assurance Differentiates:  
  * Fully supported commercial product (vs. DIY open-source)  
  * Seamless integration into NetBox Enterprise & Cloud  
  * Pre-built agent-based ingestion and automated drift detection  
  * No need for custom scripting & maintenance overhead

### Market Positioning

* For NetBox users: Assurance is a natural extension for managing real-time network state and validation.  
* For enterprises with automation goals: Assurance is a low-friction way to introduce drift detection without committing to full automation.  
* For regulated industries: It provides an audit-friendly, compliance-ready way to validate and reconcile network state.

## Indicators of relevance for a prospect / customer

### Technological Indicators

These indicators help determine if a prospect’s tech stack, tools, and workflows align with NetBox Assurance.

* Existing NetBox Usage  
  * Already using NetBox Cloud or NetBox Enterprise (strongest signal).  
  * Using NetBox Community but struggling with drift management and may be willing to upgrade.  
  * Many and frequent API integrations with NetBox for automation.  
* Complex Network Environments  
  * Multi-vendor, multi-cloud, or hybrid infrastructure.  
  * Managing hundreds to thousands of network devices (switches, routers, firewalls, virtual appliances).  
  * Using multi-site deployments or large data centers.  
* Network Automation & Orchestration Focus  
  * Heavy use of Ansible, Terraform, or other network automation tools.  
  * Using CI/CD pipelines for network changes.  
  * Implementing Infrastructure as Code (IaC) for networking.  
* Monitoring & Observability Tooling  
  * Using network observability or telemetry tools like Prometheus, Grafana, Datadog, Splunk, or ThousandEyes.  
  * Strong need for real-time drift detection and event correlation.  
  * Using log-based or flow-based monitoring but lacks structured documentation or configuration validation.

### Organizational Indicators

These are attributes of the company and team structure that indicate a need for NetBox Assurance.

*  Industry & Compliance Needs  
  * Operating in regulated industries (finance, healthcare, government, telecom, etc.).  
  * Subject to compliance frameworks like PCI-DSS, SOC 2, NIST, ISO 27001, or HIPAA.  
  * Strict change management and auditing requirements.  
* Company Size & Network Scope  
  * Enterprise-scale organizations with global IT/network operations.  
  * Service Providers (ISPs, MSPs, SaaS companies, large cloud platforms) with multi-tenant network environments.  
* Security & Change Management Focus  
  * Organizations with dedicated network security teams focused on change tracking and enforcement.  
  * Regular security audits requiring configuration validation.

### Operational Indicators

These signals come from day-to-day network operations and highlight pain points that NetBox Assurance can address.

* Frequent Configuration Drift & Manual Validation  
  * Struggling with network inconsistencies across environments.  
  * Relying on manual comparisons or custom scripts to detect changes.  
  * High risk of misconfigurations leading to outages or security issues.  
* Slow or Risky Change Management Processes  
  * Long network change review cycles due to lack of confidence in updates.  
  * High number of change rollback events due to unintended consequences.  
  * Difficulty enforcing intended configurations at scale.  
* Lack of Visibility into Network State  
  * Teams find it difficult to validate if the network matches NetBox’s source of truth.  
  * Struggling with incomplete or outdated network documentation.  
  * No automated reconciliation process for detected deviations.  
* Desire to Improve Network Operations Efficiency  
  * Looking to reduce operational overhead with automated validation.  
  * Need for better collaboration between NetOps, SecOps, and DevOps teams.  
  * Seeking proactive detection of network changes rather than reactive fixes.

By combining these signals, you can qualify potential customers in stages:

* **Strong Fit:**  
  * Existing NetBox Cloud/Enterprise user.  
  * Manages a large-scale, hybrid, or multi-cloud network.  
  * Actively using network automation tools (Ansible, Terraform, etc.).  
  * Facing challenges with drift detection, compliance, or auditing.  
* **Moderate Fit:**  
  * Uses NetBox Community Edition but has scaling and drift management issues.  
  * Interested in automation and network validation but not yet fully implemented.  
  * Compliance and security concerns but no formalized drift detection process.  
* **Low Fit / Long-Term Potential:**  
  * Small network teams with limited automation and basic configuration management.  
  * Minimal change control processes.  
  * Limited reliance on NetBox (or still exploring its capabilities).

## Ideal Customer Profile (IC

Key Considerations for Targeting ICPs:

* Who needs proactive assurance? → Industries where compliance, uptime, and network accuracy are critical.  
* Who struggles with drift and misconfigurations? → Teams managing large, distributed, or automated networks.  
* Who is already using NetBox? → Existing NetBox Cloud and NetBox Enterprise customers are the most direct targets.


For NetBox Assurance, the Ideal Customer Profiles (ICPs) would likely include organizations that have a strong need for network visibility, configuration validation, and automated drift detection. Given its integration with NetBox Cloud and NetBox Enterprise, the following ICPs make the most sense:

### Large Enterprises with Complex Networks

* Who they are: Enterprises with multi-vendor, multi-cloud, and hybrid IT environments.  
* Pain Points:  
  * Managing a large, distributed network with diverse infrastructure.  
  * Struggling with configuration drift, compliance enforcement, and network documentation.  
  * Need for continuous validation to ensure the network state matches expectations.  
* Why NetBox Assurance?  
  * Provides automated drift detection and reconciliation.  
  * Ensures network data accuracy across teams.  
  * Supports compliance and security audits.

### Service Providers & MSPs (Managed Service Providers)

* Who they are: Companies managing infrastructure for multiple customers, including ISPs, cloud service providers, and telecom operators.  
* Pain Points:  
  * Need to track and manage diverse customer networks efficiently.  
  * Ensuring real-time synchronization between customer infrastructure and documented network data.  
  * High cost of manual audits and compliance checks.  
* Why NetBox Assurance?  
  * Automates validation and alerting for network changes.  
  * Scales with multi-tenant architectures.  
  * Reduces operational costs by automating drift detection and correction.

### Financial & Regulated Industries (Banks, Insurance, Healthcare, Government, etc.)

* Who they are: Organizations that must strictly adhere to compliance, security, and regulatory requirements (e.g., PCI-DSS, HIPAA, SOC 2, NIST).  
* Pain Points:  
  * Need for strict change tracking and auditability.  
  * Ensuring the network complies with security and operational policies.  
  * Challenges in identifying unauthorized changes or deviations.  
* Why NetBox Assurance?  
  * Provides real-time visibility into unauthorized or non-compliant changes.  
  * Enhances network security posture by preventing misconfigurations.  
  * Facilitates audit readiness with automated reports and historical comparisons.

### Cloud & SaaS Companies with Rapidly Changing Infrastructure

* Who they are: Tech companies operating at scale, deploying containerized, virtual, or hybrid networks.  
* Pain Points:  
  * Constantly evolving infrastructure with frequent changes.  
  * Ensuring that network data is always accurate and up to date.  
* Why NetBox Assurance?  
  * Provides automated validation in dynamic environments.  
  * Reduces engineering overhead for maintaining network documentation.  
  * Improves efficiency in network troubleshooting and change management.

### Enterprises with Automation & NetDevOps Initiatives

* Who they are: Organizations that have invested in network automation using tools like Ansible, Terraform, and CI/CD pipelines.  
* Pain Points:  
  * Need for continuous validation of automated network changes.  
  * Ensuring automated provisioning doesn’t create inconsistencies.  
  * Struggling with real-time reconciliation of infrastructure changes.  
* Why NetBox Assurance?  
  * Seamlessly integrates with existing automation workflows.  
  * Detects and flags unintended changes before deployment.  
  * Provides a structured process for drift remediation.

