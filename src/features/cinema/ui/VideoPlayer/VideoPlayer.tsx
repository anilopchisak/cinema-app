'use client';

import { useState, useEffect } from 'react';
import s from './VideoPlayer.module.scss';

type VideoPlayerProps = {
  videoUrl: string | null;
};

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
  }, [videoUrl]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
  };

  return (
    <div className={s.container}>
      {isLoading && <div className={s.skeleton} />}
      {videoUrl && (
        <iframe
          onLoad={handleLoad}
          onError={handleError}
          className={s.player}
          src={videoUrl}
          allow="autoplay; fullscreen; screen-wake-lock"
          allowFullScreen
          title="video player"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
