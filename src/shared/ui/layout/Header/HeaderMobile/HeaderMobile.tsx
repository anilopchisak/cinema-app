import NavigationLink from '@/shared/ui/NavigationLink';
import s from './HeaderMobile.module.scss';
import { routes } from '@/shared/config/routes';
import Image from 'next/image';
import RandomVideoButton from '@/features/random-video/ui';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';

type Props = {
  isAuthenticated: boolean;
};

const HeaderMobile = ({ isAuthenticated }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const onNavigate = () => {
    close();
  };

  return (
    <>
      <header className={s.header}>
        <RandomVideoButton />
        <button
          className={s.burgerButton}
          onClick={open}
          aria-label="Открыть меню"
          aria-expanded={isOpen}
        >
          <RxHamburgerMenu className={s.burger} />
        </button>
      </header>

      <div className={cn(s.overlay, { [s.open]: isOpen })} aria-hidden={!isOpen}>
        <div className={s.content}>
          <NavigationLink url={routes.cinema.create()} className={s.logoLink} onClick={onNavigate}>
            <Image
              className={s.logo}
              src="/logo.png"
              alt="Логотип"
              width={250}
              height={150}
              priority
              unoptimized
            />
          </NavigationLink>

          <nav className={s.nav}>
            <NavigationLink
              onClick={onNavigate}
              url={routes.cinema.create()}
              className={s.tabLink}
              activeClassName={s.tabLinkActive}
            >
              Фильмы
            </NavigationLink>

            {isAuthenticated && (
              <NavigationLink
                onClick={onNavigate}
                url={routes.favorites.create()}
                className={s.iconLink}
                activeClassName={s.iconLinkActive}
              >
                Избранное
              </NavigationLink>
            )}

            <NavigationLink
              onClick={onNavigate}
              url={isAuthenticated ? routes.profile.create() : routes.login.create()}
              className={s.iconLink}
              activeClassName={s.iconLinkActive}
            >
              {isAuthenticated ? 'Профиль' : 'Войти'}
            </NavigationLink>
          </nav>

          <div className={s.content}>
            <button className={s.close} onClick={close} aria-label="Закрыть меню">
              <IoCloseOutline className={s.icon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
