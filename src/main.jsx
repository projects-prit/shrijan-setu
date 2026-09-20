import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import HEIDashboard from './pages/hei/HEIDashboard';
import IndustryDashboard from './pages/industry/IndustryDashboard';
import GovernmentDashboard from './pages/government/GovernmentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes - Auto-redirects to dashboard if logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/login/:role" element={<Login />} />
          </Route>

          {/* Protected Dashboards */}
          <Route element={<ProtectedRoute allowedRoles={['citizen']} />}>
            <Route path="/citizen/*" element={<CitizenDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['hei_coordinator', 'hei_member']} />}>
            <Route path="/hei/*" element={<HEIDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['industry']} />}>
            <Route path="/industry/*" element={<IndustryDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['government']} />}>
            <Route path="/government/*" element={<GovernmentDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
