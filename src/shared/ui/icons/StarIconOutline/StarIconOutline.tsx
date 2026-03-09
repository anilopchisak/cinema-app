import Icon from '@/shared/ui/icons/Icon';
import type { IconProps } from '@/shared/ui/icons/Icon/Icon.types';
import * as React from 'react';

const StarIconOutline = (props: IconProps) => {
  return (
    <Icon {...props} fill="currentColor">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default StarIconOutline;
