import api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

export interface listingDetails {
  rooms: number;
  description: string;
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
  price: number;
}

{
  /* ovdje će se listingData zamjeniti sa onom iz zustanda */
}

export const useListing = () => {
  return useMutation<unknown, unknown, listingData>({
    mutationFn: async (data: listingData) => {
      const response = await api.post('/listing/create', data);
      return response.data;
    },
  });
};
