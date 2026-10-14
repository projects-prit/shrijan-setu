import React, { useState, useEffect, useContext } from 'react';
import { 
  LayoutDashboard, ListTodo, FolderKanban, Users, 
  Handshake, LineChart, Bell, Settings, HelpCircle, 
  Menu, X, Globe, User, LogOut 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import OverviewTab from './tabs/OverviewTab';
import RecommendedTab from './tabs/RecommendedTab';
import ProjectsTab from './tabs/ProjectsTab';
import TeamTab from './tabs/TeamTab';
import CollaborationTab from './tabs/CollaborationTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import NotificationsTab from './tabs/NotificationsTab';
import ProfileTab from './tabs/ProfileTab';
import HelpTab from './tabs/HelpTab';

import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { 
  initialChallenges, 
  initialProjects, 
  initialTeam, 
  initialCollabs, 
  initialNotifications, 
  initialProfile 
} from '../../data/heiMockData';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function HEIDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Global State with safe initial mock fallbacks
  const [challenges, setChallenges] = useState(initialChallenges);
  const [projects, setProjects] = useState(initialProjects);
  const [team, setTeam] = useState(initialTeam);
  const [collabs, setCollabs] = useState(initialCollabs);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [profile, setProfile] = useState(user?.profile || initialProfile);
  const [, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [chRes, prjRes, colRes, notifRes, meRes] = await Promise.allSettled([
          api.get('/challenges'),
          api.get('/projects'),
          api.get('/collaborations'),
          api.get('/notifications'),
          api.get('/users/me')
        ]);
        
        if (!isMounted) return;

        if (chRes.status === 'fulfilled' && Array.isArray(chRes.value?.data?.data) && chRes.value.data.data.length > 0) {
          setChallenges(chRes.value.data.data);
        }
        if (prjRes.status === 'fulfilled' && Array.isArray(prjRes.value?.data?.data) && prjRes.value.data.data.length > 0) {
          setProjects(prjRes.value.data.data);
        }
        if (colRes.status === 'fulfilled' && Array.isArray(colRes.value?.data?.data) && colRes.value.data.data.length > 0) {
          setCollabs(colRes.value.data.data);
        }
        if (notifRes.status === 'fulfilled' && Array.isArray(notifRes.value?.data?.data) && notifRes.value.data.data.length > 0) {
          setNotifications(notifRes.value.data.data);
        }
        if (meRes.status === 'fulfilled' && meRes.value?.data?.data?.profile) {
          setProfile(prev => ({ ...prev, ...meRes.value.data.data.profile }));
        }
      } catch (err) {
        console.error('Error fetching HEI dashboard data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const unreadNotifs = Array.isArray(notifications) ? notifications.filter(n => !n.read && !n.is_read).length : 0;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'recommended', label: 'Recommended Challenges', icon: <ListTodo size={20} /> },
    { id: 'projects', label: 'My Projects', icon: <FolderKanban size={20} /> },
    { id: 'team', label: 'Team Management', icon: <Users size={20} /> },
    { id: 'collabs', label: 'Collaboration Requests', icon: <Handshake size={20} /> },
    { id: 'analytics', label: 'Analytics & Impact', icon: <LineChart size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, badge: unreadNotifs },
    { id: 'profile', label: 'Profile & Settings', icon: <Settings size={20} /> },
    { id: 'help', label: 'Help / Resources', icon: <HelpCircle size={20} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab projects={projects} team={team} setActiveTab={setActiveTab} />;
      case 'recommended':
        return <RecommendedTab 
                  challenges={challenges} 
                  setChallenges={setChallenges}
                  setProjects={setProjects}
                  showToast={showToast} 
                  setActiveTab={setActiveTab}
               />;
      case 'projects':
        return <ProjectsTab projects={projects} setProjects={setProjects} team={team} />;
      case 'team':
        return <TeamTab team={team} setTeam={setTeam} projects={projects} showToast={showToast} />;
      case 'collabs':
        return <CollaborationTab collabs={collabs} setCollabs={setCollabs} showToast={showToast} />;
      case 'analytics':
        return <AnalyticsTab projects={projects} />;
      case 'notifications':
        return <NotificationsTab notifications={notifications} setNotifications={setNotifications} />;
      case 'profile':
        return <ProfileTab profile={profile} setProfile={setProfile} showToast={showToast} />;
      case 'help':
        return <HelpTab showToast={showToast} />;
      default:
        return <OverviewTab projects={projects} team={team} setActiveTab={setActiveTab} />;
    }
  };

  const institutionName = profile?.institutionName || profile?.name || 'Birla Institute of Technology, Mesra';

  return (
    <div className="flex h-screen bg-[#F2F2F2] overflow-hidden">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 bg-[#2E7D32] text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-down">
          {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#1F3864] text-gray-300 transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:static'}
      `}>
        <div className="h-16 flex items-center justify-center border-b border-white/10 px-4">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-200">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1F3864] font-bold text-xl">SS</div>
             <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">SRIJAN SETU</span>
          </Link>
          <button className="md:hidden ml-auto text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
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
                  ${activeTab === item.id ? 'bg-[#2E7D32] text-white' : 'hover:bg-white/10 hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="bg-[#C55A11] text-white text-xs py-0.5 px-2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-white/10 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-[#1F3864] hidden sm:block">
              {institutionName}
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-gray-500 hover:text-[#1F3864] transition-colors relative" onClick={() => setActiveTab('notifications')}>
              <Bell size={22} />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C55A11] rounded-full"></span>
              )}
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <button className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#1F3864]">
              <Globe size={18} />
              <span>EN ▾</span>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1F3864]" onClick={() => setActiveTab('profile')}>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#1F3864] font-bold">
                <User size={18} />
              </div>
            </button>
          </div>
        </header>

        {/* Tab Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <ErrorBoundary>
              {renderTabContent()}
            </ErrorBoundary>
          </div>
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
}
