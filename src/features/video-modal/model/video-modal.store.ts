import { makeAutoObservable } from 'mobx';

class VideoModalStore {
  isOpen: boolean = false;
  filmId: string | null = null;
  videoUrl: string | null = null;
  filmTitle: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  open = (id: string, url: string, title: string) => {
    this.isOpen = true;
    this.filmId = id;
    this.videoUrl = url;
    this.filmTitle = title;
  };

  close = () => {
    this.isOpen = false;
    this.filmId = null;
    this.videoUrl = null;
    this.filmTitle = null;
  };
}

export const videoModalStore = new VideoModalStore();
