import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Store,
  Link as LinkIcon,
  BarChart3,
  Settings,
  CreditCard,
  UserCheck,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '', roles: ['admin', 'sub_admin', 'store'] },
  { icon: Users, label: 'User Management', href: '/users', roles: ['admin'] },
  { icon: UserCheck, label: 'Store Approvals', href: '/approvals', roles: ['admin', 'sub_admin'] },
  { icon: Store, label: 'Stores', href: '/stores', roles: ['admin', 'sub_admin'] },
  { icon: LinkIcon, label: 'Link Generator', href: '/links', roles: ['store'] },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', roles: ['admin', 'sub_admin', 'store'] },
  { icon: CreditCard, label: 'Payouts', href: '/payouts', roles: ['admin', 'store'] },
  { icon: FileText, label: 'Reports', href: '/reports', roles: ['admin', 'sub_admin'] },
  { icon: Settings, label: 'Settings', href: '/settings', roles: ['admin', 'sub_admin', 'store'] },
  { icon: HelpCircle, label: 'Support', href: '/support', roles: ['store'] },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getBasePath = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'sub_admin':
        return '/sub-admin';
      case 'store':
        return '/store';
      default:
        return '';
    }
  };

  const basePath = getBasePath();
  const filteredItems = sidebarItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">
          {user?.role?.replace('_', ' ')} Panel
        </h2>
      </div>
      
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {filteredItems.map((item) => {
            const fullPath = basePath + item.href;
            const isActive = location.pathname === fullPath;
            
            return (
              <Link
                key={item.href}
                to={fullPath}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;