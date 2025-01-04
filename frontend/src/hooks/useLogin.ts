import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginData>({
    mutationFn: async (data) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });
};
