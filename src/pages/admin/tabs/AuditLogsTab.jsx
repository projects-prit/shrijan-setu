import React, { useState } from 'react';

const mockAuditLogs = [
  { id: 'AUD-901', action: 'Role Changed', user: 'Admin User', target: 'Sunita Devi', details: 'Role changed from Citizen to Suspended', date: '2026-09-14T16:05:00Z', ip: '192.168.1.10' },
  { id: 'AUD-902', action: 'Institution Verified', user: 'Admin User', target: 'BIT Mesra', details: 'Status changed to Verified', date: '2026-09-13T14:20:00Z', ip: '192.168.1.10' },
  { id: 'AUD-903', action: 'Content Removed', user: 'Admin User', target: 'FLG-002', details: 'Deleted inappropriate content', date: '2026-09-12T10:15:00Z', ip: '192.168.1.10' },
  { id: 'AUD-904', action: 'Login Failed', user: 'Unknown', target: 'admin@srijansetu.in', details: 'Invalid password', date: '2026-09-14T02:33:00Z', ip: '45.22.11.90' }
];;

import { Search, Filter, FileText, Download } from 'lucide-react';


export default function AuditLogsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = mockAuditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Audit Logs</h2>
          <p className="text-sm text-gray-500">Immutable record of sensitive actions platform-wide.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Download size={16}/> Export Logs
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by user, action, or target..." 
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1F3864]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-500">Timestamp</th>
                <th className="p-4 font-semibold text-gray-500">Action</th>
                <th className="p-4 font-semibold text-gray-500">Performed By</th>
                <th className="p-4 font-semibold text-gray-500">Target</th>
                <th className="p-4 font-semibold text-gray-500">Details</th>
                <th className="p-4 font-semibold text-gray-500">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4 font-mono text-xs">{new Date(log.date).toLocaleString()}</td>
                  <td className="p-4 font-bold text-gray-900">{log.action}</td>
                  <td className="p-4">{log.user}</td>
                  <td className="p-4 font-semibold">{log.target}</td>
                  <td className="p-4 text-xs">{log.details}</td>
                  <td className="p-4 font-mono text-xs text-gray-400">{log.ip}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-gray-400">No logs found matching search.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
