import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Target, CheckCircle, Users, Activity, ArrowRight } from 'lucide-react';

export default function OverviewTab({ projects, team, setActiveTab }) {
  const activeProjectsCount = projects.filter(p => p.stage !== 'Deployed').length;
  const completedProjectsCount = projects.filter(p => p.stage === 'Deployed').length;
  
  const stats = [
    { label: 'Total Matches', value: '42', icon: <Target className="text-[#1F3864]" size={24} />, bg: 'bg-blue-50' },
    { label: 'Active Projects', value: activeProjectsCount, icon: <Activity className="text-orange-500" size={24} />, bg: 'bg-orange-50' },
    { label: 'Completed', value: completedProjectsCount, icon: <CheckCircle className="text-[#2E7D32]" size={24} />, bg: 'bg-green-50' },
    { label: 'Team Members', value: team.length, icon: <Users className="text-purple-500" size={24} />, bg: 'bg-purple-50' }
  ];

  const stageData = [
    { name: 'Prototype', count: projects.filter(p => p.stage === 'Prototype').length },
    { name: 'Testing', count: projects.filter(p => p.stage === 'Testing').length },
    { name: 'Pilot', count: projects.filter(p => p.stage === 'Pilot').length },
    { name: 'Deployed', count: completedProjectsCount }
  ];

  const monthlyData = [
    { month: 'Jan', accepted: 4 },
    { month: 'Feb', accepted: 7 },
    { month: 'Mar', accepted: 5 },
    { month: 'Apr', accepted: 12 },
    { month: 'May', accepted: 9 },
    { month: 'Jun', accepted: 15 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Summary of your institution's engagement on Srijan Setu.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setActiveTab('recommended')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors">
            Browse New Challenges
          </button>
          <button onClick={() => setActiveTab('projects')} className="px-4 py-2 bg-[#1F3864] text-white rounded-lg hover:bg-[#152746] font-medium text-sm transition-colors">
            View My Projects
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Projects by Stage</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="count" fill="#2E7D32" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Challenges Accepted (Last 6 Months)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Line type="monotone" dataKey="accepted" stroke="#1F3864" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {projects.slice(0, 5).map((project, idx) => (
            <div key={idx} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-start gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  Project <span className="font-semibold">{project.id}</span> was moved to <span className="font-semibold text-[#2E7D32]">{project.stage}</span> stage.
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
              <button onClick={() => setActiveTab('projects')} className="text-gray-400 hover:text-[#1F3864]">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
