import { dehydrate, QueryClient } from '@tanstack/react-query';
import cinemaApi from '../cinema.api';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';
import { DEFAULT_PAGE_SIZE } from '@/shared/consts/api.consts';
import type { ResponseData } from '@/shared/api/api.types';
import { Film } from '../../cinema.types';

export async function prefetchCinema(params?: any, initialPageCount = 1) {
  const queryClient = new QueryClient();
  const queryKey = [CINEMA_ENDPOINTS.cinema, params];

  await queryClient.prefetchInfiniteQuery<
    ResponseData<Film[]>,
    Error,
    ResponseData<Film[]>,
    any[],
    number
  >({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ signal, pageParam }) => {
      const isInitialLoad = pageParam === 1;

      const targetPageSize =
        isInitialLoad && initialPageCount
          ? DEFAULT_PAGE_SIZE * initialPageCount
          : DEFAULT_PAGE_SIZE;

      return cinemaApi.getAll(signal!, {
        ...params,
        pagination: {
          page: isInitialLoad ? 1 : pageParam,
          pageSize: targetPageSize,
          withCount: true,
        },
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetchedItems = allPages.reduce((acc, page) => {
        const items = Array.isArray(page?.data) ? page.data.length : 0;
        return acc + items;
      }, 0);

      const totalItems = lastPage?.meta?.pagination?.total ?? 0;

      if (!totalItems || totalFetchedItems >= totalItems) return undefined;

      return Math.floor(totalFetchedItems / DEFAULT_PAGE_SIZE) + 1;
    },
  });

  return dehydrate(queryClient);
}
