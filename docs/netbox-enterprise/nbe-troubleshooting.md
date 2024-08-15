# Troubleshooting Tips and Tricks

NetBox Enterprise is designed to harness the power of Kubernetes while minimizing the amount of work the average person needs to manage it.
However, sometimes it's still useful or necessary to peek under the hood.

## Applications

The following applications are used for various facets of administration:

* [kubectl](https://kubernetes.io/docs/tasks/tools/)\*: CLI for interacting with clusters.
* [preflight](https://troubleshoot.sh/)\*: CLI for manually running preflight validation checks.
  Install by running:<br>
  `curl https://krew.sh/preflight | bash`
* [support-bundle](https://troubleshoot.sh/)\*: CLI for manually generating support bundles.
  Install by running:<br>
  `curl https://krew.sh/support-bundle | bash`
* [k9s](https://k9scli.io/): a TUI for managing and viewing cluster resources.

_\* provided by the Embedded Cluster install_

