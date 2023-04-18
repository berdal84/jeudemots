#!/bin/bash

ERRC=0;

error(){
    echo "ERROR: " $1;
    ERRC=${ERRC+1};
}

echo "Packing files ..."

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd ${SCRIPT_DIR} || exit;


# Define output directories
OUTPUT_DIR=dist
NG_OUTPUT_DIR=${OUTPUT_DIR}/client-ng
REACT_OUTPUT_DIR=${OUTPUT_DIR}/client-react
VUE_OUTPUT_DIR=${OUTPUT_DIR}/client-vue
SERVER_OUTPUT_DIR=${OUTPUT_DIR}/server

rm -rf ${OUTPUT_DIR}

# Server
mkdir -p ${SERVER_OUTPUT_DIR}
cp -vr server/build/* ${SERVER_OUTPUT_DIR} && echo "Server OK" || (echo "Unable to copy Server files!" && exit )

# Client Angular

mkdir -p ${NG_OUTPUT_DIR}

if( cp -vr client/ng/build/* ${NG_OUTPUT_DIR} )
then
    echo "Client (Angular) OK";
else
    error "Unable to copy Angular files!" ;
fi

# Client React

mkdir -p ${REACT_OUTPUT_DIR}

if( cp -vr client/react-js/build/* ${REACT_OUTPUT_DIR} )
then
    echo "Client (React) OK";
else
    error "Unable to copy React files!";
fi

# Client Vue

mkdir -p ${VUE_OUTPUT_DIR}

if( cp -vr client/vue/build/* ${VUE_OUTPUT_DIR} )
then
    echo "Client (Vue) OK";
else
    error "Unable to copy Vue files!";
fi

# Check errors and exit
if [[ "${ERRC}" -eq "0" ]];
then
    echo "Packing OK - output: ${SCRIPT_DIR}/${OUTPUT_DIR}"
    exit
fi

echo "Packing ERROR! (check logs above)"
exit 1

