import { Bounce, toast, ToastOptions } from 'react-toastify';

type Props = {
  /** Текст уведомления */
  title: string;
  /** Тип уведомления (определяет цвет и иконку) */
  type: 'default' | 'error' | 'warning' | 'success' | 'info';
  /** Время автоматического закрытия в мс (по умолчанию 3000) */
  autoClose?: number;
};

/**
 * Универсальная функция для показа всплывающих уведомлений.
 * Использует react-toastify с предустановленными настройками.
 * @param props - объект с параметрами уведомления
 */
export const message = ({ type, title, autoClose = 3000 }: Props) => {
  const DEFAULT_OPTIONS: ToastOptions = {
    position: 'bottom-left',
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  };

  switch (type) {
    case 'error': {
      toast.error(title, DEFAULT_OPTIONS);
      break;
    }
    case 'warning': {
      toast.warn(title, DEFAULT_OPTIONS);
      break;
    }
    case 'success': {
      toast.success(title, DEFAULT_OPTIONS);
      break;
    }
    case 'info': {
      toast.info(title, DEFAULT_OPTIONS);
      break;
    }
    default: {
      toast(title, DEFAULT_OPTIONS);
      break;
    }
  }
};
