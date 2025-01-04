import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

type User = {
  id: string;
  email: string;
};

export const useAuth = () => {
  return useQuery<User | null>({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/me');
        {
          /* add here to get certain user to check if its login or not */
        }
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
