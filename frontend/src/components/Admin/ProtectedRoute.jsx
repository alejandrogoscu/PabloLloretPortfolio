import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');

  return token;
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
