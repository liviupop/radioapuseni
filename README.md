# Radio Apuseni

Site public/PWA și pachet operațional pentru infrastructura audio a Ecomuzeului
Țării Moților. Interfața folosește versiunea a doua a prototipului, cu relieful
3D, și este pregătită pentru integrarea AzuraCast.

## Structură

- `site/` - homepage statică/PWA, gata pentru Cloudflare Pages;
- `infrastructure/azuracast/` - instalare, grilă și proceduri AzuraCast;
- `RUNBOOK.md` - pașii exacți de la VPS gol până la testul de lansare;
- `archive-template/` - convenția arhivei documentare și CSV-ul canonic;
- `first_version/` - prototipul primit, păstrat nemodificat;
- `second version/` - prototipul 3D primit, păstrat ca sursă;
- `radio_apuseni_identitate_editoriala.pdf` - sursa editorială.

## Rulare locală

```bash
python3 -m http.server 4173 --directory site
```

Deschideți `http://localhost:4173`.

## Trecerea de la prototip la emisie

Toate valorile publice sunt centralizate în `site/config.js`:

1. schimbați `mode` din `preview` în `live`;
2. confirmați URL-urile `streamUrl` și `nowPlayingApi`;
3. copiați URL-ul RSS exact al fiecărui podcast din AzuraCast;
4. goliți `demoEpisodes`.

Pagina principală rămâne pe `radioapuseni.ro`, iar AzuraCast va rula pe `stream.radioapuseni.ro`.
Feed-urile RSS sunt citite prin `/api/feed`, implementat în `site/_worker.js`;
nu este necesară modificarea CORS în AzuraCast.

## Publicare Cloudflare Pages

```bash
NPM_CONFIG_CACHE=/tmp/radioapuseni-npm-cache \
WRANGLER_LOG_PATH=/tmp/radioapuseni-wrangler.log \
npx --yes wrangler@latest pages deploy site --project-name radio-apuseni
```

Autentificarea se verifică înainte cu `npx wrangler whoami`. Domeniul apex se conectează proiectului Pages după ce zona `radioapuseni.ro` este adăugată în contul Cloudflare și nameserverele sunt schimbate la ROTLD.

`site/_worker.js` trebuie publicat împreună cu restul folderului. Publicarea prin
Wrangler este recomandată pentru ca variabila `AZURACAST_HOST` din
`wrangler.jsonc` să rămână reproductibilă.
