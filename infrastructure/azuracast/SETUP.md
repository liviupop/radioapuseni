# Implementare AzuraCast

## Arhitectura DNS

- `radioapuseni.ro` - Cloudflare Pages, homepage/PWA;
- `www.radioapuseni.ro` - redirect permanent spre domeniul apex;
- `stream.radioapuseni.ro` - VPS AzuraCast, înregistrare `A` DNS-only;
- conexiunile pentru streameri folosesc IP-ul direct și portul indicat de AzuraCast.

Cloudflare nu trebuie folosit ca proxy pentru porturile de conectare ale streamerilor.
Înregistrarea `stream` rămâne cu norul gri; TLS este terminat de AzuraCast.

## VPS

Recomandare de pornire:

- Ubuntu 24.04 LTS;
- minimum 2 vCPU, 4 GB RAM și 40 GB SSD;
- regiune europeană;
- autentificare SSH cu cheie, fără parolă;
- firewall: 22/TCP restricționat administrativ, 80/TCP, 443/TCP și 2022/TCP doar dacă SFTP-ul AzuraCast este folosit.

După crearea VPS-ului și propagarea DNS:

```bash
sudo AZURACAST_HOSTNAME=stream.radioapuseni.ro ./install.sh
```

Scriptul descarcă și rulează instalatorul Docker oficial AzuraCast. Configurarea contului administrator se finalizează în browser.

După instalare:

1. deschideți `https://stream.radioapuseni.ro`;
2. în System Settings setați Base URL la același URL;
3. în System Administration → System Settings → Services activați web proxy-ul;
4. solicitați certificatul Let's Encrypt din interfața AzuraCast;
5. confirmați că atât pagina publică, cât și mount-ul răspund exclusiv prin HTTPS.

Nu activați modul live al homepage-ului cât timp certificatul nu este valid.
Un site HTTPS nu poate reda un stream HTTP din cauza mixed content.

## Stația

- nume: `Radio Apuseni`;
- short name: `radio_apuseni`;
- fus orar: `Europe/Bucharest`;
- frontend: Icecast;
- AutoDJ: Liquidsoap;
- URL public: `https://stream.radioapuseni.ro`.

Mount-uri:

- `/radio.mp3` - MP3, 128 kbps, stereo;
- `/radio-low.aac` - AAC-HE, 64 kbps, pentru conexiuni slabe.

Valorile folosite de site sunt:

```text
https://stream.radioapuseni.ro/listen/radio_apuseni/radio.mp3
https://stream.radioapuseni.ro/api/nowplaying/radio_apuseni
```

## Playlisturi și grilă

Fișierul `playlists.csv` este checklistul canonic pentru cele zece playlisturi. Prioritățile explicite evită ca rotația generală să acopere emisiunile programate.

Pentru lansare:

1. creați cele zece playlisturi;
2. setați sloturile în `Europe/Bucharest`;
3. atribuiți fiecare folder media playlistului cu același nume;
4. activați podcasturile pentru cele cinci emisiuni permanente;
5. activați on-demand doar pentru episoadele aprobate editorial;
6. verificați cel puțin o tranziție zi/noapte într-o stație de test.

## Podcasturi

Se creează câte un podcast pentru:

- Glasul Locului;
- Jurnal de Teren;
- Peisajul Viu;
- Custodes;
- Glasul Pădurii.

După publicarea primului episod, URL-urile RSS se introduc în `site/config.js`, iar `mode` devine `live`.

URL-ul RSS se copiază din butonul RSS al podcastului din AzuraCast. Nu se
construiește manual. Pagina îl citește prin proxy-ul same-origin
`/api/feed?url=...`, inclus în `site/_worker.js`, ca arhiva să nu depindă de
antetele CORS ale serverului AzuraCast.

## Backup și arhivă

Storage Box nu este necesar cât timp există numai cele trei fișiere demonstrative. Devine necesar odată cu primul master WAV sau cu prima instalare AzuraCast de producție.

Pentru backup:

1. creați Storage Box și activați accesul SSH;
2. instalați cheia publică a VPS-ului;
3. setați `STORAGEBOX_USER`, `STORAGEBOX_HOST` și opțional `STORAGEBOX_PATH`;
4. rulați `backup-to-storage-box.sh` din cron, zilnic;
5. testați restaurarea pe un VPS separat înaintea lansării editoriale.

Masterele WAV și materialele needitate urmează structura din `archive-template/`; pe VPS rămân doar fișierele de difuzare.

## Activare homepage live

În `site/config.js`:

- `mode: "live"`;
- confirmați `streamUrl` și `nowPlayingApi`;
- completați feed-urile cu URL-urile copiate din AzuraCast;
- goliți lista `demoEpisodes`.

Marcajul „Prototip public” dispare automat în modul live. Păstrați
`rssProxyPath: "/api/feed"` și confirmați că `AZURACAST_HOST` din
`wrangler.jsonc` este `stream.radioapuseni.ro`.

Vizualizarea audio încearcă analiza directă a streamului. Dacă serverul nu
permite CORS pe `/listen/`, redarea continuă, iar punctul de pe munte folosește
automat animația sintetică.
