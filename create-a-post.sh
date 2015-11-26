#!/bin/bash

if [[ "$1" == "" ]]; then
  echo Please provide a name for the post
  exit 1
fi

rake post title="$1"
