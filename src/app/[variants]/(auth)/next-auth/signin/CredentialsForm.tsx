'use client';

import { Button, Input } from '@lobehub/ui';
import { message } from 'antd';
import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import FormPassword from '@/components/FormInput/FormPassword';

interface CredentialsFormProps {
  callbackUrl: string;
}

export default function CredentialsForm({ callbackUrl }: CredentialsFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 错误消息映射函数
  const getErrorMessage = (error: string): string => {
    // 尝试从国际化文件获取翻译
    const translationKey = `authErrors.${error}` as any;
    const translated = t(translationKey, { defaultValue: '' }) as string;

    // 如果没有翻译，返回默认消息
    if (!translated) {
      return t('authErrors.Default');
    }

    return translated;
  };

  // 检查URL参数中的错误
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      message.error(getErrorMessage(error));
      // 清除URL中的错误参数，避免重复显示
      const newUrl = window.location.pathname + '?callbackUrl=' + encodeURIComponent(callbackUrl);
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams, callbackUrl]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      message.error('请输入邮箱和密码');
      return;
    }

    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        message.error(getErrorMessage(result.error));
      } else if (result?.ok) {
        message.success('登录成功');
        router.push(callbackUrl);
      }
    } catch (error) {
      if (error instanceof AuthError) {
        message.error(getErrorMessage(error.type || 'Default'));
      } else {
        message.error(t('authErrors.Default'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Flexbox gap={16} style={{ width: '100%' }}>
        <Input
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="请输入邮箱"
          size="large"
          type="email"
          value={email}
        />

        <FormPassword
          autoComplete="current-password"
          onChange={(value) => setPassword(value)}
          placeholder="请输入密码"
          size="large"
          value={password}
        />

        <Button block htmlType="submit" loading={loading} size="large" type="primary">
          登录
        </Button>
      </Flexbox>
    </form>
  );
}
