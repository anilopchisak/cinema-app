import Text from '@/shared/ui/Text';
import s from './Footer.module.scss';

export default async function Footer() {
  return (
    <footer className={s.footer}>
      <Text color="secondary">© Касич Полина - 2026</Text>
    </footer>
  );
}
