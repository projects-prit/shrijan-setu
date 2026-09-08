import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MONTHLY_TRENDS, DOMAINS, DISTRICTS } from "../data/demo";

const COLORS = ["#3a5fa0", "#059669", "#f59e0b", "#e11d48", "#8b5cf6", "#0891b2", "#65a30d", "#94a3b8"];

export function TrendChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={MONTHLY_TRENDS} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="gSubmitted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3a5fa0" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#3a5fa0" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#059669" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #e2e8f0", borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
        <Area type="monotone" dataKey="submitted" stroke="#3a5fa0" strokeWidth={2} fill="url(#gSubmitted)" name="Submitted" />
        <Area type="monotone" dataKey="validated" stroke="#8aaad8" strokeWidth={1.5} fill="none" name="Validated" strokeDasharray="4 2" />
        <Area type="monotone" dataKey="resolved" stroke="#059669" strokeWidth={2} fill="url(#gResolved)" name="Resolved" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DomainChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={DOMAINS} dataKey="count" nameKey="name" cx="45%" cy="50%" outerRadius={75} innerRadius={40}>
          {DOMAINS.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #e2e8f0", borderRadius: 4 }} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DistrictBar() {
  const top8 = DISTRICTS.slice(0, 8);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={top8} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={58} />
        <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #e2e8f0", borderRadius: 4 }} />
        <Bar dataKey="active" stackId="a" fill="#3a5fa0" name="Active" radius={[0, 0, 0, 0]} />
        <Bar dataKey="resolved" stackId="a" fill="#059669" name="Resolved" radius={[0, 2, 2, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function FunnelChart() {
  const data = [
    { stage: "Submitted", value: 1847, color: "#3a5fa0" },
    { stage: "Validated", value: 1243, color: "#5a7ec0" },
    { stage: "Assigned", value: 891, color: "#8aaad8" },
    { stage: "In Progress", value: 312, color: "#f59e0b" },
    { stage: "Resolved", value: 687, color: "#059669" },
  ];
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="text-xs text-slate-500 w-20 text-right">{d.stage}</div>
          <div className="flex-1 h-6 bg-slate-100 rounded-sm overflow-hidden">
            <div className="h-full rounded-sm flex items-center px-2" style={{ width: `${(d.value / 1847) * 100}%`, background: d.color }}>
              <span className="text-white text-xs font-mono font-semibold">{d.value.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MiniSparkline({ data, color = "#3a5fa0" }: { data: number[]; color?: string }) {
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * 80}`);
  return (
    <svg viewBox="0 0 100 60" className="w-16 h-8" preserveAspectRatio="none">
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
