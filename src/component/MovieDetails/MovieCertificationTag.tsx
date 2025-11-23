import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { Text } from '../../ui';

interface Props {
  certification: string;
}

export const MovieCertificationTag: FC<Props> = ({ certification }) => {
  return (
    <View style={styles.tagContainer}>
      <Text color="white" text={certification} />
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    borderWidth: 1,
    borderColor: colors.palette.neutral500,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxxs,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});
