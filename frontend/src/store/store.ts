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
    value: string | number | listingDetails | listingLocation | []
  ) => void;
  updateDetails: (key: keyof listingDetails, value: string | number) => void;
  updateLocation: (key: keyof listingLocation, value: string | number) => void;
  uploadImages: (files: File[]) => void;
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
      beds: 0,
      bedRoom: 0,
      livingRoom: 0,
      wc: 0,
      amenities: [],
    },
    price: 0,
    images: [],
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
  uploadImages: (files) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        images: [...state.listingData.images, ...files],
      },
    })),
}));
