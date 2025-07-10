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

### Update System Packages

Update the package list and upgrade existing packages:

```bash
sudo apt update && sudo apt upgrade -y
```

### Disable Swap

Swap can lead to unpredictable memory behavior in Kubernetes.

```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### Install Required Packages

Install essential packages needed for NetBox Enterprise:

```bash
sudo apt install -y \
    curl \
    wget \
    gnupg \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    lsb-release \
    ufw
```

### Configure Firewall (UFW)

Enable UFW and configure required ports for the internal Kubernetes platform:

```bash
# Enable UFW
sudo ufw --force enable

# Kubernetes API server
sudo ufw allow 6443/tcp

# etcd server client API
sudo ufw allow 2379:2380/tcp

# Kubelet API
sudo ufw allow 10250/tcp

# kube-scheduler
sudo ufw allow 10251/tcp

# kube-controller-manager
sudo ufw allow 10252/tcp

# kube-proxy
sudo ufw allow 10255/tcp

# Calico networking
sudo ufw allow 5473/tcp

# kube-scheduler and kube-controller-manager (for newer versions)
sudo ufw allow 10257/tcp
sudo ufw allow 10259/tcp

# NodePort range
sudo ufw allow 30000:32767/tcp

# BGP and VXLAN (for Calico)
sudo ufw allow 4789/udp
sudo ufw allow 179/tcp

# NetBox Enterprise Admin Console
sudo ufw allow 30000/tcp

# HTTP and HTTPS for NetBox
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# SSH (ensure this is allowed)
sudo ufw allow 22/tcp

# Reload firewall rules
sudo ufw reload
```

### Configure Kernel Modules and Parameters

Load and persist required kernel modules:

```bash
# Load modules immediately
sudo modprobe br_netfilter ip_vs ip_vs_rr ip_vs_wrr ip_vs_sh overlay

# Create modules configuration file
cat <<EOF | sudo tee /etc/modules-load.d/kubernetes.conf
br_netfilter
ip_vs
ip_vs_rr
ip_vs_wrr
ip_vs_sh
overlay
EOF

# Configure kernel parameters
cat <<EOF | sudo tee /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# Apply sysctl parameters
sudo sysctl --system
```

### Install containerd (recommended runtime)

```bash
# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index
sudo apt update

# Install containerd
sudo apt install -y containerd.io

# Configure containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

# Enable systemd cgroup driver
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# Enable and start containerd service
sudo systemctl enable --now containerd
```

### Configure System Limits

Increase system limits for container workloads:

```bash
# Configure limits for containers
cat <<EOF | sudo tee /etc/security/limits.d/kubernetes.conf
* soft nofile 65536
* hard nofile 65536
* soft nproc 32768
* hard nproc 32768
EOF

# Configure systemd limits
sudo mkdir -p /etc/systemd/system.conf.d
cat <<EOF | sudo tee /etc/systemd/system.conf.d/kubernetes.conf
[Manager]
DefaultLimitNOFILE=65536
DefaultLimitNPROC=32768
EOF
```

### Reboot

Reboot to apply all changes:

```bash
sudo reboot now
```

### Install NetBox Enterprise

After reboot, run through the regular installation [here](nbe-ec-installation.md).

## Optional - Configure AppArmor

If you're using AppArmor (default on Ubuntu), you may need to configure it for container workloads:

### Check AppArmor Status

```bash
sudo aa-status
```

### Configure AppArmor for Containers (if needed)

```bash
# Install apparmor-utils if not present
sudo apt install -y apparmor-utils

# Set containerd profile to complain mode (less restrictive)
sudo aa-complain /etc/apparmor.d/docker

# Or disable AppArmor for containerd (if issues persist)
sudo ln -s /etc/apparmor.d/docker /etc/apparmor.d/disable/
sudo apparmor_parser -R /etc/apparmor.d/docker
```

## Troubleshooting

### Common Issues

#### DNS Resolution Problems

If you encounter DNS issues during installation:

```bash
# Check DNS configuration
sudo systemd-resolve --status

# Configure alternative DNS if needed
sudo systemctl edit systemd-resolved
```

Add the following content:

```ini
[Service]
ExecStart=
ExecStart=/usr/lib/systemd/systemd-resolved --dns=8.8.8.8 --dns=8.8.4.4
```

Then restart the service:

```bash
sudo systemctl restart systemd-resolved
```

#### Container Runtime Issues

If containerd fails to start:

```bash
# Check containerd status
sudo systemctl status containerd

# View containerd logs
sudo journalctl -u containerd -f

# Restart containerd if needed
sudo systemctl restart containerd
```

#### Firewall Conflicts

If you experience connectivity issues:

```bash
# Check UFW status
sudo ufw status verbose

# Temporarily disable UFW for testing (not recommended for production)
sudo ufw disable

# Re-enable after testing
sudo ufw enable
```

### Verification Commands

Before installing NetBox Enterprise, verify your system configuration:

```bash
# Check swap is disabled
swapon --show  # Should return empty

# Verify required modules are loaded
lsmod | grep -E "br_netfilter|ip_vs|overlay"

# Check kernel parameters
sysctl net.bridge.bridge-nf-call-iptables
sysctl net.ipv4.ip_forward

# Verify containerd is running
sudo systemctl is-active containerd

# Check firewall rules
sudo ufw status numbered
```

## References

- [Ubuntu Server Guide](https://ubuntu.com/server/docs)
- [Kubernetes Ubuntu Installation](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl)
- [Containerd Installation](https://github.com/containerd/containerd/blob/main/docs/getting-started.md) 