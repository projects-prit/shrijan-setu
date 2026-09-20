import React, { useState } from 'react';
import { UserPlus, Trash2, Mail, Briefcase } from 'lucide-react';

export default function TeamTab({ team, setTeam, projects, showToast }) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', email: '', project: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    const newMember = {
      id: `T-${Math.floor(Math.random() * 1000)}`,
      ...formData
    };
    
    setTeam([...team, newMember]);
    setFormData({ name: '', role: '', email: '', project: '' });
    setIsAdding(false);
    showToast(`${formData.name} added to the team.`);
  };

  const handleRemove = (id, name) => {
    if(window.confirm(`Are you sure you want to remove ${name} from the team?`)) {
      setTeam(team.filter(t => t.id !== id));
      showToast(`${name} removed.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Team Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage faculty and students assigned to active projects.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1F3864] text-white rounded-lg hover:bg-[#152746] font-medium text-sm transition-colors"
        >
          {isAdding ? <X size={18} /> : <UserPlus size={18} />}
          {isAdding ? 'Cancel' : 'Add Team Member'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 animate-fade-in-down">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Member</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
              <input required type="text" placeholder="e.g. Student (B.Tech)" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input required type="email" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Assign to Project</label>
              <select required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none bg-white" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})}>
                <option value="">Select a project...</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.id} - {p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" className="w-full py-2 bg-[#2E7D32] text-white rounded font-medium hover:bg-[#256a29]">
                Save Member
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => {
          const assignedProject = projects.find(p => p.id === member.project);
          return (
            <div key={member.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl uppercase">
                  {member.name.charAt(0)}
                </div>
                <button onClick={() => handleRemove(member.id, member.name)} className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-gray-50 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 leading-tight">{member.name}</h3>
              <p className="text-sm text-[#1F3864] font-medium mb-4">{member.role}</p>
              
              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-gray-400" /> {member.email}
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <Briefcase size={14} className="text-gray-400 mt-1 shrink-0" /> 
                  <span className="leading-tight">
                    {assignedProject ? <><span className="font-mono text-xs">{assignedProject.id}</span> {assignedProject.title}</> : 'Unassigned'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Add a dummy X icon
function X(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  );
}
