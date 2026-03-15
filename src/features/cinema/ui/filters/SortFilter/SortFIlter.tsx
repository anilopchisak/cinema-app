'use client';

import { type Option } from '@/shared/ui/MultiDropdown';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import { useUpdateFilters } from '@/entities/cinema/hooks/useUpdateFilters';
import FilterDropdown from '@/shared/ui/FilterDropdown';
import { useMemo } from 'react';

interface CinemaFiltersProps {
  initSort: CinemaRawParams['sort'] | null;
}

const SORT: Option[] = [
  // Название
  { key: 'title:asc', value: 'По названию (А → Я)' },
  { key: 'title:desc', value: 'По названию (Я → А)' },

  // Рейтинг
  { key: 'rating:asc', value: 'По рейтингу (от низкого к высокому)' },
  { key: 'rating:desc', value: 'По рейтингу (от высокого к низкому)' },
];

const SortFilter = ({ initSort }: CinemaFiltersProps) => {
  const updateFilters = useUpdateFilters();

  const initialSelected = useMemo(() => {
    if (!initSort) return [];

    const option = SORT.find((o) => o.key === initSort);

    return option ? [option] : [];
  }, [initSort]);

  const handleChange = (selected: Option[]) => {
    const sortKey = selected[0]?.key ?? 'default';

    updateFilters({
      sort: sortKey,
    });
  };

  return (
    <FilterDropdown
      options={SORT}
      initialSelected={initialSelected}
      placeholder="Сортировка"
      onChangeFilter={handleChange}
    />
  );
};

export default SortFilter;
