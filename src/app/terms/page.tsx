import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Code Universum — the open-source UI component sharing platform.",
  alternates: { canonical: "https://beko2210.github.io/Code-Universum/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-6 sm:mb-8">Terms of Use</h1>

        <div className="prose-custom space-y-4 sm:space-y-6 text-sm text-[var(--cu-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--cu-text-primary)]">Last updated:</strong> March 28, 2026</p>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">1. Acceptance</h2>
            <p>By using Code Universum (&quot;the Platform&quot;), you agree to these Terms of Use. If you do not agree, please do not use the Platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">2. Description of Service</h2>
            <p>Code Universum is a free, open-source platform for sharing and discovering UI components and website projects. Users can upload HTML, CSS, JavaScript, Tailwind, and React code snippets as well as complete website projects as ZIP archives.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">3. User Accounts</h2>
            <p>You may create an account via GitHub OAuth. You are responsible for maintaining the security of your account. You must not share your access credentials with third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">4. Uploaded Content</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>You retain ownership of code you upload.</li>
              <li>By uploading, you grant Code Universum a non-exclusive license to display and distribute your content on the Platform.</li>
              <li>All uploaded components are shared under the <strong className="text-[var(--cu-text-primary)]">MIT License</strong> unless otherwise specified by the uploader.</li>
              <li>You must not upload copyrighted code without the owner&apos;s permission.</li>
              <li>You must not upload malicious code, malware, or content that could harm other users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">5. Prohibited Conduct</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Uploading malware, viruses, or exploit code.</li>
              <li>Attempting to compromise the Platform&apos;s infrastructure.</li>
              <li>Scraping or automated mass-downloading of content.</li>
              <li>Impersonating other users.</li>
              <li>Uploading content that violates applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">6. Liability</h2>
            <p>The Platform is provided &quot;as is&quot; without warranty. We are not liable for damages resulting from the use of uploaded code. Users are responsible for reviewing and testing any code they download or copy from the Platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">7. Termination</h2>
            <p>We reserve the right to suspend or delete accounts that violate these terms without prior notice.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">8. Changes</h2>
            <p>We may update these terms at any time. Continued use of the Platform after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">9. Contact</h2>
            <p>For questions about these terms, open an issue on our <a href="https://github.com/BEKO2210/Code-Universum" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">GitHub repository</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--cu-border)]">
          <Link href="/" className="text-sm text-[var(--cu-text-muted)] hover:text-[var(--cu-text-secondary)]">&larr; Back to Home</Link>
        </div>
      </main>
    </>
  );
}
