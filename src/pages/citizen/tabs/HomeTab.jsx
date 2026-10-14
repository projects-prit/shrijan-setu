import React from 'react';
import { PlusCircle, FileText, CheckCircle, ChevronRight, Activity } from 'lucide-react';

export default function HomeTab({ setActiveTab, myReports = [] }) {
  const safeReports = Array.isArray(myReports) ? myReports : [];
  const reportedCount = safeReports.length;
  const inProgressCount = safeReports.filter(r => {
    const s = (r?.status || '').toLowerCase();
    return s !== 'deployed';
  }).length;
  const resolvedCount = safeReports.filter(r => {
    const s = (r?.status || '').toLowerCase();
    return s === 'deployed';
  }).length;

  const recentFixes = [
    { title: "Smart Hand-Pump Sensor Network deployed in Khunti", partner: "BIT Mesra" },
    { title: "Solar Micro-grid installed for rural primary school", partner: "NIT Jamshedpur" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero Section */}
      <div className="bg-[#1F3864] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Help improve your community.</h1>
          <p className="text-blue-100 text-sm md:text-base mb-6 leading-relaxed">
            Report local civic, water, or infrastructure issues easily. We connect your problem with universities and partners who build real solutions.
          </p>
          <button 
            onClick={() => setActiveTab('submit')}
            className="w-full bg-white text-[#1F3864] font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg active:scale-95 transition-transform"
          >
            <PlusCircle size={24} /> Report a Challenge
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3 px-1">Your Impact</h2>
        <div className="grid grid-cols-3 gap-3">
          <div onClick={() => setActiveTab('reports')} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer active:bg-gray-50">
            <div className="w-10 h-10 bg-blue-50 text-[#1F3864] rounded-full flex items-center justify-center mb-2">
              <FileText size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">{reportedCount}</span>
            <span className="text-[10px] md:text-xs text-gray-500 text-center font-medium uppercase tracking-wide mt-1">Reported</span>
          </div>
          <div onClick={() => setActiveTab('reports')} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer active:bg-gray-50">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-2">
              <Activity size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">{inProgressCount}</span>
            <span className="text-[10px] md:text-xs text-gray-500 text-center font-medium uppercase tracking-wide mt-1">Working</span>
          </div>
          <div onClick={() => setActiveTab('reports')} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer active:bg-gray-50">
            <div className="w-10 h-10 bg-green-50 text-[#2E7D32] rounded-full flex items-center justify-center mb-2">
              <CheckCircle size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">{resolvedCount}</span>
            <span className="text-[10px] md:text-xs text-gray-500 text-center font-medium uppercase tracking-wide mt-1">Resolved</span>
          </div>
        </div>
      </div>

      {/* Recent Success Stories */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="text-lg font-bold text-gray-900">Recently fixed near you</h2>
          <button onClick={() => setActiveTab('community')} className="text-[#1F3864] text-sm font-medium hover:underline">See all</button>
        </div>
        <div className="space-y-3">
          {recentFixes.map((fix, idx) => (
            <div key={idx} onClick={() => setActiveTab('community')} className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle size={24} className="text-[#2E7D32]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mb-1">{fix.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                  Thanks to <span className="font-medium text-[#1F3864]">{fix.partner}</span>
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
