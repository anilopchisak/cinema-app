import Icon from '@/shared/ui/icons/Icon';
import type { IconProps } from '@/shared/ui/icons/Icon/Icon.types';
import * as React from 'react';

const CheckIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M4 11.6129L9.87755 18L20 7" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
