'use client';

import sOriginal from '../CinemaFilters.module.scss';
import s from './CinemaFiltersSkeleton.module.scss';

const CinemaFiltersSkeleton = () => {
  return (
    <div className={sOriginal.container}>
      <div className={sOriginal.filters}>
        <div className={s.inputSkeleton} />
        <div className={s.buttonSkeleton} />
      </div>

      <div className={sOriginal.filters}>
        <div className={s.dropdownSkeleton} />
        <div className={s.dropdownSkeleton} />
        <div className={s.dropdownSkeleton} />
      </div>
      <div className={s.sortSkeleton} />
    </div>
  );
};

export default CinemaFiltersSkeleton;
