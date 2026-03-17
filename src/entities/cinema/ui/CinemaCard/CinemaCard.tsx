'use client';

import Button from '@/shared/ui/Button';
import type { FilmWithFavorite } from '@/entities/cinema/types/cinema.types';
import type React from 'react';
import Card from '@/shared/ui/Card';
import FilmMeta from '@/entities/cinema/ui/FilmMeta';
import FilmStat from '@/entities/cinema/ui/FilmStat';
import s from './CinemaCard.module.scss';
import { videoModalStore } from '@/features/video-modal/model/video-modal.store';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

interface CinemaCardProps {
  /** Данные фильма с информацией о нахождении в избранном */
  film: FilmWithFavorite;
  /** Колбэк открытия страницы деталей фильма */
  onOpenDetail: (id: string) => void;
  /** Колбэк переключения состояния избранного
   * (принимает событие, id и текущий статус) */
  onToggleFavorite: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    isFavorite?: boolean
  ) => void;
}

/** Карточка фильма с постером, мета-информацией, кнопками избранного и просмотра */
const CinemaCard = observer(({ film, onOpenDetail, onToggleFavorite }: CinemaCardProps) => {
  const { t } = useTranslation('common');
  const { open } = videoModalStore;

  /** Обработчик клика по кнопке избранного, вызывает onToggleFavorite с параметрами фильма */
  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    onToggleFavorite(e, film.documentId, film.isFavorite);
  };

  /** Обработчик клика по кнопке "Смотреть", открывает видео-модалку с трейлером */
  const handleWatchFilm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    open(film.documentId, film.trailerUrl ?? '', film.title);
  };

  return (
    <Card
      key={film.documentId}
      image={film?.poster?.url}
      captionSlot={
        <FilmMeta
          items={[
            String(film.releaseYear),
            film.category?.title ?? '',
            film.ageLimit ? `${film.ageLimit}+` : '',
          ].filter(Boolean)}
        />
      }
      title={film.title}
      subtitle={film.shortDescription}
      actionSlot={
        <div className={s.cardActions}>
          <Button
            onClick={handleToggleFavorite}
            styleType={film.isFavorite ? 'outline' : 'outline-secondary'}
          >
            {film.isFavorite ? t('favorites.inFavorites') : t('favorites.addToFavorites')}
          </Button>
          <Button onClick={handleWatchFilm}>{t('buttons.watch')}</Button>
        </div>
      }
      onClick={() => onOpenDetail(film.documentId)}
      metaSlot={
        <>
          {film.rating && <FilmStat className={s.rating} rating={film.rating} />}
          {film.duration && <FilmStat className={s.duration} duration={film.duration} />}
        </>
      }
    />
  );
});

export default CinemaCard;
