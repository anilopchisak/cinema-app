'use client';

import s from './Modal.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

const ANIMATION_DURATION = 300;

const Modal = ({ isOpen, onClose, children, className = '' }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      const timer = setTimeout(() => setAnimate(true), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShow(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className={cn(s.overlay, { [s.open]: animate })}>
      <div className={s.backdrop} onClick={onClose} />

      <div
        className={cn(s.content, { [s.open]: animate }, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
