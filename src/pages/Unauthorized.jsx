import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Unauthorized() {
  const { user, logout } = useContext(AuthContext);

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'citizen': return '/citizen';
      case 'hei_coordinator':
      case 'hei_member': return '/hei';
      case 'industry': return '/industry';
      case 'government': return '/government';
      case 'admin': return '/admin';
      default: return '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl mx-auto flex items-center justify-center mb-5 border border-amber-100">
          <ShieldAlert size={32} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
        
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {user ? (
            <>You are currently signed in as <strong className="text-gray-800">{user.email}</strong> with role <strong className="text-gray-800">{user.role}</strong>, which does not have permission to view this section.</>
          ) : (
            <>You must sign in with an authorized account to access this section.</>
          )}
        </p>

        <div className="space-y-3">
          <Link
            to={getDashboardPath()}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#1F3864] text-white rounded-xl font-bold hover:bg-[#152746] transition-colors text-sm shadow-sm"
          >
            <Home size={16} />
            Go to Your Dashboard
          </Link>

          {user && (
            <button
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors text-sm"
            >
              <LogOut size={16} />
              Sign Out & Switch Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
