import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Users, Building2, Briefcase, Landmark, Compass } from 'lucide-react';

export default function NotFound() {
  const portalLinks = [
    { label: 'Citizen Portal', path: '/citizen', icon: <Users size={16} /> },
    { label: 'University Portal', path: '/hei', icon: <Building2 size={16} /> },
    { label: 'Industry Portal', path: '/industry', icon: <Briefcase size={16} /> },
    { label: 'Government Portal', path: '/government', icon: <Landmark size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center">
        {/* Animated Icon badge */}
        <div className="w-20 h-20 bg-blue-50 text-[#1F3864] rounded-3xl mx-auto flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
          <Compass size={40} className="animate-spin-slow" />
        </div>

        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#C55A11] mb-3">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-gray-600 text-base mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or you may have entered an outdated link.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1F3864] text-white rounded-xl font-bold hover:bg-[#152746] transition-colors shadow-md text-base"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors text-base"
          >
            <ArrowLeft size={18} />
            Previous Page
          </button>
        </div>

        {/* Quick Portal Shortcuts */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
            Direct Access Portals
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {portalLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-[#1F3864] text-gray-700 text-xs sm:text-sm font-semibold transition-all border border-gray-100 hover:border-blue-100"
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
