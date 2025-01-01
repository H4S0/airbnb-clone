// src/hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

type RegisterData = {
  email: string;
  password: string;
};

type RegisterResponse = {
  message: string; // Customize this based on your API response
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post<RegisterResponse>('/auth/register', data);
      return response.data; // Extract the data field only
    },
  });
};
