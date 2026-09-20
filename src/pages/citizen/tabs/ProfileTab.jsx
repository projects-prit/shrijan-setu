import React, { useState } from 'react';
import { Save, User, Heart, Settings, LogOut, FileText, Activity, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

export default function ProfileTab({ profile, setProfile, setActiveTab, showToast }) {
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    showToast('Profile saved successfully!');
  };

  const impact = profile.impact || { reported: 0, resolved: 0, upvotes: 0 };
  const ward = profile.ward || 'Unknown Ward';
  const district = profile.district || profile.location || 'Unknown District';

  return (
    <div className="space-y-6 pb-6">
      
      <div className="bg-[#1F3864] text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#1F3864] font-bold text-3xl shadow-inner shrink-0">
          {profile.name?.charAt(0) || 'C'}
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
          <p className="text-blue-200 text-sm flex items-center gap-1"><MapPinIcon size={14}/> {ward}, {district}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3 px-1">Your Impact Summary</h2>
        <div className="grid grid-cols-3 gap-3">
          <div onClick={() => setActiveTab('reports')} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer">
            <span className="text-2xl font-bold text-[#1F3864]">{impact.reported}</span>
            <span className="text-xs text-gray-500 text-center font-medium uppercase tracking-wide mt-1">Issues Reported</span>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#2E7D32]">{impact.resolved}</span>
            <span className="text-xs text-gray-500 text-center font-medium uppercase tracking-wide mt-1">Issues Fixed</span>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#C55A11]">{impact.upvotes}</span>
            <span className="text-xs text-gray-500 text-center font-medium uppercase tracking-wide mt-1">Community Thanks</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-gray-900 flex items-center gap-2"><User size={20}/> Personal Details</h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="text-sm font-bold text-[#1F3864]">Edit</button>
          )}
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-[#1F3864] focus:ring-0 outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                <input 
                  required 
                  type="text" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-[#1F3864] focus:ring-0 outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">District</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-[#1F3864] focus:ring-0 outline-none"
                    value={formData.district}
                    onChange={e => setFormData({...formData, district: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Ward</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-[#1F3864] focus:ring-0 outline-none"
                    value={formData.ward}
                    onChange={e => setFormData({...formData, ward: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[#1F3864] text-white py-3 rounded-xl font-bold text-lg shadow-sm">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-lg">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Phone Number</p>
                <p className="text-lg font-medium text-gray-900">{profile.phone}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Location</p>
                <p className="text-lg font-medium text-gray-900">{ward}, {district}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-bold text-gray-900 flex items-center gap-2"><Settings size={20}/> App Settings</h2>
        </div>
        
        <div className="p-2">
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div>
              <p className="font-bold text-gray-900 text-lg">Notifications</p>
              <p className="text-sm text-gray-500">Get alerts about your reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={formData.notificationsEnabled}
                onChange={e => {
                  setFormData({...formData, notificationsEnabled: e.target.checked});
                  setProfile({...formData, notificationsEnabled: e.target.checked});
                }}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#2E7D32]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-bold text-gray-900 text-lg">Language</p>
              <p className="text-sm text-gray-500">Choose your preferred language</p>
            </div>
            <select 
              className="border-2 border-gray-200 rounded-lg px-3 py-2 text-base font-bold bg-gray-50 outline-none focus:border-[#1F3864]"
              value={formData.language}
              onChange={e => {
                setFormData({...formData, language: e.target.value});
                setProfile({...formData, language: e.target.value});
              }}
            >
              <option value="English">English</option>
              <option value="Marathi">मराठी (Marathi)</option>
              <option value="Hindi">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setActiveTab('help')} className="bg-white border border-gray-200 py-4 rounded-xl font-bold text-gray-700 shadow-sm">
          Help & Support
        </button>
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-100 py-4 rounded-xl font-bold shadow-sm w-full">
          <LogOut size={20}/> Log Out
        </button>
      </div>

    </div>
  );
}

function MapPinIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
}
