import { useGetAll } from '@/shared/api/query/useGetAll';
import favoritesApi from '../favorites.api';
import { FAVORITES_ENDPOINTS } from '../favorites.endpoints';
import { FilmParams } from '@/entities/cinema/types/cinema.types';
import { FavoriteFilm } from '../../types/favorites.types';

interface FavoriteState {
  isAuthenticated: boolean;
}

const useFavoritesState = ({ isAuthenticated }: FavoriteState) => {
  const result = useGetAll<FavoriteFilm, FilmParams>({
    queryKey: [FAVORITES_ENDPOINTS.base],
    service: favoritesApi,
    options: {
      enabled: isAuthenticated,
    },
  });
  return result;
};

export default useFavoritesState;
