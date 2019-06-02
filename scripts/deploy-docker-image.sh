#!/usr/bin/env bash

set -e

dockerHubImageName=$1

echo ${DOCKERHUB_PASS} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin

docker push ${dockerHubImageName}
