data "aws_route53_zone" "kirbyjs" {
  name = "kirbyjs.com."
}

resource "aws_route53_record" "root_domain" {
  zone_id = data.aws_route53_zone.kirbyjs.zone_id
  name    = "kirbyjs.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
