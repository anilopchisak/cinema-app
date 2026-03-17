'use client';

import { Film } from '@/entities/cinema/types/cinema.types';
import FilmMeta from '@/entities/cinema/ui/FilmMeta';
import FilmStat from '@/entities/cinema/ui/FilmStat';
import { formatMinsToHours } from '@/shared/lib/formatMinsToHours';
import Text from '@/shared/ui/Text';
import s from './FilmInfo.module.scss';
import Button from '@/shared/ui/Button';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  /** Данные фильма */
  film: Film;
  /** Обработчик клика по кнопке "Смотреть" */
  onWatch: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/** Компонент с подробной информацией о фильме:
 * заголовок, рейтинг, мета-данные, описание и кнопка просмотра */
const FilmInfo = ({ film, onWatch }: Props) => {
  const { t } = useTranslation('common');
  const metaItems = useMemo(
    () =>
      [
        String(film.releaseYear),
        film.category?.title ?? '',
        film.ageLimit ? `${film.ageLimit}+` : '',
        film.duration ? formatMinsToHours(film.duration) : '',
      ].filter(Boolean),
    [film]
  );

  return (
    <div className={s.body}>
      <div className={s.title}>
        <Text view="p-24" tag="h1">
          {film.title}
        </Text>

        {film.rating && <FilmStat rating={film.rating} />}
      </div>

      <FilmMeta
        items={metaItems}
        textProps={{
          view: 'p-20',
        }}
      />

      <Text className={s.descriptionContainer} color="secondary" view="p-20" tag="div">
        {film.description}
      </Text>

      <Button className={s.button} onClick={onWatch}>
        {t('buttons.watch')}
      </Button>
    </div>
  );
};

export default FilmInfo;
