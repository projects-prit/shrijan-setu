import React, { useState } from "react";
import { DEMO_CHALLENGE, TIMELINE_STEPS } from "../data/demo";
import { StatusBadge, AIBadge, DistrictBadge, KPICard, SectionHeader, DataTable, Sidebar, Topbar, TabBar, Timeline } from "../components/ui";

type View = "login" | "dashboard" | "assigned" | "challenge-detail" | "kanban"
  | "team" | "students" | "faculty" | "proposal" | "workspace"
  | "milestones" | "tasks" | "documents" | "discussion" | "industry-collab"
  | "analytics" | "notifications" | "settings";

const TEAM_MEMBERS = [
  { name: "Arjun Kumar", role: "Team Lead", dept: "Civil Engineering", year: "4th Year", skills: ["IoT", "Water Eng", "Field Survey"], avatar: "AK" },
  { name: "Priya Hansda", role: "IoT Developer", dept: "Electronics", year: "3rd Year", skills: ["Arduino", "MQTT", "Python"], avatar: "PH" },
  { name: "Rohit Minz", role: "Data Analyst", dept: "CSE", year: "4th Year", skills: ["ML", "Python", "Power BI"], avatar: "RM" },
  { name: "Sunita Oraon", role: "Community Liaison", dept: "Social Science", year: "3rd Year", skills: ["Rural Dev", "Survey", "Hindi/Mundari"], avatar: "SO" },
  { name: "Deepak Sahu", role: "Civil Engineer", dept: "Civil Engineering", year: "3rd Year", skills: ["Infrastructure", "AutoCAD"], avatar: "DS" },
  { name: "Kavita Sharma", role: "Documentation", dept: "MBA", year: "2nd Year", skills: ["Report Writing", "CSR"], avatar: "KS" },
];

const MILESTONES = [
  { name: "Problem Understanding & Literature Review", due: "28 Feb 2026", status: "Completed", progress: 100 },
  { name: "Field Survey — 12 Village Visits", due: "15 Mar 2026", status: "Completed", progress: 100 },
  { name: "IoT Prototype Development", due: "30 Apr 2026", status: "Completed", progress: 100 },
  { name: "Pilot Installation (12 villages)", due: "30 Jun 2026", status: "Completed", progress: 100 },
  { name: "Pilot Monitoring & Evaluation", due: "15 Jul 2026", status: "Completed", progress: 100 },
  { name: "Final Report & Deployment Plan", due: "31 Aug 2026", status: "In Progress", progress: 65 },
  { name: "Scale-up Rollout (District-wide)", due: "30 Sep 2026", status: "Upcoming", progress: 0 },
];

