import React, { useState } from 'react';
import { LayoutList, LayoutGrid, Clock, Users, ArrowRight, X, MessageSquare, Plus, FileText } from 'lucide-react';
import { StatusChip } from '../../../components/ui';
import api from '../../../api/axios';

export default function ProjectsTab({ projects, setProjects, team }) {
  const [viewMode, setViewMode] = useState('kanban'); // 'table' or 'kanban'
  const [selectedProject, setSelectedProject] = useState(null);
  const [newNote, setNewNote] = useState('');

  const stages = ['prototype', 'testing', 'pilot', 'deployed'];

  const moveProject = async (projectId, newStage) => {
    try {
      const res = await api.patch(`/projects/${projectId}/stage`, { stage: newStage });
      setProjects(projects.map(p => {
        if (p._id === projectId) {
          return { ...p, stage: newStage, stage_history: res.data.data.stage_history };
        }
        return p;
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = (projectId) => {
    // Note logic will remain local mock for now as we don't have a notes endpoint
    if (!newNote.trim()) return;
    setProjects(projects.map(p => {
      if (p._id === projectId) {
        return { ...p, notes: [...(p.notes || []), newNote] };
      }
      return p;
    }));
    setNewNote('');
  };

  const deleteNote = (projectId, noteIndex) => {
    setProjects(projects.map(p => {
      if (p._id === projectId) {
        return { ...p, notes: (p.notes || []).filter((_, idx) => idx !== noteIndex) };
      }
      return p;
    }));
  };

  const projectTeam = (projectId) => team.filter(t => t.project === projectId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">My Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage your accepted challenges through to deployment.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1.5 flex items-center gap-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white text-[#1F3864] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <LayoutGrid size={16} /> Kanban
          </button>
          <button 
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 flex items-center gap-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'table' ? 'bg-white text-[#1F3864] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <LayoutList size={16} /> Table
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
          {stages.map(stage => (
            <div key={stage} className="flex-none w-80 bg-gray-50 rounded-xl p-4 snap-center border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">{stage}</h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                  {projects.filter(p => p.stage === stage).length}
                </span>
              </div>
              <div className="space-y-4">
                {projects.filter(p => p.stage === stage).map(project => (
                  <div key={project._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-[#1F3864] cursor-pointer transition-colors" onClick={() => setSelectedProject(project)}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-gray-400">PRJ-{project._id.substring(project._id.length - 6).toUpperCase()}</span>
                      <select 
                        className="text-xs border border-gray-200 rounded outline-none p-1 bg-gray-50 text-gray-600 cursor-pointer capitalize"
                        value={project.stage}
                        onChange={(e) => { e.stopPropagation(); moveProject(project._id, e.target.value); }}
                      >
                        {stages.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 mb-3">{project.challenge_id?.title || 'Unknown Challenge'}</h4>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={14} /> {project.teamSize || projectTeam(project._id).length || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} /> {project.daysActive || 0}d
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project ID</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Team</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Next Milestone</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map(project => (
                <tr key={project._id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedProject(project)}>
                  <td className="p-4 text-sm font-mono text-gray-500">PRJ-{project._id.substring(project._id.length - 6).toUpperCase()}</td>
                  <td className="p-4 text-sm font-bold text-gray-900">{project.challenge_id?.title || 'Unknown Challenge'}</td>
                  <td className="p-4"><StatusChip status={project.stage.charAt(0).toUpperCase() + project.stage.slice(1)} /></td>
                  <td className="p-4 text-sm text-gray-600 flex items-center gap-1"><Users size={16} /> {project.teamSize || projectTeam(project._id).length || 0}</td>
                  <td className="p-4 text-sm text-gray-600">{project.nextMilestone || 'Pending'}</td>
                  <td className="p-4 text-right">
                    <button className="text-[#1F3864] hover:bg-blue-50 p-2 rounded-full"><ArrowRight size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded">PRJ-{selectedProject._id.substring(selectedProject._id.length - 6).toUpperCase()}</span>
                  <StatusChip status={selectedProject.stage.charAt(0).toUpperCase() + selectedProject.stage.slice(1)} />
                </div>
                <h2 className="text-2xl font-bold text-[#1F3864]">{selectedProject.challenge_id?.title || 'Unknown Challenge'}</h2>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-700 bg-white border border-gray-200 rounded-full p-1 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2"><Clock size={16} /> History & Timeline</h3>
                  <div className="space-y-4">
                    {(selectedProject.stage_history || []).map((event, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-[#1F3864] mt-1.5"></div>
                          {idx !== (selectedProject.stage_history || []).length -1 && <div className="w-px h-full bg-gray-200 my-1"></div>}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-bold text-gray-900 capitalize">{event.stage}</p>
                          <p className="text-xs text-gray-500">{new Date(event.date || Date.now()).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2"><FileText size={16} /> Attached Documents</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                      <span className="text-sm text-[#1F3864] font-medium">Proposal_v1.pdf</span>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                      <span className="text-sm text-[#1F3864] font-medium">Design_Specs.docx</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2"><Users size={16} /> Team Members</h3>
                  <div className="space-y-3">
                    {projectTeam(selectedProject.id).length > 0 ? (
                      projectTeam(selectedProject.id).map(member => (
                        <div key={member.id} className="bg-white p-3 border border-gray-200 rounded-lg">
                          <p className="text-sm font-bold text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">No team members assigned.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2"><MessageSquare size={16} /> Notes</h3>
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {(selectedProject.notes || []).map((note, idx) => (
                      <div key={idx} className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg relative group text-sm text-gray-800">
                        {note}
                        <button onClick={() => deleteNote(selectedProject._id, idx)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add a note..." 
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none"
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addNote(selectedProject._id)}
                    />
                    <button onClick={() => addNote(selectedProject._id)} className="bg-[#1F3864] text-white p-2 rounded hover:bg-[#152746]">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
