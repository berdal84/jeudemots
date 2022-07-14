#!/bin/bash

echo "Building backend ..."

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd ${SCRIPT_DIR};

rm -rf build || exit "Unable to delete existing build folder!"
mkdir -p build || exit "Unable to create build folder!"
cp -av src/ build || exit "Unable to copy PHP files to build folder!"
cp -a conf/config.prod.php build/config.php || exit "Unable to copy config.prod.php!"

echo "Building backend OK - output: ${SCRIPT_DIR}/build"