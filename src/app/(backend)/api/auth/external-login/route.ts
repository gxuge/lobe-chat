import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { getServerDBConfig } from '@/config/db';
import { UserModel } from '@/database/models/user';
import { users } from '@/database/schemas';
import { getServerDB } from '@/database/server';
import { generateRandomPassword, hashPassword } from '@/libs/password';
import { AgentService } from '@/server/services/agent';
import type { ExternalAuthRequest, ExternalAuthResponse } from '@/types/qiankun';

export const runtime = 'nodejs';

/**
 * External Login API for Qiankun Micro-Frontend Integration
 *
 * This endpoint handles automatic login for users coming from the main application.
 * If the user doesn't exist, it automatically registers them.
 *
 * Flow:
 * 1. Validate request from main app (check token and externalAuth flag)
 * 2. Check if user exists by username
 * 3. If not exists, auto-register with main app user info
 * 4. Create session/token for the user
 * 5. Return success response
 */
export async function POST(req: NextRequest) {
  try {
    const body: ExternalAuthRequest = await req.json();
    const { username, token, externalAuth, userInfo } = body;

    // Validate external auth flag
    if (!externalAuth) {
      return NextResponse.json(
        { error: 'Invalid request: externalAuth flag required', success: false },
        { status: 400 },
      );
    }

    // Validate required fields
    if (!username || !token) {
      return NextResponse.json(
        { error: 'Username and token are required', success: false },
        { status: 400 },
      );
    }

    // Check if server mode is enabled
    const { NEXT_PUBLIC_ENABLED_SERVER_SERVICE } = getServerDBConfig();
    if (!NEXT_PUBLIC_ENABLED_SERVER_SERVICE) {
      return NextResponse.json(
        { error: 'Server mode must be enabled for external authentication', success: false },
        { status: 403 },
      );
    }

    const serverDB = await getServerDB();

    // Token verification (simplified - in production, call main app's verify API)
    // Example: await fetch('https://main-app.com/api/verify-token', { method: 'POST', body: JSON.stringify({ token, username }) })
    if (!token || token.length < 10) {
      return NextResponse.json(
        { error: 'Invalid or expired token', success: false },
        { status: 401 },
      );
    }

    // Check if user exists
    let user = await serverDB.query.users.findFirst({
      where: eq(users.username, username),
    });

    let userId: string;
    let isNewUser = false;

    // If user doesn't exist, auto-register
    if (!user) {
      userId = uuidv4();
      isNewUser = true;

      // Generate a secure random password (user won't need to know it)
      const randomPassword = generateRandomPassword();
      const passwordHash = await hashPassword(randomPassword);

      // Create user with main app information
      const email = userInfo?.email || `${username}@external.app`; // Generate email if not provided

      await UserModel.createUser(serverDB, {
        avatar: userInfo?.avatar,
        email: email.toLowerCase(),
        // Store external user ID for future reference
// @ts-ignore - externalUserId might not be in schema yet
externalUserId: userInfo?.userId,
        

firstName: userInfo?.realname?.split(' ')[0],
        

id: userId,
        
        
        lastName: userInfo?.realname?.split(' ').slice(1).join(' '),
        passwordHash,
        phone: userInfo?.phone,
        // Mark this user as from main app
        // @ts-ignore - source might not be in schema yet
        source: 'main_app',
        username,
      });

      // Create inbox session for the new user
      const agentService = new AgentService(serverDB, userId);
      await agentService.createInbox();

      console.log(`[External Auth] Auto-registered user: ${username}`);
    } else {
      userId = user.id;
      console.log(`[External Auth] Existing user logged in: ${username}`);
    }

    // Return success with user info
    // Note: In qiankun mode, the frontend should trigger NextAuth signIn with credentials
    const response: ExternalAuthResponse = {
      message: isNewUser ? 'User registered and logged in' : 'User logged in',
      // Return a flag indicating this is external auth
needsClientSignIn: true,
      
success: true,
      
userId,
      
      username,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('[External Auth] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'External authentication failed',
        success: false,
      } as ExternalAuthResponse,
      { status: 500 },
    );
  }
}
