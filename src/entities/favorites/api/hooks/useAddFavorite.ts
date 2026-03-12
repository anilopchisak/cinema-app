import { useCreate } from '@/shared/api/query/useCreate';
import favoritesApi from '@/entities/favorites/api/favorites.api';
import { FAVORITES_ENDPOINTS } from '@/entities/favorites/api/favorites.endpoints';

const useAddFavorite = () => {
  return useCreate({
    service: favoritesApi,
    invalidateQueries: [FAVORITES_ENDPOINTS.base],
  });
};

export default useAddFavorite;
