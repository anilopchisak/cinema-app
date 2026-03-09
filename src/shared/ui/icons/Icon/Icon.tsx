import type { IconProps } from '@/shared/ui/icons/Icon/Icon.types';
import cn from 'classnames';
import * as React from 'react';
import s from './Icon.module.scss';

const Icon = ({
  className,
  color,
  children,
  height = 24,
  width = 24,
  ...props
}: React.PropsWithChildren<IconProps>) => {
  const iconClasses = cn(s.icon, color && s[color], className);

  return (
    <svg
      {...props}
      className={iconClasses}
      height={height}
      width={width}
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default Icon;
