export interface User {
  id: string;
  email: string;
  role: 'admin' | 'sub_admin' | 'store';
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  verificationToken?: string;
  googleId?: string;
  lastLogin?: string;
  profile?: UserProfile;
  permissions?: Permission[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  businessName?: string;
  website?: string;
  phone?: string;
  address?: string;
  description?: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  commissionRate?: number;
  payoutThreshold?: number;
  bankDetails?: BankDetails;
  taxInfo?: TaxInfo;
  apiKey?: string;
}

export interface BankDetails {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  accountHolderName: string;
  accountType: 'checking' | 'savings';
}

export interface TaxInfo {
  taxId: string;
  businessType: string;
  taxExempt: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  permissions: Permission[];
}

export interface Link {
  id: string;
  storeId: string;
  originalUrl: string;
  shortUrl: string;
  title: string;
  description?: string;
  clicks: number;
  conversions: number;
  earnings: number;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'expired';
  category?: string;
  tags?: string[];
  customAlias?: string;
  expiryDate?: string;
}

export interface Analytics {
  totalClicks: number;
  totalConversions: number;
  totalEarnings: number;
  conversionRate: number;
  clicksToday: number;
  earningsToday: number;
  clicksThisWeek: number;
  earningsThisWeek: number;
  clicksThisMonth: number;
  earningsThisMonth: number;
  topPerformingLinks: Link[];
  trafficSources: TrafficSource[];
  dailyStats: DailyStats[];
}

export interface TrafficSource {
  source: string;
  clicks: number;
  conversions: number;
  percentage: number;
}

export interface DailyStats {
  date: string;
  clicks: number;
  conversions: number;
  earnings: number;
}

export interface Transaction {
  id: string;
  storeId: string;
  linkId: string;
  amount: number;
  commission: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  description: string;
  orderId?: string;
  customerId?: string;
  payoutId?: string;
}

export interface Payout {
  id: string;
  storeId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  requestedAt: string;
  processedAt?: string;
  method: 'bank_transfer' | 'paypal' | 'stripe';
  transactionIds: string[];
  fees: number;
  netAmount: number;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  isInternal: boolean;
  createdAt: string;
  attachments?: string[];
}

export interface SystemSettings {
  id: string;
  key: string;
  value: any;
  description: string;
  category: string;
  updatedAt: string;
  updatedBy: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  category: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed?: string;
  expiresAt?: string;
  active: boolean;
  createdAt: string;
}

export interface WebhookEndpoint {
  id: string;
  userId: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'revenue' | 'clicks' | 'conversions' | 'stores' | 'custom';
  filters: any;
  schedule?: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  format: 'pdf' | 'csv' | 'excel';
  createdBy: string;
  createdAt: string;
  lastGenerated?: string;
}