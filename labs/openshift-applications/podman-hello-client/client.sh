#!/usr/bin/env bash

OPTS='--connect-timeout 2 --insecure --silent --write-out \n'

while true; do
  curl ${OPTS} "${PROTO}://${URL}:${PORT}/${ENDPOINT}"
  sleep 1
done