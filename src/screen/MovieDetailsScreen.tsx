import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import { MovieDetails } from '../component';
import { useGetMovieDetails } from '../hook';
import { HomeStackParamList } from '../navigator';
import { Screen } from '../ui';

type MovieDetailsScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'MovieDetails'
>;

type MovieDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  'MovieDetails'
>;

interface Props {
  route: MovieDetailsScreenRouteProp;
}

export const MovieDetailsScreen: FC<Props> = ({ route }) => {
  const { id } = route.params;

  const { goBack } = useNavigation<MovieDetailsScreenNavigationProp>();
  const { data, isLoading } = useGetMovieDetails({ params: id });

  return (
    <Screen preset="scroll" safeAreaEdges={['top']}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MovieDetails movie={data!} onBackPress={goBack} />
      )}
    </Screen>
  );
};
