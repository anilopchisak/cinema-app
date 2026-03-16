import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Хук для обновления параметра 'page' в URL без перезагрузки страницы.
 * Используется для синхронизации номера страницы при бесконечной подгрузке.
 */
export const useUpdatePageInQueryClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Функция, устанавливающая номер страницы в query-строке.
   * При page > 1 добавляет параметр 'page', иначе удаляет его.
   * Изменение URL происходит через history.replaceState (без перезагрузки).
   */
  const updatePage = useCallback(
    (page: number) => {
      if (typeof window === 'undefined') return;

      const newParams = new URLSearchParams(searchParams.toString());

      if (page > 1) {
        newParams.set('page', String(page));
      } else {
        newParams.delete('page');
      }

      const nextSearch = newParams.toString();
      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;

      const currentSearch = window.location.search.startsWith('?')
        ? window.location.search.slice(1)
        : window.location.search;
      const currentUrl = currentSearch ? `${pathname}?${currentSearch}` : pathname;

      if (nextUrl === currentUrl) return;

      window.history.replaceState(null, '', nextUrl);
    },
    [pathname, searchParams]
  );

  return updatePage;
};
