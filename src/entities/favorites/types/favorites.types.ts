import type { Film } from '@/entities/cinema/types/cinema.types';

export interface FavoritesRequestData {
  film: number | string;
}

export type FavoriteFilm = {
  film: Film;
};
