import Text from '@/shared/ui/Text';
import s from '../CinemaList.module.scss';
import CardSekeleton from '@/shared/ui/Card/skeleton';

const CinemaListSkeleton = () => {
  return (
    <>
      <div className={s.sectionHeader}>
        <Text tag="h2" weight="bold">
          Все фильмы
        </Text>
      </div>
      <div className={s.filmsGrid}>
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSekeleton key={`skeleton-${index}`} />
        ))}
      </div>
    </>
  );
};

export default CinemaListSkeleton;
