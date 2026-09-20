import React, { useState } from 'react';
import { IndianRupee, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export default function FundingTab({ funding, setFunding, collabs, showToast }) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ projectId: '', amount: '', note: '' });

  const totalCommitted = funding.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDisbursed = funding.filter(f => f.status === 'Disbursed').reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalCommitted - totalDisbursed;

  const projectFundingData = collabs.filter(c => c.supportType.includes('Funding')).map(collab => {
    const projectFunds = funding.filter(f => f.projectId === collab.projectId);
    return {
      name: collab.projectId,
      disbursed: projectFunds.filter(f => f.status === 'Disbursed').reduce((acc, curr) => acc + curr.amount, 0),
      committed: projectFunds.filter(f => f.status === 'Committed').reduce((acc, curr) => acc + curr.amount, 0),
    };
  });

  const handleAddDisbursement = (e) => {
    e.preventDefault();
    if (!formData.projectId || !formData.amount) return;

    const newFund = {
      id: `FND-${Math.floor(Math.random() * 900) + 100}`,
      projectId: formData.projectId,
      amount: parseInt(formData.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'Disbursed',
      note: formData.note
    };

    setFunding([newFund, ...funding]);
    setFormData({ projectId: '', amount: '', note: '' });
    setIsAdding(false);
    showToast(`Successfully logged ₹${newFund.amount.toLocaleString()} disbursement.`);
  };

  const markDisbursed = (id) => {
    setFunding(funding.map(f => f.id === id ? { ...f, status: 'Disbursed' } : f));
    showToast('Status updated to Disbursed.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Funding & Resources Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">Manage financial pledges and track disbursements to HEIs.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1F3864] text-white rounded-lg hover:bg-[#152746] font-medium text-sm transition-colors"
        >
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? 'Cancel' : 'Log Disbursement'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-blue-500">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Committed</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalCommitted.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-green-500">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Disbursed</p>
            <p className="text-2xl font-bold text-green-700">₹{totalDisbursed.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-orange-500">
          <div>
            <p className="text-sm text-gray-500 font-medium">Remaining to Disburse</p>
            <p className="text-2xl font-bold text-orange-600">₹{remaining.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 animate-fade-in-down">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Log New Disbursement</h2>
          <form onSubmit={handleAddDisbursement} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Project</label>
              <select required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none bg-white" value={formData.projectId} onChange={e => setFormData({...formData, projectId: e.target.value})}>
                <option value="">Select a project...</option>
                {collabs.filter(c => c.status === 'Active' && c.supportType.includes('Funding')).map(c => (
                  <option key={c.projectId} value={c.projectId}>{c.projectId} - {c.projectTitle}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input required type="number" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Note / Description</label>
              <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} />
            </div>
            <div>
              <button type="submit" className="w-full py-2 bg-[#2E7D32] text-white rounded font-medium hover:bg-[#256a29]">
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Funding Logs</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project ID</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount (₹)</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {funding.map(fund => (
                <tr key={fund.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-mono text-gray-500">{fund.date}</td>
                  <td className="p-4 text-sm font-bold text-[#1F3864]">{fund.projectId}</td>
                  <td className="p-4 text-sm font-bold text-gray-900">₹{fund.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${fund.status === 'Disbursed' ? 'bg-[#2E7D32] text-white' : 'bg-[#C55A11] text-white'}`}>
                      {fund.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600 truncate max-w-[150px]">{fund.note}</td>
                  <td className="p-4 text-right">
                    {fund.status === 'Committed' && (
                      <button onClick={() => markDisbursed(fund.id)} className="text-xs text-[#1F3864] hover:underline font-medium">Mark Disbursed</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4">Distribution by Project</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectFundingData} layout="vertical" margin={{top: 0, right: 10, left: 20, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#374151', fontSize: 12, fontWeight: 500}} width={70}/>
                <RechartsTooltip cursor={{fill: '#F3F4F6'}} formatter={(value) => `₹${value.toLocaleString()}`} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="disbursed" stackId="a" fill="#2E7D32" />
                <Bar dataKey="committed" stackId="a" fill="#C55A11" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#2E7D32] rounded-sm"></div> Disbursed</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#C55A11] rounded-sm"></div> Committed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add dummy X component 
function X(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  );
}
