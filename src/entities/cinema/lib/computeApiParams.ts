import { CinemaRawParams, FilmParams, FilmFilters } from '@/entities/cinema/types/cinema.types';

type FilterBuilder = (val: string | string[]) => FilmFilters;

/** Словарь для преобразования параметров фильтрации к формату параметров запроса */
const FILTER_MAP: Record<string, FilterBuilder> = {
  search: (val) => ({ title: { $containsi: Array.isArray(val) ? val[0] : String(val) } }),
  category: (val) => ({ category: { id: Array.isArray(val) ? { $in: val } : { $eq: val } } }),
  releaseYear: (val) => ({ releaseYear: { $eq: Number(val) } }),
  isFeatured: (val) => ({ isFeatured: { $eq: val === 'true' } }),
  minRating: (val) => ({ rating: { $gte: Number(val) } }),
  maxRating: (val) => ({ rating: { $lte: Number(val) } }),
  ageLimit: (val) => ({ ageLimit: { $eq: Number(val) } }),
  duration: (val) => ({ duration: { $gte: Number(val) } }),
};

/** Функция для преобразования параметра сортировки к формату параметра запроса */
const SORT_RULE = (val: string): string | undefined => {
  if (val === 'default' || val === '') {
    return undefined;
  }
  return val;
};

/** Вычисляет параметры для API на основе текущих params. */
export const computeApiParams = (params: CinemaRawParams): FilmParams => {
  const filters: FilmFilters = {};

  // Применяем фильтры
  Object.entries(FILTER_MAP).forEach(([key, builder]) => {
    const value = params[key as keyof CinemaRawParams];
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
      return;
    }
    Object.assign(filters, builder(value as string | string[]));
  });

  // Сортировка
  const sort = SORT_RULE(params?.sort ?? '');

  return {
    filters,
    ...(sort && { sort }),
    populate: ['poster', 'category', 'gallery'],
  };
};
