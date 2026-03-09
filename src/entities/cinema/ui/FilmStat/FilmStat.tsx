import { formatMinsToHours } from '@/shared/lib/formatMinsToHours';
import StarIcon from '@/shared/ui/icons/StarIcon/StarIcon';
import Text from '@/shared/ui/Text';
import cn from 'classnames';
import s from './FilmStat.module.scss';

type FilmStatProps = {
  duration?: number;
  rating?: number;
  className?: string;
};

const FilmStat = ({ duration, rating, className }: FilmStatProps) => {
  return (
    <div className={cn(className, s.container)}>
      <Text view="p-24" weight="bold">
        {rating || (duration && formatMinsToHours(duration))}
      </Text>
      {rating && <StarIcon width={24} height={24} />}
    </div>
  );
};

export default FilmStat;
