'use client';

import BookmarkIcon from '@/shared/ui/icons/BookmarkIcon/BookmarkIcon';
import NavigationLink from '@/shared/ui/NavigationLink';
import s from './Header.module.scss';
import { routes } from '@/shared/config/routes';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from './HeaderMobile';
import { useEffect, useState } from 'react';
import AuthButton from '@/features/auth/ui/AuthButton';
import { breakpoints } from '@/shared/consts/breakpoints.consts';

type Props = {
  /** Флаг, авторизован ли пользователь */
  isAuthenticated: boolean;
};

/** Основной заголовок сайта (десктопная версия).
 * При переходе на мобильное разрешение (max-width: 767) заменяется на HeaderMobile.
 *
 * Использует useMediaQuery с гидратацией (isMounted),
 * чтобы избежать несоответствия серверного/клиентского рендера.
 */
const Header = ({ isAuthenticated }: Props) => {
  const mediaIsMobile = useMediaQuery({ maxWidth: breakpoints.tablet });

  const [isMounted, setIsMounted] = useState(false);
  const isMobile = isMounted ? mediaIsMobile : false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMobile) {
    return <HeaderMobile isAuthenticated={isAuthenticated} />;
  }

  return (
    <header className={s.header}>
      <div className={s.content}>
        <NavigationLink url={routes.cinema.create()} className={s.logoLink}>
          <Image
            className={s.logo}
            src="/logo.png"
            alt="Логотип"
            width={100}
            height={50}
            priority
            unoptimized
          />
        </NavigationLink>

        <nav className={s.nav}>
          <NavigationLink
            url={routes.cinema.create()}
            className={s.tabLink}
            activeClassName={s.tabLinkActive}
          >
            Фильмы
          </NavigationLink>
        </nav>

        <div className={s.actions}>
          {isAuthenticated && (
            <NavigationLink
              url={routes.favorites.create()}
              className={s.iconLink}
              activeClassName={s.iconLinkActive}
            >
              <BookmarkIcon />
            </NavigationLink>
          )}

          <AuthButton isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
};

export default Header;
