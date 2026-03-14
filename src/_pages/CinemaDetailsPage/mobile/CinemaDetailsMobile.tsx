'use client';

import { Film } from '@/entities/cinema/types/cinema.types';
import VideoPlayer from '@/features/cinema/ui/VideoPlayer';
import Gallery from '@/shared/ui/Gallery';
import Text from '@/shared/ui/Text';
import FilmInfo from '@/widgets/cinema-details/FilmInfo';
import ArrowRightIcon from '@/shared/ui/icons/ArrowRightIcon/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import s from './CinemaDetailsMobile.module.scss';

type Props = {
  film: Film;
};

const CinemaDetailsMobile = ({ film }: Props) => {
  const router = useRouter();

  return (
    <div className={s.mobilePage}>
      <button onClick={() => router.back()} className={s.backButton}>
        <ArrowRightIcon className={s.icon} />
        <Text view="button">Назад</Text>
      </button>

      <Gallery
        gallery={film.gallery ?? []}
        autoPlay={true}
        autoPlayInterval={3000}
        altPrefix="Кадр из фильма"
        disableButtons={true}
        pauseOnHover={false}
      />

      <div className={s.filmInfoContainer}>
        <FilmInfo film={film} />
      </div>

      {film?.trailerUrl && <VideoPlayer videoUrl={film.trailerUrl} />}
    </div>
  );
};

export default CinemaDetailsMobile;
