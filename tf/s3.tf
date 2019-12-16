resource "aws_s3_bucket" "portfolio" {
  bucket = "kirbyjs-portfolio"
  acl    = "private"

  tags = {
    Name = "kirbyjs-portfolio"
  }
}
