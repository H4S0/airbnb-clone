import api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

export interface listingDetails {
  name: string;
  description: string;
  rooms: number;
  bedRoom: number;
  wc: number;
  livingRoom: number;
}

export interface listingLocation {
  country: string;
  city: string;
  address: string;
  postalNumber: string;
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
