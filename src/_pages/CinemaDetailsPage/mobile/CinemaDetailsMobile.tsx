'use client';

import { Film } from '@/entities/cinema/types/cinema.types';
import Gallery from '@/shared/ui/Gallery';
import Text from '@/shared/ui/Text';
import FilmInfo from '@/widgets/cinema-details/FilmInfo';
import ArrowRightIcon from '@/shared/ui/icons/ArrowRightIcon/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import s from './CinemaDetailsMobile.module.scss';

type Props = {
  film: Film;
  onWatch: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CinemaDetailsMobile = ({ film, onWatch }: Props) => {
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
        <FilmInfo film={film} onWatch={onWatch} />
      </div>
    </div>
  );
};

export default CinemaDetailsMobile;
