'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import MultiDropdown, { Option } from '../MultiDropdown';
import s from './FilterDropdown.module.scss';
import { debounce } from 'lodash';

interface FilterDropdownProps {
  options: Option[];
  initialSelected?: Option[];
  placeholder: string;
  isMultiple?: boolean;
  onChangeFilter: (selected: Option[]) => void;
  onOpen?: () => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
}

const FilterDropdown = ({
  options,
  initialSelected = [],
  placeholder,
  isMultiple = false,
  onChangeFilter,
  onOpen,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: FilterDropdownProps) => {
  const [selected, setSelected] = useState<Option[]>(initialSelected);

  const getDropdownTitle = (selected: Option[]) => {
    if (!selected.length) return placeholder;
    return selected.map((item) => item.value).join(', ');
  };

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: Option[]) => {
        onChangeFilter(value);
      }, 700),
    [onChangeFilter]
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
      options={options}
      value={selected}
      onChange={handleChange}
      getTitle={getDropdownTitle}
      isMultiple={isMultiple}
      onOpen={onOpen}
      onLoadMore={onLoadMore}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
    />
  );
};

export default FilterDropdown;
