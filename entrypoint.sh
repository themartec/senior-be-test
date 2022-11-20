#!/bin/bash

set -e

npm run migration:up
npm start

exec "$@"
