#!/bin/sh

exitWithError() {
    echo "Dev FAILED!";
    exit 1;
}

docker compose --profile backend up -d || exitWithError
cd client/ng
npm run start || exitWithError
docker compose stop

exho "Dev session is over"