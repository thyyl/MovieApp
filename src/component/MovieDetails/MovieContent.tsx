import { Bookmark } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { Movie } from '../../types';
import { Button, Text } from '../../ui';
import { MovieUserScore } from './MovieUserScore';

interface Props {
  movie: Movie;
}

export const MovieContent = ({ movie }: Props) => {
  const {
    vote_average,
    credits: { crew },
    tagline,
    overview,
  } = movie;

  const director = crew.find(member => member.job === 'Director');
  const [writer] = crew.filter(member =>
    ['Writer', 'Screenplay', 'Author', 'Novel'].includes(member.job),
  );

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.columnContainer}>
          <MovieUserScore userScore={vote_average} />
        </View>

        <View style={styles.columnContainer}>
          <Text text={director?.name} color="white" variant="title" />
          <Text text={director?.job} color="white" variant="title" />
        </View>
      </View>

      {tagline && <Text text={tagline} color="white" italic variant="title" />}

      <View style={styles.overviewContainer}>
        <Text text="Overview" color="white" variant="heading" />
        <Text text={overview} color="white" variant="title" />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text="Add To Watchlist"
          size="sm"
          style={styles.button}
          IconLeft={() => <Bookmark size={22} color="white" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  detailsContainer: {},
  columnContainer: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  overviewContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
  button: {
    borderColor: colors.palette.white,
    borderWidth: 1,
    paddingVertical: spacing.xs,
    minHeight: 0,
  },
});
