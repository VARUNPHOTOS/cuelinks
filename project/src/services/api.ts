import axios from 'axios';
import { User, Link, Analytics, Transaction, Payout, Notification, SupportTicket, SystemSettings } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  googleAuth: (token: string) =>
    api.post('/auth/google', { token }),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  
  verifyEmail: (token: string) =>
    api.post('/auth/verify-email', { token }),
  
  refreshToken: () =>
    api.post('/auth/refresh'),
  
  logout: () =>
    api.post('/auth/logout'),
};

// User API
export const userAPI = {
  getProfile: () =>
    api.get<User>('/users/profile'),
  
  updateProfile: (data: Partial<User>) =>
    api.put('/users/profile', data),
  
  getAllUsers: (params?: any) =>
    api.get<User[]>('/users', { params }),
  
  getUserById: (id: string) =>
    api.get<User>(`/users/${id}`),
  
  updateUser: (id: string, data: Partial<User>) =>
    api.put(`/users/${id}`, data),
  
  deleteUser: (id: string) =>
    api.delete(`/users/${id}`),
  
  approveStore: (id: string) =>
    api.post(`/users/${id}/approve`),
  
  rejectStore: (id: string, reason: string) =>
    api.post(`/users/${id}/reject`, { reason }),
  
  suspendUser: (id: string, reason: string) =>
    api.post(`/users/${id}/suspend`, { reason }),
  
  activateUser: (id: string) =>
    api.post(`/users/${id}/activate`),
};

// Links API
export const linksAPI = {
  getLinks: (params?: any) =>
    api.get<Link[]>('/links', { params }),
  
  getLinkById: (id: string) =>
    api.get<Link>(`/links/${id}`),
  
  createLink: (data: Partial<Link>) =>
    api.post<Link>('/links', data),
  
  updateLink: (id: string, data: Partial<Link>) =>
    api.put<Link>(`/links/${id}`, data),
  
  deleteLink: (id: string) =>
    api.delete(`/links/${id}`),
  
  bulkCreateLinks: (links: Partial<Link>[]) =>
    api.post('/links/bulk', { links }),
  
  generateShortUrl: (originalUrl: string, customAlias?: string) =>
    api.post('/links/generate', { originalUrl, customAlias }),
  
  getLinkAnalytics: (id: string, dateRange?: { start: string; end: string }) =>
    api.get(`/links/${id}/analytics`, { params: dateRange }),
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: (dateRange?: { start: string; end: string }) =>
    api.get<Analytics>('/analytics/dashboard', { params: dateRange }),
  
  getClickAnalytics: (params?: any) =>
    api.get('/analytics/clicks', { params }),
  
  getConversionAnalytics: (params?: any) =>
    api.get('/analytics/conversions', { params }),
  
  getRevenueAnalytics: (params?: any) =>
    api.get('/analytics/revenue', { params }),
  
  getTrafficSources: (params?: any) =>
    api.get('/analytics/traffic-sources', { params }),
  
  exportAnalytics: (type: string, params?: any) =>
    api.get(`/analytics/export/${type}`, { params, responseType: 'blob' }),
};

// Transactions API
export const transactionsAPI = {
  getTransactions: (params?: any) =>
    api.get<Transaction[]>('/transactions', { params }),
  
  getTransactionById: (id: string) =>
    api.get<Transaction>(`/transactions/${id}`),
  
  updateTransaction: (id: string, data: Partial<Transaction>) =>
    api.put(`/transactions/${id}`, data),
};

// Payouts API
export const payoutsAPI = {
  getPayouts: (params?: any) =>
    api.get<Payout[]>('/payouts', { params }),
  
  getPayoutById: (id: string) =>
    api.get<Payout>(`/payouts/${id}`),
  
  requestPayout: (amount: number, method: string) =>
    api.post('/payouts/request', { amount, method }),
  
  processPayout: (id: string) =>
    api.post(`/payouts/${id}/process`),
  
  cancelPayout: (id: string, reason: string) =>
    api.post(`/payouts/${id}/cancel`, { reason }),
};

// Notifications API
export const notificationsAPI = {
  getNotifications: (params?: any) =>
    api.get<Notification[]>('/notifications', { params }),
  
  markAsRead: (id: string) =>
    api.put(`/notifications/${id}/read`),
  
  markAllAsRead: () =>
    api.put('/notifications/read-all'),
  
  deleteNotification: (id: string) =>
    api.delete(`/notifications/${id}`),
};

// Support API
export const supportAPI = {
  getTickets: (params?: any) =>
    api.get<SupportTicket[]>('/support/tickets', { params }),
  
  getTicketById: (id: string) =>
    api.get<SupportTicket>(`/support/tickets/${id}`),
  
  createTicket: (data: Partial<SupportTicket>) =>
    api.post<SupportTicket>('/support/tickets', data),
  
  updateTicket: (id: string, data: Partial<SupportTicket>) =>
    api.put(`/support/tickets/${id}`, data),
  
  addResponse: (ticketId: string, message: string, isInternal: boolean = false) =>
    api.post(`/support/tickets/${ticketId}/responses`, { message, isInternal }),
  
  closeTicket: (id: string) =>
    api.post(`/support/tickets/${id}/close`),
};

// Settings API
export const settingsAPI = {
  getSettings: (category?: string) =>
    api.get<SystemSettings[]>('/settings', { params: { category } }),
  
  updateSetting: (key: string, value: any) =>
    api.put(`/settings/${key}`, { value }),
  
  getEmailTemplates: () =>
    api.get('/settings/email-templates'),
  
  updateEmailTemplate: (id: string, data: any) =>
    api.put(`/settings/email-templates/${id}`, data),
};

// API Keys API
export const apiKeysAPI = {
  getApiKeys: () =>
    api.get('/api-keys'),
  
  createApiKey: (name: string, permissions: string[]) =>
    api.post('/api-keys', { name, permissions }),
  
  revokeApiKey: (id: string) =>
    api.delete(`/api-keys/${id}`),
  
  regenerateApiKey: (id: string) =>
    api.post(`/api-keys/${id}/regenerate`),
};

// Webhooks API
export const webhooksAPI = {
  getWebhooks: () =>
    api.get('/webhooks'),
  
  createWebhook: (data: any) =>
    api.post('/webhooks', data),
  
  updateWebhook: (id: string, data: any) =>
    api.put(`/webhooks/${id}`, data),
  
  deleteWebhook: (id: string) =>
    api.delete(`/webhooks/${id}`),
  
  testWebhook: (id: string) =>
    api.post(`/webhooks/${id}/test`),
};

// Reports API
export const reportsAPI = {
  getReports: () =>
    api.get('/reports'),
  
  createReport: (data: any) =>
    api.post('/reports', data),
  
  generateReport: (id: string) =>
    api.post(`/reports/${id}/generate`),
  
  downloadReport: (id: string) =>
    api.get(`/reports/${id}/download`, { responseType: 'blob' }),
  
  scheduleReport: (id: string, schedule: any) =>
    api.post(`/reports/${id}/schedule`, schedule),
};

export default api;