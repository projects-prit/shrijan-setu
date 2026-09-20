import React, { useState } from 'react';
import { Search, Filter, MapPin, List, Eye, X } from 'lucide-react';
import { mockChallenges } from '../govtMockData';

export default function ChallengeExplorerTab() {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [themeFilter, setThemeFilter] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const filtered = mockChallenges.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDistrict = districtFilter === 'All' || c.district === districtFilter;
    const matchTheme = themeFilter === 'All' || c.category === themeFilter;
    return matchSearch && matchDistrict && matchTheme;
  });

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-orange-100 text-[#C55A11] border-orange-200';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-[#2E7D32] border-green-200';
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Challenge Explorer</h2>
          <p className="text-gray-500 mt-1">Search, filter, and drill down into all citizen-submitted issues.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-gray-200">
          <button onClick={() => setView('list')} className={`px-4 py-1.5 text-sm font-semibold rounded-md flex items-center gap-2 ${view === 'list' ? 'bg-gray-100 text-[#1F3864]' : 'text-gray-500 hover:bg-gray-50'}`}><List size={16}/> List</button>
          <button onClick={() => setView('map')} className={`px-4 py-1.5 text-sm font-semibold rounded-md flex items-center gap-2 ${view === 'map' ? 'bg-gray-100 text-[#1F3864]' : 'text-gray-500 hover:bg-gray-50'}`}><MapPin size={16}/> Map Pins</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 bg-gray-50">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search ID, title, or keyword..." 
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1F3864]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1F3864]">
            <option value="All">All Districts</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Nashik">Nashik</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Aurangabad">Aurangabad</option>
            <option value="Thane">Thane</option>
            <option value="Palghar">Palghar</option>
          </select>
          <select value={themeFilter} onChange={e => setThemeFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1F3864]">
            <option value="All">All Themes</option>
            <option value="Civic Infrastructure">Civic Infrastructure</option>
            <option value="Smart Education">Smart Education</option>
            <option value="Water & Sanitation">Water & Sanitation</option>
            <option value="Health">Health</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Environment">Environment</option>
          </select>
        </div>

        {view === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-500">ID & Title</th>
                  <th className="p-4 font-semibold text-gray-500">Category</th>
                  <th className="p-4 font-semibold text-gray-500">District</th>
                  <th className="p-4 font-semibold text-gray-500">Priority</th>
                  <th className="p-4 font-semibold text-gray-500">Status</th>
                  <th className="p-4 font-semibold text-gray-500">Date</th>
                  <th className="p-4 font-semibold text-center text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedChallenge(c)}>
                    <td className="p-4">
                      <div className="font-mono text-xs text-gray-400 mb-1">{c.id}</div>
                      <div className="font-bold text-gray-900 line-clamp-1">{c.title}</div>
                    </td>
                    <td className="p-4">{c.category}</td>
                    <td className="p-4">{c.district}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded border ${getPriorityColor(c.priority)}`}>{c.priority}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded text-xs">{c.status}</span>
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-500">{c.date}</td>
                    <td className="p-4 text-center">
                      <button className="text-[#1F3864] hover:bg-blue-50 p-1.5 rounded"><Eye size={18}/></button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="7" className="p-12 text-center text-gray-400">No challenges match your filters.</td></tr>}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 bg-gray-100 flex flex-col items-center justify-center min-h-[400px]">
            <MapPin size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-500">Map View (Simulated)</h3>
            <p className="text-gray-400">In production, this would render an interactive Mapbox or Leaflet map plotting {filtered.length} pins based on GPS coordinates.</p>
          </div>
        )}
      </div>

      {/* Slide-out Detail Panel */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${selectedChallenge ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedChallenge && (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
              <div>
                <div className="font-mono text-xs text-gray-500 mb-2">{selectedChallenge.id}</div>
                <h2 className="text-2xl font-bold text-[#1F3864] leading-tight">{selectedChallenge.title}</h2>
              </div>
              <button onClick={() => setSelectedChallenge(null)} className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-800 shadow-sm"><X size={20}/></button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status</div>
                  <div className="font-bold text-gray-900">{selectedChallenge.status}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Priority</div>
                  <div className="font-bold text-gray-900">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded border ${getPriorityColor(selectedChallenge.priority)}`}>{selectedChallenge.priority}</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">District</div>
                  <div className="font-bold text-gray-900">{selectedChallenge.district}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Theme</div>
                  <div className="font-bold text-gray-900">{selectedChallenge.category}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">{selectedChallenge.description}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Matched Institution</h3>
                {selectedChallenge.hei === 'Unassigned' ? (
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg text-sm text-orange-800 flex items-center gap-2">
                    <AlertTriangle size={16}/> Still waiting for an institution to accept this challenge.
                  </div>
                ) : (
                  <div className="p-4 bg-white border border-gray-200 rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">HI</div>
                    <div>
                      <div className="font-bold text-[#1F3864]">{selectedChallenge.hei}</div>
                      <div className="text-xs text-gray-500">Currently leading resolution efforts.</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Media Attachment</h3>
                <div className="w-full h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm font-semibold">
                  [ Image/Video Placeholder ]
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for slide-out */}
      {selectedChallenge && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setSelectedChallenge(null)}></div>}
    </div>
  );
}
