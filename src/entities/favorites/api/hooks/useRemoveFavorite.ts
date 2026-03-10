import { useRemove } from '@/shared/api/query/useRemove';
import favoritesApi from '../favorites.api';
import { FAVORITES_ENDPOINTS } from '../favorites.endpoints';

const useRemoveFavorite = () => {
  return useRemove({
    service: favoritesApi,
    invalidateQueries: [FAVORITES_ENDPOINTS.base],
  });
};

export default useRemoveFavorite;
