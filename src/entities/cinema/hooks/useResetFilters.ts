'use client';

import { useCallback } from 'react';
import { useUpdateQuery } from './useUpdateQueryString';

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
