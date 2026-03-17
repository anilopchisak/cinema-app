'use client';

import Text from '@/shared/ui/Text';
import s from './CinemaIntro.module.scss';
import { useTranslation } from 'react-i18next';

/** Заголовок страницы CinemaPage */
const CinemaIntro = () => {
  const { t } = useTranslation('common');
  return (
    <div className={s.intro}>
      <Text view="title" color="primary" className={s.title}>
        {t('intro.title')}
      </Text>

      <div className={s.description}>
        <Text view="p-20" color="secondary">
          {t('intro.line1')}
        </Text>
        <Text view="p-20" color="secondary">
          {t('intro.line2')}
        </Text>
      </div>
    </div>
  );
};

export default CinemaIntro;
