import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import StoreDashboard from './pages/Store/StoreDashboard';
import LinkGenerator from './pages/Store/LinkGenerator';
import UserManagement from './pages/Admin/UserManagement';
import StoreApprovals from './pages/Admin/StoreApprovals';

// Layout wrapper for dashboard pages
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Navbar />
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Navbar />
                <DashboardLayout>
                  <UserManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/approvals" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Navbar />
                <DashboardLayout>
                  <StoreApprovals />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Navbar />
                <DashboardLayout>
                  <div className="p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
                      <p className="text-gray-600">This section is under development.</p>
                    </div>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Sub Admin Routes */}
            <Route path="/sub-admin" element={
              <ProtectedRoute allowedRoles={['sub_admin']}>
                <Navbar />
                <DashboardLayout>
                  <div className="p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sub Admin Dashboard</h1>
                      <p className="text-gray-600">Sub admin functionality is under development.</p>
                    </div>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/sub-admin/*" element={
              <ProtectedRoute allowedRoles={['sub_admin']}>
                <Navbar />
                <DashboardLayout>
                  <div className="p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
                      <p className="text-gray-600">This section is under development.</p>
                    </div>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Store Routes */}
            <Route path="/store" element={
              <ProtectedRoute allowedRoles={['store']}>
                <Navbar />
                <DashboardLayout>
                  <StoreDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/store/links" element={
              <ProtectedRoute allowedRoles={['store']}>
                <Navbar />
                <DashboardLayout>
                  <LinkGenerator />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/store/*" element={
              <ProtectedRoute allowedRoles={['store']}>
                <Navbar />
                <DashboardLayout>
                  <div className="p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
                      <p className="text-gray-600">This section is under development.</p>
                    </div>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={
              <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center max-w-md">
                    <div className="text-red-500 mb-4">
                      <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
                    <button 
                      onClick={() => window.history.back()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </>
            } />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;