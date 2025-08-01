import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  Building,
  Globe,
  FileText,
  Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PendingStore {
  id: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  profile: {
    firstName: string;
    lastName: string;
    businessName: string;
    website?: string;
    phone?: string;
    description?: string;
  };
}

const StoreApprovals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  // Demo data - replace with actual API call
  const [stores, setStores] = useState<PendingStore[]>([
    {
      id: '1',
      email: 'techmart@example.com',
      status: 'pending',
      createdAt: '2024-01-20T14:30:00Z',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        businessName: 'TechMart Electronics',
        website: 'https://techmart.com',
        phone: '+91 98765 43210',
        description: 'Leading electronics retailer specializing in smartphones, laptops, and accessories.'
      }
    },
    {
      id: '2',
      email: 'fashionhub@example.com',
      status: 'pending',
      createdAt: '2024-01-21T09:15:00Z',
      profile: {
        firstName: 'Sarah',
        lastName: 'Smith',
        businessName: 'Fashion Hub',
        website: 'https://fashionhub.com',
        phone: '+91 87654 32109',
        description: 'Trendy fashion store offering latest clothing and accessories for all ages.'
      }
    },
    {
      id: '3',
      email: 'bookworld@example.com',
      status: 'pending',
      createdAt: '2024-01-22T16:45:00Z',
      profile: {
        firstName: 'Mike',
        lastName: 'Johnson',
        businessName: 'Book World',
        phone: '+91 76543 21098',
        description: 'Comprehensive bookstore with academic, fiction, and professional books.'
      }
    }
  ]);

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.profile.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || store.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (storeId: string) => {
    setStores(prev => prev.map(store => 
      store.id === storeId ? { ...store, status: 'approved' as const } : store
    ));
    toast.success('Store approved successfully!');
  };

  const handleReject = () => {
    if (!selectedStoreId || !rejectReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    setStores(prev => prev.map(store => 
      store.id === selectedStoreId ? { ...store, status: 'rejected' as const } : store
    ));
    
    toast.success('Store rejected successfully!');
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedStoreId(null);
  };

  const openRejectModal = (storeId: string) => {
    setSelectedStoreId(storeId);
    setShowRejectModal(true);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Approvals</h1>
          <p className="text-gray-600">Review and approve store registrations</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{filteredStores.filter(s => s.status === 'pending').length} pending approvals</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <div key={store.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Store className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {store.profile.businessName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {store.profile.firstName} {store.profile.lastName}
                  </p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(store.status)}`}>
                {store.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {store.email}
              </div>
              {store.profile.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {store.profile.phone}
                </div>
              )}
              {store.profile.website && (
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={store.profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {store.profile.website}
                  </a>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Applied {new Date(store.createdAt).toLocaleDateString()}
              </div>
            </div>

            {store.profile.description && (
              <div className="mb-4">
                <p className="text-sm text-gray-700 line-clamp-3">
                  {store.profile.description}
                </p>
              </div>
            )}

            {store.status === 'pending' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleApprove(store.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <UserCheck className="h-4 w-4 mr-1" />
                  Approve
                </button>
                <button
                  onClick={() => openRejectModal(store.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
                >
                  <UserX className="h-4 w-4 mr-1" />
                  Reject
                </button>
                <button className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            )}

            {store.status !== 'pending' && (
              <div className="flex items-center justify-center py-2">
                <span className="text-sm text-gray-500">
                  {store.status === 'approved' ? 'Store has been approved' : 'Store has been rejected'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stores found</h3>
          <p className="text-gray-600">No stores match your current filters.</p>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Reject Store Application</h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason *
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please provide a reason for rejection..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Reject Store
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreApprovals;