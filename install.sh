#!/bin/sh

exitWithError() {
    echo "Install FAILED!";
    exit 1;
}

echo "Install .. (will start soon)"
sleep 1

cd ui/shared
npm i || exitWithError
cd -

cd ui/ng
npm i || exitWithError
cd -

cd ui/react
npm i || exitWithError
cd -

cd ui/vue
npm i || exit
cd -

echo "Install OK"