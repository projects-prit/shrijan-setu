import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';

export default function ProfileTab({ profile, setProfile, showToast }) {
  const initialData = {
    orgName: profile.orgName || '',
    sector: profile.sector || profile.industry || '',
    contactEmail: profile.contactEmail || profile.contact?.email || '',
    phone: profile.phone || profile.contact?.phone || '',
    focusAreas: profile.focusAreas || [],
    notificationsEnabled: profile.notificationsEnabled ?? true,
    language: profile.language || 'English'
  };

  const [formData, setFormData] = useState(initialData);
  const [newFocus, setNewFocus] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    showToast('Organization profile saved successfully.');
  };

  const addFocusArea = (e) => {
    e.preventDefault();
    if (newFocus.trim() && !formData.focusAreas.includes(newFocus.trim())) {
      setFormData({ ...formData, focusAreas: [...formData.focusAreas, newFocus.trim()] });
      setNewFocus('');
    }
  };

  const removeFocusArea = (item) => {
    setFormData({ ...formData, focusAreas: formData.focusAreas.filter(f => f !== item) });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F3864]">Profile & Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your organization's CSR profile and platform preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Organization Details</h2>
          
          <div className="flex gap-6 items-center mb-6">
            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 font-medium cursor-pointer hover:bg-gray-50">
              Upload Logo
            </div>
            <div className="text-sm text-gray-500">
              Upload your company logo.<br/> Recommended size: 256x256px (PNG/JPG).
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <input 
                required 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] outline-none"
                value={formData.orgName}
                onChange={e => setFormData({...formData, orgName: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry Sector</label>
                <input 
                  required 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] outline-none"
                  value={formData.sector}
                  onChange={e => setFormData({...formData, sector: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CSR Contact Email</label>
                <input 
                  required 
                  type="email" 
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] outline-none"
                  value={formData.contactEmail}
                  onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  required 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">CSR Focus Areas</h2>
          <p className="text-sm text-gray-500 mb-4">Select the key areas where you want to allocate funds or mentorship. AI will recommend relevant projects.</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.focusAreas.map(focus => (
              <span key={focus} className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm border border-green-100">
                {focus}
                <button type="button" onClick={() => removeFocusArea(focus)} className="hover:bg-green-200 rounded-full p-0.5 transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Add new focus area (e.g. Rural Health)" 
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#2E7D32] outline-none"
              value={newFocus}
              onChange={e => setNewFocus(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addFocusArea(e)}
            />
            <button type="button" onClick={addFocusArea} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium transition-colors">
              Add Focus
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive alerts when HEIs accept your support offers or post updates.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={formData.notificationsEnabled}
                  onChange={e => setFormData({...formData, notificationsEnabled: e.target.checked})}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1F3864]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D32]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Interface Language</p>
                <p className="text-sm text-gray-500">Select your preferred language.</p>
              </div>
              <select 
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white outline-none focus:ring-2 focus:ring-[#1F3864]"
                value={formData.language}
                onChange={e => setFormData({...formData, language: e.target.value})}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-[#1F3864] text-white rounded-lg hover:bg-[#152746] font-medium shadow-sm transition-all">
            <Save size={18} /> Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
