import React, { useState, useContext } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, Loader2, AlertCircle, ArrowLeft, Users, Building2, Briefcase, Landmark } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { role } = useParams();

  const getRoleConfig = () => {
    switch(role) {
      case 'citizen': 
        return {
          title: 'Citizen Portal',
          subtitle: 'Report a local challenge',
          color: 'from-blue-600 to-blue-800',
          icon: <Users size={48} className="text-white/80" />
        };
      case 'hei': 
        return {
          title: 'University Dashboard',
          subtitle: 'Review & build solutions',
          color: 'from-indigo-600 to-indigo-900',
          icon: <Building2 size={48} className="text-white/80" />
        };
      case 'industry': 
        return {
          title: 'Industry / CSR',
          subtitle: 'Support & mentor projects',
          color: 'from-orange-600 to-orange-800',
          icon: <Briefcase size={48} className="text-white/80" />
        };
      case 'government': 
        return {
          title: 'Government Dashboard',
          subtitle: 'Monitor impact & progress',
          color: 'from-emerald-700 to-emerald-900',
          icon: <Landmark size={48} className="text-white/80" />
        };
      default: 
        return {
          title: 'Srijan Setu',
          subtitle: 'Sign in to continue',
          color: 'from-[#1F3864] to-[#152746]',
          icon: <div className="text-4xl font-bold text-white/80 tracking-tighter">SS</div>
        };
    }
  };

  const config = getRoleConfig();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const user = await login(email, password);
      
      // Enforce correct role if specified in URL
      if (role && role !== 'citizen' && role !== 'industry' && role !== 'government' && role !== 'hei') {
        // Just let them pass if they are logging into a generic page
      } else if (role) {
         let userRoleForUrl = user.role;
         if (user.role === 'hei_coordinator' || user.role === 'hei_member') userRoleForUrl = 'hei';
         
         if (userRoleForUrl !== role) {
           throw new Error(`This login page is restricted to ${config.title} accounts.`);
         }
      }

      // Redirect based on role
      if (user.role === 'citizen') navigate('/citizen');
      else if (user.role === 'hei_coordinator' || user.role === 'hei_member') navigate('/hei');
      else if (user.role === 'industry') navigate('/industry');
      else if (user.role === 'government') navigate('/government');
      else if (user.role === 'admin') navigate('/admin');
      else navigate('/');
      
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-fill helpers for demo purposes
  const prefill = (demoRole) => {
    if (demoRole === 'citizen') { setEmail('ramesh@example.com'); setPassword('password123'); }
    if (demoRole === 'hei') { setEmail('dean@coep.edu'); setPassword('password123'); }
    if (demoRole === 'industry') { setEmail('csr@tata.com'); setPassword('password123'); }
    if (demoRole === 'gov') { setEmail('admin@pune.gov.in'); setPassword('password123'); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Pane - Branding & Gradient */}
      <div className={`hidden lg:flex w-1/2 bg-gradient-to-br ${config.color} p-12 flex-col justify-between relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-12">
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </Link>
          
          <div className="mb-6 w-24 h-24 bg-white/10 rounded-3xl backdrop-blur-md flex items-center justify-center border border-white/20">
            {config.icon}
          </div>
          
          <h1 className="text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Welcome to<br />{config.title}
          </h1>
          <p className="text-xl text-white/80 max-w-md leading-relaxed">
            {config.subtitle} — securely access your dedicated workspace to view, manage, and accelerate real-world solutions.
          </p>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          &copy; 2026 Srijan Setu. All rights reserved.
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <Link to="/" className="absolute top-8 left-8 lg:hidden inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back
        </Link>
        
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-10">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} mb-4 shadow-lg text-white`}>
              {React.cloneElement(config.icon, { size: 32 })}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{config.title}</h2>
            <p className="text-gray-500 mt-2">{config.subtitle}</p>
          </div>

          <div className="hidden lg:block mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm font-medium border border-red-100 shadow-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} className="shrink-0 mt-0.5" /> 
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1F3864] transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-[#1F3864] outline-none transition-all shadow-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-sm font-medium text-[#1F3864] hover:underline">Forgot password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1F3864] transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-[#1F3864] outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r ${config.color}`}
            >
              {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : 'Sign In'}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}
