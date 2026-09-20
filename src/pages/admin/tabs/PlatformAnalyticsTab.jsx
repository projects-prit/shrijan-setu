import React from 'react';
import { Download, Calendar, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function PlatformAnalyticsTab() {
  const themeData = [
    { name: 'Water Resources', value: 400 },
    { name: 'Agriculture', value: 300 },
    { name: 'Education', value: 300 },
    { name: 'Infrastructure', value: 200 },
  ];
  const COLORS = ['#1F3864', '#2E7D32', '#C55A11', '#9333EA'];

  const handleExport = () => {
    alert("Exporting Platform Report as PDF...");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Platform Analytics</h2>
          <p className="text-sm text-gray-500">Aggregated insights across all domains and regions.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Calendar size={16}/> Last 30 Days
          </button>
          <button onClick={handleExport} className="px-4 py-2 bg-[#1F3864] text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-[#152746]">
            <Download size={16}/> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1F3864] mb-4">Challenges by Theme</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={themeData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {themeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1F3864] mb-4">Engagement Leaderboard</h3>
          <div className="space-y-4">
            {['BIT Mesra (HEI)', 'Tata Steel Foundation (Industry)', 'NIT Jamshedpur (HEI)', 'Ranchi University (HEI)'].map((name, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-500">#{i+1}</div>
                  <span className="text-sm font-semibold text-gray-700">{name}</span>
                </div>
                <div className="text-sm font-bold text-[#1F3864]">{120 - i*20} pts</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
