'use client';

import VideoPlayer from '@/features/cinema/ui/VideoPlayer';
import ArrowRightIcon from '@/shared/ui/icons/ArrowRightIcon/ArrowRightIcon';
import Text from '@/shared/ui/Text';
import { useParams, useRouter } from 'next/navigation';
import s from './CinemaDetailsPage.module.scss';
import CinemaDetailsSkeleton from './skeleton';
import useFilmState from '@/entities/cinema/api/hooks/useFilmState';
import Gallery from '@/shared/ui/Gallery';
import FilmInfo from '@/widgets/cinema-details/FilmInfo';

type CinemaDetailsParams = {
  documentId: string;
};

const CinemaDetailsPage = () => {
  const router = useRouter();
  const params = useParams<CinemaDetailsParams>();

  const documentId = params.documentId;

  const { data: film, isLoading, isError } = useFilmState(documentId);

  if (isLoading) return <CinemaDetailsSkeleton />;

  if (isError || !film) return <Text>Фильм не найден</Text>;

  return (
    <div className={s.detailsPage}>
      <button onClick={() => router.back()} className={s.backButton}>
        <ArrowRightIcon className={s.icon} />
        <Text view="button">Назад</Text>
      </button>

      <div className={s.film}>
        {film?.trailerUrl && <VideoPlayer videoUrl={film.trailerUrl} />}
        <FilmInfo film={film} />
      </div>

      {/* <Gallery
        gallery={film.gallery ?? []}
        autoPlay={true}
        autoPlayInterval={3000}
        altPrefix="Кадр из фильма"
      /> */}
    </div>
  );
};

export default CinemaDetailsPage;
