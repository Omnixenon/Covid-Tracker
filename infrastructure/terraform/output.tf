data "aws_caller_identity" "current" {}

output s3_bucket {
  value      = aws_s3_bucket.website_bucket.id

  depends_on = [
    aws_s3_bucket.website_bucket
  ]
}

output frontend_url {
  value = local.domain_name
}

output cloudfront_distribution_id {
  value      = aws_cloudfront_distribution.website.id

  depends_on = [
    aws_cloudfront_distribution.site
  ]
}