export default function UniversityApp({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("login");
  const [kanbanCol, setKanbanCol] = useState("New");
  const [tab, setTab] = useState("Overview");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "assigned", label: "Assigned Challenges", icon: "📥", badge: 48 },
    { id: "kanban", label: "Kanban Board", icon: "📋" },
    { id: "team", label: "Team Formation", icon: "👥" },
    { id: "students", label: "Student Directory", icon: "🎓" },
    { id: "faculty", label: "Faculty Mentors", icon: "👨‍🏫" },
    { id: "proposal", label: "Proposal Builder", icon: "📝" },
    { id: "workspace", label: "Project Workspace", icon: "⚙️" },
    { id: "milestones", label: "Milestones", icon: "🚀" },
    { id: "tasks", label: "Tasks", icon: "✅" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "industry-collab", label: "Industry Link", icon: "🏭" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "notifications", label: "Notifications", icon: "🔔", badge: 5 },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ] as const;

  if (view === "login") {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: "#1a0a3e" }}>
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#7c3aed" }}>🎓</div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>University Portal</h1>
            <p className="text-purple-300 text-sm">BIT Mesra — Societal Innovation Wing</p>
          </div>
          <div className="space-y-3 mb-4">
            {[{ l: "Institution ID", v: "BIT-MESRA-001", t: "text" }, { l: "Password", v: "••••••••", t: "password" }].map(f => (
              <div key={f.l}>
                <label className="text-xs text-purple-300 font-mono block mb-1">{f.l.toUpperCase()}</label>
                <input type={f.t} defaultValue={f.v} className="w-full px-4 py-3 rounded-xl text-white text-sm border border-white/10 outline-none" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
            ))}
          </div>
          <button onClick={() => setView("dashboard")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#7c3aed" }}>
            Sign In
          </button>
          <button onClick={onBack} className="mt-4 w-full text-center text-sm text-purple-400 hover:text-purple-300">← Back to Portal</button>
        </div>
      </div>
    );
  }

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="h-full flex flex-col">
      <div className="h-10 px-4 flex items-center justify-between border-b flex-shrink-0" style={{ background: "#1a0a3e", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center text-sm" style={{ background: "#7c3aed" }}>🎓</div>
          <span className="text-xs font-semibold text-white">BIT Mesra</span>
          <span className="text-[10px] text-purple-400 font-mono">| JanSamadhan Innovation Wing</span>
        </div>
        <button onClick={onBack} className="text-xs text-purple-400 hover:text-purple-300 px-2 py-1 rounded border border-white/10">← Exit</button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          items={navItems as any}
          active={view}
          onSelect={(id) => setView(id as View)}
          footer={
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#7c3aed" }}>AM</div>
              <div>
                <div className="text-xs font-semibold text-slate-700">Dr. Anjali Mishra</div>
                <div className="text-[10px] text-slate-400">Faculty Coordinator</div>
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
        <Topbar title="BIT Mesra Innovation Dashboard" sub="Societal Innovation Wing — Active Projects" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <KPICard label="Assigned Challenges" value="48" trend="+6" icon="📥" />
            <KPICard label="Active Projects" value="31" sub="Across 5 departments" icon="⚙️" />
            <KPICard label="Completed" value="17" trend="+3" icon="✅" />
            <KPICard label="Impact Score" value="4.7/5" sub="Government rating" icon="⭐" />
          </div>

          {/* Featured project */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:border-slate-300 transition-all" onClick={() => setView("workspace")}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">{DEMO_CHALLENGE.id}</span>
                <StatusBadge status="Pilot Completed" size="sm" />
              </div>
              <AIBadge confidence={94} />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">{DEMO_CHALLENGE.title}</h3>
            <p className="text-xs text-slate-500 mb-3">Team JalRakshak · 6 students · {DEMO_CHALLENGE.district}</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { l: "Beneficiaries", v: "2,450" },
                { l: "Funding", v: "₹12L" },
                { l: "Partner", v: "Demo CSR" },
                { l: "Completion", v: "82%" },
              ].map(s => (
                <div key={s.l} className="bg-slate-50 rounded p-2 text-center">
                  <div className="font-bold text-slate-800 text-sm">{s.v}</div>
                  <div className="text-[10px] text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="Active Projects" />
              <div className="space-y-2">
                {[
                  { id: DEMO_CHALLENGE.id, name: "JalRakshak — Water IoT", status: "Pilot Completed", pct: 82 },
                  { id: "JH-2026-00489", name: "VidyutSeva — Solar Grid", status: "In Execution", pct: 55 },
                  { id: "JH-2026-00312", name: "KrishiTech — Soil Sensors", status: "Team Formed", pct: 28 },
                ].map(p => (
                  <div key={p.id} className="flex items-center gap-3 py-1">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-slate-700 mb-1">{p.name}</div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: "#7c3aed" }} />
                      </div>
                    </div>
                    <StatusBadge status={p.status} size="xs" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="Recent Activity" />
              <div className="space-y-2">
                {[
                  { icon: "🚀", text: "JalRakshak pilot evaluation submitted", time: "2h" },
                  { icon: "💬", text: "Dr. Sharma commented on proposal draft", time: "4h" },
                  { icon: "📋", text: "Milestone 5 marked complete", time: "1d" },
                  { icon: "🏭", text: "Demo CSR requested progress report", time: "2d" },
                  { icon: "📥", text: "New challenge assigned — Healthcare, Simdega", time: "3d" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span>{a.icon}</span>
                    <span className="flex-1 text-slate-600">{a.text}</span>
                    <span className="text-slate-400 font-mono">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── KANBAN ────────────────────────────────────────────────────────────────
  if (view === "kanban") {
    const cols = [
      { id: "New", label: "New", color: "#94a3b8", challenges: [{ id: "JH-2026-00537", title: "Malnourishment in Simdega", domain: "Healthcare", priority: "Critical" }] },
      { id: "Under Review", label: "Under Review", color: "#f59e0b", challenges: [{ id: "JH-2026-00523", title: "Girls Dropout Rate — Dumka", domain: "Education", priority: "High" }] },
      { id: "Team Formed", label: "Team Formed", color: "#8b5cf6", challenges: [{ id: "JH-2026-00501", title: "Soil Degradation — Hazaribagh", domain: "Agriculture", priority: "Medium" }] },
      { id: "Proposal Submitted", label: "Proposal Submitted", color: "#3b82f6", challenges: [] },
      { id: "In Execution", label: "In Execution", color: "#0891b2", challenges: [{ id: "JH-2026-00489", title: "Electricity Supply — Gumla", domain: "Infrastructure", priority: "High" }] },
      { id: "Pilot Completed", label: "Pilot Completed", color: "#059669", challenges: [{ id: DEMO_CHALLENGE.id, title: DEMO_CHALLENGE.title, domain: DEMO_CHALLENGE.domain, priority: DEMO_CHALLENGE.priority }] },
    ];

    return (
      <Layout>
        <Topbar title="Kanban Board" sub="Challenge pipeline view" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-x-auto p-4">
          <div className="flex gap-3 min-w-max h-full">
            {cols.map(col => (
              <div key={col.id} className="w-52 flex flex-col">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
                  <span className="text-xs font-semibold text-slate-700">{col.label}</span>
                  <span className="ml-auto text-xs text-slate-400 font-mono">{col.challenges.length}</span>
                </div>
                <div className="flex-1 bg-slate-100 rounded-xl p-2 space-y-2 min-h-32">
                  {col.challenges.map(c => (
                    <div
                      key={c.id}
                      className="bg-white rounded-lg border border-slate-200 p-3 cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all"
                      onClick={() => setView("workspace")}
                    >
                      <div className="font-mono text-[10px] text-slate-400 mb-1">{c.id}</div>
                      <div className="text-xs font-semibold text-slate-700 leading-snug mb-1.5">{c.title}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">{c.domain}</span>
                        <span className="text-[10px] font-medium" style={{ color: c.priority === "Critical" ? "#e11d48" : c.priority === "High" ? "#f59e0b" : "#64748b" }}>{c.priority}</span>
                      </div>
                    </div>
                  ))}
                  {col.challenges.length === 0 && (
                    <div className="flex items-center justify-center h-20 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                      No challenges
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // ── TEAM FORMATION ────────────────────────────────────────────────────────
  if (view === "team") {
    return (
      <Layout>
        <Topbar title="Team Formation — JalRakshak" sub={DEMO_CHALLENGE.id} role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <SectionHeader title="Team Members" sub="6 students selected" />
              <StatusBadge status="Team Formed" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TEAM_MEMBERS.map(m => (
                <div key={m.name} className="border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#7c3aed" }}>{m.avatar}</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{m.name}</div>
                      <div className="text-xs text-slate-500">{m.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">{m.dept} · {m.year}</div>
                  <div className="flex flex-wrap gap-1">
                    {m.skills.map(s => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Faculty Mentors" />
            {[
              { name: "Dr. Anjali Mishra", dept: "Water Technology & Civil Engg", role: "Primary Mentor", avatar: "AM" },
              { name: "Prof. Ravi Shankar", dept: "Electronics & IoT", role: "Technical Advisor", avatar: "RS" },
            ].map(f => (
              <div key={f.name} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#142040" }}>{f.avatar}</div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{f.name}</div>
                  <div className="text-xs text-slate-500">{f.dept} · {f.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // ── PROJECT WORKSPACE ─────────────────────────────────────────────────────
  if (view === "workspace") {
    return (
      <Layout>
        <Topbar title="Project Workspace — JalRakshak" sub={DEMO_CHALLENGE.id} role="Dr. Anjali Mishra" avatar="AM" />
        <div className="px-4 pt-3 border-b border-slate-200 bg-white">
          <TabBar tabs={["Overview", "Milestones", "Tasks", "Documents", "Discussion", "Industry"]} active={tab} onSelect={setTab} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "Overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <KPICard label="Progress" value="82%" trend="+12%" icon="📊" />
                <KPICard label="Beneficiaries" value="2,450" icon="👥" />
                <KPICard label="Funding Used" value="₹9.8L" sub="of ₹12L" icon="💰" />
                <KPICard label="Days Left" value="18" sub="to final report" icon="📅" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <SectionHeader title="Challenge Context" />
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{DEMO_CHALLENGE.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ l: "District", v: "Khunti" }, { l: "Domain", v: "Water Resources" }, { l: "Affected", v: "2,450" }, { l: "Partner", v: "Demo CSR Foundation" }].map(f => (
                      <div key={f.l} className="bg-slate-50 rounded p-2">
                        <div className="text-[10px] text-slate-400">{f.l}</div>
                        <div className="text-xs font-semibold text-slate-700">{f.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <SectionHeader title="Solution Summary" />
                  <p className="text-sm text-slate-600 leading-relaxed">{DEMO_CHALLENGE.solution}. Sensors installed on 40 hand-pumps across 12 villages, transmitting real-time data to cloud dashboard. Predictive alerts sent to maintenance teams 48h before failure.</p>
                  <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-700">
                    ✅ 94% uptime achieved vs 60% baseline · 3.2h avg response time vs 4.8 weeks
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === "Milestones" && (
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <SectionHeader title="Project Milestones" />
              <div className="space-y-3">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${m.status === "Completed" ? "bg-emerald-500 text-white" : m.status === "In Progress" ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-400"}`}>
                      {m.status === "Completed" ? "✓" : i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">{m.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{m.due}</div>
                      {m.status === "In Progress" && (
                        <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${m.progress}%` }} />
                        </div>
                      )}
                    </div>
                    <StatusBadge status={m.status} size="xs" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "Industry" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <SectionHeader title="Industry Partner — Demo CSR Foundation" />
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[{ l: "Funding", v: "₹12,00,000" }, { l: "Mentorship", v: "4 sessions" }, { l: "Status", v: "Active" }].map(f => (
                    <div key={f.l} className="bg-slate-50 rounded p-3 text-center">
                      <div className="font-bold text-slate-800">{f.v}</div>
                      <div className="text-xs text-slate-500">{f.l}</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-600">Demo CSR Foundation has been actively involved since March 2026. They have sponsored 40 IoT sensor units and provided mentorship from their water infrastructure team.</div>
              </div>
            </div>
          )}
          {(tab === "Tasks" || tab === "Documents" || tab === "Discussion") && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 text-center text-slate-400">
              <div className="text-3xl mb-3">{tab === "Tasks" ? "✅" : tab === "Documents" ? "📄" : "💬"}</div>
              <div className="text-sm">{tab} workspace for JalRakshak team</div>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // ── MILESTONES ────────────────────────────────────────────────────────────
  if (view === "milestones") {
    return (
      <Layout>
        <Topbar title="Milestones" sub="All projects" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="JalRakshak — Milestone Tracker" />
            <div className="space-y-3">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-slate-100 last:border-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold ${m.status === "Completed" ? "bg-emerald-500 text-white" : m.status === "In Progress" ? "bg-blue-500 text-white animate-pulse" : "bg-slate-100 text-slate-400"}`}>
                    {m.status === "Completed" ? "✓" : m.status === "In Progress" ? "●" : i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800">{m.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 font-mono">Due: {m.due}</div>
                    {m.progress > 0 && m.progress < 100 && (
                      <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${m.progress}%`, background: "#7c3aed" }} />
                      </div>
                    )}
                  </div>
                  <StatusBadge status={m.status} size="xs" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── PROPOSAL ─────────────────────────────────────────────────────────────
  if (view === "proposal") {
    return (
      <Layout>
        <Topbar title="Proposal Builder" sub={DEMO_CHALLENGE.id} role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <SectionHeader title="IoT Predictive Maintenance System" sub="JH-2026-00472 — Submitted 10 Mar 2026" />
              <StatusBadge status="Proposal Submitted" />
            </div>
            {[
              { l: "Problem Statement", v: DEMO_CHALLENGE.description },
              { l: "Proposed Solution", v: "Deploy IoT sensors on all hand-pumps in 12 Torpa villages. Real-time data transmitted via LoRa gateway to cloud dashboard. ML model predicts failure 48h in advance, sends SMS alerts to village volunteers and maintenance team." },
              { l: "Expected Outcomes", v: "• 90%+ pump uptime (vs 60% baseline)\n• Emergency response <4 hours (vs 4 weeks)\n• 2,450 people with reliable water access\n• Scalable to 200+ villages district-wide" },
              { l: "Budget Summary", v: "IoT Hardware: ₹4,80,000 | Installation: ₹1,20,000 | Software: ₹2,00,000 | Training: ₹80,000 | Monitoring: ₹1,20,000 | Contingency: ₹2,00,000 | TOTAL: ₹12,00,000" },
            ].map(f => (
              <div key={f.l} className="mb-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">{f.l}</label>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // ── INDUSTRY COLLAB ───────────────────────────────────────────────────────
  if (view === "industry-collab") {
    return (
      <Layout>
        <Topbar title="Industry Collaboration" sub="Active partnerships" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="font-semibold text-emerald-800 mb-1">🏭 Demo CSR Foundation — JH-2026-00472</div>
            <div className="text-sm text-emerald-700">Active partnership · ₹12L committed · 4 mentorship sessions completed</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Collaboration Timeline" />
            <Timeline steps={TIMELINE_STEPS.filter(s => ["Industry Connected", "Execution Started", "Pilot Completed", "Solution Deployment"].includes(s.step))} />
          </div>
        </div>
      </Layout>
    );
  }

  // ── ASSIGNED CHALLENGES ───────────────────────────────────────────────────
  if (view === "assigned") {
    return (
      <Layout>
        <Topbar title="Assigned Challenges" sub="48 challenges waiting for team formation" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-4">
            <DataTable
              columns={[
                { key: "id", label: "ID", width: "120px" },
                { key: "title", label: "Challenge" },
                { key: "domain", label: "Domain", width: "140px" },
                { key: "priority", label: "Priority", width: "100px" },
                { key: "assigned", label: "Assigned Date", width: "120px" },
              ]}
              rows={[
                { id: <span className="font-mono text-xs text-slate-500">JH-2026-00612</span>, title: <span className="text-sm font-semibold text-slate-800">Irrigation canal blockage</span>, domain: <span className="text-xs text-slate-600">Agriculture</span>, priority: <span className="text-xs font-bold text-rose-600">High</span>, assigned: <span className="text-xs font-mono text-slate-500">08 Sep 2026</span> },
                { id: <span className="font-mono text-xs text-slate-500">JH-2026-00615</span>, title: <span className="text-sm font-semibold text-slate-800">Primary school roof repair</span>, domain: <span className="text-xs text-slate-600">Infrastructure</span>, priority: <span className="text-xs font-bold text-amber-500">Medium</span>, assigned: <span className="text-xs font-mono text-slate-500">07 Sep 2026</span> },
                { id: <span className="font-mono text-xs text-slate-500">JH-2026-00620</span>, title: <span className="text-sm font-semibold text-slate-800">Medical supply chain gap</span>, domain: <span className="text-xs text-slate-600">Healthcare</span>, priority: <span className="text-xs font-bold text-rose-600">Critical</span>, assigned: <span className="text-xs font-mono text-slate-500">06 Sep 2026</span> },
              ]}
              onRowClick={() => setView("kanban")}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── STUDENTS & FACULTY DIRECTORY ──────────────────────────────────────────
  if (view === "students" || view === "faculty") {
    return (
      <Layout>
        <Topbar title={view === "students" ? "Student Directory" : "Faculty Mentors"} sub="Innovation Wing Members" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {(view === "students" ? TEAM_MEMBERS : [
              { name: "Dr. Anjali Mishra", role: "Primary Mentor", dept: "Water Technology", skills: ["Hydrology", "Policy"], avatar: "AM" },
              { name: "Prof. Ravi Shankar", role: "Technical Advisor", dept: "Electronics", skills: ["IoT", "Embedded"], avatar: "RS" },
              { name: "Dr. S. K. Singh", role: "Civil Expert", dept: "Civil Engg", skills: ["Structures", "Planning"], avatar: "SK" },
            ]).map((person, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-md shadow-purple-500/20 mb-3">{person.avatar}</div>
                <h3 className="font-semibold text-slate-800">{person.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{person.dept} · {person.role}</p>
                <div className="flex flex-wrap gap-1 justify-center mt-auto">
                  {person.skills.map(s => <span key={s} className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-200 rounded">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // ── ANALYTICS ─────────────────────────────────────────────────────────────
  if (view === "analytics") {
    return (
      <Layout>
        <Topbar title="University Analytics" sub="Performance metrics" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200/60 p-5">
              <SectionHeader title="Project Completion Rate" />
              <div className="flex items-center justify-center h-48 text-slate-400 border border-dashed border-slate-200 rounded-lg bg-slate-50">
                [ Chart Placeholder: Completion vs Target ]
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200/60 p-5">
              <SectionHeader title="Student Participation by Dept" />
              <div className="flex items-center justify-center h-48 text-slate-400 border border-dashed border-slate-200 rounded-lg bg-slate-50">
                [ Chart Placeholder: Dept Distribution ]
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── TASKS, DOCUMENTS, DISCUSSION ──────────────────────────────────────────
  if (view === "tasks" || view === "documents" || view === "discussion") {
    return (
      <Layout>
        <Topbar title={view.charAt(0).toUpperCase() + view.slice(1)} sub="Project Level Management" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-12 text-center text-slate-400">
            <div className="text-5xl mb-4">{view === "tasks" ? "✅" : view === "documents" ? "📄" : "💬"}</div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">{view.charAt(0).toUpperCase() + view.slice(1)} Module</h2>
            <p className="text-sm">Please navigate to a specific Project Workspace to view its {view}.</p>
            <button onClick={() => setView("workspace")} className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">Go to Workspace</button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── NOTIFICATIONS & SETTINGS ──────────────────────────────────────────────
  if (view === "notifications" || view === "settings") {
    return (
      <Layout>
        <Topbar title={view.charAt(0).toUpperCase() + view.slice(1)} sub="Portal Management" role="Dr. Anjali Mishra" avatar="AM" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {view === "notifications" ? (
            <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
              {[
                { title: "New Challenge Assigned", body: "Government assigned JH-2026-00612 to your university.", time: "2h ago", unread: true },
                { title: "Milestone Approved", body: "Government approved Milestone 3 for JalRakshak.", time: "1d ago", unread: false },
                { title: "Student Request", body: "Rohan Kumar requested to join Team JalRakshak.", time: "2d ago", unread: false },
              ].map((n, i) => (
                <div key={i} className={`p-4 ${n.unread ? "bg-purple-50/50" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-800 text-sm">{n.title}</span>
                    <span className="text-xs text-slate-400 font-mono">{n.time}</span>
                  </div>
                  <p className="text-sm text-slate-600">{n.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 max-w-2xl">
              <SectionHeader title="Preferences" />
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-center justify-between py-2 border-b border-slate-100"><label>Email Notifications</label><input type="checkbox" defaultChecked /></div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100"><label>Auto-accept High Match Challenges</label><input type="checkbox" /></div>
                <div className="flex items-center justify-between py-2"><label>Dark Mode</label><input type="checkbox" /></div>
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
      <Topbar title="Not Found" sub="" role="Dr. Anjali Mishra" avatar="AM" />
      <div className="flex-1 overflow-y-auto p-6 text-center mt-16 text-slate-400">
        <div className="text-4xl mb-3">🚧</div>
        <div className="text-sm">Section under construction</div>
      </div>
    </Layout>
  );
}
