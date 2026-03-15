'use client';

import { type Option } from '@/shared/ui/MultiDropdown';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import { useUpdateFilters } from '@/entities/cinema/hooks/useUpdateFilters';
import FilterDropdown from '@/shared/ui/FilterDropdown';

interface CinemaFiltersProps {
  initSort: CinemaRawParams['sort'] | null;
}

const SORT: Option[] = [
  { key: 'default', value: 'По умолчанию' },

  // Название
  { key: 'title:asc', value: 'По названию (А → Я)' },
  { key: 'title:desc', value: 'По названию (Я → А)' },

  // Рейтинг
  { key: 'rating:asc', value: 'По рейтингу (от низкого к высокому)' },
  { key: 'rating:desc', value: 'По рейтингу (от высокого к низкому)' },
];

const SortFilter = ({ initSort }: CinemaFiltersProps) => {
  const updateFilters = useUpdateFilters();

  const initialSelected = [SORT.find((option) => option.key === initSort) || SORT[0]];

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
