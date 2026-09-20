import React, { useState } from 'react';
import { Bell, Check, CheckCircle2, Handshake, Target, Settings as SettingsIcon } from 'lucide-react';

export default function NotificationsTab({ notifications, setNotifications }) {
  const [filter, setFilter] = useState('All');

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifs = notifications.filter(n => filter === 'All' || n.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case 'Challenge': return <Target size={18} className="text-[#1F3864]" />;
      case 'Collaboration': return <Handshake size={18} className="text-[#2E7D32]" />;
      case 'System': return <SettingsIcon size={18} className="text-gray-500" />;
      default: return <Bell size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated on your challenges, projects, and collaborations.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#1F3864] hover:bg-gray-100 rounded transition-colors"
        >
          <CheckCircle2 size={16} /> Mark all as read
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        {['All', 'Challenge', 'Collaboration', 'System'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === f ? 'border-[#1F3864] text-[#1F3864]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredNotifs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No notifications to show.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifs.map(notif => (
              <div key={notif.id} className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                <div className={`mt-1 p-2 rounded-full shrink-0 ${!notif.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                  
                  {!notif.read && (
                    <button 
                      onClick={() => markAsRead(notif.id)}
                      className="text-xs font-medium text-[#1F3864] hover:underline flex items-center gap-1"
                    >
                      <Check size={14} /> Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
