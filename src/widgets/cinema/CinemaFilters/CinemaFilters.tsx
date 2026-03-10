'use client';

import CategoryFilter from '@/features/cinema/ui/filters/CategoryFilter';
import SortFilter from '@/features/cinema/ui/filters/SortFilter';
import Search from '@/features/cinema/ui/Search';
import s from './CinemaFilters.module.scss';

type Props = {
  params: {
    search: string;
    category: string[];
    sort: string;
  };
  setSearch: (search: string) => void;
  setSort: (sort: string) => void;
  setCategory: (category: string[]) => void;
};

/**
 * Блок фильтров на странице с фильмами.
 * Содержит поле поиска, фильтр по категориям и выбор сортировки.
 * Получает текущие значения через props и уведомляет родителя об изменениях.
 */
export default function CinemaFilters({ params, setSearch, setSort, setCategory }: Props) {
  return (
    <div className={s.container}>
      <Search onSearch={setSearch} initSearch={params.search} />
      <div className={s.filters}>
        <CategoryFilter initCategories={params.category} onCategoryChange={setCategory} />
      </div>
      <SortFilter
        initSort={params.sort === 'default' ? null : params.sort}
        onSortChange={setSort}
      />
    </div>
  );
}
