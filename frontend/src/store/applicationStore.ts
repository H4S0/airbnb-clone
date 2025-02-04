import { create } from 'zustand';

interface applicationDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateRange: {
    from: string;
    to: string;
  };
  adults: number;
  kids: number;
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
  },
  updateApplication: (key, value) =>
    set((state) => ({
      applicationData: {
        ...state.applicationData,
        [key]: value,
      },
    })),
}));
