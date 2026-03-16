'use client';

import { routes } from '@/shared/config/routes';
import Button from '@/shared/ui/Button';
import NavigationLink from '@/shared/ui/NavigationLink';
import { RxEnter } from 'react-icons/rx';
import s from './AuthButton.module.scss';
import { RxExit } from 'react-icons/rx';
import { authStore } from '@/entities/auth/model/auth.store';
import { observer } from 'mobx-react-lite';

type Props = {
  /** Флаг, авторизован ли пользователь */
  isAuthenticated: boolean;
  /** Опциональный колбэк при клике (для кастомного поведения, например, закрытия меню) */
  onClick?: () => void;
};

/** Кнопка аутентификации: отображает "Войти" для неавторизованных и "Выйти" для авторизованных.
 * При клике на "Выйти" вызывает logout из стора и перезагружает страницу.
 * Обёрнут в observer для реактивности на изменения authStore.
 */
const AuthButton = observer(({ isAuthenticated, onClick }: Props) => {
  const onLogout = () => {
    authStore.logout();
    window.location.reload();
  };

  if (isAuthenticated)
    return (
      <Button styleType="outline" onClick={onLogout}>
        <div className={s.content}>
          <RxExit />
          <span>Выйти</span>
        </div>
      </Button>
    );

  return (
    <NavigationLink onClick={onClick} url={routes.login.create()}>
      <Button styleType="outline">
        <div className={s.content}>
          <RxEnter />
          <span> Войти</span>
        </div>
      </Button>
    </NavigationLink>
  );
});

export default AuthButton;
