locals {
  root_s3_origin_id       = "root-kirbyjs-bucket"
  www_s3_origin_id        = "www-kirbyjs-bucket"
  default_allowed_methods = ["GET", "HEAD", "OPTIONS"]
  default_cached_methods  = ["GET", "HEAD", "OPTIONS"]
  default_ttl             = 2592000
  max_ttl                 = 31536000
  min_ttl                 = 86400
}

data "aws_lambda_function" "cloudfront_default_directory_index" {
  function_name = "CloudfrontDefaultDirectoryIndex"
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
    allowed_methods        = local.default_allowed_methods
    cached_methods         = local.default_cached_methods
    compress               = true
    target_origin_id       = local.root_s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = local.default_ttl
    max_ttl                = local.max_ttl
    min_ttl                = local.min_ttl

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = "${data.aws_lambda_function.cloudfront_default_directory_index.arn}:3"
    }
  }

    ordered_cache_behavior {
      path_pattern           = "/index.html"
      allowed_methods        = local.default_allowed_methods
      compress               = true
      cached_methods         = local.default_cached_methods
      target_origin_id       = local.root_s3_origin_id
      viewer_protocol_policy = "redirect-to-https"
      default_ttl            = 0
      max_ttl                = 0
      min_ttl                = 0

      forwarded_values {
        query_string = false

        cookies {
          forward = "none"
        }
      }
    }

  ordered_cache_behavior {
    path_pattern           = "/fcc/*.html"
    allowed_methods        = local.default_allowed_methods
    compress               = true
    cached_methods         = local.default_cached_methods
    target_origin_id       = local.root_s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0

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
