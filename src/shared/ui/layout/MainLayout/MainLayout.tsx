import type { PropsWithChildren } from 'react';
import Container from '../Container';
import Footer from '../Footer';
import Header from '../Header';
import s from './MainLayout.module.scss';
import { cookies } from 'next/headers';

/** Основной макет страницы, включающий шапку, контейнер и подвал.
 * Определяет статус аутентификации на сервере по наличию cookie 'auth_token'
 * и передаёт его в компонент Header.
 */
export default async function MainLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  /** Флаг аутентификации, вычисленный на сервере */
  const isAuthenticated = !!token;

  return (
    <div className={s.wrapper}>
      <Header isAuthenticated={isAuthenticated} />
      <main className={s.main}>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
