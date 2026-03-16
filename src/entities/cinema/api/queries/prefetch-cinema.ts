import { dehydrate, QueryClient, InfiniteData } from '@tanstack/react-query';
import cinemaApi from '@/entities/cinema/api/cinema.api';
import { CINEMA_ENDPOINTS } from '@/entities/cinema/api/cinema.endpoints';
import { DEFAULT_PAGE_SIZE } from '@/shared/consts/api.consts';
import type { ResponseData } from '@/shared/api/api.types';
import { Film, FilmParams } from '@/entities/cinema/types/cinema.types';

/**
 * Предзагружает бесконечный список фильмов с возможностью задать начальное количество страниц.
 * Используется на сервере для гидратации состояния на клиенте.
 * @param params - параметры фильтрации (категория, сортировка, поиск, год и т.д.)
 * @param initialPageCount - количество страниц, которое нужно предзагрузить (по умолчанию 1)
 * @returns Dehydrated state для передачи в HydrationBoundary
 */
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
      // Вычисляем нужное количество элементов: если запрошено больше одной страницы,
      // увеличиваем pageSize, чтобы одним запросом получить все элементы сразу
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
