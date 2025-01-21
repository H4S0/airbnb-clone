import { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  email: string;
  // Add other user properties here
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthState = async () => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.log('No token found in localStorage.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); // Adjust if response.data has a nested structure
        setIsLoggedIn(true);
        console.log('User data:', response.data);
      } catch (error) {
        console.error(
          'Error fetching user data:',
          error.response || error.message || error
        );
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    setIsLoggedIn(false);
    location.reload();
  };

  return { user, isLoggedIn, isLoading, logout, checkAuthState };
};

export default useAuth;
