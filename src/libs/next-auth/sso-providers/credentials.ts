import CredentialsProvider from 'next-auth/providers/credentials';

const provider = {
  id: 'credentials',
  provider: CredentialsProvider({
    async authorize(credentials) {
      const email = typeof credentials?.email === 'string' ? credentials.email.trim() : '';
      const password = typeof credentials?.password === 'string' ? credentials.password : '';

      // Validate input
      if (!email || !password) {
        throw new Error('请输入邮箱和密码');
      }

      // Call backend API to verify credentials
      // This ensures all database operations run in Node.js runtime, not Edge runtime
      // Use dynamic import to avoid loading appEnv in Edge Runtime
      const baseUrl = process.env.APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3010';

      const response = await fetch(`${baseUrl}/api/auth/verify-credentials`, {
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '验证失败');
      }

      if (!data.success || !data.user) {
        throw new Error('验证失败');
      }

      // Return user object
      return data.user;
    },
    credentials: {
      email: {
        label: '邮箱',
        placeholder: 'user@example.com',
        type: 'email',
      },
      password: {
        label: '密码',
        type: 'password',
      },
    },
    id: 'credentials',
    name: '账号密码登录',
  }),
};

export default provider;
