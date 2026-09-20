import React, { useState } from 'react';
import { Kanban, List, AlertTriangle, ChevronRight, Clock, Building2, Briefcase } from 'lucide-react';
import { mockProjects } from '../govtMockData';

export default function ProjectMonitorTab() {
  const [view, setView] = useState('kanban');
  const [themeFilter, setThemeFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = mockProjects.filter(p => {
    return (themeFilter === 'All' || p.theme === themeFilter) &&
           (districtFilter === 'All' || p.district === districtFilter);
  });

  const stages = ['Prototype', 'Testing', 'Pilot', 'Deployed'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Project Monitor</h2>
          <p className="text-gray-500 mt-1">Track active solution developments platform-wide.</p>
        </div>
        <div className="flex gap-4 items-center">
          <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm outline-none">
            <option value="All">All Districts</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Nashik">Nashik</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Aurangabad">Aurangabad</option>
          </select>
          <div className="flex bg-white rounded-lg p-1 border border-gray-200">
            <button onClick={() => setView('kanban')} className={`px-4 py-1.5 text-sm font-semibold rounded-md flex items-center gap-2 ${view === 'kanban' ? 'bg-gray-100 text-[#1F3864]' : 'text-gray-500 hover:bg-gray-50'}`}><Kanban size={16}/> Board</button>
            <button onClick={() => setView('list')} className={`px-4 py-1.5 text-sm font-semibold rounded-md flex items-center gap-2 ${view === 'list' ? 'bg-gray-100 text-[#1F3864]' : 'text-gray-500 hover:bg-gray-50'}`}><List size={16}/> List</button>
          </div>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map(stage => (
            <div key={stage} className="flex-1 min-w-[300px] bg-gray-50/50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center justify-between">
                {stage}
                <span className="bg-white px-2 py-0.5 rounded-full text-xs border border-gray-200">{filtered.filter(p => p.stage === stage).length}</span>
              </h3>
              <div className="space-y-3">
                {filtered.filter(p => p.stage === stage).map(p => (
                  <div key={p.id} onClick={() => setSelectedProject(p)} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:border-[#1F3864] transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-mono text-xs text-gray-400">{p.id}</div>
                      {p.stalled && <AlertTriangle size={14} className="text-[#C55A11]" />}
                    </div>
                    <div className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#1F3864]">{p.title}</div>
                    <div className="text-xs text-gray-500 mb-3">{p.district} • {p.theme}</div>
                    
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
                      <Building2 size={12}/> <span className="truncate">{p.hei}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-500">ID & Title</th>
                <th className="p-4 font-semibold text-gray-500">Stage</th>
                <th className="p-4 font-semibold text-gray-500">District</th>
                <th className="p-4 font-semibold text-gray-500">Institution</th>
                <th className="p-4 font-semibold text-gray-500">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedProject(p)}>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {p.stalled && <AlertTriangle size={14} className="text-[#C55A11]" />}
                      <span className="font-bold text-gray-900">{p.title}</span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-1">{p.id}</div>
                  </td>
                  <td className="p-4"><span className="px-2 py-1 bg-gray-100 text-gray-700 font-semibold text-xs rounded">{p.stage}</span></td>
                  <td className="p-4">{p.district}</td>
                  <td className="p-4 font-semibold">{p.hei}</td>
                  <td className="p-4 text-xs font-mono">{p.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-out Detail Panel */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${selectedProject ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedProject && (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
              <div>
                <div className="font-mono text-xs text-gray-500 mb-2">{selectedProject.id}</div>
                <h2 className="text-2xl font-bold text-[#1F3864] leading-tight">{selectedProject.title}</h2>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-gray-800"><ChevronRight size={20}/></button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {selectedProject.stalled && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex gap-3 text-orange-900 text-sm">
                  <AlertTriangle size={20} className="shrink-0 text-[#C55A11]" />
                  <div>
                    <strong>Stalled Project Warning</strong><br/>
                    This project has not been updated in over 30 days. You may want to follow up with the assigned institution.
                  </div>
                </div>
              )}

              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-[#2E7D32] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {selectedProject.stage === 'Deployed' ? '100%' : selectedProject.stage === 'Pilot' ? '75%' : selectedProject.stage === 'Testing' ? '50%' : '25%'}
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Current Stage</div>
                  <div className="text-xl font-bold text-gray-900">{selectedProject.stage}</div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Building2 size={20} className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase">Lead Institution (HEI)</div>
                    <div className="font-bold text-gray-900">{selectedProject.hei}</div>
                  </div>
                </div>
                {selectedProject.csr && (
                  <div className="flex items-center gap-3">
                    <Briefcase size={20} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500 font-bold uppercase">Industry / CSR Partner</div>
                      <div className="font-bold text-[#1F3864]">{selectedProject.csr}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase">Last Status Update</div>
                    <div className="font-bold text-gray-900 font-mono text-sm">{selectedProject.lastUpdate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedProject && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setSelectedProject(null)}></div>}
    </div>
  );
}
