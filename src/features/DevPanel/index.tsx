'use client';

import { BookText, Cog, DatabaseIcon, FlagIcon, GlobeLockIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import FeatureFlagViewer from './FeatureFlagViewer';
import MetadataViewer from './MetadataViewer';
import PostgresViewer from './PostgresViewer';
import SystemInspector from './SystemInspector';

const FloatPanel = dynamic(() => import('./features/FloatPanel'), {
  ssr: false,
});

// Dynamic import to avoid bundling Server Component in client
const CacheViewer = dynamic(() => import('./CacheViewer'), {
  ssr: true,
});

const DevPanel = () => (
  <FloatPanel
    items={[
      {
        children: <PostgresViewer />,
        icon: <DatabaseIcon size={16} />,
        key: 'Postgres Viewer',
      },
      {
        children: <MetadataViewer />,
        icon: <BookText size={16} />,
        key: 'SEO Metadata',
      },
      {
        children: (
          <Suspense fallback={<div>Loading cache...</div>}>
            <CacheViewer />
          </Suspense>
        ),
        icon: <GlobeLockIcon size={16} />,
        key: 'NextJS Caches',
      },
      {
        children: <FeatureFlagViewer />,
        icon: <FlagIcon size={16} />,
        key: 'Feature Flags',
      },
      {
        children: <SystemInspector />,
        icon: <Cog size={16} />,
        key: 'System Status',
      },
    ]}
  />
);

export default DevPanel;
