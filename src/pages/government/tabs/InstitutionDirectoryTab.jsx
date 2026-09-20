import React, { useState } from 'react';
import { Search, Building2, Briefcase, Award, TrendingUp, ChevronRight, X } from 'lucide-react';
import { mockInstitutions } from '../govtMockData';

export default function InstitutionDirectoryTab() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInst, setSelectedInst] = useState(null);

  const filtered = mockInstitutions.filter(i => {
    return (typeFilter === 'All' || i.type === typeFilter) &&
           (i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.region.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Institution Directory</h2>
          <p className="text-gray-500 mt-1">Track performance of verified Universities (HEIs) and Industry Partners.</p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name or region..." 
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1F3864]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1F3864]">
          <option value="All">All Types</option>
          <option value="HEI">Universities (HEI)</option>
          <option value="CSR">Industry (CSR)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(inst => (
          <div key={inst.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full ${inst.type === 'HEI' ? 'bg-blue-100' : 'bg-green-100'}`}></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${inst.type === 'HEI' ? 'bg-[#1F3864] text-white' : 'bg-[#2E7D32] text-white'}`}>
                {inst.type === 'HEI' ? <Building2 size={20}/> : <Briefcase size={20}/>}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{inst.name}</h3>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{inst.type} • {inst.region}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {inst.type === 'HEI' ? (
                <>
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Challenges Solved</div>
                    <div className="text-xl font-bold text-gray-900">{inst.solved}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Avg Deployment</div>
                    <div className="text-xl font-bold text-gray-900">{inst.timeToDeploy}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Funding Provided</div>
                    <div className="text-xl font-bold text-[#2E7D32]">{inst.funding}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Projects Supported</div>
                    <div className="text-xl font-bold text-gray-900">{inst.projectsSupported}</div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <div className="flex items-end gap-1 h-8 opacity-70">
                {inst.sparkline.map((val, i) => (
                  <div key={i} className={`w-3 rounded-t-sm ${inst.type === 'HEI' ? 'bg-[#1F3864]' : 'bg-[#2E7D32]'}`} style={{ height: `${(val/50)*100}%` }}></div>
                ))}
              </div>
              <button onClick={() => setSelectedInst(inst)} className="text-sm font-semibold text-gray-600 hover:text-[#1F3864] flex items-center gap-1 group-hover:underline">
                View Profile <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedInst && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
            <div className={`h-24 ${selectedInst.type === 'HEI' ? 'bg-[#1F3864]' : 'bg-[#2E7D32]'}`}></div>
            <button onClick={() => setSelectedInst(null)} className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full"><X size={24}/></button>
            
            <div className="px-8 pb-8 flex-1 overflow-y-auto">
              <div className="w-20 h-20 bg-white rounded-full p-1 -mt-10 mb-4 shadow-lg">
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                  {selectedInst.type === 'HEI' ? <Building2 size={32} className="text-[#1F3864]"/> : <Briefcase size={32} className="text-[#2E7D32]"/>}
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{selectedInst.name}</h2>
              <p className="text-gray-500 font-semibold mb-6 uppercase tracking-wider text-sm">{selectedInst.type} Organization • {selectedInst.region}</p>

              <h3 className="font-bold text-gray-900 mb-4">Performance Track Record</h3>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-3xl font-black text-[#1F3864] mb-1">{selectedInst.type === 'HEI' ? selectedInst.solved : selectedInst.projectsSupported}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Total Deployments</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-3xl font-black text-[#2E7D32] mb-1">{selectedInst.type === 'HEI' ? '4.8' : 'N/A'}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Avg Citizen Rating</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-3xl font-black text-[#C55A11] mb-1">{selectedInst.type === 'HEI' ? '12' : '₹12.5Cr'}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">{selectedInst.type === 'HEI' ? 'Active Projects' : 'Total Funding'}</div>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-100 rounded-lg flex gap-4">
                  <Award className="text-[#2E7D32] shrink-0"/>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Deployed Smart Traffic System in Thane</h4>
                    <p className="text-xs text-gray-500 mt-1">Completed 2 weeks ahead of schedule.</p>
                  </div>
                </div>
                <div className="p-4 border border-gray-100 rounded-lg flex gap-4">
                  <TrendingUp className="text-[#1F3864] shrink-0"/>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Started Pilot Phase for Water Filtration</h4>
                    <p className="text-xs text-gray-500 mt-1">Currently testing in 3 villages in Nashik.</p>
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
