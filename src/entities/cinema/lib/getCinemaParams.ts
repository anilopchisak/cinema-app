import { CinemaRawParams } from '../types/cinema.types';
import { computeApiParams } from './computeApiParams';

export const getCinemaParams = (searchParams: { [key: string]: string | string[] | undefined }) => {
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';

  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'default';

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
    releaseYear: searchParams.releaseYear as string | undefined,
    isFeatured: searchParams.isFeatured as string | undefined,
    minRating: searchParams.minRating as string | undefined,
    maxRating: searchParams.maxRating as string | undefined,
    ageLimit: searchParams.ageLimit as string | undefined,
    duration: searchParams.duration as string | undefined,
  };

  const apiParams = computeApiParams({ search, sort, category: categories });

  return { rawParams, apiParams };
};
