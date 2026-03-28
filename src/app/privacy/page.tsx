import Link from "next/link";
import { Header } from "@/components/layout/header";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-6 sm:mb-8">Privacy Policy</h1>

        <div className="space-y-4 sm:space-y-6 text-sm text-[var(--cu-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--cu-text-primary)]">Last updated:</strong> March 28, 2026</p>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">1. Data Controller</h2>
            <p>Code Universum is an open-source project. The source code is hosted on GitHub at <a href="https://github.com/BEKO2210/Code-Universum" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">github.com/BEKO2210/Code-Universum</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">2. Data We Collect</h2>
            <p>When you sign in via GitHub OAuth, we receive and store:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-[var(--cu-text-primary)]">GitHub username</strong> and display name</li>
              <li><strong className="text-[var(--cu-text-primary)]">Email address</strong> (from your GitHub account)</li>
              <li><strong className="text-[var(--cu-text-primary)]">Profile picture URL</strong></li>
            </ul>
            <p className="mt-2">When you upload components or sites, we store the code and metadata you provide.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">3. How We Use Data</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To display your profile and uploaded content on the Platform.</li>
              <li>To authenticate you and manage your session.</li>
              <li>To show your username and avatar alongside your uploads.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">4. Data Storage</h2>
            <p>All data is stored in <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">Supabase</a> (PostgreSQL database and file storage). Supabase processes data in compliance with GDPR. Data is encrypted at rest and in transit.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">5. Cookies</h2>
            <p>We use essential cookies only — for authentication sessions. We do not use tracking cookies, analytics, or third-party advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">6. Third-Party Services</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-[var(--cu-text-primary)]">GitHub</strong> — for authentication (OAuth).</li>
              <li><strong className="text-[var(--cu-text-primary)]">Supabase</strong> — for database and file storage.</li>
              <li><strong className="text-[var(--cu-text-primary)]">GitHub Pages</strong> — for hosting the frontend.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">7. Your Rights (GDPR)</h2>
            <p>If you are located in the EU, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Access the personal data we store about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Export your data in a portable format.</li>
              <li>Withdraw consent at any time by deleting your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">8. Data Deletion</h2>
            <p>You can delete your account and all associated data by contacting us via GitHub Issues. Upon deletion, all your uploaded components, sites, and profile data will be permanently removed.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-3">9. Contact</h2>
            <p>For privacy-related inquiries, open an issue on our <a href="https://github.com/BEKO2210/Code-Universum/issues" target="_blank" rel="noopener noreferrer" className="text-[var(--cu-neon-cyan)] hover:underline">GitHub repository</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--cu-border)]">
          <Link href="/" className="text-sm text-[var(--cu-text-muted)] hover:text-[var(--cu-text-secondary)]">&larr; Back to Home</Link>
        </div>
      </main>
    </>
  );
}
