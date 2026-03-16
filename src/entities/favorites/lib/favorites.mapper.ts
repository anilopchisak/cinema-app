import { TransformedData } from '@/shared/api/query/useGetAllInfinite';
import { FavoriteFilm } from '@/entities/favorites/types/favorites.types';
import { FilmWithFavorite } from '@/entities/cinema/types/cinema.types';

/**
 * Преобразует данные избранного в массив фильмов с флагом isFavorite = true.
 * Из каждого элемента избранного (содержащего film) извлекает объект фильма и добавляет поле isFavorite.
 * Если данные отсутствуют или items пуст, возвращает пустой массив.
 * @param data - результат запроса избранного (TransformedData<FavoriteFilm>)
 * @returns Массив FilmWithFavorite (фильмы с пометкой "в избранном")
 */
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
