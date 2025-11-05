import { eq } from 'drizzle-orm';
import CredentialsProvider from 'next-auth/providers/credentials';

import { getServerDBConfig } from '@/config/db';
import { users } from '@/database/schemas';
import { getServerDB } from '@/database/server';
import { validateEmail, verifyPassword } from '@/libs/password';

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

      // Validate email format
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        throw new Error(emailValidation.error);
      }

      // Check if server mode is enabled
      const { NEXT_PUBLIC_ENABLED_SERVER_SERVICE } = getServerDBConfig();
      if (!NEXT_PUBLIC_ENABLED_SERVER_SERVICE) {
        throw new Error('账号密码登录需要启用服务器模式');
      }

      const serverDB = await getServerDB();

      // Find user by email
      const user = await serverDB.query.users.findFirst({
        where: eq(users.email, email.toLowerCase()),
      });

      if (!user) {
        throw new Error('用户不存在或密码错误');
      }

      // Check if user has a password set
      if (!user.passwordHash) {
        throw new Error('此账号未设置密码，请使用其他登录方式');
      }

      // Verify password
      const isValid = await verifyPassword(password, user.passwordHash);

      if (!isValid) {
        throw new Error('用户不存在或密码错误');
      }

      // Return user object
      return {
        email: user.email,
        id: user.id,
        image: user.avatar,
        name: user.username || user.fullName || user.email,
        providerAccountId: user.id,
      };
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
