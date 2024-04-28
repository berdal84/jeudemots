#!/bin/sh

exitWithError() {
    echo "Build FAILED!";
    exit 1;
}

echo "Build .. (will start soon)"
sleep 1

cd ui/shared
npm run build || exitWithError
cd -

cd ui/ng
npm run build || exitWithError
cd -

cd ui/react
npm run build || exitWithError
cd -

cd ui/vue
npm run build || exit
cd -

docker compose --profile backend build  || exitWithError

echo "Build OK"