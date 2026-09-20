import React, { useState } from 'react';
import { Download, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { timeSeriesData, themeDistributionData } from '../govtMockData';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsReportsTab({ showToast }) {
  const [dateRange, setDateRange] = useState('YTD');
  const [compare, setCompare] = useState(true);

  const handleExport = () => {
    showToast("Impact Report generated and downloaded successfully.");
  };

  const COLORS = ['#1F3864', '#2E7D32', '#C55A11', '#0284C7', '#7C3AED'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Analytics & Reports</h2>
          <p className="text-gray-500 mt-1">Exportable metrics and trends for policy reporting.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
            <Calendar size={16} className="text-gray-400" />
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="text-sm font-semibold text-gray-700 outline-none bg-transparent">
              <option value="30D">Last 30 Days</option>
              <option value="Q3">Q3 2026</option>
              <option value="YTD">Year to Date (YTD)</option>
              <option value="ALL">All Time</option>
            </select>
          </div>
          <button onClick={handleExport} className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-semibold hover:bg-green-800 flex items-center gap-2 shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-semibold text-gray-500 uppercase">Submissions Trend</div>
          <div className="flex items-end gap-3 mt-2 mb-4">
            <div className="text-3xl font-black text-gray-900">373</div>
            {compare && <div className="flex items-center text-sm font-bold text-[#2E7D32] mb-1"><ArrowUpRight size={16}/> 12.5%</div>}
          </div>
          <div className="text-xs text-gray-400">vs previous period</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-semibold text-gray-500 uppercase">Resolution Rate</div>
          <div className="flex items-end gap-3 mt-2 mb-4">
            <div className="text-3xl font-black text-gray-900">47.4%</div>
            {compare && <div className="flex items-center text-sm font-bold text-[#2E7D32] mb-1"><ArrowUpRight size={16}/> 4.1%</div>}
          </div>
          <div className="text-xs text-gray-400">vs previous period</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-semibold text-gray-500 uppercase">Avg Time to Resolve</div>
          <div className="flex items-end gap-3 mt-2 mb-4">
            <div className="text-3xl font-black text-gray-900">145 days</div>
            {compare && <div className="flex items-center text-sm font-bold text-[#C55A11] mb-1"><ArrowUpRight size={16}/> 5 days</div>}
          </div>
          <div className="text-xs text-gray-400">vs previous period (lower is better)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-[#1F3864] mb-6">Submissions vs Resolutions (Over Time)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData}>
                <defs>
                  <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1F3864" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1F3864" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis tickLine={false} axisLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="submitted" stroke="#1F3864" strokeWidth={2} fillOpacity={1} fill="url(#colorSub)" name="Challenges Submitted" />
                <Area type="monotone" dataKey="resolved" stroke="#2E7D32" strokeWidth={2} fillOpacity={1} fill="url(#colorRes)" name="Solutions Deployed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-[#1F3864] mb-6">Theme Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={themeDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {themeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
