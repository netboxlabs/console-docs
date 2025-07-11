---
tags:
  - enterprise
  - netbox
  - installation
  - ubuntu
  - requirements
  - kubernetes
  - administration
versions:
  netbox_enterprise: "v1.10"
status: "current"
---

# NetBox Enterprise Requirements for Ubuntu

Ubuntu-specific preparation steps. See the main [requirements document](nbe-ec-requirements.md) for general requirements and special cases.

!!! note "Firewall Configuration"
    Choose either direct iptables (Required Commands) OR UFW (Optional section), not both, to avoid conflicts.

## Tested Versions

- Ubuntu 22.04 LTS (Jammy Jellyfish)
- Ubuntu 24.04 LTS (Noble Numbat)

## Required Commands (Direct iptables approach)

```bash
# Disable swap
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Install iptables-persistent
sudo apt update && sudo apt install -y iptables-persistent

# Configure pod networking (required for Kubernetes - skip if using UFW)
sudo iptables -I FORWARD -s 10.244.0.0/17 -d 10.244.128.0/17 -j ACCEPT
sudo iptables -I OUTPUT -s 10.244.0.0/17 -d 10.244.128.0/17 -j ACCEPT
sudo iptables -I FORWARD -s 10.244.128.0/17 -d 10.244.0.0/17 -j ACCEPT
sudo iptables -I OUTPUT -s 10.244.128.0/17 -d 10.244.0.0/17 -j ACCEPT
sudo netfilter-persistent save

# Load kernel modules (identical to RHEL requirements)
sudo modprobe br_netfilter ip_vs ip_vs_rr ip_vs_wrr ip_vs_sh overlay
cat <<EOF | sudo tee /etc/modules-load.d/kubernetes.conf
br_netfilter
ip_vs
ip_vs_rr
ip_vs_wrr
ip_vs_sh
overlay
EOF
sudo sysctl --system

# Reboot and proceed with installation
sudo reboot now
```

## Optional: If Using UFW

!!! warning "UFW and iptables"
    If using UFW, apply pod networking rules through UFW instead of direct iptables to avoid conflicts.

```bash
# Install and configure UFW for Kubernetes ports
sudo apt install -y ufw
sudo ufw --force enable
sudo ufw allow 6443/tcp
sudo ufw allow 2379:2380/tcp
sudo ufw allow 10250,10251,10252,10255,5473,10257,10259/tcp
sudo ufw allow 30000:32767/tcp
sudo ufw allow 4789/udp
sudo ufw allow 179/tcp

# Configure pod networking through UFW (instead of direct iptables)
sudo ufw route allow from 10.244.0.0/17 to 10.244.128.0/17
sudo ufw route allow from 10.244.128.0/17 to 10.244.0.0/17

sudo ufw reload
```

After reboot, follow the [installation guide](nbe-ec-installation.md). 