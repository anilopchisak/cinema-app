'use client';

import MultiDropdown, { type Option } from '@/shared/ui/MultiDropdown';
import s from '../Filter.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { useUpdateQuery } from '@/entities/cinema/hooks/useUpdateQueryString';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';

interface CinemaFiltersProps {
  initSort: CinemaRawParams['sort'] | null;
}

const SORT: Option[] = [
  { key: 'default', value: 'По умолчанию' },

  // Название
  { key: 'title:asc', value: 'По названию (А → Я)' },
  { key: 'title:desc', value: 'По названию (Я → А)' },

  // Год выпуска
  { key: 'releaseYear:asc', value: 'По году выпуска (от старых к новым)' },
  { key: 'releaseYear:desc', value: 'По году выпуска (от новых к старым)' },

  // Длительность
  { key: 'duration:asc', value: 'По длительности (от коротких к длинным)' },
  { key: 'duration:desc', value: 'По длительности (от длинных к коротким)' },

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
