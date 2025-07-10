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

## Tested Versions

- Ubuntu 22.04 LTS (Jammy Jellyfish)
- Ubuntu 24.04 LTS (Noble Numbat)

## Ubuntu-Specific Commands

```bash
# Disable swap
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Configure firewall
sudo apt update && sudo apt install -y ufw iptables-persistent
sudo ufw --force enable
sudo ufw allow 6443/tcp
sudo ufw allow 2379:2380/tcp
sudo ufw allow 10250,10251,10252,10255,5473,10257,10259/tcp
sudo ufw allow 30000:32767/tcp
sudo ufw allow 4789/udp
sudo ufw allow 179/tcp
sudo ufw reload

# Configure pod networking (required for Kubernetes)
sudo iptables -I FORWARD -s 10.244.0.0/17 -d 10.244.128.0/17 -j ACCEPT
sudo iptables -I OUTPUT -s 10.244.0.0/17 -d 10.244.128.0/17 -j ACCEPT
sudo iptables -I FORWARD -s 10.244.128.0/17 -d 10.244.0.0/17 -j ACCEPT
sudo iptables -I OUTPUT -s 10.244.128.0/17 -d 10.244.0.0/17 -j ACCEPT
sudo netfilter-persistent save

# Load kernel modules
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

# Install containerd (optional)
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update && sudo apt install -y containerd.io
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
sudo systemctl enable --now containerd

# Reboot and proceed with installation
sudo reboot now
```

After reboot, follow the [installation guide](nbe-ec-installation.md). 