'use client';

import Seo from '@/shared/ui/Seo';
import Button from '@/shared/ui/Button';
import Text from '@/shared/ui/Text';
import s from './ErrorPage.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  const { t } = useTranslation('common');

  return (
    <>
      <Seo
        title={`${t('pages.errorTitle')} ${error || 'на сервере'}`}
        description={t('pages.errorDescription')}
        noindex
      />
      <div className={s.errorPage}>
        <div className={s.message}>
          <Text color="primary" view="title" tag="h2">
            {t('pages.errorHeading')}
          </Text>
          <Text color="secondary">
            {t('pages.errorTextPrefix')} {error.message}
          </Text>
        </div>

        <div className={s.actions}>
          <Button onClick={() => reset()}>{t('buttons.tryAgain')}</Button>
          <Button styleType="outline" onClick={() => window.location.reload()}>
            {t('buttons.reloadPage')}
          </Button>
        </div>
      </div>
    </>
  );
}
