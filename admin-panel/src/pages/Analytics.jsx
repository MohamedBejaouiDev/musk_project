import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, Calendar } from 'lucide-react';
import { ordersApi } from '../services/api.js';
import Sidebar from '../components/Sidebar.jsx';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState('30'); // days

  const load = async () => {
    setError('');
    try {
      setLoading(true);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateRange));
      
      const res = await ordersApi.getAnalytics({ 
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString()
      });
      setAnalytics(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [dateRange]);

  const COLORS = ['#AF8D64', '#9a7a50', '#857160', '#706070', '#5b5080'];

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#AF8D64] to-[#9a7a50] rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="text-white" size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
                  <p className="text-gray-600 mt-1">Track your business performance</p>
                </div>
              </div>
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 bg-white font-semibold"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#AF8D64] border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-red-800 font-semibold">{error}</p>
            </div>
          ) : analytics ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard 
                  title="Total Revenue" 
                  value={`${analytics.summary.totalRevenue} DT`}
                  icon={DollarSign}
                  color="green"
                />
                <MetricCard 
                  title="Total Orders" 
                  value={analytics.summary.totalOrders}
                  icon={ShoppingCart}
                  color="blue"
                />
                <MetricCard 
                  title="Unique Customers" 
                  value={analytics.summary.uniqueCustomers}
                  icon={Users}
                  color="purple"
                />
                <MetricCard 
                  title="Avg Order Value" 
                  value={`${analytics.summary.averageOrderValue} DT`}
                  icon={Package}
                  color="orange"
                />
              </div>

              {/* Charts Row 1: Revenue & Orders Over Time */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                <ChartCard title="Revenue Over Time" icon={DollarSign}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.dailySales}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        formatter={(value) => [`${value.toFixed(2)} DT`, 'Revenue']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#AF8D64" 
                        strokeWidth={3}
                        dot={{ fill: '#AF8D64', r: 4 }}
                        name="Revenue (DT)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                {/* Orders Chart */}
                <ChartCard title="Orders Over Time" icon={ShoppingCart}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.dailySales}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      />
                      <Legend />
                      <Bar 
                        dataKey="orders" 
                        fill="#3b82f6" 
                        radius={[8, 8, 0, 0]}
                        name="Orders"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Top Products Section */}
              <ChartCard title="Top 10 Products by Revenue" icon={TrendingUp}>
                <div className="space-y-4">
                  {analytics.topProducts.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No product data available</p>
                  ) : (
                    analytics.topProducts.map((product, index) => (
                      <motion.div
                        key={product.product_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AF8D64] to-[#9a7a50] text-white font-bold rounded-lg text-sm">
                          #{index + 1}
                        </div>
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{product.title}</h4>
                          <p className="text-sm text-gray-600">{product.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{product.revenue.toFixed(2)} DT</p>
                          <p className="text-sm text-gray-600">{product.quantity} sold</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </ChartCard>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}

// Metric Card Component
function MetricCard({ title, value, icon: Icon, color }) {
  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}

// Chart Card Component
function ChartCard({ title, icon: Icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#AF8D64] to-[#9a7a50] rounded-lg flex items-center justify-center">
          <Icon className="text-white" size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
