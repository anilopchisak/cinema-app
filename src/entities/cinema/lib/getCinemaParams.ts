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

  const apiParams = computeApiParams({ search, sort, category: categories } as any);

  return { search, sort, category: categories, page, apiParams };
};
