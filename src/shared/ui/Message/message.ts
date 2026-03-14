import { Bounce, toast, ToastOptions } from 'react-toastify';

type Props = {
  title: string;
  type: 'default' | 'error' | 'warning' | 'success' | 'info';
  autoClose?: number;
};

export const message = ({ type, title, autoClose = 3000 }: Props) => {
  const DEFAULT_OPTIONS: ToastOptions = {
    position: 'bottom-right',
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
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
