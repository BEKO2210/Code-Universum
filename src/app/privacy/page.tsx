import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Privacy Policy / Datenschutzerkl\u00e4rung",
  description: "Privacy Policy for Code Universum. DSGVO/GDPR-compliant. Essential cookies only, no tracking.",
  alternates: { canonical: "https://beko2210.github.io/Code-Universum/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12" id="main-content">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-6 sm:mb-8">
          Datenschutzerkl&auml;rung / Privacy Policy
        </h1>

        <div className="space-y-4 sm:space-y-6 text-sm text-[var(--cu-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--cu-text-primary)]">Stand:</strong> 28. M&auml;rz 2026</p>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">1. Verantwortlicher</h2>
            <p>
              Belkis Aslani<br />
              Vogelsangstr. 32<br />
              71691 Freiberg am Neckar<br />
              Deutschland<br />
              E-Mail: <a href="mailto:belkis.aslani@gmail.com" className="text-[var(--cu-neon-cyan)] hover:underline">belkis.aslani@gmail.com</a><br />
              Telefon: +49 176 81462526
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">2. Welche Daten wir erheben</h2>
            <p>Bei der Anmeldung &uuml;ber GitHub OAuth erhalten und speichern wir:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-[var(--cu-text-primary)]">GitHub-Benutzername</strong> und Anzeigename</li>
              <li><strong className="text-[var(--cu-text-primary)]">E-Mail-Adresse</strong> (von Ihrem GitHub-Konto)</li>
              <li><strong className="text-[var(--cu-text-primary)]">Profilbild-URL</strong></li>
            </ul>
            <p className="mt-2">Beim Hochladen von Komponenten oder Webseiten speichern wir den von Ihnen bereitgestellten Code und die Metadaten.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">3. Rechtsgrundlage (Art. 6 DSGVO)</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-[var(--cu-text-primary)]">Art. 6 Abs. 1 lit. a DSGVO</strong> — Einwilligung bei der Anmeldung &uuml;ber GitHub OAuth.</li>
              <li><strong className="text-[var(--cu-text-primary)]">Art. 6 Abs. 1 lit. b DSGVO</strong> — Vertragserf&uuml;llung (Bereitstellung der Plattformfunktionen).</li>
              <li><strong className="text-[var(--cu-text-primary)]">Art. 6 Abs. 1 lit. f DSGVO</strong> — Berechtigtes Interesse (Sicherheit, Missbrauchspr&auml;vention).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">4. Zweck der Datenverarbeitung</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Anzeige Ihres Profils und Ihrer hochgeladenen Inhalte auf der Plattform.</li>
              <li>Authentifizierung und Sitzungsverwaltung.</li>
              <li>Anzeige Ihres Benutzernamens und Profilbilds neben Ihren Uploads.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">5. Datenspeicherung</h2>
            <p>
              Alle Daten werden bei <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">Supabase</a> (PostgreSQL-Datenbank und Dateispeicher) gespeichert. Supabase verarbeitet Daten DSGVO-konform. Daten werden im Ruhezustand und bei der &Uuml;bertragung verschl&uuml;sselt. Serverstandort: EU (Frankfurt).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">6. Cookies</h2>
            <p>
              Wir verwenden ausschlie&szlig;lich <strong className="text-[var(--cu-text-primary)]">technisch notwendige Cookies</strong> f&uuml;r die Authentifizierung. Wir setzen <strong className="text-[var(--cu-text-primary)]">keine</strong> Tracking-Cookies, Analyse-Cookies oder Werbe-Cookies ein.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">7. Auftragsverarbeiter / Drittanbieter</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-[var(--cu-text-primary)]">GitHub (Microsoft)</strong> — Authentifizierung (OAuth), Hosting (GitHub Pages). Datenschutzerkl&auml;rung: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">GitHub Privacy</a></li>
              <li><strong className="text-[var(--cu-text-primary)]">Supabase Inc.</strong> — Datenbank und Dateispeicher. Datenschutzerkl&auml;rung: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">Supabase Privacy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">8. Ihre Rechte (Art. 15-21 DSGVO)</h2>
            <p>Sie haben das Recht auf:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-[var(--cu-text-primary)]">Auskunft</strong> &uuml;ber Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO).</li>
              <li><strong className="text-[var(--cu-text-primary)]">Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO).</li>
              <li><strong className="text-[var(--cu-text-primary)]">L&ouml;schung</strong> Ihrer Daten (Art. 17 DSGVO).</li>
              <li><strong className="text-[var(--cu-text-primary)]">Einschr&auml;nkung</strong> der Verarbeitung (Art. 18 DSGVO).</li>
              <li><strong className="text-[var(--cu-text-primary)]">Daten&uuml;bertragbarkeit</strong> (Art. 20 DSGVO).</li>
              <li><strong className="text-[var(--cu-text-primary)]">Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO).</li>
              <li><strong className="text-[var(--cu-text-primary)]">Widerruf</strong> der Einwilligung jederzeit durch L&ouml;schung Ihres Kontos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">9. L&ouml;schung Ihrer Daten</h2>
            <p>
              Sie k&ouml;nnen die L&ouml;schung Ihres Kontos und aller damit verbundenen Daten per E-Mail an{" "}
              <a href="mailto:belkis.aslani@gmail.com" className="text-[var(--cu-neon-cyan)] hover:underline">belkis.aslani@gmail.com</a>{" "}
              anfordern. Alle Ihre hochgeladenen Komponenten, Webseiten und Profildaten werden dann dauerhaft entfernt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">10. Beschwerderecht bei einer Aufsichtsbeh&ouml;rde</h2>
            <p>
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verst&ouml;&szlig;t, haben Sie das Recht, sich bei einer Aufsichtsbeh&ouml;rde zu beschweren. Zust&auml;ndige Aufsichtsbeh&ouml;rde:
            </p>
            <p className="mt-2">
              Der Landesbeauftragte f&uuml;r den Datenschutz und die Informationsfreiheit Baden-W&uuml;rttemberg<br />
              Lautenschlagerstra&szlig;e 20, 70173 Stuttgart<br />
              <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">www.baden-wuerttemberg.datenschutz.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">11. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br />
              Belkis Aslani — <a href="mailto:belkis.aslani@gmail.com" className="text-[var(--cu-neon-cyan)] hover:underline">belkis.aslani@gmail.com</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-[var(--cu-border)]">
          <Link href="/" className="text-sm text-[var(--cu-text-muted)] hover:text-[var(--cu-text-secondary)]">&larr; Zur&uuml;ck zur Startseite</Link>
        </div>
      </main>
    </>
  );
}
