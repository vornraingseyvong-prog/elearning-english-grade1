import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthGuard({ children }) {
  const { currentProfile } = useAuth();
  
  if (!currentProfile) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}