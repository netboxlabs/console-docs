# Getting Started with Jinja2 Templates in NetBox Enterprise

## 📌 Introduction

### What are Jinja2 Templates?

Jinja2 is a powerful and modern templating engine for Python that allows you to create dynamic content by combining static templates with variable data. In NetBox Enterprise, Jinja2 templates enable you to automate configuration generation, customize data exports, and create dynamic content based on your network infrastructure data.

### Why Use Jinja2 Templates in NetBox?

Jinja2 templates in NetBox Enterprise provide several key benefits:

- **Configuration Automation**: Generate vendor-specific device configurations automatically
- **Data Consistency**: Ensure standardized configurations across your network infrastructure  
- **Dynamic Content**: Create customized exports and reports based on real-time NetBox data
- **Integration Ready**: Seamlessly integrate with configuration management tools and CI/CD pipelines
- **Error Reduction**: Minimize manual configuration errors through automated generation

---

## 🔍 Where Templates Are Used in NetBox

NetBox Enterprise leverages Jinja2 templates in several key areas:

### Configuration Rendering
- Generate device-specific configurations based on NetBox data
- Create standardized configuration snippets for different device types
- Automate the creation of network service configurations

### Export Templates
- Customize data exports for specific formats (CSV, JSON, XML)
- Create vendor-specific configuration files
- Generate reports and documentation

### Webhooks
- Dynamic payload generation for external system integration
- Custom notification content based on NetBox events
- Automated workflow triggers with contextual data

### Custom Fields
- Dynamic default values based on other object attributes
- Conditional field validation and formatting
- Automated field population based on templates

---

## 🧠 Understanding the Rendering Context

### Configuration Context Overview

Configuration contexts in NetBox provide structured data that can be consumed by Jinja2 templates. This data is hierarchically organized and can be defined at multiple levels:

- **Global**: Applied to all devices
- **Region/Site Group**: Applied to devices within specific geographic or organizational boundaries
- **Site**: Applied to devices at specific locations
- **Device Role**: Applied to devices with specific functions
- **Platform**: Applied to devices running specific operating systems
- **Device Type**: Applied to specific hardware models
- **Device**: Applied to individual devices

### Rendering Context Objects

When templates are rendered, NetBox provides access to various context objects:

#### Device Context
```jinja2
{{ device.name }}
{{ device.device_type.manufacturer.name }}
{{ device.platform.name }}
{{ device.primary_ip4.address }}
{{ device.site.name }}
{{ device.tenant.name }}
```

#### Site Context
```jinja2
{{ site.name }}
{{ site.region.name }}
{{ site.asn }}
{{ site.time_zone }}
{{ site.physical_address }}
```

#### Interface Context
```jinja2
{% for interface in device.interfaces.all %}
{{ interface.name }}: {{ interface.ip_addresses.first.address }}
{% endfor %}

# Direct interface access by index
{{ device.interfaces.0.name }}
{{ device.interfaces.0.ip_addresses.0.address }}
```

#### Custom Fields
```jinja2
{{ device.custom_fields.management_vlan }}
{{ device.custom_fields.snmp_community }}
{{ device.site.custom_fields.region_code }}
```

### Common Filters

NetBox provides several useful Jinja2 filters for network-specific operations:

#### IP Address Filters
```jinja2
{{ ip_address | ipaddr('address') }}    # Extract IP address only
{{ ip_address | ipaddr('network') }}    # Get network address
{{ ip_address | ipaddr('netmask') }}    # Get subnet mask
{{ prefix | ipaddr('first_usable') }}   # First usable IP in range
```

#### Network Filters
```jinja2
{{ vlan_id | add:100 }}                 # Add to VLAN ID
{{ interface_name | upper }}            # Convert to uppercase
{{ hostname | lower }}                  # Convert to lowercase
{{ config.ntp_servers | join("\nntp server ") }}  # Join with custom separator
```

