---
title: NetBox Enterprise Requirements for Red Hat Enterprise Linux (RHEL)
tags:
  - netbox-enterprise
  - netbox-community
---# NetBox Enterprise Requirements for Red Hat Enterprise Linux (RHEL)

## Tested Versions

This guide was used on fresh installs of the following versions of RHEL:

- RHEL 9
- RHEL 9.5

## Steps to prepare RHEL

### Disable Swap

Swap can lead to unpredictable memory behavior in Kubernetes.

```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### Set SELinux to Permissibe mode (can be enforced later)

```bash
sudo setenforce Permissive
sudo sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=permissive/g' /etc/sysconfig/selinux
```

### Configure Firewall

If firewalld isn't installed

```bash
sudo dnf -y install dnf-plugins-core
sudo dnf -y install firewalld
sudo systemctl enable --now firewalld
```

Open required ports for the internal kubernetes platform.

```bash
# Kubernetes API, etcd, and control plane components
sudo firewall-cmd --permanent --add-port={6443,2379,2380,10250,10251,10252,10255,5473,10257,10259}/tcp

# NodePort range
sudo firewall-cmd --permanent --add-port=30000-32767/tcp

# BGP and VXLAN (optional, for Calico)
sudo firewall-cmd --permanent --add-port=4789/udp
sudo firewall-cmd --permanent --add-port=179/tcp

# Reload firewall
sudo firewall-cmd --reload
```

### Configure Kernel Modules and Parameters

Install kernel headers:

```bash
sudo dnf -y install kernel-devel-$(uname -r)
```

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

### Install containerd (optional runtime)

```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
sudo dnf makecache
sudo dnf install containerd.io -y

sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

sudo systemctl enable --now containerd
```

### Reboot

Reboot to apply changes

```bash
sudo reboot now
```

### Install NetBox Enterprise

Run through the regular installation [here](nbe-ec-installation.md).

## Optional - Enable SELinux Enforcing

### Install SELinux Tools

```bash
sudo dnf -y inst
all setroubleshoot-server setools mcstrans
```

### Run the suggestions from [the enterprise install for SELinux](./nbe-ec-requirements.md#selinux)

```bash
export EC_DIR="/var/lib/embedded-cluster"
export KUBE_DIR="${EC_DIR}/k0s"

# tell SELinux the Cluster directory is owned by Containerd
sudo semanage fcontext -a -t container_var_lib_t "${EC_DIR}"
sudo restorecon -R -v "${EC_DIR}"

# additionally, binaries should be allowed to execute
sudo semanage fcontext -a -t container_runtime_exec_t "${KUBE_DIR}/bin/containerd.*"
sudo semanage fcontext -a -t container_runtime_exec_t "${KUBE_DIR}/bin/runc"
sudo restorecon -R -v "${KUBE_DIR}/bin"

# fix permissions for containerd and restrict some folders to read-only
sudo semanage fcontext -a -t container_var_lib_t "${KUBE_DIR}/containerd(/.*)?"
sudo semanage fcontext -a -t container_ro_file_t "${KUBE_DIR}/containerd/io.containerd.snapshotter.*/snapshots(/.*)?"
sudo restorecon -R -v ${KUBE_DIR}/containerd
```

### Check for errors

Run sealert to look for issues

```bash
sealert -a /var/log/audit/audit.log
```

Look for messages like this and run the command suggested based on confidence

!!! note
    It is important you understand these before enabling and that you can possible be creating security risks if you do not understand what you're enabling.

```log
SELinux is preventing /usr/sbin/setfiles from 'read, append' accesses on the file /var/lib/embedded-cluster/tmp/tmph3gb9qv1.
*****  Plugin leaks (86.2 confidence) suggests   *****************************
If you want to ignore setfiles trying to read append access the tmph3gb9qv1 file, because you believe it should not need this access.
Then you should report this as a bug.  
You can generate a local policy module to dontaudit this access.
Do
# ausearch -x /usr/sbin/setfiles --raw | audit2allow -D -M my-setfiles
# semodule -X 300 -i my-setfiles.pp
*****  Plugin catchall (14.7 confidence) suggests   **************************
If you believe that setfiles should be allowed read append access on the tmph3gb9qv1 file by default.
Then you should report this as a bug.
You can generate a local policy module to allow this access.
Do
allow this access for now by executing:
# ausearch -c 'setfiles' --raw | audit2allow -M my-setfiles
# semodule -X 300 -i my-setfiles.pp
Additional Information:
Source Context                unconfined_u:unconfined_r:setfiles_t:s0-s0:c0.c102
                              3
Target Context                unconfined_u:object_r:var_lib_t:s0
Target Objects                /var/lib/embedded-cluster/tmp/tmph3gb9qv1 [ file ]
Source                        setfiles
Source Path                   /usr/sbin/setfiles
Port                          <Unknown>
Host                          <Unknown>
Source RPM Packages           policycoreutils-3.6-2.1.el9.x86_64
Target RPM Packages           
SELinux Policy RPM            selinux-policy-targeted-38.1.45-3.el9_5.noarch
Local Policy RPM              selinux-policy-targeted-38.1.45-3.el9_5.noarch
Selinux Enabled               True
Policy Type                   targeted
Enforcing Mode                Permissive
Host Name                     tom-testing-rhel
Platform                      Linux tom-testing-rhel
                              5.14.0-503.38.1.el9_5.x86_64 #1 SMP
                              PREEMPT_DYNAMIC Sun Apr 13 22:01:49 EDT 2025
                              x86_64 x86_64
Alert Count                   1
First Seen                    2025-04-24 12:39:11 EDT
Last Seen                     2025-04-24 12:39:11 EDT
Local ID                      fb07cf19-dcea-4b68-8990-59a7a5ba57e8
Raw Audit Messages
type=AVC msg=audit(1745512751.796:1240): avc:  denied  { read append } for  pid=62558 comm="setfiles" path="/var/lib/embedded-cluster/tmp/tmph3gb9qv1" dev="vda4" ino=209964330 scontext=unconfined_u:unconfined_r:setfiles_t:s0-s0:c0.c1023 tcontext=unconfined_u:object_r:var_lib_t:s0 tclass=file permissive=1
type=SYSCALL msg=audit(1745512751.796:1240): arch=x86_64 syscall=execve success=yes exit=0 a0=5609fe032210 a1=560a0902dfa0 a2=0 a3=19dd30 items=0 ppid=62146 pid=62558 auid=0 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts1 ses=1 comm=setfiles exe=/usr/sbin/setfiles subj=unconfined_u:unconfined_r:setfiles_t:s0-s0:c0.c1023 key=(null)ARCH=x86_64 SYSCALL=execve AUID=root UID=root GID=root EUID=root SUID=root FSUID=root EGID=root SGID=root FSGID=root
Hash: setfiles,setfiles_t,var_lib_t,file,read,append
```

### Run suggested commands

An example from the above log message would be:

```bash
ausearch -x /usr/sbin/groupadd --raw | audit2allow -D -M my-groupadd
semodule -X 300 -i my-groupadd.pp
```

### Ensure no errors remain

Repeat the above two seteps until the following command returns nothing.

```bash
sealert -a /var/log/audit/audit.log
```

### Set Enforcing

```bash
sudo setenforce Enforcing
sudo sed -i --follow-symlinks 's/SELINUX=permissive/SELINUX=enforcing/g' /etc/sysconfig/selinux
```

!!! note
    Enable Permissive again for any upgrades, plug-ins and changes and run through the sealert and suggestions until no errors remain before re-enabling selinux.
