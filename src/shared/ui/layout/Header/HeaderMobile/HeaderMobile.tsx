'use client';

import NavigationLink from '@/shared/ui/NavigationLink';
import s from './HeaderMobile.module.scss';
import { routes } from '@/shared/config/routes';
import Image from 'next/image';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';
import AuthButton from '@/features/auth/ui/AuthButton';
import LocaleDropdown from '@/features/change-locale/LocaleDropdown';

type Props = {
  /** Флаг, авторизован ли пользователь */
  isAuthenticated: boolean;
};

/** Мобильная версия заголовка с выдвигающимся меню (бургер).
 * При открытии блокирует прокрутку body.
 */
const HeaderMobile = ({ isAuthenticated }: Props) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const burgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const open = () => setIsOpen(true);
  const close = () => {
    // Prevent aria-hidden/inert issues by removing focus from menu elements before hiding.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setIsOpen(false);

    // Return focus back to the burger button for accessibility.
    requestAnimationFrame(() => burgerButtonRef.current?.focus());
  };

  /** Блокировка прокрутки при открытом меню */
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

  // Make the overlay unfocusable when closed (prevents tabbing into hidden content).
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (isOpen) {
      el.removeAttribute('inert');
    } else {
      el.setAttribute('inert', '');
    }
  }, [isOpen]);

  /** Закрытие меню после навигации */
  const onNavigate = () => {
    close();
  };

  return (
    <>
      <header className={s.header}>
        <button
          className={s.burgerButton}
          onClick={open}
          ref={burgerButtonRef}
          aria-label={t('a11y.openMenu')}
          aria-expanded={isOpen}
        >
          <RxHamburgerMenu className={s.burger} />
        </button>
      </header>

      <div
        ref={overlayRef}
        className={cn(s.overlay, { [s.open]: isOpen })}
        role="dialog"
        aria-modal={isOpen}
      >
        <button className={s.close} onClick={close} aria-label={t('a11y.closeMenu')}>
          <IoCloseOutline className={s.icon} />
        </button>

        <div className={s.content}>
          <NavigationLink url={routes.cinema.create()} className={s.logoLink} onClick={onNavigate}>
            <Image
              className={s.logo}
              src="/logo.png"
              alt={t('ui.logoAlt')}
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
              {t('nav.films')}
            </NavigationLink>

            {isAuthenticated && (
              <NavigationLink
                onClick={onNavigate}
                url={routes.favorites.create()}
                className={s.iconLink}
                activeClassName={s.iconLinkActive}
              >
                {t('nav.favorites')}
              </NavigationLink>
            )}
          </nav>

          <div className={s.nav}>
            <AuthButton isAuthenticated={isAuthenticated} onClick={onNavigate} />
            <LocaleDropdown />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
