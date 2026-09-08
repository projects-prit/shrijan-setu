import React, { useState } from "react";
import { DEMO_CHALLENGE, TIMELINE_STEPS } from "../data/demo";
import { StatusBadge, AIBadge, DistrictBadge, KPICard, SectionHeader, DataTable, Sidebar, Topbar, TabBar, Timeline } from "../components/ui";

type View = "login" | "dashboard" | "opportunities" | "match-detail" | "project-detail"
  | "connect" | "collaborations" | "mentorship" | "schedule"
  | "funding" | "funding-detail" | "pilot-tracker" | "pilot-eval"
  | "impact-report" | "messages" | "notifications" | "profile";

const OPPORTUNITIES = [
  {
    id: DEMO_CHALLENGE.id,
    title: DEMO_CHALLENGE.title,
    domain: DEMO_CHALLENGE.domain,
    district: DEMO_CHALLENGE.district,
    university: "BIT Mesra",
    status: "Pilot Completed",
    fundingNeeded: 1200000,
    beneficiaries: 2450,
    aiMatch: 94,
    tags: ["IoT", "Rural", "Water", "Tribal"],
    impact: "2,450 people with reliable water access",
  },
  {
    id: "JH-2026-00489",
    title: "Irregular Electricity Supply in Tribal Villages",
    domain: "Infrastructure",
    district: "Gumla",
    university: "NIT Jamshedpur",
    status: "In Execution",
    fundingNeeded: 1800000,
    beneficiaries: 3200,
    aiMatch: 87,
    tags: ["Solar", "Rural", "Energy"],
    impact: "3,200 residents with reliable power",
  },
  {
    id: "JH-2026-00523",
    title: "Dropout Rate in Secondary Schools",
    domain: "Education",
    district: "Dumka",
    university: "Vinoba Bhave University",
    status: "Team Formed",
    fundingNeeded: 1100000,
    beneficiaries: 5400,
    aiMatch: 79,
    tags: ["Girls Education", "WASH", "Tribal"],
    impact: "5,400 students, focus on girls retention",
  },
];

