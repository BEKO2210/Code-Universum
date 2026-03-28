# Code Universum — Komplette Setup-Anleitung

Alles kostenlos. Supabase Free Tier + GitHub Pages = 0 Euro.

---

## Ubersicht: Was du brauchst

| Dienst | Kosten | Wofur |
|---|---|---|
| GitHub Pages | Kostenlos | Frontend-Hosting |
| Supabase Free Tier | Kostenlos (500 MB DB, 1 GB Storage, 50k Auth-User) | Datenbank, Auth, Dateispeicher |
| GitHub OAuth App | Kostenlos | Login via GitHub |

---

## Schritt 1: Supabase-Projekt erstellen

### 1.1 Account anlegen
1. Gehe zu **https://supabase.com**
2. Klicke **"Start your project"**
3. Melde dich mit deinem **GitHub-Account** an

### 1.2 Neues Projekt erstellen
1. Klicke **"New Project"**
2. Eingaben:
   - **Organization**: Wahle deine Organisation (wird automatisch erstellt)
   - **Project name**: `code-universum`
   - **Database Password**: Wahle ein sicheres Passwort (merken!)
   - **Region**: `EU West (Frankfurt)` — am nachsten zu dir
   - **Pricing Plan**: **Free** (reicht fur den Start)
3. Klicke **"Create new project"**
4. Warte 1-2 Minuten bis das Projekt bereit ist

### 1.3 Deine Supabase-Zugangsdaten finden
1. Gehe zu **Settings** (Zahnrad-Icon links unten)
2. Klicke auf **API** (unter "Configuration")
3. Dort findest du:

```
Project URL:       https://xyzabc123.supabase.co        <-- das ist deine SUPABASE_URL
anon public key:   eyJhbGciOiJIUzI1NiIs...langer-key   <-- das ist dein SUPABASE_ANON_KEY
```

**WICHTIG**: Kopiere beide Werte in eine Notiz — du brauchst sie in Schritt 4.

---

## Schritt 2: Datenbank einrichten

### 2.1 SQL-Schema ausfuhren
1. In Supabase: Klicke links auf **SQL Editor** (das Terminal-Icon)
2. Klicke **"New Query"**
3. Offne die Datei `supabase/migrations/001_initial_schema.sql` aus dem Repo
4. Kopiere den **gesamten Inhalt** und fuge ihn im SQL Editor ein
5. Klicke **"Run"** (oder Ctrl+Enter)
6. Du solltest sehen: `Success. No rows returned`

### 2.2 Prufen ob es geklappt hat
1. Klicke links auf **Table Editor** (das Tabellen-Icon)
2. Du solltest diese 7 Tabellen sehen:
   - `profiles`
   - `components`
   - `full_sites`
   - `tags` (mit 28 vorausgefullten Tags)
   - `component_tags`
   - `site_tags`
   - `likes`

Wenn du auf **tags** klickst, solltest du 28 Eintrage sehen (Button, Card, Loader, etc.).

---

## Schritt 3: GitHub OAuth App erstellen

### 3.1 OAuth App bei GitHub anlegen
1. Gehe zu **https://github.com/settings/developers**
2. Klicke auf **"OAuth Apps"** (linke Sidebar)
3. Klicke **"New OAuth App"**
4. Eingaben:

```
Application name:           Code Universum
Homepage URL:               https://beko2210.github.io/Code-Universum
Authorization callback URL: https://xyzabc123.supabase.co/auth/v1/callback
```

**WICHTIG**: Ersetze `xyzabc123` durch deine echte Supabase-Projekt-ID (aus der URL in Schritt 1.3).

5. Klicke **"Register application"**
6. Du siehst jetzt:
   - **Client ID**: `Iv1.abc123...` — kopieren!
7. Klicke **"Generate a new client secret"**
   - **Client Secret**: `secret_abc123...` — sofort kopieren! (Wird nur einmal angezeigt)

### 3.2 GitHub OAuth in Supabase aktivieren
1. In Supabase: Klicke links auf **Authentication** (das Schloss-Icon)
2. Klicke auf **Providers** (in der Sidebar)
3. Suche **GitHub** in der Liste und klicke drauf
4. Toggle **"GitHub enabled"** auf **AN**
5. Eingaben:

```
Client ID:          Iv1.abc123...        (aus Schritt 3.1)
Client Secret:      secret_abc123...     (aus Schritt 3.1)
```

6. Klicke **"Save"**

---

## Schritt 4: Storage-Bucket erstellen

### 4.1 Bucket fur ZIP-Uploads
1. In Supabase: Klicke links auf **Storage** (das Ordner-Icon)
2. Klicke **"New Bucket"**
3. Eingaben:

```
Name:                site-uploads
Public bucket:       NEIN (Toggle AUS lassen)
File size limit:     52428800         (= 50 MB)
Allowed MIME types:  application/zip
```

4. Klicke **"Create bucket"**

### 4.2 Storage-Policy erstellen
1. Klicke auf den Bucket **site-uploads**
2. Klicke oben auf **"Policies"**
3. Klicke **"New Policy"** → **"For full customization"**
4. Erstelle diese Policy:

```
Policy name:     Allow authenticated uploads
Allowed operation: INSERT
Target roles:    authenticated
WITH CHECK:      true
```

5. Klicke **"Save"**

Wiederhole fur eine Download-Policy:

```
Policy name:     Allow public downloads
Allowed operation: SELECT
Target roles:    public
USING:           true
```

