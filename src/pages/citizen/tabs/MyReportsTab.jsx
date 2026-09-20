import React, { useState } from 'react';
import { Search, MapPin, ChevronRight, X, Droplets, BookOpen, Truck, Leaf, Zap, Star } from 'lucide-react';

export default function MyReportsTab({ myReports, setMyReports, showToast }) {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const filteredReports = myReports.filter(r => {
    const trackingId = r.tracking_id || r.id;
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || trackingId.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'All') return matchesSearch;
    if (filter === 'Resolved') return matchesSearch && r.status === 'deployed';
    return matchesSearch && r.status !== 'deployed';
  });

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Water Issue': return <Droplets size={20} className="text-blue-500" />;
      case 'Education': return <BookOpen size={20} className="text-purple-500" />;
      case 'Road/Infrastructure': return <Truck size={20} className="text-gray-500" />;
      case 'Environment': return <Leaf size={20} className="text-green-500" />;
      default: return <Zap size={20} className="text-orange-500" />;
    }
  };

  const statusList = ['submitted', 'matched', 'prototype', 'testing', 'pilot', 'deployed'];
  const statusLabels = ['Submitted', 'Matched', 'Prototype', 'Testing', 'Pilot', 'Deployed'];
  
  const getStatusIndex = (status) => statusList.indexOf(status?.toLowerCase() || 'submitted');

  const handleSubmitRating = () => {
    if (rating === 0) return showToast('Please select a star rating.');
    
    setMyReports(myReports.map(r => {
      if (r.id === selectedReport.id) {
        return { ...r, rating, feedback };
      }
      return r;
    }));
    showToast('Thank you for your feedback!');
    setSelectedReport(null);
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="space-y-4 pb-6">
      
      {/* Filters & Search */}
      {!selectedReport && (
        <div className="space-y-4 animate-fade-in-up">
          <div className="flex gap-2 bg-gray-200 p-1 rounded-xl">
            {['All', 'In Progress', 'Resolved'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter === f ? 'bg-white text-[#1F3864] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search your reports..." 
              className="w-full pl-10 pr-4 py-3 border-none bg-white rounded-xl shadow-sm text-base focus:ring-2 focus:ring-[#1F3864] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {filteredReports.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                <p className="text-gray-500 text-lg">No reports match your search.</p>
              </div>
            ) : (
              filteredReports.map(report => {
                const currentStageIdx = getStatusIndex(report.status);
                return (
                  <div 
                    key={report.id} 
                    onClick={() => setSelectedReport(report)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
                          {getCategoryIcon(report.category)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400">{report.tracking_id || report.id}</p>
                          <p className="text-xs text-gray-500">
                            {report.created_at ? new Date(report.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : report.submittedDate}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${report.status === 'deployed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 line-clamp-2">{report.title}</h3>
                    
                    {/* Progress Bar (Mini) */}
                    <div className="flex gap-1 mb-1">
                      {statusList.map((s, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= currentStageIdx ? (report.status === 'deployed' ? 'bg-[#2E7D32]' : 'bg-[#1F3864]') : 'bg-gray-100'}`}></div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Detail View */}
      {selectedReport && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
          <div className="p-4 border-b border-gray-100 flex justify-between items-start bg-gray-50">
            <div>
              <p className="text-sm font-bold text-gray-500">{selectedReport.tracking_id || selectedReport.id}</p>
              <h2 className="text-xl font-bold text-[#1F3864] leading-tight mt-1">{selectedReport.title}</h2>
              <p className="text-sm text-gray-600 mt-2 flex items-center gap-1"><MapPin size={16}/> {selectedReport.location}</p>
            </div>
            <button 
              onClick={() => { setSelectedReport(null); setRating(0); setFeedback(''); }} 
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 text-gray-600 shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Progress</h3>
            
            {/* Visual Tracker */}
            <div className="relative mb-8 px-2">
              <div className="absolute top-4 left-6 right-6 h-1 bg-gray-200 -z-10 rounded-full"></div>
              <div 
                className="absolute top-4 left-6 h-1 bg-[#2E7D32] -z-10 rounded-full transition-all duration-500"
                style={{ width: `calc(${getStatusIndex(selectedReport.status) / (statusList.length - 1) * 100}% - 3rem)` }}
              ></div>
              
              <div className="flex justify-between">
                {statusList.map((step, idx) => {
                  const isCompleted = idx <= getStatusIndex(selectedReport.status);
                  const isCurrent = idx === getStatusIndex(selectedReport.status);
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-1 transition-colors ${
                        isCompleted ? 'bg-[#2E7D32] text-white shadow-md' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      } ${isCurrent && selectedReport.status !== 'deployed' ? 'ring-4 ring-green-100 animate-pulse' : ''}`}>
                        {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-2 font-bold text-[#2E7D32] capitalize">{selectedReport.status}</div>
            </div>

            {/* Timeline */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4 mb-6">
              {selectedReport.timeline ? [...selectedReport.timeline].reverse().map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#1F3864] mt-1.5"></div>
                    {idx !== selectedReport.timeline.length - 1 && <div className="w-px h-full bg-gray-200 my-1"></div>}
                  </div>
                  <div className="pb-4">
                    <p className="text-base font-bold text-gray-900">{event.status}</p>
                    <p className="text-sm text-gray-700 mt-1">{event.note}</p>
                    <p className="text-xs text-gray-400 mt-1">{event.date}</p>
                  </div>
                </div>
              )) : (
                <div className="text-gray-500 text-sm italic">Detailed timeline will be available once a project starts.</div>
              )}
            </div>

            {/* Rating Box (Only if Deployed and not yet rated) */}
            {selectedReport.status === 'Deployed' && selectedReport.rating === undefined && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-4">
                <h3 className="font-bold text-[#1F3864] text-lg text-center mb-2">Rate this solution</h3>
                <p className="text-sm text-blue-800 text-center mb-4">Are you satisfied with how this was resolved?</p>
                
                <div className="flex justify-center gap-2 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <button 
                      key={star} 
                      onClick={() => setRating(star)}
                      className={`transition-transform hover:scale-110 p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star size={36} fill={rating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
                
                {rating > 0 && (
                  <div className="animate-fade-in-up space-y-3">
                    <textarea 
                      rows="2" 
                      placeholder="Any comments? (Optional)"
                      className="w-full rounded-lg border-gray-300 p-3 text-sm focus:ring-[#1F3864] outline-none border"
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                    ></textarea>
                    <button onClick={handleSubmitRating} className="w-full bg-[#1F3864] text-white py-3 rounded-lg font-bold shadow-sm">
                      Submit Feedback
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {selectedReport.rating !== undefined && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-4 flex items-center gap-3">
                <div className="bg-white p-2 rounded-full text-green-600"><CheckCircle2 size={24}/></div>
                <div>
                  <p className="font-bold text-green-800">Feedback submitted</p>
                  <p className="text-xs text-green-700">Thank you for helping improve our community!</p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// Dummy check circle for timeline
function CheckCircle2(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
  );
}
