"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

// ============================================
// Real stats from database
// ============================================
function useStats() {
  const [stats, setStats] = useState({ components: 0, sites: 0, contributors: 0 });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const load = async () => {
      try {
        const supabase = createClient();
        const [compRes, siteRes, profileRes] = await Promise.all([
          supabase.from("components").select("id", { count: "exact", head: true }).eq("is_public", true),
          supabase.from("full_sites").select("id", { count: "exact", head: true }).eq("is_public", true),
          supabase.from("profiles").select("id", { count: "exact", head: true }),
        ]);
        setStats({
          components: compRes.count ?? 0,
          sites: siteRes.count ?? 0,
          contributors: profileRes.count ?? 0,
        });
      } catch {
        // DB not connected
      }
    };
    load();
  }, []);

  return stats;
}

// ============================================
// Animated showcase components per category
// Each is a real HTML/CSS component with animations
// ============================================
const SHOWCASE: {
  id: string;
  title: string;
  author: string;
  likes: number;
  category: string;
  css: string;
  html: string;
}[] = [
  {
    id: "neon-btn",
    title: "Neon Pulse Button",
    author: "CodeUniverse",
    likes: 342,
    category: "Button",
    css: `.btn{padding:14px 36px;font-size:14px;font-weight:600;color:#00f0ff;background:transparent;border:2px solid #00f0ff;border-radius:12px;cursor:pointer;font-family:system-ui;letter-spacing:.5px;position:relative;overflow:hidden;transition:all .3s}.btn:hover{background:rgba(0,240,255,.1);box-shadow:0 0 25px rgba(0,240,255,.4),0 0 60px rgba(0,240,255,.1);transform:translateY(-2px)}.btn::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent,rgba(0,240,255,.05),transparent);transform:rotate(45deg);animation:sweep 3s infinite}@keyframes sweep{0%{transform:translateX(-100%) rotate(45deg)}100%{transform:translateX(100%) rotate(45deg)}}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<button class="btn">Explore</button>`,
  },
  {
    id: "glass-card",
    title: "Glass Profile Card",
    author: "DesignLab",
    likes: 518,
    category: "Card",
    css: `.card{width:200px;padding:28px;background:rgba(255,255,255,.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:20px;text-align:center;color:#f0f0f5;font-family:system-ui;transition:all .4s}.card:hover{border-color:rgba(168,85,247,.4);transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.4)}.avatar{width:56px;height:56px;border-radius:50%;margin:0 auto 14px;background:linear-gradient(135deg,#00f0ff,#a855f7);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;color:#050510}.card h3{font-size:16px;margin:0 0 4px;font-weight:700}.card p{font-size:12px;color:#7b7b9a;margin:0 0 14px}.tag{display:inline-block;padding:4px 12px;font-size:10px;border-radius:50px;border:1px solid rgba(0,240,255,.3);color:#00f0ff}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<div class="card"><div class="avatar">JD</div><h3>Jane Doe</h3><p>UI Designer</p><span class="tag">Follow</span></div>`,
  },
  {
    id: "orbit-loader",
    title: "Orbit Spinner",
    author: "AnimateUI",
    likes: 267,
    category: "Loader",
    css: `.loader{position:relative;width:56px;height:56px}.ring{position:absolute;inset:0;border:3px solid transparent;border-top-color:#00f0ff;border-radius:50%;animation:spin 1.2s linear infinite}.r2{inset:8px;border-top-color:#a855f7;animation-duration:.8s;animation-direction:reverse}.r3{inset:16px;border-top-color:#ec4899;animation-duration:1.6s}.dot{position:absolute;top:50%;left:50%;width:6px;height:6px;background:#00f0ff;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px #00f0ff}@keyframes spin{to{transform:rotate(360deg)}}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<div class="loader"><div class="ring"></div><div class="ring r2"></div><div class="ring r3"></div><div class="dot"></div></div>`,
  },
  {
    id: "glow-toggle",
    title: "Glow Switch",
    author: "SwitchCraft",
    likes: 189,
    category: "Toggle",
    css: `.toggle{position:relative;width:56px;height:30px;display:inline-block}.toggle input{opacity:0;width:0;height:0}.sl{position:absolute;inset:0;background:#1a1a2e;border-radius:30px;cursor:pointer;transition:.3s;border:1px solid rgba(255,255,255,.08)}.sl:before{content:'';position:absolute;height:22px;width:22px;left:3px;bottom:3px;background:#444;border-radius:50%;transition:.3s}.toggle input:checked+.sl{background:rgba(0,240,255,.12);border-color:#00f0ff}.toggle input:checked+.sl:before{transform:translateX(26px);background:#00f0ff;box-shadow:0 0 14px rgba(0,240,255,.6)}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<label class="toggle"><input type="checkbox" checked /><span class="sl"></span></label>`,
  },
  {
    id: "float-input",
    title: "Floating Label",
    author: "FormCraft",
    likes: 231,
    category: "Input",
    css: `.group{position:relative;width:220px}.inp{width:100%;padding:14px 0 6px;font-size:14px;background:transparent;border:none;border-bottom:2px solid rgba(255,255,255,.1);color:#f0f0f5;outline:none;font-family:system-ui;transition:.3s}.lbl{position:absolute;left:0;top:14px;font-size:14px;color:#7b7b9a;pointer-events:none;transition:.3s;font-family:system-ui}.inp:focus~.lbl,.inp:not(:placeholder-shown)~.lbl{top:-6px;font-size:11px;color:#00f0ff}.inp:focus{border-bottom-color:#00f0ff}.line{position:absolute;bottom:0;left:50%;width:0;height:2px;background:#00f0ff;transition:.3s}.inp:focus~.line{left:0;width:100%}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<div class="group"><input type="text" class="inp" placeholder=" " /><label class="lbl">Email address</label><div class="line"></div></div>`,
  },
  {
    id: "nav-bar",
    title: "Glass Navbar",
    author: "NavUI",
    likes: 305,
    category: "Navigation",
    css: `.nav{display:flex;align-items:center;gap:24px;padding:12px 24px;background:rgba(255,255,255,.04);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.08);border-radius:16px;font-family:system-ui}.logo{font-weight:800;font-size:16px;color:#00f0ff;text-shadow:0 0 10px rgba(0,240,255,.3)}.link{font-size:13px;color:#7b7b9a;text-decoration:none;transition:.2s;padding:6px 0;position:relative}.link:hover{color:#f0f0f5}.link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:#00f0ff;transition:.3s}.link:hover::after{width:100%}.cta{font-size:12px;padding:8px 18px;background:transparent;border:1px solid #00f0ff;color:#00f0ff;border-radius:8px;cursor:pointer;transition:.2s;font-family:system-ui}.cta:hover{background:rgba(0,240,255,.1);box-shadow:0 0 15px rgba(0,240,255,.2)}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<nav class="nav"><span class="logo">CU</span><a class="link" href="#">Home</a><a class="link" href="#">Browse</a><a class="link" href="#">Upload</a><button class="cta">Sign In</button></nav>`,
  },
  {
    id: "modal-dialog",
    title: "Confirm Modal",
    author: "DialogUI",
    likes: 198,
    category: "Modal",
    css: `.modal{width:260px;padding:28px;background:rgba(10,10,26,.95);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:20px;color:#f0f0f5;font-family:system-ui;text-align:center;animation:pop .3s ease}.modal h3{font-size:16px;margin:0 0 8px;font-weight:700}.modal p{font-size:12px;color:#7b7b9a;margin:0 0 20px;line-height:1.5}.btns{display:flex;gap:10px;justify-content:center}.b{padding:10px 24px;border-radius:10px;font-size:12px;font-weight:600;border:none;cursor:pointer;font-family:system-ui;transition:.2s}.cancel{background:rgba(255,255,255,.06);color:#7b7b9a}.cancel:hover{background:rgba(255,255,255,.1)}.confirm{background:#00f0ff;color:#050510}.confirm:hover{box-shadow:0 0 20px rgba(0,240,255,.3)}@keyframes pop{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<div class="modal"><h3>Delete Component?</h3><p>This action cannot be undone. The component will be permanently removed.</p><div class="btns"><button class="b cancel">Cancel</button><button class="b confirm">Delete</button></div></div>`,
  },
  {
    id: "bounce-check",
    title: "Bouncy Checkbox",
    author: "CheckUI",
    likes: 274,
    category: "Checkbox",
    css: `.cb{display:flex;align-items:center;gap:10px;cursor:pointer;font-family:system-ui;color:#f0f0f5;font-size:14px;user-select:none}.cb input{display:none}.mark{width:24px;height:24px;border-radius:8px;border:2px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;transition:.2s;background:transparent;flex-shrink:0}.mark svg{width:14px;height:14px;color:transparent;transition:.2s}.cb input:checked~.mark{background:#00f0ff;border-color:#00f0ff;animation:bounce .3s;box-shadow:0 0 12px rgba(0,240,255,.3)}.cb input:checked~.mark svg{color:#0a0a1a}@keyframes bounce{0%{transform:scale(1)}50%{transform:scale(1.25)}100%{transform:scale(1)}}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<label class="cb"><input type="checkbox" checked /><span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 13l4 4L19 7"/></svg></span>Accept terms</label>`,
  },
  {
    id: "tooltip-hover",
    title: "Neon Tooltip",
    author: "TipUI",
    likes: 143,
    category: "Tooltip",
    css: `.wrap{position:relative;display:inline-block}.trigger{padding:10px 24px;font-size:13px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#f0f0f5;border-radius:10px;cursor:pointer;font-family:system-ui;transition:.2s}.trigger:hover{border-color:rgba(0,240,255,.3)}.tip{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) translateY(4px);padding:8px 16px;background:rgba(0,240,255,.1);border:1px solid rgba(0,240,255,.3);border-radius:8px;font-size:11px;color:#00f0ff;white-space:nowrap;opacity:0;pointer-events:none;transition:.2s;font-family:system-ui}.tip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:rgba(0,240,255,.3)}.wrap:hover .tip{opacity:1;transform:translateX(-50%) translateY(0)}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<div class="wrap"><div class="tip">Click to copy code</div><button class="trigger">Hover me</button></div>`,
  },
  {
    id: "pricing-card",
    title: "Pricing Tier",
    author: "PriceUI",
    likes: 412,
    category: "Pricing",
    css: `.price{width:220px;padding:28px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;font-family:system-ui;color:#f0f0f5;text-align:center;transition:.3s}.price:hover{border-color:rgba(0,240,255,.3);transform:translateY(-4px)}.badge{display:inline-block;padding:4px 14px;font-size:10px;font-weight:700;background:linear-gradient(135deg,#00f0ff,#a855f7);color:#050510;border-radius:50px;margin-bottom:16px;letter-spacing:.5px}.amount{font-size:36px;font-weight:800;margin:0 0 4px}.amount span{font-size:14px;font-weight:400;color:#7b7b9a}.desc{font-size:12px;color:#7b7b9a;margin:0 0 20px}.features{list-style:none;padding:0;margin:0 0 20px;text-align:left}.features li{font-size:12px;color:#7b7b9a;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04)}.features li::before{content:'\\2713';margin-right:8px;color:#00f0ff;font-weight:700}.btn{width:100%;padding:12px;background:transparent;border:1px solid #00f0ff;color:#00f0ff;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:.2s;font-family:system-ui}.btn:hover{background:rgba(0,240,255,.08);box-shadow:0 0 15px rgba(0,240,255,.2)}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<div class="price"><div class="badge">PRO</div><div class="amount">$29<span>/mo</span></div><p class="desc">For growing teams</p><ul class="features"><li>Unlimited uploads</li><li>Priority support</li><li>Custom branding</li></ul><button class="btn">Get Started</button></div>`,
  },
  {
    id: "shimmer-skeleton",
    title: "Shimmer Skeleton",
    author: "LoaderPro",
    likes: 198,
    category: "Loader",
    css: `.skel{display:flex;gap:14px;padding:20px;width:260px;background:rgba(255,255,255,.03);border-radius:16px;border:1px solid rgba(255,255,255,.05)}.skel-av{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.06);flex-shrink:0;animation:shimmer 1.5s infinite}.skel-body{flex:1;display:flex;flex-direction:column;gap:10px;justify-content:center}.skel-line{height:10px;border-radius:6px;background:rgba(255,255,255,.06);animation:shimmer 1.5s infinite}.w80{width:80%}.w60{width:60%;animation-delay:.15s}.w40{width:40%;animation-delay:.3s}@keyframes shimmer{0%,100%{opacity:.3}50%{opacity:.8}}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<div class="skel"><div class="skel-av"></div><div class="skel-body"><div class="skel-line w80"></div><div class="skel-line w60"></div><div class="skel-line w40"></div></div></div>`,
  },
  {
    id: "gradient-btn",
    title: "Gradient CTA",
    author: "BtnMaster",
    likes: 356,
    category: "Button",
    css: `.gbtn{padding:14px 36px;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#00f0ff,#a855f7);border:none;border-radius:12px;cursor:pointer;font-family:system-ui;letter-spacing:.5px;position:relative;overflow:hidden;transition:.3s;box-shadow:0 4px 20px rgba(0,240,255,.2)}.gbtn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,240,255,.3)}.gbtn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:.5s}.gbtn:hover::before{left:100%}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0}`,
    html: `<button class="gbtn">Get Started</button>`,
  },
];

