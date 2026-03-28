export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center min-h-screen bg-mesh">
      <div className="glass p-8 w-full max-w-sm flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold neon-text-cyan">Sign In</h1>
        <p className="text-sm text-[var(--cu-text-secondary)] text-center">
          Sign in with your GitHub account to upload and share components.
        </p>
        <button className="w-full h-12 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] font-medium hover:shadow-[var(--cu-glow-cyan)] hover:bg-[rgba(0,240,255,0.05)] transition-all duration-300">
          Continue with GitHub
        </button>
      </div>
    </main>
  );
}
