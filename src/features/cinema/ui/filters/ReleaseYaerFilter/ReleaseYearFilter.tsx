'use client';

import { type Option } from '@/shared/ui/MultiDropdown';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import { useUpdateFilters } from '@/entities/cinema/hooks/useUpdateFilters';
import FilterDropdown from '@/shared/ui/FilterDropdown';
import { useMemo } from 'react';

/** Функция для получения списка годов - опций дропдауна */
function getYears() {
  const years: Option[] = [];
  for (let i = 2026; i >= 1950; i--) {
    years.push({
      key: String(i),
      value: String(i),
    });
  }
  return years;
}

const RELEASE_YEAR: Option[] = getYears();

interface CinemaFiltersProps {
  /** Начальный выбранный год */
  initReleaseYear: CinemaRawParams['sort'] | null;
}

/** Фильтр по году выпуска */
const ReleaseYearFilter = ({ initReleaseYear }: CinemaFiltersProps) => {
  const updateFilters = useUpdateFilters();

  const initialSelected = useMemo(() => {
    if (!initReleaseYear) return [];

    const option = RELEASE_YEAR.find((o) => o.key === initReleaseYear);

    return option ? [option] : [];
  }, [initReleaseYear]);

  const handleChange = (selected: Option[]) => {
    const key = selected[0]?.key ?? 'default';

    updateFilters({
      releaseYear: key,
    });
  };

  return (
    <FilterDropdown
      options={RELEASE_YEAR}
      initialSelected={initialSelected}
      placeholder="Год выпуска"
      onChangeFilter={handleChange}
    />
  );
};

export default ReleaseYearFilter;
