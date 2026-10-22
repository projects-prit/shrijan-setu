import React from 'react';
import { Outlet } from 'react-router-dom';

// Logins removed for seamless public access across all dashboards
const ProtectedRoute = () => {
  return <Outlet />;
};

export default ProtectedRoute;
