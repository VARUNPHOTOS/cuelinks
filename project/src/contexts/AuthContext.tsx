import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { authAPI } from '../services/api';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    permissions: [],
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          // Verify token is still valid
          await authAPI.refreshToken();
          setAuthState({
            user,
            isAuthenticated: true,
            loading: false,
            permissions: user.permissions || [],
          });
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setAuthState({
            user: null,
            isAuthenticated: false,
            loading: false,
            permissions: [],
          });
        }
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Demo login - replace with actual API call
      const demoUsers = {
        'admin@ruraltech.com': { 
          id: '1', 
          email: 'admin@ruraltech.com', 
          role: 'admin', 
          status: 'active',
          profile: { firstName: 'Admin', lastName: 'User' }
        },
        'store@ruraltech.com': { 
          id: '2', 
          email: 'store@ruraltech.com', 
          role: 'store', 
          status: 'active',
          profile: { firstName: 'Store', lastName: 'Owner' }
        },
        'subadmin@ruraltech.com': { 
          id: '3', 
          email: 'subadmin@ruraltech.com', 
          role: 'sub_admin', 
          status: 'active',
          profile: { firstName: 'Sub', lastName: 'Admin' }
        }
      };
      
      const user = demoUsers[email as keyof typeof demoUsers];
      if (!user || password !== 'password123') {
        throw new Error('Invalid credentials');
      }
      
      const token = 'demo-jwt-token';
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
        permissions: user.permissions || [],
      });
      
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData: any): Promise<void> => {
    try {
      // Demo registration - replace with actual API call
      console.log('Registration data:', userData);
      toast.success('Registration successful! Please check your email for verification.');
    } catch (error: any) {
      toast.error('Registration failed');
      throw error;
    }
  };

  const googleLogin = async (token: string): Promise<void> => {
    try {
      // Demo Google login - replace with actual API call
      const user = {
        id: '4',
        email: 'google@ruraltech.com',
        role: 'store',
        status: 'active',
        profile: { firstName: 'Google', lastName: 'User' }
      };
      const authToken = 'demo-google-jwt-token';
      
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
        permissions: user.permissions || [],
      });
      
      toast.success('Google login successful!');
    } catch (error: any) {
      toast.error('Google login failed');
      throw error;
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      // Demo forgot password - replace with actual API call
      console.log('Forgot password for:', email);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      toast.error('Failed to send reset email');
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      // Demo reset password - replace with actual API call
      console.log('Reset password with token:', token);
      toast.success('Password reset successful! Please login with your new password.');
    } catch (error: any) {
      toast.error('Failed to reset password');
      throw error;
    }
  };

  const verifyEmail = async (token: string): Promise<void> => {
    try {
      // Demo email verification - replace with actual API call
      console.log('Verify email with token:', token);
      toast.success('Email verified successfully!');
    } catch (error: any) {
      toast.error('Email verification failed');
      throw error;
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      // Demo refresh token - replace with actual API call
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('No user found');
      
      const user = JSON.parse(storedUser);
      const token = 'refreshed-demo-jwt-token';
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState(prev => ({
        ...prev,
        user,
        permissions: user.permissions || [],
      }));
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    // Demo logout - replace with actual API call
    console.log('User logged out');
    
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    queryClient.clear();
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      permissions: [],
    });
    
    toast.success('Logged out successfully');
  };

  const updateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState(prev => ({
      ...prev,
      user,
      permissions: user.permissions || [],
    }));
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    googleLogin,
    forgotPassword,
    resetPassword,
    verifyEmail,
    logout,
    updateUser,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};