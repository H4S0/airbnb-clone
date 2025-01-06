import { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  email: string;
};

const useAuth = () => {
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      verifyToken(token);
    } else {
      console.log('No token found in localStorage.');
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await axios.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setUser(response.data);
        setIsLoggedIn(true);
      } else {
        console.log('User not found in response.');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error during token verification:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    location.reload();
  };

  return { user, isLoggedIn, logout };
};

export default useAuth;
