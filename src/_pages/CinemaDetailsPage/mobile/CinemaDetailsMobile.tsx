'use client';

import { Film } from '@/entities/cinema/types/cinema.types';
import Gallery from '@/shared/ui/Gallery';
import Text from '@/shared/ui/Text';
import FilmInfo from '@/widgets/cinema-details/FilmInfo';
import ArrowRightIcon from '@/shared/ui/icons/ArrowRightIcon/ArrowRightIcon';
import { useRouter } from 'next/navigation';
import s from './CinemaDetailsMobile.module.scss';
import Transition from '@/shared/ui/Transition';
import { useTranslation } from 'react-i18next';

type Props = {
  film: Film;
  onWatch: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/** Мобильная версия страницы с детальной информацией о фильме */
const CinemaDetailsMobile = ({ film, onWatch }: Props) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className={s.mobilePage}>
      <button onClick={() => router.back()} className={s.backButton}>
        <ArrowRightIcon className={s.icon} />
        <Text view="button">{t('buttons.back')}</Text>
      </button>

      <Transition>
        <div className={s.mobilePage}>
          <Gallery
            gallery={film.gallery ?? []}
            autoPlay={true}
            autoPlayInterval={3000}
            altPrefix={t('gallery.altPrefix')}
            disableButtons={true}
            pauseOnHover={false}
          />

          <div className={s.filmInfoContainer}>
            <FilmInfo film={film} onWatch={onWatch} />
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default CinemaDetailsMobile;
