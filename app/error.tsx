'use client';

import Seo from '@/shared/ui/Seo';
import Button from '@/shared/ui/Button';
import Text from '@/shared/ui/Text';
import s from './ErrorPage.module.scss';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <>
      <Seo
        title={`Ошибка ${error || 'на сервере'}`}
        description="Произошла ошибка при загрузке страницы. Попробуйте позже."
        noindex
      />
      <div className={s.errorPage}>
        <div className={s.message}>
          <Text color="primary" view="title" tag="h2">
            Упс! Что-то пошло не так
          </Text>
          <Text color="secondary">Текст ошибки: {error.message}</Text>
        </div>

        <div className={s.actions}>
          <Button onClick={() => reset()}>Попробовать снова</Button>
          <Button styleType="outline" onClick={() => window.location.reload()}>
            Обновить страницу
          </Button>
        </div>
      </div>
    </>
  );
}
