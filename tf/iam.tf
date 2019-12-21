data "aws_iam_policy_document" "root_kirbjs_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.root_kirbys.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.root_kirbyjs.iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.root_kirbys.arn]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.root_kirbyjs.iam_arn]
    }
  }
}
