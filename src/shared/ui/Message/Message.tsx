'use client';

import { Bounce, ToastContainer } from 'react-toastify';

/** Компонент-обёртка для ToastContainer,
 * настраивающий глобальные уведомления (позиция, тема, анимация) */
const Message = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  );
};

export default Message;
