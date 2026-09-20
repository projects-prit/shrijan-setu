import React, { useState } from 'react';
import { Search, Filter, MapPin, Tag, Copy, ChevronRight, Check } from 'lucide-react';
import { PriorityBadge, MatchScoreBar } from '../../../components/ui';
import api from '../../../api/axios';

export default function RecommendedTab({ challenges, setChallenges, setProjects, showToast, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const categories = ['All', ...new Set(challenges.map(c => c.category))];

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || (c.location && c.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || c.category === 'All' || c.category === filterCategory;
    return matchesSearch && matchesCategory && c.status === 'matched';
  });

  const handleAccept = async (challenge) => {
    try {
      const res = await api.post(`/projects/${challenge._id}/accept`);
      const newProject = res.data.data;
      
      // Update local state
      setChallenges(challenges.filter(c => c._id !== challenge._id));
      setProjects(prev => [newProject, ...prev]);
      
      setSelectedChallenge(null);
      showToast(`Successfully accepted challenge: ${challenge.title}`);
      
      setTimeout(() => setActiveTab('projects'), 1500);
    } catch (err) {
      console.error(err);
      showToast('Error accepting challenge');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Recommended Challenges</h1>
          <p className="text-sm text-gray-500 mt-1">AI-matched problems based on your institution's expertise.</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search challenges..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1F3864] focus:border-[#1F3864]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#1F3864]"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {filteredChallenges.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500">No challenges match your filters.</p>
          <button onClick={() => {setSearchTerm(''); setFilterCategory('All');}} className="mt-4 text-[#1F3864] font-medium hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <div key={challenge._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex flex-col group">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{challenge.tracking_id || challenge.id}</span>
                  <PriorityBadge priority={challenge.priority || 'High'} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{challenge.title}</h3>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Tag size={14} className="text-gray-400" /> {challenge.category}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin size={14} className="text-gray-400" /> {challenge.location}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{challenge.description}</p>
                
                {challenge.clusterCount > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-[#C55A11] bg-orange-50 px-2 py-1 rounded w-fit mb-4">
                    <Copy size={12} /> {challenge.clusterCount} similar reported
                  </div>
                )}
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs text-gray-500">AI Match Score</span>
                  </div>
                  <MatchScoreBar score={challenge.matchScore || 95} />
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={() => setSelectedChallenge(challenge)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#1F3864] hover:bg-white rounded transition-colors"
                >
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{selectedChallenge.tracking_id || selectedChallenge.id}</span>
                    <PriorityBadge priority={selectedChallenge.priority || 'High'} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1F3864]">{selectedChallenge.title}</h2>
                </div>
                <button onClick={() => setSelectedChallenge(null)} className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Category</p>
                  <p className="font-medium text-sm flex items-center gap-2"><Tag size={14} className="text-[#1F3864]" /> {selectedChallenge.category}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-sm flex items-center gap-2"><MapPin size={14} className="text-[#1F3864]" /> {selectedChallenge.location}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Submitted By</p>
                  <p className="font-medium text-sm">{selectedChallenge.submitted_by?.profile?.name || selectedChallenge.submitter || 'Citizen'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Date Reported</p>
                  <p className="font-medium text-sm">{selectedChallenge.created_at ? new Date(selectedChallenge.created_at).toLocaleDateString() : selectedChallenge.date}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Detailed Description</h3>
                <p className="text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100/50">
                  {selectedChallenge.description}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Attached Media</h3>
                <div className="flex gap-4">
                  <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                    Image 1
                  </div>
                  <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                    Video 1
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end border-t border-gray-100 pt-6">
                <button onClick={() => setSelectedChallenge(null)} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Close
                </button>
                <button onClick={() => handleAccept(selectedChallenge)} className="px-5 py-2.5 bg-[#2E7D32] hover:bg-[#256a29] text-white font-medium rounded-lg shadow-md transition-all flex items-center gap-2">
                  <Check size={18} /> Accept Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add a dummy X icon since it was used but not imported
function X(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  );
}
