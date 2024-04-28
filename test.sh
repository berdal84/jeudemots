#!/bin/sh

exitWithError() {
    echo "Tests FAILED!";
    exit 1;
}

docker compose up ui -d;
docker compose exec -it ui sh -c "npm run test -- --no-watch --no-progress --browsers ChromeHeadlessCI" || exitWithError
docker compose stop;