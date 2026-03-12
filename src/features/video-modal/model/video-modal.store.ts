import { makeAutoObservable } from 'mobx';

class VideoModalStore {
  isOpen: boolean = false;
  filmId: string | null = null;
  videoUrl: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  open = (id: string, url: string) => {
    this.isOpen = true;
    this.filmId = id;
    this.videoUrl = url;
  };

  close = () => {
    this.isOpen = false;
    this.filmId = null;
    this.videoUrl = null;
  };
}

export const videoModalStore = new VideoModalStore();
