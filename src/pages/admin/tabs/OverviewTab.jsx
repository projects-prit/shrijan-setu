import React, { useState, useEffect } from 'react';

const mockDailyUsers = [
  { date: 'Sep 01', Citizen: 400, HEI: 120, Industry: 45, Gov: 30 },
  { date: 'Sep 05', Citizen: 450, HEI: 135, Industry: 48, Gov: 32 },
  { date: 'Sep 10', Citizen: 600, HEI: 180, Industry: 60, Gov: 40 },
  { date: 'Sep 14', Citizen: 820, HEI: 210, Industry: 75, Gov: 55 }
];;

import { Users, AlertTriangle, Activity, AlertCircle, TrendingUp, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';


export default function OverviewTab({ setActiveTab }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setData(mockDailyUsers), 600);
  }, []);

  const stats = [
    { label: 'Total Users', value: '8,420', icon: <Users size={24} className="text-[#1F3864]" />, trend: '+12%' },
    { label: 'Pending Verifications', value: '14', icon: <CheckSquare size={24} className="text-[#C55A11]" />, trend: 'Needs action' },
    { label: 'Active Challenges', value: '312', icon: <Activity size={24} className="text-[#2E7D32]" />, trend: '+45 this week' },
    { label: 'Flagged Content', value: '5', icon: <AlertTriangle size={24} className="text-[#B02A2A]" />, trend: 'Requires review' },
    { label: 'System Uptime', value: '99.9%', icon: <Activity size={24} className="text-blue-500" />, trend: 'Stable' },
    { label: 'Open Tickets', value: '28', icon: <AlertCircle size={24} className="text-purple-500" />, trend: '4 High Priority' },
  ];

  // Helper for icons missing import
  function CheckSquare(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;
  }

  const attentionItems = [
    { type: 'Verification', title: 'JSPL CSR Foundation', detail: 'Pending since Sep 13', action: 'verification' },
    { type: 'Verification', title: 'IIT ISM Dhanbad', detail: 'Pending since Sep 14', action: 'verification' },
    { type: 'Support', title: 'Funding transfer issue', detail: 'High Priority (Industry)', action: 'support' },
    { type: 'Moderation', title: 'Spam submission test', detail: 'Flagged: High Severity', action: 'moderation' },
  ];

  const funnelData = [
    { name: 'Submitted', value: 1847 },
    { name: 'Matched', value: 1243 },
    { name: 'In Progress', value: 312 },
    { name: 'Deployed', value: 156 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Platform Overview</h2>
          <p className="text-sm text-gray-500">Real-time pulse of the SRIJAN SETU ecosystem.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold text-[#1F3864] mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-800">{stat.label}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#1F3864]">Cross-Dashboard Activity (30 Days)</h3>
              <button className="text-sm text-gray-500 hover:text-[#1F3864] flex items-center gap-1"><Filter size={16}/> Filter</button>
            </div>
            <div className="h-72">
              {data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="Citizen" stroke="#1F3864" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                    <Line type="monotone" dataKey="HEI" stroke="#2E7D32" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                    <Line type="monotone" dataKey="Industry" stroke="#C55A11" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                    <Line type="monotone" dataKey="Gov" stroke="#9333EA" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">Loading chart...</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#1F3864] mb-6">Platform-Wide Funnel (All Time)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#1F3864', fontSize: 12, fontWeight: 600}} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#1F3864" radius={[0, 4, 4, 0]} barSize={32}>
                    {
                      funnelData.map((entry, index) => (
                        <cell key={`cell-${index}`} fill={index === 0 ? '#1F3864' : index === 1 ? '#3b82f6' : index === 2 ? '#C55A11' : '#2E7D32'} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Needs Attention Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="text-[#C55A11]" size={20} />
            <h3 className="text-lg font-bold text-[#1F3864]">Needs Your Attention</h3>
          </div>
          
          <div className="space-y-4">
            {attentionItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-orange-100 bg-orange-50/50 hover:bg-orange-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                    item.type === 'Verification' ? 'bg-blue-100 text-blue-700' :
                    item.type === 'Support' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500 mb-3">{item.detail}</p>
                <button 
                  onClick={() => setActiveTab(item.action)}
                  className="w-full py-1.5 text-xs font-semibold text-white bg-[#C55A11] rounded hover:bg-[#a84c0e] transition-colors"
                >
                  Review Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
