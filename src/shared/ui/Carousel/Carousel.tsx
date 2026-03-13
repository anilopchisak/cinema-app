import { GalleryImage } from '@/entities/cinema/types/cinema.types';
import s from './Carousel.module.scss';
import ArrowRightIcon from '../icons/ArrowRightIcon/ArrowRightIcon';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  gallery: GalleryImage[];
  autoplay?: boolean;
  autoplayInterval?: number;
};

const Carousel = ({ gallery, autoplay = true, autoplayInterval = 3000 }: Props) => {};

export default Carousel;
