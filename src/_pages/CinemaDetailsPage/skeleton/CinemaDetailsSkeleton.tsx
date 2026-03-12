import Loader from '@/shared/ui/Loader';
import sOriginal from '../CinemaDetailsPage.module.scss';
import s from './CinemaDetailsSkeleton.module.scss';

const CinemaDetailsSkeleton = () => {
  return (
    <div className={sOriginal.detailsPage}>
      <div className={s.backButton} />

      <div className={sOriginal.film}>
        <div className={s.video}>
          <div className={s.videoLoader}>
            <Loader />
          </div>
        </div>

        <div className={sOriginal.body}>
          <div className={s.title}>
            <div className={s.title} />
            <div className={s.rating} />
          </div>

          <div className={s.meta} />

          <div className={s.description} />
          <div className={s.description} />
          <div className={s.description} />
        </div>
      </div>
    </div>
  );
};

export default CinemaDetailsSkeleton;
