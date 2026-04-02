import AuthPage from '@/_pages/AuthPage/AuthPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Регистрация | CinemaКино',
    description:
      'Войдите или зарегистрируйтесь, чтобы добавлять фильмы в избранное и получать персональные рекомендации.',
    robots: 'noindex',
  };
}

export default function Login() {
  return (
    <>
      <AuthPage mode="register" />
    </>
  );
}
