import React, { useState } from 'react';
import { Search, MapPin, Tag, Users, ShieldCheck, ChevronRight, X, Heart } from 'lucide-react';
import { StatusChip } from '../../../components/ui';
import api from '../../../api/axios';

export default function DiscoverTab({ projects, setProjects, setCollaborations, setFunding, showToast, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStage, setFilterStage] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Support Form State
  const [supportTypes, setSupportTypes] = useState([]);
  const [message, setMessage] = useState('');
  const [pledgeAmount, setPledgeAmount] = useState('');

  const categories = ['All', ...new Set(projects.map(p => p.challenge_id?.category).filter(Boolean))];
  const stages = ['All', 'prototype', 'testing', 'pilot', 'deployed'];

  const filteredProjects = projects.filter(p => {
    const title = p.challenge_id?.title || '';
    const university = p.hei_id?.profile?.institutionName || '';
    const category = p.challenge_id?.category || '';

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || category === filterCategory;
    const matchesStage = filterStage === 'All' || p.stage === filterStage;
    return matchesSearch && matchesCategory && matchesStage;
  });

  const toggleSupportType = (type) => {
    if (supportTypes.includes(type)) {
      setSupportTypes(supportTypes.filter(t => t !== type));
    } else {
      setSupportTypes([...supportTypes, type]);
    }
  };

  const handleOfferSupport = async (e) => {
    e.preventDefault();
    if (supportTypes.length === 0) {
      showToast('Please select at least one type of support.');
      return;
    }

    try {
      const typeStr = supportTypes.join(', ');
      const res = await api.post('/collaborations', {
        project_id: selectedProject._id,
        support_type: typeStr,
        pledge_amount: pledgeAmount ? parseInt(pledgeAmount) : 0
      });

      // Update state
      setCollaborations(prev => [res.data.data, ...prev]);

      setSelectedProject(null);
      setSupportTypes([]);
      setMessage('');
      setPledgeAmount('');
      showToast(`Support offer sent to ${selectedProject.hei_id?.profile?.institutionName || 'HEI'}!`);
      setTimeout(() => setActiveTab('collaborations'), 1500);
    } catch (err) {
      console.error(err);
      showToast('Error sending support offer.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Discover Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Find active university projects seeking CSR or industry support.</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or HEI..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1F3864] outline-none"
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
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#1F3864]"
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
          >
            {stages.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500">No projects match your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{project.hei_id?.profile?.institutionName || 'HEI'}</span>
                  </div>
                  <StatusChip status={project.stage.charAt(0).toUpperCase() + project.stage.slice(1)} />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{project.challenge_id?.title || 'Unknown Title'}</h3>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Tag size={14} className="text-gray-400" /> {project.challenge_id?.category || 'General'}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin size={14} className="text-gray-400" /> {project.challenge_id?.location || 'Unknown'}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{project.challenge_id?.description}</p>
                
                <div className="bg-gray-50 rounded p-3 text-xs mb-4">
                  <div className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <Users size={14} /> Impact Estimate: <span className="text-[#2E7D32]">{(project.teamSize || 0) + 10}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded border font-medium bg-green-50 text-green-700 border-green-200">
                      Requires Funding
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#1F3864] hover:bg-white border border-transparent hover:border-gray-200 rounded transition-colors"
                >
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Offer Support Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={18} className="text-[#1F3864]" />
                  <span className="text-sm font-bold text-gray-700">{selectedProject.hei_id?.profile?.institutionName || 'HEI'}</span>
                  <span className="text-gray-300">•</span>
                  <StatusChip status={selectedProject.stage.charAt(0).toUpperCase() + selectedProject.stage.slice(1)} />
                </div>
                <h2 className="text-2xl font-bold text-[#1F3864]">{selectedProject.challenge_id?.title || 'Unknown Title'}</h2>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-700 bg-white border border-gray-200 rounded-full p-1 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
              <div className="p-6 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Project Details</h3>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {selectedProject.challenge_id?.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded border border-green-100">
                    <p className="text-xs text-gray-500 mb-1">Impact</p>
                    <p className="font-bold text-sm text-[#2E7D32]">{(selectedProject.teamSize || 0) + 10}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="font-bold text-sm text-[#1F3864]">{selectedProject.challenge_id?.location || 'Unknown'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Milestones Achieved</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    {(selectedProject.stage_history || []).map((m, i) => <li key={i} className="capitalize">Moved to {m.stage}</li>)}
                  </ul>
                </div>
              </div>

              <div className="p-6 md:w-1/2 bg-gray-50">
                <h3 className="text-lg font-bold text-[#1F3864] mb-4 flex items-center gap-2"><Heart size={20} className="text-red-500" /> Offer Support</h3>
                <form onSubmit={handleOfferSupport} className="space-y-5">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">How can you help?</label>
                    <div className="flex gap-2 flex-wrap">
                      {['Funding', 'Mentoring', 'Technical Support'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleSupportType(type)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${supportTypes.includes(type) ? 'bg-[#1F3864] text-white border-[#1F3864]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {supportTypes.includes('Funding') && (
                    <div className="animate-fade-in-down">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pledge Amount (₹)</label>
                      <input 
                        type="number" 
                        required
                        placeholder={`Requested: ₹${selectedProject.fundingRequested.toLocaleString()}`}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#1F3864] outline-none"
                        value={pledgeAmount}
                        onChange={e => setPledgeAmount(e.target.value)}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message to the HEI Team</label>
                    <textarea 
                      required
                      rows="3" 
                      placeholder="Introduce yourself and explain how you'd like to help..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#1F3864] outline-none"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button type="submit" className="w-full py-2.5 bg-[#2E7D32] hover:bg-[#256a29] text-white font-medium rounded-lg shadow-md transition-all">
                      Submit Support Offer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
