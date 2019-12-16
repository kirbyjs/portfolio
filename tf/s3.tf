data "aws_iam_policy_document" "portfolio_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.portfolio.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.default.iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.portfolio.arn]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.default.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "portfolio_bucket_policy" {
  bucket = aws_s3_bucket.portfolio.id
  policy = data.aws_iam_policy_document.portfolio_bucket_policy.json
}

resource "aws_s3_bucket" "portfolio" {
  bucket = "kirbyjs-portfolio"
  acl    = "private"

  tags = {
    Name = "kirbyjs-portfolio"
  }
}

resource "aws_s3_bucket" "www" {
  bucket = "www.kirbyjs.com"
  acl    = "private"

  website {
    redirect_all_requests_to = "https://kirbyjs.com"
  }

  tags = {
    Name = "www-kirbyjs-portfolio"
  }
}
