import { useGetAll } from '@/shared/api/query/useGetAll';
import favoritesApi from '../favorites.api';
import { FAVORITES_ENDPOINTS } from '../favorites.endpoints';

const useFavoritesState = () => {
  const result = useGetAll({
    queryKey: [FAVORITES_ENDPOINTS.base],
    service: favoritesApi,
  });
  return result;
};

export default useFavoritesState;
