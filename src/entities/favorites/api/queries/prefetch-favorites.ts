import { dehydrate, QueryClient } from '@tanstack/react-query';
import { FAVORITES_ENDPOINTS } from '@/entities/favorites/api/favorites.endpoints';
import favoritesApi from '@/entities/favorites/api/favorites.api';
import { ResponseData } from '@/shared/api/api.types';
import { FavoriteFilm } from '@/entities/favorites/types/favorites.types';

/**
 * Предзагружает список избранного на сервере.
 * Используется для гидратации состояния на клиенте.
 * @returns Dehydrated state для передачи в HydrationBoundary
 */
export async function prefetchFavorites() {
  const queryClient = new QueryClient();
  const queryKey = [FAVORITES_ENDPOINTS.base];

  await queryClient.prefetchQuery<ResponseData<FavoriteFilm[]>>({
    queryKey,
    queryFn: async ({ signal }) => {
      return favoritesApi.getAll(signal!);
    },
  });

  return dehydrate(queryClient);
}
