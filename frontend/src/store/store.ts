import {
  listingData,
  listingDetails,
  listingLocation,
} from '@/hooks/useListing';
import { boolean } from 'zod';
import { create } from 'zustand';

interface ListingStore {
  listingData: listingData;
  updateListing: (
    key: keyof listingData,
    value: string | number | listingDetails | listingLocation
  ) => void;
  updateDetails: (
    key: keyof listingDetails,
    value: string | number | boolean
  ) => void;
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
      name: '',
      description: '',
      rooms: 0,
      bedRoom: 0,
      livingRoom: 0,
      wc: 0,
      wifi: false,
      washMachine: false,
      airConditioner: false,
      tv: false,
      kitchen: false,
      freeParking: false,
      garden: false,
      gym: false,
      beachAccess: false,
      fireAlarm: false,
      firstAid: false,
      pool: false,
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
