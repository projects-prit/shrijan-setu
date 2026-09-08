import React, { useState } from "react";
import { UNIVERSITIES, INDUSTRY_PARTNERS } from "../data/demo";
import { StatusBadge, KPICard, SectionHeader, DataTable, Sidebar, Topbar } from "../components/ui";

type View = "login" | "users" | "institutions" | "industry" | "categories" | "routing" | "ai-config" | "notifications-tmpl" | "audit" | "settings";

export default function AdminApp({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("login");

  const navItems = [
    { id: "users", label: "Users", icon: "👤" },
    { id: "institutions", label: "Institutions", icon: "🎓" },
    { id: "industry", label: "Industry Partners", icon: "🏭" },
    { id: "categories", label: "Categories", icon: "🏷️" },
    { id: "routing", label: "Routing Rules", icon: "🔀" },
    { id: "ai-config", label: "AI Configuration", icon: "🤖" },
    { id: "notifications-tmpl", label: "Notif. Templates", icon: "📣" },
    { id: "audit", label: "Audit Logs", icon: "📝" },
    { id: "settings", label: "Platform Settings", icon: "⚙️" },
  ] as const;

  if (view === "login") {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: "#0f172a" }}>
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 bg-slate-700">⚙️</div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Admin Console</h1>
            <p className="text-slate-400 text-sm">JanSamadhan Platform Administration</p>
          </div>
          <div className="space-y-3 mb-4">
            {[{ l: "Admin Username", v: "superadmin@jansamadhan.gov.in", t: "text" }, { l: "Password", v: "••••••••", t: "password" }].map(f => (
              <div key={f.l}>
                <label className="text-xs text-slate-400 font-mono block mb-1">{f.l.toUpperCase()}</label>
                <input type={f.t} defaultValue={f.v} className="w-full px-4 py-3 rounded-xl text-white text-sm border border-white/10 outline-none" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
            ))}
          </div>
          <button onClick={() => setView("users")} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm bg-slate-700 hover:bg-slate-600 transition-colors">
            Sign In (MFA Required)
          </button>
          <button onClick={onBack} className="mt-4 w-full text-center text-sm text-slate-500">← Back to Portal</button>
        </div>
      </div>
    );
  }

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="h-full flex flex-col">
      <div className="h-10 px-4 flex items-center justify-between border-b flex-shrink-0 bg-slate-900 border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-white">JanSamadhan Admin Console</span>
          <span className="text-[10px] text-slate-500 font-mono">v2.4.1</span>
        </div>
        <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-300 px-2 py-1 rounded border border-white/10">← Exit</button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          items={navItems as any}
          active={view}
          onSelect={(id) => setView(id as View)}
          footer={
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white bg-slate-600 flex-shrink-0">SA</div>
              <div>
                <div className="text-xs font-semibold text-slate-700">Super Admin</div>
                <div className="text-[10px] text-slate-400">System</div>
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

  if (view === "users") {
    const users = [
      { name: "Sh. Vikram Singh", role: "Government Officer", email: "vikram.singh@dhte.jh.gov.in", status: "Active", last: "2 min ago" },
      { name: "Dr. Anjali Mishra", role: "University Faculty", email: "anjali@bitmesra.ac.in", status: "Active", last: "15 min ago" },
      { name: "Ramesh Kumar Oraon", role: "Citizen", email: "—", status: "Active", last: "2h ago" },
      { name: "Demo CSR Foundation", role: "Industry Partner", email: "csr@democsr.org", status: "Active", last: "1d ago" },
      { name: "Arjun Kumar", role: "Student", email: "arjun@bitmesra.ac.in", status: "Active", last: "3h ago" },
    ];
    return (
      <Layout>
        <Topbar title="User Management" sub={`${users.length} registered users shown`} role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <KPICard label="Total Users" value="12,847" trend="+234" icon="👤" />
            <KPICard label="Government" value="142" icon="🏛️" />
            <KPICard label="University" value="1,204" icon="🎓" />
            <KPICard label="Citizens" value="11,247" icon="👥" />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Recent Users" />
            <DataTable
              columns={[
                { key: "name", label: "Name" },
                { key: "role", label: "Role", width: "160px" },
                { key: "email", label: "Email" },
                { key: "status", label: "Status", width: "90px" },
                { key: "last", label: "Last Active", width: "100px" },
              ]}
              rows={users.map(u => ({
                name: <span className="text-sm font-medium text-slate-800">{u.name}</span>,
                role: <span className="text-xs text-slate-500">{u.role}</span>,
                email: <span className="font-mono text-xs text-slate-500">{u.email}</span>,
                status: <StatusBadge status={u.status} size="xs" />,
                last: <span className="font-mono text-xs text-slate-400">{u.last}</span>,
              }))}
            />
          </div>
        </div>
      </Layout>
    );
  }

  if (view === "institutions") {
    return (
      <Layout>
        <Topbar title="Institutions" sub="6 partner universities" role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Partner Universities" />
            <DataTable
              columns={[
                { key: "name", label: "Institution" },
                { key: "code", label: "Code", width: "80px" },
                { key: "assigned", label: "Assigned", width: "80px" },
                { key: "active", label: "Active", width: "70px" },
                { key: "rating", label: "Rating", width: "80px" },
                { key: "status", label: "Status", width: "80px" },
              ]}
              rows={UNIVERSITIES.map(u => ({
                name: <span className="text-sm font-semibold text-slate-800">{u.name}</span>,
                code: <span className="font-mono text-xs text-slate-500">{u.code}</span>,
                assigned: <span className="font-mono text-xs">{u.assigned}</span>,
                active: <span className="font-mono text-xs text-blue-600">{u.active}</span>,
                rating: <span className="text-xs font-semibold" style={{ color: "#e06000" }}>⭐ {u.rating}</span>,
                status: <StatusBadge status="Active" size="xs" />,
              }))}
            />
          </div>
        </div>
      </Layout>
    );
  }

  if (view === "ai-config") {
    return (
      <Layout>
        <Topbar title="AI Configuration" sub="Classification & routing engine settings" role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <KPICard label="Model Version" value="v3.2.1" sub="Last updated 2 Aug" icon="🤖" />
            <KPICard label="Avg Confidence" value="91.4%" trend="+1.2%" icon="🎯" />
            <KPICard label="Classifications" value="1,847" sub="All time" icon="📊" />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Classification Thresholds" />
            <div className="space-y-4">
              {[
                { l: "Minimum confidence for auto-validate", v: 90, unit: "%" },
                { l: "Duplicate detection threshold", v: 85, unit: "%" },
                { l: "High priority population cutoff", v: 1000, unit: "people" },
                { l: "Critical urgency score", v: 9, unit: "/10" },
              ].map(s => (
                <div key={s.l} className="flex items-center gap-4">
                  <div className="text-sm text-slate-600 flex-1">{s.l}</div>
                  <div className="flex items-center gap-2">
                    <input type="range" min="0" max="100" defaultValue={s.v} className="w-24" />
                    <div className="font-mono text-sm font-bold text-slate-700 w-20">{s.v}{s.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Routing Algorithm" />
            <div className="space-y-3">
              {[
                { l: "Domain match weight", v: 40 },
                { l: "University capacity weight", v: 25 },
                { l: "Past performance weight", v: 20 },
                { l: "Geographic proximity", v: 15 },
              ].map(w => (
                <div key={w.l} className="flex items-center gap-3">
                  <div className="text-sm text-slate-600 flex-1">{w.l}</div>
                  <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${w.v}%` }} />
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-700 w-8">{w.v}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (view === "audit") {
    const logs = [
      { ts: "03 Sep 2026, 14:22:11", user: "vikram.singh", action: "VALIDATE", resource: "JH-2026-00537", ip: "10.1.0.43" },
      { ts: "03 Sep 2026, 14:18:05", user: "AI_ENGINE", action: "CLASSIFY", resource: "JH-2026-00537", ip: "internal" },
      { ts: "03 Sep 2026, 14:15:33", user: "citizen:98765", action: "SUBMIT", resource: "JH-2026-00537", ip: "103.24.x.x" },
      { ts: "03 Sep 2026, 12:00:00", user: "anjali.mishra@bitmesra", action: "MILESTONE_COMPLETE", resource: "JH-2026-00472", ip: "14.97.x.x" },
      { ts: "03 Sep 2026, 10:30:22", user: "democsr@partner", action: "FUNDING_RELEASE", resource: "JH-2026-00472", ip: "49.36.x.x" },
    ];
    return (
      <Layout>
        <Topbar title="Audit Logs" sub="Complete system activity trail" role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <DataTable
              columns={[
                { key: "ts", label: "Timestamp", width: "180px" },
                { key: "user", label: "Actor" },
                { key: "action", label: "Action", width: "140px" },
                { key: "resource", label: "Resource", width: "140px" },
                { key: "ip", label: "IP", width: "120px" },
              ]}
              rows={logs.map(l => ({
                ts: <span className="font-mono text-xs text-slate-500">{l.ts}</span>,
                user: <span className="font-mono text-xs text-blue-600">{l.user}</span>,
                action: <span className="font-mono text-xs font-semibold text-slate-700">{l.action}</span>,
                resource: <span className="font-mono text-xs text-orange-600">{l.resource}</span>,
                ip: <span className="font-mono text-xs text-slate-400">{l.ip}</span>,
              }))}
            />
          </div>
        </div>
      </Layout>
    );
  }

  if (view === "routing") {
    return (
      <Layout>
        <Topbar title="Routing Rules" sub="AI-driven challenge assignment logic" role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <SectionHeader title="Domain → University Mapping" />
            <div className="space-y-2">
              {[
                { domain: "Water Resources", univ: "BIT Mesra (primary), NIT Jamshedpur (backup)" },
                { domain: "Agriculture", univ: "Ranchi University (primary), VBU (backup)" },
                { domain: "Education", univ: "VBU (primary), XLRI (backup)" },
                { domain: "Healthcare", univ: "IIT ISM Dhanbad (primary), BIT Mesra (backup)" },
                { domain: "Infrastructure", univ: "NIT Jamshedpur (primary), BIT Mesra (backup)" },
                { domain: "Digital/Tech", univ: "IIT ISM Dhanbad (primary), NIT Jamshedpur (backup)" },
              ].map(r => (
                <div key={r.domain} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm font-medium text-slate-700 w-36">{r.domain}</span>
                  <span className="text-xs text-slate-500 flex-1">{r.univ}</span>
                  <button className="text-xs text-blue-600 hover:underline">Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── INDUSTRY PARTNERS ─────────────────────────────────────────────────────
  if (view === "industry") {
    return (
      <Layout>
        <Topbar title="Industry Partners" sub="Registered CSR organizations" role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-4">
            <DataTable
              columns={[
                { key: "name", label: "Organization Name" },
                { key: "cin", label: "CIN / Registration", width: "180px" },
                { key: "projects", label: "Active Projects", width: "120px" },
                { key: "committed", label: "Total Committed", width: "140px" },
                { key: "status", label: "Status", width: "100px" },
              ]}
              rows={INDUSTRY_PARTNERS.map(p => ({
                name: <span className="text-sm font-semibold text-slate-800">{p.name}</span>,
                cin: <span className="font-mono text-xs text-slate-500">{p.cin}</span>,
                projects: <span className="text-xs">{p.active_projects}</span>,
                committed: <span className="font-mono text-xs font-semibold text-emerald-600">{p.committed_funds}</span>,
                status: <StatusBadge status={p.status} size="xs" />,
              }))}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // ── CATEGORIES ────────────────────────────────────────────────────────────
  if (view === "categories") {
    return (
      <Layout>
        <Topbar title="Category Management" sub="Domain and tag configuration" role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-5">
            <SectionHeader title="Challenge Domains" action={<button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded">Add Domain</button>} />
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Water Resources", count: 42, color: "bg-blue-100 text-blue-700" },
                { name: "Education", count: 38, color: "bg-indigo-100 text-indigo-700" },
                { name: "Agriculture", count: 29, color: "bg-emerald-100 text-emerald-700" },
                { name: "Healthcare", count: 24, color: "bg-rose-100 text-rose-700" },
                { name: "Infrastructure", count: 18, color: "bg-amber-100 text-amber-700" },
                { name: "Digital Services", count: 12, color: "bg-purple-100 text-purple-700" },
              ].map(d => (
                <div key={d.name} className="flex items-center justify-between border border-slate-200 rounded-lg p-3">
                  <div className={`text-xs px-2 py-1 rounded font-medium ${d.color}`}>{d.name}</div>
                  <div className="text-xs text-slate-400 font-mono">{d.count} challenges</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── NOTIFICATION TEMPLATES ────────────────────────────────────────────────
  if (view === "notifications-tmpl") {
    return (
      <Layout>
        <Topbar title="Notification Templates" sub="System-generated messages" role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-5">
            <SectionHeader title="SMS & Email Templates" />
            <div className="space-y-4 max-w-3xl">
              {[
                { id: "SYS_CHAL_RECEIPT", desc: "Citizen Challenge Submission Receipt", type: "SMS", tmpl: "Your challenge {CHAL_ID} regarding {DOMAIN} has been received. Track status at jansamadhan.jh.gov.in" },
                { id: "SYS_UNIV_ASSIGN", desc: "University Project Assignment", type: "Email", tmpl: "Dear {UNIV_NAME},\n\nA new challenge {CHAL_ID} ({CHAL_TITLE}) has been assigned to your institution by the Government of Jharkhand.\n\nPlease log in to the JanSamadhan portal to review." },
                { id: "SYS_CSR_MATCH", desc: "CSR AI Match Alert", type: "Email", tmpl: "Dear {PARTNER_NAME},\n\nWe found a {MATCH_SCORE}% match for your CSR objectives with project {CHAL_ID} ({CHAL_TITLE})." },
              ].map(t => (
                <div key={t.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{t.desc}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{t.id}</div>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${t.type === 'SMS' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{t.type}</span>
                  </div>
                  <textarea rows={3} defaultValue={t.tmpl} className="w-full text-xs font-mono p-2 bg-slate-50 border border-slate-200 rounded resize-none" />
                  <div className="flex justify-end mt-2">
                    <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded">Save Template</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── SETTINGS ──────────────────────────────────────────────────────────────
  if (view === "settings") {
    return (
      <Layout>
        <Topbar title="Platform Settings" sub="System configuration" role="Super Admin" avatar="SA" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-5 max-w-2xl">
            <SectionHeader title="Global Settings" />
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <div className="text-sm font-medium text-slate-800">Maintenance Mode</div>
                  <div className="text-xs text-slate-500">Disable access for non-admin users</div>
                </div>
                <input type="checkbox" className="accent-slate-800" />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <div className="text-sm font-medium text-slate-800">Public Dashboards</div>
                  <div className="text-xs text-slate-500">Allow public access to state-level statistics</div>
                </div>
                <input type="checkbox" defaultChecked className="accent-slate-800" />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <div className="text-sm font-medium text-slate-800">AI Auto-Routing</div>
                  <div className="text-xs text-slate-500">Automatically assign challenges above 90% confidence</div>
                </div>
                <input type="checkbox" defaultChecked className="accent-slate-800" />
              </div>
              <div className="py-2">
                <label className="text-sm font-medium text-slate-800 block mb-1">Data Retention Period (Days)</label>
                <input type="number" defaultValue={1095} className="w-full max-w-[200px] p-2 border border-slate-200 rounded text-sm" />
              </div>
              <button className="px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded mt-4">Save Configuration</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Generic fallback
  return (
    <Layout>
      <Topbar title="Not Found" sub="" role="Super Admin" avatar="SA" />
      <div className="flex-1 p-6 text-center mt-16 text-slate-400">
        <div className="text-4xl mb-3">🚧</div>
        <div className="text-sm">Section under construction</div>
      </div>
    </Layout>
  );
}
