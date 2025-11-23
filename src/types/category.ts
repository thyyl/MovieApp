export const Category = {
  NOW_PLAYING: 'NOW_PLAYING',
  UPCOMING: 'UPCOMING',
  POPULAR: 'POPULAR',
} as const;

export type CategoryType = (typeof Category)[keyof typeof Category];
