import { formatMinsToHours } from '@/shared/lib/formatMinsToHours';
import StarIcon from '@/shared/ui/icons/StarIcon/StarIcon';
import Text from '@/shared/ui/Text';
import cn from 'classnames';
import s from './FilmStat.module.scss';

type FilmStatProps = {
  /** Продолжительность фильма в минутах (если передана, отображается в формате "чч:мм") */
  duration?: number;
  /** Рейтинг фильма (если передан, отображается числом со звездочкой) */
  rating?: number;
  /** Дополнительный CSS-класс */
  className?: string;
};

/** Компонент для отображения статистики фильма:
 * либо рейтинг со звездой, либо длительность в часах/минутах */
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
