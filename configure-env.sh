#!/bin/bash

# Secret name
secret_name=$1
# Check if AWS exists
command -v aws >/dev/null 2>&1 || { echo >&2 "aws is required but it's not installed.  Please install aws using brew install aws-cli (MacOS)."; exit 1; }

# Check if JQ exists
command -v jq >/dev/null 2>&1 || { echo >&2 "jq is required but it's not installed.  Please install jq using brew install jq (MacOS)."; exit 1; }

echo "Retrieving AWS secrets from $secret_name"

# Pull AWS Secret
aws_secret=`aws secretsmanager get-secret-value --secret-id $secret_name --query SecretString | jq 'fromjson'`

# Loop through json keys and values then map append to .env
for s in $(echo $aws_secret | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" ); do
    echo $s >> .env
done

echo "AWS secrets appended to .env file!"

