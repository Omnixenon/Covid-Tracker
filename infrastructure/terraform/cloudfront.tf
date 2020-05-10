resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "${local.service_name} OAI"
}

data "aws_acm_certificate" "ssl_cert" {
  provider = aws.north_virginia
  domain   = "*.seunadesina.com"
  statuses = ["ISSUED"]
}

resource "aws_cloudfront_distribution" "website" {
  depends_on  = [
    data.aws_acm_certificate.ssl_cert,
    aws_s3_bucket.website_bucket
  ]

  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id   = local.frontend_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.frontend_origin_id

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0

    forwarded_values {
      query_string = true
      headers      = ["Authorization"]

      cookies {
        forward           = "whitelist"
        whitelisted_names = ["session"]
      }
    }
  }

  price_class = "PriceClass_All"

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "blacklist"
      locations        = ["ET"]
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.ssl_cert.arn
    minimum_protocol_version = "TLSv1.2_2018"
    ssl_support_method       = "sni-only"
    # cloudfront_default_certificate = true
  }

  aliases = [local.domain_name]
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${local.service_name} React App"
  default_root_object = "index.html"
  wait_for_deployment = false
  tags                = {
    Name              = "${local.service_name}"
    Environment       = "${var.STAGE}"
  }
}