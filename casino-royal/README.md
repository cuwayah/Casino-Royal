# Casino Royal – Website mit Online-Mehrspieler

Dieses Paket enthält alles, um das Casino auf eine eigene Website zu stellen, damit du jederzeit mit Freunden spielen kannst.

**Dateien**
- `index.html` – das komplette Spiel (eine Datei)
- `server.js` – kleiner Server, der das Spiel ausliefert und die Spieler am Tisch verbindet (keine Zusatzpakete nötig)
- `package.json` – sagt dem Hoster, wie der Server gestartet wird

## 1. Lokal ausprobieren (optional)
1. Node.js installieren (nodejs.org, Version 18 oder neuer).
2. Im Ordner `node server.js` ausführen.
3. Im Browser `http://localhost:3000` öffnen. Mit einem zweiten Browserfenster (oder privatem Fenster) siehst du dich selbst als zweiten Spieler.

## 2. Kostenlos ins Internet stellen (Render)
1. Auf github.com ein Konto anlegen und ein neues Repository erstellen (z. B. `casino-royal`). Die drei Dateien hineinladen (Add file → Upload files).
2. Auf render.com ein Konto anlegen (Anmeldung mit GitHub).
3. **New → Web Service** → dein Repository auswählen.
4. Einstellungen: Runtime **Node**, Build Command leer lassen, Start Command **`npm start`**, Instance Type **Free**.
5. Auf **Create Web Service** klicken. Nach 1–2 Minuten bekommst du eine Adresse wie `https://casino-royal.onrender.com`.

Hinweis: Der kostenlose Tarif schläft nach etwa 15 Minuten ohne Besucher ein. Der erste Aufruf danach dauert dann rund eine Minute. Für dauerhaft sofortigen Start gibt es bezahlte Tarife (ab ca. 7 $/Monat) oder einen eigenen kleinen Server.

Eine eigene Domain (z. B. `meincasino.de`) kannst du bei Render unter *Settings → Custom Domains* verbinden.

## 3. Mit Freunden spielen
- Alle, die die Adresse öffnen, landen im Raum `main` und sitzen automatisch an denselben Tischen.
- Für einen **privaten Raum** hängst du `?room=deinname` an: `https://casino-royal.onrender.com/?room=freunde`. Wer denselben Raumnamen verwendet, spielt zusammen. Unten im Spiel steht ein Knopf **„Link kopieren“**.
- Jeder setzt sich per **＋** an einen Tisch. Der Spieler mit der 👑 startet die gemeinsamen Runden.

## Gut zu wissen
- Es braucht kein Konto. Jeder Browser merkt sich sein Guthaben selbst (im Browser gespeichert). Es gibt keinen Schutz gegen Schummeln, für Freunde ist das okay.
- Es handelt sich um Spielgeld. Sobald echtes Geld im Spiel ist (Einzahlung oder Auszahlung), gelten Glücksspielgesetze, die du vorher prüfen musst.
- Der Raumname ist wie ein Geheimcode: Wer ihn kennt, kann beitreten.
