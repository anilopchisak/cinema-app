'use client';

import Text from '@/shared/ui/Text';
import s from './AuthPage.module.scss';
import AuthForm from '@/features/auth/ui/AuthForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/entities/auth/model/auth.store';
import { routes } from '@/shared/config/routes';
import { observer } from 'mobx-react-lite';
import { useAuthFormLogic } from '@/features/auth/model/hooks/useAuthFormLogic';

type Props = {
  mode: 'login' | 'register';
};

const AuthPage = observer(({ mode }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = authStore;

  const { errors, handleSubmit, isLoading, isSuccess } = useAuthFormLogic(mode);

  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      window.location.reload();
      // router.push(routes.profile.create());
    }
  }, [isAuthenticated, router, isSuccess]);

  return (
    <div className={s.container}>
      <Text view="title">{mode === 'login' ? 'Войти' : 'Регистрация'}</Text>

      <AuthForm
        mode={mode}
        onLogin={handleSubmit}
        onRegister={handleSubmit}
        isLoading={isLoading}
      />

      {errors.length > 0 && (
        <div className={s.errorsWrapper}>
          {errors.map((err, i) => (
            <Text key={i} view="p-18" color="primary">
              {err}
            </Text>
          ))}
        </div>
      )}
    </div>
  );
});

export default AuthPage;
