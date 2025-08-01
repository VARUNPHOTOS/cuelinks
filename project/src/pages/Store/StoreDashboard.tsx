import React from 'react';
import {
  Link as LinkIcon,
  MousePointer,
  TrendingUp,
  DollarSign,
  Eye,
  Users,
  Calendar,
  Award,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  const changeColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeColorClasses[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
const StoreDashboard: React.FC = () => {
  // Mock data
  const dailyStats = [
    { date: '2024-01-15', clicks: 120, conversions: 8, earnings: 450 },
    { date: '2024-01-16', clicks: 145, conversions: 12, earnings: 680 },
    { date: '2024-01-17', clicks: 98, conversions: 6, earnings: 320 },
    { date: '2024-01-18', clicks: 167, conversions: 15, earnings: 890 },
    { date: '2024-01-19', clicks: 134, conversions: 9, earnings: 540 },
    { date: '2024-01-20', clicks: 189, conversions: 18, earnings: 1020 },
    { date: '2024-01-21', clicks: 156, conversions: 11, earnings: 675 },
  ];

  const topLinks = [
    { id: 1, title: 'Premium Smartphone Deal', clicks: 1250, conversions: 45, earnings: 2250, ctr: '3.6%' },
    { id: 2, title: 'Laptop Flash Sale', clicks: 890, conversions: 23, earnings: 1150, ctr: '2.6%' },
    { id: 3, title: 'Gaming Headset Offer', clicks: 670, conversions: 18, earnings: 720, ctr: '2.7%' },
    { id: 4, title: 'Smart Watch Collection', clicks: 543, conversions: 12, earnings: 480, ctr: '2.2%' },
  ];

  const recentActivity = [
    { id: 1, type: 'conversion', message: 'New conversion: Premium Smartphone Deal', earnings: 50, time: '2 minutes ago' },
    { id: 2, type: 'click', message: '25 new clicks on Laptop Flash Sale', earnings: 0, time: '12 minutes ago' },
    { id: 3, type: 'conversion', message: 'New conversion: Gaming Headset Offer', earnings: 40, time: '45 minutes ago' },
    { id: 4, type: 'link', message: 'New link created: Tablet Special', earnings: 0, time: '2 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Dashboard</h1>
          <p className="text-gray-600">Track your affiliate performance and earnings</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Active Store
          </div>
          <div className="text-sm text-gray-500">
            Commission Rate: 10%
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Clicks"
          value="12,450"
          change="+15% from last week"
          changeType="positive"
          icon={MousePointer}
          color="blue"
        />
        <StatsCard
          title="Conversions"
          value="347"
          change="+8% from last week"
          changeType="positive"
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Total Earnings"
          value="₹18,650"
          change="+22% from last week"
          changeType="positive"
          icon={DollarSign}
          color="purple"
        />
        <StatsCard
          title="Active Links"
          value="28"
          change="3 new this week"
          changeType="neutral"
          icon={LinkIcon}
          color="indigo"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Trend (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => [`₹${value}`, 'Earnings']}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Click vs Conversion */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clicks vs Conversions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
              <Bar dataKey="clicks" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="conversions" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Links */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Links</h3>
          <div className="space-y-4">
            {topLinks.map((link, index) => (
              <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {index + 1}
                    </span>
                    <h4 className="font-medium text-gray-900 truncate">{link.title}</h4>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {link.clicks}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {link.conversions}
                    </span>
                    <span className="text-green-600 font-medium">CTR: {link.ctr}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₹{link.earnings}</div>
                  <div className="text-sm text-gray-500">earnings</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'conversion' ? 'bg-green-500' :
                  activity.type === 'click' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.earnings > 0 && (
                      <span className="text-xs text-green-600 font-medium">
                        +₹{activity.earnings}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
            <div className="text-center">
              <LinkIcon className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                Create New Link
              </span>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-green-600">
                Request Payout
              </span>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
            <div className="text-center">
              <Eye className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">
                View Analytics
              </span>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group">
            <div className="text-center">
              <Award className="h-8 w-8 text-gray-400 group-hover:text-orange-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600">
                View Profile
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;