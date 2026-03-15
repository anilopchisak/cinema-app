'use client';

import CategoryFilter from '@/features/cinema/ui/filters/CategoryFilter';
import SortFilter from '@/features/cinema/ui/filters/SortFilter';
import Search from '@/features/cinema/ui/Search';
import s from './CinemaFilters.module.scss';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import ReleaseYearFilter from '@/features/cinema/ui/filters/ReleaseYaerFilter/ReleaseYearFilter';
import Button from '@/shared/ui/Button';
import { useResetFilters } from '@/entities/cinema/hooks/useResetFilters';
import sFilter from '@/shared/ui/FilterDropdown/FilterDropdown.module.scss';

type Props = {
  params: CinemaRawParams;
};

/**
 * Блок фильтров на странице с фильмами.
 */
export default function CinemaFilters({ params }: Props) {
  const resetFilters = useResetFilters();

  const onReset = () => {
    resetFilters();
  };

  return (
    <div className={s.container}>
      <Search initSearch={params.search} />
      <div className={s.filters}>
        <CategoryFilter initCategories={params.category} />
        <ReleaseYearFilter initReleaseYear={params.releaseYear} />
      </div>
      <SortFilter initSort={params.sort === 'default' ? null : params.sort} />
      <Button className={s.reset} onClick={onReset} styleType="outline">
        Очистить фильтры
      </Button>
    </div>
  );
}
