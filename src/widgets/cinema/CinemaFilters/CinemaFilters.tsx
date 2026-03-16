'use client';

import CategoryFilter from '@/features/cinema/ui/filters/CategoryFilter';
import SortFilter from '@/features/cinema/ui/filters/SortFilter';
import Search from '@/features/cinema/ui/Search';
import s from './CinemaFilters.module.scss';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';
import ReleaseYearFilter from '@/features/cinema/ui/filters/ReleaseYaerFilter/ReleaseYearFilter';
import Button from '@/shared/ui/Button';
import { useResetFilters } from '@/entities/cinema/hooks/useResetFilters';
import RandomVideoButton from '@/features/random-video/ui';

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
      <div className={s.filters}>
        <Search initSearch={params.search} />
        <RandomVideoButton />
      </div>

      <div className={s.filters}>
        <CategoryFilter initCategories={params.category} />
        <ReleaseYearFilter initReleaseYear={params.releaseYear} />
        <SortFilter initSort={params.sort === 'default' ? null : params.sort} />
        <Button className={s.button} onClick={onReset} styleType="outline">
          Очистить
        </Button>
      </div>
    </div>
  );
}
