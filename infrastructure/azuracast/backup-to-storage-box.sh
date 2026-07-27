#!/usr/bin/env bash
set -euo pipefail

: "${STORAGEBOX_USER:?Lipsește STORAGEBOX_USER}"
: "${STORAGEBOX_HOST:?Lipsește STORAGEBOX_HOST}"
: "${STORAGEBOX_PATH:=/backups/radio-apuseni}"

AZURACAST_DIR="${AZURACAST_DIR:-/var/azuracast}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/azuracast}"
STAMP="$(date -u +%Y-%m-%dT%H%M%SZ)"
ARCHIVE="${BACKUP_DIR}/azuracast-${STAMP}.tar.gz"

install -d -m 0700 "${BACKUP_DIR}"
cd "${AZURACAST_DIR}"
./docker.sh backup "${ARCHIVE}"

rsync -az --partial -e "ssh -p 23" \
  "${ARCHIVE}" \
  "${STORAGEBOX_USER}@${STORAGEBOX_HOST}:${STORAGEBOX_PATH}/"

find "${BACKUP_DIR}" -type f -name 'azuracast-*.tar.gz' -mtime +7 -delete
