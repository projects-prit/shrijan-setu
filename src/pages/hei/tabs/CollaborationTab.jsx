import React from 'react';
import { Handshake, CheckCircle2, XCircle, Briefcase, Calendar } from 'lucide-react';

import api from '../../../api/axios';

export default function CollaborationTab({ collabs, setCollabs, showToast }) {
  const pendingRequests = collabs.filter(c => c.status === 'pending');
  const activeCollaborators = collabs.filter(c => c.status === 'active');

  const handleAction = async (id, action) => {
    try {
      const apiAction = action === 'Accepted' ? 'active' : 'rejected';
      const res = await api.patch(`/collaborations/${id}/respond`, { status: apiAction });
      
      setCollabs(collabs.map(c => {
        if (c._id === id) {
          return { ...c, status: apiAction };
        }
        return c;
      }));
      showToast(`Request ${action.toLowerCase()} successfully.`);
    } catch (err) {
      console.error(err);
      showToast('Error updating request status.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1F3864]">Collaboration Requests</h1>
        <p className="text-sm text-gray-500 mt-1">Manage incoming requests from Industry and CSR partners.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          Pending Requests
          <span className="bg-[#C55A11] text-white text-xs py-0.5 px-2 rounded-full">{pendingRequests.length}</span>
        </h2>
        
        {pendingRequests.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-xl border border-gray-100 shadow-sm text-gray-500">
            No pending requests at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingRequests.map(req => (
              <div key={req._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{req.organization_id?.profile?.name || req.partnerName || 'Industry Partner'}</h3>
                  <span className="text-xs font-mono text-gray-500">{new Date(req.created_at || req.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-4 text-sm mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Support Offered</span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded w-fit">{req.support_type || req.supportType}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-gray-200 pl-4">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">For Project</span>
                    <span className="font-medium text-[#1F3864]">PRJ-{(req.project_id?._id || req.projectId || '').substring((req.project_id?._id || req.projectId || '').length - 6).toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button onClick={() => handleAction(req._id, 'Declined')} className="flex-1 py-2 border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
                    <XCircle size={18} /> Decline
                  </button>
                  <button onClick={() => handleAction(req._id, 'Accepted')} className="flex-1 py-2 bg-[#2E7D32] text-white font-medium rounded hover:bg-[#256a29] transition-colors flex justify-center items-center gap-2">
                    <CheckCircle2 size={18} /> Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Active Collaborators</h2>
        
        {activeCollaborators.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-xl border border-gray-100 shadow-sm text-gray-500">
            No active collaborations yet.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Partner Name</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Support Type</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeCollaborators.map(partner => (
                  <tr key={partner._id} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                      <Handshake size={18} className="text-[#1F3864]" /> {partner.organization_id?.profile?.name || partner.partnerName || 'Industry Partner'}
                    </td>
                    <td className="p-4 text-sm text-gray-600"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{partner.support_type || partner.supportType}</span></td>
                    <td className="p-4 text-sm font-mono text-gray-500 flex items-center gap-2"><Briefcase size={14}/> PRJ-{(partner.project_id?._id || partner.projectId || '').substring((partner.project_id?._id || partner.projectId || '').length - 6).toUpperCase()}</td>
                    <td className="p-4 text-sm text-gray-500 flex items-center gap-2"><Calendar size={14}/> {new Date(partner.created_at || partner.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
