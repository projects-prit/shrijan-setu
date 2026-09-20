import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Download, Users, Briefcase, TrendingUp } from 'lucide-react';

export default function AnalyticsTab({ collabs, funding, showToast }) {
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleDownload = () => {
    setReportGenerated(true);
    showToast('CSR Impact Report downloaded successfully.');
    setTimeout(() => setReportGenerated(false), 3000);
  };

  const spendCategoryData = [
    { name: 'Civic Infrastructure', value: 1000000 },
    { name: 'Environment', value: 800000 },
    { name: 'Smart Education', value: 200000 },
  ];
  const COLORS = ['#1F3864', '#2E7D32', '#C55A11', '#8884d8'];

  const impactData = [
    { project: 'PRJ-1805', citizens: 5000 },
    { project: 'PRJ-1950', citizens: 12000 },
    { project: 'PRJ-2099', citizens: 0 },
  ];

  const totalCitizens = impactData.reduce((acc, curr) => acc + curr.citizens, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Impact & Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Visualize your organization's contribution and generate CSR reports.</p>
        </div>
        <button 
          onClick={handleDownload}
          disabled={reportGenerated}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-[#1F3864] font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
        >
          {reportGenerated ? <Check size={18} className="text-green-500" /> : <Download size={18} />}
          {reportGenerated ? 'Report Generated' : 'Download CSR Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1F3864] p-5 rounded-xl shadow-sm text-white flex flex-col justify-center">
          <p className="text-sm text-blue-200 font-medium mb-1 flex items-center gap-2"><Users size={16} /> Total Citizens Impacted</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold">{totalCitizens.toLocaleString()}</span>
          </div>
          <p className="text-xs text-blue-200 mt-2 flex items-center gap-1"><TrendingUp size={12}/> +4,000 this quarter</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-medium mb-1 flex items-center gap-2"><Briefcase size={16} className="text-[#2E7D32]" /> Solutions Deployed</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">{collabs.filter(c => c.stage === 'Deployed').length}</span>
            <span className="text-sm text-gray-500 mb-2">/ {collabs.length} supported</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Impact vs. Platform Average</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-[#C55A11]">Top 5%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Among Industry Partners</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Citizens Impacted by Project</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactData} margin={{top: 0, right: 0, left: -20, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="project" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="citizens" fill="#2E7D32" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">CSR Spend by Category</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {spendCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  );
}
