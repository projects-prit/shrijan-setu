import React, { useState } from 'react';
import { ShieldAlert, Unlock, Lock } from 'lucide-react';

export default function SecurityLogsTab({ showToast }) {
  const [blockedIPs, setBlockedIPs] = useState(['45.22.11.90', '192.168.1.99']);
  const [newIP, setNewIP] = useState('');

  const handleBlock = (e) => {
    e.preventDefault();
    if(newIP && !blockedIPs.includes(newIP)) {
      if(window.confirm(`Are you sure you want to block IP: ${newIP}?`)) {
        setBlockedIPs([...blockedIPs, newIP]);
        setNewIP('');
        showToast(`IP ${newIP} has been blocked.`);
      }
    }
  };

  const handleUnblock = (ip) => {
    setBlockedIPs(blockedIPs.filter(i => i !== ip));
    showToast(`IP ${ip} unblocked.`);
  };

  const suspicious = [
    { user: 'admin@srijansetu.in', ip: '45.22.11.90', attempts: 12, lastAttempt: '2026-09-14T02:33:00Z', status: 'Blocked by System' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[#1F3864]">Security & Access</h2>
        <p className="text-sm text-gray-500">Monitor login attempts and manage blocked IP addresses.</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2"><ShieldAlert size={20}/> Suspicious Activity</h3>
        <table className="w-full text-left text-sm text-red-800">
          <thead>
            <tr className="border-b border-red-200">
              <th className="pb-2">Account Targeted</th>
              <th className="pb-2">Source IP</th>
              <th className="pb-2">Failed Attempts</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {suspicious.map((s, i) => (
              <tr key={i}>
                <td className="py-2 font-semibold">{s.user}</td>
                <td className="py-2 font-mono">{s.ip}</td>
                <td className="py-2">{s.attempts} (in last hour)</td>
                <td className="py-2 font-bold">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-[#1F3864] mb-4">Blocked IPs</h3>
        <form onSubmit={handleBlock} className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Enter IP to block manually..." 
            className="flex-1 max-w-sm p-2 border border-gray-300 rounded focus:border-[#1F3864] outline-none text-sm"
            value={newIP}
            onChange={(e)=>setNewIP(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-[#B02A2A] text-white rounded text-sm font-semibold hover:bg-red-800 flex items-center gap-2">
            <Lock size={16}/> Block IP
          </button>
        </form>

        <div className="flex flex-wrap gap-3">
          {blockedIPs.map(ip => (
            <div key={ip} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-sm font-mono text-gray-700">
              {ip}
              <button onClick={() => handleUnblock(ip)} className="text-gray-400 hover:text-[#B02A2A]"><Unlock size={14}/></button>
            </div>
          ))}
          {blockedIPs.length === 0 && <span className="text-sm text-gray-400">No blocked IPs.</span>}
        </div>
      </div>
    </div>
  );
}
