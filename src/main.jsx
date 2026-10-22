import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

            {/* Direct Dashboard Access - All login restrictions removed per request */}
            <Route 
              path="/citizen/*" 
              element={
                <ErrorBoundary>
                  <CitizenDashboard />
                </ErrorBoundary>
              } 
            />
            
            <Route 
              path="/hei/*" 
              element={
                <ErrorBoundary>
                  <HEIDashboard />
                </ErrorBoundary>
              } 
            />
            
            <Route 
              path="/industry/*" 
              element={
                <ErrorBoundary>
                  <IndustryDashboard />
                </ErrorBoundary>
              } 
            />
            
            <Route 
              path="/government/*" 
              element={
                <ErrorBoundary>
                  <GovernmentDashboard />
                </ErrorBoundary>
              } 
            />
            
            <Route 
              path="/admin/*" 
              element={
                <ErrorBoundary>
                  <AdminDashboard />
                </ErrorBoundary>
              } 
            />

            {/* Login Routes - Available as optional utilities */}
            <Route path="/login" element={<Login />} />
            <Route path="/login/:role" element={<Login />} />

            {/* Status pages */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
