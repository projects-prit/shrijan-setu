import React from "react";

// ── Status Badge ─────────────────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  "Pilot Completed": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "In Execution": "bg-blue-100 text-blue-700 border-blue-300",
  "Team Formed": "bg-purple-100 text-purple-700 border-purple-300",
  "Proposal Submitted": "bg-amber-100 text-amber-700 border-amber-300",
  "Under Review": "bg-orange-100 text-orange-700 border-orange-300",
  "Validated": "bg-teal-100 text-teal-700 border-teal-300",
  "New": "bg-slate-100 text-slate-600 border-slate-300",
  "Resolved": "bg-green-100 text-green-700 border-green-300",
  "Active": "bg-blue-100 text-blue-700 border-blue-300",
  "Pending": "bg-amber-100 text-amber-700 border-amber-300",
  "Critical": "bg-red-100 text-red-700 border-red-300",
  "High": "bg-orange-100 text-orange-700 border-orange-300",
  "Medium": "bg-amber-100 text-amber-700 border-amber-300",
  "Low": "bg-green-100 text-green-700 border-green-300",
};

export function StatusBadge({ status, size = "sm" }: { status: string; size?: "xs" | "sm" | "md" }) {
  const cls = statusColors[status] || "bg-slate-100 text-slate-600 border-slate-300";
  const sz = size === "xs" ? "text-[10px] px-1.5 py-0.5" : size === "md" ? "text-sm px-3 py-1" : "text-xs px-2 py-0.5";
  return (
    <span className={`inline-flex items-center font-mono font-medium border rounded-sm ${cls} ${sz}`}>
      {status}
    </span>
  );
}

