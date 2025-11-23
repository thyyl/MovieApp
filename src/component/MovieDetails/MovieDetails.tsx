import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme';
import { Movie } from '../../types';
import { MovieContent } from './MovieContent';
import { MovieOverview } from './MovieOverview';

interface Props {
  movie: Movie;
  onBackPress: () => void;
}

export const MovieDetails: FC<Props> = ({ movie, onBackPress }) => {
  return (
    <View style={styles.container}>
      <MovieOverview movie={movie} onBackPress={onBackPress} />
      <MovieContent movie={movie} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.primary,
  },
});
