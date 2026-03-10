import s from './Header.module.scss';
import { routes } from '@/shared/config/routes';
import NavigationLink from '../../NavigationLink';
import Image from 'next/image';
import BookmarkIcon from '../../icons/BookmarkIcon/BookmarkIcon';
import UserIcon from '../../icons/UserIcon/UserIcon';

export default async function Header() {
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
          {/* <NavigationLink
            url={routes.cinemaDetails.create('1')}
            className={s.tabLink}
            activeClassName={s.tabLinkActive}
          >
            Один фильм
          </NavigationLink> */}
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
            url={routes.login.create()}
            className={s.iconLink}
            activeClassName={s.iconLinkActive}
          >
            <UserIcon />
          </NavigationLink>
        </div>
      </div>
    </header>
  );
}
