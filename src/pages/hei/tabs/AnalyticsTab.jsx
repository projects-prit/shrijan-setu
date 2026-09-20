import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Download, Star, TrendingUp, Clock } from 'lucide-react';

export default function AnalyticsTab({ projects }) {
  const [reportGenerated, setReportGenerated] = useState(false);

  const categoryData = [
    { name: 'Smart Education', value: 400 },
    { name: 'Civic Infrastructure', value: 300 },
    { name: 'Smart Mobility', value: 300 },
    { name: 'Energy', value: 200 },
  ];
  const COLORS = ['#1F3864', '#2E7D32', '#C55A11', '#8884d8'];

  const timeData = [
    { name: 'Prototype', days: 45 },
    { name: 'Testing', days: 60 },
    { name: 'Pilot', days: 90 },
    { name: 'Deployment', days: 30 },
  ];

  const handleDownload = () => {
    setReportGenerated(true);
    setTimeout(() => setReportGenerated(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Analytics & Impact</h1>
          <p className="text-sm text-gray-500 mt-1">Measure your institution's contribution to solving societal challenges.</p>
        </div>
        <button 
          onClick={handleDownload}
          disabled={reportGenerated}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {reportGenerated ? <Check size={18} className="text-green-500" /> : <Download size={18} />}
          {reportGenerated ? 'Report Generated' : 'Download Full Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium mb-1 flex items-center gap-2"><Star size={16} className="text-yellow-400 fill-current" /> Citizen Feedback Rating</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900">4.8</span>
            <span className="text-sm text-gray-500 mb-1">/ 5.0 avg</span>
          </div>
          <p className="text-xs text-green-600 font-medium mt-2">↑ 0.2 higher than platform avg</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium mb-1 flex items-center gap-2"><Clock size={16} className="text-blue-500" /> Avg Time to Deployment</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900">225</span>
            <span className="text-sm text-gray-500 mb-1">Days</span>
          </div>
          <p className="text-xs text-green-600 font-medium mt-2">↓ 15% faster than platform avg</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium mb-1 flex items-center gap-2"><TrendingUp size={16} className="text-purple-500" /> Success Rate</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900">82%</span>
          </div>
          <p className="text-xs text-green-600 font-medium mt-2">↑ Top 10% of institutions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Challenges Solved by Category</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Average Time per Stage (Days)</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} layout="vertical" margin={{top: 0, right: 30, left: 20, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#374151', fontSize: 12, fontWeight: 500}} />
                <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="days" fill="#1F3864" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add a dummy Check icon
function Check(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  );
}
