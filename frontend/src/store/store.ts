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
    value: string | number | boolean | listingDetails | listingLocation | []
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
      postalNumber: 0,
    },
    listingDetails: {
      listingName: '',
      description: '',
      beds: 0,
      bedRoom: 0,
      livingRoom: 0,
      wc: 0,
      amenities: [],
      isPet: false,
      maxPerson: 1,
    },
    price: 50,
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
  updateAmenities: (amenity) =>
    set((state) => {
      const currentAmenities = state.listingData.listingDetails.amenities;
      const updatedAmenities = currentAmenities.includes(amenity)
        ? currentAmenities.filter((a) => a !== amenity)
        : [...currentAmenities, amenity];
      return {
        listingData: {
          ...state.listingData,
          listingDetails: {
            ...state.listingData.listingDetails,
            amenities: updatedAmenities,
          },
        },
      };
    }),
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
