import { useEffect } from 'react';
import type { CinemaParams } from './useCinemaParams';
import { useUpdateQuery } from './useUpdateQueryString';

/**
 * Хук синхронизирует параметры фильтрации (CinemaParams) с URL query-строкой.
 * При каждом изменении params обновляет URL, используя replace,
 * чтобы не создавать лишних записей в истории.
 *
 * @param params - текущие параметры страницы (поиск, категории, сортировка, страница)
 * @param setSearchParams - функция из react-router для обновления query-параметров
 */
const useCinemaQueryString = (params: CinemaParams) => {
  const updateQuery = useUpdateQuery();
  useEffect(() => {
    console.log('Updating query string with params:', params);
    const newParams: Record<string, string | number | string[] | undefined> = {};
    if (params.search) {
      newParams.search = params.search;
    }
    if (params.category.length) {
      newParams.category = params.category.join(',');
    }
    if (params.sort && params.sort !== 'default') {
      newParams.sort = params.sort;
    }
    if (params.page > 1) {
      newParams.page = params.page.toString();
    }

    updateQuery(newParams);
  }, [params]);
};

export default useCinemaQueryString;
