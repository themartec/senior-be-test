#!/bin/sh

set -e

npm run migration:up
npm start

exec "$@"
