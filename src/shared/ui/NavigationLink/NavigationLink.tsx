'use client';

import cn from 'classnames';
import Text from '../Text';
import s from './NavigationLink.module.scss';
import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LinkProps = {
  /** URL для перехода */
  url: string;
  /** Содержимое ссылки (может быть текстом или React-элементом) */
  children: React.ReactNode;
  /** Дополнительный CSS-класс */
  className?: string;
  /** CSS-класс, применяемый когда ссылка активна (текущий путь совпадает с url) */
  activeClassName?: string;
  /** Флаг предзагрузки страницы (по умолчанию true) */
  prefetch?: boolean;
  /** Колбэк при клике на ссылку */
  onClick?: () => void;
};

/** Компонент навигационной ссылки с автоматическим определением активного состояния.
 * Если children является строкой или числом, он автоматически оборачивается в компонент Text.
 */
const NavigationLink = ({
  url,
  children,
  className,
  activeClassName,
  prefetch,
  onClick,
}: LinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  const isTextChild = typeof children === 'string' || typeof children === 'number';

  return (
    <Link
      prefetch={prefetch ?? true}
      href={url}
      className={cn(s.link, className, isActive && activeClassName)}
      onClick={onClick}
    >
      {isTextChild ? <Text color="inherit">{children}</Text> : children}
    </Link>
  );
};

export default NavigationLink;
