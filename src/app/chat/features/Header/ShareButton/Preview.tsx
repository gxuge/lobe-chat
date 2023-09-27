import { SiOpenai } from '@icons-pack/react-simple-icons';
import { Avatar, ChatHeaderTitle, Logo, Markdown, Tag } from '@lobehub/ui';
import { Button, SegmentedProps } from 'antd';
import dayjs from 'dayjs';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import pkg from '@/../package.json';
import ChatList from '@/app/chat/features/Conversation/ChatList';
import PluginTag from '@/app/chat/features/Header/PluginTag';
import { useSessionStore } from '@/store/session';
import { agentSelectors } from '@/store/session/slices/agentConfig';
import { sessionSelectors } from '@/store/session/slices/session/selectors';

import { useStyles } from './style';

export enum ImageType {
  JPG = 'jpg',
  PNG = 'png',
  SVG = 'svg',
}

export const imageTypeOptions: SegmentedProps['options'] = [
  {
    label: 'JPG',
    value: ImageType.JPG,
  },
  {
    label: 'PNG',
    value: ImageType.PNG,
  },
  {
    label: 'SVG',
    value: ImageType.SVG,
  },
];

interface PreviewProps {
  imageType: ImageType;
  withBackground: boolean;
  withFooter: boolean;
  withSystemRole: boolean;
}

const Preview = memo<PreviewProps>(({ withSystemRole, imageType, withBackground, withFooter }) => {
  const [loading, setLoading] = useState(false);
  const [isInbox, title, description, avatar, backgroundColor, model, plugins, systemRole] =
    useSessionStore((s) => [
      sessionSelectors.isInboxSession(s),
      agentSelectors.currentAgentTitle(s),
      agentSelectors.currentAgentDescription(s),
      agentSelectors.currentAgentAvatar(s),
      agentSelectors.currentAgentBackgroundColor(s),
      agentSelectors.currentAgentModel(s),
      agentSelectors.currentAgentPlugins(s),
      agentSelectors.currentAgentSystemRole(s),
    ]);
  const { t } = useTranslation('common');
  const { styles } = useStyles(withBackground);

  const displayTitle = isInbox ? t('inbox.title') : title;
  const displayDesc = isInbox ? t('inbox.desc') : description;

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      let screenshotFn: any;
      switch (imageType) {
        case ImageType.JPG: {
          screenshotFn = toJpeg;
          break;
        }
        case ImageType.PNG: {
          screenshotFn = toPng;
          break;
        }
        case ImageType.SVG: {
          screenshotFn = toSvg;
          break;
        }
      }
      const dataUrl = await screenshotFn(document.querySelector('#preview') as HTMLDivElement);
      const link = document.createElement('a');
      link.download = `LobeChat_${title}_${dayjs().format('YYYY-MM-DD')}.${imageType}`;
      link.href = dataUrl;
      link.click();
      setLoading(false);
    } catch {
      console.error('Failed to download image');
      setLoading(false);
    }
  }, [imageType, title]);

  return (
    <>
      <div className={styles.preview}>
        <div className={withBackground ? styles.background : undefined} id={'preview'}>
          <Flexbox className={styles.container} gap={16}>
            <div className={styles.header}>
              <Flexbox align={'flex-start'} gap={12} horizontal>
                <Avatar avatar={avatar} background={backgroundColor} size={40} title={title} />
                <ChatHeaderTitle
                  desc={displayDesc}
                  tag={
                    <>
                      <Tag icon={<SiOpenai size={'1em'} />}>{model}</Tag>
                      {plugins?.length > 0 && <PluginTag plugins={plugins} />}
                    </>
                  }
                  title={displayTitle}
                />
              </Flexbox>
              {withSystemRole && systemRole && (
                <div className={styles.role}>
                  <Markdown>{systemRole}</Markdown>
                </div>
              )}
            </div>
            <ChatList />
            {withFooter ? (
              <Flexbox align={'center'} className={styles.footer} gap={4}>
                <Logo extra={'chat'} type={'combine'} />
                <div className={styles.url}>{pkg.homepage}</div>
              </Flexbox>
            ) : (
              <div />
            )}
          </Flexbox>
        </div>
      </div>
      <Button block loading={loading} onClick={handleDownload} size={'large'} type={'primary'}>
        {t('shareModal.download')}
      </Button>
    </>
  );
});

export default Preview;
