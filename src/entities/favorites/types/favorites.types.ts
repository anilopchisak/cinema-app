import type { Film } from '@/entities/cinema/types/cinema.types';

/** Данные, отправляемые при добавлении фильма в избранное */
export interface FavoritesRequestData {
  film: number | string;
}

/** Модель элемента избранного, возвращаемая API */
export type FavoriteFilm = {
  /** Объект фильма с полной информацией */
  film: Film;
  /** Оригинальный ID фильма (может отличаться от film.documentId в зависимости от бэкенда) */
  originalFilmId: number | string;
};
