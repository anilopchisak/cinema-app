'use client';

import sOriginal from '../CinemaFilters.module.scss';
import sSearch from '@/features/cinema/ui/Search/Search.module.scss';
import sFilter from '@/shared/ui/FilterDropdown/FilterDropdown.module.scss';
import s from './CinemaFiltersSkeleton.module.scss';
import cn from 'classnames';

const CinemaFiltersSkeleton = () => {
  return (
    <div className={sOriginal.container}>
      <div className={sSearch.searchRow}>
        <div className={sSearch.inputWrapper}>
          <div className={s.inputSkeleton} />
        </div>
        <div className={cn(sSearch.searchButton, s.buttonSkeleton)} />
      </div>

      <div className={sOriginal.filters}>
        <div className={cn(sFilter.filter, s.dropdownSkeleton)} />
        <div className={cn(sFilter.filter, s.dropdownSkeleton)} />
        <div className={cn(sFilter.filter, s.dropdownSkeleton)} />
      </div>
      <div className={s.sortSkeleton} />
    </div>
  );
};

export default CinemaFiltersSkeleton;
