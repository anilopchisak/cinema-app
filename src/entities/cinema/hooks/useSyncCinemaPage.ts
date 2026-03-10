import { DEFAULT_PAGE_SIZE } from '@/shared/consts/api.consts';
import { useEffect } from 'react';

type UseSyncCinemaPageParams = {
  data: { items: unknown[] } | undefined;
  currentPage: number;
  setPage: (page: number) => void;
};

/** Вычисление текущей страницы - используется для хранения в url */
const useSyncCinemaPage = ({ data, currentPage, setPage }: UseSyncCinemaPageParams) => {
  useEffect(() => {
    if (!data) return;

    const totalFetched = data.items.length;
    const calculatedPage = Math.ceil(totalFetched / DEFAULT_PAGE_SIZE);

    if (calculatedPage > currentPage) {
      setPage(calculatedPage);
    }
  }, [data, currentPage, setPage]);
};

export default useSyncCinemaPage;
