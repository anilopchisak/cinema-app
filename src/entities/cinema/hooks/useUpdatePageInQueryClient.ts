import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useUpdatePageInQueryClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

