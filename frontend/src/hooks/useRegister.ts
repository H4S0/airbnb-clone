// src/hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

type RegisterData = {
  email: string;
  password: string;
};

type RegisterResponse = {
  message: string;
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post<RegisterResponse>('/auth/register', data);
      return response.data;
    },
  });
};
