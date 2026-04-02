import Button from '@/shared/ui/Button';
import Text from '@/shared/ui/Text';
import s from './NotFoundPage.module.scss';
import { routes } from '@/shared/config/routes';
import Link from 'next/link';
import { getServerTranslations } from '@/shared/i18next/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  return {
    title: t('pages.notFoundTitle'),
    description: t('pages.notFoundDescription'),
    robots: 'noindex',
  };
}

export default async function NotFound() {
  const { t } = await getServerTranslations();
  return (
    <>
      <div className={s.notFoundPage}>
        <div className={s.message}>
          <Text color="primary" view="title">
            {t('pages.notFoundHeading')}
          </Text>
        </div>

        <div className={s.actions}>
          <Link href={routes.cinema.create()}>
            <Button>{t('buttons.goHome')}</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
