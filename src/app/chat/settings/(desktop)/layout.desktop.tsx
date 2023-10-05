'use client';

import { PropsWithChildren, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import SafeSpacing from '@/components/SafeSpacing';
import { HEADER_HEIGHT } from '@/const/layoutTokens';

import Header from './Header';

const DesktopLayout = memo<PropsWithChildren>(({ children }) => {
  return (
    <>
      <Header />
      <Flexbox align={'center'} flex={1} gap={16} padding={24} style={{ overflow: 'auto' }}>
        <SafeSpacing height={HEADER_HEIGHT - 16} />
        {children}
      </Flexbox>
    </>
  );
});

export default DesktopLayout;
