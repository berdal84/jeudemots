#!/bin/sh

exitWithError() {
    echo "Install FAILED!";
    exit 1;
}

echo "Install .. (will start soon)"
sleep 1

cd client/shared
npm i || exitWithError
cd -

cd client/ng
npm i || exitWithError
cd -

cd client/react
npm i || exitWithError
cd -

cd client/vue
npm i || exit
cd -

echo "Install OK"