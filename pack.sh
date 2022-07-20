#!/bin/bash

ERRC=0;

error(){
    echo "ERROR: " $1;
    ERRC=${ERRC+1};
}

echo "Packing files ..."

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd ${SCRIPT_DIR};


BASE_DIR=dist
NG_DIR=${BASE_DIR}/jeudemots
REACT_DIR=${BASE_DIR}/jeudemots-react
VUE_DIR=${BASE_DIR}/jeudemots-vue
BACKEND_DIR=${BASE_DIR}/jeudemots-api

rm -rf ${BASE_DIR}

# Backend
mkdir -p ${BACKEND_DIR}
cp -vr projects/backend/build/* ${BACKEND_DIR} && echo "Backend OK" || (echo "Unable to copy Backend files!" && exit )

# FrontEnd Angular

mkdir -p ${NG_DIR}

if( cp -vr projects/frontend-ng/build/* ${NG_DIR} )
then
    echo "Front (Angular) OK";
else
    error "Unable to copy Angular files!" ;
fi

# FrontEnd React

mkdir -p ${REACT_DIR}

if( cp -vr projects/frontend-react/build/* ${REACT_DIR} )
then
    echo "Front (React) OK";
else
    error "Unable to copy React files!";
fi

# FrontEnd Vue

mkdir -p ${VUE_DIR}

if( cp -vr projects/frontend-vue/build/* ${VUE_DIR} )
then
    echo "Vue (React) OK";
else
    error "Unable to copy Vue files!";
fi

# Check errors and exit
if [[ "${ERRC}" -eq "0" ]];
then
    echo "Packing OK - output: ${SCRIPT_DIR}/${BASE_DIR}"
    exit
fi

echo "Packing ERROR! (check logs above)"
exit 1

