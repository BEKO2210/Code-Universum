import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum (Legal Notice) for Code Universum. MIT Licensed open-source project by Belkis Aslani.",
  alternates: { canonical: "https://beko2210.github.io/Code-Universum/impressum" },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-6 sm:mb-8">Impressum</h1>

        <div className="space-y-4 sm:space-y-6 text-sm text-[var(--cu-text-secondary)] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Angaben gem. &sect; 5 TMG</h2>
            <p>
              Code Universum<br />
              Open-Source-Projekt<br />
              Betrieben von: Belkis Aslani (BEKO2210)
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Kontakt</h2>
            <p>
              GitHub: <a href="https://github.com/BEKO2210" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">github.com/BEKO2210</a><br />
              Projekt: <a href="https://github.com/BEKO2210/Code-Universum" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">github.com/BEKO2210/Code-Universum</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Haftungsausschluss</h2>
            <h3 className="font-medium text-[var(--cu-text-primary)] mb-1">Haftung f&uuml;r Inhalte</h3>
            <p>Die Inhalte dieser Seite wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt. F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte k&ouml;nnen wir jedoch keine Gew&auml;hr &uuml;bernehmen. Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
          </section>

          <section>
            <h3 className="font-medium text-[var(--cu-text-primary)] mb-1">Haftung f&uuml;r Links</h3>
            <p>Unser Angebot enth&auml;lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen.</p>
          </section>

          <section>
            <h3 className="font-medium text-[var(--cu-text-primary)] mb-1">Urheberrecht</h3>
            <p>Der Quellcode der Plattform Code Universum ist unter der <strong className="text-[var(--cu-text-primary)]">MIT-Lizenz</strong> ver&ouml;ffentlicht. Von Nutzern hochgeladene Inhalte unterliegen den jeweiligen Lizenzbedingungen des Uploaders. Standardm&auml;&szlig;ig werden hochgeladene Komponenten unter der MIT-Lizenz geteilt.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">Lizenz</h2>
            <div className="glass-subtle p-4 font-mono text-xs text-[var(--cu-text-muted)]">
              <p>MIT License</p>
              <p className="mt-2">Copyright &copy; {new Date().getFullYear()} Belkis Aslani (BEKO2210)</p>
              <p className="mt-2">Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
              <p className="mt-2">The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
              <p className="mt-2">THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--cu-border)]">
          <Link href="/" className="text-sm text-[var(--cu-text-muted)] hover:text-[var(--cu-text-secondary)]">&larr; Back to Home</Link>
        </div>
      </main>
    </>
  );
}
