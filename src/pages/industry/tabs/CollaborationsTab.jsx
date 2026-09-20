import React, { useState } from 'react';
import { LayoutList, LayoutGrid, Clock, Users, ArrowRight, X, MessageSquare, Plus, FileText, AlertTriangle } from 'lucide-react';
import { StatusChip } from '../../../components/ui';

export default function CollaborationsTab({ collabs, setCollaborations, showToast }) {
  const [filter, setFilter] = useState('All');
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [newLog, setNewLog] = useState('');

  const filteredCollabs = collabs.filter(c => filter === 'All' || c.status === filter);

  const withdrawSupport = (id) => {
    if (window.confirm('Are you sure you want to withdraw your support offer?')) {
      setCollaborations(collabs.filter(c => c.id !== id));
      setSelectedCollab(null);
      showToast('Support offer withdrawn.');
    }
  };

  const addLog = (id) => {
    if (!newLog.trim()) return;
    setCollaborations(collabs.map(c => {
      if (c._id === id) {
        return { 
          ...c, 
          logs: [...(c.logs || []), { date: new Date().toISOString().split('T')[0], type: 'Note', content: newLog }] 
        };
      }
      return c;
    }));
    setNewLog('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">My Collaborations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your active partnerships and pending support requests.</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        {['All', 'Pending', 'Active', 'Completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-[#1F3864] text-[#1F3864]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredCollabs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No collaborations found in this status.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Support Type</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">University</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Joined</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCollabs.map(collab => (
                <tr key={collab._id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedCollab(collab)}>
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{collab.project_id?.challenge_id?.title || collab.projectTitle}</p>
                    <p className="text-xs text-gray-500 font-mono mt-1">PRJ-{(collab.project_id?._id || collab.projectId || '').substring((collab.project_id?._id || collab.projectId || '').length - 6).toUpperCase()}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {(collab.support_type || collab.supportType || '').split(',').map(type => (
                        <span key={type.trim()} className={`text-xs px-2 py-0.5 rounded ${type.trim() === 'Funding' ? 'bg-green-100 text-green-800' : type.trim() === 'Mentoring' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                          {type.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{collab.project_id?.hei_id?.profile?.institutionName || collab.university}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${collab.status === 'active' || collab.status === 'Active' ? 'bg-[#2E7D32] text-white' : collab.status === 'pending' || collab.status === 'Pending' ? 'bg-[#C55A11] text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{new Date(collab.created_at || collab.dateJoined).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button className="text-[#1F3864] hover:bg-blue-50 p-2 rounded-full"><ArrowRight size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selectedCollab && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded">PRJ-{(selectedCollab.project_id?._id || selectedCollab.projectId || '').substring((selectedCollab.project_id?._id || selectedCollab.projectId || '').length - 6).toUpperCase()}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${selectedCollab.status === 'active' || selectedCollab.status === 'Active' ? 'bg-[#2E7D32] text-white' : selectedCollab.status === 'pending' || selectedCollab.status === 'Pending' ? 'bg-[#C55A11] text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {selectedCollab.status.charAt(0).toUpperCase() + selectedCollab.status.slice(1)}
                  </span>
                  {(selectedCollab.status === 'pending' || selectedCollab.status === 'Pending') && (
                    <button onClick={() => withdrawSupport(selectedCollab._id)} className="text-xs text-red-500 hover:underline flex items-center gap-1 ml-2">
                      <AlertTriangle size={12} /> Withdraw Support
                    </button>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-[#1F3864]">{selectedCollab.project_id?.challenge_id?.title || selectedCollab.projectTitle}</h2>
                <p className="text-sm text-gray-600 mt-1">Partner: <span className="font-semibold">{selectedCollab.project_id?.hei_id?.profile?.institutionName || selectedCollab.university}</span></p>
              </div>
              <button onClick={() => setSelectedCollab(null)} className="text-gray-400 hover:text-gray-700 bg-white border border-gray-200 rounded-full p-1 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2"><Clock size={16} /> Partner Timeline</h3>
                  <div className="space-y-4">
                    {(selectedCollab.timeline || []).map((event, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-[#1F3864] mt-1.5"></div>
                          {idx !== (selectedCollab.timeline || []).length -1 && <div className="w-px h-full bg-gray-200 my-1"></div>}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-bold text-gray-900">{event.action}</p>
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2"><MessageSquare size={16} /> Contribution Log</h3>
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {(!selectedCollab.logs || selectedCollab.logs.length === 0) ? (
                      <p className="text-sm text-gray-500 italic">No logs yet.</p>
                    ) : (
                      selectedCollab.logs.map((log, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 p-3 rounded-lg text-sm text-gray-800 shadow-sm">
                          <p className="mb-1">{log.content}</p>
                          <p className="text-xs text-gray-400 font-mono">{log.date}</p>
                        </div>
                      ))
                    )}
                  </div>
                  {(selectedCollab.status === 'active' || selectedCollab.status === 'Active') && (
                    <div className="flex flex-col gap-2">
                      <textarea 
                        rows="2"
                        placeholder="Log a contribution or note..." 
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none"
                        value={newLog}
                        onChange={e => setNewLog(e.target.value)}
                      ></textarea>
                      <button onClick={() => addLog(selectedCollab._id)} className="w-full bg-[#1F3864] text-white p-2 rounded hover:bg-[#152746] text-sm font-medium">
                        Add Log Entry
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
