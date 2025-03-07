# NetBox Cloud SAML Configuration Guide

## Overview
This document details the procedure for configuring SAML-based Single Sign-On (SSO) for your NetBox Cloud environment.

## Required Customer Information
To facilitate SAML integration, we require the following details from your Identity Provider (IdP):

- **SOCIAL_AUTH_SAML_SP_ENTITY_ID**: The unique identifier of your organization in the SAML ecosystem.
- Details from **SOCIAL_AUTH_SAML_ENABLED_IDPS**:
  - **entity_id**: This is your IdP's Entity ID obtained from the SAML metadata.
  - **url**: Your IdP's SSO login URL.
  - **x509cert**: The Base64-encoded X.509 certificate used to sign SAML assertions.
- **Preferred Submission Method**: For efficiency and accuracy, please provide your IdP Metadata File. This standardized format ensures all necessary information is included.

## Configuration Process in NetBox Cloud
Once we receive your SAML configuration details, our steps are as follows:
- **Certificate Generation**: We will generate a public/private certificate pair.
- **Public Certificate**: We will provide you with the public certificate, which you will need to configure your IdP.

## Customer-Side Configuration
Please configure the following parameters within your IdP settings:
- **Service Provider (SP) Entity ID**: `https://<org-name>.cloud.netboxapp.com/`
- **Assertion Consumer Service (ACS) URL**: `https://<org-name>.cloud.netboxapp.com/`

## Support
Should you encounter any difficulties during the configuration process, do not hesitate to contact NetBox Cloud support. Please provide detailed information about the issue to ensure swift and effective assistance.
