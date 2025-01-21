import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn, checkAuthState }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initalizeAuth = async () => {
      await checkAuthState();
      setIsLoading(false);
    };
    initalizeAuth();
  }, [checkAuthState]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
