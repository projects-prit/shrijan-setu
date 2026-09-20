import React, { useState } from 'react';


const mockTickets = [
  { id: 'TKT-891', subject: 'Unable to submit challenge', role: 'Citizen', status: 'New', priority: 'High', date: '2026-09-14T10:00:00Z', msg: 'The submit button is grayed out on my mobile device.' },
  { id: 'TKT-892', subject: 'Update institution details', role: 'HEI', status: 'In Progress', priority: 'Medium', date: '2026-09-13T14:30:00Z', msg: 'Need to add a new department to our profile.' },
  { id: 'TKT-893', subject: 'Funding transfer issue', role: 'Industry', status: 'New', priority: 'High', date: '2026-09-14T11:45:00Z', msg: 'Our pledged funds are not showing up on the project dashboard.' },
  { id: 'TKT-894', subject: 'Password reset not working', role: 'Citizen', status: 'Resolved', priority: 'Low', date: '2026-09-10T09:15:00Z', msg: 'I am not receiving the email.' }
];;

import { Search, MessageSquare, AlertCircle, Clock, CheckCircle } from 'lucide-react';

export default function SupportTicketsTab({ showToast }) {
  const [tickets, setTickets] = useState(mockTickets);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  const filteredTickets = tickets.filter(t => statusFilter === 'All' || t.status === statusFilter);

  const getPriorityColor = (p) => {
    if (p === 'High') return 'bg-red-100 text-red-800';
    if (p === 'Medium') return 'bg-orange-100 text-orange-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getStatusIcon = (s) => {
    if (s === 'New') return <AlertCircle size={16} className="text-red-500" />;
    if (s === 'In Progress') return <Clock size={16} className="text-orange-500" />;
    return <CheckCircle size={16} className="text-green-500" />;
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    setTickets(tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return { ...t, status: t.status === 'New' ? 'In Progress' : t.status };
      }
      return t;
    }));
    setReplyText('');
    showToast('Reply sent successfully');
    // Update local selected ticket state to reflect status change
    setSelectedTicket({ ...selectedTicket, status: selectedTicket.status === 'New' ? 'In Progress' : selectedTicket.status });
  };

  const markResolved = () => {
    setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: 'Resolved' } : t));
    setSelectedTicket({ ...selectedTicket, status: 'Resolved' });
    showToast('Ticket marked as resolved');
  };

  return (
    <div className="space-y-6 animate-fade-in flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Support Tickets</h2>
          <p className="text-sm text-gray-500">Manage inquiries from all platform users.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* Ticket List */}
        <div className="w-full md:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-100 shrink-0">
            <select 
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold outline-none focus:border-[#1F3864]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Tickets</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredTickets.map(t => (
              <div 
                key={t.id} 
                onClick={() => setSelectedTicket(t)}
                className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${selectedTicket?.id === t.id ? 'bg-blue-50 border-l-4 border-l-[#1F3864]' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${getPriorityColor(t.priority)}`}>{t.priority}</span>
                  <span className="text-xs text-gray-400 font-mono">{new Date(t.date).toLocaleDateString()}</span>
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1">{t.subject}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {getStatusIcon(t.status)} {t.status} • {t.role}
                </div>
              </div>
            ))}
            {filteredTickets.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No tickets found.</div>}
          </div>
        </div>

        {/* Ticket Detail */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          {selectedTicket ? (
            <>
              <div className="p-6 border-b border-gray-100 shrink-0 flex justify-between items-start bg-gray-50">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-500">{selectedTicket.id}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusIcon(selectedTicket.status).props.className.replace('text-', 'bg-').replace('500', '100')} ${getStatusIcon(selectedTicket.status).props.className}`}>
                      {selectedTicket.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTicket.subject}</h3>
                  <div className="text-sm text-gray-500 mt-1">Submitted by a {selectedTicket.role} on {new Date(selectedTicket.date).toLocaleString()}</div>
                </div>
                {selectedTicket.status !== 'Resolved' && (
                  <button onClick={markResolved} className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold hover:bg-green-100 flex items-center gap-1">
                    <CheckCircle size={14}/> Mark Resolved
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-[#F2F2F2]">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                  <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">U</div>
                    <div className="font-semibold text-sm">User</div>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedTicket.msg}</p>
                </div>
                {/* Mock existing replies could go here */}
              </div>

              {selectedTicket.status !== 'Resolved' && (
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                  <textarea 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#1F3864] outline-none resize-none mb-2"
                    rows="3"
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Replying as Admin Ops</span>
                    <button onClick={sendReply} className="px-6 py-2 bg-[#1F3864] text-white rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors flex items-center gap-2">
                      <MessageSquare size={16}/> Send Reply
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p>Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
