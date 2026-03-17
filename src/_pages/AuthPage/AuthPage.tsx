'use client';

import Text from '@/shared/ui/Text';
import s from './AuthPage.module.scss';
import AuthForm from '@/features/auth/ui/AuthForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/entities/auth/model/auth.store';
import { observer } from 'mobx-react-lite';
import { useAuthFormLogic } from '@/features/auth/model/hooks/useAuthFormLogic';
import { message } from '@/shared/ui/Message';
import Transition from '@/shared/ui/Transition';
import { useTranslation } from 'react-i18next';

type Props = {
  /** Режим страницы: 'login' для входа, 'register' для регистрации */
  mode: 'login' | 'register';
};

/** Страница аутентификации (вход/регистрация) с формой и редиректом после успеха */
const AuthPage = observer(({ mode }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = authStore;
  const { t } = useTranslation('common');

  /** Хук, управляющий логикой формы: отправка, состояние загрузки, ошибки */
  const { handleSubmit, isLoading, isSuccess, isError, clearError } = useAuthFormLogic(mode);

  /** При успешной аутентификации показываем сообщение и перезагружаем страницу
   * (чтобы обновить состояние приложения, например, шапку с пользователем).
   * Таймаут нужен, чтобы пользователь успел увидеть уведомление.
   */
  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      const timeout = 1000;
      message({ type: 'success', title: t('auth.successLogin'), autoClose: timeout });

      const reloadTimeout = setTimeout(() => {
        window.location.reload();
      }, timeout);

      return () => clearTimeout(reloadTimeout);
    }
  }, [isAuthenticated, router, isSuccess]);

  return (
    <Transition>
      <div className={s.container}>
        <Text view="title">
          {mode === 'login' ? t('auth.login') : t('auth.register')}
        </Text>

        <AuthForm
          mode={mode}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isError={isError}
          onFieldChange={clearError}
        />
      </div>
    </Transition>
  );
});

export default AuthPage;
