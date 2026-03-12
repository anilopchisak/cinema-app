import type { PaginationParams } from '@/shared/api/api.types';

export type FilmWithFavorite = Film & { isFavorite?: boolean };

export interface CinemaParams {
  rawParams: CinemaRawParams;
  apiParams: CinemaApiParams;
}

// Параметры, которые мы парсим из URL (search params)
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

// Структура фильтров для API (Strapi)
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

export interface FilmParams {
  sort?: string;
  filters?: FilmFilters;
  pagination?: PaginationParams;
  populate?: string[];
}

// Так как computeApiParams возвращает FilmParams, CinemaApiParams является его алиасом
export type CinemaApiParams = FilmParams;

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
  gallery?: unknown;
}
