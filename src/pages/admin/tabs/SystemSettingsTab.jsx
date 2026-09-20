import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Save, Globe } from 'lucide-react';

export default function SystemSettingsTab({ showToast }) {
  const [flags, setFlags] = useState({
    multiLang: true,
    citizenUpvoting: true,
    maintenanceMode: false
  });
  
  const [template, setTemplate] = useState('Hello {{user_name}},\n\nYour challenge has been matched with {{hei_name}}! They are currently reviewing the details.\n\nThanks,\nSrijan Setu Team');

  const toggleFlag = (key) => {
    if (key === 'maintenanceMode' && !flags.maintenanceMode) {
      if (!window.confirm("WARNING: Enabling maintenance mode will log out all non-admin users immediately. Continue?")) return;
    }
    setFlags({...flags, [key]: !flags[key]});
    showToast(`${key} updated`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[#1F3864]">System Settings</h2>
        <p className="text-sm text-gray-500">Manage global features, notifications, and localization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-[#1F3864] mb-4 border-b border-gray-100 pb-2">Feature Flags</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Enable Multi-Language Support</div>
                <div className="text-xs text-gray-500">Allow users to switch UI language</div>
              </div>
              <button onClick={() => toggleFlag('multiLang')} className={flags.multiLang ? "text-[#2E7D32]" : "text-gray-300"}>
                {flags.multiLang ? <ToggleRight size={32}/> : <ToggleLeft size={32}/>}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Enable Citizen Upvoting</div>
                <div className="text-xs text-gray-500">Citizens can upvote others' challenges</div>
              </div>
              <button onClick={() => toggleFlag('citizenUpvoting')} className={flags.citizenUpvoting ? "text-[#2E7D32]" : "text-gray-300"}>
                {flags.citizenUpvoting ? <ToggleRight size={32}/> : <ToggleLeft size={32}/>}
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
              <div>
                <div className="font-bold text-red-900 text-sm">Maintenance Mode</div>
                <div className="text-xs text-red-700">Display downtime page to all users</div>
              </div>
              <button onClick={() => toggleFlag('maintenanceMode')} className={flags.maintenanceMode ? "text-[#B02A2A]" : "text-gray-300"}>
                {flags.maintenanceMode ? <ToggleRight size={32}/> : <ToggleLeft size={32}/>}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-[#1F3864] mb-4 border-b border-gray-100 pb-2">Notification Templates</h3>
          <select className="w-full p-2 mb-3 bg-gray-50 border border-gray-200 rounded text-sm outline-none">
            <option>Challenge Matched (Email)</option>
            <option>Institution Verified (Email)</option>
            <option>Project Deployed (SMS)</option>
          </select>
          <textarea 
            className="w-full p-3 h-32 border border-gray-200 rounded text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#1F3864]"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          ></textarea>
          <div className="mt-3 flex justify-end">
            <button onClick={() => showToast('Template saved')} className="px-4 py-2 bg-[#1F3864] text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#152746]">
              <Save size={16}/> Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
