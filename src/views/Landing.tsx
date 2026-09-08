import React from "react";

interface Props {
  onSelectRole: (role: string) => void;
}

const roles = [
  {
    id: "citizen",
    label: "Citizen",
    icon: "👤",
    desc: "Report civic challenges, track resolution progress",
    tag: "Mobile Experience",
    color: "#1e3060",
    bg: "#f5f7fc",
  },
  {
    id: "government",
    label: "Government Officer",
    icon: "🏛️",
    desc: "Validate, route and track challenge resolution across Jharkhand",
    tag: "Desktop Dashboard",
    color: "#065f46",
    bg: "#f0fdf4",
  },
  {
    id: "university",
    label: "University",
    icon: "🎓",
    desc: "Form teams, build proposals, execute innovation projects",
    tag: "Project Workspace",
    color: "#7c3aed",
    bg: "#faf5ff",
  },
  {
    id: "industry",
    label: "Industry / CSR",
    icon: "🏭",
    desc: "Discover impact opportunities, fund pilots, mentor teams",
    tag: "Opportunity Portal",
    color: "#b35000",
    bg: "#fff5e8",
  },
  {
    id: "admin",
    label: "Platform Admin",
    icon: "⚙️",
    desc: "Manage users, institutions, routing rules and AI configuration",
    tag: "Admin Console",
    color: "#475569",
    bg: "#f8fafc",
  },
];

export default function Landing({ onSelectRole }: Props) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0d1526" }}>
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: "#e06000" }}>🌱</div>
          <div>
            <div className="font-bold text-white text-base leading-tight">JanSamadhan</div>
            <div className="text-xs text-slate-400 font-mono">Innovation Portal</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">SIH 26043</span>
          <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded">Govt. of Jharkhand</span>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 bg-orange-400/10 border border-orange-400/20 px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            Department of Higher & Technical Education
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Noto Serif', serif" }}>
            Societal Innovation<br />
            <span style={{ color: "#f07820" }}>Collaboration Portal</span>
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Connecting citizens, government, universities and industry to solve real challenges through academic innovation and community participation.
          </p>
        </div>

        {/* Demo story banner */}
        <div className="mb-8 rounded-xl border overflow-hidden" style={{ borderColor: "#2a4580", background: "rgba(58,95,160,0.15)" }}>
          <div className="px-4 py-2.5 flex items-center gap-2 border-b" style={{ borderColor: "#2a4580" }}>
            <span className="text-xs font-mono text-blue-300 font-semibold">DEMO JOURNEY</span>
            <span className="text-xs text-slate-400 font-mono">JH-2026-00472 → Khunti, Water Resources</span>
          </div>
          <div className="px-4 py-3 flex flex-wrap gap-x-6 gap-y-2">
            {[
              "📝 Citizen Reports",
              "🤖 AI Classifies (94%)",
              "✅ Govt Validates",
              "🎓 BIT Mesra Assigned",
              "👥 JalRakshak Team",
              "🏭 CSR Funds ₹12L",
              "🚀 Pilot Completed",
              "👥 2,450 Beneficiaries",
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                {i > 0 && <span className="text-slate-600 mr-1">›</span>}
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="group text-left rounded-xl border border-white/10 p-5 hover:border-white/25 transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: role.bg }}>
                  {role.icon}
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-sm border text-slate-400 border-white/10">{role.tag}</span>
              </div>
              <div className="font-bold text-white text-base mb-1">{role.label}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{role.desc}</div>
              <div className="mt-3 text-xs font-semibold flex items-center gap-1 transition-colors" style={{ color: "#f07820" }}>
                Enter Portal <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Stats footer */}
        <div className="mt-12 grid grid-cols-4 gap-4 border-t border-white/10 pt-8">
          {[
            { v: "1,847", l: "Challenges Reported" },
            { v: "312", l: "Active Projects" },
            { v: "2.84L", l: "Citizens Impacted" },
            { v: "₹8.94Cr", l: "CSR Funding" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white font-mono">{s.v}</div>
              <div className="text-xs text-slate-400 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
