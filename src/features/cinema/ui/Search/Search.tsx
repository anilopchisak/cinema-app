'use client';

import Input from '@/shared/ui/Input';
import { useEffect, useMemo, useState } from 'react';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import { useUpdateFilters } from '@/entities/cinema/hooks/useUpdateFilters';
import { debounce } from 'lodash';

type SearchProps = {
  /** Начальное значение при загрузке страницы */
  initSearch: CinemaRawParams['search'];
};

/** Поисковая строка */
const Search = ({ initSearch }: SearchProps) => {
  const [search, setSearch] = useState(initSearch ?? '');

  const updateFilters = useUpdateFilters();

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        updateFilters({ search: value });
      }, 300),
    [updateFilters]
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleChange = (newValue: string) => {
    setSearch(newValue);
    debouncedUpdate(newValue);
  };

  return <Input value={search} onChange={handleChange} placeholder="Искать фильмы" />;
};

export default Search;
