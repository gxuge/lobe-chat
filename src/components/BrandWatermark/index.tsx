'use client';

import { memo } from 'react';
import { FlexboxProps } from 'react-layout-kit';

const BrandWatermark = memo<Omit<FlexboxProps, 'children'>>(function BrandWatermark() {
  // Hidden: LobeHub branding
  return null;
});

export default BrandWatermark;
