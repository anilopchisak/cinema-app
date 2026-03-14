import { useCallback } from 'react';
import { useUpdateQuery } from './useUpdateQueryString';

export const useUpdateFilters = () => {
  const updateQuery = useUpdateQuery();

  const updateFilters = useCallback(
    (updates: Record<string, string | number | string[] | undefined>) => {
      updateQuery({ ...updates, page: undefined });
    },
    [updateQuery]
  );

  return updateFilters;
};
