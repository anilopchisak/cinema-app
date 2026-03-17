import type { TextProps } from '@/shared/ui/Text/Text';
import Text from '@/shared/ui/Text/Text';
import cn from 'classnames';
import React from 'react';
import s from './FilmMeta.module.scss';

interface FilmMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Массив строк, которые будут отображены через разделитель */
  items: string[];
  /** Разделитель между элементами (по умолчанию '•') */
  separator?: string;
  /** Отступ между элементами в пикселях (по умолчанию 12) */
  gap?: number;
  /** Дополнительные пропсы для компонента Text, применяемые ко всем элементам */
  textProps?: Partial<TextProps>;
}

const defaultTextProps: Partial<TextProps> = {
  view: 'p-16',
  color: 'primary',
  tag: 'span',
};

/** Компонент для отображения мета-информации с разделителями */
const FilmMeta = ({ items, separator = '•', gap = 12, textProps, className }: FilmMetaProps) => {
  const mergedTextProps = { ...defaultTextProps, ...textProps };

  return (
    <div
      className={cn(s.container, className)}
      style={{ '--gap': `${gap}px` } as React.CSSProperties}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Text {...mergedTextProps}>{item}</Text>
          {items.length !== index + 1 && <Text {...mergedTextProps}>{separator}</Text>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FilmMeta;
