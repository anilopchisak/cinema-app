import { observer } from 'mobx-react-lite';
import { videoModalStore } from '../model/video-modal.store';
import Modal from '@/shared/ui/Modal/Modal';
import VideoPlayer from '@/features/cinema/ui/VideoPlayer';
import Text from '@/shared/ui/Text';
import { routes } from '@/shared/config/routes';
import s from './VideoModal.module.scss';
import { useRouter } from 'next/navigation';

const VideoModal = observer(() => {
  const router = useRouter();
  const { isOpen, videoUrl, close, filmTitle, filmId } = videoModalStore;

  const openDetails = () => {
    close();
    if (filmId) router.push(routes.cinemaDetails.create(filmId));
  };

  return (
    <Modal className={s.modal} isOpen={isOpen} onClose={close}>
      <div className={s.header}>
        <button className={s.title} onClick={openDetails}>
          <Text className={s.text} view="title">
            {filmTitle}
          </Text>
        </button>
      </div>

      <div className={s.content}>
        <VideoPlayer videoUrl={videoUrl ?? ''} />
      </div>
    </Modal>
  );
});

export default VideoModal;
