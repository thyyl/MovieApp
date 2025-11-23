import { Sorting, SortingType } from '../types';

export const SortingTranslations: Record<SortingType, string> = {
  [Sorting.ALPHABETICAL]: 'By alphabetical order',
  [Sorting.RATING]: 'By rating',
  [Sorting.RELEASE_DATE]: 'By release date',
};
