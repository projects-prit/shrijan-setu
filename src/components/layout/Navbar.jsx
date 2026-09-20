import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, User, Menu, X, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Helper to determine active route
  const isActive = (path) => location.pathname.startsWith(path) && path !== '/' || location.pathname === path;

  // We only show dashboard link if logged in
  const navLinks = [
    { name: 'Home', path: '/' },
  ];
  
  if (user?.role === 'citizen') navLinks.push({ name: 'My Dashboard', path: '/citizen' });
  if (user?.role === 'hei_coordinator' || user?.role === 'hei_member') navLinks.push({ name: 'HEI Dashboard', path: '/hei' });
  if (user?.role === 'industry') navLinks.push({ name: 'Industry Dashboard', path: '/industry' });
  if (user?.role === 'government') navLinks.push({ name: 'Govt Dashboard', path: '/government' });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#1F3864] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1F3864] font-bold text-xl">
                SS
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">SRIJAN SETU</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/20 text-white'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-white transition-colors">
              <Globe size={18} />
              <span>EN ▾</span>
            </button>
            <div className="h-6 w-px bg-white/20"></div>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-blue-200">{user.email}</span>
                <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium bg-red-500/20 text-red-100 px-3 py-2 rounded-md hover:bg-red-500/40 transition-colors">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium bg-white text-[#1F3864] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
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
        <div className="md:hidden bg-[#1a2f55] pb-3 px-2 pt-2 space-y-1 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-white/20 text-white'
                  : 'text-gray-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-white/10 mt-2">
            <div className="flex items-center justify-around">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-white">
                <Globe size={18} />
                <span>EN</span>
              </button>
              
              {user ? (
                <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-300 hover:text-red-100">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white">
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
