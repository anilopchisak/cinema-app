import React, { useEffect } from 'react';

interface InfiniteScrollProps {
  /** ref элемента, который отслеживаем */
  targetRef: React.RefObject<Element | null>;
  /** ref scroll-контейнера (если нужен кастомный root) */
  rootRef?: React.RefObject<Element | null>;
  /** можно ли сейчас триггерить подгрузку */
  enabled?: boolean;
  /** есть ли следующая страница */
  hasNextPage?: boolean;
  /** идет ли загрузка */
  isFetching?: boolean;
  /** callback подгрузки */
  onLoadMore: () => void;
  /** настройки observer */
  threshold?: number;
  rootMargin?: string;
}

const useInfiniteScroll = ({
  targetRef,
  rootRef,
  enabled = true,
  hasNextPage = true,
  isFetching = false,
  onLoadMore,
  threshold = 1,
  rootMargin = '0px',
}: InfiniteScrollProps) => {
  useEffect(() => {
    if (!enabled) return;
    if (!hasNextPage) return;
    if (!targetRef) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && !isFetching) {
          onLoadMore?.();
        }
      },
      {
        root: rootRef?.current ?? null,
        threshold,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, hasNextPage, isFetching, onLoadMore, threshold, rootMargin]);
};

export default useInfiniteScroll;
