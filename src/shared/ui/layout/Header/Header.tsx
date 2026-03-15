'use client';

import BookmarkIcon from '@/shared/ui/icons/BookmarkIcon/BookmarkIcon';
import UserIcon from '@/shared/ui/icons/UserIcon/UserIcon';
import NavigationLink from '@/shared/ui/NavigationLink';
import s from './Header.module.scss';
import { routes } from '@/shared/config/routes';
import Image from 'next/image';
import RandomVideoButton from '@/features/random-video/ui/RandomVideoButton';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from './HeaderMobile';
import { useEffect, useState } from 'react';

type Props = {
  isAuthenticated: boolean;
};

const Header = ({ isAuthenticated }: Props) => {
  const mediaIsMobile = useMediaQuery({ maxWidth: 767 });

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

        <div>
          <RandomVideoButton />
        </div>

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

          <NavigationLink
            url={isAuthenticated ? routes.profile.create() : routes.login.create()}
            className={s.iconLink}
            activeClassName={s.iconLinkActive}
          >
            <UserIcon />
          </NavigationLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
