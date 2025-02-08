import api from '@/utils/api';

export const deleteListing = async (id: number) => {
  try {
    const response = await api.delete(`listing/deleteListing/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error; // Rethrow to let the mutation handle it
  }
};

export const useDeleteListing = () => {
  return {
    mutationFn: deleteListing,
    onSuccess: () => {
      console.log('Delete successful');
    },
    onError: (error: any) => {
      console.error('Delete failed:', error);
    },
  };
};
