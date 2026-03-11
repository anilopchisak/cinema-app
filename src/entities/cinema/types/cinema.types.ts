import type { PaginationParams } from '@/shared/api/api.types';

export type FilmWithFavorite = Film & { isFavorite?: boolean };

export interface CinemaParams {
  rawParams: RawParams;
  apiParams: FilmParams;
}

/** Тип структуры параметров страницы с фильмами.
 * Синхронизируются с url.
 */
export type RawParams = {
  /** Поиск */
  search: string;
  /** Фильтр Жанр */
  category: string[];
  /** Сортировка */
  sort: string;
  /** Номер страницы - вычисляется в CinemaPage, не используется в запросе */
  page: number;
};

export interface FilmParams {
  sort?: 'asc' | 'desc';
  filters?: FilmFilters;
  pagination?: PaginationParams;
  populate?: string[];
}

export interface FilmFilters {
  title?: string;
  category?: string;
  releaseYear?: number;
  isFeatured?: boolean;
  minRating?: number;
  maxRating?: number;
  ageLimit?: number;
}

export interface Film {
  documentId: string;
  title: string;
  shortDescription?: string;
  releaseYear: number;
  duration: number;
  rating?: number;
  ageLimit?: number;
  trailerUrl?: string;
  description: string;
  poster: {
    url: string;
  };
  category?: {
    title: string;
  } | null;
  gallery?: any;
}
