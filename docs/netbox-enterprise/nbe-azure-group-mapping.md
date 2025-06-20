# NetBox Enterprise Entra ID Group Mapping
Place the following in configuration overrides python section

# Basic SSO
```shell
REMOTE_AUTH_BACKEND = 'social_core.backends.azuread.AzureADOAuth2'
SOCIAL_AUTH_AZUREAD_OAUTH2_KEY = '{client provided key}'
SOCIAL_AUTH_AZUREAD_OAUTH2_SECRET = '{client provided secret}'
```

# Group Mappings
```shell
SOCIAL_AUTH_AZUREAD_OAUTH2_RESOURCE = 'https://graph.microsoft.com/'
SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'netbox.authentication.user_default_groups_handler',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
    'nbc_auth_extensions.azure_authentication.azuread_map_groups',
)


# Define special user types using groups. Exercise great caution when assigning superuser status.
SOCIAL_AUTH_PIPELINE_CONFIG = {
    'AZUREAD_USER_FLAGS_BY_GROUP': {
        "is_staff": ['{AZURE_GROUP_ID1}','{AZURE_GROUP_ID2}'],
        "is_superuser": ['{AZURE_GROUP_ID1}','{AZURE_GROUP_ID2}']
    },

    'AZUREAD_GROUP_MAP': {
        '{AZURE_GROUP_ID1}': '{NETBOX_GROUP1}',
        '{AZURE_GROUP_ID2}': '{NETBOX_GROUP2}',
    }

}
```