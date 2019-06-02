#!/usr/bin/env bash

set -e

testImageName=$2
productionImageName=$1

docker image build -t ${testImageName} --target build .
docker image build -t ${productionImageName} --target production .
