import React, { useState } from 'react';
import { Save, User, Bell, Globe, Shield, MapPin } from 'lucide-react';

export default function ProfileSettingsTab({ showToast }) {
  const [profile, setProfile] = useState({
    name: "Chief Minister's Office",
    jurisdiction: 'Maharashtra State',
    contactEmail: 'contact@cmo.mah.gov.in',
    contactPhone: '+91 22 1234 5678'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyReports: true,
    highPrioritySMS: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Profile & Settings saved successfully.");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-[#1F3864]">Profile & Settings</h2>
        <p className="text-gray-500 mt-1">Manage your department's profile and notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 font-bold text-gray-700">
              <User size={18}/> Department Profile
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Department Name</label>
                  <input type="text" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex items-center gap-1"><MapPin size={12}/> Jurisdiction</label>
                  <input type="text" value={profile.jurisdiction} onChange={e=>setProfile({...profile, jurisdiction: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Public Contact Email</label>
                  <input type="email" value={profile.contactEmail} onChange={e=>setProfile({...profile, contactEmail: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Public Contact Phone</label>
                  <input type="text" value={profile.contactPhone} onChange={e=>setProfile({...profile, contactPhone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]"/>
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="px-6 py-2 bg-[#1F3864] text-white rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors flex items-center gap-2">
                  <Save size={16}/> Save Profile
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 font-bold text-gray-700">
              <Bell size={18}/> Notification Preferences
            </div>
            <div className="p-6 space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <div className="font-bold text-gray-900 text-sm">Email Alerts</div>
                  <div className="text-xs text-gray-500">Receive instant emails for high priority challenges.</div>
                </div>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${notifications.emailAlerts ? 'bg-[#2E7D32]' : 'bg-gray-300'}`} onClick={() => setNotifications({...notifications, emailAlerts: !notifications.emailAlerts})}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${notifications.emailAlerts ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
              <hr className="border-gray-100"/>
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <div className="font-bold text-gray-900 text-sm">Weekly Summary Reports</div>
                  <div className="text-xs text-gray-500">A generated PDF sent to your inbox every Friday.</div>
                </div>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${notifications.weeklyReports ? 'bg-[#2E7D32]' : 'bg-gray-300'}`} onClick={() => setNotifications({...notifications, weeklyReports: !notifications.weeklyReports})}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${notifications.weeklyReports ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
              <hr className="border-gray-100"/>
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <div className="font-bold text-gray-900 text-sm flex items-center gap-2">SMS Alerts <span className="bg-orange-100 text-[#C55A11] text-[10px] px-2 py-0.5 rounded border border-orange-200">Critical Only</span></div>
                  <div className="text-xs text-gray-500">Receive text messages if a deployed project goes offline.</div>
                </div>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${notifications.highPrioritySMS ? 'bg-[#2E7D32]' : 'bg-gray-300'}`} onClick={() => setNotifications({...notifications, highPrioritySMS: !notifications.highPrioritySMS})}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${notifications.highPrioritySMS ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 font-bold text-gray-700">
              <Globe size={18}/> Localization
            </div>
            <div className="p-6">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Display Language</label>
              <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-[#1F3864]">
                <option>English</option>
                <option>Hindi (हिंदी)</option>
                <option>Marathi (मराठी)</option>
              </select>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
            <Shield size={32} className="text-gray-400 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Security & Access</h3>
            <p className="text-xs text-gray-500 mb-4">Your account requires Two-Factor Authentication (2FA) as per Gov IT guidelines.</p>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">Manage 2FA Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
