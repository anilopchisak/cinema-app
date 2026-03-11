'use client';

import MultiDropdown, { type Option } from '@/shared/ui/MultiDropdown';
import s from '../Filter.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { useUpdateQuery } from '@/entities/cinema/hooks/useUpdateQueryString';

interface CinemaFiltersProps {
  initSort: string | null;
}

const SORT: Option[] = [
  { key: 'default', value: 'По умолчанию' },
  { key: 'title:asc', value: 'По названию А -> Я' },
  { key: 'title:desc', value: 'По названию Я -> А' },
];

const SortFilter = ({ initSort }: CinemaFiltersProps) => {
  const [selected, setSelected] = useState<Option[]>([
    SORT.find((option) => option.key === initSort) || SORT[0],
  ]);

  const getDropdownTitle = (selected: Option[]) => {
    if (selected.length === 0) return 'Сортировка';
    return selected.map((item) => item.value).join(', ');
  };

  const updateQuery = useUpdateQuery();

  const onSortChange = useCallback(
    (sort: string) => {
      updateQuery({ sort });
    },
    [updateQuery]
  );

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: Option[]) => {
        onSortChange(value[0].key);
      }, 700),
    [onSortChange]
  );

  /** Обновление параметров */
  useEffect(() => {
    debouncedUpdate(selected);
    return () => {
      debouncedUpdate.cancel();
    };
  }, [selected, debouncedUpdate]);

  return (
    <MultiDropdown
      className={s.filter}
      options={SORT}
      value={selected}
      onChange={setSelected}
      getTitle={getDropdownTitle}
      isMultiple={false}
    />
  );
};

export default SortFilter;
