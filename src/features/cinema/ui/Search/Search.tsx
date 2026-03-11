'use client';

import Input from '@/shared/ui/Input';
import s from './Search.module.scss';
import Button from '@/shared/ui/Button';
import { useState, type KeyboardEvent } from 'react';
import { useUpdateQuery } from '@/entities/cinema/hooks/useUpdateQueryString';

type SearchProps = {
  /** Начальное значение при загрузке страницы */
  initSearch: string;
};

/** Поисковая строка */
const Search = ({ initSearch }: SearchProps) => {
  const [search, setSearch] = useState(initSearch);

  const updateQuery = useUpdateQuery();

  const onSearch = () => {
    updateQuery({ search });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      //  - ЗАКОММЕНТИРОВАТЬ ДЛЯ ТЕСТОВ
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
