import { TransformedData } from '@/shared/api/query/useGetAllInfinite';
import { FavoriteFilm } from '../types/favorites.types';
import { FilmWithFavorite } from '@/entities/cinema/types/cinema.types';

export const favoritesMapper = (
  data: TransformedData<FavoriteFilm> | undefined
): FilmWithFavorite[] => {
  return (
    data?.items?.map((item) => ({
      ...item.film,
      isFavorite: true,
    })) ?? []
  );
};
