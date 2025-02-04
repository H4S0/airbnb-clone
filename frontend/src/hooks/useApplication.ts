import api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

interface applicationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateRange: string;
  adults: number;
  kids: number;
}

export const useApplication = () => {
  const token = localStorage.getItem('accessToken');
  return useMutation<unknown, unknown, applicationData>({
    mutationFn: async (data: applicationData) => {
      const response = await api.post('/application/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};
