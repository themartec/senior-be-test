#!/bin/sh

set -e

npm run migration:up
npm run worker
npm run jobs:init

exec "$@"
