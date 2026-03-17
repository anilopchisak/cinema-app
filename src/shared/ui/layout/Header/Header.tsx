'use client';

import BookmarkIcon from '@/shared/ui/icons/BookmarkIcon/BookmarkIcon';
import NavigationLink from '@/shared/ui/NavigationLink';
import s from './Header.module.scss';
import { routes } from '@/shared/config/routes';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from './HeaderMobile';
import { useMemo, useState } from 'react';
import AuthButton from '@/features/auth/ui/AuthButton';
import { breakpoints } from '@/shared/consts/breakpoints.consts';
import MultiDropdown, { type Option } from '@/shared/ui/MultiDropdown';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation('common');

  const mediaIsMobile = useMediaQuery({ maxWidth: breakpoints.tablet });
  const isMobile = mediaIsMobile;

  const languageOptions: Option[] = useMemo(
    () => [
      { key: 'ru', value: 'Русский' },
      { key: 'en', value: 'English' },
    ],
    []
  );

  const [selectedLanguage, setSelectedLanguage] = useState<Option[]>(() => {
    const current = i18n.language?.split('-')[0] || 'ru';
    const found = languageOptions.find((o) => o.key === current);
    return found ? [found] : [languageOptions[0]];
  });

  const handleChangeLanguage = (value: Option[]) => {
    setSelectedLanguage(value);
    const nextLocale = value[0]?.key;

    if (!nextLocale) return;

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 30}`;
    void i18n.changeLanguage(nextLocale);
  };

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

          <MultiDropdown
            options={languageOptions}
            value={selectedLanguage}
            onChange={handleChangeLanguage}
            getTitle={(value) => value[0]?.value ?? t('ui.language')}
            isMultiple={false}
          />

          <AuthButton isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
};

export default Header;
