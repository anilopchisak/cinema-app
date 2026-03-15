'use client';

import { easeInOut, motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Transition({ children }: Props) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: easeInOut, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
