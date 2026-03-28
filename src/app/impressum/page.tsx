import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum (Legal Notice) for Code Universum per German TMG. Operated by Belkis Aslani, Freiberg am Neckar.",
  alternates: { canonical: "https://beko2210.github.io/Code-Universum/impressum" },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12" id="main-content">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-6 sm:mb-8">Impressum</h1>

        <div className="space-y-4 sm:space-y-6 text-sm text-[var(--cu-text-secondary)] leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
            <p>
              Belkis Aslani<br />
              Vogelsangstr. 32<br />
              71691 Freiberg am Neckar<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Kontakt</h2>
            <p>
              E-Mail: <a href="mailto:belkis.aslani@gmail.com" className="text-[var(--cu-neon-cyan)] hover:underline">belkis.aslani@gmail.com</a><br />
              Telefon: +49 176 81462526
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Verantwortlich f&uuml;r den Inhalt gem. &sect; 18 Abs. 2 MStV</h2>
            <p>
              Belkis Aslani<br />
              Vogelsangstr. 32<br />
              71691 Freiberg am Neckar
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">EU-Streitschlichtung</h2>
            <p>
              Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">
                ec.europa.eu/consumers/odr
              </a>.
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Haftung f&uuml;r Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs. 1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
            </p>
            <p className="mt-2">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Haftung f&uuml;r Links</h2>
            <p>
              Unser Angebot enth&auml;lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Urheberrecht</h2>
            <p>
              Der Quellcode der Plattform Code Universum ist unter der <strong className="text-[var(--cu-text-primary)]">MIT-Lizenz</strong> ver&ouml;ffentlicht. Von Nutzern hochgeladene Inhalte werden ebenfalls unter der MIT-Lizenz geteilt. Durch das Hochladen von Code auf diese Plattform erkl&auml;rt der Nutzer, dass er die Rechte an dem Code besitzt und der Ver&ouml;ffentlichung unter der MIT-Lizenz zustimmt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Lizenz</h2>
            <div className="glass-subtle p-4 font-mono text-xs text-[var(--cu-text-muted)]">
              <p>MIT License</p>
              <p className="mt-2">Copyright &copy; 2026 Belkis Aslani</p>
              <p className="mt-2">Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
              <p className="mt-2">The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
              <p className="mt-2">THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.</p>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-[var(--cu-border)]">
          <Link href="/" className="text-sm text-[var(--cu-text-muted)] hover:text-[var(--cu-text-secondary)]">&larr; Zur&uuml;ck zur Startseite</Link>
        </div>
      </main>
    </>
  );
}
