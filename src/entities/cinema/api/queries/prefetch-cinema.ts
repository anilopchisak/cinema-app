import { dehydrate, QueryClient, InfiniteData } from '@tanstack/react-query';
import cinemaApi from '../cinema.api';
import { CINEMA_ENDPOINTS } from '../cinema.endpoints';
import { DEFAULT_PAGE_SIZE } from '@/shared/consts/api.consts';
import type { ResponseData } from '@/shared/api/api.types';
import { Film, FilmParams } from '../../types/cinema.types';

export async function prefetchCinema(params?: FilmParams, initialPageCount = 1) {
  const queryClient = new QueryClient();
  const queryKey = [CINEMA_ENDPOINTS.cinema, params];

  await queryClient.prefetchInfiniteQuery<
    ResponseData<Film[]>,
    Error,
    InfiniteData<ResponseData<Film[]>, number>,
    typeof queryKey,
    number
  >({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ signal }) => {
      const targetPageSize =
        initialPageCount > 1 ? DEFAULT_PAGE_SIZE * initialPageCount : DEFAULT_PAGE_SIZE;

      return cinemaApi.getAll(signal!, {
        ...params,
        pagination: {
          page: 1,
          pageSize: targetPageSize,
          withCount: true,
        },
      });
    },
  });

  return dehydrate(queryClient);
}
