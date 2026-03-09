import type { PropsWithChildren } from 'react';
import s from './Container.module.scss';

type ContainerProps = PropsWithChildren;

const Container = ({ children }: ContainerProps) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
