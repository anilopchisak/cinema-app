import { useCallback, useMemo } from 'react';
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

  // Вычисляем текущие параметры напрямую из URL без useState
  const params = useMemo(() => {
    return initialParams;
  }, [initialParams]);

  const updateUrl = useCallback(
    (newParams: Partial<CinemaParams>) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (key === 'category' && Array.isArray(value)) {
          if (value.length) {
            nextParams.set(key, value.join(','));
          } else {
            nextParams.delete(key);
          }
        } else if (value) {
          nextParams.set(key, value.toString());
        } else {
          nextParams.delete(key);
        }
      });

      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const setSearch = useCallback(
    (search: string) => {
      updateUrl({ search, page: 1 });
    },
    [updateUrl]
  );

  const setCategory = useCallback(
    (category: string[]) => {
      updateUrl({ category, page: 1 });
    },
    [updateUrl]
  );

  const setSort = useCallback(
    (sort: string) => {
      updateUrl({ sort, page: 1 });
    },
    [updateUrl]
  );

  const setPage = useCallback(
    (page: number) => {
      updateUrl({ page });
    },
    [updateUrl]
  );

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
