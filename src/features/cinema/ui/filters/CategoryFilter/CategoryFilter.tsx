'use client';

import { type Option } from '@/shared/ui/MultiDropdown';
import { useMemo, useState } from 'react';
import useFimCategoryState from '@/entities/film-category/api/hooks/useFilmCategoryState';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import { useUpdateFilters } from '@/entities/cinema/hooks/useUpdateFilters';
import FilterDropdown from '@/shared/ui/FilterDropdown';

interface CinemaFiltersProps {
  /** Начальные выбранные категории */
  initCategories: CinemaRawParams['category'];
}

/** Фильтр по жанру фильма */
const CategoryFilter = ({ initCategories }: CinemaFiltersProps) => {
  const [isCategoryOpened, setIsCategoryOpened] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFimCategoryState({
    enabled: isCategoryOpened || (initCategories?.length ?? 0) > 0,
  });

  const categoryOptions = useMemo<Option[]>(() => {
    if (!data) return [];

    return data.items.map((item) => ({
      key: String(item.id),
      value: item.title,
    }));
  }, [data]);

  const initialSelected = useMemo(() => {
    if (!initCategories) return [];
    const result = categoryOptions.filter((option) => initCategories.includes(String(option.key)));
    return result;
  }, [initCategories, categoryOptions]);

  const updateFilters = useUpdateFilters();

  const handleChange = (selected: Option[]) => {
    updateFilters({
      category: selected.map((o) => String(o.key)),
    });
  };

  return (
    <FilterDropdown
      options={categoryOptions}
      initialSelected={initialSelected}
      placeholder="Жанр"
      isMultiple
      onChangeFilter={handleChange}
      onOpen={() => setIsCategoryOpened(true)}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
    />
  );
};

export default CategoryFilter;
