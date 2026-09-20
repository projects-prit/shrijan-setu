import React, { useState, useEffect, useContext } from 'react';
import { Home, PlusCircle, FileText, Users, User, Bell, Globe, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import HomeTab from './tabs/HomeTab';
import SubmitTab from './tabs/SubmitTab';
import MyReportsTab from './tabs/MyReportsTab';
import CommunityTab from './tabs/CommunityTab';
import NotificationsTab from './tabs/NotificationsTab';
import ProfileTab from './tabs/ProfileTab';
import HelpTab from './tabs/HelpTab';

import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';

export default function CitizenDashboard() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Global State
  const [profile, setProfile] = useState(user?.profile || { name: 'Citizen', language: 'EN' });
  const [myReports, setMyReports] = useState([]);
  const [communityFeed, setCommunityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsRes, communityRes, notifRes, meRes] = await Promise.all([
          api.get('/challenges'),
          api.get('/challenges/community'),
          api.get('/notifications'),
          api.get('/users/me')
        ]);
        
        setMyReports(reportsRes.data.data);
        setCommunityFeed(communityRes.data.data);
        setNotifications(notifRes.data.data);
        if (meRes.data.data.profile) {
          setProfile(meRes.data.data.profile);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={24} /> },
    { id: 'submit', label: 'Report', icon: <PlusCircle size={24} /> },
    { id: 'reports', label: 'My Reports', icon: <FileText size={24} /> },
    { id: 'community', label: 'Community', icon: <Users size={24} /> },
    { id: 'profile', label: 'Profile', icon: <User size={24} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab setActiveTab={setActiveTab} myReports={myReports} />;
      case 'submit':
        return <SubmitTab setActiveTab={setActiveTab} setMyReports={setMyReports} showToast={showToast} />;
      case 'reports':
        return <MyReportsTab myReports={myReports} setMyReports={setMyReports} showToast={showToast} />;
      case 'community':
        return <CommunityTab communityFeed={communityFeed} setCommunityFeed={setCommunityFeed} showToast={showToast} />;
      case 'notifications':
        return <NotificationsTab notifications={notifications} setNotifications={setNotifications} />;
      case 'profile':
        return <ProfileTab profile={profile} setProfile={setProfile} setActiveTab={setActiveTab} showToast={showToast} />;
      case 'help':
        return <HelpTab showToast={showToast} />;
      default:
        return <HomeTab setActiveTab={setActiveTab} myReports={myReports} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F2F2F2] overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 md:top-20 left-1/2 -translate-x-1/2 bg-[#2E7D32] text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in-down flex items-center gap-2 text-sm font-medium">
          <CheckCircle size={18} /> {toast}
        </div>
      )}

      {/* Desktop Sidebar (hidden on mobile) */}
      {!isMobile && (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-10 shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-2 text-[#1F3864]">
              <div className="w-8 h-8 rounded-full bg-[#1F3864] flex items-center justify-center text-white font-bold text-xl">SS</div>
              <span className="font-heading font-bold text-xl tracking-tight">SRIJAN SETU</span>
            </Link>
          </div>
          
          <div className="p-4">
            <button 
              onClick={() => setActiveTab('submit')}
              className="w-full flex items-center justify-center gap-2 bg-[#1F3864] text-white py-3 rounded-xl font-bold hover:bg-[#152746] transition-colors shadow-sm"
            >
              <PlusCircle size={20} /> Report a Challenge
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 space-y-2 mt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-[#1F3864]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {React.cloneElement(item.icon, { size: 20 })}
                <span className="text-base">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Topbar */}
        <header className="h-16 bg-[#1F3864] md:bg-white text-white md:text-gray-800 border-b border-transparent md:border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 shadow-sm md:shadow-none">
          <div className="flex items-center gap-3">
            {isMobile && (
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1F3864] font-bold text-lg">SS</div>
            )}
            <h2 className="text-lg md:text-xl font-bold md:text-[#1F3864]">
              {activeTab === 'home' ? `Hello, ${profile.name.split(' ')[0]}!` : 
               activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('reports', 'My Reports')}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity">
              <Globe size={20} />
              <span className="hidden sm:inline">{profile.language} ▾</span>
            </button>
            <button 
              className="relative p-2 rounded-full hover:bg-white/10 md:hover:bg-gray-100 transition-colors"
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-[#1F3864] md:border-white rounded-full"></span>
              )}
            </button>
            {!isMobile && (
              <button onClick={() => setActiveTab('profile')} className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-[#1F3864] font-bold">
                {profile.name.charAt(0)}
              </button>
            )}
          </div>
        </header>

        {/* Scrollable Tab Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 bg-[#F2F2F2]">
          <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
            {renderTabContent()}
          </div>
        </main>

        {/* Mobile Bottom Tab Bar */}
        {isMobile && (
          <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-safe z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                  activeTab === item.id ? 'text-[#1F3864]' : 'text-gray-400'
                }`}
              >
                {React.cloneElement(item.icon, { 
                  className: activeTab === item.id ? 'animate-bounce-short' : '',
                  size: activeTab === item.id ? 26 : 24
                })}
                <span className={`text-[10px] font-medium ${activeTab === item.id ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
