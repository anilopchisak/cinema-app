import { useCallback, useMemo, useState } from 'react';
import { computeApiParams } from '../lib/computeApiParams';
import { getCinemaParams } from '../lib/getCinemaParams';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

/** Тип структуры параметров страницы с фильмами.
 * Синхронизируются с url.
 */
export type CinemaParams = {
  /** Поиск */
  search: string;
  /** Фильтр Жанр */
  category: string[];
  /** Сортировка */
  sort: string;
  /** Номер страницы - вычисляется в CinemaPage, не используется в запросе */
  page: number;
};

/**
 * Хук useCinemaParams управляет параметрами фильтрации и пагинации для страницы со списком фильмов.
 *
 * @param searchParams - объект URLSearchParams из react-router, содержащий текущие query-параметры.
 * @returns Объект с:
 *  - params: текущие параметры (CinemaParams)
 *  - setSearch, setCategory, setSort, setPage: функции для обновления отдельных полей (сбрасывают page на 1 при изменении фильтров)
 *  - apiParams: объект, подготовленный для отправки в API (фильтры, сортировка, populate)
 */
export const useCinemaParams = (initialParams: ReturnType<typeof getCinemaParams>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [params, setParams] = useState<CinemaParams>(() => initialParams);

  const setSearch = useCallback((search: string) => {
    setParams((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const setCategory = useCallback((category: string[]) => {
    setParams((prev) => ({ ...prev, category, page: 1 }));
  }, []);

  const setSort = useCallback((sort: string) => {
    setParams((prev) => ({ ...prev, sort, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  /** Вычисление параметров для API на основе текущих params. */
  const apiParams = useMemo(() => computeApiParams(params), [params]);

  return {
    params,
    setSearch,
    setCategory,
    setSort,
    setPage,
    apiParams,
  };
};
