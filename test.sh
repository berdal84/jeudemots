#!/bin/sh

exitWithError() {
    echo "Tests FAILED!";
    exit 1;
}

cd client/ng && npm run test || exitWithError