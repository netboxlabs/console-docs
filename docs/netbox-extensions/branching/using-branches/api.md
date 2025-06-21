---
tags:
  - community
  - enterprise
  - api
title: Api
---

Unlike the web UI, where a user's selected branch remains active until it is changed, the desired branch must be specified with each REST API request. This is accomplished by including the `X-NetBox-Branch` HTTP header specifying the branch's schema ID.

```no-highlight
X-NetBox-Branch: $SCHEMA_ID
```

!!! tip "Schema IDs"
    The schema ID for a branch can be found in its REST API representation or on its detail view in the web UI. This is a pseudorandom eight-character alphanumeric identifier generated automatically when a branch is created. Note that the value passed to the HTTP header **does not include** the `branch_` prefix, which comprises part of the schema's name in the underlying database.

The example below returns all site objects that exist within the branch with schema ID `td5smq0f`:

```
curl -X POST \
-H "Authorization: Token $TOKEN" \
-H "Content-Type: application/json" \
-H "Accept: application/json; indent=4" \
-H "X-NetBox-Branch: td5smq0f" \
http://netbox:8000/api/dcim/sites/
```

The branch is effectively "deactivated" for future API requests by simply omitting the header.

!!! note
    The `X-NetBox-Branch` header is required only when making changes to NetBox objects within the context of an active branch. It is **not** required when creating, modifying, or deleting a branch itself.
