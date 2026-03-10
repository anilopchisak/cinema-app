'use client';

import { useCinemaParams } from '@/entities/cinema/hooks/useCinemaParams';
import CategoryFilter from '@/features/cinema/ui/filters/CategoryFilter';
import SortFilter from '@/features/cinema/ui/filters/SortFilter';
import Search from '@/features/cinema/ui/Search';
import s from './CinemaFilters.module.scss';

type Props = {
  initialParams: any;
};

/**
 * Блок фильтров на странице с фильмами.
 * Содержит поле поиска, фильтр по категориям и выбор сортировки.
 * Получает текущие значения через props и уведомляет родителя об изменениях.
 */
export default function CinemaFilters({ initialParams }: Props) {
  const { params, setSearch, setCategory, setSort } = useCinemaParams(initialParams);

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
