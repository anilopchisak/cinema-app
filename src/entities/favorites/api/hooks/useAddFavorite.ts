import { useCreate } from '@/shared/api/query/useCreate';
import favoritesApi from '../favorites.api';
import { FAVORITES_ENDPOINTS } from '../favorites.endpoints';

const useAddFavorite = () => {
  return useCreate({
    service: favoritesApi,
    invalidateQueries: [FAVORITES_ENDPOINTS.base],
  });
};

export default useAddFavorite;
