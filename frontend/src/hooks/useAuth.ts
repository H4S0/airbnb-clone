import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('Token from localStorage:', token); // Debug log
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
      console.log('Verify API Response:', response.data); // Debug log

      if (response.data.user) {
        setUser(response.data.user);
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

  return { user, isLoggedIn };
};

export default useAuth;
