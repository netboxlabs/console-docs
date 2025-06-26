---
tags:
  - cloud
  - cloud-connectivity
  - networking
  - faq
  - troubleshooting
title: "Cloud Connectivity Frequently Asked Questions"
description: "Common questions and answers about NetBox Cloud connectivity options, setup, and troubleshooting."
author: "NetBox Labs Documentation Team"
last_updated: "2025-01-27"
versions:
  netbox_cloud: "v1.10"
status: "current"
category: "troubleshooting"
audience: "administrators"
complexity: "intermediate"
---

# Cloud Connectivity Frequently Asked Questions

## IPSEC VPN Tunnels

**Q. Why 2 tunnels?** </br>
**A.** The AWS VPN Gateway product provides 2 tunnels by default for resilience. Each terminates in a different availability zone.

## IPSEC VPN Tunnels + Direct Connect
**Q. Why /24 or /25?** </br>
**A.**  This is to host load balancers and proxies within the dedicated customer Account/VPC. Internally we will allocate a /27 per availability zone for each of the 3 availability zones.

## Direct Connect
**Q. Does the connection have to be dedicated?** </br>
**A.**  No, a VLAN can be added to an existing layer 2 fabric provider, such as Equinix Fabric.

**Q. How much bandwidth for hosted connections?** </br>
**A.**  50Mbps is fine.
