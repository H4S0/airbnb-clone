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
  isAccepted: boolean;
  isDeclined: boolean;
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
    adults: 1,
    kids: 0,
    listingId: 0,
    isAccepted: false,
    isDeclined: false,
  },
  updateApplication: (field, value) =>
    set((state) => ({
      applicationData: {
        ...state.applicationData,
        [field]: value,
      },
    })),
}));
