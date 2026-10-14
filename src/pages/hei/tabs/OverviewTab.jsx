import React from 'react';
import { Target, CheckCircle, Users, Activity } from 'lucide-react';

export default function OverviewTab({ projects = [], team = [], setActiveTab }) {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeTeam = Array.isArray(team) ? team : [];

  const activeProjectsCount = safeProjects.filter(p => p?.stage !== 'Deployed').length;
  const completedProjectsCount = safeProjects.filter(p => p?.stage === 'Deployed').length;
  
  const stats = [
    { label: 'Total Matches', value: '42', icon: <Target className="text-[#1F3864]" size={24} />, bg: 'bg-blue-50' },
    { label: 'Active Projects', value: activeProjectsCount, icon: <Activity className="text-orange-500" size={24} />, bg: 'bg-orange-50' },
    { label: 'Completed', value: completedProjectsCount, icon: <CheckCircle className="text-[#2E7D32]" size={24} />, bg: 'bg-green-50' },
    { label: 'Team Members', value: safeTeam.length, icon: <Users className="text-purple-500" size={24} />, bg: 'bg-purple-50' }
  ];

  const stageData = [
    { name: 'Prototype', count: safeProjects.filter(p => p?.stage === 'Prototype').length },
    { name: 'Testing', count: safeProjects.filter(p => p?.stage === 'Testing').length },
    { name: 'Pilot', count: safeProjects.filter(p => p?.stage === 'Pilot').length },
    { name: 'Deployed', count: completedProjectsCount }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

      {/* Project Stages Bar Breakdown */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Project Pipeline Distribution</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stageData.map(stage => (
            <div key={stage.name} className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stage.name}</span>
              <p className="text-3xl font-extrabold text-[#1F3864] mt-2">{stage.count}</p>
              <span className="text-xs text-gray-400">active items</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
