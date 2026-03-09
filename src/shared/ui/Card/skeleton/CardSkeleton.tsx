import cn from 'classnames';
import s from './CardSkeleton.module.scss';
import sOriginal from '../Card.module.scss';

const CardSekeleton = () => {
  return (
    <div className={cn(sOriginal.card, s.skeletonCard)}>
      <div className={cn(sOriginal.header, s.skeletonHeader)}>
        <div className={s.skeletonImage} />
      </div>

      <div className={sOriginal.body}>
        <div>
          <div className={s.skeletonCaption} />
          <div className={s.skeletonTitle} />
          <div className={s.skeletonSubtitle} />
        </div>

        <div className={cn(sOriginal.footer, s.skeletonFooter)}>
          <div className={s.skeletonAction} />
          <div className={s.skeletonAction} />
        </div>
      </div>
    </div>
  );
};

export default CardSekeleton;
