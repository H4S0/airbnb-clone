import api from '@/utils/api';

const deleteApplication = async (id: number) => {
  const response = await api.delete(`application/${id}/delete`);
  return response.data;
};

export const useDeclineApplication = () => {
  return {
    mutationFn: deleteApplication,
    onSuccess: () => {
      console.log('delete successfully');
      location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  };
};
