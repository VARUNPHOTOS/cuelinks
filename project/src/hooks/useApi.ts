import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import * as API from '../services/api';

// Auth hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      API.authAPI.login(email, password),
    onSuccess: (response) => {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: any) => API.authAPI.register(userData),
    onSuccess: () => {
      toast.success('Registration successful! Please check your email for verification.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => API.authAPI.forgotPassword(email),
    onSuccess: () => {
      toast.success('Password reset email sent!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
    },
  });
};

// User hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => API.userAPI.getProfile(),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => API.userAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
};

export const useUsers = (params?: any) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => API.userAPI.getAllUsers(params),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

export const useApproveStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => API.userAPI.approveStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Store approved successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to approve store');
    },
  });
};

export const useRejectStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      API.userAPI.rejectStore(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Store rejected successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to reject store');
    },
  });
};

// Links hooks
export const useLinks = (params?: any) => {
  return useQuery({
    queryKey: ['links', params],
    queryFn: () => API.linksAPI.getLinks(params),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => API.linksAPI.createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create link');
    },
  });
};

export const useBulkCreateLinks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (links: any[]) => API.linksAPI.bulkCreateLinks(links),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Links created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create links');
    },
  });
};
export const useUpdateLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      API.linksAPI.updateLink(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update link');
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => API.linksAPI.deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete link');
    },
  });
};

// Analytics hooks
export const useDashboardStats = (dateRange?: any) => {
  return useQuery({
    queryKey: ['dashboard-stats', dateRange],
    queryFn: () => API.analyticsAPI.getDashboardStats(dateRange),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

export const useClickAnalytics = (params?: any) => {
  return useQuery({
    queryKey: ['click-analytics', params],
    queryFn: () => API.analyticsAPI.getClickAnalytics(params),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

// Transactions hooks
export const useTransactions = (params?: any) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => API.transactionsAPI.getTransactions(params),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

// Payouts hooks
export const usePayouts = (params?: any) => {
  return useQuery({
    queryKey: ['payouts', params],
    queryFn: () => API.payoutsAPI.getPayouts(params),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

export const useRequestPayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ amount, method }: { amount: number; method: string }) =>
      API.payoutsAPI.requestPayout(amount, method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payouts'] });
      toast.success('Payout requested successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to request payout');
    },
  });
};

// Notifications hooks
export const useNotifications = (params?: any) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => API.notificationsAPI.getNotifications(params),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => API.notificationsAPI.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Support hooks
export const useSupportTickets = (params?: any) => {
  return useQuery({
    queryKey: ['support-tickets', params],
    queryFn: () => API.supportAPI.getTickets(params),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => API.supportAPI.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
      toast.success('Support ticket created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create ticket');
    },
  });
};

// Settings hooks
export const useSettings = (category?: string) => {
  return useQuery({
    queryKey: ['settings', category],
    queryFn: () => API.settingsAPI.getSettings(category),
    select: (response) => response.data,
    enabled: false, // Disable until backend is ready
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) =>
      API.settingsAPI.updateSetting(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Setting updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update setting');
    },
  });
};