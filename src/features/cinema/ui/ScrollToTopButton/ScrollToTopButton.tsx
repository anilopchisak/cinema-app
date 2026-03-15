'use client';

import ArrowDownIcon from '@/shared/ui/icons/ArrowDownIcon/ArrowDownIcon';
import { useEffect, useState } from 'react';
import s from './ScrollToTopButton.module.scss';
import cn from 'classnames';

const SCROLL_THRESHOLD = 300;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={cn(s.button, { [s.active]: isVisible })}
      onClick={scrollToTop}
      aria-label="Прокрутить вверх"
      title="Наверх"
    >
      <ArrowDownIcon className={s.icon} />
    </button>
  );
};

export default ScrollToTopButton;
