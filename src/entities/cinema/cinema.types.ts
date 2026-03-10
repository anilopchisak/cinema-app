import type { PaginationParams } from '@/shared/api/api.types';

export type FilmWithFavorite = Film & { isFavorite?: boolean };

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
