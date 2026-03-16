import NavigationLink from '@/shared/ui/NavigationLink';
import s from './HeaderMobile.module.scss';
import { routes } from '@/shared/config/routes';
import Image from 'next/image';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';
import AuthButton from '@/features/auth/ui/AuthButton';

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

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

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
          aria-label="Открыть меню"
          aria-expanded={isOpen}
        >
          <RxHamburgerMenu className={s.burger} />
        </button>
      </header>

      <div className={cn(s.overlay, { [s.open]: isOpen })} aria-hidden={!isOpen}>
        <button className={s.close} onClick={close} aria-label="Закрыть меню">
          <IoCloseOutline className={s.icon} />
        </button>

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

            <AuthButton isAuthenticated={isAuthenticated} onClick={onNavigate} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
