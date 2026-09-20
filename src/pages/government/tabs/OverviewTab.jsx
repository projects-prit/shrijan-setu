import React from 'react';
import { Target, CheckCircle, Award, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { mockStats, themeDistributionData } from '../govtMockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function OverviewTab({ setActiveTab }) {
  const statCards = [
    { title: 'Total Challenges Raised', value: mockStats.totalChallenges, icon: <AlertTriangle size={24}/>, color: 'text-[#C55A11]', bg: 'bg-orange-50' },
    { title: 'Active Projects', value: mockStats.activeProjects, icon: <Target size={24}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Solutions Deployed', value: mockStats.solutionsDeployed, icon: <CheckCircle size={24}/>, color: 'text-[#2E7D32]', bg: 'bg-green-50' },
    { title: 'Institutions Onboarded', value: mockStats.institutionsOnboarded, icon: <Award size={24}/>, color: 'text-[#1F3864]', bg: 'bg-indigo-50' }
  ];

  // Simplified heat map data for districts (mocking a chloropleth with a list for simplicity)
  const districts = [
    { name: 'Pune', count: 342, intensity: 'bg-[#1F3864]' },
    { name: 'Mumbai', count: 285, intensity: 'bg-blue-800' },
    { name: 'Nashik', count: 156, intensity: 'bg-blue-600' },
    { name: 'Nagpur', count: 120, intensity: 'bg-blue-400' },
    { name: 'Aurangabad', count: 85, intensity: 'bg-blue-300' },
    { name: 'Thane', count: 42, intensity: 'bg-blue-200' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Command Center</h2>
          <p className="text-gray-500 mt-1">High-level overview of platform impact across Maharashtra.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('analytics')} className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">View Reports</button>
          <button onClick={() => setActiveTab('challenges')} className="px-4 py-2 bg-[#1F3864] text-white rounded-lg text-sm font-semibold hover:bg-blue-900 shadow-sm">View All Challenges</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-gray-300 transition-colors">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <div className="text-3xl font-black text-gray-900">{s.value.toLocaleString()}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">{s.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-[#1F3864] mb-6">Challenge Distribution by Theme</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={themeDistributionData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {themeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#1F3864' : '#6B7280'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="font-bold text-[#1F3864] mb-4">District Heat Map (Simulated)</h3>
          <p className="text-xs text-gray-500 mb-4">Click a district to drill down into challenges.</p>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {districts.map((d, i) => (
              <div key={i} onClick={() => setActiveTab('challenges')} className="group flex items-center justify-between p-3 rounded-lg border border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${d.intensity}`}></div>
                  <span className="font-semibold text-gray-700 group-hover:text-[#1F3864]">{d.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-gray-500">{d.count}</span>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-[#1F3864]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-[#1F3864] mb-4">Recent Platform Activity</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start pb-4 border-b border-gray-50">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#C55A11]"></div>
            <div>
              <p className="text-sm text-gray-800">New high-priority challenge submitted in <strong>Pune</strong>: <span className="font-semibold">Digital Literacy Gap in Rural Schools</span></p>
              <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
            </div>
          </div>
          <div className="flex gap-4 items-start pb-4 border-b border-gray-50">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#1F3864]"></div>
            <div>
              <p className="text-sm text-gray-800">Institution <strong>IIT Bombay</strong> was verified and onboarded to the platform.</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex gap-4 items-start pb-4 border-b border-gray-50">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#2E7D32]"></div>
            <div>
              <p className="text-sm text-gray-800">Project <span className="font-semibold">Adaptive Traffic Lights (Thane)</span> moved to <strong>Deployed</strong> stage.</p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
