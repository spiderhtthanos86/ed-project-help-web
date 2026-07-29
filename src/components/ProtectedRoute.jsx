import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingSpinner fullPage />;
  if (!currentUser) return <Navigate to="/admin/login" replace />;
  return children;
};

export default ProtectedRoute;
