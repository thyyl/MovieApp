import { QueryKey } from '@tanstack/react-query';
import { CategoryType, SortingType } from '../types';

export const MOVIE_QK: QueryKey = ['MOVIE'];
export const MOVIE_LISTINGS_QK = (
  category: CategoryType,
  sorting: SortingType,
): QueryKey => [...MOVIE_QK, 'LISTINGS', category, sorting];
export const MOVIE_DETAILS_QK = (id: number): QueryKey => [
  ...MOVIE_QK,
  'DETAILS',
  id,
];
