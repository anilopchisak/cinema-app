import AuthPage from '@/_pages/AuthPage/AuthPage';
import Seo from '@/shared/ui/Seo';

export default function Login() {
  return (
    <>
      <Seo
        title="Вход"
        description="Войдите или зарегистрируйтесь, чтобы добавлять фильмы в избранное и получать персональные рекомендации."
        noindex
      />
      <AuthPage mode="login" />
    </>
  );
}
