'use client';

import VideoPlayer from '@/shared/ui/VideoPlayer';
import ArrowRightIcon from '@/shared/ui/icons/ArrowRightIcon/ArrowRightIcon';
import Text from '@/shared/ui/Text';
import { useParams, useRouter } from 'next/navigation';
import s from './CinemaDetailsPage.module.scss';
import CinemaDetailsSkeleton from './skeleton';
import useFilmState from '@/entities/cinema/api/hooks/useFilmState';
import Gallery from '@/shared/ui/Gallery';
import FilmInfo from '@/widgets/cinema-details/FilmInfo';
import { useMediaQuery } from 'react-responsive';
import CinemaDetailsMobile from './mobile';
import { videoModalStore } from '@/features/video-modal/model/video-modal.store';
import Transition from '@/shared/ui/Transition';

type CinemaDetailsParams = {
  documentId: string;
};

const CinemaDetailsPage = () => {
  const router = useRouter();
  const params = useParams<CinemaDetailsParams>();
  const { open } = videoModalStore;

  const documentId = params.documentId;

  const { data: film, isLoading, isError } = useFilmState(documentId);

  const handleWatchFilm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (film) open(film.documentId, film.trailerUrl ?? '', film.title);
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isLoading) return <CinemaDetailsSkeleton />;

  if (isError || !film) return <Text>Фильм не найден</Text>;

  if (isMobile) {
    return <CinemaDetailsMobile film={film} onWatch={handleWatchFilm} />;
  }

  return (
    <div className={s.detailsPage}>
      <div>
        <button onClick={() => router.back()} className={s.backButton}>
          <ArrowRightIcon className={s.icon} />
          <Text view="button">Назад</Text>
        </button>
      </div>

      <Transition>
        <div className={s.hero}>
          <Gallery
            gallery={film.gallery ?? []}
            autoPlay={true}
            autoPlayInterval={3000}
            altPrefix="Кадр из фильма"
            disableButtons={true}
            pauseOnHover={false}
          />
          <div className={s.overlay} />
          <div className={s.filmInfoWrapper}>
            <FilmInfo film={film} onWatch={handleWatchFilm} />
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default CinemaDetailsPage;
