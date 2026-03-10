import { useGetAll } from '@/shared/api/query/useGetAll';
import favoritesApi from '../favorites.api';
import { FAVORITES_ENDPOINTS } from '../favorites.endpoints';

interface FavoriteState {
  isAuthenticated: boolean;
}

const useFavoritesState = ({ isAuthenticated }: FavoriteState) => {
  const result = useGetAll({
    queryKey: [FAVORITES_ENDPOINTS.base],
    service: favoritesApi,
    options: {
      enabled: isAuthenticated,
    },
  });
  return result;
};

export default useFavoritesState;
