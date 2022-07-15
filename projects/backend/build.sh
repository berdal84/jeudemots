#!/bin/bash

echo "Building backend ..."

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd ${SCRIPT_DIR};

rm -rf build || exit "Unable to delete existing build folder!"
mkdir -p build || exit "Unable to create build folder!"
cp -av src/ build || exit "Unable to copy PHP files to build folder!"
 
CONFIG_PROD=conf/config.prod.php
if test -f "$CONFIG_PROD"; then
    cp -a $CONFIG_PROD build/config.php || exit "Unable to copy config.prod.php!";
    echo "Configuration file copied!"
else
    echo "WARNING: no configuration file found!";
fi
echo "Building backend OK - output: ${SCRIPT_DIR}/build"