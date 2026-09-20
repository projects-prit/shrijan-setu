import React, { useState } from 'react';
import { Star, MessageSquare, AlertTriangle, Send } from 'lucide-react';
import { mockFeedback } from '../govtMockData';

export default function CitizenFeedbackTab({ showToast }) {
  const [districtFilter, setDistrictFilter] = useState('All');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [note, setNote] = useState('');

  const filtered = mockFeedback.filter(f => districtFilter === 'All' || f.district === districtFilter);
  const needsReview = filtered.filter(f => f.rating <= 3);

  const handleFollowUp = (e) => {
    e.preventDefault();
    showToast("Follow-up task assigned to the relevant department.");
    setSelectedFeedback(null);
    setNote('');
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={16} className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} />
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Citizen Feedback</h2>
          <p className="text-gray-500 mt-1">Monitor public satisfaction with deployed solutions.</p>
        </div>
        <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none">
          <option value="All">All Districts</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Nashik">Nashik</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Aurangabad">Aurangabad</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-900">Recent Reviews</h3>
          {filtered.map(f => (
            <div key={f.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(f.rating)}</div>
                  <span className="text-xs text-gray-400 font-mono">{f.date}</span>
                </div>
                <p className="text-gray-800 text-sm mb-3">"{f.comment}"</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">{f.district}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">{f.theme}</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-100">No feedback found.</div>}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Overall Satisfaction</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-black text-[#1F3864]">3.8</div>
              <div>
                <div className="flex">{renderStars(4)}</div>
                <div className="text-xs text-gray-500 mt-1">Based on 1,245 reviews</div>
              </div>
            </div>
            <div className="space-y-2">
              {[5,4,3,2,1].map(star => (
                <div key={star} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 flex justify-end gap-1 items-center">{star} <Star size={12}/></div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1F3864]" style={{width: `${star * 15 + Math.random()*10}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
            <h3 className="font-bold text-orange-900 flex items-center gap-2 mb-4">
              <AlertTriangle size={18} /> Needs Review ({needsReview.length})
            </h3>
            <div className="space-y-3">
              {needsReview.map(f => (
                <div key={f.id} className="bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                  <div className="flex mb-1">{renderStars(f.rating)}</div>
                  <p className="text-xs text-gray-800 line-clamp-2 mb-2">"{f.comment}"</p>
                  <button onClick={() => setSelectedFeedback(f)} className="text-xs font-bold text-[#C55A11] hover:underline">Follow up →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-[#1F3864]">Assign Follow-up Task</h3>
              <button onClick={() => setSelectedFeedback(null)} className="text-gray-400 hover:text-gray-800">×</button>
            </div>
            <form onSubmit={handleFollowUp} className="p-5 space-y-4">
              <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm italic text-gray-600">
                "{selectedFeedback.comment}"
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Assign to Department</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]">
                  <option>Local Municipal Corporation</option>
                  <option>Public Works Department</option>
                  <option>Health Ministry</option>
                  <option>Assigned HEI Project Lead</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Action Note</label>
                <textarea 
                  required
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864] h-24" 
                  placeholder="Describe what needs to be checked..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-[#1F3864] text-white py-2 rounded-lg font-bold text-sm flex justify-center items-center gap-2 hover:bg-blue-900 transition-colors">
                <Send size={16}/> Dispatch Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
