import { DEFAULT_PAGE_SIZE } from '@/shared/consts/api.consts';
import { useEffect } from 'react';
import { useUpdateQuery } from './useUpdateQueryString';

type UseSyncCinemaPageParams = {
  data: { items: unknown[] } | undefined;
  currentPage: number;
};

/** Вычисление текущей страницы - используется для хранения в url */
const useSyncCinemaPage = ({ data, currentPage }: UseSyncCinemaPageParams) => {
  const updateQuery = useUpdateQuery();

  useEffect(() => {
    if (!data) return;

    const totalFetched = data.items.length;
    const calculatedPage = Math.ceil(totalFetched / DEFAULT_PAGE_SIZE);

    if (calculatedPage > currentPage) {
      updateQuery({ page: calculatedPage });
    }
  }, [data, currentPage, updateQuery]);
};

export default useSyncCinemaPage;
