---
title: Policy Rules
tags:
  - community
  - enterprise
---# Policy Rules

Each [policy](./policy.md) contains one or more rules which assert certain conditions that must be met for the policy to be met. For example, you might define a policy that requires the approval of two engineers and one manager.

Users whose reviews will satisfy the rule are identified by assigning individual users and/or groups of users for each rule. The minimum reviews parameter defines how many approved must be submitted for the rule to be met.

## Fields

### Name

The short name by which the rule is identified.

### Enabled

A boolean indicating whether the rule is enabled. Rules are enabled by default.

### Minimum Reviews

The minimum number of eligible reviewers which must approve the change in order for the rule to pass.

!!! note
    A value of zero may be set to assert that a rule shall always pass, although this is generally not recommended.

### Reviewer Groups

Groups of users whose approval will satisfy this rule.

### Reviewers

Individual users whose approval will satisfy this rule.
