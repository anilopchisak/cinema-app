'use client';

import { type Option } from '@/shared/ui/MultiDropdown';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import { useUpdateFilters } from '@/entities/cinema/hooks/useUpdateFilters';
import FilterDropdown from '@/shared/ui/FilterDropdown';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface CinemaFiltersProps {
  /** Начальное значение сортировки */
  initSort: CinemaRawParams['sort'] | null;
}

/** Дропдаун сортировки */
const SortFilter = ({ initSort }: CinemaFiltersProps) => {
  const updateFilters = useUpdateFilters();
  const { t } = useTranslation('common');

  const SORT: Option[] = useMemo(
    () => [
      { key: 'title:asc', value: t('sort.titleAsc') },
      { key: 'title:desc', value: t('sort.titleDesc') },
      { key: 'rating:asc', value: t('sort.ratingAsc') },
      { key: 'rating:desc', value: t('sort.ratingDesc') },
    ],
    [t]
  );

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
      placeholder={t('filters.sort')}
      onChangeFilter={handleChange}
    />
  );
};

export default SortFilter;