#### NetBox-Specific Filters
From [jinja2_filters](https://docs.netbox.dev/en/stable/configuration/system/#jinja2_filters):
- `as_slug` - Convert to URL-friendly slug
- `naturalize` - Format numbers naturally
- `humanize_speed` - Format bandwidth values
- `split` - Split strings into lists
- `join` - Join lists into strings

### Common Pitfalls

#### Undefined Variables
Always check for variable existence to avoid template errors:

```jinja2
# Problematic
{{ device.primary_ip4.address }}

# Better
{% if device.primary_ip4 %}
{{ device.primary_ip4.address }}
{% else %}
# No primary IP configured
{% endif %}

# Best
{{ device.primary_ip4.address | default('DHCP') }}
```

#### Data Type Issues
```jinja2
# Ensure proper data types
{{ vlan_id | int }}                     # Convert to integer
{{ is_enabled | bool }}                 # Convert to boolean
{{ description | string }}              # Convert to string
```

---

## 🛠️ Step-by-Step Example: Cisco Switch Configuration

Let's walk through creating a complete Cisco switch configuration using NetBox data.

### Step 1: Define Configuration Context

Create a configuration context at the device role level for switches:

```json
{
  "ntp_servers": ["10.1.1.10", "10.1.1.11"],
  "syslog_servers": ["10.1.1.20", "10.1.1.21"],
  "snmp": {
    "community": "netbox_ro",
    "location": "{{ site.physical_address }}"
  },
  "vlans": {
    "management": 100,
    "user": 200,
    "voice": 300
  },
  "location_id": "{{ site.name | as_slug }}"
}
```

### Step 2: Create the Template

```jinja2
!
! Configuration generated by NetBox Enterprise
! Device: {{ device.name }}
! Generated: {{ now() }}
!
version 15.2
!
hostname {{ device.name }}
!
{% if device.primary_ip4 %}
ip domain-name {{ device.site.name | lower }}.company.com
{% endif %}
!
! NTP Configuration
{% for ntp_server in ntp_servers %}
ntp server {{ ntp_server }}
{% endfor %}
!
! SNMP Configuration
snmp-server community {{ snmp.community }} RO
snmp-server location {{ location_id }}
snmp-server contact {{ device.tenant.name | default('Network Operations') }}
!
! VLAN Configuration
{% for vlan_name, vlan_id in vlans.items() %}
vlan {{ vlan_id }}
 name {{ vlan_name | upper }}
!
{% endfor %}
!
! Interface Configuration
{% for interface in device.interfaces.all %}
{% if interface.enabled and interface.type.value != 'virtual' %}
interface {{ interface.name }}
 description {{ interface.description | default('Managed by NetBox') }}
{% if interface.mode and interface.mode.value == 'access' %}
 switchport mode access
{% if interface.untagged_vlan %}
 switchport access vlan {{ interface.untagged_vlan.vid }}
{% endif %}
{% elif interface.mode and interface.mode.value == 'tagged' %}
 switchport mode trunk
{% if interface.tagged_vlans.all %}
 switchport trunk allowed vlan {{ interface.tagged_vlans.all | join(',', attribute='vid') }}
{% endif %}
{% endif %}
{% if not interface.enabled %}
 shutdown
{% endif %}
!
{% endif %}
{% endfor %}
!
! Management Interface
{% if device.primary_ip4 %}
interface vlan{{ vlans.management }}
 ip address {{ device.primary_ip4.address | ipaddr('address') }} {{ device.primary_ip4.address | ipaddr('netmask') }}
 no shutdown
!
ip default-gateway {{ device.primary_ip4.address | ipaddr('network') | ipaddr('1') | ipaddr('address') }}
{% endif %}
!
! Syslog Configuration  
{% for syslog_server in syslog_servers %}
logging host {{ syslog_server }}
{% endfor %}
!
end
```

### Step 3: Apply the Template

Navigate to:
1. **Device → Configuration tab** → Select the template → View rendered output
2. **Export Templates** → Create an export template in NetBox Enterprise
3. **API Endpoint**: Use the `/api/dcim/devices/{id}/render-config/` endpoint
4. **Custom Scripts**: Integrate with your automation workflows

### Step 4: Validate the Output

Always validate generated configurations:

```bash
# Example validation for Cisco configs
cisco-config-validator validate --file generated_config.txt

# Or use NetBox's built-in validation
curl -X POST http://netbox.company.com/api/dcim/devices/1/render-config/ \
  -H "Authorization: Token your-api-token" \
  -H "Content-Type: application/json"
```

---

## 🚀 Advanced Use Cases

### 🔁 Loops and Conditionals

```jinja2
{% for intf in device.interfaces.all %}
interface {{ intf.name }}
 {% if intf.enabled %} no shutdown {% else %} shutdown {% endif %}
 {% if intf.ip_addresses.first %}
 ip address {{ intf.ip_addresses.first.address }}
 {% endif %}
{% endfor %}
```

### 🧱 Nested Data Access

Access complex nested data structures:

```jinja2
{% for circuit in device.site.circuits.all %}
Circuit {{ circuit.cid }}:
  Provider: {{ circuit.provider.name }}
  Type: {{ circuit.type.name }}
  Bandwidth: {{ circuit.commit_rate }} {{ circuit.commit_rate_unit }}
  
  {% for termination in circuit.terminations.all %}
    {% if termination.site == device.site %}
  Termination: {{ termination.port_speed }} on {{ termination.pp_info }}
    {% endif %}
  {% endfor %}
{% endfor %}
```

### 🧪 Using Custom Fields Effectively

Leverage custom fields for template logic:

```jinja2
{% set device_env = device.custom_fields.environment | default('production') %}
{% set backup_enabled = device.custom_fields.backup_enabled | default(true) %}

! Environment: {{ device_env | upper }}
! Building: {{ device.custom_fields.building }}
! Region: {{ device.site.custom_fields.region_code }}

{% if device_env == 'production' %}
! Production device - backup enabled
archive
 path bootflash:backup-configs
 write-memory
{% elif backup_enabled %}
! Non-production device with backup enabled
ip scp server enable
{% endif %}
```

### 🌍 Environment Segmentation

Handle different environments with conditional logic:

```jinja2
{% if device.tenant.name == 'staging' %}
! Staging Environment Configuration
snmp-server community staging_{{ snmp.community }} RO
logging host {{ syslog_servers | first }}
{% elif device.tenant.name == 'production' %}
! Production Environment Configuration
snmp-server community prod_{{ snmp.community }} RO
{% for server in syslog_servers %}
logging host {{ server }}
{% endfor %}
{% endif %}
```

---

## 🧪 Testing & Debugging Templates

### 🔧 Testing Templates Locally

Use NetBox's shell_plus for template testing:

```python
# NetBox shell_plus
from django.template import Template, Context
from dcim.models import Device

# Get a test device
device = Device.objects.get(name='test-switch-01')

# Create template
template_content = """
Device: {{ device.name }}
Site: {{ device.site.name }}
IP: {{ device.primary_ip4.address | default('No IP assigned') }}
"""

template = Template(template_content)
context = Context({'device': device})
result = template.render(context)
print(result)
```

### 🛠️ Handling Common Errors

#### Template Syntax Errors
```jinja2
# Problematic: Missing endif
{% if device.primary_ip4 %}
IP: {{ device.primary_ip4.address }}

# Fixed: Proper closure
{% if device.primary_ip4 %}
IP: {{ device.primary_ip4.address }}
{% endif %}
```

#### Variable Access Errors
```jinja2
# Problematic: May cause AttributeError
{{ device.interfaces.first.ip_addresses.first.address }}

# Better: Check existence
{% if device.interfaces.first and device.interfaces.first.ip_addresses.first %}
{{ device.interfaces.first.ip_addresses.first.address }}
{% endif %}

# Best: Use filters with fallbacks
{{ device.interfaces.first.ip_addresses.first.address | default('No IP') }}
```

### 🔍 API Validation Endpoints

Use NetBox Enterprise's validation endpoints:

```bash
# Validate template syntax
curl -X POST "http://netbox.company.com/api/extras/export-templates/validate/" \
  -H "Authorization: Token your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "template_code": "{{ device.name }}\n{{ device.site.name }}",
    "object_type": "dcim.device"
  }'

# Test template rendering  
curl -X POST "http://netbox.company.com/api/dcim/devices/1/render-config/" \
  -H "Authorization: Token your-token" \
  -H "Content-Type: application/json" \
  -d '{"template_id": 1}'
```

### 💡 Debugging Tips

- Use the **"Preview"** tab in the NetBox UI for export and config templates
- Use [API endpoints](https://docs.netbox.dev/en/stable/rest-api/extras/export-templates/) to test templates programmatically
- Log template failures in your automation pipeline using NetBox API error responses
- Use try/catch logic for optional fields

---

## ❓ FAQs & Common Issues

### Q: Why is my template not rendering expected data?

**A:** Common causes include:
- Missing configuration context at the appropriate level
- Incorrect variable names or paths
- Data not populated in NetBox (e.g., missing IP addresses)
- Template syntax errors
- Invalid JSON in configuration contexts

**Solution:** Use the debugging methods above and check data availability in NetBox UI.

### Q: Can I access related objects like interfaces or IPs?

**A:** Yes! Use dot notation to traverse relationships:
```jinja2
{{ device.interfaces.all }}           # All interfaces
{{ device.primary_ip4.address }}     # Primary IPv4 address
{{ device.site.circuits.all }}       # All circuits at the device's site
```

### Q: Can I access custom fields?

**A:** Yes. Custom fields are available via the `custom_fields` attribute:
```jinja2
{{ device.custom_fields.my_field }}
{{ device.site.custom_fields.region_code }}
```

### Q: How do I handle optional fields in templates?

**A:** Always use the `default` filter or conditional statements:

```jinja2
# Using default filter
{{ device.serial | default('Unknown') }}

# Using conditional
{% if device.serial %}
Serial: {{ device.serial }}
{% else %}
Serial: Not Available
{% endif %}
```

### Q: Can I use templates with bulk operations?

**A:** Yes, NetBox Enterprise supports bulk template rendering through:
- Bulk export functionality
- API batch operations
- Custom scripts for mass configuration generation

### Q: How do I include external data in templates?

**A:** Use configuration contexts to inject external data:

```json
{
  "external_data": {
    "dns_servers": ["8.8.8.8", "8.8.4.4"],
    "routing": {
      "ospf_area": 0,
      "bgp_asn": 65001
    }
  }
}
```

### Q: What's the performance impact of complex templates?

**A:** Consider these optimization strategies:
- Minimize database queries in templates
- Use select_related() and prefetch_related() in custom views
- Cache frequently accessed data in configuration contexts
- Break large templates into smaller, reusable components

---

## 🌐 Further Reading & Community Resources

### Official Documentation
- [NetBox Configuration Contexts](https://docs.netbox.dev/en/stable/models/extras/configcontext/)
- [Configuration Rendering](https://docs.netbox.dev/en/stable/features/configuration-rendering/)
- [Export Templates](https://docs.netbox.dev/en/stable/customization/export-templates/)
- [Jinja2 Template Designer Documentation](https://jinja.palletsprojects.com/en/3.1.x/templates/)
- [Jinja2 Filters in NetBox](https://docs.netbox.dev/en/stable/configuration/system/#jinja2_filters)

### Community Resources
- **Blog**: [How to Generate Device Configurations with NetBox](https://netboxlabs.com/blog/how-to-generate-device-configurations-with-netbox/)

### GitHub Discussions & Community
- [Template Best Practices Discussion #17372](https://github.com/netbox-community/netbox/discussions/17372)
- [Configuration Context Examples #12568](https://github.com/netbox-community/netbox/discussions/12568)
- [Reddit Discussion: Jinja2 + Device Roles](https://www.reddit.com/r/Netbox/comments/13iw8zt/device_roles_models_and_the_usage_of_jinja2/)

### Community Template Examples
Check the NetBox community repository for additional template examples:
- Cisco IOS/IOS-XE templates
- Juniper JunOS templates  
- Arista EOS templates
- Custom export templates

---

*This documentation is part of NetBox Enterprise and provides enterprise-specific guidance for Jinja2 template implementation and best practices.* 