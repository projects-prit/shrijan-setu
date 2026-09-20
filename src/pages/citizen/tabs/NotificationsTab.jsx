import React, { useState } from 'react';
import { Bell, CheckCircle2, MessageSquare, Megaphone, Check } from 'lucide-react';
import api from '../../../api/axios';

export default function NotificationsTab({ notifications, setNotifications }) {
  const [filter, setFilter] = useState('All');

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    // For demo purposes, mark all locally
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
  };

  const filteredNotifs = notifications.filter(n => filter === 'All' || n.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case 'report': return <Bell size={24} className="text-[#1F3864]" />;
      case 'community': return <Megaphone size={24} className="text-[#2E7D32]" />;
      default: return <MessageSquare size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1F3864]">Notifications</h1>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-[#1F3864] bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
        >
          <CheckCircle2 size={16} /> Mark all read
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {['All', 'report', 'community', 'system'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-bold rounded-full border-2 transition-colors ${
              filter === f 
                ? 'bg-[#1F3864] text-white border-[#1F3864]' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {f === 'report' ? 'My Reports' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
            <p className="text-gray-500 text-lg">You have no notifications here.</p>
          </div>
        ) : (
          filteredNotifs.map(notif => (
            <div 
              key={notif._id} 
              className={`p-4 rounded-xl border transition-colors flex gap-4 items-start ${
                !notif.is_read ? 'bg-blue-50 border-blue-100 shadow-sm' : 'bg-white border-gray-100 shadow-sm opacity-70'
              }`}
            >
              <div className={`p-2 rounded-full shrink-0 ${!notif.is_read ? 'bg-white shadow-sm' : 'bg-gray-50'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-base capitalize ${!notif.is_read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                    {notif.type} Alert
                  </h4>
                </div>
                <p className={`text-base leading-relaxed mb-2 ${!notif.is_read ? 'text-gray-800' : 'text-gray-600'}`}>
                  {notif.message}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-500">{notif.created_at ? new Date(notif.created_at).toLocaleDateString() : notif.date}</span>
                  {!notif.is_read && (
                    <button 
                      onClick={() => markAsRead(notif._id)}
                      className="text-sm font-bold text-[#1F3864] flex items-center gap-1 active:scale-95"
                    >
                      <Check size={16} /> Mark read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
