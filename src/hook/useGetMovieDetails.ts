import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { MOVIE_DETAILS_QK, MovieDetailsUrl } from '../constant';
import { apiClient } from '../provider';
import { AppQueryOptions, Movie } from '../types';

interface Props
  extends AppQueryOptions<Movie, Error, ReturnType<typeof MOVIE_DETAILS_QK>> {
  params: number;
}

export const useGetMovieDetails = ({
  params,
  ...options
}: Props): UseQueryResult<Movie, Error> => {
  const getMovieDetails = async (): Promise<Movie> => {
    const response = await apiClient.get<Movie>(MovieDetailsUrl(params));
    return response;
  };

  return useQuery<Movie, Error>({
    queryKey: MOVIE_DETAILS_QK(params),
    queryFn: () => getMovieDetails(),
    ...options,
  });
};
