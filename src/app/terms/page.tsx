import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Terms of Use / Nutzungsbedingungen",
  description: "Terms of Use for Code Universum. All uploaded code must be open source under the MIT License.",
  alternates: { canonical: "https://beko2210.github.io/Code-Universum/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12" id="main-content">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-6 sm:mb-8">
          Nutzungsbedingungen / Terms of Use
        </h1>

        <div className="prose-custom space-y-4 sm:space-y-6 text-sm text-[var(--cu-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--cu-text-primary)]">Stand:</strong> 28. M&auml;rz 2026</p>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">1. Geltungsbereich</h2>
            <p>
              Diese Nutzungsbedingungen gelten f&uuml;r die Nutzung der Plattform Code Universum (&quot;die Plattform&quot;), betrieben von Belkis Aslani, Vogelsangstr. 32, 71691 Freiberg am Neckar, Deutschland. Durch die Nutzung der Plattform stimmen Sie diesen Bedingungen zu.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">2. Leistungsbeschreibung</h2>
            <p>
              Code Universum ist eine kostenlose, quelloffene Plattform zum Teilen und Entdecken von UI-Komponenten und Website-Projekten. Nutzer k&ouml;nnen HTML-, CSS-, JavaScript-, Tailwind- und React-Code-Snippets sowie komplette Website-Projekte als ZIP-Archive hochladen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">3. Benutzerkonten</h2>
            <p>
              Die Registrierung erfolgt &uuml;ber GitHub OAuth. Sie sind f&uuml;r die Sicherheit Ihres Kontos verantwortlich. Die Weitergabe Ihrer Zugangsdaten an Dritte ist nicht gestattet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">4. Open-Source-Pflicht f&uuml;r hochgeladene Inhalte</h2>
            <div className="glass-subtle p-4 rounded-xl">
              <p className="text-[var(--cu-text-primary)] font-medium mb-2">
                Alle auf Code Universum hochgeladenen Inhalte m&uuml;ssen Open Source sein.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Sie behalten das Urheberrecht an Ihrem Code.</li>
                <li>Durch das Hochladen r&auml;umen Sie Code Universum und allen Nutzern eine unwiderrufliche Lizenz ein, den Code gem&auml;&szlig; der <strong className="text-[var(--cu-text-primary)]">MIT-Lizenz</strong> zu nutzen, zu kopieren, zu ver&auml;ndern und weiterzuverbreiten.</li>
                <li>Sie d&uuml;rfen nur Code hochladen, an dem Sie die Rechte besitzen oder der bereits unter einer kompatiblen Open-Source-Lizenz steht.</li>
                <li>Das Hochladen von urheberrechtlich gesch&uuml;tztem Code Dritter ohne deren Genehmigung ist untersagt.</li>
                <li>Das Hochladen von Schadcode, Malware oder Inhalten, die anderen Nutzern schaden k&ouml;nnten, ist verboten.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">5. Verbotene Handlungen</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Hochladen von Malware, Viren oder Exploit-Code.</li>
              <li>Versuche, die Infrastruktur der Plattform zu kompromittieren.</li>
              <li>Automatisiertes Scraping oder Massendownload von Inhalten.</li>
              <li>Identit&auml;tsdiebstahl oder Ausgeben als andere Nutzer.</li>
              <li>Hochladen von Inhalten, die gegen geltendes Recht versto&szlig;en.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">6. Haftungsausschluss</h2>
            <p>
              Die Plattform wird &quot;wie besehen&quot; ohne Gew&auml;hrleistung bereitgestellt. Wir haften nicht f&uuml;r Sch&auml;den, die aus der Nutzung hochgeladenen Codes entstehen. Nutzer sind f&uuml;r die &Uuml;berpr&uuml;fung und das Testen von Code verantwortlich, den sie von der Plattform kopieren oder herunterladen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">7. Kontosperrung und K&uuml;ndigung</h2>
            <p>
              Wir behalten uns das Recht vor, Konten, die gegen diese Bedingungen versto&szlig;en, ohne Vorank&uuml;ndigung zu sperren oder zu l&ouml;schen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">8. &Auml;nderungen</h2>
            <p>
              Wir k&ouml;nnen diese Nutzungsbedingungen jederzeit &auml;ndern. Die fortgesetzte Nutzung der Plattform nach &Auml;nderungen gilt als Zustimmung zu den neuen Bedingungen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">9. Anwendbares Recht</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zul&auml;ssig, Freiberg am Neckar.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">10. Kontakt</h2>
            <p>
              Bei Fragen zu diesen Nutzungsbedingungen wenden Sie sich an:<br />
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
