import s from './VideoPlayer.module.scss';

type VideoPlayerProps = {
  videoUrl: string;
};

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  return (
    <div className={s.container}>
      <iframe
        className={s.player}
        src={videoUrl}
        allow="autoplay; fullscreen; screen-wake-lock"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