// ============================================
// Background
// ============================================
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}

// ============================================
// Showcase Card with live preview
// ============================================
function ShowcaseCard({ item, index }: { item: (typeof SHOWCASE)[number]; index: number }) {
  const srcdoc = `<!DOCTYPE html><html><head><style>${item.css}</style></head><body>${item.html}</body></html>`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group relative glass overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
        <div className="relative h-44 sm:h-48 overflow-hidden border-b border-[var(--cu-border)]">
          <iframe
            srcDoc={srcdoc}
            sandbox="allow-scripts"
            className="w-full h-full border-0 pointer-events-none"
            title={item.title}
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--cu-bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
            <span className="px-4 py-1.5 text-xs font-medium text-[var(--cu-neon-cyan)] border border-[var(--cu-neon-cyan)] rounded-full bg-[rgba(0,240,255,0.05)] backdrop-blur-sm">
              Get Code
            </span>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate">{item.title}</h3>
            <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              {item.likes}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--cu-text-secondary)]">by {item.author}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--cu-border)] text-[var(--cu-text-muted)]">{item.category}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Main Page
// ============================================
export default function Home() {
  const stats = useStats();

  return (
    <div className="min-h-screen bg-[var(--cu-bg-primary)] relative">
      <BackgroundOrbs />
      <Header />

      <div className="relative z-10" id="main-content">
        {/* ======== HERO (CSS animations for LCP) ======== */}
        <section className="relative pt-12 pb-10 sm:pt-28 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--cu-border)] text-xs text-[var(--cu-text-secondary)] mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cu-neon-green)] animate-pulse" aria-hidden="true" />
                Open Source &middot; MIT Licensed &middot; Free Forever
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[var(--cu-neon-cyan)] via-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] bg-clip-text text-transparent">
                  Share Your
                </span>
                <br />
                <span className="text-[var(--cu-text-primary)]">UI with the</span>
                <br />
                <span className="text-[var(--cu-text-primary)]">World</span>
              </h1>

              <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[var(--cu-text-secondary)] leading-relaxed mb-6 sm:mb-10 px-2">
                Upload UI components and full websites. Preview them live in the browser.
                Copy the code with a single click. Every upload is open source.
              </p>
            </div>

            {/* Professional CTA Buttons */}
            <div className="animate-fade-in-up animate-delay-100 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
              <Link
                href="/components"
                className="inline-flex items-center gap-3 h-14 px-8 w-full sm:w-auto justify-center rounded-2xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,200,255,0.9)] text-[#050510] font-semibold text-sm transition-all hover:shadow-[var(--cu-glow-cyan)] hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Browse Components
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/upload/component"
                className="inline-flex items-center gap-3 h-14 px-8 w-full sm:w-auto justify-center rounded-2xl border border-[var(--cu-border)] text-[var(--cu-text-secondary)] font-medium text-sm transition-all hover:border-[var(--cu-neon-purple)] hover:text-[var(--cu-neon-purple)] hover:shadow-[var(--cu-glow-purple)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Your Code
              </Link>
            </div>

            <p className="animate-fade-in animate-delay-300 text-xs text-[var(--cu-text-muted)]">
              Buttons, Cards, Loaders, Inputs, Toggles, Navigation, Modals, Pricing and more
            </p>
          </div>
        </section>

        {/* ======== STATS ======== */}
        <section className="px-4 sm:px-6 pb-10 sm:pb-16">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {[
              { label: "Components", value: stats.components, accent: "var(--cu-neon-cyan)" },
              { label: "Full Sites", value: stats.sites, accent: "var(--cu-neon-purple)" },
              { label: "Contributors", value: stats.contributors, accent: "var(--cu-neon-pink)" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-subtle p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: stat.accent }}>
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--cu-text-muted)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ======== SHOWCASE GRID ======== */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--cu-text-primary)]">
                  Explore Components
                </h2>
                <p className="text-xs sm:text-sm text-[var(--cu-text-muted)] mt-1">
                  Buttons, cards, loaders, inputs, toggles, modals and more
                </p>
              </div>
              <Link
                href="/components"
                className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-neon-cyan)] transition-colors hidden sm:flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {SHOWCASE.map((item, i) => (
                <ShowcaseCard key={item.id} item={item} index={i} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/components"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-[var(--cu-border)] text-sm text-[var(--cu-text-secondary)] hover:border-[var(--cu-neon-cyan)] hover:text-[var(--cu-neon-cyan)] transition-all"
              >
                View All Components
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ======== FOOTER ======== */}
        <footer className="border-t border-[var(--cu-border)] px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-sm text-[var(--cu-text-muted)]">
              <span className="neon-text-cyan font-bold">Code</span>{" "}
              <span className="text-[var(--cu-text-primary)] font-bold">Universum</span>
              <span className="ml-2">&copy; {new Date().getFullYear()} Belkis Aslani &middot; MIT Licensed</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[var(--cu-text-muted)]">
              <Link href="/components" className="hover:text-[var(--cu-text-secondary)] transition-colors">Components</Link>
              <Link href="/sites" className="hover:text-[var(--cu-text-secondary)] transition-colors">Sites</Link>
              <Link href="/terms" className="hover:text-[var(--cu-text-secondary)] transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-[var(--cu-text-secondary)] transition-colors">Privacy</Link>
              <Link href="/impressum" className="hover:text-[var(--cu-text-secondary)] transition-colors">Impressum</Link>
              <a href="https://github.com/BEKO2210/Code-Universum" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--cu-text-secondary)] transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
