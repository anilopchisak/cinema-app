'use client';

import s from './VideoModal.module.scss';
import Link from 'next/link';
import ArrowRightIcon from '../icons/ArrowRightIcon/ArrowRightIcon';
import Text from '../Text';
import VideoPlayer from '../VideoPlayer';

type ModalProps = {
  /** Флаг, открыто ли модальное окно */
  isOpen: boolean;
  /** Колбэк закрытия модального окна */
  onClose: () => void;
  /** URL видео для плеера */
  videoUrl: string;
  /** Название фильма (отображается в ссылке) */
  filmTitle: string;
  /** Ссылка на страницу фильма */
  filmUrl: string;
  /** Колбэк, вызываемый перед переходом на страницу фильма (например, для закрытия модалки) */
  beforeNavigate: () => void;
};

/** Модальное окно для просмотра трейлера фильма с возможностью перейти на страницу фильма */
const VideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  filmTitle,
  filmUrl,
  beforeNavigate,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.controls}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={s.backButton}
          aria-label="Назад"
        >
          <ArrowRightIcon className={s.icon} />
        </button>

        <Link href={filmUrl} onClick={beforeNavigate} className={s.titleLink}>
          <Text view="p-18" weight="medium">
            {filmTitle}
          </Text>
        </Link>
      </div>

      <VideoPlayer videoTitle={filmTitle} videoUrl={videoUrl} />
    </div>
  );
};

export default VideoModal;
