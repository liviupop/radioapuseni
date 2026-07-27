# Runbook de lansare Radio Apuseni

Acest document pornește de la un VPS Ubuntu 24.04 gol și se încheie cu site-ul,
streamul și arhiva testate public.

## 1. Date necesare

- cont Cloudflare cu zona `radioapuseni.ro`;
- acces ROTLD pentru schimbarea nameserverelor;
- VPS Hetzner cu minimum 2 vCPU, 4 GB RAM și 40 GB SSD;
- cheie SSH pentru administrare;
- fișierele audio aprobate editorial.

Nu este necesar un Storage Box pentru materialele demonstrative. Devine
necesar înainte de a păstra mastere WAV sau materiale editoriale unice.

## 2. DNS

1. Adăugați `radioapuseni.ro` în Cloudflare.
2. În ROTLD, înlocuiți nameserverele cu cele furnizate de Cloudflare.
3. Creați în Cloudflare înregistrarea:

   ```text
   Type: A
   Name: stream
   Content: IP-ul VPS-ului
   Proxy status: DNS only
   TTL: Auto
   ```

4. Așteptați ca `stream.radioapuseni.ro` să rezolve la IP-ul VPS-ului.

Nu porniți emiterea publică înainte ca DNS-ul și certificatul TLS să fie
valide.

## 3. Instalarea AzuraCast

Copiați folderul `infrastructure/azuracast` pe VPS, apoi:

```bash
cd infrastructure/azuracast
sudo AZURACAST_HOSTNAME=stream.radioapuseni.ro ./install.sh
```

Instalatorul folosește scriptul Docker oficial AzuraCast. După instalare:

1. creați contul administrator;
2. setați Base URL la `https://stream.radioapuseni.ro`;
3. activați web proxy-ul;
4. solicitați certificatul Let's Encrypt;
5. verificați certificatul în browser.

## 4. Configurarea stației

Folosiți:

```text
Nume: Radio Apuseni
Shortcode: radio_apuseni
Fus orar: Europe/Bucharest
Frontend: Icecast
AutoDJ: Liquidsoap
Mount principal: /radio.mp3
Format: MP3, 128 kbps, stereo
```

URL-urile finale trebuie să fie:

```text
Stream:
https://stream.radioapuseni.ro/listen/radio_apuseni/radio.mp3

Now-playing:
https://stream.radioapuseni.ro/api/nowplaying/radio_apuseni
```

Deschideți ambele URL-uri înainte de a activa site-ul. Primul trebuie să
livreze audio, al doilea JSON.

## 5. Playlisturi și orar

Folosiți `infrastructure/azuracast/playlists.csv` ca listă canonică.

| Playlist | Program |
|---|---|
| Vocea Milenei — deschidere | zilnic, 08:00 |
| Glasul Locului | luni, 09:00 și 20:00 |
| Jurnal de Teren | marți, 09:00 și 20:00 |
| Peisajul Viu | miercuri, 09:00 și 20:00 |
| Custodes | joi, 09:00 și 20:00 |
| Glasul Pădurii | vineri, 09:00 și 20:00 |
| Povestea de seară | zilnic, 21:45–22:00 |
| Noaptea Apusenilor | zilnic, 22:00–08:00, aleatoriu |
| Vocea Milenei — legături | între programe |
| Rotație generală | în afara sloturilor |

Încărcați fișierele de difuzare, atribuiți-le playlistului potrivit și
verificați cel puțin o tranziție între două sloturi.

## 6. Podcasturi și arhivă

Creați câte un podcast pentru:

- Glasul Locului;
- Jurnal de Teren;
- Peisajul Viu;
- Custodes;
- Glasul Pădurii.

După publicarea unui episod, copiați URL-ul din butonul RSS al podcastului.
Nu deduceți URL-ul din numele emisiunii.

În `site/config.js`, înlocuiți `url: null` numai pentru feed-urile publicate:

```js
{
  name: "Glasul Locului",
  tagline: "Oamenii dau glas locurilor.",
  url: "URL-ul HTTPS copiat din AzuraCast"
}
```

Cloudflare Pages servește deja `/api/feed` prin `site/_worker.js`. Proxy-ul
acceptă doar URL-uri HTTPS de la `stream.radioapuseni.ro`, verifică răspunsul
XML și îl memorează temporar la edge. Nu este necesară expunerea unui proxy
generic și nici modificarea CORS pentru RSS.

## 7. Activarea modului live

În `site/config.js`:

```js
mode: "live",
stationShortcode: "radio_apuseni",
streamUrl: "https://stream.radioapuseni.ro/listen/radio_apuseni/radio.mp3",
nowPlayingApi: "https://stream.radioapuseni.ro/api/nowplaying/radio_apuseni",
rssProxyPath: "/api/feed",
demoEpisodes: []
```

Modul `preview` rămâne utilizabil până când serverul există. În `live`,
marcajul de prototip dispare automat și titlul este reîmprospătat la fiecare
30 de secunde.

## 8. Publicarea pe Cloudflare Pages

Din rădăcina proiectului:

```bash
NPM_CONFIG_CACHE=/tmp/radioapuseni-npm-cache \
WRANGLER_LOG_PATH=/tmp/radioapuseni-wrangler.log \
npx --yes wrangler@latest whoami
```

Apoi:

```bash
NPM_CONFIG_CACHE=/tmp/radioapuseni-npm-cache \
WRANGLER_LOG_PATH=/tmp/radioapuseni-wrangler.log \
npx --yes wrangler@latest pages deploy site --project-name radio-apuseni
```

În Cloudflare Pages → Custom domains:

1. adăugați `radioapuseni.ro`;
2. adăugați `www.radioapuseni.ro`;
3. configurați redirectul permanent `www` → apex;
4. păstrați `stream.radioapuseni.ro` separat și DNS-only.

Folderul publicat trebuie să conțină `_worker.js`; acesta deservește arhiva și
trimite toate celelalte cereri către activele statice.

## 9. Testul de acceptanță

- `https://radioapuseni.ro` răspunde cu certificat valid;
- Play pornește sunetul fără avertisment mixed content;
- titlul AzuraCast apare în maximum 30 de secunde;
- pauză și reluare funcționează;
- controalele media apar pe ecranul blocat al telefonului;
- Arhivă afișează episoadele RSS publicate;
- un feed de pe alt domeniu este refuzat de `/api/feed`;
- aplicația poate fi adăugată pe ecranul principal;
- după 22:00 interfața trece în registrul de noapte;
- dacă analiza audio este blocată de CORS, streamul continuă să fie redat și
  animația muntelui rămâne activă;
- o copie de siguranță și o restaurare de test sunt documentate înainte de
  introducerea materialelor editoriale unice.
