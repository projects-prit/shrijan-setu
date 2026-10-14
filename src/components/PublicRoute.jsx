import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const PublicRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={48} className="animate-spin text-[#1F3864]" />
      </div>
    );
  }

  // If user is already logged in, redirect them away from Login pages to their respective dashboard
  if (user) {
    switch (user.role) {
      case 'citizen':
        return <Navigate to="/citizen" replace />;
      case 'hei_coordinator':
      case 'hei_member':
        return <Navigate to="/hei" replace />;
      case 'industry':
        return <Navigate to="/industry" replace />;
      case 'government':
        return <Navigate to="/government" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        return <Outlet />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
