import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // To show loading state while checking
  const [error, setError] = useState<string | null>(null); // To handle any errors

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Assuming you have an `auth/me` endpoint to fetch user info
        const response = await axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Set user data if authenticated
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setError('Not authenticated');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return {
    user,
    loading,
    error,
    logout,
  };
};
