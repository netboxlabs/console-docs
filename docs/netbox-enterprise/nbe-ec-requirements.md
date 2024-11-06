# NetBox Enterprise Embedded Cluster Requirements

### Host system requirements

#### Recommended

The following are the _recommended_ system requirements for a **production** deployment of NetBox Enterprise running two replicas. For larger environments with more replicas, additional resources should be allocated.

- 8 Virtual CPU (vCPU)
- 24 GB Memory (RAM)
- 40 GB SSD free disk space in `/var/lib`

!!! note 
    For **non-production** deployments of NetBox Enterprise, the _minimum_ system requirements can be reduced to 4 Virtual CPU (vCPU) and 16 GB Memory (RAM). All other requirements remain the same.

### Host operating system

- Linux (Kernel versions 4.3 and above)

### Architecture

- x86-64