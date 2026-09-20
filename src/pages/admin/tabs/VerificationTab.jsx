import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, FileText, Building2, Eye, RefreshCw } from 'lucide-react';
import api from '../../../api/axios';

export default function VerificationTab({ showToast }) {
  const [pending, setPending] = useState([]);
  const [verified, setVerified] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('pending'); // pending, verified
  const [showReject, setShowReject] = useState(null); // stores the org id
  const [rejectReason, setRejectReason] = useState('');

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/verifications');
      const data = res.data.data;
      
      setPending(data.filter(org => org.status === 'Pending'));
      // Adding mock verified dates since schema might not have it yet
      setVerified(data.filter(org => org.status === 'Verified').map(org => ({...org, verifiedDate: new Date().toISOString().split('T')[0]})));
    } catch (err) {
      console.error(err);
      showToast('Error fetching verifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const approveOrg = async (org) => {
    try {
      await api.put(`/admin/verifications/${org.id}`, { status: 'Verified', type: org.type });
      setPending(pending.filter(p => p.id !== org.id));
      setVerified([...verified, { id: org.id, name: org.name, type: org.type, region: org.region, verifiedDate: new Date().toISOString().split('T')[0] }]);
      showToast(`${org.name} has been verified and approved in database.`);
    } catch(err) {
      showToast('Failed to approve organization');
    }
  };

  const rejectOrg = async () => {
    if(!rejectReason.trim()) {
      showToast('You must provide a rejection reason');
      return;
    }
    try {
      const org = pending.find(p => p.id === showReject);
      await api.put(`/admin/verifications/${org.id}`, { status: 'Rejected', type: org.type });
      
      setPending(pending.filter(p => p.id !== showReject));
      setShowReject(null);
      setRejectReason('');
      showToast(`${org.name} verification rejected in database. Notification sent.`);
    } catch(err) {
      showToast('Failed to reject organization');
    }
  };

  const revokeOrg = async (org) => {
    if(window.confirm(`Are you sure you want to revoke verification for ${org.name}? All associated users will lose access.`)) {
      try {
        await api.put(`/admin/verifications/${org.id}`, { status: 'Pending', type: org.type });
        setVerified(verified.filter(v => v.id !== org.id));
        setPending([...pending, { id: org.id, name: org.name, type: org.type, region: org.region, status: 'Pending', docs: 3 }]);
        showToast(`${org.name} verification revoked in database.`);
      } catch(err) {
        showToast('Failed to revoke verification');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Institution Verification</h2>
          <p className="text-sm text-gray-500">Review and approve HEIs and CSR organizations from database.</p>
        </div>
        <button onClick={fetchVerifications} className="p-2 bg-white rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setTab('pending')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'pending' ? 'border-[#C55A11] text-[#C55A11]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Pending Requests ({pending.length})
          </button>
          <button 
            onClick={() => setTab('verified')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'verified' ? 'border-[#2E7D32] text-[#2E7D32]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Verified Organizations ({verified.length})
          </button>
        </div>

        <div className="p-6 bg-gray-50">
          {loading ? (
             <div className="py-12 text-center text-gray-400">Loading verifications from database...</div>
          ) : tab === 'pending' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pending.map(org => (
                <div key={org.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-[#1F3864] transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Building2 size={20}/></div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-orange-100 text-orange-800 uppercase tracking-wider">Pending</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{org.name}</h3>
                  <div className="text-sm text-gray-500 mb-4">{org.type} • {org.region || 'Region Unknown'}</div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText size={16}/> {org.docs || 3} Documents
                    </div>
                    <button className="text-xs font-semibold text-[#1F3864] hover:underline flex items-center gap-1"><Eye size={14}/> View</button>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => approveOrg(org)} className="flex-1 py-2 bg-[#2E7D32] hover:bg-green-800 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors">
                      <CheckCircle size={16}/> Approve
                    </button>
                    <button onClick={() => setShowReject(org.id)} className="flex-1 py-2 bg-white hover:bg-red-50 text-[#B02A2A] border border-[#B02A2A] text-sm font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors">
                      <XCircle size={16}/> Reject
                    </button>
                  </div>
                </div>
              ))}
              {pending.length === 0 && <div className="col-span-3 text-center py-12 text-gray-400">No pending verifications.</div>}
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-semibold text-gray-500">Organization Name</th>
                    <th className="p-4 font-semibold text-gray-500">Type</th>
                    <th className="p-4 font-semibold text-gray-500">Region</th>
                    <th className="p-4 font-semibold text-gray-500">Verified On</th>
                    <th className="p-4 font-semibold text-right text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {verified.map(org => (
                    <tr key={org.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-900">{org.name}</td>
                      <td className="p-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">{org.type}</span></td>
                      <td className="p-4">{org.region || 'Region Unknown'}</td>
                      <td className="p-4 font-mono text-xs">{org.verifiedDate}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => revokeOrg(org)} className="text-xs font-semibold text-[#B02A2A] hover:underline">Revoke Access</button>
                      </td>
                    </tr>
                  ))}
                  {verified.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-400">No verified organizations.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showReject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reject Verification</h3>
            <p className="text-sm text-gray-600 mb-4">Please provide a reason for rejecting this organization's verification request. This will be sent to the applicant.</p>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-sm focus:border-[#1F3864] outline-none"
              rows="4"
              placeholder="e.g., Provided registration document is illegible or expired..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowReject(null)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={rejectOrg} className="px-4 py-2 text-sm font-semibold text-white bg-[#B02A2A] hover:bg-red-800 rounded-lg">Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
