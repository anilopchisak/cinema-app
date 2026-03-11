import { dehydrate, QueryClient } from '@tanstack/react-query';
import { FAVORITES_ENDPOINTS } from '../favorites.endpoints';
import favoritesApi from '../favorites.api';
import { ResponseData } from '@/shared/api/api.types';
import { FavoriteFilm } from '../../types/favorites.types';

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
