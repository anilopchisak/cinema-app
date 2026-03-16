'use client';

import { useRouter } from 'next/navigation';
import s from './ProfilePage.module.scss';
import { routes } from '@/shared/config/routes';
import { authStore } from '@/entities/auth/model/auth.store';
import Text from '@/shared/ui/Text';
import Button from '@/shared/ui/Button';
import Transition from '@/shared/ui/Transition';

export default function ProfilePage() {
  const router = useRouter();

  const onLogout = () => {
    authStore.logout();
    router.replace(routes.cinema.create());
    window.location.reload();
  };

  return (
    <Transition>
      <div className={s.container}>
        <Text view="p-24" weight="bold">
          Личный кабинет
        </Text>
        <Button className={s.button} styleType="outline" onClick={onLogout}>
          Выйти
        </Button>
      </div>
    </Transition>
  );
}
