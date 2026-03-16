import type { PaginationParams } from '@/shared/api/api.types';

/** Тип фильма с дополнительным полем isFavorite для отображения в избранном */
export type FilmWithFavorite = Film & { isFavorite?: boolean };

/** Объединённый объект параметров для страницы фильмов,
 * содержащий как сырые параметры из URL, так и подготовленные для API */
export interface CinemaParams {
  rawParams: CinemaRawParams;
  apiParams: CinemaApiParams;
}

/** Параметры, которые парсятся напрямую из URL (search params) */
export interface CinemaRawParams {
  search?: string;
  category?: string[];
  sort?: string;
  page?: number;
  releaseYear?: string;
  isFeatured?: string;
  minRating?: string;
  maxRating?: string;
  ageLimit?: string;
  duration?: string;
}

/** Структура фильтров для запросов к Strapi API */
export interface FilmFilters {
  title?: { $containsi?: string };
  category?: { id?: { $in?: string[] } | { $eq?: string } };
  releaseYear?: { $eq?: number };
  isFeatured?: { $eq?: boolean };
  rating?: { $gte?: number; $lte?: number };
  ageLimit?: { $eq?: number };
  duration?: { $gte?: number };
  // Позволяет добавлять дополнительные поля при необходимости
  [key: string]: unknown;
}

/** Параметры запроса для получения фильмов (сортировка, фильтры, пагинация, поля и populate) */
export interface FilmParams {
  sort?: string;
  filters?: FilmFilters;
  pagination?: PaginationParams;
  fields?: string[];
  populate?: string[];
}

/** Алиас для FilmParams, используется как результат computeApiParams */
export type CinemaApiParams = FilmParams;

/** Изображение в галерее фильма */
export interface GalleryImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
  url: string;
}

/** Основная модель фильма */
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
  gallery?: GalleryImage[];
}
