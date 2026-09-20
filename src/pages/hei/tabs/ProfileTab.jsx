import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';

export default function ProfileTab({ profile, setProfile, showToast }) {
  const initialData = {
    institutionName: profile.institutionName || profile.orgName || '',
    contactEmail: profile.contactEmail || profile.contact?.email || '',
    phone: profile.phone || profile.contact?.phone || '',
    expertise: profile.expertise || [],
    notificationsEnabled: profile.notificationsEnabled ?? true,
    language: profile.language || 'English'
  };

  const [formData, setFormData] = useState(initialData);
  const [newExpertise, setNewExpertise] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    showToast('Profile and settings saved successfully.');
  };

  const addExpertise = (e) => {
    e.preventDefault();
    if (newExpertise.trim() && !formData.expertise.includes(newExpertise.trim())) {
      setFormData({ ...formData, expertise: [...formData.expertise, newExpertise.trim()] });
      setNewExpertise('');
    }
  };

  const removeExpertise = (item) => {
    setFormData({ ...formData, expertise: formData.expertise.filter(e => e !== item) });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F3864]">Profile & Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your institution's public profile and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Institution Details</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
              <input 
                required 
                type="text" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] focus:border-[#1F3864] outline-none transition-shadow"
                value={formData.institutionName}
                onChange={e => setFormData({...formData, institutionName: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input 
                  required 
                  type="email" 
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] focus:border-[#1F3864] outline-none transition-shadow"
                  value={formData.contactEmail}
                  onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  required 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] focus:border-[#1F3864] outline-none transition-shadow"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Areas of Expertise</h2>
          <p className="text-sm text-gray-500 mb-4">These tags are used by the AI engine to match relevant challenges to your institution.</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.expertise.map(exp => (
              <span key={exp} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm border border-blue-100">
                {exp}
                <button type="button" onClick={() => removeExpertise(exp)} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Add new expertise (e.g. Clean Energy)" 
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#1F3864] outline-none"
              value={newExpertise}
              onChange={e => setNewExpertise(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addExpertise(e)}
            />
            <button type="button" onClick={addExpertise} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium transition-colors">
              Add Tag
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive emails for new matches and collab requests.</p>
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
            <Save size={18} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
