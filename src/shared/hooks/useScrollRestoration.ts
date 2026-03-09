import { useEffect, useRef } from 'react';

type ScrollRestorationProps = {
  /** Ключ, по которому в sessionStorage будет доступно положение скролла */
  storageKey: string;
  /** Флаг готовности страницы к восстановлению скролла (все зависимые данные загрузились) */
  isReadyToRestore: boolean;
  /** Включена ли логика сохранения/восстановления (по умолчанию true) */
  enabled?: boolean;
};

/**
 * Хук для сохранения и восстановления позиции скролла страницы.
 * - Сохраняет scrollY в sessionStorage перед перезагрузкой/уходом со страницы.
 * - Восстанавливает сохранённую позицию после того, как страница будет готова (isReadyToRestore = true).
 */
const useScrollRestoration = ({
  storageKey,
  isReadyToRestore,
  enabled = true,
}: ScrollRestorationProps) => {
  /** Флаг, предотвращающий повторное восстановление скролла */
  const hasRestored = useRef(false);

  /** Восстановление положения скролла */
  useEffect(() => {
    if (!enabled || !isReadyToRestore) return;
    if (hasRestored.current) return;

    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return;

    const target = Number(raw);
    if (!target) return;

    /**
     * Используется requestAnimationFrame, чтобы восстановление произошло
     * после завершения текущего цикла рендера и браузер успел рассчитать
     * окончательную высоту страницы.
     */
    let frameId: number | null = null;

    const restore = () => {
      window.scrollTo({
        top: target,
        behavior: 'auto',
      });
      hasRestored.current = true;
    };

    // Запускаем восстановление в следующем кадре анимации
    frameId = window.requestAnimationFrame(() => {
      restore();
    });

    // Если эффект будет прерван (например, компонент размонтируется до завершения кадра),
    // отменяем запланированную операцию.
    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [enabled, isReadyToRestore, storageKey]);

  /** Сохранение скролла перед уходом со страницы */
  useEffect(() => {
    if (!enabled) return;

    /** Сохраняет текущеее положение скролла в sessionStorage */
    const saveScrollPosition = () => {
      sessionStorage.setItem(storageKey, String(window.scrollY));
    };

    // Подписываемся на событие beforeunload — оно срабатывает при перезагрузке или закрытии страницы.
    // [] - сейчас сохраняется даже если мы походили по разным роутам
    // [] - доделать? сохранение только если перезагрузка или предыдущая страница /cinema/:documentId
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [enabled, storageKey]);
};

export default useScrollRestoration;
