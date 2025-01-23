import api from '@/utils/api';

export const deleteListing = async (id: number) => {
  const response = await api.delete(`listing/deleteListing/${id}`);
  return response.data;
};

export const useDeleteListing = () => {
  return {
    mutationFn: deleteListing,
    onSuccess: () => {
      console.log('delete successfully');
    },
    onError: (error) => {
      console.log(error);
    },
  };
};
