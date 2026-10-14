import React from 'react';
import { Handshake, IndianRupee, Users, CheckCircle } from 'lucide-react';

export default function OverviewTab({ collabs = [], funding = [], setActiveTab }) {
  const safeCollabs = Array.isArray(collabs) ? collabs : [];
  const safeFunding = Array.isArray(funding) ? funding : [];

  const activeCollabs = safeCollabs.filter(c => c?.status === 'Active' || c?.status === 'Pending').length;
  const totalFunding = safeFunding.reduce((acc, curr) => acc + (Number(curr?.amount) || 0), 0);
  
  const mentoredCount = safeCollabs.filter(c => {
    if (Array.isArray(c?.supportType)) return c.supportType.includes('Mentoring');
    if (typeof c?.supportType === 'string') return c.supportType.includes('Mentoring');
    return false;
  }).length;

  const deployedCount = safeCollabs.filter(c => c?.stage === 'Deployed' || c?.stage === 'deployed').length;

  const stats = [
    { label: 'Active Collaborations', value: activeCollabs, icon: <Handshake className="text-[#1F3864]" size={24} />, bg: 'bg-blue-50' },
    { label: 'Total Committed', value: `₹${(totalFunding / 100000).toFixed(1)}L`, icon: <IndianRupee className="text-orange-500" size={24} />, bg: 'bg-orange-50' },
    { label: 'Projects Mentored', value: mentoredCount, icon: <Users className="text-[#2E7D32]" size={24} />, bg: 'bg-green-50' },
    { label: 'Solutions Deployed', value: deployedCount, icon: <CheckCircle className="text-purple-500" size={24} />, bg: 'bg-purple-50' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Committed Grants</span>
          <p className="text-3xl font-extrabold text-[#1F3864] mt-2">₹{(totalFunding / 100000).toFixed(1)} Lakhs</p>
          <p className="text-xs text-gray-500 mt-1">Direct support to student prototypes</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Collaborations</span>
          <p className="text-3xl font-extrabold text-[#2E7D32] mt-2">{activeCollabs}</p>
          <p className="text-xs text-gray-500 mt-1">HEI partner institutions engaged</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mentorship Programs</span>
          <p className="text-3xl font-extrabold text-orange-600 mt-2">{mentoredCount}</p>
          <p className="text-xs text-gray-500 mt-1">Industry expert advising sessions</p>
        </div>
      </div>
    </div>
  );
}
