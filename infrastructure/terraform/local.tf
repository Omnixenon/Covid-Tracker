locals {
  frontend_origin_id  = "FrontendOrigin"
  service_name = title("${var.SERVICE}")
  domain_name = "${var.SERVICE}.${var.DOMAIN_NAME}"
}