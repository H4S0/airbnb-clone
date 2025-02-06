import { create } from 'zustand';

export interface applicationDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateRange: {
    from: string;
    to: string;
  };
  adults: number;
  kids: number;
  listingId: number;
}

interface applicationStore {
  applicationData: applicationDetails;
  updateApplication: (
    key: keyof applicationDetails,
    value: string | number
  ) => void;
}

export const useApplicationStore = create<applicationStore>((set) => ({
  applicationData: {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateRange: {
      from: '',
      to: '',
    },
    adults: 0,
    kids: 0,
    listingId: 0,
  },
  updateApplication: (field, value) =>
    set((state) => ({
      applicationData: {
        ...state.applicationData,
        [field]: value,
      },
    })),
}));
