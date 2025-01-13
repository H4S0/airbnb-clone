import {
  listingData,
  listingDetails,
  listingLocation,
} from '@/hooks/useListing';
import { create } from 'zustand';

interface ListingStore {
  listingData: listingData;
  updateListing: (
    key: keyof listingData,
    value: string | number | listingDetails | listingLocation
  ) => void;
  updateDetails: (key: keyof listingDetails, value: string | number) => void;
  updateLocation: (key: keyof listingLocation, value: string | number) => void;
}

export const useListingStore = create<ListingStore>((set) => ({
  listingData: {
    category: '',
    listingLocation: {
      country: '',
      city: '',
      address: '',
      postalNumber: '',
    },
    listingDetails: {
      rooms: 0,
      description: '',
    },
    price: 0,
  },
  updateListing: (key, value) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        [key]: value,
      },
    })),
  updateDetails: (key, value) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        listingDetails: {
          ...state.listingData.listingDetails,
          [key]: value,
        },
      },
    })),
  updateLocation: (key, value) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        listingLocation: {
          ...state.listingData.listingLocation,
          [key]: value,
        },
      },
    })),
}));
