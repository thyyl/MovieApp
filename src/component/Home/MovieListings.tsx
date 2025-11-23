import { FC } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { Movie } from '../../types';
import { Button, Text } from '../../ui';
import { MovieCard } from './MovieCard';

interface Props {
  movies: Movie[];
  loadingMore?: boolean;
  onMovieClick: (id: number) => void;
  onLoadMore?: () => void;
}

export const MovieListings: FC<Props> = ({
  movies,
  loadingMore,
  onMovieClick,
  onLoadMore,
}) => {
  const renderFooter = () => {
    if (loadingMore) return <ActivityIndicator />;
    if (onLoadMore)
      return (
        <Button
          text="Load More"
          variant="primary"
          rounded="full"
          onPress={onLoadMore}
        />
      );
    return null;
  };

  if (movies.length === 0) {
    return <Text text="No movies available" />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      data={movies}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard movie={item} onClick={onMovieClick} />
      )}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
});
