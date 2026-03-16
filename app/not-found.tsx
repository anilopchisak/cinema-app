import Button from '@/shared/ui/Button';
import Text from '@/shared/ui/Text';
import s from './NotFoundPage.module.scss';
import { routes } from '@/shared/config/routes';
import Link from 'next/link';
import Seo from '@/shared/ui/Seo';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Страница не найдена"
        description="К сожалению, запрашиваемая страница не существует. Вернитесь на главную."
        noindex
      />
      <div className={s.notFoundPage}>
        <div className={s.message}>
          <Text color="primary" view="title">
            404 - Страница не найдена :(
          </Text>
        </div>

        <div className={s.actions}>
          <Link href={routes.cinema.create()}>
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
