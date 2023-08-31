#!/usr/bin/env bash
set -uEuo pipefail

_log() {
    echo "-- videoli-auth: $*"
}

_log "start, env:"

env

_log "about to run npm start"

exec npm run start