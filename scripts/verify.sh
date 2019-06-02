#!/usr/bin/env bash

set -e

testImageName='portfolio-build'
productionImageName="portfolio:${CIRCLE_SHA1}"

./scripts/build-docker-images.sh ${productionImageName} ${testImageName}

docker container run portfolio-build npm run test
testExitCode=$?

if [[ ${testExitCode} == 0 ]]; then
    ./scripts/deploy-docker-image.sh ${productionImageName}
fi

# Cleanup
docker container prune -f
docker image prune -f

exit ${testExitCode}
