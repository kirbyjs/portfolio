#!/usr/bin/env bash

set -e

productionImageName=$1

docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}

docker push kirbyjs/${productionImageName}
