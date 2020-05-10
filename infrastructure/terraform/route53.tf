data "aws_route53_zone" "primary" {
  name          = "${var.DOMAIN_NAME}."
  private_zone  = false
}

resource "aws_route53_record" "www_a" {
  name    = local.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.primary.zone_id

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}


resource "aws_route53_record" "www_aaaa" {
  name    = local.domain_name
  type    = "AAAA"
  zone_id = data.aws_route53_zone.primary.zone_id

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}