import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-[#1F3864]" />
      </div>
    );
  }

  // Check if user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is in the allowedRoles array (if provided)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If not authorized, maybe redirect to a generic unauthorized page or their specific dashboard
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
