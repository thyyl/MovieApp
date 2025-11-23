import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePreferenceStore } from '../../store';
import { spacing } from '../../theme';
import { CategoryTranslations, SortingTranslations } from '../../translation';
import {
  Category,
  CategoryType,
  DropdownOption,
  Sorting,
  SortingType,
} from '../../types';
import { Button, Dropdown, TextField } from '../../ui';

interface Props {
  search: string;
  onChangeSearch: (val: string) => void;
}

export const MovieFilters: FC<Props> = props => {
  const { search, onChangeSearch } = props;

  // ============================================================================
  // VARIABLES
  // ============================================================================
  const categoryOptions: DropdownOption<CategoryType>[] = [
    {
      label: CategoryTranslations[Category.NOW_PLAYING],
      value: Category.NOW_PLAYING,
    },
    {
      label: CategoryTranslations[Category.UPCOMING],
      value: Category.UPCOMING,
    },
    { label: CategoryTranslations[Category.POPULAR], value: Category.POPULAR },
  ];

  const sortingOptions: DropdownOption<SortingType>[] = [
    {
      label: SortingTranslations[Sorting.ALPHABETICAL],
      value: Sorting.ALPHABETICAL,
    },
    {
      label: SortingTranslations[Sorting.RELEASE_DATE],
      value: Sorting.RELEASE_DATE,
    },
    { label: SortingTranslations[Sorting.RATING], value: Sorting.RATING },
  ];

  // ============================================================================
  // HOOKS
  // ============================================================================
  const category = usePreferenceStore(state => state.category);
  const sorting = usePreferenceStore(state => state.sorting);
  const setCategory = usePreferenceStore(state => state.setCategory);
  const setSorting = usePreferenceStore(state => state.setSorting);

  // ============================================================================
  // VIEWS
  // ============================================================================
  return (
    <View style={styles.container}>
      <Dropdown
        options={categoryOptions}
        value={category}
        onValueChange={setCategory}
      />

      <Dropdown
        options={sortingOptions}
        value={sorting}
        onValueChange={setSorting}
      />

      <TextField
        placeholder="Search..."
        value={search}
        onChangeText={onChangeSearch}
      />

      <Button text="Search" disabled={!search} rounded="full" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
});
