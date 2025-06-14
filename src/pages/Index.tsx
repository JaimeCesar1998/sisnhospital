
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '@/components/LoginPage';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-health-primary to-health-secondary">
        <div className="loading-dots text-white">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  // Redirect based on user role
  return <Navigate to={user.role === 'hospital' ? '/hospital' : '/national'} replace />;
};

export default Index;
