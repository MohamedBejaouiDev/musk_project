import { NavLink } from 'react-router-dom';
import { Package, Users as UsersIcon, LogOut, Store, Settings, BarChart3 } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/login');
  };

  const navItems = [
    { to: '/', icon: Package, label: 'Products' },
    { to: '/users', icon: UsersIcon, label: 'Users' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className={`
      bg-white shadow-lg h-screen sticky top-0 flex flex-col transition-all duration-300
      ${isCollapsed ? 'w-20' : 'w-64'}
    `} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 justify-between">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="w-10 h-10 bg-[#AF8D64] rounded-lg flex items-center justify-center flex-shrink-0">
              <Store className="text-white" size={24} />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg text-gray-900 truncate">Admin Panel</h2>
                <p className="text-xs text-gray-500 truncate">Perfume Shop</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1 rounded-lg hover:bg-gray-100 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
          >
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 py-6 space-y-2 px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-lg font-medium
              ${isActive 
                ? 'bg-[#AF8D64]/10 text-[#AF8D64] border-l-4 border-[#AF8D64]' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-[#AF8D64]'
              }
              ${isCollapsed ? 'justify-center px-2' : ''}
            `}
          >
            <Icon size={20} className="flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-medium truncate">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg 
            hover:bg-red-600 transition-all duration-200 font-medium shadow-sm
            ${isCollapsed ? 'justify-center px-2' : ''}
          `}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
        
        {/* User Info (optional - if you have user data) */}
        {!isCollapsed && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#AF8D64] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@perfumeshop.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Collapsed Tooltips */}
      {isCollapsed && (
        <div className="absolute left-full top-0 ml-2 pointer-events-none">
          {navItems.map(({ label, to }) => (
            <div
              key={to}
              className="bg-gray-900 text-white text-sm py-2 px-3 rounded-lg mb-1 opacity-0 hover:opacity-100 transition-opacity"
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}