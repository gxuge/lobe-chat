import { ConfigProvider } from 'antd';
import Zh_CN from 'antd/locale/zh_CN';
import { PropsWithChildren, memo, useState } from 'react';

import { createI18nNext } from '@/locales/create';
import { useOnFinishHydrationGlobal } from '@/store/global';
import { isOnServerSide } from '@/utils/env';
import { switchLang } from '@/utils/switchLang';

interface LocaleLayoutProps extends PropsWithChildren {
  lang?: string;
}

const InnerLocale = memo<LocaleLayoutProps>(({ children, lang }) => {
  const [i18n] = useState(createI18nNext(lang));

  // if run on server side, init i18n instance everytime
  if (isOnServerSide) {
    i18n.init();
  } else {
    // if on browser side, init i18n instance only once
    if (!i18n.instance.isInitialized)
      // console.debug('locale', lang);
      i18n.init().then(() => {
        // console.debug('inited.');
      });
  }

  useOnFinishHydrationGlobal((s) => {
    if (s.settings.language === 'auto') {
      switchLang('auto');
    }
  }, []);

  return <ConfigProvider locale={Zh_CN}>{children}</ConfigProvider>;
});

// const Locale = memo<LocaleLayoutProps>((props) => (
//   <Suspense fallback={<Loading />}>
//     <InnerLocale {...props} />
//   </Suspense>
// ));

export default InnerLocale;
