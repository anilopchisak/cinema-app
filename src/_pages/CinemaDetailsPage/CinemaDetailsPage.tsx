'use client';

import FilmMeta from '@/entities/cinema/ui/FilmMeta/FilmMeta';
import FilmStat from '@/entities/cinema/ui/FilmStat';
import VideoPlayer from '@/features/cinema/ui/VideoPlayer';
import { formatMinsToHours } from '@/shared/lib/formatMinsToHours';
import ArrowRightIcon from '@/shared/ui/icons/ArrowRightIcon/ArrowRightIcon';
import Text from '@/shared/ui/Text';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import s from './CinemaDetailsPage.module.scss';
import CinemaDetailsSkeleton from './skeleton';
import useFilmState from '@/entities/cinema/api/hooks/useFilmState';

type CinemaDetailsParams = {
  documentId: string;
};

const CinemaDetailsPage = () => {
  const router = useRouter();
  const params = useParams<CinemaDetailsParams>();
  const searchParams = useSearchParams();

  const documentId = params.documentId;

  const from = searchParams?.get('from');

  const { data: film, isLoading: loading, isError: error } = useFilmState(documentId);

  const handleGoBack = () => {
    if (from === 'favorites') {
      router.push('/favorites');
    } else if (from === 'cinema') {
      router.push('/cinema');
    } else {
      router.back();
    }
  };

  if (loading) return <CinemaDetailsSkeleton />;

  if (error || !film) return <Text>{error || 'Фильм не найден'}</Text>;

  return (
    <div className={s.detailsPage}>
      <button onClick={handleGoBack} className={s.backButton}>
        <ArrowRightIcon className={s.icon} />
        <Text view="button">Назад</Text>
      </button>

      <div className={s.film}>
        {film?.trailerUrl && <VideoPlayer videoUrl={film.trailerUrl} />}

        <div className={s.body}>
          <div className={s.title}>
            <Text view="p-24" tag="h1">
              {film.title}
            </Text>

            {film.rating && <FilmStat rating={film.rating} />}
          </div>

          <FilmMeta
            items={[
              String(film.releaseYear),
              film.category?.title ?? '',
              film.ageLimit ? `${film.ageLimit}+` : '',
              film.duration ? formatMinsToHours(film.duration) : '',
            ].filter(Boolean)}
            textProps={{
              view: 'p-20',
            }}
          />

          <Text color="secondary" view="p-20">
            {film.description}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CinemaDetailsPage;
