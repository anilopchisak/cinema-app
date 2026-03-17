import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  /** Флаг загрузки: если true, отображается skeleton, иначе children */
  isLoading: boolean;
  /** Компонент-заглушка (скелетон), показываемый во время загрузки */
  skeleton: ReactNode;
  /** Основной контент, отображаемый после завершения загрузки */
  children: ReactNode;
};

/** Компонент для плавного переключения между загрузочным скелетоном и основным контентом.
 * Использует AnimatePresence с mode="wait", чтобы анимация выхода одного элемента
 * завершалась до появления следующего. Ключи ('skeleton'/'content') обеспечивают
 * правильную идентификацию элементов для анимации.
 */
export default function ComponentTransition({ isLoading, skeleton, children }: Props) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {skeleton}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
