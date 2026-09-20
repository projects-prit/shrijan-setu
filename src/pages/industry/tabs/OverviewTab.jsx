import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Handshake, IndianRupee, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function OverviewTab({ collabs, funding, setActiveTab }) {
  const activeCollabs = collabs.filter(c => c.status === 'Active' || c.status === 'Pending').length;
  const totalFunding = funding.reduce((acc, curr) => acc + curr.amount, 0);
  const mentoredCount = collabs.filter(c => c.supportType.includes('Mentoring')).length;
  const deployedCount = collabs.filter(c => c.stage === 'Deployed').length;

  const stats = [
    { label: 'Active Collaborations', value: activeCollabs, icon: <Handshake className="text-[#1F3864]" size={24} />, bg: 'bg-blue-50' },
    { label: 'Total Committed', value: `₹${(totalFunding / 100000).toFixed(1)}L`, icon: <IndianRupee className="text-orange-500" size={24} />, bg: 'bg-orange-50' },
    { label: 'Projects Mentored', value: mentoredCount, icon: <Users className="text-[#2E7D32]" size={24} />, bg: 'bg-green-50' },
    { label: 'Solutions Deployed', value: deployedCount, icon: <CheckCircle className="text-purple-500" size={24} />, bg: 'bg-purple-50' }
  ];

  const supportData = [
    { name: 'Funding', count: collabs.filter(c => c.supportType.includes('Funding')).length },
    { name: 'Mentoring', count: mentoredCount },
    { name: 'Technical Support', count: collabs.filter(c => c.supportType.includes('Technical Support')).length }
  ];

  const engagementData = [
    { month: 'Apr', projects: 1 },
    { month: 'May', projects: 2 },
    { month: 'Jun', projects: 2 },
    { month: 'Jul', projects: 4 },
    { month: 'Aug', projects: 5 },
    { month: 'Sep', projects: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">CSR Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Summary of your organization's impact and engagements.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setActiveTab('discover')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors">
            Browse Projects
          </button>
          <button onClick={() => setActiveTab('collaborations')} className="px-4 py-2 bg-[#1F3864] text-white rounded-lg hover:bg-[#152746] font-medium text-sm transition-colors">
            View My Collaborations
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Contributions by Type</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supportData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="count" fill="#C55A11" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Engagement (Last 6 Months)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Line type="monotone" dataKey="projects" stroke="#2E7D32" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
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
          {collabs.slice(0, 5).map((collab, idx) => (
            <div key={idx} className="p-4 px-6 hover:bg-gray-50 transition-colors flex items-start gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  Update on <span className="font-semibold">{collab.projectTitle}</span> by <span className="font-medium text-[#1F3864]">{collab.university}</span>.
                </p>
                <p className="text-xs text-gray-500 mt-1">{collab.timeline?.[collab.timeline.length - 1]?.action || 'New collaboration started.'}</p>
              </div>
              <button onClick={() => setActiveTab('collaborations')} className="text-gray-400 hover:text-[#1F3864]">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
