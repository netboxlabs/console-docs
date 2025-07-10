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

## Tested Versions

This guide was used on fresh installs of the following versions of Ubuntu:

- Ubuntu 22.04 LTS (Jammy Jellyfish)
- Ubuntu 24.04 LTS (Noble Numbat)

## Steps to prepare Ubuntu

### Disable Swap

Swap can lead to unpredictable memory behavior in Kubernetes.

```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### Configure Firewall

If UFW isn't installed:

```bash
sudo apt update
sudo apt install -y ufw
sudo ufw --force enable
```

Open required ports for the internal kubernetes platform:

```bash
# Kubernetes API, etcd, and control plane components
sudo ufw allow 6443/tcp
sudo ufw allow 2379:2380/tcp
sudo ufw allow 10250,10251,10252,10255,5473,10257,10259/tcp

# NodePort range
sudo ufw allow 30000:32767/tcp

# BGP and VXLAN (optional, for Calico)
sudo ufw allow 4789/udp
sudo ufw allow 179/tcp

# Reload firewall
sudo ufw reload
```

### Configure Kernel Modules and Parameters

Load and persist modules:

```bash
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
```

### Configure iptables for Kubernetes

Add iptables rules for Kubernetes pod networking:

```bash
# Configure pod network forwarding rules
sudo iptables -I FORWARD -s 10.244.0.0/17 -d 10.244.128.0/17 -j ACCEPT
sudo iptables -I OUTPUT -s 10.244.0.0/17 -d 10.244.128.0/17 -j ACCEPT
sudo iptables -I FORWARD -s 10.244.128.0/17 -d 10.244.0.0/17 -j ACCEPT
sudo iptables -I OUTPUT -s 10.244.128.0/17 -d 10.244.0.0/17 -j ACCEPT

# Make iptables rules persistent
sudo apt install -y iptables-persistent
sudo netfilter-persistent save
```

### Install containerd (optional runtime)

```bash
# Add Docker repository
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y containerd.io

# Configure containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

sudo systemctl enable --now containerd
```

### Reboot

Reboot to apply changes:

```bash
sudo reboot now
```

### Install NetBox Enterprise

Run through the regular installation [here](nbe-ec-installation.md).

## Optional - Configure AppArmor

If you're using AppArmor (default on Ubuntu), you may need to configure it for container workloads:

```bash
# Check AppArmor status
sudo aa-status

# Install apparmor-utils if needed
sudo apt install -y apparmor-utils

# Set containerd profile to complain mode (less restrictive)
sudo aa-complain /etc/apparmor.d/docker
```

!!! note
    Disable AppArmor for troubleshooting if needed, similar to SELinux permissive mode on RHEL. 