import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, User, Menu, X, LogOut, Sparkles } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  // Helper to determine active route
  const isActive = (path) => (location.pathname.startsWith(path) && path !== '/') || location.pathname === path;

  // Direct access navigation links for all portals
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Citizen', path: '/citizen' },
    { name: 'University', path: '/hei' },
    { name: 'Industry', path: '/industry' },
    { name: 'Government', path: '/government' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className="bg-[#1F3864] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1F3864] font-extrabold text-lg shadow-xs">
                SS
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight">SRIJAN SETU</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-white/20 text-white shadow-xs'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="flex items-center gap-1.5 bg-blue-900/60 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold text-blue-100">
              <Sparkles size={13} className="text-[#C55A11]" />
              <span>AI Engine Active</span>
            </div>

            <button className="flex items-center gap-1 text-xs font-medium text-gray-200 hover:text-white transition-colors">
              <Globe size={16} />
              <span>JH (EN/HI)</span>
            </button>
            <div className="h-5 w-px bg-white/20"></div>
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-blue-200 truncate max-w-[150px]">{user.email}</span>
                <button 
                  onClick={() => logout && logout()} 
                  className="flex items-center gap-1.5 text-xs font-medium bg-red-500/20 text-red-100 px-3 py-1.5 rounded-lg hover:bg-red-500/40 transition-colors"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 text-xs font-bold bg-white text-[#1F3864] px-3.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors shadow-xs">
                <User size={15} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#152746] pb-3 px-3 pt-2 space-y-1 shadow-inner border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                isActive(link.path)
                  ? 'bg-white/20 text-white'
                  : 'text-gray-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 pb-2 border-t border-white/10 mt-2 flex items-center justify-between px-2">
            <span className="text-xs text-blue-200">Jharkhand State Platform</span>
            {user ? (
              <button onClick={() => logout && logout()} className="text-xs text-red-300 font-semibold flex items-center gap-1">
                <LogOut size={14} /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-white font-bold bg-white/20 px-3 py-1 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
