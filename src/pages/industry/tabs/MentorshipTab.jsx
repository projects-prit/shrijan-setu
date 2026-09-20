import React, { useState } from 'react';
import { Users, Calendar, MessageSquare, Plus } from 'lucide-react';

export default function MentorshipTab({ mentorships, setMentorships, collabs, showToast }) {
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleData, setScheduleData] = useState({ mentorshipId: '', date: '', time: '', topic: '' });
  const [outcome, setOutcome] = useState({ id: '', text: '' });

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!scheduleData.mentorshipId || !scheduleData.date || !scheduleData.time) return;

    setMentorships(mentorships.map(m => {
      if (m.id === scheduleData.mentorshipId) {
        return { ...m, nextSession: `${scheduleData.date}T${scheduleData.time}` };
      }
      return m;
    }));
    
    setScheduleData({ mentorshipId: '', date: '', time: '', topic: '' });
    setIsScheduling(false);
    showToast('Session scheduled successfully.');
  };

  const handleLogOutcome = (id) => {
    if (!outcome.text.trim()) return;
    
    setMentorships(mentorships.map(m => {
      if (m.id === id) {
        return { 
          ...m, 
          sessionCount: m.sessionCount + 1, 
          nextSession: null,
          notes: [...m.notes, outcome.text]
        };
      }
      return m;
    }));
    
    setOutcome({ id: '', text: '' });
    showToast('Session outcome logged.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Mentorship Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Manage technical support and mentoring sessions with university teams.</p>
        </div>
        <button 
          onClick={() => setIsScheduling(!isScheduling)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1F3864] text-white rounded-lg hover:bg-[#152746] font-medium text-sm transition-colors"
        >
          {isScheduling ? <X size={18} /> : <Calendar size={18} />}
          {isScheduling ? 'Cancel' : 'Schedule Session'}
        </button>
      </div>

      {isScheduling && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 animate-fade-in-down">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Schedule a Session</h2>
          <form onSubmit={handleSchedule} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Select Mentorship</label>
              <select required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none bg-white" value={scheduleData.mentorshipId} onChange={e => setScheduleData({...scheduleData, mentorshipId: e.target.value})}>
                <option value="">Select...</option>
                {mentorships.map(m => (
                  <option key={m.id} value={m.id}>{m.projectId} - {m.projectTitle}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
              <input required type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none" value={scheduleData.date} onChange={e => setScheduleData({...scheduleData, date: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
              <input required type="time" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none" value={scheduleData.time} onChange={e => setScheduleData({...scheduleData, time: e.target.value})} />
            </div>
            <div>
              <button type="submit" className="w-full py-2 bg-[#2E7D32] text-white rounded font-medium hover:bg-[#256a29]">
                Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentorships.map(mentor => (
          <div key={mentor.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{mentor.projectId}</span>
              <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
                <Users size={12}/> {mentor.sessionCount} Sessions
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-[#1F3864] mb-1 leading-tight">{mentor.projectTitle}</h3>
            <p className="text-sm text-gray-600 mb-4 flex items-center gap-2"><Users size={14}/> Mentor: <span className="font-medium">{mentor.mentor}</span></p>
            
            <div className="mt-auto pt-4 border-t border-gray-100">
              {mentor.nextSession ? (
                <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg mb-3">
                  <p className="text-xs text-orange-800 font-bold uppercase mb-1 flex items-center gap-1"><Calendar size={12}/> Upcoming Session</p>
                  <p className="text-sm font-medium text-orange-900">{new Date(mentor.nextSession).toLocaleString()}</p>
                </div>
              ) : (
                <div className="mb-3">
                  <p className="text-sm text-gray-500 italic">No upcoming sessions scheduled.</p>
                </div>
              )}

              {mentor.nextSession && outcome.id !== mentor.id ? (
                <button onClick={() => setOutcome({ id: mentor.id, text: '' })} className="text-sm text-[#1F3864] hover:underline font-medium flex items-center gap-1">
                  <MessageSquare size={16}/> Log Session Outcome
                </button>
              ) : outcome.id === mentor.id ? (
                <div className="flex flex-col gap-2 animate-fade-in-up">
                  <textarea 
                    rows="2"
                    placeholder="Enter notes/outcome of the session..." 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-[#1F3864] outline-none"
                    value={outcome.text}
                    onChange={e => setOutcome({...outcome, text: e.target.value})}
                  ></textarea>
                  <div className="flex gap-2">
                    <button onClick={() => handleLogOutcome(mentor.id)} className="bg-[#2E7D32] text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-[#256a29]">Save Log</button>
                    <button onClick={() => setOutcome({ id: '', text: '' })} className="text-gray-500 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-100">Cancel</button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
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
