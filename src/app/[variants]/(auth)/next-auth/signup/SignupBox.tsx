'use client';

import { BRANDING_NAME } from '@lobechat/const';
import { Text } from '@lobehub/ui';
import { Flex } from 'antd';
import { createStyles } from 'antd-style';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';


import SignupForm from './SignupForm';

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

export default memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation('auth');
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.contentCard}>
        {/* Card Body */}
        <Flex gap="large" vertical>
          {/* Header */}
          <div className={styles.text}>
            <Text as={'h4'} className={styles.title}>
              {/* Hidden: LobeHub logo */}
              {t('signup.title', { applicationName: BRANDING_NAME })}
            </Text>
            <Text as={'p'} className={styles.description}>
              {t('signup.subtitle')}
            </Text>
          </div>

          {/* Signup Form */}
          <SignupForm />

          {/* Login Link */}
          <div className={styles.text}>
            <Text className={styles.linkHint} type="secondary">
              已有账号？
              <span className={styles.link} onClick={() => router.push('/next-auth/signin')}>
                立即登录
              </span>
            </Text>
          </div>
        </Flex>
      </div>
      {/* Footer removed - no help, privacy, terms links */}
    </div>
  );
});
