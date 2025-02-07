import api from '@/utils/api';
import { useQueryClient } from '@tanstack/react-query';

const deleteApplication = async (id: number) => {
  const response = await api.delete(`application/${id}/delete`);
  return response.data;
};

export const useDeclineApplication = () => {
  const queryClient = useQueryClient();

  return {
    mutationFn: deleteApplication,
    onSuccess: () => {
      console.log('delete successfully');
      queryClient.invalidateQueries(['application']);
      location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  };
};
