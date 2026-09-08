import React, { useState } from "react";
import { DEMO_CHALLENGE, STATS, DOMAINS, CHALLENGES, TIMELINE_STEPS, UNIVERSITIES, INDUSTRY_PARTNERS } from "../data/demo";
import { StatusBadge, AIBadge, DistrictBadge, PriorityDot, KPICard, SectionHeader, ChallengeCard, DataTable, Sidebar, Topbar, TabBar, Timeline } from "../components/ui";
import { TrendChart, DomainChart, DistrictBar, FunnelChart } from "../components/charts";

type View = "login" | "dashboard" | "validation-queue" | "challenge-review" | "ai-console" | "routing"
  | "challenge-detail" | "pipeline" | "district-analytics" | "institution-performance"
  | "industry-engagement" | "impact-dashboard" | "reports" | "audit-logs" | "admin-settings";

export default function GovernmentApp({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("login");
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", badge: undefined },
    { id: "validation-queue", label: "Validation Queue", icon: "📥", badge: 23 },
    { id: "challenge-review", label: "Challenge Review", icon: "🔍" },
    { id: "ai-console", label: "AI Console", icon: "🤖" },
    { id: "pipeline", label: "Project Pipeline", icon: "📋" },
    { id: "district-analytics", label: "District Analytics", icon: "🗺️" },
    { id: "institution-performance", label: "Institutions", icon: "🎓" },
    { id: "industry-engagement", label: "Industry", icon: "🏭" },
    { id: "impact-dashboard", label: "Impact", icon: "🌟" },
    { id: "reports", label: "Reports", icon: "📄" },
    { id: "audit-logs", label: "Audit Logs", icon: "📝" },
    { id: "admin-settings", label: "Settings", icon: "⚙️" },
  ] as const;

  if (view === "login") {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: "#0d1526" }}>
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#e06000" }}>🏛️</div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Government Portal</h1>
            <p className="text-slate-400 text-sm">Department of Higher & Technical Education<br />Government of Jharkhand</p>
          </div>
          <div className="space-y-3 mb-4">
            {[{ l: "Employee ID", v: "JH-DHTE-2847", t: "text" }, { l: "Password", v: "••••••••••", t: "password" }].map(f => (
              <div key={f.l}>
                <label className="text-xs text-slate-400 font-mono block mb-1">{f.l.toUpperCase()}</label>
                <input type={f.t} defaultValue={f.v} className="w-full px-4 py-3 rounded-xl text-white text-sm border border-white/10 outline-none focus:border-orange-500/50" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
            ))}
          </div>
          <button onClick={() => setView("dashboard")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#e06000" }}>
            Sign In with eGov SSO
          </button>
          <button onClick={onBack} className="mt-4 w-full text-center text-sm text-slate-500 hover:text-slate-400">← Back to Portal</button>
        </div>
      </div>
    );
  }

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="h-full flex flex-col">
      <div className="h-10 px-4 flex items-center justify-between border-b flex-shrink-0" style={{ background: "#0d1526", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center text-sm" style={{ background: "#e06000" }}>🌱</div>
          <span className="text-xs font-semibold text-white">JanSamadhan</span>
          <span className="text-[10px] text-slate-500 font-mono">|</span>
          <span className="text-[10px] text-slate-400 font-mono">Jharkhand Societal Innovation Command Centre</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-300 px-2 py-1 rounded border border-white/10">← Exit</button>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          items={navItems as any}
          active={view}
          onSelect={(id) => setView(id as View)}
          footer={
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#1e3060" }}>VS</div>
              <div>
                <div className="text-xs font-semibold text-slate-700">Sh. Vikram Singh</div>
                <div className="text-[10px] text-slate-400">Dy. Secretary, DHTE</div>
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
        <Topbar title="Jharkhand Societal Innovation Command Centre" sub="Real-time overview of the innovation ecosystem" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* KPI Row */}
          <div className="grid grid-cols-4 gap-3">
            <KPICard label="Total Challenges" value="1,847" sub="23 new this week" trend="+12%" icon="📝" />
            <KPICard label="Validated" value="1,243" sub="67% validation rate" trend="+8%" icon="✅" />
            <KPICard label="Active Projects" value="312" sub="Across 24 districts" trend="+5%" icon="⚙️" />
            <KPICard label="Citizens Impacted" value="2,84,500" sub="Estimated beneficiaries" trend="+18%" icon="👥" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <KPICard label="Resolved" value="687" sub="In last 12 months" trend="+22%" icon="🏆" />
            <KPICard label="Industry Partners" value="47" sub="Active CSR funders" trend="+3%" icon="🏭" />
            <KPICard label="Funding Committed" value="₹8.94 Cr" sub="Total CSR pledged" trend="+31%" icon="💰" />
            <KPICard label="Solutions Deployed" value="156" sub="Full deployment done" trend="+9%" icon="🚀" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Trend Chart */}
            <div className="col-span-2 bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="Challenge Trends" sub="Submissions, validations and resolutions (12 months)" />
              <TrendChart />
            </div>
            {/* Domain Distribution */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="Domain Distribution" />
              <DomainChart />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Pipeline Funnel */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="Pipeline Funnel" sub="Challenge progression stages" />
              <FunnelChart />
            </div>
            {/* District Overview */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="Top Districts" />
              <DistrictBar />
            </div>
            {/* Activity Feed */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="Live Activity" sub="Last 2 hours" />
              <div className="space-y-2">
                {[
                  { icon: "📝", text: "New challenge submitted — Simdega, Healthcare", time: "5m" },
                  { icon: "🤖", text: "AI classified JH-2026-00537 — Critical, 96%", time: "6m" },
                  { icon: "✅", text: "JH-2026-00489 validated by Officer Sharma", time: "22m" },
                  { icon: "🚀", text: "JH-2026-00472 pilot completed — 2,450 beneficiaries", time: "2h" },
                  { icon: "💰", text: "Demo CSR Foundation committed ₹12L to JH-2026-00472", time: "3h" },
                  { icon: "🎓", text: "BIT Mesra submitted milestone report — JalRakshak", time: "4h" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-sm flex-shrink-0">{a.icon}</span>
                    <span className="text-slate-600 flex-1 leading-snug">{a.text}</span>
                    <span className="text-slate-400 font-mono flex-shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Validation Queue preview */}
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Validation Queue" sub="Requires officer action" action={
              <button onClick={() => setView("validation-queue")} className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: "#142040" }}>View All (23)</button>
            } />
            <DataTable
              columns={[
                { key: "id", label: "ID", width: "120px" },
                { key: "title", label: "Challenge" },
                { key: "district", label: "District", width: "100px" },
                { key: "domain", label: "Domain", width: "130px" },
                { key: "priority", label: "Priority", width: "90px" },
                { key: "ai", label: "AI Score", width: "90px" },
                { key: "status", label: "Status", width: "110px" },
              ]}
              rows={CHALLENGES.map(c => ({
                id: <span className="font-mono text-xs text-slate-500">{c.id}</span>,
                title: <span className="text-xs font-medium text-slate-800">{c.title}</span>,
                district: <DistrictBadge district={c.district} />,
                domain: <span className="text-xs text-slate-600">{c.domain}</span>,
                priority: <span className="flex items-center gap-1.5"><PriorityDot priority={c.priority} /><span className="text-xs">{c.priority}</span></span>,
                ai: <AIBadge confidence={c.aiConfidence} />,
                status: <StatusBadge status={c.status} />,
              }))}
              onRowClick={() => setView("challenge-review")}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── VALIDATION QUEUE ──────────────────────────────────────────────────────
  if (view === "validation-queue") {
    return (
      <Layout>
        <Topbar title="Validation Queue" sub="23 challenges pending officer review" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <input placeholder="Search challenges..." className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
              <span className="absolute left-2.5 top-2.5 text-slate-400 text-sm">🔍</span>
            </div>
            {["All", "Critical", "High", "Medium", "Water", "Healthcare", "Agriculture"].map(f => (
              <button key={f} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${f === "All" ? "text-white border-transparent" : "text-slate-600 border-slate-200 hover:border-slate-300 bg-white"}`} style={f === "All" ? { background: "#142040" } : {}}>
                {f}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-lg border border-slate-200">
            <DataTable
              columns={[
                { key: "id", label: "ID", width: "120px" },
                { key: "title", label: "Challenge" },
                { key: "district", label: "District", width: "100px" },
                { key: "domain", label: "Domain", width: "120px" },
                { key: "priority", label: "Priority", width: "90px" },
                { key: "ai", label: "AI Score", width: "90px" },
                { key: "affected", label: "Affected", width: "80px" },
                { key: "actions", label: "", width: "120px" },
              ]}
              rows={CHALLENGES.map(c => ({
                id: <span className="font-mono text-xs text-slate-500">{c.id}</span>,
                title: <span className="text-xs font-medium text-slate-800 leading-snug">{c.title}</span>,
                district: <DistrictBadge district={c.district} />,
                domain: <span className="text-xs text-slate-600">{c.domain}</span>,
                priority: <span className="flex items-center gap-1.5"><PriorityDot priority={c.priority} /><span className="text-xs">{c.priority}</span></span>,
                ai: <AIBadge confidence={c.aiConfidence} />,
                affected: <span className="font-mono text-xs text-slate-600">{c.population?.toLocaleString()}</span>,
                actions: (
                  <div className="flex gap-1">
                    <button onClick={() => setView("challenge-review")} className="px-2 py-1 rounded text-xs font-medium text-white" style={{ background: "#059669" }}>Validate</button>
                    <button className="px-2 py-1 rounded text-xs font-medium text-slate-600 border border-slate-200">Review</button>
                  </div>
                ),
              }))}
              onRowClick={() => setView("challenge-review")}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── CHALLENGE REVIEW ──────────────────────────────────────────────────────
  if (view === "challenge-review") {
    return (
      <Layout>
        <Topbar title="Challenge Review" sub={DEMO_CHALLENGE.id} role="Dy. Secretary, DHTE" avatar="VS" actions={
          <button onClick={() => setView("validation-queue")} className="text-xs text-slate-500 hover:text-slate-700">← Queue</button>
        } />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Main content */}
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-xs text-slate-400 mb-1">{DEMO_CHALLENGE.id}</div>
                    <h2 className="text-lg font-bold text-slate-800 leading-snug">{DEMO_CHALLENGE.title}</h2>
                  </div>
                  <StatusBadge status={DEMO_CHALLENGE.status} size="md" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{DEMO_CHALLENGE.description}</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { l: "District", v: DEMO_CHALLENGE.district },
                    { l: "Domain", v: DEMO_CHALLENGE.domain },
                    { l: "Priority", v: DEMO_CHALLENGE.priority },
                    { l: "Population", v: DEMO_CHALLENGE.population.toLocaleString() },
                    { l: "Location", v: DEMO_CHALLENGE.location },
                    { l: "Submitted", v: "15 Jan 2026" },
                  ].map(f => (
                    <div key={f.l} className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs text-slate-500 mb-0.5">{f.l}</div>
                      <div className="text-sm font-semibold text-slate-800">{f.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <SectionHeader title="Evidence Uploaded" sub="2 photos by citizen" />
                <div className="flex gap-3">
                  {[
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
                  ].map((src, i) => (
                    <div key={i} className="rounded-lg overflow-hidden w-40 h-28 bg-slate-100">
                      <img src={src} alt="Evidence" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation Action */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <SectionHeader title="Validation Decision" />
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Officer Notes</label>
                    <textarea rows={3} defaultValue="Challenge verified through field report from BDO Torpa. High priority water access issue affecting tribal community. Recommend immediate university routing to BIT Mesra Water Technology dept." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-blue-400" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setView("ai-console")} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#142040" }}>
                      ✅ Validate & Route
                    </button>
                    <button className="px-4 py-2.5 rounded-lg text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200">
                      Request More Info
                    </button>
                    <button className="px-4 py-2.5 rounded-lg text-sm font-medium text-red-700 bg-red-50 border border-red-200">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* AI Analysis preview */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">🤖</span>
                  <span className="text-sm font-semibold text-slate-700">AI Classification</span>
                  <AIBadge confidence={DEMO_CHALLENGE.aiConfidence} />
                </div>
                <div className="space-y-2">
                  {[
                    { l: "Primary Domain", v: "Water Resources" },
                    { l: "Sub-Domain", v: "Rural WASH" },
                    { l: "Priority Score", v: "8.7/10" },
                    { l: "Urgency", v: "High" },
                    { l: "Complexity", v: "Medium" },
                  ].map(f => (
                    <div key={f.l} className="flex justify-between text-xs">
                      <span className="text-slate-500">{f.l}</span>
                      <span className="font-semibold text-slate-700">{f.v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setView("ai-console")} className="mt-3 w-full py-2 rounded-lg text-xs font-medium text-slate-600 border border-slate-200 hover:border-slate-300 transition-colors">
                  View AI Console →
                </button>
              </div>

              {/* Similar challenges */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="text-sm font-semibold text-slate-700 mb-3">Similar Challenges</div>
                <div className="space-y-2 text-xs">
                  {["JH-2025-00312 — Gumla, Water (Resolved)", "JH-2025-00445 — Simdega, Water (Resolved)", "JH-2026-00011 — Lohardaga, Water (Active)"].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600">
                      <span className="text-slate-300">•</span>{s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended university */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                <div className="text-sm font-semibold text-blue-800 mb-2">🎓 Recommended Routing</div>
                <div className="text-sm font-bold text-blue-900">BIT Mesra</div>
                <div className="text-xs text-blue-700 mt-1">Water Technology Dept. · 94% domain match · 4 active water projects</div>
                <button onClick={() => setView("routing")} className="mt-2 w-full py-2 rounded-lg text-xs font-semibold text-white bg-blue-600">
                  Route to University →
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── AI CONSOLE ────────────────────────────────────────────────────────────
  if (view === "ai-console") {
    return (
      <Layout>
        <Topbar title="AI Classification Console" sub={DEMO_CHALLENGE.id} role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <div>
                  <div className="font-semibold text-slate-800">AI Classification Report</div>
                  <div className="text-xs text-slate-400 font-mono">Processed: 15 Jan 2026, 14:23 IST</div>
                </div>
                <AIBadge confidence={94} />
              </div>
              {[
                { l: "Primary Domain", v: "Water Resources", conf: 94 },
                { l: "Sub-Category", v: "Rural WASH / Hand-pump", conf: 91 },
                { l: "Priority Score", v: "8.7 / 10", conf: 88 },
                { l: "Impact Category", v: "High — Tribal Community", conf: 96 },
                { l: "Solution Type", v: "Predictive Maintenance + IoT", conf: 82 },
              ].map(f => (
                <div key={f.l} className="flex items-center gap-3 mb-2.5">
                  <div className="text-xs text-slate-500 w-32">{f.l}</div>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${f.conf}%`, background: "#3a5fa0" }} />
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-700 w-16 text-right">{f.v}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="font-semibold text-slate-800 mb-3">Duplicate Detection</div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3">
                <div className="text-sm font-semibold text-emerald-800">✅ No Exact Duplicates Found</div>
                <div className="text-xs text-emerald-700 mt-1">3 similar challenges in different districts/years</div>
              </div>
              <div className="space-y-2">
                {[
                  { id: "JH-2025-00312", sim: "78%", dist: "Gumla" },
                  { id: "JH-2025-00445", sim: "71%", dist: "Simdega" },
                  { id: "JH-2026-00011", sim: "65%", dist: "Lohardaga" },
                ].map(d => (
                  <div key={d.id} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded">
                    <span className="font-mono text-slate-600">{d.id}</span>
                    <span className="text-slate-500">{d.dist}</span>
                    <span className="font-semibold text-slate-700">{d.sim} similar</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="font-semibold text-slate-800 mb-3">AI Tags & Keywords Extracted</div>
            <div className="flex flex-wrap gap-2">
              {["hand-pump failure", "rural water access", "tribal community", "khunti", "predictive maintenance", "WASH", "summer water scarcity", "Bihar-Jharkhand corridor", "India JJALP scheme", "Jal Jeevan Mission", "IoT sensors", "population 2450"].map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-mono">{tag}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="font-semibold text-slate-800 mb-3">University Matching Scores</div>
            <DataTable
              columns={[
                { key: "univ", label: "University" },
                { key: "dept", label: "Best Department" },
                { key: "match", label: "Domain Match", width: "130px" },
                { key: "capacity", label: "Capacity", width: "90px" },
                { key: "score", label: "Total Score", width: "100px" },
              ]}
              rows={[
                { univ: <span className="text-sm font-semibold text-slate-800">BIT Mesra</span>, dept: "Water Tech & Civil Engg", match: <span className="font-mono text-sm font-bold text-emerald-600">94%</span>, capacity: <span className="text-xs text-slate-600">Available</span>, score: <span className="font-mono text-sm font-bold text-blue-700">9.1/10</span> },
                { univ: <span className="text-sm text-slate-700">NIT Jamshedpur</span>, dept: "Environmental Engineering", match: <span className="font-mono text-sm font-semibold text-slate-600">82%</span>, capacity: <span className="text-xs text-slate-600">Available</span>, score: <span className="font-mono text-sm text-slate-600">7.8/10</span> },
                { univ: <span className="text-sm text-slate-700">IIT (ISM) Dhanbad</span>, dept: "Mining & Environmental", match: <span className="font-mono text-sm font-semibold text-slate-600">71%</span>, capacity: <span className="text-xs text-amber-600">Limited</span>, score: <span className="font-mono text-sm text-slate-600">7.2/10</span> },
              ]}
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setView("routing")} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#142040" }}>
              Route to BIT Mesra →
            </button>
            <button className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200">Override Routing</button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── ROUTING ───────────────────────────────────────────────────────────────
  if (view === "routing") {
    return (
      <Layout>
        <Topbar title="University Routing" sub={`${DEMO_CHALLENGE.id} → BIT Mesra`} role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold text-emerald-800">Challenge Successfully Routed</div>
              <div className="text-sm text-emerald-700">{DEMO_CHALLENGE.id} has been assigned to BIT Mesra — Water Technology Dept. on 5 Feb 2026</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="font-semibold text-slate-800 mb-3">Routing Summary</div>
              {[
                { l: "Assigned University", v: "BIT Mesra" },
                { l: "Department", v: "Water Technology & Civil Engineering" },
                { l: "Faculty Coordinator", v: "Dr. Anjali Mishra" },
                { l: "Assignment Date", v: "5 Feb 2026" },
                { l: "Response Deadline", v: "5 Mar 2026" },
                { l: "Routing Basis", v: "AI Recommendation (94% match)" },
              ].map(f => (
                <div key={f.l} className="flex justify-between text-sm py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500">{f.l}</span>
                  <span className="font-medium text-slate-800">{f.v}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="font-semibold text-slate-800 mb-3">Next Steps</div>
              <div className="space-y-2">
                {[
                  { done: true, text: "Challenge validated ✓" },
                  { done: true, text: "AI routing completed ✓" },
                  { done: true, text: "University notified ✓" },
                  { done: false, text: "University team formation (by 18 Feb)" },
                  { done: false, text: "Proposal submission (by 10 Mar)" },
                  { done: false, text: "Industry connect (after proposal)" },
                ].map((s, i) => (
                  <div key={i} className={`flex items-center gap-2 text-sm ${s.done ? "text-slate-500" : "text-slate-700"}`}>
                    <span>{s.done ? "✅" : "⏳"}</span>
                    {s.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── DISTRICT ANALYTICS ────────────────────────────────────────────────────
  if (view === "district-analytics") {
    return (
      <Layout>
        <Topbar title="District Analytics" sub="24 districts — Jharkhand" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <KPICard label="Districts Active" value="24" icon="🗺️" />
            <KPICard label="Avg. Resolution Time" value="4.2 mo" trend="-12%" icon="⏱️" />
            <KPICard label="Highest Challenges" value="Ranchi" sub="287 challenges" icon="📊" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="District Performance" />
              <DistrictBar />
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="District Summary Table" />
              <DataTable
                columns={[
                  { key: "name", label: "District" },
                  { key: "challenges", label: "Total", width: "70px" },
                  { key: "active", label: "Active", width: "70px" },
                  { key: "resolved", label: "Resolved", width: "80px" },
                ]}
                rows={[
                  { name: "Khunti", challenges: <span className="font-mono text-xs">97</span>, active: <span className="font-mono text-xs text-blue-600">21</span>, resolved: <span className="font-mono text-xs text-emerald-600">41</span> },
                  ...["Ranchi", "Dhanbad", "Bokaro", "Jamshedpur", "Hazaribagh", "Deoghar"].map(n => ({
                    name: n,
                    challenges: <span className="font-mono text-xs">{Math.floor(Math.random() * 200 + 80)}</span>,
                    active: <span className="font-mono text-xs text-blue-600">{Math.floor(Math.random() * 60 + 20)}</span>,
                    resolved: <span className="font-mono text-xs text-emerald-600">{Math.floor(Math.random() * 100 + 30)}</span>,
                  }))
                ]}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── INSTITUTIONS ──────────────────────────────────────────────────────────
  if (view === "institution-performance") {
    return (
      <Layout>
        <Topbar title="Institution Performance" sub="6 partner universities" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="University Rankings" sub="By project completion and impact metrics" />
            <DataTable
              columns={[
                { key: "rank", label: "#", width: "40px" },
                { key: "name", label: "University" },
                { key: "assigned", label: "Assigned", width: "80px" },
                { key: "active", label: "Active", width: "70px" },
                { key: "completed", label: "Done", width: "70px" },
                { key: "rating", label: "Rating", width: "80px" },
              ]}
              rows={UNIVERSITIES.map((u, i) => ({
                rank: <span className="font-mono text-xs text-slate-400">{i + 1}</span>,
                name: <span className="text-sm font-semibold text-slate-800">{u.name}</span>,
                assigned: <span className="font-mono text-xs">{u.assigned}</span>,
                active: <span className="font-mono text-xs text-blue-600">{u.active}</span>,
                completed: <span className="font-mono text-xs text-emerald-600">{u.completed}</span>,
                rating: <span className="font-mono text-xs font-bold" style={{ color: "#e06000" }}>⭐ {u.rating}</span>,
              }))}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── INDUSTRY ──────────────────────────────────────────────────────────────
  if (view === "industry-engagement") {
    return (
      <Layout>
        <Topbar title="Industry & CSR Engagement" sub="47 active partners" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <KPICard label="Active Partners" value="47" trend="+3" icon="🏭" />
            <KPICard label="Total Funding" value="₹8.94 Cr" trend="+31%" icon="💰" />
            <KPICard label="Projects Funded" value="67" trend="+9" icon="📋" />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Top Industry Partners" />
            <DataTable
              columns={[
                { key: "name", label: "Partner" },
                { key: "domain", label: "Focus Domains" },
                { key: "funding", label: "Funding", width: "120px" },
                { key: "projects", label: "Projects", width: "80px" },
                { key: "status", label: "Status", width: "90px" },
              ]}
              rows={INDUSTRY_PARTNERS.map(p => ({
                name: <span className="text-sm font-semibold text-slate-800">{p.name}</span>,
                domain: <span className="text-xs text-slate-500">{p.domain}</span>,
                funding: <span className="font-mono text-sm font-semibold text-slate-700">₹{(p.funding / 100000).toFixed(1)}L</span>,
                projects: <span className="font-mono text-xs">{p.projects}</span>,
                status: <StatusBadge status={p.status} />,
              }))}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── IMPACT DASHBOARD ──────────────────────────────────────────────────────
  if (view === "impact-dashboard") {
    return (
      <Layout>
        <Topbar title="Impact Dashboard" sub="Societal outcomes across Jharkhand" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <KPICard label="Citizens Impacted" value="2,84,500" trend="+18%" icon="👥" />
            <KPICard label="Solutions Deployed" value="156" trend="+9%" icon="🚀" />
            <KPICard label="Villages Covered" value="892" trend="+15%" icon="🏘️" />
            <KPICard label="Districts Active" value="24/24" icon="🗺️" />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Impact by Domain" />
            <div className="space-y-3">
              {DOMAINS.slice(0, 6).map(d => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="text-xs text-slate-600 w-32">{d.name}</div>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(d.count / 312) * 100}%`, background: d.color }} />
                  </div>
                  <div className="text-xs font-mono text-slate-600 w-20 text-right">{(d.count * 140).toLocaleString()} people</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="font-semibold text-emerald-800 mb-2">🏆 Featured Success — JH-2026-00472</div>
            <p className="text-sm text-emerald-700">Khunti hand-pump IoT system has improved water access for 2,450 tribal citizens. 94% pump uptime achieved vs 60% baseline. Pilot expanded to 3 additional districts.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // ── PROJECT PIPELINE ──────────────────────────────────────────────────────
  if (view === "pipeline") {
    return (
      <Layout>
        <Topbar title="Project Pipeline" sub="312 active projects across universities" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-4">
            <SectionHeader title="Active Projects" />
            <DataTable
              columns={[
                { key: "id", label: "Project ID", width: "120px" },
                { key: "title", label: "Title" },
                { key: "univ", label: "University", width: "160px" },
                { key: "status", label: "Stage", width: "140px" },
                { key: "funding", label: "Funding", width: "100px" },
              ]}
              rows={[
                { id: <span className="font-mono text-xs text-slate-500">JH-2026-00472</span>, title: <span className="text-xs font-medium text-slate-800">JalRakshak IoT System</span>, univ: <span className="text-xs text-slate-600">BIT Mesra</span>, status: <StatusBadge status="Pilot Completed" />, funding: <span className="font-mono text-xs text-emerald-600">₹12.0L</span> },
                { id: <span className="font-mono text-xs text-slate-500">JH-2026-00489</span>, title: <span className="text-xs font-medium text-slate-800">Solar Grid Repair</span>, univ: <span className="text-xs text-slate-600">NIT Jamshedpur</span>, status: <StatusBadge status="In Execution" />, funding: <span className="font-mono text-xs text-emerald-600">₹18.0L</span> },
                { id: <span className="font-mono text-xs text-slate-500">JH-2026-00523</span>, title: <span className="text-xs font-medium text-slate-800">School App Development</span>, univ: <span className="text-xs text-slate-600">VBU Hazaribagh</span>, status: <StatusBadge status="Team Formed" />, funding: <span className="text-xs text-slate-400">Pending</span> },
                { id: <span className="font-mono text-xs text-slate-500">JH-2026-00540</span>, title: <span className="text-xs font-medium text-slate-800">Agri-Drone Spraying</span>, univ: <span className="text-xs text-slate-600">Ranchi University</span>, status: <StatusBadge status="Proposal Submitted" />, funding: <span className="text-xs text-slate-400">Under Review</span> },
              ]}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── REPORTS ───────────────────────────────────────────────────────────────
  if (view === "reports") {
    return (
      <Layout>
        <Topbar title="Reports & Analytics" sub="Generate and download data reports" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Monthly Impact Summary", desc: "Detailed breakdown of resolved challenges and citizens impacted in the last 30 days.", format: "PDF" },
              { title: "District Needs Assessment", desc: "AI-generated report on emerging problem clusters across 24 districts.", format: "PDF" },
              { title: "CSR Fund Utilization", desc: "Financial summary of industry commitments, disbursements, and project burn rates.", format: "Excel" },
              { title: "University Performance", desc: "Ranking and milestone adherence stats for all 6 partner institutions.", format: "CSV" },
            ].map(r => (
              <div key={r.title} className="bg-white rounded-xl border border-slate-200/60 p-5 flex items-center justify-between hover:shadow-lg transition-all cursor-pointer group">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{r.title}</h3>
                  <p className="text-xs text-slate-500 max-w-[80%]">{r.desc}</p>
                </div>
                <button className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-blue-600">
                  <span className="text-2xl">⬇️</span>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{r.format}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // ── AUDIT LOGS ────────────────────────────────────────────────────────────
  if (view === "audit-logs") {
    const logs = [
      { ts: "09 Sep 2026, 14:22:11", user: "Vikram Singh (Gov)", action: "ROUTE_CHALLENGE", resource: "JH-2026-00537", ip: "10.1.0.43" },
      { ts: "09 Sep 2026, 14:18:05", user: "AI_ENGINE_v3", action: "CLASSIFY", resource: "JH-2026-00537", ip: "internal" },
      { ts: "09 Sep 2026, 14:15:33", user: "citizen:98765", action: "SUBMIT", resource: "JH-2026-00537", ip: "103.24.x.x" },
      { ts: "09 Sep 2026, 12:00:00", user: "Dr. Anjali Mishra", action: "MILESTONE_COMPLETE", resource: "JH-2026-00472", ip: "14.97.x.x" },
      { ts: "09 Sep 2026, 10:30:22", user: "Demo CSR", action: "FUNDING_RELEASE", resource: "JH-2026-00472", ip: "49.36.x.x" },
    ];
    return (
      <Layout>
        <Topbar title="System Audit Logs" sub="Complete immutable activity trail" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-4">
            <DataTable
              columns={[
                { key: "ts", label: "Timestamp", width: "160px" },
                { key: "user", label: "Actor", width: "160px" },
                { key: "action", label: "Action", width: "160px" },
                { key: "resource", label: "Resource", width: "140px" },
                { key: "ip", label: "IP/Source" },
              ]}
              rows={logs.map(l => ({
                ts: <span className="font-mono text-xs text-slate-500">{l.ts}</span>,
                user: <span className="font-medium text-xs text-blue-700">{l.user}</span>,
                action: <span className="font-mono text-xs font-bold text-slate-700">{l.action}</span>,
                resource: <span className="font-mono text-xs text-orange-600">{l.resource}</span>,
                ip: <span className="font-mono text-xs text-slate-400">{l.ip}</span>,
              }))}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── ADMIN SETTINGS ────────────────────────────────────────────────────────
  if (view === "admin-settings") {
    return (
      <Layout>
        <Topbar title="Platform Configuration" sub="Manage routing and thresholds" role="Dy. Secretary, DHTE" avatar="VS" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-5 max-w-3xl">
            <SectionHeader title="System Toggles" />
            <div className="space-y-4">
              {[
                { l: "Auto-Routing (AI Confidence > 90%)", state: true },
                { l: "SMS Notifications for Citizens", state: true },
                { l: "Public Impact Dashboard Data Sync", state: true },
                { l: "Maintenance Mode", state: false },
              ].map(s => (
                <div key={s.l} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-slate-700">{s.l}</span>
                  <div className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${s.state ? "bg-emerald-500 justify-end" : "bg-slate-300 justify-start"}`}>
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── FALLBACK ──────────────────────────────────────────────────────────────
  return (
    <Layout>
      <Topbar title="Not Found" sub="" role="Dy. Secretary, DHTE" avatar="VS" />
      <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <div className="text-4xl mb-3">🚧</div>
          <div className="text-sm">This section is under construction</div>
        </div>
      </div>
    </Layout>
  );
}
