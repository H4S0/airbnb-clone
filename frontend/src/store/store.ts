import { listingData, listingDetails } from '@/hooks/useListing';
import { create } from 'zustand';
interface ListingStore {
  listingData: listingData;
  updateListing: (
    key: keyof listingData,
    value: string | number | listingDetails
  ) => void;
  updateDetails: (key: keyof listingDetails, value: string | number) => void;
}

export const useListingStore = create<ListingStore>((set) => ({
  listingData: {
    category: '',
    location: '',
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
}));
