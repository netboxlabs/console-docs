---
title: NetBox Cloud SAML Configuration Guide
tags:
  - cloud
  - authentication
  - administration
  - configuration
  - integration
---

# NetBox Cloud SAML Configuration Guide

## Overview
This document details the procedure for configuring SAML-based Single Sign-On (SSO) for your NetBox Cloud environment.

## Required Information
To facilitate SAML integration, we require the following details from your Identity Provider (IdP):

- <u>**Service Provider Entity ID:**</u> The unique identifier of your organization in the SAML ecosystem.
- <u>**Identity Provider Settings:**</u>

    **entity_id**: This is your IdP's Entity ID obtained from the SAML metadata. 

    **url**: Your IdP's SSO login URL. 

    **x509cert**: The Base64-encoded X.509 certificate used to sign SAML assertions. 

!!! Note
    **Preferred Submission Method**: For efficiency and accuracy, please provide your IdP Metadata File. This standardized format ensures all necessary information is included.

## Configuration Process in NetBox Cloud
**Once we receive your SAML configuration details, we will:**

1. Generate a public/private certificate pair.

2. Provide you with the public certificate, which you will need to configure your IdP.

**Additionally you will need to configure the following parameters within your IdP settings:**

- Service Provider (SP) Entity ID: `https://<org-name>.cloud.netboxapp.com/`

- Assertion Consumer Service (ACS) URL: `https://<org-name>.cloud.netboxapp.com/`

## Testing

Once your NetBox Cloud and Identity Provider (IdP) configurations are finalized, you can proceed with testing to confirm that you are able to log in via your SAML provider.
