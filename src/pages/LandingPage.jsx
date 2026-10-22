import { Link } from 'react-router-dom';
import { Users, Building2, Briefcase, Landmark, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const roles = [
    {
      title: 'Citizen Portal',
      description: 'Report grassroots community challenges, view AI verification, and track solutions in real time.',
      icon: <Users size={32} className="text-[#1F3864]" />,
      link: '/citizen',
      buttonText: 'Open Citizen Portal'
    },
    {
      title: 'University (HEI)',
      description: 'Review AI-matched grassroots problems, accept challenges, form student-faculty teams, and build solutions.',
      icon: <Building2 size={32} className="text-[#1F3864]" />,
      link: '/hei',
      buttonText: 'Open University Portal'
    },
    {
      title: 'Industry / CSR',
      description: 'Discover high-impact university projects, provide CSR grants, technical resources, and industry mentorship.',
      icon: <Briefcase size={32} className="text-[#1F3864]" />,
      link: '/industry',
      buttonText: 'Open Industry Portal'
    },
    {
      title: 'Government',
      description: 'Monitor statewide impact, explore district challenges, inspect HEI prototypes, and formulate policy insights.',
      icon: <Landmark size={32} className="text-[#1F3864]" />,
      link: '/government',
      buttonText: 'Open Govt Dashboard'
    },
    {
      title: 'Admin Operations',
      description: 'Platform governance, AI monitoring, user management, audit trails, and system security controls.',
      icon: <Shield size={32} className="text-[#1F3864]" />,
      link: '/admin',
      buttonText: 'Open Admin Ops'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white min-h-[90vh] flex flex-col items-center justify-center py-10">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/4 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/4 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-6 py-10 flex flex-col items-center text-center space-y-12">
        
        {/* Hero Section */}
        <div className="max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#1F3864] font-medium text-sm border border-blue-100 shadow-xs">
            <Sparkles size={16} className="text-[#C55A11]" />
            <span>AI-Enabled Challenge-to-Impact Platform • Jharkhand</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F3864] via-blue-700 to-[#3a68b7]">Srijan Setu</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting grassroots challenges with university innovation, industry sponsorship, and government oversight. All dashboards are fully accessible with live AI verification.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {roles.map((role) => (
              <div 
                key={role.title} 
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 flex flex-col items-start text-left shadow-xs hover:shadow-xl hover:bg-white transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-5 border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  {role.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h2>
                <p className="text-gray-500 mb-6 flex-1 text-sm leading-relaxed">
                  {role.description}
                </p>
                <Link
                  to={role.link}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-[#1F3864] transition-colors text-sm shadow-sm"
                >
                  {role.buttonText}
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
