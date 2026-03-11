'use client';

import CategoryFilter from '@/features/cinema/ui/filters/CategoryFilter';
import SortFilter from '@/features/cinema/ui/filters/SortFilter';
import Search from '@/features/cinema/ui/Search';
import s from './CinemaFilters.module.scss';

type Props = {
  params: {
    page: number;
    search: string;
    category: string[];
    sort: string;
  };
  // setSearch: (search: string) => void;
  // setSort: (sort: string) => void;
  // setCategory: (category: string[]) => void;
};

/**
 * Блок фильтров на странице с фильмами.
 * Содержит поле поиска, фильтр по категориям и выбор сортировки.
 * Получает текущие значения через props и уведомляет родителя об изменениях.
 */
export default function CinemaFilters({ params }: Props) {
  return (
    <div className={s.container}>
      <Search initSearch={params.search} />
      <div className={s.filters}>
        <CategoryFilter initCategories={params.category} />
      </div>
      <SortFilter initSort={params.sort === 'default' ? null : params.sort} />
    </div>
  );
}
