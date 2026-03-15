import { CinemaRawParams } from '../types/cinema.types';
import { computeApiParams } from './computeApiParams';

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
