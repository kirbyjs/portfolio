resource "aws_s3_bucket" "portfolio" {
  bucket = "kirbyjs-portfolio"
  acl    = "private"
  policy = file("${path.cwd}/resources/bucket-policy.json")

  tags = {
    Name = "kirbyjs-portfolio"
  }
}