export function PriorityDot({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    Critical: "bg-red-500",
    High: "bg-orange-500",
    Medium: "bg-amber-500",
    Low: "bg-green-500",
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${map[priority] || "bg-slate-400"}`} />;
}

export function AIBadge({ confidence }: { confidence: number }) {
  const color = confidence >= 90 ? "text-emerald-600" : confidence >= 75 ? "text-amber-600" : "text-red-600";
  return (
    <span className={`font-mono text-xs font-semibold ${color} bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-sm`}>
      AI {confidence}%
    </span>
  );
}

export function DistrictBadge({ district }: { district: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-navy-600 bg-navy-50 border border-navy-200 px-2 py-0.5 rounded-sm" style={{ color: "#2a4580", background: "#f5f7fc", borderColor: "#bed0ec" }}>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      {district}
    </span>
  );
}

// ── KPI Card ─────────────────────────────────────────────────────────────────
export function KPICard({ label, value, sub, trend, icon, color = "navy" }: {
  label: string; value: string; sub?: string; trend?: string; icon: string; color?: string;
}) {
  const trendPositive = trend?.startsWith("+");
  return (
    <div className="glass border border-slate-200/60 rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group cursor-default">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">{icon}</div>
        {trend && (
          <span className={`text-xs font-mono font-bold px-2 py-1 rounded-full ${trendPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-1">
        <div className="text-3xl font-heading font-bold tracking-tight text-slate-800">{value}</div>
        <div className="text-sm font-medium text-slate-500 mt-1">{label}</div>
        {sub && <div className="text-xs text-slate-400 mt-1.5">{sub}</div>}
      </div>
    </div>
  );
}

// ── Challenge Card ────────────────────────────────────────────────────────────
export function ChallengeCard({ challenge, onClick, compact = false }: { challenge: any; onClick?: () => void; compact?: boolean }) {
  return (
    <div
      onClick={onClick}
      className={`glass border border-slate-200/60 rounded-2xl hover:border-slate-300 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${compact ? "p-4" : "p-5"}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-mono text-xs text-slate-400 font-semibold bg-slate-50 px-2 py-0.5 rounded">{challenge.id}</span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <PriorityDot priority={challenge.priority} />
          <StatusBadge status={challenge.status} />
        </div>
      </div>
      <h3 className={`font-semibold text-slate-800 leading-snug ${compact ? "text-sm" : "text-base"} mb-3`}>{challenge.title}</h3>
      <div className="flex flex-wrap gap-2">
        <DistrictBadge district={challenge.district} />
        <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md font-medium">{challenge.domain}</span>
        {challenge.aiConfidence && <AIBadge confidence={challenge.aiConfidence} />}
      </div>
      {!compact && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
          <span className="text-slate-500 flex items-center gap-1.5"><span className="text-sm">👥</span> {challenge.population?.toLocaleString()} affected</span>
          {challenge.funding && <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">₹{(challenge.funding / 100000).toFixed(1)}L</span>}
        </div>
      )}
    </div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = "#3a5fa0", label }: { value: number; max?: number; color?: string; label?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{label}</span><span className="font-mono font-medium">{value}/{max}</span></div>}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
export function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="font-bold text-slate-800 text-lg leading-tight">{title}</h2>
        {sub && <p className="text-sm text-slate-500 mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────
export function Timeline({ steps }: { steps: Array<{ step: string; date: string; actor: string; status: "done" | "current" | "upcoming"; icon: string }> }) {
  return (
    <div className="space-y-0">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 flex-shrink-0
              ${s.status === "done" ? "bg-emerald-500 border-emerald-500 text-white" :
                s.status === "current" ? "bg-blue-500 border-blue-500 text-white animate-pulse" :
                "bg-white border-slate-300 text-slate-400"}`}>
              {s.status === "done" ? "✓" : s.icon}
            </div>
            {i < steps.length - 1 && <div className={`w-0.5 flex-1 my-1 ${s.status === "done" ? "bg-emerald-300" : "bg-slate-200"}`} />}
          </div>
          <div className={`pb-4 ${i === steps.length - 1 ? "" : ""}`}>
            <div className={`text-sm font-semibold ${s.status === "upcoming" ? "text-slate-400" : "text-slate-800"}`}>{s.step}</div>
            <div className="text-xs text-slate-500 font-mono">{s.date}</div>
            <div className={`text-xs mt-0.5 ${s.status === "upcoming" ? "text-slate-400" : "text-slate-600"}`}>{s.actor}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Mobile Nav ────────────────────────────────────────────────────────────────
export function MobileBottomNav({ tabs, active, onSelect }: { tabs: Array<{ id: string; label: string; icon: string }>; active: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex items-center border-t border-slate-200 bg-white">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${active === t.id ? "text-blue-600" : "text-slate-400"}`}
          style={active === t.id ? { color: "#1e3060" } : {}}
        >
          <span className="text-lg">{t.icon}</span>
          <span className="text-[9px] font-medium">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
export function Sidebar({ items, active, onSelect, footer }: {
  items: Array<{ id: string; label: string; icon: string; badge?: number }>;
  active: string;
  onSelect: (id: string) => void;
  footer?: React.ReactNode;
}) {
  return (
    <div className="w-64 flex-shrink-0 flex flex-col glass border-r border-slate-200/60 h-full z-10">
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left group
              ${active === item.id
                ? "bg-gradient-to-r from-navy-700 to-navy-800 text-white shadow-md shadow-navy-900/20"
                : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm border border-transparent hover:border-slate-200"}`}
          >
            <span className={`text-lg w-6 text-center transition-transform ${active === item.id ? "scale-110" : "group-hover:scale-110"}`}>{item.icon}</span>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge != null && (
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${active === item.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      {footer && <div className="p-4 border-t border-slate-200/60 bg-white/50">{footer}</div>}
    </div>
  );
}

// ── DataTable ─────────────────────────────────────────────────────────────────
export function DataTable({ columns, rows, onRowClick }: {
  columns: Array<{ key: string; label: string; width?: string }>;
  rows: Array<Record<string, React.ReactNode>>;
  onRowClick?: (row: any) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map(c => (
              <th key={c.key} className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wide" style={c.width ? { width: c.width } : {}}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-slate-100 last:border-0 ${onRowClick ? "cursor-pointer hover:bg-slate-50" : ""} transition-colors`}
            >
              {columns.map(c => (
                <td key={c.key} className="py-2.5 px-3">{row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Topbar ────────────────────────────────────────────────────────────────────
export function Topbar({ title, sub, role, avatar, actions }: {
  title: string; sub?: string; role: string; avatar: string; actions?: React.ReactNode;
}) {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200/60 glass flex-shrink-0 z-10 sticky top-0">
      <div>
        <div className="font-heading font-bold text-slate-800 text-lg">{title}</div>
        {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
      </div>
      <div className="flex items-center gap-4">
        {actions}
        <button className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 text-base hover:bg-slate-100 hover:scale-105 transition-all text-slate-600">🔔</button>
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <div className="text-sm font-semibold text-slate-700 leading-none">{role}</div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono">Verified</div>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-900/20 bg-gradient-to-br from-navy-700 to-navy-900">{avatar}</div>
        </div>
      </div>
    </div>
  );
}

// ── Tab Bar ───────────────────────────────────────────────────────────────────
export function TabBar({ tabs, active, onSelect }: { tabs: string[]; active: string; onSelect: (t: string) => void }) {
  return (
    <div className="flex gap-0 border-b border-slate-200">
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px
            ${active === t ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          style={active === t ? { borderColor: "#1e3060", color: "#1e3060" } : {}}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
