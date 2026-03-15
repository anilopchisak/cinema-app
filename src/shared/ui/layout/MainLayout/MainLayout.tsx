import type { PropsWithChildren } from 'react';
import Container from '../Container';
import Footer from '../Footer';
import Header from '../Header';
import s from './MainLayout.module.scss';
import { cookies } from 'next/headers';

export default async function MainLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
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
