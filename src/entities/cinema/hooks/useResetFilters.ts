'use client';

import { useCallback } from 'react';
import { useUpdateQuery } from './useUpdateQueryString';

/** Хук для сброса всех фильтров в qs к значениям по умолчанию */
export const useResetFilters = () => {
  const updateQuery = useUpdateQuery();

  const resetFilters = useCallback(() => {
    updateQuery({
      category: undefined,
      sort: undefined,
      releaseYear: undefined,
      search: undefined,
    });
  }, [updateQuery]);

  return resetFilters;
};
