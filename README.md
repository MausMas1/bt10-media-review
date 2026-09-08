# BT10 Media — reviewversie

Statische portfolio-website voor Bruce Tol / BT10 Media. Deze repository is bedoeld als eerste reviewversie voor de toekomstige eigenaar.

## Online review via GitHub Pages

1. Open in GitHub **Settings → Pages**.
2. Kies bij **Build and deployment** voor **Deploy from a branch**.
3. Selecteer de branch `main` en de map **/(root)**, en sla op.
4. GitHub toont daarna de reviewlink. Het kan enkele minuten duren voordat die actief is.

De site is volledig statisch: er zijn geen omgevingsvariabelen, formulieren, trackers of serverinstellingen nodig voor GitHub Pages. Het bestand `.nojekyll` zorgt ervoor dat GitHub Pages alle bestanden ongewijzigd serveert.

## Lokaal openen

Dubbelklik op `Start website.command`, of voer uit:

```sh
npm start
```

Open vervolgens `http://127.0.0.1:4173`.

## Voor de eigenaar om te beoordelen

- Controleer alle projectteksten en functies/rollen; enkele projectverhalen bevatten bewust nog een label **“Jouw verhaal · nog in te vullen”**.
- Bevestig de rechten voor alle foto’s en video’s vóór publieke publicatie.
- Controleer of de Instagram- en LinkedIn-links nog de juiste profielen zijn.
- Een e-mailadres/contactformulier is nog niet toegevoegd.

## Bestanden

- `index.html` — pagina-inhoud en structuur
- `style.css` — vormgeving en animaties
- `script.js` — projectdata, vensters en interactie
- `assets/` — beelden, logo’s en video’s
- `server.mjs` — uitsluitend voor lokale preview; GitHub Pages heeft dit niet nodig
