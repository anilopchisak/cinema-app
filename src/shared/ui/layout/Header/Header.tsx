'use client';

import BookmarkIcon from '@/shared/ui/icons/BookmarkIcon/BookmarkIcon';
import UserIcon from '@/shared/ui/icons/UserIcon/UserIcon';
import NavigationLink from '@/shared/ui/NavigationLink';
import s from './Header.module.scss';
import { authStore } from '@/entities/auth/model/auth.store';
import { observer } from 'mobx-react-lite';
import { routes } from '@/shared/config/routes';
import Image from 'next/image';

const Header = observer(() => {
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
          <NavigationLink url="/new" className={s.tabLink} activeClassName={s.tabLinkActive}>
            Новинки
          </NavigationLink>
        </nav>

        <div className={s.actions}>
          <NavigationLink
            url={routes.favorites.create()}
            className={s.iconLink}
            activeClassName={s.iconLinkActive}
          >
            <BookmarkIcon />
          </NavigationLink>

          <NavigationLink
            url={authStore.isAuthenticated ? routes.profile.create() : routes.login.create()}
            className={s.iconLink}
            activeClassName={s.iconLinkActive}
          >
            <UserIcon />
          </NavigationLink>
        </div>
      </div>
    </header>
  );
});

export default Header;
