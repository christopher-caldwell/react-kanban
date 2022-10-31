#!/bin/sh

if [ $? != 0 ]; then
  printf "\n\n$Red$(echo Build failed.)$Color_Off"
  exit 1
fi

tsc -p tsconfig.build.json

if [ $? != 0 ]; then
  printf "\n\n$Red$(echo Build failed.)$Color_Off"
  exit 1
fi

npx tscpaths -p tsconfig.json -s src -o dist

if [ $? != 0 ]; then
  printf "\n\n$Red$(echo Build failed.)$Color_Off"
  exit 1
fi

yarn sass src/styles.scss dist/styles.css --no-source-map

if [ $? != 0 ]; then
  printf "\n\n$Red$(echo Build failed.)$Color_Off"
  exit 1
fi
