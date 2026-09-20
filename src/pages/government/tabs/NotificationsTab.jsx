import React, { useState } from 'react';
import { Bell, Check, Info, AlertTriangle, Building2, CheckCircle2 } from 'lucide-react';

export default function NotificationsTab({ notifications, setNotifications }) {
  const [filter, setFilter] = useState('All');

  const filtered = notifications.filter(n => filter === 'All' || n.type === filter);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'System': return <Info size={20} className="text-blue-500" />;
      case 'Project': return <AlertTriangle size={20} className="text-[#C55A11]" />;
      case 'Institution': return <Building2 size={20} className="text-[#1F3864]" />;
      case 'Challenge': return <AlertTriangle size={20} className="text-red-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3864]">Notifications</h2>
          <p className="text-gray-500 mt-1">Updates and alerts across the Srijan Setu platform.</p>
        </div>
        <button onClick={markAllAsRead} className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
          <CheckCircle2 size={16}/> Mark all as read
        </button>
      </div>

      <div className="flex gap-2">
        {['All', 'System', 'Project', 'Institution', 'Challenge'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === f ? 'bg-[#1F3864] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filtered.map(notif => (
              <div key={notif.id} className={`p-4 flex gap-4 transition-colors ${notif.read ? 'bg-white' : 'bg-blue-50/50 hover:bg-blue-50/80'}`}>
                <div className="mt-1 bg-white rounded-full p-2 shadow-sm border border-gray-100 shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm mb-1 ${notif.read ? 'font-semibold text-gray-800' : 'font-bold text-gray-900'}`}>{notif.title}</h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{notif.date}</span>
                  </div>
                  <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>{notif.message}</p>
                </div>
                {!notif.read && (
                  <button onClick={() => markAsRead(notif.id)} className="shrink-0 self-center p-2 text-gray-400 hover:text-[#2E7D32] hover:bg-green-50 rounded-full transition-colors" title="Mark as read">
                    <Check size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <CheckCircle2 size={48} className="mx-auto mb-4 text-gray-300" />
            <p>You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
