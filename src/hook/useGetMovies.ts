import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { addDays, addMonths, format } from 'date-fns';
import {
  GeneralMovieListingsUrl,
  MOVIE_LISTINGS_QK,
  PopularMovieListingsUrl,
} from '../constant';
import { apiClient } from '../provider';
import {
  AppInfiniteQueryOptions,
  Category,
  CategoryType,
  MovieListingsResponse,
  SortingType,
} from '../types';

interface GetMovieQueryParams {
  category: CategoryType;
  sorting: SortingType;
}

interface Props
  extends AppInfiniteQueryOptions<
    MovieListingsResponse,
    Error,
    ReturnType<typeof MOVIE_LISTINGS_QK>,
    InfiniteData<MovieListingsResponse>,
    number
  > {
  params: GetMovieQueryParams;
}

export const useGetMovies = ({
  params,
  ...options
}: Props): UseInfiniteQueryResult<
  InfiniteData<MovieListingsResponse>,
  Error
> => {
  const { category, sorting } = params;

  const getNowPlayingMovies = async (
    page: number,
  ): Promise<MovieListingsResponse> => {
    const today = new Date();
    const nextMonth = addDays(today, 5);
    const minDate = format(today, 'yyyy-MM-dd');
    const maxDate = format(nextMonth, 'yyyy-MM-dd');

    const response = await apiClient.get<MovieListingsResponse>(
      GeneralMovieListingsUrl(page, sorting, minDate, maxDate),
    );
    return response;
  };

  const getPopularMovies = async (
    page: number,
  ): Promise<MovieListingsResponse> => {
    const response = await apiClient.get<MovieListingsResponse>(
      PopularMovieListingsUrl(page, sorting),
    );
    return response;
  };

  const getUpcomingMovies = async (
    page: number,
  ): Promise<MovieListingsResponse> => {
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    const nextNextMonth = addMonths(nextMonth, 1);
    const minDate = format(nextMonth, 'yyyy-MM-dd');
    const maxDate = format(nextNextMonth, 'yyyy-MM-dd');

    const response = await apiClient.get<MovieListingsResponse>(
      GeneralMovieListingsUrl(page, sorting, minDate, maxDate),
    );
    return response;
  };

  return useInfiniteQuery<
    MovieListingsResponse,
    Error,
    InfiniteData<MovieListingsResponse>,
    ReturnType<typeof MOVIE_LISTINGS_QK>,
    number
  >({
    queryKey: MOVIE_LISTINGS_QK(category, sorting),
    queryFn: ({ pageParam = 1 }) => {
      switch (category) {
        case Category.NOW_PLAYING:
          return getNowPlayingMovies(pageParam);
        case Category.POPULAR:
          return getPopularMovies(pageParam);
        case Category.UPCOMING:
        default:
          return getUpcomingMovies(pageParam);
      }
    },
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    ...options,
  });
};
