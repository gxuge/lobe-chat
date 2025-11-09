import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { getServerDBConfig } from '@/config/db';
import { users } from '@/database/schemas';
import { getServerDB } from '@/database/server';
import { validateEmail, verifyPassword } from '@/libs/password';

export const runtime = 'nodejs';

/**
 * POST /api/auth/verify-credentials
 * 验证用户账号密码
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: '请输入邮箱和密码' }, { status: 400 });
    }

    // Validate email format
    const emailValidation = validateEmail(email.trim());
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }

    // Check if server mode is enabled
    const { NEXT_PUBLIC_ENABLED_SERVER_SERVICE } = getServerDBConfig();
    if (!NEXT_PUBLIC_ENABLED_SERVER_SERVICE) {
      return NextResponse.json({ error: '账号密码登录需要启用服务器模式' }, { status: 503 });
    }

    const serverDB = await getServerDB();

    // Find user by email
    const user = await serverDB.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (!user) {
      return NextResponse.json({ error: '用户不存在或密码错误' }, { status: 401 });
    }

    // Check if user has a password set
    if (!user.passwordHash) {
      return NextResponse.json({ error: '此账号未设置密码，请使用其他登录方式' }, { status: 401 });
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: '用户不存在或密码错误' }, { status: 401 });
    }

    // Return user object (without sensitive data)
    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        id: user.id,
        image: user.avatar,
        name: user.username || user.fullName || user.email,
        providerAccountId: user.id,
      },
    });
  } catch (error) {
    console.error('[Credentials Verify] Error:', error);
    return NextResponse.json({ error: '验证失败，请重试' }, { status: 500 });
  }
}
