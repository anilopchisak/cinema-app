'use client';

import { observer } from 'mobx-react-lite';
import { videoModalStore } from '../model/video-modal.store';
import VideoModal from '@/shared/ui/VideoModal';
import { routes } from '@/shared/config/routes';

const VideoModalProvider = observer(() => {
  const { isOpen, videoUrl, close, filmTitle, filmId } = videoModalStore;

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
