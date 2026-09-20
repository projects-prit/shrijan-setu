import React, { useState } from 'react';
import { Shield, PlusCircle, Trash2 } from 'lucide-react';

export default function RoleManagementTab({ showToast }) {
  const [govUsers, setGovUsers] = useState([
    { id: 1, name: 'Sh. Vikram Singh', email: 'vsingh@gov.jharkhand.in', dept: 'Rural Development', jurisdiction: 'Statewide', subRole: 'Admin' },
    { id: 2, name: 'Aisha Khan', email: 'akhan@gov.jharkhand.in', dept: 'Water Resources', jurisdiction: 'Ranchi', subRole: 'Editor' }
  ]);
  
  const [showInvite, setShowInvite] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: '', dept: '', jurisdiction: '', subRole: 'Viewer' });

  const matrix = [
    { module: 'Submit Challenges', Citizen: '✅', HEI: '❌', Industry: '❌', Gov: '❌', Admin: '✅' },
    { module: 'View Dashboard', Citizen: '✅', HEI: '✅', Industry: '✅', Gov: '✅', Admin: '✅' },
    { module: 'Accept Projects', Citizen: '❌', HEI: '✅', Industry: '❌', Gov: '❌', Admin: '✅' },
    { module: 'Pledge Funds', Citizen: '❌', HEI: '❌', Industry: '✅', Gov: '❌', Admin: '✅' },
    { module: 'View Analytics', Citizen: '❌', HEI: '✅', Industry: '✅', Gov: '✅', Admin: '✅' },
    { module: 'Manage Users', Citizen: '❌', HEI: '❌', Industry: '❌', Gov: '❌', Admin: '✅' }
  ];

  const handleInvite = (e) => {
    e.preventDefault();
    setGovUsers([...govUsers, { id: Date.now(), name: 'Pending Invite', ...inviteForm }]);
    setShowInvite(false);
    showToast(`Invite sent to ${inviteForm.email}`);
    setInviteForm({ email: '', dept: '', jurisdiction: '', subRole: 'Viewer' });
  };

  const changeSubRole = (id, newRole) => {
    setGovUsers(govUsers.map(u => u.id === id ? { ...u, subRole: newRole } : u));
    showToast(`Updated sub-role to ${newRole}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[#1F3864]">Roles & Permissions</h2>
        <p className="text-sm text-gray-500">Audit platform permissions and manage internal government access.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-[#1F3864] flex items-center gap-2"><Shield size={18}/> Global Permission Matrix</h3>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-sm text-gray-600">
            <thead>
              <tr className="border-b-2 border-gray-100 text-gray-900">
                <th className="p-3 font-bold">Capability</th>
                <th className="p-3 font-bold text-center">Citizen</th>
                <th className="p-3 font-bold text-center">HEI</th>
                <th className="p-3 font-bold text-center">Industry</th>
                <th className="p-3 font-bold text-center">Government</th>
                <th className="p-3 font-bold text-center">Admin Ops</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800">{row.module}</td>
                  <td className="p-3 text-center">{row.Citizen}</td>
                  <td className="p-3 text-center">{row.HEI}</td>
                  <td className="p-3 text-center">{row.Industry}</td>
                  <td className="p-3 text-center">{row.Gov}</td>
                  <td className="p-3 text-center">{row.Admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-[#1F3864]">Government Access Management</h3>
          <button onClick={() => setShowInvite(true)} className="px-4 py-2 bg-[#1F3864] text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-[#152746]">
            <PlusCircle size={16}/> Invite Gov User
          </button>
        </div>
        
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-3 font-semibold text-gray-500">User</th>
                <th className="p-3 font-semibold text-gray-500">Department</th>
                <th className="p-3 font-semibold text-gray-500">Jurisdiction</th>
                <th className="p-3 font-semibold text-gray-500">Sub-Role</th>
                <th className="p-3 font-semibold text-right text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {govUsers.map(u => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-bold text-gray-900">{u.name}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                  </td>
                  <td className="p-3">{u.dept}</td>
                  <td className="p-3">{u.jurisdiction}</td>
                  <td className="p-3">
                    <select 
                      className="p-1.5 border border-gray-200 rounded text-xs outline-none focus:border-[#1F3864]"
                      value={u.subRole}
                      onChange={(e) => changeSubRole(u.id, e.target.value)}
                    >
                      <option value="Viewer">Viewer</option>
                      <option value="Editor">Editor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-red-500 hover:text-red-700" onClick={() => {
                       setGovUsers(govUsers.filter(user => user.id !== u.id));
                       showToast(`Removed access for ${u.name}`);
                    }}><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showInvite && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Invite Government User</h3>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Official Email</label>
                <input required type="email" className="w-full p-2 border border-gray-300 rounded focus:border-[#1F3864] outline-none text-sm" value={inviteForm.email} onChange={e=>setInviteForm({...inviteForm, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Department</label>
                <input required type="text" className="w-full p-2 border border-gray-300 rounded focus:border-[#1F3864] outline-none text-sm" value={inviteForm.dept} onChange={e=>setInviteForm({...inviteForm, dept: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Jurisdiction</label>
                  <input required type="text" className="w-full p-2 border border-gray-300 rounded focus:border-[#1F3864] outline-none text-sm" value={inviteForm.jurisdiction} onChange={e=>setInviteForm({...inviteForm, jurisdiction: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Sub-Role</label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:border-[#1F3864] outline-none text-sm" value={inviteForm.subRole} onChange={e=>setInviteForm({...inviteForm, subRole: e.target.value})}>
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setShowInvite(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1F3864] hover:bg-[#152746] rounded-lg">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
