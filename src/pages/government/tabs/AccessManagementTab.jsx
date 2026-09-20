import React, { useState } from 'react';
import { Users, UserPlus, Shield, X, Mail } from 'lucide-react';
import { mockGovUsers } from '../govtMockData';

export default function AccessManagementTab({ showToast }) {
  const [users, setUsers] = useState(mockGovUsers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'View Only', department: '' });

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    showToast(`Role updated to ${newRole}`);
  };

  const handleRemove = (id, name) => {
    if(window.confirm(`Are you sure you want to remove access for ${name}?`)) {
      setUsers(users.filter(u => u.id !== id));
      showToast("User access removed.");
    }
  };

  const handleInvite = (e) => {
    e.preventDefault();
    setUsers([...users, { ...inviteForm, id: `U-${Date.now()}`, lastActive: 'Never' }]);
    showToast(`Invite sent to ${inviteForm.email}`);
    setShowInviteModal(false);
    setInviteForm({ name: '', email: '', role: 'View Only', department: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Access Management</h2>
          <p className="text-gray-500 mt-1">Manage government official access to this dashboard.</p>
        </div>
        <button onClick={() => setShowInviteModal(true)} className="px-4 py-2 bg-[#1F3864] text-white rounded-lg text-sm font-semibold hover:bg-blue-900 flex items-center gap-2 shadow-sm">
          <UserPlus size={16}/> Invite User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-500">Official</th>
                <th className="p-4 font-semibold text-gray-500">Department / Jurisdiction</th>
                <th className="p-4 font-semibold text-gray-500">Role</th>
                <th className="p-4 font-semibold text-gray-500">Last Active</th>
                <th className="p-4 font-semibold text-center text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{u.name}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                  </td>
                  <td className="p-4">{u.department}</td>
                  <td className="p-4">
                    <select 
                      value={u.role} 
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-semibold outline-none focus:border-[#1F3864]"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="View Only">View Only</option>
                    </select>
                  </td>
                  <td className="p-4 text-xs font-mono">{u.lastActive}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleRemove(u.id, u.name)} className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded text-xs font-semibold transition-colors">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-[#1F3864] flex items-center gap-2"><Mail size={20}/> Send Invitation</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-800"><X size={20}/></button>
            </div>
            <form onSubmit={handleInvite} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                <input required type="text" value={inviteForm.name} onChange={e=>setInviteForm({...inviteForm, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]" placeholder="e.g. Ramesh Singh"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Gov Email Address</label>
                <input required type="email" value={inviteForm.email} onChange={e=>setInviteForm({...inviteForm, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]" placeholder="name@mah.gov.in"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Department</label>
                <input required type="text" value={inviteForm.department} onChange={e=>setInviteForm({...inviteForm, department: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]" placeholder="e.g. Health Ministry"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Assign Role</label>
                <select value={inviteForm.role} onChange={e=>setInviteForm({...inviteForm, role: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]">
                  <option>View Only</option>
                  <option>Editor</option>
                  <option>Admin</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Admins can invite others. Editors can export reports. View Only can browse.</p>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#1F3864] text-white py-2 rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors">
                  Send Invite Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
