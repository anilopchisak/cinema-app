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
};

/**
 * Блок фильтров на странице с фильмами.
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
