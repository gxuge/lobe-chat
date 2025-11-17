'use client';

import { BRANDING_NAME } from '@lobechat/const';
import { Button, Text } from '@lobehub/ui';
import { Flex, Skeleton, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthIcons from '@/components/NextAuth/AuthIcons';
import { useUserStore } from '@/store/user';

import CredentialsForm from './CredentialsForm';

const useStyles = createStyles(({ css, token }) => ({
  button: css`
    text-transform: capitalize;
  `,
  container: css`
    width: 100%;
    min-width: 320px;
    max-width: 480px;
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadiusLG}px;

    background: ${token.colorBgContainer};
    box-shadow: 0 0 0 1px ${token.colorBorderSecondary};

    @media (max-width: 768px) {
      width: calc(100vw - 2rem);
      min-width: unset;
      max-width: calc(100vw - 2rem);
      margin: 1rem;
    }
  `,
  contentCard: css`
    padding-block: 2.5rem;
    padding-inline: 2rem;

    @media (max-width: 768px) {
      padding-block: 1.5rem;
      padding-inline: 1.5rem;
    }
  `,
  description: css`
    margin: 0;
    color: ${token.colorTextSecondary};
  `,
  footer: css`
    padding: 1rem;
    border-block-start: 1px solid ${token.colorBorder};
    border-radius: 0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px;

    color: ${token.colorTextDescription};

    background: ${token.colorBgElevated};

    @media (max-width: 768px) {
      padding: 0.75rem;
    }
  `,
  footerBrand: css`
    justify-content: center;
    height: 100%;

    @media (min-width: 576px) {
      justify-content: flex-start;
    }
  `,
  footerLinks: css`
    justify-content: center;

    @media (min-width: 576px) {
      justify-content: flex-end;
    }
  `,
  link: css`
    cursor: pointer;
    color: ${token.colorPrimary};

    &:hover {
      color: ${token.colorPrimaryHover};
    }
  `,
  linkHint: css`
    font-size: ${token.fontSizeSM}px;
  `,
  text: css`
    text-align: center;
  `,
  title: css`
    margin: 0;
    color: ${token.colorTextHeading};

    @media (max-width: 768px) {
      font-size: ${token.fontSizeLG}px;
    }
  `,
}));

const BtnListLoading = memo(() => {
  return (
    <Flex gap={'small'} vertical>
      <Skeleton.Button active style={{ minWidth: 300 }} />
      <Skeleton.Button active style={{ minWidth: 300 }} />
      <Skeleton.Button active style={{ minWidth: 300 }} />
    </Flex>
  );
});

/**
 * Follow the implementation from AuthJS official documentation,
 * but using client components.
 * ref: https://authjs.dev/guides/pages/signin
 */
export default memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation('clerk');
  const router = useRouter();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('sso');

  const oAuthSSOProviders = useUserStore((s) => s.oAuthSSOProviders);

  const searchParams = useSearchParams();

  // Redirect back to the page url, fallback to '/' if failed
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleSignIn = async (provider: string) => {
    setLoadingProvider(provider);
    try {
      await signIn(provider, { redirectTo: callbackUrl });
    } catch (error) {
      setLoadingProvider(null);
      // Signin can fail for a number of reasons, such as the user
      // not existing, or the user not having the correct role.
      // In some cases, you may want to redirect to a custom error
      if (error instanceof AuthError) {
        return router.push(`/next-auth/?error=${error.type}`);
      }

      // Otherwise if a redirects happens Next.js can handle it
      // so you can just re-thrown the error and let Next.js handle it.
      // Docs: https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
      throw error;
    }
  };

  // Filter out credentials provider from SSO providers
  const ssoProviders = useMemo(() => {
    return oAuthSSOProviders?.filter((provider) => provider !== 'credentials') || [];
  }, [oAuthSSOProviders]);

  // Check if credentials provider is available
  const hasCredentials = useMemo(() => {
    return oAuthSSOProviders?.includes('credentials') || false;
  }, [oAuthSSOProviders]);

  const tabItems = useMemo(() => {
    const items = [];

    // SSO Providers tab
    if (ssoProviders.length > 0) {
      items.push({
        children: (
          <Flex gap="small" vertical>
            {ssoProviders.map((provider) => (
              <Button
                className={styles.button}
                icon={AuthIcons(provider, 16)}
                key={provider}
                loading={loadingProvider === provider}
                onClick={() => handleSignIn(provider)}
              >
                {provider}
              </Button>
            ))}
          </Flex>
        ),
        key: 'sso',
        label: 'SSO 登录',
      });
    }

    // Credentials tab
    if (hasCredentials) {
      items.push({
        children: (
          <Flex gap="medium" vertical>
            <CredentialsForm callbackUrl={callbackUrl} />
            <div className={styles.text}>
              <Text className={styles.linkHint} type="secondary">
                还没有账号？
                <span className={styles.link} onClick={() => router.push('/next-auth/signup')}>
                  立即注册
                </span>
              </Text>
            </div>
          </Flex>
        ),
        key: 'credentials',
        label: '账号密码',
      });
    }

    return items;
  }, [ssoProviders, hasCredentials, loadingProvider, callbackUrl, styles, router]);

  return (
    <div className={styles.container}>
      <div className={styles.contentCard}>
        {/* Card Body */}
        <Flex gap="large" vertical>
          {/* Header */}
          <div className={styles.text}>
            <Text as={'h4'} className={styles.title}>
              {/* Hidden: LobeHub logo */}
              {t('signIn.start.title', { applicationName: BRANDING_NAME })}
            </Text>
            <Text as={'p'} className={styles.description}>
              {t('signIn.start.subtitle')}
            </Text>
          </div>

          {/* Content */}
          {oAuthSSOProviders ? (
            tabItems.length > 1 ? (
              <Tabs
                activeKey={activeTab}
                centered
                items={tabItems}
                onChange={(key) => setActiveTab(key)}
              />
            ) : tabItems.length === 1 ? (
              tabItems[0].children
            ) : (
              <Text type="secondary">没有可用的登录方式</Text>
            )
          ) : (
            <BtnListLoading />
          )}
        </Flex>
      </div>
      {/* Footer removed - no help, privacy, terms links */}
    </div>
  );
});
