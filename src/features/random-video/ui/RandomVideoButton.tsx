'use client';

import Button from '@/shared/ui/Button';
import RandomIcon from '@/shared/ui/icons/RandomIcon/RandomIcon';
import { useRandomFilm } from '../hooks/useRandomFilm';
import { videoModalStore } from '@/features/video-modal/model/video-modal.store';
import { observer } from 'mobx-react-lite';
import s from './RandomVideoButton.module.scss';

/** Кнопка: получает список фильмов
 * и открывает модальное окно со случайным */
export const RandomVideoButton = observer(() => {
  const { getRandomFilm, isLoading, isError } = useRandomFilm();
  const { open } = videoModalStore;

  const onClick = () => {
    const film = getRandomFilm();
    if (film) {
      open(film.documentId, film.trailerUrl ?? '', film.title);
    }
  };

  return (
    <Button
      styleType="outline-secondary"
      onClick={onClick}
      disabled={isLoading || isError}
      loading={isLoading}
      className={s.button}
    >
      <div className={s.content}>
        <RandomIcon />
        <span>Не хочу выбирать</span>
      </div>
    </Button>
  );
});

export default RandomVideoButton;
