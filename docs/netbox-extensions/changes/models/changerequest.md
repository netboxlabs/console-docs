---
title: Change Requests
tags:
  - community
  - enterprise
---# Change Requests

A change request is submitted to request approval of proposed changes in a branch before it can be merged. All rules of the assigned [change policy](./policy.md) must be met for the request to be approved. When submitting a change request for a branch, the owner selects the governing policy and designates a priority.

## Fields

### Name

The user-defined name of the change request.

### Owner

The user who submitted the change request.

### Policy

The [policy](./policy.md) which must be met for the change request to be approved.

!!! note
    The policy is selected by the change request owner.

### Branch

The branch which will be merged when the change request has been approved.

### Status

The current status of the change request. Valid statuses are listed below.

| Status       | Description                                        |
|--------------|----------------------------------------------------|
| Draft        | Not yet ready for review                           |
| Needs review | Waiting for reviews to satisfy the assigned policy |
| Approved     | The assigned policy has been met                   |
| Completed    | The assigned branch has been merged                |
| Rejected     | The proposed changes have been rejected            |

### Priority

The priority of the change request relative to other open requests. Valid priorities are listed below.

* High (5)
* Medium/high (4)
* Medium (3)
* Medium/low (2)
* Low (1)

### Summary

A short summary of the proposed changes, reasoning for why they are being made, and any other relevant notes for reviewers.
