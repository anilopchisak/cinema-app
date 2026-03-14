'use client';

import Input from '@/shared/ui/Input';
import s from './Search.module.scss';
import Button from '@/shared/ui/Button';
import { useState, type KeyboardEvent } from 'react';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import { useUpdateFilters } from '@/entities/cinema/hooks/useUpdateFilters';

type SearchProps = {
  /** Начальное значение при загрузке страницы */
  initSearch: CinemaRawParams['search'];
};

/** Поисковая строка */
const Search = ({ initSearch }: SearchProps) => {
  const [search, setSearch] = useState(initSearch ?? '');

  const updateFilters = useUpdateFilters();

  const onSearch = () => {
    updateFilters({ search });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className={s.searchRow}>
      <div className={s.inputWrapper}>
        <Input
          value={search}
          onChange={setSearch}
          placeholder="Искать фильмы"
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button className={s.searchButton} onClick={() => onSearch()}>
        Найти
      </Button>
    </div>
  );
};

export default Search;
