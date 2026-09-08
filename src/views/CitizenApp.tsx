import React, { useState } from "react";
import { DEMO_CHALLENGE, CHALLENGES, TIMELINE_STEPS } from "../data/demo";
import { StatusBadge, AIBadge, DistrictBadge, MobileBottomNav, Timeline } from "../components/ui";

type Screen =
  | "splash" | "language" | "login" | "otp" | "onboarding"
  | "home" | "report" | "form1" | "form2" | "location" | "media" | "impact" | "review" | "success"
  | "my-challenges" | "challenge-detail" | "timeline"
  | "community" | "search" | "notifications" | "feedback" | "impact-rewards" | "profile" | "settings";

export default function CitizenApp({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [formData, setFormData] = useState({ title: "", category: "", description: "", location: "" });
  const [otpVal, setOtpVal] = useState(["", "", "", "", "", ""]);
  const [langSelected, setLangSelected] = useState("");

  const go = (s: Screen) => setScreen(s);

  const navTabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "challenges", label: "My Cases", icon: "📋" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "notifications", label: "Alerts", icon: "🔔" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const handleTabSelect = (id: string) => {
    setActiveTab(id);
    if (id === "home") go("home");
    else if (id === "challenges") go("my-challenges");
    else if (id === "community") go("community");
    else if (id === "notifications") go("notifications");
    else if (id === "profile") go("profile");
  };

  // Mobile frame wrapper
  const Frame = ({ children, hideNav = false }: { children: React.ReactNode; hideNav?: boolean }) => (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto">{children}</div>
      {!hideNav && <MobileBottomNav tabs={navTabs} active={activeTab} onSelect={handleTabSelect} />}
    </div>
  );

  // ── SPLASH ────────────────────────────────────────────────────────────────
  if (screen === "splash") {
    setTimeout(() => go("language"), 2000);
    return (
      <Frame hideNav>
        <div className="h-full flex flex-col items-center justify-center gap-4" style={{ background: "#0d1526" }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-2" style={{ background: "#e06000" }}>🌱</div>
          <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif', serif" }}>JanSamadhan</div>
          <div className="text-sm text-slate-400">Innovation Portal</div>
          <div className="mt-8 text-xs text-slate-500 font-mono">Govt. of Jharkhand — DHTE</div>
          <div className="mt-4">
            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-2/3 rounded-full animate-pulse" style={{ background: "#e06000" }} />
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  // ── LANGUAGE ──────────────────────────────────────────────────────────────
  if (screen === "language") {
    const langs = ["English", "हिन्दी", "संथाली", "मुण्डारी", "हो", "कुड़ुख"];
    return (
      <Frame hideNav>
        <div className="flex flex-col h-full" style={{ background: "#0d1526" }}>
          <div className="p-6 pt-12">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6" style={{ background: "#e06000" }}>🌱</div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Select Language</h1>
            <p className="text-slate-400 text-sm">अपनी भाषा चुनें</p>
          </div>
          <div className="px-6 flex flex-col gap-3">
            {langs.map(l => (
              <button
                key={l}
                onClick={() => { setLangSelected(l); go("login"); }}
                className={`w-full py-3 px-4 rounded-xl text-left font-medium text-base transition-all border ${langSelected === l ? "border-orange-500 text-white" : "border-white/10 text-slate-300 hover:border-white/25"}`}
                style={{ background: langSelected === l ? "rgba(224,96,0,0.2)" : "rgba(255,255,255,0.04)" }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  if (screen === "login") {
    return (
      <Frame hideNav>
        <div className="flex flex-col" style={{ background: "#0d1526", minHeight: "100%" }}>
          <div className="p-6 pt-10">
            <button onClick={onBack} className="text-slate-400 text-sm mb-6">← Back</button>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Welcome Back</h1>
            <p className="text-slate-400 text-sm mb-8">Enter your mobile number to continue</p>
            <div className="mb-4">
              <label className="text-xs text-slate-400 mb-2 block font-mono">MOBILE NUMBER</label>
              <div className="flex gap-2">
                <div className="px-3 py-3 rounded-xl text-slate-300 text-sm border border-white/10 font-mono" style={{ background: "rgba(255,255,255,0.05)" }}>+91</div>
                <input defaultValue="98765 43210" className="flex-1 px-4 py-3 rounded-xl text-white text-sm border border-white/10 outline-none focus:border-orange-500/50" style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-slate-400 mb-2 block font-mono">OR LOGIN WITH</label>
              <div className="flex gap-2">
                {["DigiLocker", "Aadhaar", "eKYC"].map(m => (
                  <button key={m} className="flex-1 py-2 rounded-xl text-xs font-medium text-slate-300 border border-white/10 hover:border-white/25 transition-colors" style={{ background: "rgba(255,255,255,0.04)" }}>{m}</button>
                ))}
              </div>
            </div>
            <button onClick={() => go("otp")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm mt-4" style={{ background: "#e06000" }}>
              Send OTP
            </button>
          </div>
          <div className="px-6 mt-4 text-center text-xs text-slate-500">
            New user? <button onClick={() => go("onboarding")} className="text-orange-400">Register here</button>
          </div>
        </div>
      </Frame>
    );
  }

  // ── OTP ───────────────────────────────────────────────────────────────────
  if (screen === "otp") {
    return (
      <Frame hideNav>
        <div className="flex flex-col p-6 pt-10" style={{ background: "#0d1526", minHeight: "100%" }}>
          <button onClick={() => go("login")} className="text-slate-400 text-sm mb-6">← Back</button>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Verify OTP</h1>
          <p className="text-slate-400 text-sm mb-8">Sent to +91 98765 43210</p>
          <div className="flex gap-3 justify-center mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-10 h-12 rounded-xl border flex items-center justify-center text-xl font-bold text-white font-mono" style={{ background: "rgba(255,255,255,0.05)", borderColor: i < 4 ? "#e06000" : "rgba(255,255,255,0.1)" }}>
                {["4", "2", "8", "1", "", ""][i]}
              </div>
            ))}
          </div>
          <button onClick={() => go("home")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
            Verify & Continue
          </button>
          <button className="mt-3 text-center text-xs text-orange-400">Resend OTP (28s)</button>
        </div>
      </Frame>
    );
  }

  // ── ONBOARDING ────────────────────────────────────────────────────────────
  if (screen === "onboarding") {
    return (
      <Frame hideNav>
        <div className="flex flex-col p-6" style={{ background: "#0d1526", minHeight: "100%" }}>
          <div className="flex items-center justify-between mb-8 pt-4">
            <button onClick={() => go("login")} className="text-slate-400 text-sm">← Back</button>
            <div className="flex gap-1.5">{[1,2,3].map(i => <div key={i} className="w-6 h-1 rounded-full" style={{ background: i === 1 ? "#e06000" : "rgba(255,255,255,0.1)" }} />)}</div>
          </div>
          <div className="flex-1">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6" style={{ background: "rgba(224,96,0,0.15)" }}>📍</div>
            <h2 className="text-xl font-bold text-white mb-2">Your Location</h2>
            <p className="text-slate-400 text-sm mb-6">We'll show you challenges from your area and help you report accurately.</p>
            <div className="space-y-3">
              {[{ l: "State", v: "Jharkhand" }, { l: "District", v: "Khunti" }, { l: "Block", v: "Torpa" }].map(f => (
                <div key={f.l}>
                  <label className="text-xs text-slate-400 font-mono block mb-1">{f.l.toUpperCase()}</label>
                  <div className="px-4 py-3 rounded-xl text-slate-200 text-sm border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>{f.v} ▼</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => go("home")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm mt-8" style={{ background: "#e06000" }}>
            Continue
          </button>
        </div>
      </Frame>
    );
  }

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <Frame>
        <div>
          {/* Header */}
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-slate-400 font-mono">NAMASTE 🙏</div>
                <div className="text-base font-bold text-white">Ramesh Kumar Oraon</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => go("notifications")} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <span className="text-sm relative">🔔<span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 flex items-center justify-center text-white text-[8px]">3</span></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">RK</div>
              </div>
            </div>
            {/* Report CTA */}
            <button onClick={() => go("report")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2" style={{ background: "#e06000" }}>
              <span className="text-base">📢</span> Report a Challenge
            </button>
          </div>

          <div className="px-4 py-3 space-y-4">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: "2", l: "Reported", c: "#3a5fa0" },
                { v: "1", l: "In Progress", c: "#f59e0b" },
                { v: "1", l: "Resolved", c: "#059669" },
              ].map(s => (
                <div key={s.l} className="bg-white rounded-xl p-3 text-center border border-slate-100">
                  <div className="text-xl font-bold font-mono" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Your challenge */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Your Challenge</span>
                <button onClick={() => go("my-challenges")} className="text-xs" style={{ color: "#1e3060" }}>View all</button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer" onClick={() => go("challenge-detail")}>
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400">{DEMO_CHALLENGE.id}</span>
                  <StatusBadge status={DEMO_CHALLENGE.status} />
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-2">{DEMO_CHALLENGE.title}</p>
                <div className="flex items-center gap-2">
                  <DistrictBadge district={DEMO_CHALLENGE.district} />
                  <span className="text-xs text-slate-500">{DEMO_CHALLENGE.domain}</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progress</span>
                    <span className="font-mono">9/11 steps</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: "82%", background: "#059669" }} />
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); go("timeline"); }} className="mt-3 text-xs font-medium" style={{ color: "#1e3060" }}>View Timeline →</button>
              </div>
            </div>

            {/* Community */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Community Feed</span>
                <button onClick={() => go("community")} className="text-xs" style={{ color: "#1e3060" }}>See all</button>
              </div>
              {[
                { txt: "Hand-pump in Torpa repaired! Thanks to BIT Mesra team 🎉", user: "Village Pradhan", time: "2h ago" },
                { txt: "New challenge reported in Ranchi — Road damage on NH-33", user: "Citizen Reporter", time: "4h ago" },
                { txt: "JalRakshak team conducted awareness session in 3 villages", user: "BIT Mesra", time: "1d ago" },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 mb-2">
                  <p className="text-xs text-slate-700 mb-1.5">{f.txt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500">{f.user}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{f.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  // ── REPORT ────────────────────────────────────────────────────────────────
  if (screen === "report") {
    return (
      <Frame hideNav>
        <div className="flex flex-col" style={{ minHeight: "100%" }}>
          <div className="px-4 pt-5 pb-4" style={{ background: "#0d1526" }}>
            <button onClick={() => go("home")} className="text-slate-400 text-sm mb-4">← Back</button>
            <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Report a Challenge</h1>
            <p className="text-slate-400 text-xs">Help improve your community</p>
            <div className="flex gap-1.5 mt-4">
              {["Category", "Details", "Location", "Media", "Review"].map((s, i) => (
                <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i === 0 ? "#e06000" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
          </div>
          <div className="flex-1 p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-2">Select Domain *</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: "💧", name: "Water" }, { icon: "⚡", name: "Electricity" }, { icon: "🛣️", name: "Roads" },
                  { icon: "🏫", name: "Education" }, { icon: "🏥", name: "Health" }, { icon: "🌾", name: "Agriculture" },
                ].map(c => (
                  <button key={c.name} onClick={() => go("form1")} className="bg-white border border-slate-200 rounded-xl p-3 text-center hover:border-orange-400 transition-colors">
                    <div className="text-2xl mb-1">{c.icon}</div>
                    <div className="text-xs font-medium text-slate-600">{c.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  // ── FORM 1 ────────────────────────────────────────────────────────────────
  if (screen === "form1") {
    return (
      <Frame hideNav>
        <div style={{ minHeight: "100%" }}>
          <div className="px-4 pt-5 pb-4" style={{ background: "#0d1526" }}>
            <button onClick={() => go("report")} className="text-slate-400 text-sm mb-4">← Back</button>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💧</span>
              <h1 className="text-lg font-bold text-white">Water Resources</h1>
            </div>
            <div className="flex gap-1.5">
              {["Category", "Details", "Location", "Media", "Review"].map((s, i) => (
                <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i <= 1 ? "#e06000" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1">Challenge Title *</label>
              <input defaultValue="Frequent Hand-Pump Failures Affecting Rural Communities" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-orange-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1">Description *</label>
              <textarea rows={4} defaultValue="Over 40% of hand-pumps in our village break down during summer, leaving us without drinking water for weeks." className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-orange-400 resize-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1">Sub-Category</label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none">
                <option>Hand Pump Failure</option>
                <option>Water Quality</option>
                <option>Pipe Leakage</option>
                <option>Water Scarcity</option>
              </select>
            </div>
            <button onClick={() => go("form2")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
              Continue →
            </button>
          </div>
        </div>
      </Frame>
    );
  }

  // ── FORM 2 / IMPACT ───────────────────────────────────────────────────────
  if (screen === "form2" || screen === "impact") {
    return (
      <Frame hideNav>
        <div style={{ minHeight: "100%" }}>
          <div className="px-4 pt-5 pb-4" style={{ background: "#0d1526" }}>
            <button onClick={() => go("form1")} className="text-slate-400 text-sm mb-4">← Back</button>
            <h1 className="text-lg font-bold text-white">{screen === "impact" ? "Impact Information" : "Challenge Details"}</h1>
            <div className="flex gap-1.5 mt-3">
              {["Category", "Details", "Location", "Media", "Review"].map((s, i) => (
                <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i <= 2 ? "#e06000" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
          </div>
          <div className="p-4 space-y-4">
            {[
              { l: "Affected Population (approx.)", v: "2,450", t: "number" },
              { l: "Duration of Issue", v: "Since 2023 (3+ years)", t: "text" },
              { l: "Previous Complaints Filed?", v: "Yes — 3 times, no action", t: "text" },
            ].map(f => (
              <div key={f.l}>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1">{f.l}</label>
                <input defaultValue={f.v} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-orange-400" />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-2">Most Impacted Groups</label>
              <div className="flex flex-wrap gap-2">
                {["Women", "Children", "Elderly", "Farmers", "Daily Wage Workers", "Students"].map(g => (
                  <button key={g} className="px-3 py-1.5 rounded-xl text-xs font-medium border border-orange-200 bg-orange-50 text-orange-700">{g}</button>
                ))}
              </div>
            </div>
            <button onClick={() => go(screen === "impact" ? "review" : "location")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
              Continue →
            </button>
          </div>
        </div>
      </Frame>
    );
  }

  // ── LOCATION ──────────────────────────────────────────────────────────────
  if (screen === "location") {
    return (
      <Frame hideNav>
        <div style={{ minHeight: "100%" }}>
          <div className="px-4 pt-5 pb-4" style={{ background: "#0d1526" }}>
            <button onClick={() => go("form2")} className="text-slate-400 text-sm mb-4">← Back</button>
            <h1 className="text-lg font-bold text-white">Location</h1>
            <div className="flex gap-1.5 mt-3">
              {["Category", "Details", "Location", "Media", "Review"].map((s, i) => (
                <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i <= 3 ? "#e06000" : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
          </div>
          <div className="p-4 space-y-4">
            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-slate-200 h-48 bg-slate-200 relative flex items-center justify-center">
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
                {Array.from({ length: 48 }).map((_, i) => <div key={i} className="border border-slate-200/50" />)}
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-4 border-orange-500 bg-white flex items-center justify-center text-orange-500 text-lg shadow-lg">📍</div>
                <div className="mt-1 bg-white px-2 py-0.5 rounded text-xs font-medium shadow text-slate-700">Torpa Block, Khunti</div>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl text-sm font-medium border border-slate-300 text-slate-700 flex items-center justify-center gap-2">
              <span>📡</span> Use My GPS Location
            </button>
            {[
              { l: "District", v: "Khunti" },
              { l: "Block/Taluka", v: "Torpa" },
              { l: "Village/Ward", v: "Birsa Nagar" },
            ].map(f => (
              <div key={f.l}>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1">{f.l}</label>
                <input defaultValue={f.v} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
            ))}
            <button onClick={() => go("media")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
              Continue →
            </button>
          </div>
        </div>
      </Frame>
    );
  }

  // ── MEDIA ─────────────────────────────────────────────────────────────────
  if (screen === "media") {
    return (
      <Frame hideNav>
        <div style={{ minHeight: "100%" }}>
          <div className="px-4 pt-5 pb-4" style={{ background: "#0d1526" }}>
            <button onClick={() => go("location")} className="text-slate-400 text-sm mb-4">← Back</button>
            <h1 className="text-lg font-bold text-white">Add Evidence</h1>
            <div className="flex gap-1.5 mt-3">
              {["Category", "Details", "Location", "Media", "Review"].map((s, i) => (
                <div key={i} className="flex-1 h-1 rounded-full" style={{ background: "#e06000" }} />
              ))}
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {/* Placeholder images */}
              {[
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
              ].map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                  <img src={src} className="w-full h-full object-cover" alt="Evidence" />
                </div>
              ))}
              <div className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-orange-400 transition-colors">
                <span className="text-2xl text-slate-400">+</span>
                <span className="text-xs text-slate-400">Add Photo</span>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              📷 Photos increase AI classification confidence by 23% and priority scoring
            </div>
            <button className="w-full py-2.5 rounded-xl text-sm font-medium border border-slate-300 text-slate-700 flex items-center justify-center gap-2">
              🎤 Add Voice Note (optional)
            </button>
            <button onClick={() => go("impact")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
              Continue →
            </button>
          </div>
        </div>
      </Frame>
    );
  }

  // ── REVIEW ────────────────────────────────────────────────────────────────
  if (screen === "review") {
    return (
      <Frame hideNav>
        <div style={{ minHeight: "100%" }}>
          <div className="px-4 pt-5 pb-4" style={{ background: "#0d1526" }}>
            <button onClick={() => go("impact")} className="text-slate-400 text-sm mb-4">← Back</button>
            <h1 className="text-lg font-bold text-white">Review & Submit</h1>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
              {[
                { l: "Domain", v: "💧 Water Resources" },
                { l: "Title", v: "Frequent Hand-Pump Failures Affecting Rural Communities" },
                { l: "Location", v: "Torpa Block, Khunti District" },
                { l: "Affected", v: "2,450 people" },
                { l: "Photos", v: "2 uploaded" },
              ].map(f => (
                <div key={f.l} className="flex justify-between text-sm">
                  <span className="text-slate-500">{f.l}</span>
                  <span className="font-medium text-slate-800 text-right max-w-[60%]">{f.v}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
              🤖 AI will classify this challenge and route it to the right university within 24 hours
            </div>
            <button onClick={() => go("success")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
              Submit Challenge
            </button>
          </div>
        </div>
      </Frame>
    );
  }

  // ── SUCCESS ───────────────────────────────────────────────────────────────
  if (screen === "success") {
    return (
      <Frame hideNav>
        <div className="flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: "100%", background: "#0d1526" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6" style={{ background: "rgba(5,150,105,0.2)" }}>✅</div>
          <div className="font-mono text-sm text-orange-400 mb-2">JH-2026-00472</div>
          <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Noto Serif', serif" }}>Challenge Submitted!</h1>
          <p className="text-slate-400 text-sm mb-8">Your challenge has been received. AI classification will begin shortly. You'll be notified at each step.</p>
          <div className="w-full space-y-3 mb-8">
            {["✅ Received by Government", "⏳ AI Classification (< 24h)", "⏳ Validation by Officer", "⏳ University Assignment"].map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i === 0 ? "bg-emerald-500" : "bg-white/10"}`}>
                  {i === 0 ? "✓" : "○"}
                </div>
                <span className={i === 0 ? "text-white" : "text-slate-500"}>{s.replace("✅ ", "").replace("⏳ ", "")}</span>
              </div>
            ))}
          </div>
          <button onClick={() => { go("home"); setActiveTab("home"); }} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
            Back to Home
          </button>
          <button onClick={() => go("my-challenges")} className="mt-3 text-sm text-slate-400">View My Challenges</button>
        </div>
      </Frame>
    );
  }

  // ── MY CHALLENGES ─────────────────────────────────────────────────────────
  if (screen === "my-challenges") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <h1 className="text-lg font-bold text-white mb-1">My Challenges</h1>
            <p className="text-slate-400 text-xs">Track your reported challenges</p>
          </div>
          <div className="p-4 space-y-3">
            {[DEMO_CHALLENGE, {
              ...CHALLENGES[1],
              id: "JH-2026-00388",
              title: "Broken Street Lights in Market Area",
              district: "Khunti",
              domain: "Infrastructure",
              priority: "Medium",
              aiConfidence: 88,
              population: 850,
              status: "Validated",
            }].map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:border-slate-300 transition-all" onClick={() => go("challenge-detail")}>
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400">{c.id}</span>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-2 leading-snug">{c.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <DistrictBadge district={c.district} />
                  <span className="text-xs text-slate-500">{c.domain}</span>
                  <AIBadge confidence={c.aiConfidence} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden mr-3">
                    <div className="h-full rounded-full" style={{ width: i === 0 ? "82%" : "35%", background: "#059669" }} />
                  </div>
                  <span className="text-xs font-mono text-slate-500">{i === 0 ? "9/11" : "4/11"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  // ── CHALLENGE DETAIL ──────────────────────────────────────────────────────
  if (screen === "challenge-detail") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <button onClick={() => go("my-challenges")} className="text-slate-400 text-sm mb-3">← My Challenges</button>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-xs text-orange-400">{DEMO_CHALLENGE.id}</div>
                <h1 className="text-base font-bold text-white mt-1 leading-snug pr-4">{DEMO_CHALLENGE.title}</h1>
              </div>
              <StatusBadge status={DEMO_CHALLENGE.status} size="md" />
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
              {[
                { l: "District", v: DEMO_CHALLENGE.district },
                { l: "Domain", v: DEMO_CHALLENGE.domain },
                { l: "Submitted", v: "15 Jan 2026" },
                { l: "AI Confidence", v: <AIBadge confidence={DEMO_CHALLENGE.aiConfidence} /> },
                { l: "University", v: DEMO_CHALLENGE.university },
                { l: "Team", v: `Team ${DEMO_CHALLENGE.team}` },
                { l: "Funding", v: `₹${(DEMO_CHALLENGE.funding / 100000).toFixed(0)} Lakhs` },
              ].map(f => (
                <div key={f.l} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{f.l}</span>
                  <span className="font-medium text-slate-800">{f.v}</span>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-800">
              🚀 <strong>Pilot Completed!</strong> IoT sensors installed in 12 villages. 2,450 beneficiaries served. 94% pump uptime achieved.
            </div>
            <button onClick={() => go("timeline")} className="w-full py-3 rounded-xl font-medium text-sm border border-slate-300 text-slate-700">
              View Full Timeline →
            </button>
            <button onClick={() => go("feedback")} className="w-full py-3 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
              Leave Feedback
            </button>
          </div>
        </div>
      </Frame>
    );
  }

  // ── TIMELINE ──────────────────────────────────────────────────────────────
  if (screen === "timeline") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <button onClick={() => go("challenge-detail")} className="text-slate-400 text-sm mb-3">← Challenge Detail</button>
            <h1 className="text-lg font-bold text-white">Challenge Timeline</h1>
            <p className="text-xs text-slate-400 font-mono">{DEMO_CHALLENGE.id}</p>
          </div>
          <div className="p-4">
            <Timeline steps={TIMELINE_STEPS} />
          </div>
        </div>
      </Frame>
    );
  }

  // ── NOTIFICATIONS ─────────────────────────────────────────────────────────
  if (screen === "notifications") {
    const notifs = [
      { icon: "🚀", title: "Pilot Completed!", body: "JH-2026-00472 pilot phase is complete. 2,450 people benefitted.", time: "2h ago", unread: true },
      { icon: "🏭", title: "Industry Connected", body: "Demo CSR Foundation joined your challenge with ₹12L funding.", time: "3 days ago", unread: true },
      { icon: "🎓", title: "University Assigned", body: "BIT Mesra has been assigned to your challenge.", time: "1 month ago", unread: false },
      { icon: "✅", title: "Challenge Validated", body: "Your challenge has been validated by Sh. Vikram Singh.", time: "6 weeks ago", unread: false },
    ];
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <h1 className="text-lg font-bold text-white">Notifications</h1>
            <p className="text-xs text-slate-400">2 unread</p>
          </div>
          <div className="divide-y divide-slate-100">
            {notifs.map((n, i) => (
              <div key={i} className={`px-4 py-3 flex gap-3 ${n.unread ? "bg-blue-50" : "bg-white"}`}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg bg-slate-100 flex-shrink-0">{n.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800">{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{n.body}</p>
                </div>
                {n.unread && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#e06000" }} />}
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  // ── FEEDBACK ──────────────────────────────────────────────────────────────
  if (screen === "feedback") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-4" style={{ background: "#0d1526" }}>
            <button onClick={() => go("challenge-detail")} className="text-slate-400 text-sm mb-3">← Back</button>
            <h1 className="text-lg font-bold text-white">Leave Feedback</h1>
            <p className="text-xs text-slate-400">Your feedback improves future solutions</p>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-2">How satisfied are you with the resolution?</label>
              <div className="flex gap-3 justify-center">
                {["😞", "😐", "🙂", "😊", "🤩"].map((e, i) => (
                  <button key={i} className={`text-3xl p-2 rounded-xl border-2 transition-all ${i === 4 ? "border-orange-400 bg-orange-50" : "border-transparent"}`}>{e}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Comments</label>
              <textarea rows={4} defaultValue="The hand-pumps in our village are working much better now. The IoT system alerts us before they break. Very happy with the BIT Mesra team's work!" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm resize-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-2">Impact experienced</label>
              {["Regular water supply", "Reduced fetching time", "Improved health", "Economic savings"].map(imp => (
                <label key={imp} className="flex items-center gap-2 mb-2 text-sm text-slate-700">
                  <input type="checkbox" defaultChecked={imp !== "Economic savings"} className="rounded" />
                  {imp}
                </label>
              ))}
            </div>
            <button onClick={() => go("impact-rewards")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
              Submit Feedback
            </button>
          </div>
        </div>
      </Frame>
    );
  }

  // ── IMPACT & REWARDS ──────────────────────────────────────────────────────
  if (screen === "impact-rewards") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <h1 className="text-lg font-bold text-white">Impact & Rewards</h1>
            <p className="text-xs text-slate-400">Your contribution to Jharkhand</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="rounded-xl p-4 text-center" style={{ background: "rgba(224,96,0,0.1)", border: "1px solid rgba(224,96,0,0.3)" }}>
              <div className="text-4xl mb-2">🏅</div>
              <div className="font-bold text-slate-800 text-lg">Active Citizen</div>
              <div className="text-xs text-slate-500 mt-1">Jan Sahayak — Level 2</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "2", l: "Challenges Reported" },
                { v: "2,450", l: "People Impacted" },
                { v: "480", l: "Points Earned" },
                { v: "1", l: "Certificate" },
              ].map(s => (
                <div key={s.l} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                  <div className="text-xl font-bold text-slate-800 font-mono">{s.v}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-700 mb-3">🏆 Recent Achievement</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">🚀</div>
                <div>
                  <div className="text-sm font-medium text-slate-800">Pilot Impact Champion</div>
                  <div className="text-xs text-slate-500">Your challenge reached pilot stage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  // ── COMMUNITY ─────────────────────────────────────────────────────────────
  if (screen === "community") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <h1 className="text-lg font-bold text-white">Community Feed</h1>
            <p className="text-xs text-slate-400">Stories from across Jharkhand</p>
          </div>
          <div className="p-4 space-y-3">
            {[
              { icon: "💧", title: "Hand-pump success in Khunti!", body: "Team JalRakshak's IoT system has kept 40 hand-pumps running for 3 months straight. 2,450 people celebrating!", user: "Khunti Panchayat", time: "2h ago", likes: 42 },
              { icon: "🌾", title: "Soil testing camps in Hazaribagh", body: "Team MittiShakti conducted free soil testing for 200 farmers this weekend.", user: "Ranchi University", time: "1d ago", likes: 28 },
              { icon: "📚", title: "New school toilets in Dumka", body: "Girls' dropout rate reduced from 47% to 31% after new sanitation facilities were built.", user: "District Education Officer", time: "3d ago", likes: 67 },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-base">{p.icon}</div>
                  <div>
                    <div className="text-xs font-semibold text-slate-700">{p.user}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.time}</div>
                  </div>
                </div>
                <div className="font-semibold text-sm text-slate-800 mb-1">{p.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{p.body}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                  <button>❤️ {p.likes}</button>
                  <button>💬 Comment</button>
                  <button>↗️ Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  // ── PROFILE ───────────────────────────────────────────────────────────────
  if (screen === "profile") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-6 text-center" style={{ background: "#0d1526" }}>
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">RK</div>
            <div className="text-lg font-bold text-white">Ramesh Kumar Oraon</div>
            <div className="text-xs text-slate-400 font-mono">+91 98765 43210 · Khunti</div>
            <div className="mt-2 inline-flex items-center gap-1 bg-orange-500/20 text-orange-300 text-xs px-2 py-0.5 rounded-full">
              🏅 Jan Sahayak Level 2
            </div>
          </div>
          <div className="p-4 space-y-3">
            {[
              { icon: "📋", l: "My Challenges", action: () => go("my-challenges") },
              { icon: "🏆", l: "Impact & Rewards", action: () => go("impact-rewards") },
              { icon: "🔔", l: "Notifications", action: () => go("notifications") },
              { icon: "⚙️", l: "Settings", action: () => go("settings") },
              { icon: "❓", l: "Help & Support", action: () => {} },
              { icon: "🚪", l: "Sign Out", action: onBack },
            ].map(item => (
              <button key={item.l} onClick={item.action} className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 text-left hover:border-slate-300 transition-colors">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-medium text-slate-700">{item.l}</span>
                <span className="ml-auto text-slate-400 text-xs">›</span>
              </button>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  // ── SETTINGS ─────────────────────────────────────────────────────────────
  if (screen === "settings") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <button onClick={() => go("profile")} className="text-slate-400 text-sm mb-3">← Profile</button>
            <h1 className="text-lg font-bold text-white">Settings</h1>
          </div>
          <div className="p-4 space-y-4">
            {[
              { section: "Notifications", items: ["Push Notifications", "SMS Alerts", "Email Updates"] },
              { section: "Privacy", items: ["Location Sharing", "Public Profile", "Anonymous Reporting"] },
              { section: "Language", items: ["App Language", "Notification Language"] },
            ].map(sec => (
              <div key={sec.section}>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{sec.section}</div>
                <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                  {sec.items.map(item => (
                    <div key={item} className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm text-slate-700">{item}</span>
                      <div className="w-10 h-5 rounded-full relative" style={{ background: "#e06000" }}>
                        <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  // ── SEARCH ────────────────────────────────────────────────────────────────
  if (screen === "search") {
    return (
      <Frame>
        <div>
          <div className="px-4 pt-5 pb-3" style={{ background: "#0d1526" }}>
            <h1 className="text-lg font-bold text-white mb-2">Search</h1>
            <div className="relative">
              <input placeholder="Search challenges, locations, domains..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border-none bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:bg-white/20 transition-all" />
              <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Popular Searches</div>
            <div className="flex flex-wrap gap-2">
              {["Water Scarcity", "Khunti", "Education", "Road Repair", "Ranchi", "Scholarships"].map(t => (
                <button key={t} className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  // ── FALLBACK ──────────────────────────────────────────────────────────────
  return (
    <Frame>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full">
        <div className="text-4xl mb-3">🚧</div>
        <h2 className="text-lg font-bold text-slate-800">Coming Soon</h2>
        <p className="text-sm text-slate-500 mt-2">This feature is currently under development.</p>
        <button onClick={() => go("home")} className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
          Return Home
        </button>
      </div>
    </Frame>
  );
}
