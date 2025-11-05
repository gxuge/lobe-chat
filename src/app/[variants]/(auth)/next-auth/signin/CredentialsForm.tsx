'use client';

import { Button, Input } from '@lobehub/ui';
import { message } from 'antd';
import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import FormPassword from '@/components/FormInput/FormPassword';

interface CredentialsFormProps {
  callbackUrl: string;
}

export default function CredentialsForm({ callbackUrl }: CredentialsFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
        message.error(result.error);
      } else if (result?.ok) {
        message.success('登录成功');
        router.push(callbackUrl);
      }
    } catch (error) {
      if (error instanceof AuthError) {
        message.error(error.message);
      } else {
        message.error('登录失败，请重试');
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
