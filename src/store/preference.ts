import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Category, CategoryType, Sorting, SortingType } from '../types';

type PreferenceState = {
  category: CategoryType;
  sorting: SortingType;

  setCategory: (category: CategoryType) => void;
  setSorting: (sorting: SortingType) => void;
};

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    set => ({
      category: Category.NOW_PLAYING,
      sorting: Sorting.ALPHABETICAL,

      setCategory: category => set({ category }),
      setSorting: sorting => set({ sorting }),
    }),
    {
      name: 'preference-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
