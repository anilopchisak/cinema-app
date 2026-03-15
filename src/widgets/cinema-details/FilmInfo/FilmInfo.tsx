import { Film } from '@/entities/cinema/types/cinema.types';
import FilmMeta from '@/entities/cinema/ui/FilmMeta';
import FilmStat from '@/entities/cinema/ui/FilmStat';
import { formatMinsToHours } from '@/shared/lib/formatMinsToHours';
import Text from '@/shared/ui/Text';
import s from './FilmInfo.module.scss';
import Button from '@/shared/ui/Button';

type Props = {
  film: Film;
  onWatch: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const FilmInfo = ({ film, onWatch }: Props) => {
  return (
    <div className={s.body}>
      <div className={s.title}>
        <Text view="p-24" tag="h1">
          {film.title}
        </Text>

        {film.rating && <FilmStat rating={film.rating} />}
      </div>

      <FilmMeta
        items={[
          String(film.releaseYear),
          film.category?.title ?? '',
          film.ageLimit ? `${film.ageLimit}+` : '',
          film.duration ? formatMinsToHours(film.duration) : '',
        ].filter(Boolean)}
        textProps={{
          view: 'p-20',
        }}
      />

      <Text color="secondary" view="p-20">
        {film.description}
      </Text>

      <Button className={s.button} onClick={onWatch}>
        Смотреть
      </Button>
    </div>
  );
};

export default FilmInfo;
