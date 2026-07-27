#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Rulați scriptul ca root pe un VPS Ubuntu curat." >&2
  exit 1
fi

if [[ -z "${AZURACAST_HOSTNAME:-}" ]]; then
  echo "Setați AZURACAST_HOSTNAME, de exemplu stream.radioapuseni.ro." >&2
  exit 1
fi

if [[ "${AZURACAST_HOSTNAME}" != "stream.radioapuseni.ro" ]]; then
  echo "Atenție: hostname-ul diferă de arhitectura pregătită: ${AZURACAST_HOSTNAME}" >&2
fi

install -d -m 0755 /var/azuracast
cd /var/azuracast

curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/main/docker.sh -o docker.sh
chmod a+x docker.sh

echo "Instalatorul oficial AzuraCast este pregătit în /var/azuracast."
echo "DNS-ul trebuie să indice deja spre acest VPS înainte de activarea TLS."
./docker.sh install