---

## Schritt 5: GitHub Repository Secrets setzen

Das sind die Umgebungsvariablen, die GitHub Actions beim Bauen der Seite braucht.

### 5.1 Secrets hinzufugen
1. Gehe zu deinem Repo: **https://github.com/BEKO2210/Code-Universum**
2. Klicke auf **Settings** (Tab oben)
3. Links in der Sidebar: **Secrets and variables** → **Actions**
4. Klicke **"New repository secret"**

Erstelle diese 2 Secrets:

**Secret 1:**
```
Name:   NEXT_PUBLIC_SUPABASE_URL
Value:  https://xyzabc123.supabase.co
```
(Ersetze mit deiner echten URL aus Schritt 1.3)

**Secret 2:**
```
Name:   NEXT_PUBLIC_SUPABASE_ANON_KEY
Value:  eyJhbGciOiJIUzI1NiIs...dein-langer-key
```
(Ersetze mit deinem echten Key aus Schritt 1.3)

---

## Schritt 6: GitHub Pages aktivieren

### 6.1 Pages-Quelle einstellen
1. Gehe zu **Settings** → **Pages** (linke Sidebar)
2. Unter **"Source"**: Wahle **"GitHub Actions"**
3. Das wars — der Workflow in `.github/workflows/deploy.yml` macht den Rest

### 6.2 Ersten Deploy auslosen
Wenn du alles richtig gemacht hast, lauft der Deploy automatisch nach dem nachsten Push oder Merge auf `main`.

Falls du es manuell starten willst:
1. Gehe zum **Actions** Tab
2. Klicke links auf **"Deploy to GitHub Pages"**
3. Klicke **"Run workflow"** → Branch: `main` → **"Run workflow"**

---

## Schritt 7: Testen

### 7.1 Seite aufrufen
Gehe zu: **https://beko2210.github.io/Code-Universum/**

Du solltest die Homepage mit dem "Share Your UI with the World" Hero sehen.

### 7.2 Login testen
1. Klicke **"Sign In"**
2. Klicke **"Continue with GitHub"**
3. Autorisiere die App bei GitHub
4. Du wirst zuruckgeleitet und bist eingeloggt
5. Dein Profil (Avatar, Username) erscheint oben rechts

### 7.3 Component hochladen
1. Klicke auf **"Upload"** (oben im Header)
2. Gib einen Titel ein, z.B. "Neon Button"
3. Im HTML-Tab:
```html
<button class="neon-btn">Click Me</button>
```
4. Im CSS-Tab:
```css
.neon-btn {
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 600;
  color: #00f0ff;
  background: transparent;
  border: 2px solid #00f0ff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.neon-btn:hover {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
  background: rgba(0, 240, 255, 0.08);
}
```
5. Du siehst rechts die **Live Preview**
6. Wahle Tags aus (z.B. "Button", "Neon")
7. Klicke **"Publish Component"**
8. Fertig — der Component erscheint jetzt auf `/components`

---

## Kostenlose Limits (Supabase Free Tier)

| Ressource | Limit | Reicht fur |
|---|---|---|
| Datenbank | 500 MB | ~100.000 Components |
| Storage | 1 GB | ~200 ZIP-Uploads a 5 MB |
| Auth Users | 50.000 | Mehr als genug |
| API-Anfragen | Unbegrenzt | Kein Limit |
| Edge Functions | 500k Aufrufe/Monat | Mehr als genug |
| Bandbreite | 5 GB/Monat | ~50.000 Seitenaufrufe |
| GitHub Pages | 100 GB/Monat Bandbreite | Sehr viel |

**Wann wird es kostenpflichtig?**
- Supabase Pro: $25/Monat — brauchst du erst wenn du uber 500 MB DB oder 1 GB Storage kommst
- Realistische Einschatzung: Mit dem Free Tier kommst du locker durch die ersten paar tausend User

---

## Fehlerbehebung

### "Page couldn't load"
- Prufe ob die Secrets in GitHub korrekt gesetzt sind
- Gehe zu Actions Tab → letzter Build → prufesob er grun ist
- Falls rot: Klicke drauf und lies die Fehlermeldung

### Login funktioniert nicht
- Prufe ob die **Authorization callback URL** in der GitHub OAuth App korrekt ist
- Sie muss exakt so aussehen: `https://DEIN-PROJEKT.supabase.co/auth/v1/callback`
- Prufe ob GitHub als Provider in Supabase aktiviert ist

### Component wird nicht angezeigt
- Prufe in Supabase → Table Editor → `components` ob der Eintrag vorhanden ist
- Prufe ob `is_public` auf `true` steht
- Prufe ob die RLS Policies korrekt erstellt wurden (Schritt 2)

### Upload schlagt fehl
- Bist du eingeloggt?
- Prufe die Browser-Console (F12 → Console) fur Fehlermeldungen
- Prufe ob die Supabase-URL und der Key korrekt in den Secrets stehen

---

## Architektur-Ubersicht

```
Benutzer → GitHub Pages (Frontend)
               ↓
         Supabase Client SDK
               ↓
    ┌──────────┼──────────┐
    ↓          ↓          ↓
  Auth     PostgreSQL   Storage
 (GitHub    (Components,  (ZIP
  OAuth)     Tags, etc.)  Uploads)
```

Alles lauft client-seitig im Browser. Es gibt keinen eigenen Server.
Die einzige Backend-Infrastruktur ist Supabase (gehostet, kostenlos).
