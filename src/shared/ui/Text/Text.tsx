import cn from 'classnames';
import * as React from 'react';
import s from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-24' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent' | 'inherit';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text = ({
  className,
  view,
  tag: Tag = 'p',
  weight,
  children,
  color = 'primary',
  maxLines,
}: TextProps) => {
  const textClasses = cn(
    className,
    s.text,
    view && s[view],
    weight && s[weight],
    color && s[color],
    maxLines && s.multiElipsis
  );

  return (
    <Tag className={textClasses} style={{ WebkitLineClamp: maxLines } as React.CSSProperties}>
      {children}
    </Tag>
  );
};

export default Text;
