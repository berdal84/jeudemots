#!/bin/sh

exitWithError() {
    echo "Build FAILED!";
    exit 1;
}

echo "Build .. (will start soon)"
sleep 1

cd client/shared
npm run build || exitWithError
cd -

cd client/ng
npm run build || exitWithError
cd -

cd client/react
npm run build || exitWithError
cd -

cd client/vue
npm run build || exit
cd -

docker compose --profile backend build  || exitWithError

echo "Build OK"