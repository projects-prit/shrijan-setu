import React, { useState, useContext } from 'react';
import { 
  LayoutDashboard, Search, FileText, BarChart2, Award, 
  Settings, Menu, X, Globe, User, LogOut, CheckCircle,
  MessageSquare, Lightbulb, Bell, Users, HelpCircle 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import OverviewTab from './tabs/OverviewTab';
import ChallengeExplorerTab from './tabs/ChallengeExplorerTab';
import ProjectMonitorTab from './tabs/ProjectMonitorTab';
import InstitutionDirectoryTab from './tabs/InstitutionDirectoryTab';
import AnalyticsReportsTab from './tabs/AnalyticsReportsTab';
import CitizenFeedbackTab from './tabs/CitizenFeedbackTab';
import PolicyInsightsTab from './tabs/PolicyInsightsTab';
import NotificationsTab from './tabs/NotificationsTab';
import AccessManagementTab from './tabs/AccessManagementTab';
import ProfileSettingsTab from './tabs/ProfileSettingsTab';
import HelpResourcesTab from './tabs/HelpResourcesTab';

import { mockNotifications } from './govtMockData';
import { AuthContext } from '../../context/AuthContext';

export default function GovernmentDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'challenges', label: 'Challenge Explorer', icon: <Search size={20} /> },
    { id: 'projects', label: 'Project Monitor', icon: <FileText size={20} /> },
    { id: 'institutions', label: 'Institution Directory', icon: <Award size={20} /> },
    { id: 'analytics', label: 'Analytics & Reports', icon: <BarChart2 size={20} /> },
    { id: 'feedback', label: 'Citizen Feedback', icon: <MessageSquare size={20} /> },
    { id: 'insights', label: 'Policy Insights', icon: <Lightbulb size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'access', label: 'Access Management', icon: <Users size={20} /> },
    { id: 'profile', label: 'Profile & Settings', icon: <Settings size={20} /> },
    { id: 'help', label: 'Help / Resources', icon: <HelpCircle size={20} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab setActiveTab={setActiveTab} />;
      case 'challenges': return <ChallengeExplorerTab />;
      case 'projects': return <ProjectMonitorTab />;
      case 'institutions': return <InstitutionDirectoryTab />;
      case 'analytics': return <AnalyticsReportsTab showToast={showToast} />;
      case 'feedback': return <CitizenFeedbackTab showToast={showToast} />;
      case 'insights': return <PolicyInsightsTab setActiveTab={setActiveTab} />;
      case 'notifications': return <NotificationsTab notifications={notifications} setNotifications={setNotifications} />;
      case 'access': return <AccessManagementTab showToast={showToast} />;
      case 'profile': return <ProfileSettingsTab showToast={showToast} />;
      case 'help': return <HelpResourcesTab showToast={showToast} />;
      default: return <OverviewTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F2F2F2] overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 bg-[#2E7D32] text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down flex items-center gap-2 font-semibold">
          <CheckCircle size={18} /> {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#1F3864] text-gray-300 transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:static'}
      `}>
        <div className="h-16 flex items-center justify-center border-b border-white/10 px-4 shrink-0">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-200">
             <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[#1F3864] font-bold text-xl">SS</div>
             <span className="font-bold text-xl tracking-tight hidden sm:block">SRIJAN SETU</span>
          </Link>
          <button className="md:hidden ml-auto text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-4">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gov Monitoring</p>
          </div>
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === item.id ? 'bg-[#2E7D32] text-white shadow' : 'hover:bg-white/10 hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.id === 'notifications' && unreadCount > 0 && (
                  <span className="bg-[#C55A11] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={() => { 
              logout();
              navigate('/login'); 
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 border border-gray-600 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500 hover:text-[#1F3864]" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-[#1F3864] hidden sm:block">
              Chief Minister's Office, Govt. of Maharashtra
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-[#1F3864]">
              <Globe size={18} /> EN
            </button>
            <button onClick={() => setActiveTab('notifications')} className="relative text-gray-600 hover:text-[#1F3864] transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C55A11] rounded-full ring-2 ring-white"></span>}
            </button>
            <button className="flex items-center gap-2" onClick={() => setActiveTab('profile')}>
              <div className="w-8 h-8 rounded-full bg-[#1F3864] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                RK
              </div>
            </button>
          </div>
        </header>

        {/* Tab Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-[#1F3864]/50 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
}
