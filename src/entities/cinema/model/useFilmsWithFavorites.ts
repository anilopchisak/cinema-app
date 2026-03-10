import { useMemo } from 'react';
import type { Film, FilmWithFavorite } from '@/entities/cinema/cinema.types';
import type { TransformedData } from '@/shared/api/query/useGetAllInfinite';
import type { FavoriteFilm } from '@/entities/favorites/types/favorites.types';

interface UseFilmsWithFavoritesProps {
  films?: TransformedData<Film>;
  favorites?: TransformedData<FavoriteFilm>;
  isAuthenticated: boolean;
}

/** Хук объединяет данные всех фильмов с состоянием Избранное */
const useFilmsWithFavorites = ({
  films,
  favorites,
  isAuthenticated,
}: UseFilmsWithFavoritesProps) => {
  return useMemo<FilmWithFavorite[]>(() => {
    if (!films?.items) return [];
    if (!isAuthenticated) return films?.items;

    const favoriteIds = new Set(
      favorites?.items?.map((fav: any) => fav.film?.documentId ?? fav.originalFilmId) ?? []
    );

    return films.items.map((film) => ({
      ...film,
      isFavorite: favoriteIds.has(film.documentId),
    }));
  }, [films, favorites, isAuthenticated]);
};

export default useFilmsWithFavorites;
