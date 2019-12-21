resource "aws_s3_bucket_policy" "root_kirbyjs_bucket_policy" {
  bucket = aws_s3_bucket.root_kirbys.id
  policy = data.aws_iam_policy_document.root_kirbjs_bucket_policy.json
}

resource "aws_s3_bucket" "root_kirbys" {
  bucket = "kirbyjs.com"
  acl    = "private"

  tags = {
    Name = "kirbyjs.com"
  }
}

resource "aws_s3_bucket" "www_kirbyjs" {
  bucket = "www.kirbyjs.com"
  acl    = "private"

  website {
    redirect_all_requests_to = "https://kirbyjs.com"
  }

  tags = {
    Name = "www.kirbyjs.com"
  }
}
