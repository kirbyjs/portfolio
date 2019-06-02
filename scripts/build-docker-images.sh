#!/usr/bin/env bash

set -e

testImageName=$2
dockerHubImageName=$1

docker image build -t ${testImageName} --target build .
docker image build -t ${dockerHubImageName} --target production .
