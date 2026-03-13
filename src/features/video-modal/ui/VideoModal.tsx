import { observer } from 'mobx-react-lite';
import { videoModalStore } from '../model/video-modal.store';
import Modal from '@/shared/ui/Modal/Modal';
import VideoPlayer from '@/features/cinema/ui/VideoPlayer';
import Text from '@/shared/ui/Text';
import { routes } from '@/shared/config/routes';
import s from './VideoModal.module.scss';
import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';

const VideoModal = observer(() => {
  const router = useRouter();
  const { isOpen, videoUrl, close, filmTitle, filmId } = videoModalStore;

  const openDetails = () => {
    close();
    if (filmId) router.push(routes.cinemaDetails.create(filmId));
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className={s.container}>
        <div className={s.header}>
          <Text view="title">{filmTitle}</Text>
          <Button styleType="outline" onClick={openDetails}>
            Перейти к странице фильма
          </Button>
        </div>

        <VideoPlayer videoUrl={videoUrl ?? ''} />
      </div>
    </Modal>
  );
});

export default VideoModal;
