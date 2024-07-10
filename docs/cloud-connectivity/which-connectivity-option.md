In many cases where cloud connectivity options seem necessary, NetBox Cloud offers [features](../cloud-connectivity/do-i-need-cloud-connectivity.md) that can address your needs without additional setup. In the majority of cases [Internet Delivery (Single Region)](../cloud-connectivity/internet-delivery.md) is the most appropriate connectivity option, but there are some general recommendations depending on your use case:


## Recommendations By Use Case
| Use Case                            | Recommendation                          | Reason                                                                                 |
|-------------------------------------|-----------------------------------------|----------------------------------------------------------------------------------------|
| **General Use**                     | [Internet Delivery (Single Region)](../cloud-connectivity/internet-delivery.md)       | Standard product, easy setup, and sufficient security for most use cases.              |
| **AWS-Centric Environments**        | [AWS Private Link (Single Region)](../cloud-connectivity/aws-private-link.md)        | Fast setup, private IPs, and good integration with AWS infrastructure.                 |
| **Secure, Site-to-Site Connections**| [IPSEC VPN Tunnels (Single Region)](../cloud-connectivity/ipsec-vpn-tunnels.md)       | High flexibility and security with VPN tunnels and routing options.                    |
| **High-Performance Needs (Single Region)** | [AWS Direct Connect (Single Region)](../cloud-connectivity/aws-direct-connect.md)   | Low latency, high performance, suitable for demanding applications.                    |
| **High-Performance, Multi-Region Needs** | [AWS Direct Connect (Multi-Region)](../cloud-connectivity/aws-direct-connect-multi-region.md)    | Highest performance, redundancy, and scalability across multiple regions.              |


## Detailed Breakdown
This matrix should help you identify the most suitable NetBox Cloud connectivity option based on your specific requirements and priorities:

| Criteria                          | [Internet Delivery (Single Region)](../cloud-connectivity/internet-delivery.md)      | [AWS Private Link (Single Region)](../cloud-connectivity/aws-private-link.md)          | [IPSEC VPN Tunnels (Single Region)](../cloud-connectivity/ipsec-vpn-tunnels.md)       | [AWS Direct Connect (Single Region)](../cloud-connectivity/aws-direct-connect.md)      | [AWS Direct Connect (Multi-Region)](../cloud-connectivity/aws-direct-connect-multi-region.md)      |
|-----------------------------------|----------------------------------------|-------------------------------------------|-----------------------------------------|----------------------------------------|----------------------------------------|
| **Ease of Setup**                 | Standard product, easy setup           | Fast turn-up times                        | Requires VPN configuration              | Requires Direct Connect setup          | Requires Direct Connect setup          |
| **Redundancy**                    | Single region. Multiple AZs            | Single region. Multiple AZs               | Single region. Multiple AZs. Single or dual tunnels | Single region. Multiple AZs. Single or dual Direct Connect options  | Multi Region. Multiple AZs. Replicated NetBoxes |
| **Cost**                          | Included                               | Low, due to Private Link                  | Medium, dependent on VPN set up         | Medium, due to Direct Connect          | Highest, due to multi-region setup |
| **Performance**                   | Standard internet performance          | Low latency due to Private Link           | Variable, dependent on VPN quality      | High performance, low latency          | Highest performance, low latency       |
| **Management Complexity**         | Low                                    | Medium                                    | High                                    | Medium                                 | High                                   |
| **Recommended For**               | General use                            | AWS-centric environments                  | Secure, site-to-site connections        | High-performance needs, single region  | High-performance, multi-region needs   |
