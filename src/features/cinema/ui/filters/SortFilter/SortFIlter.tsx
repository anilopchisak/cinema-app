'use client';

import MultiDropdown, { type Option } from '@/shared/ui/MultiDropdown';
import s from '../Filter.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import { useUpdateFilters } from '@/entities/cinema/hooks/useUpdateFilters';

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
  const [selected, setSelected] = useState<Option[]>([
    SORT.find((option) => option.key === initSort) || SORT[0],
  ]);

  const getDropdownTitle = (selected: Option[]) => {
    if (selected.length === 0) return 'Сортировка';
    return selected.map((item) => item.value).join(', ');
  };

  const updateFilters = useUpdateFilters();

  const onSortChange = useCallback(
    (sort: string) => {
      updateFilters({ sort });
    },
    [updateFilters]
  );

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: Option[]) => {
        const sortKey = value[0]?.key ?? 'default';
        onSortChange(sortKey);
      }, 700),
    [onSortChange]
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleChange = useCallback(
    (newSelected: Option[]) => {
      setSelected(newSelected);
      debouncedUpdate(newSelected);
    },
    [debouncedUpdate]
  );

  return (
    <MultiDropdown
      className={s.filter}
      options={SORT}
      value={selected}
      onChange={handleChange}
      getTitle={getDropdownTitle}
      isMultiple={false}
    />
  );
};

export default SortFilter;
