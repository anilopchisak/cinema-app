import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useUpdateQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (updates: Record<string, string | number | string[] | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            newParams.set(key, value.join(','));
          } else {
            newParams.delete(key);
          }
        } else if (value !== null && value !== undefined && value !== '' && value !== 'default') {
          newParams.set(key, String(value));
        } else {
          newParams.delete(key);
        }
      });

      const currentUrl = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      const nextSearch = newParams.toString();
      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;

      if (nextUrl === currentUrl) return;

      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return updateQuery;
};
