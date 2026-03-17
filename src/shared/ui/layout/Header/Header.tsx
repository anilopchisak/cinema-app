'use client';

import BookmarkIcon from '@/shared/ui/icons/BookmarkIcon/BookmarkIcon';
import NavigationLink from '@/shared/ui/NavigationLink';
import s from './Header.module.scss';
import { routes } from '@/shared/config/routes';
import Image from 'next/image';
import HeaderMobile from './HeaderMobile';
import AuthButton from '@/features/auth/ui/AuthButton';
import { useTranslation } from 'react-i18next';
import LocaleDropdown from '@/features/change-locale/LocaleDropdown';

type Props = {
  /** Флаг, авторизован ли пользователь */
  isAuthenticated: boolean;
};

/**
 * Основной заголовок сайта (десктопная версия).
 * При переходе на мобильное разрешение (max-width: 767) заменяется на HeaderMobile.
 *
 * Использует useMediaQuery с гидратацией (isMounted),
 * чтобы избежать несоответствия серверного/клиентского рендера.
 */
const Header = ({ isAuthenticated }: Props) => {
  const { t } = useTranslation('common');

  return (
    <>
      <div className={s.mobileOnly}>
        <HeaderMobile isAuthenticated={isAuthenticated} />
      </div>

      <div className={s.desktopOnly}>
        <header className={s.header}>
          <div className={s.content}>
            <NavigationLink url={routes.cinema.create()} className={s.logoLink}>
              <Image
                className={s.logo}
                src="/logo.png"
                alt={t('ui.logoAlt')}
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
                {t('nav.films')}
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

              <LocaleDropdown />

              <AuthButton isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
