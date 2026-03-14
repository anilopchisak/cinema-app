'use client';

import Text from '@/shared/ui/Text';
import s from './AuthPage.module.scss';
import AuthForm from '@/features/auth/ui/AuthForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/entities/auth/model/auth.store';
import { observer } from 'mobx-react-lite';
import { useAuthFormLogic } from '@/features/auth/model/hooks/useAuthFormLogic';

type Props = {
  mode: 'login' | 'register';
};

const AuthPage = observer(({ mode }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = authStore;

  const { error, handleSubmit, isLoading, isSuccess, isError, clearError } = useAuthFormLogic(mode);

  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      window.location.reload();
    }
  }, [isAuthenticated, router, isSuccess]);

  return (
    <div className={s.container}>
      <Text view="title">{mode === 'login' ? 'Войти' : 'Регистрация'}</Text>

      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isError={isError}
        onFieldChange={clearError}
      />

      <div className={s.errorsWrapper}>
        <Text view="p-18" color="primary">
          {error}
        </Text>
      </div>
    </div>
  );
});

export default AuthPage;
