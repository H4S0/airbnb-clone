import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginData>({
    mutationFn: async (data: LoginData) => {
      const response = await api.post<LoginResponse>('/auth/login', data);
      location.reload();
      return response.data;
    },
    onSuccess: (data) => {
      const accessToken = data.accessToken;
      localStorage.setItem('accessToken', accessToken);
    },
  });
};
