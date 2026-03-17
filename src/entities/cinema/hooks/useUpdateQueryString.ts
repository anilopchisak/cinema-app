import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Хук для обновления query-параметров в URL с обработкой массивов и значений по умолчанию
 * @param updates - объект, где ключ — имя параметра, значение — строка, число, массив строк или undefined.
 * Пустые/неопределенные значения, а также 'default' приводят к удалению параметра.
 */
export const useUpdateQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** Мемоизированная функция обновления query-строки */
  const updateQuery = useCallback(
    (updates: Record<string, string | number | string[] | undefined>) => {
      /** Создаем копию текущих searchParams для мутаций */
      const newParams = new URLSearchParams(searchParams.toString());

      /** Обновляем или удаляем параметры в зависимости от значения */
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

      /** Формируем текущий и следующий URL для сравнения */
      const currentUrl = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      const nextSearch = newParams.toString();
      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;

      /** Проверяем, изменился ли URL, чтобы избежать ненужных ререндеров */
      if (nextUrl === currentUrl) return;

      /** Заменяем URL без прокрутки, чтобы не сбрасывать позицию скролла */
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return updateQuery;
};
