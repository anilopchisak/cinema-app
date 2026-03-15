'use client';

import { useMediaQuery } from 'react-responsive';
import sOriginal from '../CinemaDetailsPage.module.scss';
import sMobile from '../mobile/CinemaDetailsMobile.module.scss';
import s from './CinemaDetailsSkeleton.module.scss';

const CinemaDetailsSkeleton = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const FilmInfoSkeleton = (
    <div className={s.filmInfo}>
      <div className={s.titleRow}>
        <div className={s.title} />
        <div className={s.rating} />
      </div>
      <div className={s.meta} />
      <div className={s.descriptionBlock}>
        <div className={s.descriptionLine} />
        <div className={s.descriptionLine} />
        <div className={s.descriptionLine} />
      </div>
      <div className={s.watchButton} />
    </div>
  );

  if (isMobile) {
    return (
      <div className={sMobile.mobilePage}>
        <div className={s.backButton} />
        <div className={s.gallerySkeleton} />
        <div className={sMobile.filmInfoContainer}>{FilmInfoSkeleton}</div>
      </div>
    );
  }

  return (
    <div className={sOriginal.detailsPage}>
      <div>
        <div className={s.backButton} />
      </div>

      <div className={sOriginal.hero}>
        <div className={s.gallerySkeleton} />
        <div className={sOriginal.overlay} />
        <div className={sOriginal.filmInfoWrapper}>{FilmInfoSkeleton}</div>
      </div>
    </div>
  );
};

export default CinemaDetailsSkeleton;
