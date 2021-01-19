terraform {
  backend "s3" {
    bucket = "kirbyjs-terraform-statefiles"
    key    = "kirbyjs/prod.tf"
    region = "us-east-1"
  }
}

provider "aws" {
  version = "~> 3.24"
  region  = "us-east-1"
}
