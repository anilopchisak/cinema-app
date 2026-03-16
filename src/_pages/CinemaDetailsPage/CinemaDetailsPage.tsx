'use client';

import ArrowRightIcon from '@/shared/ui/icons/ArrowRightIcon/ArrowRightIcon';
import Text from '@/shared/ui/Text';
import { useRouter } from 'next/navigation';
import s from './CinemaDetailsPage.module.scss';
import CinemaDetailsSkeleton from './skeleton';
import FilmInfo from '@/widgets/cinema-details/FilmInfo';
import { useMediaQuery } from 'react-responsive';
import { videoModalStore } from '@/features/video-modal/model/video-modal.store';
import Transition from '@/shared/ui/Transition';
import dynamic from 'next/dynamic';
import { Film } from '@/entities/cinema/types/cinema.types';
import { observer } from 'mobx-react-lite';

const Gallery = dynamic(() => import('@/shared/ui/Gallery'), {
  ssr: false,
  loading: () => <CinemaDetailsSkeleton />,
});

const CinemaDetailsMobile = dynamic(() => import('./mobile'), { ssr: false });

type Props = {
  film: Film;
};

const CinemaDetailsPage = observer(({ film }: Props) => {
  const router = useRouter();
  const { open } = videoModalStore;

  const handleWatchFilm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (film) open(film.documentId, film.trailerUrl ?? '', film.title);
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return <CinemaDetailsMobile film={film} onWatch={handleWatchFilm} />;
  }

  return (
    <>
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
    </>
  );
});

export default CinemaDetailsPage;
