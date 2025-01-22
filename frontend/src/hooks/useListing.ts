import api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

export interface listingDetails {
  listingName: string;
  description: string;
  beds: number;
  bedRoom: number;
  wc: number;
  livingRoom: number;
  amenities: [];
}

export interface listingLocation {
  country: string;
  city: string;
  address: string;
  postalNumber: number;
}

export interface listingData {
  category: string;
  listingLocation: listingLocation;
  listingDetails: listingDetails;
  price: any;
}

export const useListing = () => {
  const token = localStorage.getItem('accessToken');
  return useMutation<unknown, unknown, listingData>({
    mutationFn: async (data: listingData) => {
      const response = await api.post('/listing/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};
