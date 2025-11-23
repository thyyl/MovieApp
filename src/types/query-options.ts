import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type AppQueryOptions<
  TData,
  TError = Error,
  TKey extends readonly unknown[] = readonly unknown[],
  TSelected = TData,
> = Omit<
  UseQueryOptions<TData, TError, TSelected, TKey>,
  'queryKey' | 'queryFn'
>;

export type AppInfiniteQueryOptions<
  TData,
  TError = Error,
  TKey extends readonly unknown[] = readonly unknown[],
  TSelected = TData,
  T = unknown,
> = Omit<
  UseInfiniteQueryOptions<TData, TError, TSelected, TKey, T>,
  | 'queryKey'
  | 'queryFn'
  | 'getNextPageParam'
  | 'getPreviousPageParam'
  | 'initialPageParam'
>;

export type AppInfiniteQueryDataResult<TData> = {
  pages: TData[];
  pageParams: unknown[];
};
