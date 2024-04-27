#!/bin/sh

exitWithError() {
    echo "Tests FAILED!";
    exit 1;
}

cd client/ng && npm run test -- --no-watch --no-progress --browsers ChromeHeadlessCI || exitWithError