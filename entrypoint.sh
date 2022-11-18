#!/bin/bash

set -e

node_modules/.bin/knex migrate:latest
npm start

exec "$@"
