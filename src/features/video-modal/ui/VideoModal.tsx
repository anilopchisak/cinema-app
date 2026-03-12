import { observer } from 'mobx-react-lite';
import { videoModalStore } from '../model/video-modal.store';
import Modal from '@/shared/ui/Modal/Modal';
import VideoPlayer from '@/features/cinema/ui/VideoPlayer';

const VideoModal = observer(() => {
  const { isOpen, videoUrl, close } = videoModalStore;

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <VideoPlayer videoUrl={videoUrl ?? ''} />
    </Modal>
  );
});

export default VideoModal;
