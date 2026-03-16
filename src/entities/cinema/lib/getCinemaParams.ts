import { CinemaRawParams } from '../types/cinema.types';
import { computeApiParams } from './computeApiParams';

/**
 * Преобразует searchParams из URL в структурированные параметры для UI (rawParams) и для API (apiParams).
 * @param searchParams - объект параметров запроса из Next.js (может содержать строки или массивы)
 * @returns Объект с rawParams (для UI/путей) и apiParams (для API-запросов)
 */
export const getCinemaParams = (searchParams: { [key: string]: string | string[] | undefined }) => {
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';

  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'default';

  const releaseYear = typeof searchParams.releaseYear === 'string' ? searchParams.releaseYear : '';

  const ageLimit = typeof searchParams.ageLimit === 'string' ? searchParams.ageLimit : '';
  const duration = typeof searchParams.duration === 'string' ? searchParams.duration : '';

  const categoryStr = Array.isArray(searchParams.category)
    ? searchParams.category.join(',')
    : (searchParams.category as string) || '';
  const categories = categoryStr
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);

  const page = parseInt((searchParams.page as string) || '1', 10);

  /** Параметры для использования в UI и построения канонических ссылок */
  const rawParams: CinemaRawParams = {
    search,
    sort,
    category: categories.length > 0 ? categories : undefined,
    page,
    releaseYear: releaseYear,
    minRating: searchParams.minRating as string | undefined,
    maxRating: searchParams.maxRating as string | undefined,
    ageLimit: ageLimit,
    duration: duration,
  };

  /** Параметры, подготовленные для API-запросов (фильтрация, сортировка) */
  const apiParams = computeApiParams({
    search,
    sort,
    releaseYear,
    ageLimit,
    duration,
    category: categories,
  });

  return { rawParams, apiParams };
};
