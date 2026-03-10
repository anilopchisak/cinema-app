'use client';

import MultiDropdown, { type Option } from '@/shared/ui/MultiDropdown';
import s from '../Filter.module.scss';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

interface CinemaFiltersProps {
  initSort: string | null;
  onSortChange: (option: string) => void;
}

const SORT: Option[] = [
  { key: 'default', value: 'По умолчанию' },
  { key: 'title:asc', value: 'По названию А -> Я' },
  { key: 'title:desc', value: 'По названию Я -> А' },
];

const SortFilter = ({ initSort, onSortChange }: CinemaFiltersProps) => {
  const [selected, setSelected] = useState<Option[]>([{ key: 'default', value: 'По умолчанию' }]);
  const isInitialized = useRef(false);

  const getDropdownTitle = (selected: Option[]) => {
    if (selected.length === 0) return 'Сортировка';
    return selected.map((item) => item.value).join(', ');
  };

  useEffect(() => {
    if (!isInitialized.current && initSort) {
      const option = SORT.filter((item) => item.key === initSort);
      setSelected(option);
      isInitialized.current = true;
    }
  }, [initSort]);

  const debouncedUpdate = useMemo(() => {
    return debounce((value: Option[]) => {
      onSortChange(value[0].key);
    }, 300);
  }, [onSortChange]);

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
