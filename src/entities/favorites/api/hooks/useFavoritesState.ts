import { useGetAll } from '@/shared/api/query/useGetAll';
import favoritesApi from '@/entities/favorites/api/favorites.api';
import { FAVORITES_ENDPOINTS } from '@/entities/favorites/api/favorites.endpoints';
import { FilmParams } from '@/entities/cinema/types/cinema.types';
import { FavoriteFilm } from '@/entities/favorites/types/favorites.types';

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
