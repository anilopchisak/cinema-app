import Text from '@/shared/ui/Text';
import s from './Footer.module.scss';
import { getServerTranslations } from '@/shared/i18next/server';

export default async function Footer() {
  const { t } = await getServerTranslations();
  return (
    <footer className={s.footer}>
      <Text color="secondary">{t('footer.copyright')}</Text>
    </footer>
  );
}
