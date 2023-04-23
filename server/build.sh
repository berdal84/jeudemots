#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd ${SCRIPT_DIR};

echo "-- Cleaning ${SCRIPT_DIR}/build/ ..."
rm -rf build || (echo "Unable to delete existing build folder!"; exit 1);
mkdir -p build || (echo "Unable to create build folder!"; exit 1);

echo "-- Copying to ${SCRIPT_DIR}/build/ ..."
cp -av src/* build || (echo "Unable to copy PHP files to build folder!"; exit 1);

echo "-- Cleaning ..."
rm build/config.sample.php || (echo "Unable to remove config.sample.php!"; exit 1);

echo "Server files are copied - output: ${SCRIPT_DIR}/build"