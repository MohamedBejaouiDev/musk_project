import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Users from './pages/Users.jsx';

const RequireAdmin = ({ children }) => {
  const userStr = localStorage.getItem('adminUser') || localStorage.getItem('currentUser');
  const user = userStr ? JSON.parse(userStr) : null;
  if (!user || !user.isAdmin) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAdmin><Dashboard /></RequireAdmin>} />
      <Route path="/users" element={<RequireAdmin><Users /></RequireAdmin>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
