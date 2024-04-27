#!/bin/sh

exitWithError() {
    echo "Dev FAILED!";
    exit 1;
}

echo "Dev session running .."
sleep 1

docker compose --profile backend up -d || exitWithError
cd client/ng
npm run start || exitWithError
docker compose stop

echo "Dev session is over"