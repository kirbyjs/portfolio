data "aws_route53_zone" "kirbyjs" {
  name = "kirbyjs.com."
}

data "aws_acm_certificate" "kirbyjs" {
  domain = "kirbyjs.com"
}

resource "aws_route53_record" "root_kirbyjs" {
  zone_id = data.aws_route53_zone.kirbyjs.zone_id
  name    = "kirbyjs.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.root_kirbyjs.domain_name
    zone_id                = aws_cloudfront_distribution.root_kirbyjs.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_kirbyjs" {
  zone_id = data.aws_route53_zone.kirbyjs.zone_id
  name    = "www.kirbyjs.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_kirbyjs.domain_name
    zone_id                = aws_cloudfront_distribution.www_kirbyjs.hosted_zone_id
    evaluate_target_health = false
  }
}
