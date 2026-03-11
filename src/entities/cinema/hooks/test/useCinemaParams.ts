import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { computeApiParams } from '../../lib/computeApiParams';

export const useCinemaParams = () => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? Number(pageParam) || 1 : 1;
    const sort = searchParams.get('sort') ?? '';
    const search = searchParams.get('search') ?? '';

    const categoryStr = searchParams.get('category') ?? '';
    const category = categoryStr
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const apiParams = computeApiParams({ sort, search, category });

    return {
      rawParams: { page, sort, search, category },
      apiParams,
    };
  }, [searchParams]);
};

export default useCinemaParams;
