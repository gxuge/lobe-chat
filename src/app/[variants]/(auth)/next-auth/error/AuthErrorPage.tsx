'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ErrorCapture from '@/components/Error';

enum ErrorEnum {
  AccessDenied = 'AccessDenied',
  Configuration = 'Configuration',
  Default = 'Default',
  Verification = 'Verification',
}

export default memo(() => {
  const { t } = useTranslation('auth');
  const search = useSearchParams();
  const error = search.get('error') as ErrorEnum;

  // 获取友好的错误消息
  const getErrorMessage = (errorType: string): string => {
    const translationKey = `authErrors.${errorType}` as any;
    const translated = t(translationKey, { defaultValue: '' }) as string;

    // 如果没有翻译，返回默认消息
    if (!translated) {
      return t('authErrors.Default');
    }

    return translated;
  };

  const props = {
    error: {
      cause: error,
      message: getErrorMessage(error || 'Default'),
      name: 'NextAuth Error',
    },
    reset: () => signIn(undefined, { callbackUrl: '/' }),
  };
  console.log('[NextAuth] Error:', props.error);
  return <ErrorCapture {...props} />;
});
