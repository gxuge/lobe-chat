import { LobeHubProps } from '@lobehub/ui/brand';
import { memo } from 'react';

interface ProductLogoProps extends LobeHubProps {
  height?: number;
  width?: number;
}

export const ProductLogo = memo<ProductLogoProps>(function ProductLogo() {
  // Hidden: LobeHub logo
  return null;
});
