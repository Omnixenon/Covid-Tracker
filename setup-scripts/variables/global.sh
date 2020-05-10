export CWD=$(pwd)

export REGION=eu-west-1

export AWS_SHARED_CREDENTIALS_FILE=$CWD/.aws_credentials
export AWS_DEFAULT_REGION=${REGION}

export SERVICE=$(cat $CWD/package.json | jq -r '.name')
export STAGE=$BUILD_STAGE

export TF_VAR_STAGE=${STAGE}
export TF_VAR_SERVICE=${SERVICE}
export TF_VAR_REGION=${REGION}
export TF_VAR_DOMAIN_NAME="seunadesina.com"

export S3_TERRAFORM_STATE_BUCKET=xenonvelopment-terraform-state
export S3_TERRAFORM_STATE_KEY_PREFIX=${SERVICE}-${REGION}-${STAGE}-terraform
export S3_TERRAFORM_STATE_REGION=eu-west-2