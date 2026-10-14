import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import HEIDashboard from './pages/hei/HEIDashboard';
import IndustryDashboard from './pages/industry/IndustryDashboard';
import GovernmentDashboard from './pages/government/GovernmentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Home Page - Accessible to everyone */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
            </Route>

            {/* Auth Routes - Redirects to dashboard if already logged in */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/login/:role" element={<Login />} />
            </Route>

            {/* Access control pages */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Dashboards */}
            <Route element={<ProtectedRoute allowedRoles={['citizen']} />}>
              <Route 
                path="/citizen/*" 
                element={
                  <ErrorBoundary>
                    <CitizenDashboard />
                  </ErrorBoundary>
                } 
              />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['hei_coordinator', 'hei_member']} />}>
              <Route 
                path="/hei/*" 
                element={
                  <ErrorBoundary>
                    <HEIDashboard />
                  </ErrorBoundary>
                } 
              />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['industry']} />}>
              <Route 
                path="/industry/*" 
                element={
                  <ErrorBoundary>
                    <IndustryDashboard />
                  </ErrorBoundary>
                } 
              />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['government']} />}>
              <Route 
                path="/government/*" 
                element={
                  <ErrorBoundary>
                    <GovernmentDashboard />
                  </ErrorBoundary>
                } 
              />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route 
                path="/admin/*" 
                element={
                  <ErrorBoundary>
                    <AdminDashboard />
                  </ErrorBoundary>
                } 
              />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
