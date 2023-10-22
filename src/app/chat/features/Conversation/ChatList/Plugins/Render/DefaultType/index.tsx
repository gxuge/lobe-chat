import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import dynamic from 'next/dynamic';
import { Suspense, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { usePluginStore } from '@/store/plugin';

import IFrameRender from './IFrameRender';

const SystemJsRender = dynamic(() => import('./SystemJsRender'), { ssr: false });

export interface PluginDefaultTypeProps {
  content: string;
  loading?: boolean;
  name?: string;
}

const PluginDefaultType = memo<PluginDefaultTypeProps>(({ content, name }) => {
  const { t } = useTranslation('plugin');

  const manifest = usePluginStore((s) => s.pluginManifestMap[name || '']);
  let isJSON = true;
  try {
    JSON.parse(content);
  } catch {
    isJSON = false;
  }

  const contentObj = useMemo(() => (isJSON ? JSON.parse(content) : content), [content]);

  if (!isJSON) {
    return (
      <Flexbox gap={8} horizontal>
        <div>
          <Loading3QuartersOutlined spin />
        </div>
        {t('loading.content')}
      </Flexbox>
    );
  }

  if (!manifest?.ui) return;

  const ui = manifest.ui;

  if (!ui.url) return;

  if (ui.mode === 'module')
    return (
      <Suspense fallback={<Skeleton active style={{ width: 300 }} />}>
        <SystemJsRender content={contentObj} name={name || 'unknown'} url={ui.url} />
      </Suspense>
    );

  return (
    <IFrameRender
      content={contentObj}
      height={ui.height}
      name={name || 'unknown'}
      url={ui.url}
      width={ui.width}
    />
  );
});

export default PluginDefaultType;
