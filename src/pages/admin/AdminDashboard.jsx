import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  Home, BarChart2, Users, CheckSquare, Shield, LifeBuoy, 
  Flag, Brain, FileText, Settings, Lock, Database, User, Search, Bell, LogOut
} from 'lucide-react';

import OverviewTab from './tabs/OverviewTab';
import UserManagementTab from './tabs/UserManagementTab';
import VerificationTab from './tabs/VerificationTab';
import SupportTicketsTab from './tabs/SupportTicketsTab';
import ContentModerationTab from './tabs/ContentModerationTab';
import AuditLogsTab from './tabs/AuditLogsTab';
import BackupManagementTab from './tabs/BackupManagementTab';
import PlatformAnalyticsTab from './tabs/PlatformAnalyticsTab';
import RoleManagementTab from './tabs/RoleManagementTab';
import AIMonitoringTab from './tabs/AIMonitoringTab';
import SystemSettingsTab from './tabs/SystemSettingsTab';
import SecurityLogsTab from './tabs/SecurityLogsTab';
import AdminProfileTab from './tabs/AdminProfileTab';

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const menuSections = [
    {
      title: "Platform",
      items: [
        { id: 'overview', label: 'Overview', icon: <Home size={20} /> },
        { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> }
      ]
    },
    {
      title: "People & Access",
      items: [
        { id: 'users', label: 'User Management', icon: <Users size={20} /> },
        { id: 'verification', label: 'Verification', icon: <CheckSquare size={20} /> },
        { id: 'roles', label: 'Roles & Permissions', icon: <Shield size={20} /> },
        { id: 'support', label: 'Support Tickets', icon: <LifeBuoy size={20} /> }
      ]
    },
    {
      title: "Content & AI",
      items: [
        { id: 'moderation', label: 'Moderation', icon: <Flag size={20} /> },
        { id: 'ai', label: 'AI Monitoring', icon: <Brain size={20} /> }
      ]
    },
    {
      title: "System",
      items: [
        { id: 'audit', label: 'Audit Logs', icon: <FileText size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
        { id: 'security', label: 'Security Logs', icon: <Lock size={20} /> },
        { id: 'backups', label: 'Backups', icon: <Database size={20} /> },
        { id: 'profile', label: 'Admin Profile', icon: <User size={20} /> }
      ]
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab setActiveTab={setActiveTab} />;
      case 'analytics': return <PlatformAnalyticsTab />;
      case 'users': return <UserManagementTab showToast={showToast} />;
      case 'verification': return <VerificationTab showToast={showToast} />;
      case 'roles': return <RoleManagementTab showToast={showToast} />;
      case 'support': return <SupportTicketsTab showToast={showToast} />;
      case 'moderation': return <ContentModerationTab showToast={showToast} />;
      case 'ai': return <AIMonitoringTab showToast={showToast} />;
      case 'audit': return <AuditLogsTab />;
      case 'settings': return <SystemSettingsTab showToast={showToast} />;
      case 'security': return <SecurityLogsTab showToast={showToast} />;
      case 'backups': return <BackupManagementTab showToast={showToast} />;
      case 'profile': return <AdminProfileTab showToast={showToast} />;
      default: return <OverviewTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F2F2F2] overflow-hidden font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#2E7D32] text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce flex items-center gap-2 text-sm font-medium">
          ✅ {toast}
        </div>
      )}

      {/* Sidebar */}
      {!isMobile && (
        <aside className="w-64 bg-[#1F3864] text-white flex flex-col z-10 shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-white/10 bg-[#152746]">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1F3864] font-bold text-xl">SS</div>
              <div>
                <div className="font-heading font-bold text-lg leading-tight">SRIJAN SETU</div>
                <div className="text-[10px] text-[#C55A11] font-mono tracking-widest uppercase">Admin Ops</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
            {menuSections.map((section, idx) => (
              <div key={idx} className="mb-6">
                <div className="px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {section.title}
                </div>
                <div className="space-y-1 px-3">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === item.id 
                          ? 'bg-[#C55A11] text-white shadow-md' 
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/10 shrink-0">
            <button 
              onClick={() => { 
                if (logout) logout();
                navigate('/login'); 
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 border border-gray-600 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 w-1/2">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Global search (users, institutions, tickets)..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg text-sm focus:bg-white focus:border-[#1F3864] outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></div>
              <span className="text-xs font-semibold text-[#2E7D32]">System Healthy</span>
            </div>
            <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#C55A11] rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[#1F3864] font-bold border-2 border-white shadow-sm cursor-pointer hover:opacity-80">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-[#F2F2F2]">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
