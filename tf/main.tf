terraform {
  backend "s3" {
    bucket = "kirbyjs-terraform-statefiles"
    key    = "portfolio/prod.tf"
    region = "us-east-1"
  }
}

provider "aws" {
  version = "~> 2.0"
  region  = "us-east-1"
}

data "aws_acm_certificate" "kirbyjs" {
  domain = "*.kirbyjs.com"
}
