'use client';

import cn from 'classnames';
import Text from '../Text';
import s from './NavigationLink.module.scss';
import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LinkProps = {
  url: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  prefetch?: boolean;
  onClick?: () => void;
};

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
