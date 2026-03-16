import ProfilePage from '@/_pages/ProfilePage';
import Seo from '@/shared/ui/Seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Личный кабинет | CinemaApp',
  description: 'Управление вашим профилем и настройками',
};

export default async function Profile() {
  return (
    <>
      <Seo
        title="Личный кабинет"
        description="Управляйте своим профилем, настройками и списком избранного."
        noindex
      />
      <ProfilePage />
    </>
  );
}
