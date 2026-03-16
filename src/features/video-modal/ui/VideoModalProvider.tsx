'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { videoModalStore } from '../model/video-modal.store';
import VideoModal from '@/shared/ui/VideoModal';
import { routes } from '@/shared/config/routes';

/** Провайдер для отображения модального окна с трейлером фильма.
 * Следит за состоянием стора videoModalStore и рендерит VideoModal при необходимости.
 * Блокирует прокрутку body, когда модалка открыта.
 */
const VideoModalProvider = observer(() => {
  const { isOpen, videoUrl, close, filmTitle, filmId } = videoModalStore;

  /** Управление overflow body: при открытии модалки
   * запрещаем прокрутку, при закрытии восстанавливаем */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  /** Функция, вызываемая перед переходом на страницу фильма (закрывает модалку) */
  const openDetails = () => {
    close();
  };

  return (
    <VideoModal
      isOpen={isOpen}
      onClose={close}
      videoUrl={videoUrl ?? ''}
      filmTitle={filmTitle ?? ''}
      filmUrl={routes.cinemaDetails.create(filmId ?? '')}
      beforeNavigate={openDetails}
    />
  );
});

export default VideoModalProvider;
