import { useInfiniteQuery, UseInfiniteQueryOptions, type QueryKey } from '@tanstack/react-query';
import type { ApiService } from '../service/api-service.types';
import type { PaginationResponse, ResponseData } from '../api.types';
import { DEFAULT_PAGE_SIZE } from '@/shared/consts/api.consts';

export interface TransformedData<T> {
  items: T[];
  pagination: PaginationResponse | null;
}

interface InfiniteQueryProps<TEntity, TParams = unknown> {
  queryKey: QueryKey;
  service: ApiService<TEntity, TParams>;
  params: TParams;
  initialPageCount?: number;
  options?: Omit<
    UseInfiniteQueryOptions<ResponseData<TEntity[]>, Error, TransformedData<TEntity>>,
    'queryKey' | 'queryFn' | 'select' | 'getNextPageParam' | 'initialPageParam'
  >;
}

export const useGetAllInfinite = <TEntity, TParams = unknown>(
  config: InfiniteQueryProps<TEntity, TParams>
) => {
  const { queryKey, service, params, initialPageCount, options } = config;

  const query = useInfiniteQuery<ResponseData<TEntity[]>, Error, TransformedData<TEntity>>({
    queryKey: [...queryKey, params],
    queryFn: ({ signal, pageParam }) => {
      const isInitialLoad = pageParam === 1;

      const targetPageSize =
        isInitialLoad && initialPageCount
          ? DEFAULT_PAGE_SIZE * initialPageCount
          : DEFAULT_PAGE_SIZE;

      return service.getAll(signal, {
        ...params,
        pagination: {
          page: isInitialLoad ? 1 : pageParam,
          pageSize: targetPageSize,
          withCount: true,
        },
      });
    },
    enabled: options?.enabled ?? true,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetchedItems = allPages.reduce((acc, page) => {
        const items = Array.isArray(page?.data) ? page.data.length : 0;
        return acc + items;
      }, 0);

      const totalItems = lastPage?.meta?.pagination?.total ?? 0;

      if (!totalItems || totalFetchedItems >= totalItems) return undefined;

      return Math.floor(totalFetchedItems / DEFAULT_PAGE_SIZE) + 1;
    },
    select: (data) => {
      if (!data.pages.length) return { items: [], pagination: null };
      return {
        items: data.pages.flatMap((page) => page.data),
        pagination: data.pages[data.pages.length - 1].meta.pagination,
      };
    },
    ...options,
  });

  return query;
};
