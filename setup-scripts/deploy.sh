export CWD=$(pwd)

function doVars {
  source ${CWD}/setup-scripts/variables/${BUILD_STAGE}.sh
}

function deployTerraform {
  rm -f  ${CWD}/.terraform/terraform.tfstate

  terraform init \
    -backend-config="bucket=${S3_TERRAFORM_STATE_BUCKET}" \
    -backend-config="key=${S3_TERRAFORM_STATE_KEY_PREFIX}/${SERVICE}/${STAGE}.tfstate" \
    -backend-config="region=${S3_TERRAFORM_STATE_REGION}" ${CWD}/infrastructure/terraform

  terraform plan ${CWD}/infrastructure/terraform

  # terraform apply -auto-approve -no-color ${CWD}/infrastructure/terraform

  terraform output -json | jq 'with_entries(.value |= .value)' > ${CWD}/infrastructure/terraform-state.json
}

function deployApp {
  if [ ${BUILD_STAGE} == "development" ]; then
    return $1
  fi

  TF_STATE=$(cat ${CWD}/infrastructure/terraform-state.json)

  npm run webpack

  aws s3 sync --exclude "*.DS_Store" --delete "${CWD}/build/client/" \
    s3://$(echo ${TF_STATE} | jq -r '.s3_bucket')/

  aws cloudfront create-invalidation --paths '/*' --distribution-id \
    $(echo ${TF_STATE} | jq -r '.cloudfront_distribution_id')
}

doVars
deployTerraform
deployApp
