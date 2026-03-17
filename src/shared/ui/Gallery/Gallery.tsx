'use client';

import { GalleryImage } from '@/entities/cinema/types/cinema.types';
import s from './Gallery.module.scss';
import Image from 'next/image';
import ArrowRightIcon from '../icons/ArrowRightIcon/ArrowRightIcon';
import { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

interface GalleryProps {
  /** Массив изображений для галереи */
  gallery: GalleryImage[];
  /** Префикс для alt текста (по умолчанию "Кадр из фильма") */
  altPrefix?: string;
  /** Включить автоматическое перелистывание */
  autoPlay?: boolean;
  /** Интервал автоматического перелистывания в мс (по умолчанию 4000) */
  autoPlayInterval?: number;
  /** Дополнительный CSS-класс */
  className?: string;
  /** Отключить кнопки навигации */
  disableButtons?: boolean;
  /** Останавливать автовоспроизведение при наведении мыши */
  pauseOnHover?: boolean;
}

/** Компонент галереи изображений с поддержкой автовоспроизведения и навигации */
const Gallery = ({
  gallery,
  altPrefix = 'Кадр из фильма',
  className = '',
  autoPlay = false,
  autoPlayInterval = 4000,
  disableButtons = false,
  pauseOnHover = true,
}: GalleryProps) => {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const computedAltPrefix = altPrefix === 'Кадр из фильма' ? t('gallery.altPrefix') : altPrefix;

  /** Переключение на следующий слайд */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  }, [gallery.length]);

  /** Переключение на предыдущий слайд */
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }, [gallery.length]);

  /** Управление автовоспроизведением: устанавливаем
   *  или очищаем интервал в зависимости от состояния */
  useEffect(() => {
    if (autoPlay && !isPaused && gallery.length > 1) {
      timerRef.current = setInterval(nextSlide, autoPlayInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, nextSlide, isPaused, gallery.length]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div
      className={cn(s.wrapper, className)}
      {...(pauseOnHover
        ? {
            onMouseEnter: () => setIsPaused(true),
            onMouseLeave: () => setIsPaused(false),
          }
        : {})}
    >
      <div className={s.container}>
        {gallery.map((img, index) => (
          <div
            key={img.documentId}
            className={`${s.slide} ${index === currentIndex ? s.active : ''}`}
          >
            <Image
              src={img.formats.large?.url || img.url}
              alt={img.alternativeText || `${computedAltPrefix} ${index + 1}`}
              fill
              priority={index === 0}
              className={s.image}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        ))}

        {!disableButtons && (
          <button
            className={`${s.navBtn} ${s.prev}`}
            onClick={prevSlide}
            aria-label={t('a11y.previousSlide')}
          >
            <ArrowRightIcon className={s.iconPrev} />
          </button>
        )}

        {!disableButtons && (
          <button
            className={`${s.navBtn} ${s.next}`}
            onClick={nextSlide}
            aria-label={t('a11y.nextSlide')}
          >
            <ArrowRightIcon className={s.iconNext} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Gallery;
