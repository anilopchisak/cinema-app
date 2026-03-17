import Loader from '@/shared/ui/Loader';
import Text from '@/shared/ui/Text';
import s from './Loading.module.scss';
import { getServerTranslations } from '@/shared/i18next/server';

export default async function Loading() {
  const { t } = await getServerTranslations();
  return (
    <div className={s.container}>
      <Loader />
      <Text color="primary" view="p-24">
        {t('states.loading')}
      </Text>
    </div>
  );
}
