import { create } from 'zustand';

interface SearchState {
  location: string;
  persons: number;
  setLocation: (location: string) => void;
  setPersons: (persons: number) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  location: '',
  persons: 0,
  setLocation: (location: string) => set({ location }),
  setPersons: (persons: number) => set({ persons }),
}));
