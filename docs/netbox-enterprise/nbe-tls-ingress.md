# TLS and Ingress: Accessing NetBox Enterprise

## Embedded Cluster Installs

### Ingress

The Embedded Cluster provides its own ingress controller.
No additional configuration is required to reach NetBox on HTTP and HTTPS.

### TLS

#### Configuration

When you first install the Embedded Cluster and log into the Admin Console, it asks you to configure the TLS certificate.
By default, it will generate a self-signed certificate, but you are able to instead upload private key and certificate chain files.

This key and certificate chain are used for any TLS connections to the Embedded Cluster, whether it's the Admin Console (on port 30000) or the main NetBox interface (on port 443).

#### Key Replacement/Rotation

If you configured your Admin Console to use a self-signed certificate on install and wish to replace it with your own key, or if you have an existing custom key that needs rotation, you can follow these steps to do so.

!!! note
    Ensure you have your private key and a full certificate chain in PEM format.
    If you're using Let's Encrypt, this will be the `privkeyXX.pem` and `fullchainXX.pem` files.
    For other certificate providers, consult their documentation.

First, access the Embedded Cluster's shell:

```shell
/var/lib/embedded-cluster/bin/netbox-enterprise shell
```

Then, delete the old secret and create the new one, providing the path to your chain and key files:

```shell
kubectl -n kotsadm delete secret kotsadm-tls && \
kubectl -n kotsadm create secret tls kotsadm-tls --cert=/path/to/cert.pem --key=/path/to/key.pem
```

Finally, delete the proxy and ingress pods, so they relaunch with the new configuration:

```shell
NGINX_POD="$(kubectl -n ingress-nginx get pods --selector='app.kubernetes.io/name=ingress-nginx' -o name)"
PROXY_POD="$(kubectl -n kotsadm get pods --selector='app==kurl-proxy-kotsadm' -o name)"
kubectl -n ingress-nginx delete "${NGINX_POD}" && \
kubectl -n kotsadm delete "${PROXY_POD}"
```

## KOTS Installs

### Ingress

Since NetBox Enterprise will be installed into an existing cluster when using a KOTS install, it is expected that ingress (and TLS configuration) will be provided by your environment.

By default, NetBox Enterprise publishes an `Ingress` resource which is picked up automatically by a Kubernetes ingress controller.

### TLS

As long as your ingress controller provides a TLS endpoint, there are no special changes necessary in the NetBox Enterprise configuration.

For example, if you are using the `ingress-nginx` controller Helm chart, your NetBox instance will be available on HTTP and HTTPS if you set a default certificate like so:

```yaml title="values.yaml"
controller:
  service:
    type: NodePort
    nodePorts:
      http: "80"
      https: "443"
    extraArgs:
      default-ssl-certificate: "<NAMESPACE>/<SECRETNAME>"
```

The `default-ssl-certificate` line should point to the cluster location of your secret containing the certificate and key information, tagged with the type `kubernetes.io/tls`.
For details, see the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets).
