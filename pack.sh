#!/bin/bash

ERRC=0;

error(){
    echo "ERROR: " $1;
    ERRC=${ERRC+1};
}

echo "Packing files ..."

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd ${SCRIPT_DIR};

rm -rf dist

# Backend
mkdir -p dist/backend
cp -vr projects/backend/build/* dist/backend && echo "Backend OK" || (echo "Unable to copy Backend files!" && exit )

# FrontEnd Angular
NG_DIR=dist/jeudemots
mkdir -p ${NG_DIR}

if( cp -vr projects/frontend-ng/build/* ${NG_DIR} )
then
    echo "Front (Angular) OK";
else
    error "Unable to copy Angular files!" ;
fi

# FrontEnd React
REACT_DIR=dist/jeudemots-react
mkdir -p ${REACT_DIR}

if( cp -vr projects/frontend-react/build/* ${REACT_DIR} )
then
    echo "Front (React) OK";
else
    error "Unable to copy React files!";
fi

# Check errors and exit
if [[ "${ERRC}" -eq "0" ]];
then
    echo "Building backend OK - output: ${SCRIPT_DIR}/dist"
    exit
fi

echo "Building backend ERROR! (check logs above)"
exit 1

