import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { getServerDBConfig } from '@/config/db';
import { UserModel } from '@/database/models/user';
import { users } from '@/database/schemas';
import { getServerDB } from '@/database/server';
import { hashPassword, validateEmail, validatePassword } from '@/libs/password';
import { AgentService } from '@/server/services/agent';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: '邮箱和密码不能为空' }, { status: 400 });
    }

    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json({ error: passwordValidation.error }, { status: 400 });
    }

    // Check if server mode is enabled
    const { NEXT_PUBLIC_ENABLED_SERVER_SERVICE } = getServerDBConfig();
    if (!NEXT_PUBLIC_ENABLED_SERVER_SERVICE) {
      return NextResponse.json({ error: '注册功能需要启用服务器模式' }, { status: 403 });
    }

    const serverDB = await getServerDB();

    // Check if user already exists
    const existingUser = await serverDB.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (existingUser) {
      return NextResponse.json({ error: '该邮箱已被注册' }, { status: 409 });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Generate user ID
    const userId = uuidv4();

    // Create user
    await UserModel.createUser(serverDB, {
      email: email.toLowerCase(),
      id: userId,
      passwordHash,
      username: username || email.split('@')[0],
    });

    // Create inbox session for the user
    const agentService = new AgentService(serverDB, userId);
    await agentService.createInbox();

    return NextResponse.json(
      {
        message: '注册成功',
        success: true,
        userId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '注册失败，请稍后重试' },
      { status: 500 },
    );
  }
}
