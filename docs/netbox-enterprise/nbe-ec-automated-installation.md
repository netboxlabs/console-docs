# Automated Installation with Embedded Automation

This guide walks you through a fully automated installation of **NetBox Enterprise** using **Replicated Embedded Automation**. This method allows for hands-free, reproducible deployments suitable for CI/CD pipelines, infrastructure-as-code (IaC) platforms, and zero-touch environments.

It is intended for users who are familiar with the manual installation process and want to automate deployments using a pre-configured YAML file.

> 💡 This complements the [Manual Installation Guide](./nbe-ec-installation.md) and is ideal for DevOps teams, service integrators, and platform engineers managing multiple environments.

---

## Why Use Embedded Automation?

Using embedded automation enables:

- Consistent, repeatable installs across environments  
- Integration with automated workflows (e.g., Terraform, Ansible, GitHub Actions)  
- Avoidance of UI-based setup screens  
- Scalability for managing many deployments  
- Faster time-to-value for onboarding new environments

---

## Prerequisites

Ensure the following before proceeding:

- ✅ **NetBox Enterprise License:** You must download your license file (e.g., `license.yaml`) from the NetBox Enterprise Portal.
- ✅ **`values.yaml` File:** You will create this configuration file. A sample `values.yaml.sample` is available in the repository to use as a starting point. You will copy this to `values.yaml` and customize it.
- ✅ Target host with:
  - Linux (Ubuntu 20.04+, RHEL 8+, Debian 11+)
  - Internet access (unless performing an airgapped install)
  - `curl`, `bash`, and `docker` installed
- ✅ Optional: Kubernetes for more advanced/clustered setups

> 🔒 Ensure your license file and any sensitive values in `values.yaml` are kept secure and accessible only to trusted systems.

---

## Step 1: Prepare your `values.yaml` File

The `values.yaml` file contains all the installation parameters. 

1.  **Get your License:** Download your NetBox Enterprise license YAML file from the NetBox Enterprise Portal.
2.  **Create `values.yaml`:** 
    *   Copy the `values.yaml.sample` file from the repository to a new file named `values.yaml` in your working directory.
    *   Open your `values.yaml` for editing.
3.  **Paste Your License:** In `values.yaml`, locate the `licenseFile.value:` section. You MUST paste the *entire content* of your downloaded NetBox Enterprise license YAML file as the value for this key. It will be a multi-line string.
4.  **Customize Values:** Review all other settings in `values.yaml`. At a minimum, you **must** replace placeholder values (e.g., `<YOUR_NETBOX_HOSTNAME>`, `<ADMIN_EMAIL@YOURCOMPANY.COM>`, `<CHOOSE_A_STRONG_AND_UNIQUE_PASSWORD>`, etc.) with your actual configuration details.

**Important Considerations for `values.yaml`:**
- Review all settings carefully. The sample provides common defaults, but your environment might require different configurations.
- For a complete list of all possible parameters and their descriptions, consult the official Replicated KOTS documentation and the NetBox Enterprise application documentation.
- The example below is a snippet from `values.yaml.sample`. The full sample file contains more options.

**Example Snippet from `values.yaml.sample`:**

```yaml
# values.yaml.sample for NetBox Enterprise Automated Installation
# -----------------------------------------------------------------
# This is a sample file. Copy this to 'values.yaml' and customize it.
# REVIEW CAREFULLY: You MUST replace placeholders and paste your license.

apiVersion: kots.io/v1beta1
kind: ConfigValues
metadata:
  name: netbox # This should match the application slug used by Replicated KOTS
spec:
  values:
    # --- License Configuration ---
    # Download your NetBox Enterprise license file from the NetBox Enterprise Portal.
    # Then, paste the ENTIRE content of that license YAML file below, under the 'value:' key.
    licenseFile:
      value: |-
        # PASTE YOUR ENTIRE NETBOX ENTERPRISE LICENSE YAML HERE
        # Example structure of what you'll paste:
        # apiVersion: kots.io/v1beta1
        # kind: License
        # metadata:
        #   name: <your-license-name>
        # spec:
        #   licenseID: <your-license-id>
        #   appSlug: netbox-enterprise
        #   customerName: <your-customer-name>
        #   # ... and other fields from your license file

    # --- General Application Settings ---
    hostname:
      value: "<YOUR_NETBOX_HOSTNAME>"  # e.g., netbox.yourcompany.com

    # --- Superuser Account (for initial login) ---
    superuser_name:
      default: "admin" # You can change the default username
      value: "admin"
    superuser_email:
      value: "<ADMIN_EMAIL@YOURCOMPANY.COM>"
    superuser_password:
      value: "<CHOOSE_A_STRONG_AND_UNIQUE_PASSWORD>" # For production, use a strong, unique password.

    # ... (other sections like NetBox Application Config, Embedded Services, Resources, External Services, Advanced Settings are in the full sample)
```

📘 You can download the full [`values.yaml.sample`](./files/values.yaml.sample) file to use as a template. For a comprehensive list of all available configuration parameters, refer to the [Replicated Embedded Automation Parameters](https://docs.replicated.com/enterprise/installing-embedded-automation#step-2-create-an-embedded-valuesyaml-file) and NetBox Enterprise specific documentation.

**Programmatic Management of `values.yaml`:**

For managing multiple environments or integrating with CI/CD pipelines, avoid committing sensitive data directly into your `values.yaml` file in version control. Instead, consider using:
- **Templating tools:** Tools like Jinja2, `envsubst`, Helm, or Kustomize can generate the `values.yaml` file by substituting placeholders with values from environment variables or secure sources at deployment time.
- **Secrets management systems:** Integrate with systems like HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, or Google Cloud Secret Manager to fetch sensitive data dynamically and inject it into the `values.yaml` or directly into the installation process.

---

## Step 2: Run the Embedded Installer

```bash
bash -s embedded-install \
  --embedded-values ./values.yaml
```

---

## Step 3: Confirm Installation

- Visit: `https://<YOUR_NETBOX_HOSTNAME>` (replace `<YOUR_NETBOX_HOSTNAME>` with the hostname you configured)
- Log in using your configured admin account (if pre-seeded)
- Verify components like the UI, REST API, integrations, and SSO are functioning as expected

---

## Troubleshooting & Tips

- **Check logs**: `docker logs <container_name>` or `kubectl logs <pod_name> -n <namespace>`
- **Containers**: `docker ps` (for Docker installs) or `kubectl get pods -n <namespace>` (for Kubernetes)
- **Validate YAML**: Use a YAML linter like `yamllint` on your `values.yaml` file.
- **Clean Uninstall**: `./netbox-enterprise reset` to remove all components and start fresh if needed.

---

## Example Use Case in CI/CD

```yaml
# Example GitHub Actions step
- name: Deploy NetBox Enterprise
  run: |
    # Ensure values.yaml is generated or retrieved securely here
    # For example, using a templating step or secrets manager:
    # cat ci/template.values.yaml | envsubst > values.yaml
    
    bash -s embedded-install \
      --embedded-values ./values.yaml
```

---

## Resources

- [Manual Installation Guide](./nbe-ec-installation.md)
- [Replicated Docs - Embedded Automation](https://docs.replicated.com/enterprise/installing-embedded-automation)
- [Replicated CLI Reference](https://docs.replicated.com/reference/cli/)
- [NetBox Enterprise](https://netboxlabs.com/netbox-enterprise/)
- [Support](https://netboxlabs.com/support)
