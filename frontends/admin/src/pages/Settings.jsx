import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Mail, Lock, Save, Eye, EyeOff, Shield } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';

export default function Settings() {
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    loadAdminProfile();
  }, []);

  const loadAdminProfile = () => {
    try {
      const userStr = localStorage.getItem('adminUser') || localStorage.getItem('currentUser');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (user) {
        setAdmin(user);
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Error loading admin profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
      showToast('Please enter a valid email', 'error');
      return;
    }

    // If changing password, validate
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        showToast('Current password is required to change password', 'error');
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
      }

      if (formData.newPassword.length < 8) {
        showToast('New password must be at least 8 characters', 'error');
        return;
      }

      // Verify current password
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = storedUsers.find(u => u.email === admin.email);
      
      if (!currentUser || currentUser.password !== formData.currentPassword) {
        showToast('Current password is incorrect', 'error');
        return;
      }
    }

    setLoading(true);

    try {
      // Update user in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = storedUsers.findIndex(u => u.email === admin.email);

      if (userIndex !== -1) {
        // Update user data
        storedUsers[userIndex] = {
          ...storedUsers[userIndex],
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          ...(formData.newPassword ? { password: formData.newPassword } : {})
        };

        localStorage.setItem('users', JSON.stringify(storedUsers));

        // Update current user session
        const updatedUser = storedUsers[userIndex];
        localStorage.setItem('adminUser', JSON.stringify(updatedUser));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        setAdmin(updatedUser);
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });

        showToast('Profile updated successfully', 'success');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#AF8D64] to-[#9a7a50] rounded-2xl flex items-center justify-center shadow-lg">
                <SettingsIcon className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your admin account settings</p>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#AF8D64] to-[#9a7a50] px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <User className="text-[#AF8D64]" size={32} />
                  </div>
                  <div className="text-white">
                    <h2 className="text-2xl font-bold">
                      {admin?.firstName} {admin?.lastName}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Shield size={16} />
                      <span className="text-sm">Administrator</span>
                    </div>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-white text-[#AF8D64] rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={20} className="text-[#AF8D64]" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="First Name"
                      icon={User}
                      value={formData.firstName}
                      onChange={(value) => setFormData({ ...formData, firstName: value })}
                      disabled={!isEditing}
                      required
                    />
                    <FormField
                      label="Last Name"
                      icon={User}
                      value={formData.lastName}
                      onChange={(value) => setFormData({ ...formData, lastName: value })}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail size={20} className="text-[#AF8D64]" />
                    Email Address
                  </h3>
                  <FormField
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={formData.email}
                    onChange={(value) => setFormData({ ...formData, email: value })}
                    disabled={!isEditing}
                    required
                  />
                </div>

                {/* Change Password */}
                {isEditing && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Lock size={20} className="text-[#AF8D64]" />
                      Change Password
                    </h3>
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <p className="text-sm text-gray-600 mb-4">
                        Leave blank if you don't want to change your password
                      </p>
                      
                      <PasswordField
                        label="Current Password"
                        value={formData.currentPassword}
                        onChange={(value) => setFormData({ ...formData, currentPassword: value })}
                        show={showCurrentPassword}
                        onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <PasswordField
                          label="New Password"
                          value={formData.newPassword}
                          onChange={(value) => setFormData({ ...formData, newPassword: value })}
                          show={showNewPassword}
                          onToggle={() => setShowNewPassword(!showNewPassword)}
                        />
                        <PasswordField
                          label="Confirm New Password"
                          value={formData.confirmPassword}
                          onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
                          show={showNewPassword}
                          onToggle={() => setShowNewPassword(!showNewPassword)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#AF8D64] to-[#9a7a50] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        loadAdminProfile();
                      }}
                      disabled={loading}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-200 font-semibold disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6"
          >
            <div className="flex items-start gap-3">
              <Shield className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-blue-900 mb-1">Account Security</h4>
                <p className="text-sm text-blue-800">
                  Your admin account has full access to all system features. Keep your credentials secure and use a strong password.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

// Form Field Component
function FormField({ label, icon: Icon, type = 'text', value, onChange, disabled, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 transition-all duration-200 ${
            disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'
          }`}
        />
      </div>
    </div>
  );
}

// Password Field Component
function PasswordField({ label, value, onChange, show, onToggle }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Lock size={18} />
        </div>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#AF8D64] focus:ring-2 focus:ring-[#AF8D64]/20 transition-all duration-200 bg-white"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

// Toast Component
function Toast({ message, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-lg text-white font-semibold flex items-center gap-3 min-w-[300px] ${
        type === 'success' 
          ? 'bg-gradient-to-r from-green-500 to-green-600' 
          : 'bg-gradient-to-r from-red-500 to-red-600'
      }`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}>
        {type === 'success' ? '✓' : '✕'}
      </div>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        ✕
      </button>
    </motion.div>
  );
}
