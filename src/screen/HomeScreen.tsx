import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { MovieFilters, MovieListings } from '../component';
import { useGetMovies } from '../hook';
import { HomeStackParamList } from '../navigator';
import { usePreferenceStore } from '../store';
import { Screen } from '../ui';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

export const HomeScreen = () => {
  // ============================================================================
  // STATES
  // ============================================================================
  const [search, setSearch] = useState<string>('');

  // ============================================================================
  // HOOKS
  // ============================================================================
  const category = usePreferenceStore(state => state.category);
  const sorting = usePreferenceStore(state => state.sorting);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMovies({ params: { category, sorting } });
  const { navigate } = useNavigation<HomeScreenNavigationProp>();

  const movies = data?.pages.flatMap(page => page.results) || [];

  // ============================================================================
  // HANDLERS
  // ============================================================================
  const handleOnMovieClick = (id: number) => navigate('MovieDetails', { id });

  // ============================================================================
  // VIEWS
  // ============================================================================
  return (
    <Screen preset="scroll" safeAreaEdges={['top']}>
      <MovieFilters search={search} onChangeSearch={setSearch} />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MovieListings
          movies={movies}
          loadingMore={isFetchingNextPage}
          onMovieClick={handleOnMovieClick}
          onLoadMore={hasNextPage ? fetchNextPage : undefined}
        />
      )}
    </Screen>
  );
};
