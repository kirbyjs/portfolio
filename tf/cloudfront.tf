locals {
  root_s3_origin_id = "root-kirbyjs-bucket"
  www_s3_origin_id  = "www-kirbyjs-bucket"
}

resource "aws_cloudfront_origin_access_identity" "root_kirbyjs" {
  comment = "kirbyjs.com default oai"
}

resource "aws_cloudfront_distribution" "root_kirbyjs" {
  origin {
    domain_name = aws_s3_bucket.root_kirbys.bucket_regional_domain_name
    origin_id   = local.root_s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.root_kirbyjs.cloudfront_access_identity_path
    }
  }

  aliases             = ["kirbyjs.com"]
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.root_s3_origin_id
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.kirbyjs.arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_cloudfront_distribution" "www_kirbyjs" {
  origin {
    domain_name = aws_s3_bucket.www_kirbyjs.website_endpoint
    origin_id   = local.www_s3_origin_id

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  aliases             = ["www.kirbyjs.com"]
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.www_s3_origin_id
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.kirbyjs.arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method       = "sni-only"
  }
}
