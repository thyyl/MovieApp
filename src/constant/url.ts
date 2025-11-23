import { SortingType } from '../types';

export const GeneralMovieListingsUrl = (
  page: number = 1,
  sorting: SortingType,
  minDate: string,
  maxDate: string,
) =>
  `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sorting}&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}&region=SG`;

export const PopularMovieListingsUrl = (
  page: number = 1,
  sorting: SortingType,
) =>
  `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sorting}&page=${page}&region=SG`;

export const MovieDetailsUrl = (id: number) =>
  `/movie/${id}?language=en-US&region=SG&append_to_response=release_dates,credits`;
