"use client";

import Input from "@/shared/ui/Input";
import s from "./Search.module.scss";
import Button from "@/shared/ui/Button";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type SearchProps = {
  /** Начальное значение при загрузке страницы */
  initSearch: string;
  /** Коллбек при изменении поиска */
  onSearch: (val: string) => void;
};

/** Поисковая строка */
const Search = ({ initSearch, onSearch }: SearchProps) => {
  const [search, setSearch] = useState("");
  const isInitialized = useRef(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(search);
    }
  };

  useEffect(() => {
    if (!isInitialized.current && initSearch.length > 0) {
      setSearch(initSearch);
      isInitialized.current = true;
    }
  }, [initSearch]);

  return (
    <div className={s.searchRow}>
      <div className={s.inputWrapper}>
        <Input
          autoFocus={true}
          value={search}
          onChange={setSearch}
          placeholder="Искать фильмы"
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button className={s.searchButton} onClick={() => onSearch(search)}>
        Найти
      </Button>
    </div>
  );
};

export default Search;
