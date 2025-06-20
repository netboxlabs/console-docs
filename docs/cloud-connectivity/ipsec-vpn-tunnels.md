In this solution NetBox Cloud is securely delivered over an IPSEC VPN. You have single or dual tunnel options, and use a static route or the preferred option of BGP routing. Customer IP space (/24 or /25) is assigned for the VPC as this is required to host load balancers and proxies within the dedicated customer Account/VPC.

Internally we will allocate a /27 per availability zone for each of the 3 availability zones. The AWS VPN Gateway product provides 2 tunnels by default for resilience, and each terminates in a different availability zone.

![IPSEC VPN](../images/cloud-connectivity/ipsec-vpn.png)

## Redundancy options
With the IPSEC VPN solution there are options for Single, Active/Passive and Active/Active Firewalls:

![IPSEC redundancy options](../images/cloud-connectivity/ipsec-redundancy-options.png)
