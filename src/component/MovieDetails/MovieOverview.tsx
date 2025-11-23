import { ChevronLeft } from 'lucide-react-native';
import prettyMs from 'pretty-ms';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { Movie } from '../../types';
import { Text } from '../../ui';
import { MovieCertificationTag } from './MovieCertificationTag';

interface Props {
  movie: Movie;
  onBackPress: () => void;
}

export const MovieOverview: FC<Props> = ({ movie, onBackPress }) => {
  const {
    title,
    poster_path,
    genres,
    status,
    spoken_languages,
    runtime,
    release_dates: { results },
  } = movie;

  const singaporeCode = 'SG';
  const singaporeReleaseInfo = results.find(
    info => info.iso_3166_1 === singaporeCode,
  );
  const [initialReleaseDate] = singaporeReleaseInfo?.release_dates || [];

  const formattedReleaseDate = new Date(
    initialReleaseDate?.release_date,
  ).toLocaleDateString();
  const duration = prettyMs(runtime * 60 * 1000, {
    verbose: false,
    unitCount: 2,
    secondsDecimalDigits: 0,
  });
  const [_releaseDay, _releaseMonth, releaseYear] =
    formattedReleaseDate.split('/');

  const genreList = genres?.map(genre => genre.name).join(', ');
  const [originalLanguage] = spoken_languages;

  if (!singaporeReleaseInfo) {
    return (
      <Text
        text="Release information not available for Singapore"
        color="white"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.flexContainer}>
          <ChevronLeft color="white" onPress={onBackPress} />
        </View>

        <View style={styles.titleContainer}>
          <Text
            text={`${title} (${releaseYear})`}
            variant="heading"
            color="white"
          />
        </View>

        <View style={styles.flexContainer} />
      </View>

      <View style={styles.contentContainer}>
        <Image
          // TODO: CHANGE TO ENV  VARIABLE
          source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
          style={styles.imageContainer}
          resizeMode="contain"
        />

        <View style={styles.descriptionContainer}>
          {initialReleaseDate.certification && (
            <MovieCertificationTag
              certification={initialReleaseDate.certification}
            />
          )}
          <Text
            color="white"
            text={`${formattedReleaseDate} (${singaporeCode}) • ${duration}`}
          />
          <Text color="white" numberOfLines={1} text={genreList} />
          <Text color="white" variant="bold" text={`Status: ${status}`} />
          <Text
            color="white"
            variant="bold"
            text={`Original Language: ${originalLanguage.english_name}`}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.translucent,
    gap: spacing.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  flexContainer: { flex: 1 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  titleContainer: {
    flex: 8,
    alignItems: 'center',
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  imageContainer: {
    width: 95,
    height: '100%',
    borderRadius: spacing.xs,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xxs,
  },
});
