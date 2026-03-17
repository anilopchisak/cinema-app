import { makeAutoObservable } from 'mobx';

/** MobX store для управления состоянием модального окна с видео (трейлером фильма) */
class VideoModalStore {
  /** Флаг открыто ли модальное окно */
  isOpen: boolean = false;
  /** ID фильма, чей трейлер показывается */
  filmId: string | null = null;
  /** URL видео для отображения */
  videoUrl: string | null = null;
  /** Название фильма (для заголовка модалки) */
  filmTitle: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /** Открыть модалку с данными фильма */
  open = (id: string, url: string, title: string) => {
    this.isOpen = true;
    this.filmId = id;
    this.videoUrl = url;
    this.filmTitle = title;
  };

  /** Закрыть модалку и сбросить данные */
  close = () => {
    this.isOpen = false;
    this.filmId = null;
    this.videoUrl = null;
    this.filmTitle = null;
  };
}

export const videoModalStore = new VideoModalStore();
