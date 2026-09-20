import { Link } from 'react-router-dom';
import { Users, Building2, Briefcase, Landmark, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const roles = [
    {
      title: 'Citizen / PRI / ULB',
      description: 'Report local challenges and track progress towards real solutions.',
      icon: <Users size={32} className="text-[#1F3864]" />,
      link: '/citizen',
      buttonText: 'Report a Challenge'
    },
    {
      title: 'University (HEI)',
      description: 'Find local problems, form teams, and build real-world solutions.',
      icon: <Building2 size={32} className="text-[#1F3864]" />,
      link: '/hei',
      buttonText: 'View Challenges'
    },
    {
      title: 'Industry / CSR',
      description: 'Provide funding or mentorship to high-impact projects.',
      icon: <Briefcase size={32} className="text-[#1F3864]" />,
      link: '/industry',
      buttonText: 'Support Projects'
    },
    {
      title: 'Government',
      description: 'Monitor progress, track analytics, and measure real-world impact.',
      icon: <Landmark size={32} className="text-[#1F3864]" />,
      link: '/government',
      buttonText: 'View Dashboard'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white min-h-[90vh] flex flex-col items-center justify-center">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/4 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/4 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center text-center space-y-16">
        
        {/* Hero Section */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#1F3864] font-medium text-sm mb-4 border border-blue-100 shadow-sm">
            <Sparkles size={16} className="text-[#C55A11]" />
            <span>AI-Enabled Challenge-to-Impact Platform</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F3864] to-[#3a68b7]">Srijan Setu</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting local grassroots challenges with academic innovation, industry resources, and government oversight.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <div 
                key={role.title} 
                className="group relative bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 p-8 flex flex-col items-start text-left shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  {role.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h2>
                <p className="text-gray-500 mb-8 flex-1 leading-relaxed">
                  {role.description}
                </p>
                <Link
                  to={`/login/${role.link.substring(1)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-gray-900 text-white rounded-xl font-medium hover:bg-[#1F3864] transition-colors focus:ring-4 focus:ring-blue-100"
                >
                  {role.buttonText}
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
