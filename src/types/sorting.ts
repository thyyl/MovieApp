export const Sorting = {
  ALPHABETICAL: 'title.asc',
  RATING: 'vote_average.desc',
  RELEASE_DATE: 'primary_release_date.desc',
} as const;

export type SortingType = (typeof Sorting)[keyof typeof Sorting];
