import { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { spacing } from '../../theme';
import { Movie } from '../../types';
import { Card, Text } from '../../ui';

interface Props {
  movie: Movie;
  onClick: (id: number) => void;
}

export const MovieCard: FC<Props> = ({ movie, onClick }) => {
  const { title, poster_path, release_date, overview, id } = movie;

  return (
    <TouchableOpacity onPress={() => onClick(id)}>
      <Card
        verticalAlignment="center"
        style={styles.container}
        LeftComponent={
          <Image
            // TODO: CHANGE TO ENV  VARIABLE
            source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
            style={styles.image}
            resizeMode="contain"
          />
        }
        alignmentWrapperStyle={styles.wrapper}
        HeadingComponent={
          <View>
            <Text text={title} variant="title" />
            <Text text={release_date} variant="subtitle" />
          </View>
        }
        ContentComponent={<Text text={overview} numberOfLines={2} />}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  wrapper: {
    display: 'flex',
    gap: spacing.md,
  },
  image: {
    width: 95,
    height: '100%',
    borderTopLeftRadius: spacing.xs,
    borderBottomLeftRadius: spacing.xs,
  },
});