export default function IndustryApp({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("login");
  const [selectedOpp, setSelectedOpp] = useState(OPPORTUNITIES[0]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "opportunities", label: "Opportunity Feed", icon: "🔍", badge: 12 },
    { id: "collaborations", label: "My Collaborations", icon: "🤝" },
    { id: "funding", label: "Funding", icon: "💰" },
    { id: "pilot-tracker", label: "Pilot Tracker", icon: "🚀" },
    { id: "mentorship", label: "Mentorship", icon: "👨‍💼" },
    { id: "impact-report", label: "Impact Report", icon: "📈" },
    { id: "messages", label: "Messages", icon: "💬", badge: 3 },
    { id: "notifications", label: "Notifications", icon: "🔔", badge: 2 },
    { id: "profile", label: "Profile", icon: "👤" },
  ] as const;

  if (view === "login") {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: "#1c0f00" }}>
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#e06000" }}>🏭</div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Industry / CSR Portal</h1>
            <p className="text-orange-300 text-sm">Demo CSR Foundation</p>
          </div>
          <div className="space-y-3 mb-4">
            {[{ l: "Company ID / CIN", v: "U74999MH2018PTC312847", t: "text" }, { l: "Password", v: "••••••••", t: "password" }].map(f => (
              <div key={f.l}>
                <label className="text-xs text-orange-300 font-mono block mb-1">{f.l.toUpperCase()}</label>
                <input type={f.t} defaultValue={f.v} className="w-full px-4 py-3 rounded-xl text-white text-sm border border-white/10 outline-none" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
            ))}
          </div>
          <button onClick={() => setView("dashboard")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
            Sign In
          </button>
          <button onClick={onBack} className="mt-4 w-full text-center text-sm text-orange-400 hover:text-orange-300">← Back to Portal</button>
        </div>
      </div>
    );
  }

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="h-full flex flex-col">
      <div className="h-10 px-4 flex items-center justify-between border-b flex-shrink-0" style={{ background: "#1c0f00", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center text-sm" style={{ background: "#e06000" }}>🏭</div>
          <span className="text-xs font-semibold text-white">Demo CSR Foundation</span>
          <span className="text-[10px] text-orange-400 font-mono">| JanSamadhan Partner</span>
        </div>
        <button onClick={onBack} className="text-xs text-orange-400 hover:text-orange-300 px-2 py-1 rounded border border-white/10">← Exit</button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          items={navItems as any}
          active={view}
          onSelect={(id) => setView(id as View)}
          footer={
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#e06000" }}>DC</div>
              <div>
                <div className="text-xs font-semibold text-slate-700">Demo CSR Foundation</div>
                <div className="text-[10px] text-slate-400">CSR Partner</div>
              </div>
            </div>
          }
        />
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
  if (view === "dashboard") {
    return (
      <Layout>
        <Topbar title="Demo CSR Foundation Dashboard" sub="CSR Impact Portfolio — Jharkhand" role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <KPICard label="Active Projects" value="8" trend="+2" icon="📋" />
            <KPICard label="Total Committed" value="₹12L" sub="JH-2026-00472" icon="💰" />
            <KPICard label="Beneficiaries" value="2,450" trend="+2,450" icon="👥" />
            <KPICard label="AI Match Score" value="94%" sub="Portfolio avg" icon="🤖" />
          </div>

          {/* Featured collaboration */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:border-slate-300 transition-all" onClick={() => setView("project-detail")}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-mono text-xs text-slate-400 mb-1">{DEMO_CHALLENGE.id}</div>
                <h3 className="font-bold text-slate-800">{DEMO_CHALLENGE.title}</h3>
              </div>
              <StatusBadge status="Pilot Completed" size="md" />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <DistrictBadge district="Khunti" />
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-sm">BIT Mesra</span>
              <AIBadge confidence={94} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { l: "Committed", v: "₹12,00,000" },
                { l: "Utilised", v: "₹9,80,000" },
                { l: "Beneficiaries", v: "2,450" },
                { l: "Pilot", v: "✅ Done" },
              ].map(s => (
                <div key={s.l} className="bg-slate-50 rounded p-2 text-center">
                  <div className="font-bold text-sm text-slate-800">{s.v}</div>
                  <div className="text-[10px] text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunity feed preview */}
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Recommended Opportunities" sub="AI-matched to your CSR focus areas" action={
              <button onClick={() => setView("opportunities")} className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: "#e06000" }}>View All</button>
            } />
            <div className="space-y-3">
              {OPPORTUNITIES.slice(1).map(opp => (
                <div key={opp.id} className="border border-slate-200 rounded-lg p-3 hover:border-slate-300 cursor-pointer transition-all" onClick={() => { setSelectedOpp(opp); setView("match-detail"); }}>
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-mono text-xs text-slate-400">{opp.id}</span>
                    <AIBadge confidence={opp.aiMatch} />
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mb-2">{opp.title}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <DistrictBadge district={opp.district} />
                    <span className="text-xs text-slate-500">{opp.domain}</span>
                    <span className="text-xs text-slate-500">₹{(opp.fundingNeeded / 100000).toFixed(1)}L needed</span>
                    <span className="text-xs text-slate-500">👥 {opp.beneficiaries.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── OPPORTUNITIES ─────────────────────────────────────────────────────────
  if (view === "opportunities") {
    return (
      <Layout>
        <Topbar title="Opportunity Feed" sub="AI-matched innovation projects" role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex gap-3 mb-4 flex-wrap">
            {["All Domains", "Water", "Education", "Health", "Agriculture", "Infrastructure"].map(f => (
              <button key={f} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${f === "All Domains" ? "text-white border-transparent" : "text-slate-600 border-slate-200 bg-white hover:border-slate-300"}`} style={f === "All Domains" ? { background: "#e06000" } : {}}>
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {OPPORTUNITIES.map(opp => (
              <div
                key={opp.id}
                className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 cursor-pointer transition-all"
                onClick={() => { setSelectedOpp(opp); setView("match-detail"); }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{opp.id}</span>
                    <StatusBadge status={opp.status} size="xs" />
                  </div>
                  <AIBadge confidence={opp.aiMatch} />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{opp.title}</h3>
                <div className="grid grid-cols-5 gap-3 text-xs mb-3">
                  <div><span className="text-slate-400 block">Domain</span><span className="font-medium text-slate-700">{opp.domain}</span></div>
                  <div><span className="text-slate-400 block">District</span><span className="font-medium text-slate-700">{opp.district}</span></div>
                  <div><span className="text-slate-400 block">University</span><span className="font-medium text-slate-700">{opp.university}</span></div>
                  <div><span className="text-slate-400 block">Funding</span><span className="font-medium text-slate-700">₹{(opp.fundingNeeded / 100000).toFixed(1)}L</span></div>
                  <div><span className="text-slate-400 block">Beneficiaries</span><span className="font-medium text-slate-700">{opp.beneficiaries.toLocaleString()}</span></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {opp.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-700 border border-orange-200 rounded">{t}</span>)}
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: "#e06000" }}>View Match →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // ── MATCH DETAIL ──────────────────────────────────────────────────────────
  if (view === "match-detail") {
    return (
      <Layout>
        <Topbar title="AI Match Analysis" sub={selectedOpp.id} role="CSR Manager" avatar="DC" actions={
          <button onClick={() => setView("opportunities")} className="text-xs text-slate-500">← Opportunities</button>
        } />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-bold text-slate-800 text-base">{selectedOpp.title}</h2>
              <AIBadge confidence={selectedOpp.aiMatch} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { l: "Domain Match", v: `${selectedOpp.aiMatch}%`, color: "#059669" },
                { l: "CSR Alignment", v: "High", color: "#3a5fa0" },
                { l: "Impact Potential", v: selectedOpp.beneficiaries.toLocaleString() + " people", color: "#e06000" },
              ].map(s => (
                <div key={s.l} className="bg-slate-50 rounded-lg p-3 text-center">
                  <div className="font-bold text-base" style={{ color: s.color }}>{s.v}</div>
                  <div className="text-xs text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                { l: "Domain Relevance", score: selectedOpp.aiMatch },
                { l: "Impact Score", score: 91 },
                { l: "University Track Record", score: 87 },
                { l: "Funding Efficiency", score: 84 },
                { l: "Scalability", score: 88 },
              ].map(s => (
                <div key={s.l} className="flex items-center gap-3">
                  <div className="text-xs text-slate-500 w-40">{s.l}</div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: "#e06000" }} />
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-700 w-8 text-right">{s.score}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setView("connect")} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#e06000" }}>
              Send Connect Request
            </button>
            <button onClick={() => setView("project-detail")} className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200">
              Full Project Detail
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── PROJECT DETAIL ────────────────────────────────────────────────────────
  if (view === "project-detail") {
    return (
      <Layout>
        <Topbar title={DEMO_CHALLENGE.id} sub={DEMO_CHALLENGE.title} role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-bold text-slate-800">{DEMO_CHALLENGE.title}</h2>
                <div className="flex gap-2 mt-1">
                  <DistrictBadge district="Khunti" />
                  <StatusBadge status="Pilot Completed" />
                </div>
              </div>
              <AIBadge confidence={94} />
            </div>
            <p className="text-sm text-slate-600 mb-4">{DEMO_CHALLENGE.description}</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "University", v: "BIT Mesra" },
                { l: "Team", v: "JalRakshak (6 students)" },
                { l: "Faculty", v: "Dr. Anjali Mishra" },
                { l: "Funding Needed", v: "₹12,00,000" },
                { l: "Beneficiaries", v: "2,450" },
                { l: "Solution", v: "IoT + Predictive Maintenance" },
              ].map(f => (
                <div key={f.l} className="bg-slate-50 rounded p-2.5">
                  <div className="text-[10px] text-slate-400">{f.l}</div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">{f.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Project Timeline" />
            <Timeline steps={TIMELINE_STEPS} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setView("funding-detail")} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#e06000" }}>
              View Funding Details
            </button>
            <button onClick={() => setView("pilot-tracker")} className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200">
              Pilot Tracker
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── CONNECT ───────────────────────────────────────────────────────────────
  if (view === "connect") {
    return (
      <Layout>
        <Topbar title="Connect Request" sub={selectedOpp.id} role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Send Connect Request" sub={`To: ${selectedOpp.university} — ${selectedOpp.title}`} />
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Collaboration Type</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                  <option>CSR Funding</option>
                  <option>Technical Mentorship</option>
                  <option>Equipment/Resources</option>
                  <option>Joint Research</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Proposed Contribution</label>
                <input defaultValue="₹18,00,000 — Solar equipment + installation support" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Message to University</label>
                <textarea rows={4} defaultValue="We are interested in supporting this initiative aligned with our rural electrification CSR mandate. We can provide solar panel procurement and field technical support from our energy team." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
              </div>
            </div>
            <button onClick={() => setView("collaborations")} className="mt-4 w-full py-3 rounded-lg text-sm font-semibold text-white" style={{ background: "#e06000" }}>
              Send Request
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── COLLABORATIONS ────────────────────────────────────────────────────────
  if (view === "collaborations") {
    return (
      <Layout>
        <Topbar title="My Collaborations" sub="1 active project" role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 text-sm text-emerald-800">
            ✅ Connect request for JH-2026-00489 sent to NIT Jamshedpur
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:border-slate-300 transition-all" onClick={() => setView("project-detail")}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-mono text-xs text-slate-400">{DEMO_CHALLENGE.id}</span>
                <h3 className="font-semibold text-slate-800 mt-0.5">{DEMO_CHALLENGE.title}</h3>
              </div>
              <StatusBadge status="Pilot Completed" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[{ l: "Funding Committed", v: "₹12L" }, { l: "Utilised", v: "₹9.8L" }, { l: "Beneficiaries", v: "2,450" }].map(s => (
                <div key={s.l} className="bg-slate-50 rounded p-2 text-center">
                  <div className="font-bold text-sm text-slate-800">{s.v}</div>
                  <div className="text-[10px] text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── FUNDING DETAIL ────────────────────────────────────────────────────────
  if (view === "funding-detail") {
    return (
      <Layout>
        <Topbar title="Funding Detail" sub={DEMO_CHALLENGE.id} role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <KPICard label="Committed" value="₹12,00,000" icon="💰" />
            <KPICard label="Disbursed" value="₹9,80,000" sub="81.7% used" icon="📤" />
            <KPICard label="Remaining" value="₹2,20,000" icon="🏦" />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Fund Utilisation" />
            <div className="space-y-3">
              {[
                { l: "IoT Hardware (40 sensors)", v: "₹4,80,000", pct: 40 },
                { l: "Installation & Civil Work", v: "₹1,20,000", pct: 10 },
                { l: "Software & Cloud Platform", v: "₹2,00,000", pct: 17 },
                { l: "Community Training", v: "₹80,000", pct: 7 },
                { l: "Field Monitoring (6 months)", v: "₹1,00,000", pct: 8 },
              ].map(f => (
                <div key={f.l} className="flex items-center gap-3">
                  <div className="text-xs text-slate-600 w-48">{f.l}</div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${f.pct * 2}%`, background: "#e06000" }} />
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-700 w-24 text-right">{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── PILOT TRACKER ─────────────────────────────────────────────────────────
  if (view === "pilot-tracker") {
    return (
      <Layout>
        <Topbar title="Pilot Tracker" sub={DEMO_CHALLENGE.id} role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <KPICard label="Villages Covered" value="12" icon="🏘️" />
            <KPICard label="Sensors Installed" value="40" icon="📡" />
            <KPICard label="Pump Uptime" value="94%" trend="+34%" icon="💧" />
            <KPICard label="Avg Response" value="3.2h" trend="-92%" icon="⚡" />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Pilot Timeline" />
            <Timeline steps={TIMELINE_STEPS.filter(s => ["Execution Started", "Pilot Completed", "Solution Deployment", "Impact Certification"].includes(s.step))} />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Village Coverage" />
            <DataTable
              columns={[
                { key: "village", label: "Village" },
                { key: "pumps", label: "Pumps", width: "70px" },
                { key: "uptime", label: "Uptime", width: "80px" },
                { key: "status", label: "Status", width: "100px" },
              ]}
              rows={["Birsa Nagar", "Torpa Main", "Kokar Toli", "Suguwa", "Ranidih", "Burugutu", "Kuchai", "Navgaon", "Doisa", "Tangar", "Bero", "Kesarang"].map(v => ({
                village: <span className="text-xs font-medium text-slate-700">{v}</span>,
                pumps: <span className="font-mono text-xs">{Math.floor(Math.random() * 3 + 2)}</span>,
                uptime: <span className="font-mono text-xs font-semibold text-emerald-600">{Math.floor(Math.random() * 8 + 90)}%</span>,
                status: <StatusBadge status="Active" size="xs" />,
              }))}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── IMPACT REPORT ─────────────────────────────────────────────────────────
  if (view === "impact-report") {
    return (
      <Layout>
        <Topbar title="Impact Report" sub="Fiscal Year 2025-26" role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="font-semibold text-slate-800 mb-1">Annual CSR Impact Summary</div>
            <div className="text-xs text-slate-400 font-mono mb-4">Demo CSR Foundation · FY 2025-26</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { l: "Total CSR Deployed", v: "₹12,00,000" },
                { l: "Projects Active", v: "1 (8 in pipeline)" },
                { l: "Beneficiaries", v: "2,450 direct" },
                { l: "District Covered", v: "Khunti" },
                { l: "SDG Alignment", v: "SDG 6 — Clean Water" },
                { l: "Impact Score", v: "9.2/10" },
              ].map(f => (
                <div key={f.l} className="bg-slate-50 rounded p-3">
                  <div className="text-xs text-slate-400">{f.l}</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{f.v}</div>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-sm text-emerald-700">
              🏆 <strong>Key Outcome:</strong> 2,450 tribal citizens in Khunti now have reliable access to safe drinking water. Pump uptime increased from 60% to 94%. Emergency response time reduced from 4 weeks to 3.2 hours.
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── MENTORSHIP & SCHEDULE ───────────────────────────────────────────────────
  if (view === "mentorship" || view === "schedule") {
    return (
      <Layout>
        <Topbar title={view === "mentorship" ? "Mentorship Programs" : "Mentorship Schedule"} sub="University Connect" role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-5">
            <SectionHeader title={view === "mentorship" ? "Active Mentorships" : "Upcoming Sessions"} />
            {view === "mentorship" ? (
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-800">JalRakshak Tech Mentorship</h3>
                    <StatusBadge status="Active" size="xs" />
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Guiding the BIT Mesra team on scalable IoT architecture and LoRaWAN gateway setup.</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>👨‍🎓 6 Students</span>
                    <span>📅 4 Sessions completed</span>
                    <span>⭐ 4.8/5 Rating</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { title: "Hardware Scaling Review", team: "JalRakshak (BIT Mesra)", time: "Tomorrow, 10:00 AM", type: "Video Call" },
                  { title: "Solar Grid Architecture", team: "VidyutSeva (NIT Jamshedpur)", time: "Fri, 14:00 PM", type: "In-person" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
                    <div>
                      <div className="font-semibold text-sm text-slate-800">{s.title}</div>
                      <div className="text-xs text-slate-500">{s.team}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-700">{s.time}</div>
                      <div className="text-xs text-orange-600">{s.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // ── PILOT EVALUATION ──────────────────────────────────────────────────────
  if (view === "pilot-eval") {
    return (
      <Layout>
        <Topbar title="Pilot Evaluation" sub={DEMO_CHALLENGE.id} role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-5">
            <SectionHeader title="Evaluation Form" sub="Assess pilot outcomes against CSR goals" />
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Impact Achieved</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(score => (
                    <label key={score} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="impact" className="accent-orange-600" defaultChecked={score === 5} />
                      <span className="text-sm">{score}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Fund Utilization Efficiency</label>
                <textarea rows={3} defaultValue="Excellent efficiency. 81.7% of funds used to achieve 94% uptime, well within the estimated budget." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Scale-up Recommendation</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                  <option>Highly Recommend District-wide Scale</option>
                  <option>Recommend Partial Scale</option>
                  <option>Needs more testing</option>
                  <option>Do not scale</option>
                </select>
              </div>
              <button className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-colors">
                Submit Evaluation
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── MESSAGES, NOTIFICATIONS, PROFILE ──────────────────────────────────────
  if (view === "messages" || view === "notifications" || view === "profile") {
    return (
      <Layout>
        <Topbar title={view.charAt(0).toUpperCase() + view.slice(1)} sub="Industry Portal" role="CSR Manager" avatar="DC" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {view === "messages" && (
            <div className="bg-white rounded-xl border border-slate-200/60 flex h-[500px] overflow-hidden">
              <div className="w-1/3 border-r border-slate-200 bg-slate-50/50 flex flex-col">
                <div className="p-3 border-b border-slate-200"><input placeholder="Search messages..." className="w-full px-3 py-1.5 text-sm rounded border border-slate-200" /></div>
                <div className="flex-1 overflow-y-auto">
                  <div className="p-3 border-b border-slate-200 bg-white cursor-pointer border-l-2 border-l-orange-500">
                    <div className="font-semibold text-sm text-slate-800">Dr. Anjali Mishra</div>
                    <div className="text-xs text-slate-500 truncate">The pilot data report is ready for your review.</div>
                  </div>
                  <div className="p-3 border-b border-slate-200 hover:bg-white cursor-pointer transition-colors">
                    <div className="font-semibold text-sm text-slate-800">Govt. Admin</div>
                    <div className="text-xs text-slate-500 truncate">Please approve the Phase 2 funding release.</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-slate-200 font-semibold text-slate-800">Dr. Anjali Mishra <span className="text-xs text-slate-400 font-normal ml-2">BIT Mesra</span></div>
                <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-3">
                  <div className="bg-white p-3 rounded-lg rounded-tl-none max-w-md text-sm border border-slate-200 shadow-sm">Hello, the pilot data report for the last 30 days is ready for your review.</div>
                  <div className="bg-orange-600 text-white p-3 rounded-lg rounded-tr-none max-w-md text-sm ml-auto shadow-sm">Great, I will review it today. Can we schedule a brief call tomorrow?</div>
                </div>
                <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
                  <input placeholder="Type a message..." className="flex-1 px-3 py-2 text-sm rounded border border-slate-200 focus:outline-none focus:border-orange-500" />
                  <button className="px-4 py-2 bg-orange-600 text-white rounded text-sm font-semibold">Send</button>
                </div>
              </div>
            </div>
          )}
          {view === "notifications" && (
            <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
              {[
                { title: "New AI Match Found", body: "An infrastructure project in Gumla has an 87% match with your CSR goals.", time: "2h ago", unread: true },
                { title: "Mentorship Request", body: "VidyutSeva team requested technical mentorship.", time: "1d ago", unread: false },
              ].map((n, i) => (
                <div key={i} className={`p-4 ${n.unread ? "bg-orange-50/50" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-800 text-sm">{n.title}</span>
                    <span className="text-xs text-slate-400 font-mono">{n.time}</span>
                  </div>
                  <p className="text-sm text-slate-600">{n.body}</p>
                </div>
              ))}
            </div>
          )}
          {view === "profile" && (
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 max-w-2xl">
              <SectionHeader title="Organization Profile" />
              <div className="space-y-4 mt-4 text-sm text-slate-700">
                <div><label className="text-xs text-slate-500 block mb-1">Organization Name</label><div className="font-semibold">Demo CSR Foundation</div></div>
                <div><label className="text-xs text-slate-500 block mb-1">CSR Focus Areas</label>
                  <div className="flex gap-2 mt-1">
                    {["Water", "Education", "Healthcare", "Rural Dev"].map(t => <span key={t} className="bg-slate-100 px-2 py-1 rounded text-xs">{t}</span>)}
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-slate-100 mt-4"><label>Email Alerts</label><input type="checkbox" defaultChecked className="accent-orange-600" /></div>
                <div className="flex items-center justify-between py-3"><label>AI Matching Enabled</label><input type="checkbox" defaultChecked className="accent-orange-600" /></div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Generic fallback
  return (
    <Layout>
      <Topbar title="Not Found" sub="" role="CSR Manager" avatar="DC" />
      <div className="flex-1 p-6 text-center mt-16 text-slate-400">
        <div className="text-4xl mb-3">🚧</div>
        <div className="text-sm">Section under construction</div>
      </div>
    </Layout>
  );
}
