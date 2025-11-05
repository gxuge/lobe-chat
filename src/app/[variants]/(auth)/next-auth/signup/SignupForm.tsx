'use client';

import { Button, Input } from '@lobehub/ui';
import { message } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import FormPassword from '@/components/FormInput/FormPassword';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password || !confirmPassword) {
      message.error('请填写所有必填项');
      return;
    }

    if (password !== confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    setLoading(true);
    try {
      // Call signup API
      const response = await fetch('/api/auth/signup', {
        body: JSON.stringify({
          email,
          password,
          username: username || undefined,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        message.error(data.error || '注册失败');
        return;
      }

      message.success('注册成功，正在登录...');

      // Auto login after successful registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push('/');
      } else {
        router.push('/next-auth/signin');
      }
    } catch (error) {
      console.error('Signup error:', error);
      message.error('注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <Flexbox gap={16} style={{ width: '100%' }}>
        <Input
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="邮箱 *"
          size="large"
          type="email"
          value={email}
        />

        <Input
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="用户名（可选）"
          size="large"
          value={username}
        />

        <FormPassword
          autoComplete="new-password"
          onChange={(value) => setPassword(value)}
          placeholder="密码（至少8位，包含字母和数字）*"
          size="large"
          value={password}
        />

        <FormPassword
          autoComplete="new-password"
          onChange={(value) => setConfirmPassword(value)}
          placeholder="确认密码 *"
          size="large"
          value={confirmPassword}
        />

        <Button block htmlType="submit" loading={loading} size="large" type="primary">
          注册
        </Button>
      </Flexbox>
    </form>
  );
}
